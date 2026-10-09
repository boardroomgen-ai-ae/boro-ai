# Examples

Everything here uses **placeholders** (`YOUR_API_KEY`, `YOUR_MCP_TOKEN`, `YOUR_WORKSPACE_ID`) and **fictional demo data**. Nothing here contains a real key, workspace or customer.

| Folder | What |
|---|---|
| [rest/](rest/curl.sh) | REST API v1 with curl: list leads, deals and tasks, create a lead, read rate-limit headers |
| [javascript/](javascript/) | Node 18+: page through leads, create a lead. No dependencies. |
| [python/](python/) | Python 3: list leads and tasks, create a lead. Standard library only. |
| [widget/](widget/README.md) | Website chat widget embed |
| [n8n/](n8n/README.md) | n8n: form to lead, morning list of open tasks |
| [make/](make/README.md) | Make: form to lead |
| [mcp/](mcp/README.md) | Ready-made MCP client configs |

## Two kinds of credentials

| | REST API key | MCP token |
|---|---|---|
| Created in | Settings → API | Integrations → API and MCP → Boardroom MCP |
| Created by | Workspace owner or admin | Workspace owner |
| Used by | Your scripts, forms, n8n, Make | AI clients: Claude, Cursor, OpenAI agents, n8n AI Agent |
| Can write | Only `POST /api/v1/leads`, with a write key | No, read-only |
| Rate limit | 60 per minute per key | 120 per minute per token |

Both are shown **once**, are bound to **one workspace**, and can be revoked at any time. Keep them in environment variables or your automation tool's credential store, and never in source code or a public web page.
