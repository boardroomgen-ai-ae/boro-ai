#!/usr/bin/env node
// check-no-secrets.mjs: a pre-publish check for this repository.
//
//   node scripts/check-no-secrets.mjs          → prints OK, or the findings and exits 1
//
// It refuses:
//   1. credential-shaped strings (JWT, provider keys, private keys, DB URLs with passwords,
//      bot tokens, real-looking Revenue Control keys);
//   2. personal data: e-mail addresses outside an allowlist, phone numbers that are not
//      obviously fake (fake = ends in six or more zeros), real-looking UUIDs (fake = mostly zeros);
//   3. internal identifiers: non-public paths, server-side function names, schema references,
//      automation hosts, long hex strings (hashes / fingerprints);
//   4. a private list of names (customers, infrastructure, ids). That list is stored below
//      ONLY as salted SHA-256 hashes, so this public file does not itself leak what it guards;
//   5. media files nobody has reviewed (see assets/README.md).
//
// Optional: put extra plain-text terms, one per line, in `.secrets-denylist.local` at the repo
// root. That file is git-ignored and never leaves your machine.
//
// A regex check is a safety net, not a proof. Before publishing, also run gitleaks and trufflehog
// and have a person look at every image.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep, extname } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SELF = relative(ROOT, fileURLToPath(import.meta.url)).split(sep).join("/");
const SKIP_DIRS = new Set([".git", "node_modules"]);
const MEDIA = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".mov", ".webm", ".svg", ".pdf"]);

const SALT = "boro-public-check:";
const PRIVATE_HASHES = new Set([
  "afbdc15d22d70aae7abea52683bb55aeef96208e3ca2810366a189a5b56dbae0",
  "091054d4fecb378817037926eded721a0c961ef9423071330488a38ad8707299",
  "6bd0e1adbf43746b1bf3e8b0cd559f4df0686bc8b2a74659a0b4924488575f13",
  "8bab0b2022a4b42b1264d9f9b11cda388686d281db6afc068be68107df8f0b6c",
  "51639e8b57ab8dd02f1bc93fffd66bd0d6a42ce1f8fd1bdee30e093c69f2a813",
  "f6298f7aa8dc318d159f091196295bb26a4f7d9ae4b070a8660f199debf92d56",
  "53f907a5dedb286453c974a3ee933df7242d8bebe067ba9545dc992fe5008941",
  "a8673da0ce03d097809b19b9e254691303ebf1b6714da14791415a73b860b1b0",
  "31d24c278efb23c4b6409049fad21fdb15c639350f262274c691da708a4fe7d5",
  "f99250f4a596443f1c681aee8ad02edc1980f8f1cdbdf733f2242e5345c67839",
  "23a0a88aa23f026f65a7774df4a5becb18c8f7c3144798f8272e3388a1597a11",
  "33e008a7e577664efd1e735fe80bbf5d53f5ef30bb245b5a878008c6ec277ea2",
  "eda674e94cf6c6f98d992368b8961907cbdb94690eb2857228bb3cab6defc80e",
  "4e337ed48dc43e028327b840aedb8ecbb5e673882b24b1ad41d8ec4350bb626e",
  "577a802db52a9da03c54be55352f2499e8100d7774a1cd60757a46dfd64032bd",
  "cdf471fc8b23abc85c0577ae95e08648d7ec90c236bab408cb9c9c859674c363",
  "b1191a37aa1da9934d4a2f601cf545fdb0d1686e37a20287908ce16c0c8506d7",
  "623a7a42c5a5cfb4930e5711aeb0696c9b8df8781ebf1799abe4f3e80d9da428",
  "b26b8deadcd35572e6a38dc2a5c85033c8af4df5b03aa13969e8d9f51e26931d",
  "06d7686ef63e6d60201661d4005ed0c777357fbdab856c2a67383714c7bf4b16",
  "b0cfa462f20c57bd9b471ef1f06ec6ca0b2c43b1f13693dcc9060d301e3bcd0b",
  "13a76f4cc8ba6bac58641257c9dec11f65b0d9b2dce41346424dce461cd0fc5c",
  "f21e53550911011a99c50f19763a98c6e8f26ec22d9451dfc69514509f8d9dcb",
  "69b7e6cf2655df1ba8f647c6f1d908336f2d8372a0e8625c0094de5ae3b2624f",
  "fe86695f9cd187416b924141f9615e7b9878fa660e37b1966b8cd1edfaf7feea",
  "fb772fc43bc22f0d7ef9b31f46a87a2a40daca431e50d240a00639fc3cf820ec",
  "d217e1fa2b8458a37199ef43d98b9b53bd5ff96f2577646e14c9d3c61c01182c",
  "56e32c432722e466f4513ade4b137bdcb635d8e4eb3b190bbcb694b76a4daf4d",
  "930a98f05eb96e756f5f25ec9ff53712c02f406f45a664ca9c689933c0883943",
  "8b669c612db88196b2d2566ec9989927b83c762d5c9fb9f82a9953e83cab57f1",
  "78658c4dc42aa00a18866f2dcb1d87d6c14b4d3328cc3fac4ccabbb2992d33ee",
  "a870b69f34d31c24ecff3020c0ada1ab05ba9cf89bfe65a90a91b93a3fee82d5",
  "0b347aaf02c6ca878fdd698f6beb35ef75b4ca707d04dcb3b969c4f2bf76c029",
  "1375a3d001269d3aaeb582eb128bb6fe6b8a39fdc6c707f4121fe3c31360b08c",
  "06cfa1b186138be0420dcd777586791ccb5fdb8bbd53cefec83a4d40173aa902",
  "aa7ab96d187b644f798bfbae3f27644c08da1201e1d0a27c4b13b41ddadb914d"
]);

