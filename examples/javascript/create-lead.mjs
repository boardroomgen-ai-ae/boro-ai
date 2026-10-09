// Revenue Control REST API v1: create a lead (Node 18+, no dependencies).
//
//   BOARDROOM_API_KEY=YOUR_API_KEY node create-lead.mjs
//
// The key must have write access. Demo data only.

const BASE = "https://control.boardroom-ai.ae/api/v1";
const KEY = process.env.BOARDROOM_API_KEY;
if (!KEY) throw new Error("Set BOARDROOM_API_KEY first.");

const lead = {
  name: "Omar Sample",
  phone: "+971550000000",
  email: "omar@example.com",
  title: "Property viewing request",
  value: 0,
  currency: "AED",
  source_campaign: "landing_page",
  external_id: "crm-sync-0001",
  note: "Wants a 2-bedroom, viewing next week"
};

const res = await fetch(`${BASE}/leads`, {
  method: "POST",
  headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify(lead)
});
const body = await res.json();
if (!res.ok) {
  console.error(`${res.status} ${body?.error?.code}: ${body?.error?.message}`);
  process.exit(1);
}
console.log(body.created ? `Created lead ${body.id}` : `Matched existing lead ${body.id} by ${body.matched_by}`);
