# ChatGPT and the OpenAI API

## ChatGPT (chatgpt.com and the desktop app)

ChatGPT supports remote MCP servers as **custom connectors** in developer mode, and they sign in with OAuth. This server supports OAuth sign-in, so you can connect ChatGPT directly, without copying a token.

1. In ChatGPT, turn on developer mode and create a new connector (the exact menu names change between ChatGPT versions; look under **Settings → Connectors** or **Apps**).
2. Use this URL for the MCP server:

   ```
   https://control.boardroom-ai.ae/mcp/connect
   ```

3. Choose **OAuth** as the authentication method, if ChatGPT asks.
4. ChatGPT opens the Revenue Control sign-in page. Sign in as the **workspace owner** and approve the connection on the consent screen.
5. In a new chat, enable the connector and ask: *"Call whoami, then list open leads without a follow-up task."*

What happens behind the scenes:

- ChatGPT registers itself through dynamic client registration and uses the authorization code flow with PKCE (S256). No client secret is involved.
- Only the workspace owner can approve the connection. The token ChatGPT receives is read-only, appears in your token list under **Integrations → API and MCP → Boardroom MCP** and can be revoked there at any time. It expires after 30 days, after which ChatGPT asks you to sign in again.
- `https://control.boardroom-ai.ae/mcp/connect` asks for sign-in on the first request, which is what starts the flow in ChatGPT. `https://control.boardroom-ai.ae/mcp` is the same server for clients that send an owner-issued token in a header.

If you prefer not to use OAuth, use the OpenAI API route below, or one of the Claude or Cursor guides.

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