// ── 1. credentials ───────────────────────────────────────────────────────────
const CREDENTIALS = [
  ["JWT", /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{5,}/],
  ["private key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["Stripe-style key", /\b(sk|rk|pk)_(live|test)_[A-Za-z0-9]{8,}/],
  ["webhook secret", /\bwhsec_[A-Za-z0-9]{8,}/],
  ["OpenAI/Anthropic-style key", /\bsk-[A-Za-z0-9_-]{20,}/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9]{30,}/],
  ["Slack token", /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{30,}/],
  ["Meta access token", /\bEAA[A-Za-z0-9]{30,}/],
  ["Telegram bot token", /\b\d{8,10}:[A-Za-z0-9_-]{35}\b/],
  ["DB URL with password", /\b(postgres(ql)?|mysql|mongodb(\+srv)?|redis):\/\/[^\s:@/]+:[^\s@/]+@/i],
  ["Revenue Control API key", /\bbrk_[A-Za-z0-9]{4,12}_[A-Za-z0-9_-]{20,}/],
  ["hosting/db access token", /\b(nfp|sbp|sb_secret|sb_publishable)_[A-Za-z0-9]{16,}/],
  ["password assignment", /\b(password|passwd|secret|api_?key|token)\s*[:=]\s*["'][^"'\s]{12,}["']/i]
];

