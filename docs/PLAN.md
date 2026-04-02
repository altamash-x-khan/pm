# Plan -- AI Chat Assistant for Dr. Farheen Homeopathy

The Next.js landing page is complete. This plan covers the AI assistant widget.

## Phase 1: Plan (CURRENT)

- Adopt "WhatsApp Everything" Strategy: No emails, no backend tool/function calling.
- Ensure `openrouter/free` model is used.
- Update AGENTS.md and PLAN.md.

## Phase 2: Backend -- `/api/chat` route

- Accept `{ messages }` from the frontend
- Call OpenRouter with conversation history + system prompt
- System prompt instructs AI to generate:
  - `wa.me/918452860941?text=...` for bookings.
  - `wa.me/918452860941?text=...` for testimonies.
- Return plain response text to frontend
- *Engineering win: The BFF route is now stateless AND side-effect free.*

## Phase 3: Frontend -- Chat widget

- Floating button (bottom right) -- opens a chat panel
- Stores message history in React state
- On send: POST full history to `/api/chat`, append AI response
- Render Markdown/Links in the chat so the user can easily click the WhatsApp links.

## Phase 4: Test

- Test condition explanation flow
- Test clicking the AI-generated WhatsApp booking link
- Test clicking the AI-generated WhatsApp testimony link

## Future

- RAG: Knowledge base about Dr. Farheen's practice for more informed answers