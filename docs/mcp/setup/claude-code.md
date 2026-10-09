# Claude Code

Claude Code connects to remote HTTP MCP servers directly. You don't need a bridge.

## Add the server

```bash
claude mcp add --transport http boardroom https://control.boardroom-ai.ae/mcp \
  --header "Authorization: Bearer YOUR_MCP_TOKEN"
```

Replace `YOUR_MCP_TOKEN` with the token from **Integrations → API and MCP → Boardroom MCP**.

By default the server is added for your user on this machine. To share the configuration with a project **without sharing the token**, use project scope and an environment variable:

```bash
claude mcp add --scope project --transport http boardroom https://control.boardroom-ai.ae/mcp \
  --header 'Authorization: Bearer ${BOARDROOM_MCP_TOKEN}'
```

Then set `BOARDROOM_MCP_TOKEN` in your shell, not in the repository. Add `.mcp.json` to code review like any other file, and make sure it contains only the variable reference, never the token itself.

## Check it

```bash
claude mcp list
```

Inside a session, run `/mcp` to see the server and its tools, then ask:

> Call the boardroom whoami tool and tell me which workspace and scopes I have.

## Remove or rotate

```bash
claude mcp remove boardroom
```

Revoke the old token in the cabinet, issue a new one and add the server again.
