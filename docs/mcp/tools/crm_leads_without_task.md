# `crm_leads_without_task`

**Scope:** `crm:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

Open leads that have **no unfinished task**, which is the follow-up leak. Sorted by idle time, longest first. Idle days are counted in Asia/Dubai.

## Inputs

- `limit`: optional integer from 1 to 200, default 50.

The workspace is never an input. It always comes from the token.

## Example prompt

> Which open leads is nobody following up? Longest idle first, and suggest a next step for each of the top five.

## Example output

```json
{
  "ok": true,
  "total": 5,
  "returned": 2,
  "timezone": "Asia/Dubai",
  "pii": "masked",
  "leads": [
    {
      "id": "00000000-0000-4000-8000-000000000103",
      "name": "Demo Clinic Lead",
      "phone": "+971 52 ••• ••00",
      "stage": "Qualified",
      "idle_days": 6
    },
    {
      "id": "00000000-0000-4000-8000-000000000104",
      "name": "Sample Buyer",
      "phone": "+7 900 ••• ••00",
      "stage": "New",
      "idle_days": 3
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- This is the tool behind "find all leads that didn't receive a follow-up".
