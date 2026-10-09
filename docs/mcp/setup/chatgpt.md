# ChatGPT and the OpenAI API

## ChatGPT (chatgpt.com and the desktop app)

ChatGPT supports remote MCP servers as **custom connectors** in developer mode, but they sign in with OAuth. This server uses owner-issued bearer tokens and doesn't offer an OAuth sign-in yet, so **a direct ChatGPT connector is not supported today**. It is on the [roadmap](../../../README.md#roadmap).

Until then, use the OpenAI API route below, or one of the Claude or Cursor guides.

## OpenAI Responses API (remote MCP tool)

The Responses API can call a remote MCP server and pass your headers through:

```bash
curl -s https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_MODEL",
    "tools": [{
      "type": "mcp",
      "server_label": "boardroom",
      "server_url": "https://control.boardroom-ai.ae/mcp",
      "headers": { "Authorization": "Bearer YOUR_MCP_TOKEN" },
      "require_approval": "never"
    }],
    "input": "Call whoami, then list open leads without a follow-up task."
  }'
```

Notes:

- `OPENAI_API_KEY` is your own OpenAI key. `YOUR_MCP_TOKEN` is the Revenue Control token. Keep both on the server side and never in browser code.
- `require_approval: "never"` is reasonable here because every tool is read-only. Leave approvals on if you add other servers that can write.
- Field names follow OpenAI's documentation at the time of writing. Check [platform.openai.com/docs](https://platform.openai.com/docs) if a request is rejected.

## OpenAI Agents SDK

The Agents SDK has a streamable-HTTP MCP client that accepts headers. Point it at `https://control.boardroom-ai.ae/mcp` with `Authorization: Bearer YOUR_MCP_TOKEN`, loading the token from an environment variable.
