# `partner_overview`

**Scope:** `partner:read` (partner tokens only)
· **Read-only** · [all tools](../README.md#tools)

## What it does

For **partners and integrators**: their own cabinet, meaning the referral code and link, the clients who registered through it, the agreed commission rate, what has accrued, and which client workspaces they currently hold an access grant for.

## Inputs

None. The partner comes from the token.

The workspace is never an input. It always comes from the token.

## Example prompt

> How many clients registered through my partner link, and what has accrued this month?

## Example output

```json
{
  "ok": false,
  "error": "write_not_enabled",
  "message": "partner access is not enabled on this server"
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- **Status: Coming soon.** The tool is listed, but partner access is switched off on the public server today. A normal workspace token gets `scope_denied`, and a partner token currently gets the refusal shown above.
- A referral alone never grants access to a client's data. Access needs a separate, time-limited grant that can be revoked.
