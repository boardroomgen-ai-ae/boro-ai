# `agent_conversations`

**Scope:** `agent:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

Conversations the AI agent handled, with intent, language, message count and the deal each one is linked to. Contacts are masked.

## Inputs

- `since`: optional string, one of `today`, `yesterday`, `week`, `month`, `7d`, `30d`, or an ISO timestamp. Days are cut in Asia/Dubai.
- `limit`: optional integer from 1 to 200, default 50.

The workspace is never an input. It always comes from the token.

## Example prompt

> Who wrote to us this week, in which language, and what did they want?

## Example output

```json
{
  "ok": true,
  "total": 12,
  "returned": 2,
  "timezone": "Asia/Dubai",
  "pii": "masked",
  "conversations": [
    {
      "id": "00000000-0000-4000-8000-000000000201",
      "channel": "whatsapp",
      "language": "ar",
      "intent": "booking",
      "messages": 9,
      "lead_id": "00000000-0000-4000-8000-000000000101",
      "last_message_at": "2026-10-08T14:20:00+04:00"
    },
    {
      "id": "00000000-0000-4000-8000-000000000202",
      "channel": "telegram",
      "language": "ru",
      "intent": "price_question",
      "messages": 4,
      "lead_id": null,
      "last_message_at": "2026-10-08T09:31:00+04:00"
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.
