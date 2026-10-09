# Revenue Control MCP server

Your Revenue Control workspace is available as a remote [Model Context Protocol](https://modelcontextprotocol.io) server. Any MCP client, such as Claude, Cursor, an OpenAI agent or n8n, can read your CRM, AI-agent conversations, calls and marketing figures.

| | |
|---|---|
| Endpoint | `https://control.boardroom-ai.ae/mcp` |
| Transport | HTTP (JSON-RPC 2.0, MCP protocol `2024-11-05`) |
| Auth | `Authorization: Bearer YOUR_MCP_TOKEN` |
| Access | Read-only, 13 tools |
| Time zone | Asia/Dubai. Relative windows such as `today` and `week` are cut on Dubai day boundaries. |

## 1. Get a token

Only the **workspace owner** can issue a token.

1. Sign in at [control.boardroom-ai.ae](https://control.boardroom-ai.ae/?utm_source=github&utm_medium=docs&utm_campaign=mcp).
2. Open **Integrations → API and MCP → Boardroom MCP**.
3. Give the token a label, for example `claude-laptop`, and press **Get an MCP token**.
4. Copy the token **now**. It is shown once. Only a hash is stored, so nobody can show it to you again, including us.

Tokens expire after 90 days by default. To revoke one, use the same card. A revoked token stops working on its next call.

> Treat the token like a password. Never commit it, never paste it into a public chat, and use one token per device or tool so you can revoke them one at a time.

## 2. Connect your client

| Client | Guide |
|---|---|
| Claude Code (CLI) | [setup/claude-code.md](setup/claude-code.md) |
| Claude Desktop | [setup/claude-desktop.md](setup/claude-desktop.md) |
| Cursor | [setup/cursor.md](setup/cursor.md) |
| ChatGPT / OpenAI API | [setup/chatgpt.md](setup/chatgpt.md) |

You can check the address from any terminal without a token. A plain `GET` returns the server name, version and tool list, and nothing about any workspace:

```bash
curl -s https://control.boardroom-ai.ae/mcp
```

## 3. Start with `whoami`

Ask your client to call `whoami` first. It returns the workspace the token belongs to, the scopes it carries and the tools it can actually use.

## Tools

| Tool | What it answers | Scope |
|---|---|---|
| [`whoami`](tools/whoami.md) | Which workspace, which scopes, which tools work | none |
| [`crm_list_leads`](tools/crm_list_leads.md) | Leads, newest activity first, contacts masked | `crm:read` |
| [`crm_get_lead`](tools/crm_get_lead.md) | One lead in full: contact, notes, events, stage history, open tasks | `crm:read` |
| [`crm_pipeline_overview`](tools/crm_pipeline_overview.md) | Every pipeline and stage with count and value | `crm:read` |
| [`crm_leads_without_task`](tools/crm_leads_without_task.md) | Open leads nobody is following up | `crm:read` |
| [`dashboard_snapshot`](tools/dashboard_snapshot.md) | The workspace's KPIs as the dashboard shows them | `crm:read` |
| [`voice_calls`](tools/voice_calls.md) | Calls: direction, outcome, talk time | `crm:read` |
| [`agent_conversations`](tools/agent_conversations.md) | Conversations the AI agent handled | `agent:read` |
| [`agent_get_conversation`](tools/agent_get_conversation.md) | One conversation with its transcript | `agent:read` |
| [`agent_config`](tools/agent_config.md) | How the AI agent is set up (no credentials, no document text) | `agent:read` |
| [`ad_attribution`](tools/ad_attribution.md) | Which ad produced which conversation | `marketing:read` |
| [`marketing_snapshot`](tools/marketing_snapshot.md) | Spend, reach, clicks, cost per lead by campaign | `marketing:read` |
| [`partner_overview`](tools/partner_overview.md) | A partner's own referral cabinet (partner tokens only) | `partner:read` |

A new token carries `crm:read`, `agent:read` and `marketing:read` by default.

## Security model

- **The workspace comes from the token.** No tool takes a workspace argument. If a request tries to name one, it is refused with `cross_workspace_denied`, and the attempt is written to your audit log.
- **Read-only.** The public server publishes no write tools, so a client cannot discover any, try any or claim to have used any.
- **Masked by default.** List tools mask phone numbers and e-mails. Only the single-record tools (`crm_get_lead`, `agent_get_conversation`) return full details, and only for a record in your own workspace.
- **No credentials reachable.** Channel keys, provider secrets and other tokens have no tool and no path through this server.
- **Every read is audited.** The log records the tool, the row counts and the record id. It does not store response bodies or personal data.
- **Rate-limited.** 120 calls per minute per token. Lists are capped at 200 rows, and transcripts and attribution at 500. Every list returns `total`, the count before paging.

## Errors

A refused call comes back as a tool result with `isError: true`. It carries a stable `error` code and a sentence a person can act on. It never comes back as a bare HTTP 500.

| Code | Meaning |
|---|---|
| `unauthorized` | No token was sent, or the token is not valid |
| `token_expired` | Issue a new token |
| `token_revoked` | The token was revoked |
| `scope_denied` | The token lacks the scope this tool needs |
| `cross_workspace_denied` | A request tried to read another workspace |
| `not_found` | No such record **in this workspace** |
| `rate_limited` | Slow down and retry |
| `unknown_tool` | No tool by that name |
| `invalid_arguments` | Arguments did not match the tool schema |
| `upstream_unavailable` | Temporary. Nothing was changed. Retry. |

## Prompts that work well

- "Call whoami, then give me a one-paragraph status of my funnel."
- "List open leads without a task, longest idle first, and suggest a follow-up line for the top five."
- "Which ad campaigns brought conversations this month, and how many of those became deals?"
- "Read the last three agent conversations in Russian and tell me where the agent could have booked sooner."
