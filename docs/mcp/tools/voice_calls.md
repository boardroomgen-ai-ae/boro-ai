# `voice_calls`

**Scope:** `crm:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

Calls with direction, outcome (disposition) and talk time. Customer numbers are masked.

## Inputs

- `since`: optional string, one of `today`, `yesterday`, `week`, `month`, `7d`, `30d`, or an ISO timestamp. Days are cut in Asia/Dubai.
- `limit`: optional integer from 1 to 200, default 50.

The workspace is never an input. It always comes from the token.

## Example prompt

> How did calls go today: how many answered, missed, and the average talk time?

## Example output

```json
{
  "ok": true,
  "total": 3,
  "returned": 2,
  "timezone": "Asia/Dubai",
  "calls": [
    {
      "at": "2026-10-09T10:12:00+04:00",
      "direction": "inbound",
      "disposition": "answered",
      "talk_seconds": 184,
      "phone": "+971 4 ••• ••00"
    },
    {
      "at": "2026-10-09T10:40:00+04:00",
      "direction": "outbound",
      "disposition": "no_answer",
      "talk_seconds": 0,
      "phone": "+971 50 ••• ••00"
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.
