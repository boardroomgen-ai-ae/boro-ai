# Security policy

## Reporting a vulnerability

Please report security issues **privately** through GitHub: open the **Security** tab of this repository and press **Report a vulnerability** (private vulnerability reporting). Only the maintainers see the report.

Do **not** open a public GitHub issue, discussion or pull request for a vulnerability.

Include:

- what you found and where (URL, endpoint, MCP tool, or file in this repository);
- steps to reproduce, with a proof of concept if you have one;
- the impact you believe it has;
- how to credit you, if you'd like credit.

**Only test against a workspace you own.** Never access, change or keep another customer's data. If you come across someone else's data by accident, stop, don't keep a copy, and tell us.

## What to expect

| | Target |
|---|---|
| Acknowledgement | within 3 business days |
| First assessment | within 10 business days |
| Fix or mitigation for confirmed critical issues | as fast as we can, and we keep you updated |

We won't take legal action against good-faith research that follows this policy, avoids privacy violations and service disruption, and gives us reasonable time to fix the issue before anything is disclosed.

## Scope

In scope:

- the hosted service at `https://control.boardroom-ai.ae`, including the MCP endpoint `/mcp` and the REST API `/api/v1`;
- the website chat widget script;
- the documentation and examples in this repository, for example an example that encourages an unsafe practice.

Out of scope:

- denial-of-service and volumetric testing;
- social engineering of staff or customers, and physical attacks;
- reports from automated scanners with no demonstrated impact;
- missing best-practice headers with no exploitable consequence;
- third-party services and packages, which you should report to their maintainers.

## If you leaked a key or token

If you committed or published a Revenue Control API key or MCP token by mistake, **revoke it in your cabinet straight away** (Settings → API, or Integrations → API and MCP → Boardroom MCP) and issue a new one. Deleting the file or the commit is not enough.

## Supported versions

This repository contains documentation and examples only. The hosted service is always the current version. Report against what is live.
