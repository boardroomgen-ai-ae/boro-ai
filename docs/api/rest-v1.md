# REST API v1

A small HTTPS API for your own systems: website forms, internal tools, automations in n8n or Make, and scripts.

| | |
|---|---|
| Base URL | `https://control.boardroom-ai.ae/api/v1` |
| Auth | `Authorization: Bearer YOUR_API_KEY` (or `X-Api-Key: YOUR_API_KEY`) |
| Format | JSON, UTF-8 |
| Rate limit | 60 requests per minute per key |
| CORS | Allowed. Still, never put a key in browser code that the public can see (see below). |

`GET /api/v1` without a key returns a machine-readable list of the endpoints.

## Keys

The workspace **owner or admin** creates keys in **Settings → API**.

- A key is either **read**, or **read and write**. Only a write key can create leads.
- The key value is shown **once**. Only a hash is stored.
- The workspace comes from the key. No request parameter selects a workspace, so a key can never read another business's data.
- Revoke a key in the same place. A revoked key stops working on its next request.

> **Keep keys on a server.** A key in a public web page is readable by anyone who opens the page. To capture leads from a website, send the form to your own backend, or to n8n or Make, and call the API from there. For a live chat on your site, use the [chat widget](../../examples/widget/README.md) instead, which uses a separate public, rate-limited channel key.

## Endpoints

### `GET /api/v1/leads`

People in your CRM: name, phone, e-mail, stage and branch.

| Query | Type | Notes |
|---|---|---|
| `limit` | integer | 1–200, default 50 |
| `offset` | integer | default 0 |
| `updated_since` | ISO date-time | only records changed after this moment |
| `branch` | string | branch name, if your workspace has branches |

### `GET /api/v1/deals`

Money: amount, currency, stage and pipeline. Same query parameters as `/leads`.

### `GET /api/v1/tasks`

| Query | Type | Notes |
|---|---|---|
| `status` | `open` · `done` · `all` | default `open` |
| `limit`, `offset`, `branch` | | as above |

**List response**

```json
{
  "data": [ { "id": "00000000-0000-4000-8000-000000000101", "name": "Layla Demo", "stage": "Qualified" } ],
  "total": 42,
  "limit": 50,
  "offset": 0
}
```

Fields inside `data` are illustrative. Read a few records from your own workspace to see the exact shape.

### `POST /api/v1/leads` (write key)

Creates a lead through the **same intake as every channel**: the same duplicate rules, the same assignment queue and the same "new lead" alerts. If the phone or e-mail already belongs to a lead, that lead is matched instead of duplicated.

| Field | Type | Notes |
|---|---|---|
| `name` | string | |
| `phone` | string | 6–15 digits. **Phone or e-mail is required.** |
| `email` | string | |
| `title` | string | deal title |
| `company` | string | |
| `value` | number | 0 or more |
| `currency` | string | ISO 4217, e.g. `AED` |
| `source_campaign` | string | e.g. a UTM campaign |
| `external_id` | string | your own id for this lead |
| `branch` | string | an active branch name |
| `note` | string | added to the card |

Maximum body size: 16 KB.

**Response:** `201 Created` for a new lead, or `200 OK` when an existing one was matched:

```json
{ "id": "00000000-0000-4000-8000-000000000301", "created": true, "matched_by": null }
```

## Rate-limit headers

Every authenticated response carries:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 57
X-RateLimit-Reset: 1760000000
```

When you exceed the limit you get `429` with `Retry-After` (seconds).

## Errors

Errors share one shape:

```json
{ "error": { "code": "INVALID_KEY", "message": "The key is not valid or has been revoked." } }
```

| HTTP | Code | When |
|---|---|---|
| 400 | `INVALID_JSON` | The body is not a JSON object |
| 400 | `BAD_STATUS` | `status` is not `open`, `done` or `all` |
| 400 | `BAD_UPDATED_SINCE` | `updated_since` is not an ISO date-time |
| 400 | `PHONE_OR_EMAIL_REQUIRED`, `BAD_EMAIL`, `BAD_PHONE`, `BAD_VALUE`, `BAD_CURRENCY`, `UNKNOWN_BRANCH` | Validation of a new lead |
| 401 | `API_KEY_REQUIRED` | No key was sent |
| 401 | `INVALID_KEY` | The key is wrong or revoked |
| 403 | `SCOPE_REQUIRED` | A read-only key tried to create a lead |
| 404 | `NOT_FOUND` | Unknown endpoint |
| 405 | `METHOD_NOT_ALLOWED` | Wrong HTTP method |
| 413 | `PAYLOAD_TOO_LARGE` | Body over 16 KB |
| 422 | `INTERNAL_NUMBER` | The phone number belongs to the workspace itself |
| 429 | `RATE_LIMITED`, `TOO_MANY_BAD_KEYS` | Slow down, and see `Retry-After` |
| 502 / 503 | `READ_FAILED`, `CREATE_FAILED`, `API_UNAVAILABLE` | Temporary. Retry with backoff. |

## Examples

- [curl](../../examples/rest/curl.sh)
- [JavaScript (Node 18+)](../../examples/javascript/)
- [Python 3](../../examples/python/)
- [n8n: form to lead](../../examples/n8n/)
- [Make: form to lead](../../examples/make/)