// ── 3. internal identifiers ─────────────────────────────────────────────────
const INTERNAL = [
  ["non-public API path", /\/api\/platform\//i],
  ["non-public agent path", /\/agent\/inbound/i],
  // Lower-case on purpose: server-side names are snake_case; BOARDROOM_API_KEY-style
  // environment variable names in the examples are the customer's own, and are fine.
  ["server-side function name", /\bboardroom_[a-z][a-z0-9_]*/],
  ["schema reference", /\bboardroom\.[a-z_]{3,}\b(?!-)/],
  ["database role / grant detail", /\b(service_role|security definer|row level security|accept-profile)\b/i],
  ["hosting request header", /\bx-nf-[a-z-]+/i],
  ["automation host", /\b[a-z0-9-]*n8n[a-z0-9-]*\.(?!io\b|json\b|md\b)[a-z0-9.-]+\.[a-z]{2,}\b|\.n8n\.cloud\b/i],
  ["long hex string", /\b[a-f0-9]{32,}\b/i]
];

// ── 2. personal data ────────────────────────────────────────────────────────
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const ALLOWED_EMAIL = /^([a-z0-9._%+-]+@example\.(com|org|net)|(security|conduct|hello|support|noreply)@boardroom-ai\.ae|noreply@anthropic\.com)$/i;
const PHONE = /\+\d{1,3}[\s().-]*\d[\d\s().-]{6,}\d/g;
const LOCAL_PHONE = /\b(9715\d{8}|9665\d{8}|79\d{9}|998\d{9})\b/g;
const UUID = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
const fakePhone = (s) => /0{6,}$/.test(s.replace(/\D/g, ""));
const fakeUuid = (s) => (s.match(/0/g) || []).length >= 20;

function hashTerm(term) {
  return createHash("sha256").update(SALT + term.toLowerCase()).digest("hex");
}

function privateTermHits(text) {
  const hits = new Set();
  const lower = text.toLowerCase();
  const compounds = lower.match(/[\p{L}\p{N}]+(?:[-_.][\p{L}\p{N}]+)*/gu) || [];
  let prevLast = "";
  for (const c of compounds) {
    const parts = c.split(/[-_.]/).filter(Boolean);
    const candidates = new Set([c, ...parts]);
    for (let i = 0; i + 1 < parts.length; i++) {
      candidates.add(parts[i] + parts[i + 1]);
      candidates.add(parts[i] + "-" + parts[i + 1]);
    }
    if (prevLast && parts[0]) candidates.add(prevLast + parts[0]);
    for (const cand of candidates) if (PRIVATE_HASHES.has(hashTerm(cand))) hits.add(cand);
    prevLast = parts[parts.length - 1] || "";
  }
  return [...hits];
}

function localDenylist() {
  const p = join(ROOT, ".secrets-denylist.local");
  if (!existsSync(p)) return [];
  return readFileSync(p, "utf8").split(/\r?\n/).map((s) => s.trim().toLowerCase()).filter((s) => s && !s.startsWith("#"));
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const reviewedPath = join(ROOT, "assets", "REVIEWED.txt");
const reviewed = existsSync(reviewedPath) ? readFileSync(reviewedPath, "utf8") : "";
const extra = localDenylist();
const findings = [];
const add = (file, line, rule, sample) => findings.push({ file, line, rule, sample });
// Never print a full match: a report that echoes a secret is itself a leak.
const redact = (s) => (s.length <= 8 ? s[0] + "…" : s.slice(0, 4) + "…" + s.slice(-2));

const files = walk(ROOT);
for (const full of files) {
  const rel = relative(ROOT, full).split(sep).join("/");
  if (rel === SELF || rel === ".secrets-denylist.local") continue;
  const ext = extname(rel).toLowerCase();
  if (MEDIA.has(ext)) {
    if (!reviewed.includes(rel.replace(/^assets\//, "")) && !reviewed.includes(rel)) {
      add(rel, 0, "media file not listed in assets/REVIEWED.txt", "");
    }
    continue;
  }
  let text;
  try { text = readFileSync(full, "utf8"); } catch { continue; }
  if (text.includes("\r\n")) add(rel, 0, "CRLF line endings (use LF)", "");
  const lines = text.split("\n");
  lines.forEach((ln, i) => {
    const n = i + 1;
    for (const [rule, re] of CREDENTIALS) { const m = ln.match(re); if (m) add(rel, n, "credential: " + rule, redact(m[0])); }
    for (const [rule, re] of INTERNAL) { const m = ln.match(re); if (m) add(rel, n, "internal: " + rule, redact(m[0])); }
    for (const m of ln.matchAll(EMAIL)) if (!ALLOWED_EMAIL.test(m[0])) add(rel, n, "personal data: e-mail", redact(m[0]));
    for (const m of ln.matchAll(PHONE)) if (!fakePhone(m[0])) add(rel, n, "personal data: phone", redact(m[0]));
    for (const m of ln.matchAll(LOCAL_PHONE)) if (!fakePhone(m[0])) add(rel, n, "personal data: phone", redact(m[0]));
    for (const m of ln.matchAll(UUID)) if (!fakeUuid(m[0])) add(rel, n, "internal: real-looking UUID", redact(m[0]));
    // This repository's own public address and its MCP Registry name are public by
    // definition; they are removed before the private-name check, nothing else is.
    const publicSafe = ln
      .replace(/github\.com\/boardroomgen-ai-ae\/boro-ai\b/gi, "")
      .replace(/io\.github\.boardroomgen-ai-ae\/boro-ai\b/gi, "")
      // the same public address as catalog badges write it
      .replace(/io\.github\.boardroomgen--ai--ae%2Fboro--ai/gi, "")
      .replace(/github\/stars\/boardroomgen-ai-ae\/boro-ai\b/gi, "")
      .replace(/smithery\.ai\/servers\/boardroom-gen\/revenue-control\b/gi, "");
    for (const hit of privateTermHits(publicSafe)) add(rel, n, "private name or id (hashed list)", redact(hit));
    const low = ln.toLowerCase();
    for (const term of extra) if (low.includes(term)) add(rel, n, "private term (.secrets-denylist.local)", redact(term));
  });
}

if (findings.length) {
  for (const f of findings) console.log(`${f.file}:${f.line}  ${f.rule}${f.sample ? "  [" + f.sample + "]" : ""}`);
  console.log(`\nFAIL: ${findings.length} finding(s) in ${files.length} files.`);
  process.exit(1);
}
console.log(`OK: ${files.length} files checked, 0 findings` + (extra.length ? `, plus ${extra.length} local terms.` : "."));
