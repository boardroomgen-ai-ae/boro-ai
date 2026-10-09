# Claude Desktop

Claude Desktop runs MCP servers listed in its config file. To reach a remote server that needs a bearer token, use a small local bridge. The example below uses the community package [`mcp-remote`](https://www.npmjs.com/package/mcp-remote), which needs Node.js 18 or newer.

> `mcp-remote` is a third-party open-source package and is not maintained by Boardroom AI. Review it, and pin a version you trust.

## 1. Open the config file

Claude Desktop → **Settings → Developer → Edit Config**. This opens `claude_desktop_config.json`:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

## 2. Add the server

```json
{
  "mcpServers": {
    "boardroom": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://control.boardroom-ai.ae/mcp",
        "--header",
        "Authorization:${BOARDROOM_AUTH}"
      ],
      "env": {
        "BOARDROOM_AUTH": "Bearer YOUR_MCP_TOKEN"
      }
    }
  }
}
```

Write `Authorization:${BOARDROOM_AUTH}` with no space after the colon. Some launchers split arguments on spaces, which is why the space-containing value goes in `env`. The same file is in [examples/mcp/claude_desktop_config.json](../../../examples/mcp/claude_desktop_config.json).

## 3. Restart Claude Desktop

Quit it completely and open it again. The tools icon in the chat box should list the `boardroom` tools.

Try:

> Using boardroom, show my pipeline by stage with counts and total value.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Server shows as failed | Run `npx -y mcp-remote https://control.boardroom-ai.ae/mcp` in a terminal to see the error |
| `unauthorized` | Check the token has no extra spaces or quotes, and that `Bearer ` is in front of it |
| `token_expired` | Issue a new token in the cabinet |
| Tools appear but every call is refused with `scope_denied` | The token was issued without that scope. Issue a new one. |

## Claude.ai custom connectors

Claude.ai's web connector directory expects OAuth sign-in. This server uses owner-issued bearer tokens, so use Claude Desktop with the config above, or Claude Code.
