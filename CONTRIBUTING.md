# Contributing

Thank you for helping. This repository is the public developer layer for Revenue Control and Boro: **documentation, client setup guides and examples**. The platform itself is a hosted service, and its source code is not here.

## Good contributions

- Fixing a typo, a broken link or an unclear step in the docs.
- A setup guide for another MCP client.
- An example in another language or tool (Go, PHP, Zapier, Google Apps Script…) that uses **only** the public REST API v1 or the public MCP endpoint.
- Translations of the docs.

For anything larger, please [open an issue](../../issues/new/choose) first so we can agree on the shape before you spend time on it.

## Rules for every pull request

1. **No real data, ever.** Use fictional names ("Demo Salon", "Layla Demo"), `example.com` e-mails, ids that are mostly zeros, and phone numbers ending in zeros such as `+971 50 000 0000`.
2. **No credentials.** Use placeholders: `YOUR_API_KEY`, `YOUR_MCP_TOKEN`, `YOUR_WORKSPACE_ID`. If you push a real key by mistake, revoke it in the cabinet first, then tell us.
3. **Public interfaces only.** Examples call `https://control.boardroom-ai.ae/api/v1/…` or `https://control.boardroom-ai.ae/mcp`. Don't document undocumented endpoints you found by inspecting the app.
4. **No screenshots of real workspaces.** Screenshots must come from a demo workspace with fictional data.
5. **Run the check** before you push:

   ```bash
   node scripts/check-no-secrets.mjs
   ```

   It must print `OK`.
6. Keep examples dependency-free where you can, or pin exact versions.
7. LF line endings and UTF-8.

## Licensing

By contributing you agree that your contribution is licensed under the [Apache License 2.0](LICENSE), the license of this repository.

## Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md).
