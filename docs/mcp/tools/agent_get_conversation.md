# `agent_get_conversation`

**Scope:** `agent:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

One conversation with its transcript: what the customer wrote and what the agent answered.

## Inputs

- `conversation_id`: required string, UUID from `agent_conversations`.
- `limit`: optional integer from 1 to 500, default 100 (number of messages).

The workspace is never an input. It always comes from the token.

## Example prompt

> Read the last conversation in Russian and tell me where the agent could have offered a booking sooner.

## Example output

```json
{
  "ok": true,
  "conversation": {
    "id": "00000000-0000-4000-8000-000000000202",
    "channel": "telegram",
    "language": "ru"
  },
  "messages": [
    {
      "at": "2026-10-08T09:30:00+04:00",
      "from": "customer",
      "text": "Здравствуйте, сколько стоит стрижка?"
    },
    {
      "at": "2026-10-08T09:30:05+04:00",
      "from": "agent",
      "text": "Здравствуйте! Стрижка от 150 AED. Подобрать время на этой неделе?"
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- The transcript is chosen by conversation id, never by a masked phone number. Every call is written to the audit log with the conversation id.
