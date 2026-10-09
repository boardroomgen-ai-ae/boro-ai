# `crm_get_lead`

**Scope:** `crm:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

Returns one lead **in full**: unmasked contact details, notes, events, stage history and open tasks. A lead id from another workspace reads as `not_found`.

## Inputs

- `lead_id`: required string, UUID of the lead (from `crm_list_leads` or `crm_leads_without_task`).

The workspace is never an input. It always comes from the token.

## Example prompt

> Open the lead Layla Demo and summarise what happened so far and what is still open.

## Example output

```json
{
  "ok": true,
  "pii": "full",
  "lead": {
    "id": "00000000-0000-4000-8000-000000000101",
    "name": "Layla Demo",
    "phone": "+971 50 000 0000",
    "email": "layla@example.com",
    "stage": "Qualified",
    "value": 1200,
    "currency": "AED"
  },
  "notes": [
    {
      "at": "2026-10-07T10:00:00+04:00",
      "text": "Asked for a Saturday slot."
    }
  ],
  "events": [
    {
      "at": "2026-10-07T09:58:00+04:00",
      "type": "message_in",
      "channel": "whatsapp"
    }
  ],
  "stage_history": [
    {
      "from": "New",
      "to": "Qualified",
      "at": "2026-10-07T10:02:00+04:00"
    }
  ],
  "open_tasks": [
    {
      "title": "Confirm Saturday 11:00",
      "due_at": "2026-10-09T10:00:00+04:00"
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- This is the only CRM tool that returns full contact details. Every call is written to the audit log with the lead id.
