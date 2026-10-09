# `ad_attribution`

**Scope:** `marketing:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

Which advertisement produced which conversation: ad id, creative, first-touch flag and the lead it is linked to. The per-click id itself is **never** returned, only whether one exists.

## Inputs

- `since`: optional string, one of `today`, `yesterday`, `week`, `month`, `7d`, `30d`, or an ISO timestamp. Days are cut in Asia/Dubai.
- `limit`: optional integer from 1 to 500, default 100.

The workspace is never an input. It always comes from the token.

## Example prompt

> Which ads produced conversations this month, and how many of those became qualified leads?

## Example output

```json
{
  "ok": true,
  "total": 2,
  "returned": 2,
  "timezone": "Asia/Dubai",
  "attribution": [
    {
      "ad_id": "demo-ad-001",
      "creative": "Autumn offer video",
      "first_touch": true,
      "has_click_id": true,
      "lead_id": "00000000-0000-4000-8000-000000000101",
      "at": "2026-10-03T18:00:00+04:00"
    },
    {
      "ad_id": "demo-ad-002",
      "creative": "Carousel: before/after",
      "first_touch": true,
      "has_click_id": true,
      "lead_id": "00000000-0000-4000-8000-000000000105",
      "at": "2026-10-05T12:40:00+04:00"
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- An empty result means no ad-driven conversation was recorded in the window. It does not mean the tool failed.
