# `marketing_snapshot`

**Scope:** `marketing:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

Advertising performance (spend, reach, clicks, cost per lead) per campaign, joined to what happened in the CRM.

## Inputs

None.

The workspace is never an input. It always comes from the token.

## Example prompt

> Which campaign has the best cost per lead, and does it also produce deals?

## Example output

```json
{
  "ok": true,
  "campaigns": [
    {
      "campaign": "Demo — Autumn offer",
      "spend": 1500,
      "currency": "AED",
      "reach": 42000,
      "clicks": 610,
      "leads": 25,
      "cost_per_lead": 60,
      "deals_won": 4
    },
    {
      "campaign": "Demo — Brand",
      "spend": 800,
      "currency": "AED",
      "reach": 30000,
      "clicks": 220,
      "leads": 6,
      "cost_per_lead": 133,
      "deals_won": 1
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- Figures depend on which ad accounts the workspace has connected.
