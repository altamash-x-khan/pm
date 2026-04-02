# Dr. Farheen Homeopathy -- Landing Page with AI Assistant

## What this project is

A production landing page for a homeopathic doctor. The Next.js frontend is fully built.
We are adding an AI chat widget so patients can interact naturally.

## How the site works today

### Booking consultations -- via WhatsApp (NO email)
The Booking section opens a WhatsApp link with a prebuilt message:
- Number: `918452860941`
- Message: "Hi Doctor Farheen, I am interested in Scheduling Consultation."
- Implementation: `Booking.tsx` builds a `wa.me` link. No backend, no email.

### Contact info -- static display (NO form, NO email)
The Contact section shows phone number and email address. No form submission.

### Patient testimony -- Moving to WhatsApp (Zero Backend Needed)
Historically there was an email backend, but Dr. Farheen prefers WhatsApp. We are shifting testimonies to be collected via WhatsApp links directly.

## What we are building: AI Chat Assistant

A floating chat widget with 2 core behaviors:

### 1. Help patients understand their condition
- Explain how homeopathy can help for their specific condition
- Use general, accessible language
- Be transparent and honest -- genuine concern to help
- ALWAYS guide them toward booking a consultation via a WhatsApp link generated in chat.

### 2. Help treated patients write testimonials
- Ask conversational questions to collect: name, rating, condition, story
- Once all info is collected, **generate a WhatsApp link** so the patient can send it directly to Dr. Farheen.
- NO tool calling is needed. NO emails are sent. This makes the AI entirely stateless and very fast.

### Future: RAG integration
- Knowledge base about Dr. Farheen's practice, conditions treated, etc.
- Not part of the current implementation

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **AI**: OpenRouter (using `openrouter/free` model)

## Coding standards

1. No over-engineering. Each file does one job.
2. No unnecessary defensive code.
3. No emojis in code or comments.
4. When something breaks, find root cause with evidence before fixing.
5. Keep README minimal.

## Working documentation

All planning docs are in `docs/`. Read `docs/PLAN.md` before making changes.