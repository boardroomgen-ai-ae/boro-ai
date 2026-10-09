# `crm_pipeline_overview`

**Scope:** `crm:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

Every pipeline and stage with its lead count and total value: the shape of the funnel at a glance.

## Inputs

None.

The workspace is never an input. It always comes from the token.

## Example prompt

> Show my funnel by stage with counts and value, and point out where deals pile up.

## Example output

```json
{
  "ok": true,
  "stages": [
    {
      "pipeline": "Sales",
      "stage": "New",
      "leads": 18,
      "value": 0,
      "currency": "AED"
    },
    {
      "pipeline": "Sales",
      "stage": "Qualified",
      "leads": 11,
      "value": 13200,
      "currency": "AED"
    },
    {
      "pipeline": "Sales",
      "stage": "Booked",
      "leads": 7,
      "value": 9800,
      "currency": "AED"
    },
    {
      "pipeline": "Sales",
      "stage": "Won",
      "leads": 6,
      "value": 8400,
      "currency": "AED"
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.
