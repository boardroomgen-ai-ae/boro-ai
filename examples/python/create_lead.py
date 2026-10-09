"""Revenue Control REST API v1: create a lead (Python 3.8+, standard library only).

    BOARDROOM_API_KEY=YOUR_API_KEY python create_lead.py

The key must have write access. Demo data only.
"""
import json
import os
import urllib.error
import urllib.request

BASE = "https://control.boardroom-ai.ae/api/v1"
KEY = os.environ.get("BOARDROOM_API_KEY")
if not KEY:
    raise SystemExit("Set BOARDROOM_API_KEY first.")

lead = {
    "name": "Demo Clinic Patient",
    "phone": "+971520000000",
    "email": "patient@example.com",
    "title": "Consultation request",
    "currency": "AED",
    "source_campaign": "google_search",
    "external_id": "form-0042",
    "note": "Asked about weekend availability",
}

req = urllib.request.Request(
    BASE + "/leads",
    data=json.dumps(lead).encode("utf-8"),
    headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"},
    method="POST",
)
try:
    with urllib.request.urlopen(req, timeout=30) as res:
        body = json.load(res)
        print("Created" if body["created"] else "Matched existing", body["id"])
except urllib.error.HTTPError as err:
    body = json.load(err)
    raise SystemExit("%s %s: %s" % (err.code, body["error"]["code"], body["error"]["message"]))
