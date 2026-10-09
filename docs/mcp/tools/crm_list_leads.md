# `crm_list_leads`

**Scope:** `crm:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

Lists leads in the workspace, newest activity first. Phone and e-mail are **masked**. `total` is the count before paging, so it also answers "how many leads do we have?".

## Inputs

- `stage`: optional string, exact stage name (case-insensitive). Omit it for all stages.
- `pipeline_id`: optional string, UUID of one pipeline (see `crm_pipeline_overview`). Omit it for all pipelines.
- `since`: optional string, one of `today`, `yesterday`, `week`, `month`, `7d`, `30d`, or an ISO timestamp. Days are cut in Asia/Dubai.
- `limit`: optional integer from 1 to 200, default 50.
- `offset`: optional integer of 0 or more, default 0.

The workspace is never an input. It always comes from the token.

## Example prompt

> How many leads came in this week? Show the ten most recent with their stage.

## Example output

```json
{
  "ok": true,
  "total": 42,
  "returned": 2,
  "limit": 10,
  "offset": 0,
  "timezone": "Asia/Dubai",
  "pii": "masked",
  "leads": [
    {
      "id": "00000000-0000-4000-8000-000000000101",
      "name": "Layla Demo",
      "phone": "+971 50 ••• ••00",
      "stage": "Qualified",
      "channel": "whatsapp",
      "value": 1200,
      "currency": "AED",
      "last_activity_at": "2026-10-08T14:20:00+04:00"
    },
    {
      "id": "00000000-0000-4000-8000-000000000102",
      "name": "Omar Sample",
      "phone": "+971 55 ••• ••00",
      "stage": "New",
      "channel": "instagram",
      "value": null,
      "currency": "AED",
      "last_activity_at": "2026-10-08T11:05:00+04:00"
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- Use `crm_get_lead` when you genuinely need one person's full contact details.
