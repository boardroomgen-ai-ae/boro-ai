// Revenue Control REST API v1: list leads, page by page (Node 18+, no dependencies).
//
//   BOARDROOM_API_KEY=YOUR_API_KEY node list-leads.mjs
//
// Run this on a server or your own machine, never in a public web page.

const BASE = "https://control.boardroom-ai.ae/api/v1";
const KEY = process.env.BOARDROOM_API_KEY;
if (!KEY) throw new Error("Set BOARDROOM_API_KEY first.");

async function get(path) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` } });
    if (res.status === 429 && attempt <= 3) {
      const wait = Number(res.headers.get("retry-after") || 5);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    const body = await res.json();
    if (!res.ok) throw new Error(`${res.status} ${body?.error?.code}: ${body?.error?.message}`);
    return body;
  }
}

const pageSize = 100;
let offset = 0;
let all = [];
for (;;) {
  const page = await get(`/leads?limit=${pageSize}&offset=${offset}`);
  all = all.concat(page.data);
  offset += page.data.length;
  if (page.data.length === 0 || offset >= page.total) break;
}
console.log(`Read ${all.length} leads.`);
console.table(all.slice(0, 10).map((l) => ({ id: l.id, name: l.name, stage: l.stage })));
