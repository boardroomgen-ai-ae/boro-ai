# Make (formerly Integromat) template

[form-to-lead.blueprint.json](form-to-lead.blueprint.json): a webhook receives a form, an HTTP module creates the lead through `POST /api/v1/leads`, and the webhook answers with the lead id.

## Set up

1. In Revenue Control: **Settings → API → create a key with read and write**.
2. In Make: **Create a new scenario → ⋯ → Import Blueprint**, then choose the file.
3. Open module 1 (Webhooks) and create a webhook. Send it one test submission so Make learns the fields.
4. Open module 2 (HTTP) and replace `YOUR_API_KEY` in the `Authorization` header with your key. Then turn on **Confidential** in the scenario settings, so the key and the payload don't appear in execution logs shared with your team.
5. Run once with demo data, check that the lead appears in the CRM, then schedule the scenario.

The JSON body is built from the webhook fields `name`, `phone`, `email`, `utm_campaign`, `form_id` and `message`. Rename them in module 2 if your form is different. Phone or e-mail is required.

> Make's module versions change over time. If the import complains, add an **HTTP → Make a request** module by hand with the same URL, method, header and JSON body.
