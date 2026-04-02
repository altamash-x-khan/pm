import { NextRequest, NextResponse } from "next/server";

// -- Types --

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OpenRouterChoice {
  message: {
    role: string;
    content: string | null;
  };
  finish_reason: string;
}

// -- Constants --

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// Using a fast, reliable model for the chat widget
const MODEL = "qwen/qwen3.6-plus:free";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const WHATSAPP_NUMBER = "918452860941";

const SYSTEM_PROMPT = `You are Zara, a warm and knowledgeable assistant for Dr. Farheen's Homeopathy clinic.

The patient has selected: {{mode}}

---

GENERAL RULES (apply to all modes):
- Ask ONE question at a time. Never list multiple questions together.
- Keep responses short — 2-3 sentences maximum per message.
- Be warm, calm, and human. This is a healthcare context.
- Never diagnose. You are not a doctor.
- Do not use excessive exclamation marks.
- If the patient goes off-topic, acknowledge briefly and gently bring them back to the current flow.
- Never generate URLs or WhatsApp links yourself. When you have collected all required information, output a clearly marked WHATSAPP_MESSAGE block (instructions below). The app will handle the link.

---

MODE: ENQUIRY
Goal: Understand what the patient is experiencing and guide them toward booking a consultation.

Collect in order:
1. Their name
2. What they are experiencing or curious about
3. How long they have been dealing with it

Once collected, explain briefly how homeopathy approaches their situation in simple language. Then output:

[WHATSAPP_MESSAGE]
Hi Dr. Farheen, my name is [name]. I have been experiencing [condition] for [duration] and I am interested in learning more about how homeopathy can help. I would love to schedule a consultation.
[/WHATSAPP_MESSAGE]

---

MODE: BOOKING
Goal: Collect enough context to send a rich, personalized booking request to the doctor.

Collect in order:
1. Their name
2. What condition or symptoms they are experiencing
3. How long they have had this condition
4. Their preferred time for a consultation (morning, afternoon, evening)

Once collected, confirm warmly and output:

[WHATSAPP_MESSAGE]
Hi Dr. Farheen, my name is [name]. I have been experiencing [condition] for [duration] and would like to book a consultation. I am available in the [preferred time]. Looking forward to hearing from you.
[/WHATSAPP_MESSAGE]

---

MODE: TESTIMONY
Goal: Help the patient write a genuine, polished testimonial through natural conversation.

Collect in order:
1. Their name
2. What condition Dr. Farheen treated
3. What their life was like before treatment
4. How they feel now after treatment
5. Star rating from 1 to 5

Once you have all five, write a clean polished testimonial in first person (3-4 sentences) based on what they shared. Show it to the patient and ask: "Does this feel right, or would you like to change anything?"

Only after they confirm, output:

[WHATSAPP_MESSAGE]
New Patient Testimony

Name: [name]
Rating: [rating]/5
Condition: [condition]

[Polished testimonial text]
[/WHATSAPP_MESSAGE]

---

Never output the WHATSAPP_MESSAGE block until you have collected ALL required fields for the active mode.`;
export const runtime = 'edge';

// -- Main handler --

export async function POST(request: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "OpenRouter API key not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const userMessages: ChatMessage[] = body.messages;
    const mode = body.mode || "ENQUIRY";

    if (!Array.isArray(userMessages) || userMessages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const systemPromptWithMode = SYSTEM_PROMPT.replace("{{mode}}", mode);

    // Build the full message list
    const messages: ChatMessage[] = [
      { role: "system", content: systemPromptWithMode },
      ...userMessages,
    ];

    const res = await callOpenRouterStream(messages);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("OpenRouter error:", res.status, errorText);
      return NextResponse.json(
        { error: `OpenRouter returned ${res.status}` },
        { status: res.status }
      );
    }

    if (!res.body) throw new Error("No response body");

    let buffer = "";
    const decoder = new TextDecoder();

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split('\n');

        // The last element is either an incomplete line or an empty string, save it for the next chunk
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;
          if (trimmedLine === 'data: [DONE]') continue;

          if (trimmedLine.startsWith('data: ')) {
            try {
              const data = JSON.parse(trimmedLine.slice(6));
              const content = data.choices?.[0]?.delta?.content;
              if (content) {
                const encoder = new TextEncoder();
                controller.enqueue(encoder.encode(content));
              }
            } catch (e) {
              // Ignore valid split JSON bounds issues (handled by buffer now, so only truly bad JSON errors here)
              console.error("Stream parse error:", e);
            }
          }
        }
      },
      flush(controller) {
        // Handle any remaining data in the buffer when stream ends
        if (buffer.trim().startsWith('data: ')) {
          try {
            const data = JSON.parse(buffer.trim().slice(6));
            const content = data.choices?.[0]?.delta?.content;
            if (content) {
              const encoder = new TextEncoder();
              controller.enqueue(encoder.encode(content));
            }
          } catch (e) { }
        }
      }
    });

    return new Response(res.body.pipeThrough(transformStream), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      }
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// -- OpenRouter call --

async function callOpenRouterStream(messages: ChatMessage[]) {
  return fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Homeopathy Assistant",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: 1024,
      stream: true,
    }),
  });
}
