# Cursor

Cursor connects to remote HTTP MCP servers and sends custom headers.

## Add the server

Create or edit `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` in a project:

```json
{
  "mcpServers": {
    "boardroom": {
      "url": "https://control.boardroom-ai.ae/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_TOKEN"
      }
    }
  }
}
```

The same file is in [examples/mcp/cursor-mcp.json](../../../examples/mcp/cursor-mcp.json).

> If you use a **project** `.cursor/mcp.json`, add it to `.gitignore`, or keep the token out of it. A committed token is a leaked token. Revoke it in the cabinet straight away if that happens.

## Check it

Open **Cursor Settings → MCP**. `boardroom` should show a green dot and 13 tools. In Agent chat, ask:

> Use the boardroom whoami tool and list the tools I can call.

## Useful prompts in an engineering context

- "Pull the last 20 leads with `crm_list_leads` and draft a JSON fixture with the same shape but fake names, for my tests."
- "Compare `crm_pipeline_overview` with what our landing page claims about response time."
