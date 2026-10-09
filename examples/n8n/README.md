# n8n templates

Both workflows call only the public REST API v1 and import **inactive**.

| File | What it does |
|---|---|
| [form-to-lead.workflow.json](form-to-lead.workflow.json) | A website form posts to an n8n webhook. n8n creates the lead in Revenue Control and replies to the form with the lead id. |
| [daily-open-tasks.workflow.json](daily-open-tasks.workflow.json) | Every morning at 08:00 Dubai time, n8n reads open tasks and builds a short text summary. Connect the last node to Telegram, Slack or e-mail. |

## Set up

1. In Revenue Control: **Settings → API → create a key**. Use *read and write* for the form template and *read* for the daily list.
2. In n8n: **Credentials → New → Header Auth**
   - Name: `Revenue Control API key`
   - Header name: `Authorization`
   - Header value: `Bearer YOUR_API_KEY`
3. **Workflows → Import from file**, choose a template, open the HTTP Request node and select that credential.
4. Test with demo data, then activate.

The form template expects a JSON body with `name`, `phone` and/or `email`, plus optional `service`, `message`, `utm_campaign` and `form_id`. Map your form's fields in the HTTP Request node if they are named differently.

## Reading data through MCP instead

n8n's **MCP Client Tool** node (used with an AI Agent node) can connect to `https://control.boardroom-ai.ae/mcp` with transport *HTTP Streamable* and Bearer authentication using an MCP token. See [docs/mcp](../../docs/mcp/README.md).
