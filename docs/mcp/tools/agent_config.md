# `agent_config`

**Scope:** `agent:read`
· **Read-only** · [all tools](../README.md#tools)

## What it does

How the AI agent is set up for this workspace: mode and persona, working hours, hand-over rules, follow-up cadence, triggers, actions, voice scenarios, and the **titles** of its knowledge documents.

## Inputs

None.

The workspace is never an input. It always comes from the token.

## Example prompt

> Summarise how my AI agent is configured. When does it hand over to a person?

## Example output

```json
{
  "ok": true,
  "agent": {
    "mode": "auto_reply",
    "persona": "Front desk",
    "working_hours": "09:00–21:00 Asia/Dubai",
    "handover": [
      "customer asks for a person",
      "complaint"
    ],
    "follow_up": "on"
  },
  "knowledge_documents": [
    {
      "title": "Price list 2026"
    },
    {
      "title": "Opening hours and address"
    }
  ]
}
```

> The output is illustrative and shortened. All names, numbers and ids are fictional. Real responses may carry more fields. Call the tool to see the exact shape for your workspace.

## Notes

- Knowledge **text** is not returned, only titles.
- No credential of any kind is reachable from this tool. An agent's settings are not its keys.
