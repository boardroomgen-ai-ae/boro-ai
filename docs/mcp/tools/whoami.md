# `whoami`

**Scope:** `none` (always allowed)
· **Read-only** · [all tools](../README.md#tools)

## What it does

Tells the client who this token is: the workspace it reads, its label, the scopes it carries, and which tools will work or be refused. Call it first in every new session.

## Inputs

None.

The workspace is never an input. It always comes from the token.

## Example prompt

> Call boardroom whoami and tell me what I can read.

## Example output

```json
{
  "ok": true,
  "server": "boardroom-control-revenue",
  "phase": "1 (read-only)",
  "workspace_id": "00000000-0000-4000-8000-000000000001",
  "workspace_name": "Demo Salon",
  "token_label": "claude-laptop",
  "scopes": [
    "crm:read",
    "agent:read",
    "marketing:read"
  ],
  "tools_available": [
    "whoami",
    "crm_list_leads",
    "crm_get_lead",
    "crm_pipeline_overview",
    "..."
  ],
  "tools_denied": [
    {
      "tool": "partner_overview",
      "requires": "partner:read"
    }
  ],
  "write_tools": "none — this server is read-only in Phase 1",
  "timezone": "Asia/Dubai",
  "rate_limit_per_minute": 120
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- Use `tools_available` instead of guessing from scopes.
