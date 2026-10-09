"""Revenue Control REST API v1: list leads (Python 3.8+, standard library only).

    BOARDROOM_API_KEY=YOUR_API_KEY python list_leads.py
"""
import json
import os
import time
import urllib.error
import urllib.request

BASE = "https://control.boardroom-ai.ae/api/v1"
KEY = os.environ.get("BOARDROOM_API_KEY")
if not KEY:
    raise SystemExit("Set BOARDROOM_API_KEY first.")


def get(path, attempts=3):
    req = urllib.request.Request(BASE + path, headers={"Authorization": "Bearer " + KEY})
    for attempt in range(1, attempts + 1):
        try:
            with urllib.request.urlopen(req, timeout=30) as res:
                return json.load(res)
        except urllib.error.HTTPError as err:
            if err.code == 429 and attempt < attempts:
                time.sleep(int(err.headers.get("Retry-After", "5")))
                continue
            body = json.load(err)
            raise SystemExit("%s %s: %s" % (err.code, body["error"]["code"], body["error"]["message"]))


page = get("/leads?limit=10")
print("Total leads:", page["total"])
for lead in page["data"]:
    print(lead.get("id"), lead.get("name"), lead.get("stage"))

tasks = get("/tasks?status=open&limit=10")
print("Open tasks:", tasks["total"])
