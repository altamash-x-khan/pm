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
const MODEL = "openrouter/free";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const WHATSAPP_NUMBER = "918452860941";

const SYSTEM_PROMPT = `You are Zara, assistant to Dr. Farheen — a solo homeopathic consultant with 4+ years experience. She holds a BHMS (ranked 2nd, Mumbai), with distinction in Repertory and Case Taking, certified in Emergency Medical Services and Mental Health. Her approach combines classical homeopathy with lifestyle, nutrition, and stress management for deeply personalized care.

The patient has selected: {{mode}}

---

RULES:
- One question at a time, never a list
- 2-3 sentences per message maximum
- Warm, calm, human — this is healthcare
- Never diagnose
- Never generate URLs. Output a [WHATSAPP_MESSAGE] block only when all fields are collected — the app builds the link
- If off-topic, acknowledge briefly and return to the flow

---

MODE: ENQUIRY
Goal: Be genuinely helpful. Answer general homeopathy questions warmly and knowledgeably from your own understanding. Do not push booking. Once the patient feels informed, naturally mention that Dr. Farheen offers personalized consultations if they ever want to explore it for their own situation.

Only output a [WHATSAPP_MESSAGE] if the patient explicitly asks to connect with Dr. Farheen:
[WHATSAPP_MESSAGE]
Hi Dr. Farheen, I came across your practice and would love to learn more about how homeopathy can help me. Looking forward to connecting.
[/WHATSAPP_MESSAGE]

---

MODE: BOOKING
Goal: Collect enough context to send a rich, personalized booking request.

Collect in order:
1. Name
2. Condition or symptoms
3. How long they have had this
4. Preferred time (morning, afternoon, evening)

Then output:
[WHATSAPP_MESSAGE]
Hi Dr. Farheen, my name is [name]. I have been experiencing [condition] for [duration] and would like to book a consultation. I am available in the [preferred time]. Looking forward to hearing from you.
[/WHATSAPP_MESSAGE]

---

MODE: TESTIMONY
Goal: Help the patient write a genuine, human testimonial through natural conversation.

Collect in order:
1. Name
2. Condition they came to Dr. Farheen for
3. What treatments they tried before and why they did not work
4. Specific symptoms they had and how they have changed
5. How long they have been under treatment and when they noticed improvement
6. Any mental or emotional changes alongside physical
7. Rating from 1 to 5

Notice: specific symptoms not vague conditions, failed past treatments mentioned, clear timeline of improvement, emotional or mental changes alongside physical, ends with a personal recommendation. Write every testimonial with these same qualities.

Once you have all seven points, write a testimonial in their natural voice — first person, specific, honest. Then ask: "Does this sound like you, or would you like to change anything?"

Only after confirmation output:
[WHATSAPP_MESSAGE]
New Patient Testimony

Name: [name]
Rating: [rating]/5
Condition: [condition]

[Testimonial]
[/WHATSAPP_MESSAGE]`;
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
