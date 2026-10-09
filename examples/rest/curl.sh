#!/usr/bin/env sh
# Revenue Control REST API v1: curl examples.
# Set your key in the environment first (never commit it):
#   export BOARDROOM_API_KEY="YOUR_API_KEY"
# Keys are created by the workspace owner or admin in Settings -> API.
set -eu

BASE="https://control.boardroom-ai.ae/api/v1"
: "${BOARDROOM_API_KEY:?Set BOARDROOM_API_KEY first}"

# 0. Endpoint list (no key needed)
curl -s "$BASE"
echo

# 1. Five most recent leads
curl -s "$BASE/leads?limit=5" \
  -H "Authorization: Bearer $BOARDROOM_API_KEY"
echo

# 2. Deals changed since 1 October 2026 (Dubai time)
curl -s "$BASE/deals?updated_since=2026-10-01T00:00:00%2B04:00&limit=50" \
  -H "Authorization: Bearer $BOARDROOM_API_KEY"
echo

# 3. Open tasks
curl -s "$BASE/tasks?status=open" \
  -H "Authorization: Bearer $BOARDROOM_API_KEY"
echo

# 4. Create a lead (needs a key with write access). Demo data only.
curl -s -X POST "$BASE/leads" \
  -H "Authorization: Bearer $BOARDROOM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Layla Demo",
    "phone": "+971500000000",
    "email": "layla@example.com",
    "title": "Website enquiry: facial",
    "value": 450,
    "currency": "AED",
    "source_campaign": "autumn_offer",
    "external_id": "web-form-0001",
    "note": "Prefers Saturday mornings"
  }'
echo

# 5. See your remaining rate limit
curl -s -D - -o /dev/null "$BASE/leads?limit=1" \
  -H "Authorization: Bearer $BOARDROOM_API_KEY" | grep -i '^x-ratelimit'
