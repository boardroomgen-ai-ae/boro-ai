# Website chat widget

Put the AI agent on your website with one line. Visitors chat with it, and every conversation lands in your CRM as a lead, with UTM and ad-click attribution captured from the page address.

## Get your snippet

In your workspace open **Integrations → AI chat on your website** and issue a key. The cabinet shows the exact line to paste, with your workspace id and channel key already filled in. Copy that line, not the placeholder below.

```html
<script src="https://control.boardroom-ai.ae/agent-widget.js"
        data-workspace="YOUR_WORKSPACE_ID"
        data-key="YOUR_WIDGET_CHANNEL_KEY"
        data-title="Chat with us"
        data-accent="#2f6bff"
        data-lang="auto"
        data-whatsapp="+971500000000"></script>
```

Put it just before `</body>`. A complete page is in [embed.html](embed.html).

## Attributes

| Attribute | Required | Meaning |
|---|---|---|
| `data-workspace` | yes | Your workspace id, from the cabinet snippet |
| `data-key` | yes | The website **channel key**, from the cabinet snippet |
| `data-title` | no | Header text. By default it comes from the cabinet's widget settings, then from a localized default. |
| `data-greeting` | no | First message the visitor sees |
| `data-accent` | no | Brand colour, hex |
| `data-lang` | no | `auto` (default) or a language code such as `en`, `ru`, `ar`, `uz`, `kk`, `tr`. Arabic is shown right to left. |
| `data-whatsapp` | no | Adds "Continue in WhatsApp" after the visitor leaves a number |

Titles, greetings, quick questions, messenger buttons and the privacy-policy link can also be set in the cabinet, without changing the line on your site.

## Is the key safe in a public page?

Yes. This key is designed to be public, like the app id of any web chat. It can only send visitor messages to your agent, it is rate-limited, and it cannot read your CRM. Its job is different from the REST API key, which must **never** appear in a web page.

If you rotate the widget key in the cabinet, the previous key keeps working for three days, which gives you time to update your site.
