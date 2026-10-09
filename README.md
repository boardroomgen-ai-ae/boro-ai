<div align="center">

# Boro: your AI Business Operator

**Revenue Control + Boro**: an AI sales agent, CRM, booking and revenue dashboard for small and mid-sized businesses in the UAE and CIS.

Boro does more than answer questions. It gets work done.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![MCP: read tools live](https://img.shields.io/badge/MCP-13_read_tools-6f42c1.svg)](docs/mcp/README.md)
[![REST API: v1](https://img.shields.io/badge/REST_API-v1-0a7d5a.svg)](docs/api/rest-v1.md)
[![Languages: EN · RU · AR](https://img.shields.io/badge/UI-EN_·_RU_·_AR-orange.svg)](#)
[![Built in Dubai](https://img.shields.io/badge/Built_in-Dubai_🇦🇪-black.svg)](https://control.boardroom-ai.ae/?utm_source=github&utm_medium=readme&utm_campaign=badge)
[![Official MCP Registry](https://img.shields.io/badge/MCP_Registry-io.github.boardroomgen--ai--ae%2Fboro--ai-1f6feb.svg)](https://registry.modelcontextprotocol.io/v0/servers?search=boro-ai)
[![Smithery](https://img.shields.io/badge/Smithery-listed-ff5601.svg)](https://smithery.ai/servers/boardroom-gen/revenue-control)
[![Glama](https://img.shields.io/badge/Glama-ownership_verified-2ea44f.svg)](https://glama.ai/mcp/connectors/io.github.boardroomgen-ai-ae/boro-ai)
[![GitHub stars](https://img.shields.io/github/stars/boardroomgen-ai-ae/boro-ai?style=social)](https://github.com/boardroomgen-ai-ae/boro-ai/stargazers)

[**Start a free workspace**](https://control.boardroom-ai.ae/register?utm_source=github&utm_medium=readme&utm_campaign=cta) ·
[**Website**](https://control.boardroom-ai.ae/?utm_source=github&utm_medium=readme&utm_campaign=site) ·
[**Connect via MCP**](docs/mcp/README.md) ·
[**REST examples**](examples/README.md) ·
[**Русский**](README_RU.md)

</div>

---

## What it is

Revenue Control is a hosted, multi-tenant platform for businesses that sell through conversations: salons and clinics, real-estate agencies, education centres, service companies.

- **AI sales agent.** It replies to customers on WhatsApp, Instagram, Telegram, website chat and voice, qualifies them, books appointments and hands over to a person when it should.
- **CRM.** Pipelines, stages, tasks, notes and a full conversation history on every deal, filled in by the agent as it talks.
- **Booking.** Slots, staff and reminders, plus connectors to the booking systems salons and clinics already use.
- **Revenue dashboard.** Leads, conversion, follow-up gaps, ad spend against real deals, and revenue by source.
- **Boro.** An operator inside the cabinet that reads all of the above and tells you what needs your attention today.

This repository is the **public developer layer**: documentation, connection guides and examples. The product itself runs as a cloud service at [control.boardroom-ai.ae](https://control.boardroom-ai.ae/?utm_source=github&utm_medium=readme&utm_campaign=what). The platform source code is not in this repository.

## Connect Claude, ChatGPT or Cursor to your workspace in 3 minutes

Your workspace is also an **MCP server**. Any MCP client can read your leads, pipeline, AI-agent conversations, calls and marketing figures with a token you issue.

1. Sign in to your workspace and open **Integrations → API and MCP → Boardroom MCP → Get an MCP token**. The token is shown once. Copy it.
2. Add the server to your client:

```bash
claude mcp add --transport http boardroom https://control.boardroom-ai.ae/mcp \
  --header "Authorization: Bearer YOUR_MCP_TOKEN"
```

3. Ask: *"Which open leads have no follow-up task? Longest idle first."*

Setup guides: [Claude Code](docs/mcp/setup/claude-code.md) · [Claude Desktop](docs/mcp/setup/claude-desktop.md) · [Cursor](docs/mcp/setup/cursor.md) · [ChatGPT / OpenAI](docs/mcp/setup/chatgpt.md)

**Safe by design:**
- **Read-only.** The public MCP server has no write tools.
- **One workspace per token.** The workspace comes from the token. A tool argument can never point at another tenant.
- **Masked by default.** Lists mask phone numbers and e-mails. Full contact details come back only when you ask for one specific record.
- **Audited.** Every read is logged with the tool, the row counts and the record id. Response bodies and personal data are not stored in the log.
- **Owner-issued and revocable.** Only the workspace owner can mint a token. Tokens expire, and you can revoke one at any time from the same card.

## What you can ask

| Ask your AI client or Boro | Status |
|---|---|
| "Find all leads that didn't receive a follow-up" | **Available now** |
| "Show the funnel: how many deals and how much value per stage?" | **Available now** |
| "Who wrote to us this week, in which language, and what did they want?" | **Available now** |
| "Which ads produced conversations this month?" | **Available now** |
| "How did calls go today: answered, missed, talk time?" | **Available now** |
| "Tell me what requires my attention today" (Boro, in the cabinet) | **Available now** |
| "Book a meeting tomorrow and move the deal" (Boro, in the cabinet) | **Beta**: Boro prepares the action, you confirm it |
| "Summarise my inbox and draft replies" (Boro, in the cabinet) | **Beta**: drafts only, never sends |
| The same write actions through MCP (note, task, stage, tags) | **Coming soon**: preview-then-confirm |
| "Prepare quotations for customers waiting for prices" | **Coming soon** |

The 13 MCP tools are documented one by one in [docs/mcp/tools](docs/mcp/tools/).

## REST API

A plain HTTPS API for your own systems, forms and automations:

```bash
curl -s https://control.boardroom-ai.ae/api/v1/leads?limit=5 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`GET /api/v1/leads` · `GET /api/v1/deals` · `GET /api/v1/tasks` · `POST /api/v1/leads`

Reference: [docs/api/rest-v1.md](docs/api/rest-v1.md). Examples in curl, JavaScript and Python, plus n8n and Make templates, are in [examples/](examples/README.md).

## Works with

WhatsApp · Instagram · Telegram · Website chat · Voice · Kommo / amoCRM · Altegio · Zoho Books · Bayut / Property Finder · Meta, Google and TikTok Ads · any MCP client · n8n · Make

Some channels depend on approval by the channel provider for your business. The cabinet shows the honest status of each connection: *Live*, *Needs setup*, *Draft* or *Unavailable*.

## How it works

```
 Customers                    Revenue Control (cloud)                      You
 ─────────                    ───────────────────────                      ───
 WhatsApp  ┐                 ┌──────────────────────────┐
 Instagram ├──► AI agent ───►│ CRM · booking · dashboard │◄── Boro (in the cabinet)
 Telegram  │   (replies,     │ one workspace per business│
 Web chat  │    qualifies,   └─────────────┬─────────────┘
 Voice     ┘    books)                     │
                                           ├──► MCP server ──► Claude / ChatGPT / Cursor (read-only)
                                           └──► REST /api/v1 ──► your forms, n8n, Make, scripts
```

## Security

- Every token and API key belongs to exactly one workspace. Requests never choose their tenant.
- Credentials are stored as hashes. The plaintext is shown once, at creation.
- MCP is read-only. Actions in the cabinet go through an explicit confirmation step.
- Every MCP read is written to the workspace audit log.
- Rate limits apply to every token and every key.

Found a vulnerability? See [SECURITY.md](SECURITY.md). Please don't open a public issue for it.

## Roadmap

| | Item | Status |
|---|---|---|
| ✅ | MCP server, 13 read tools, owner-issued tokens | Available now |
| ✅ | REST API v1: leads, deals, tasks, create lead | Available now |
| ✅ | Website chat widget | Available now |
| 🧪 | Boro actions in the cabinet (book, move stage, create task) with confirmation | Beta |
| 🧪 | Boro inbox digest and reply drafts | Beta |
| 🔜 | MCP write tools with preview-then-confirm | Coming soon |
| 🔜 | MCP demo sandbox with a fictional CRM, no sign-up needed | Coming soon |
| 🔜 | Listings in the official MCP Registry and client catalogs | Coming soon |
| 💭 | Boro Skills: vertical packs for clinics, salons, real estate | Exploring |

Want something on this list sooner? [Open a feature request](../../issues/new?template=feature_request.yml) or [ask for an integration](../../issues/new?template=integration_request.yml).

## Like it? Give it a star ⭐

A star helps other business owners and developers find a working MCP-to-CRM setup. If this repository saved you time, please star it.

## Contributing

Doc fixes, new client guides and new examples are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

Documentation and examples in this repository are licensed under [Apache 2.0](LICENSE). "Boro", "Boardroom" and "Revenue Control" are names of Boardroom AI. The license covers this repository only, not the hosted service or its brand.

---

<div align="center">

**Built in Dubai** 🇦🇪 by Boardroom AI · [control.boardroom-ai.ae](https://control.boardroom-ai.ae/?utm_source=github&utm_medium=readme&utm_campaign=footer)

</div>
