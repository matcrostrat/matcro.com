# Backlog

## Lightweight CRM — Lead Capture Database
Store form submissions in a database for lead tracking and follow-up.

**Recommended schema:**
| Field | Type | Notes |
|---|---|---|
| `name` | text | From form |
| `email` | text | From form |
| `message` | text | From form |
| `submitted_at` | timestamp | Auto-set on insert |
| `status` | text | `new` → `contacted` → `qualified` → `closed` |
| `source` | text | Hardcode `"website"` now; swap for UTM param later |

**Recommended stack:** Airtable (free tier) — no backend needed, has a REST API that can be called directly from `script.js` inside the existing `.then()` after EmailJS succeeds. Easy to view and update lead status manually.

**How:**
1. Create an Airtable base with the schema above
2. Generate a personal access token with `data.records:write` scope
3. In `script.js`, POST to the Airtable REST API inside the EmailJS `.then()` — runs after a successful form send
4. Store the Airtable token in a small proxy (e.g. a free Cloudflare Worker) to avoid exposing it client-side

---

## Contact Form — Confirmation Email
Send an auto-reply to the user when they submit the contact form.

**How:** EmailJS supports a second template sent to the submitter. Steps:
1. Create a new template in EmailJS — set **To Email** to `{{from_email}}`, write the confirmation copy
2. In `script.js`, chain a second `emailjs.send()` call inside the `.then()` after the primary send succeeds, passing `from_name` and `from_email` as template params
