# `dashboard_snapshot`

**Scope:** `crm:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

The workspace's KPIs exactly as its dashboard shows them, with the time the snapshot was built.

## Inputs

None.

The workspace is never an input. It always comes from the token.

## Example prompt

> Give me a one-paragraph status of the business from the dashboard snapshot.

## Example output

```json
{
  "ok": true,
  "built_at": "2026-10-09T08:00:00+04:00",
  "snapshot": {
    "revenue": {
      "value": 48000,
      "currency": "AED"
    },
    "leads": 42,
    "conversations": 57,
    "conversion_rate": 0.14
  }
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- The KPI set depends on how the workspace is configured, so different businesses can see different fields.
