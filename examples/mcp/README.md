# MCP client configs

| File | Client |
|---|---|
| [claude_desktop_config.json](claude_desktop_config.json) | Claude Desktop (through the `mcp-remote` bridge) |
| [cursor-mcp.json](cursor-mcp.json) | Cursor (`~/.cursor/mcp.json`) |

For Claude Code, run one command instead of editing a file:

```bash
claude mcp add --transport http boardroom https://control.boardroom-ai.ae/mcp \
  --header "Authorization: Bearer YOUR_MCP_TOKEN"
```

Replace `YOUR_MCP_TOKEN` with a token from **Integrations → API and MCP → Boardroom MCP**. Full guides are in [docs/mcp/setup](../../docs/mcp/setup/).
