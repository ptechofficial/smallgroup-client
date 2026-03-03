# Small Group CRM

A folder-based client pipeline. Each client is a folder with a `_meta.json` + documents. Push to GitHub and the CRM dashboard rebuilds automatically on Vercel.

**Dashboard:** https://smallgroup-client.vercel.app/crm_5dc3e405

---

## For New Team Members

This repo works with any AI coding assistant — **Claude Code**, **Cursor**, **Antigravity**, **Windsurf**, etc. The AI reads `CLAUDE.md` (the 166KB playbook) and knows how to generate sales materials, manage clients, and follow our conventions.

### Setup

1. Clone the repo: `git clone git@github-personal:ptechofficial/smallgroup-client.git`
2. Open the folder in your AI tool of choice
3. Start talking to the AI — it already knows the system

That's it. No `npm install` needed for day-to-day work. The build only runs on Vercel during deployment.

---

## Common Tasks (Copy-Paste Prompts)

### Add a new client

```
Add a new client: [Name], [Company], [Industry].
Source: [how they found us]. Notes: [one-line context].
```

The AI will create:
```
ClientName/
└── _meta.json
```

### Add a call transcript

```
Here's the discovery call transcript for [Name]:
[paste transcript]
```

The AI will save it as `01_discovery_call_transcript.md` (or the next available number) and update `_meta.json` with key details from the call.

### Generate sales materials from a transcript

```
Generate sales materials for [Name]
```

The AI reads the transcript, extracts intel, and generates:
- **Sales script** — follows Straight Line Selling (6 steps: Frame → Discovery → Pitch → Phase 2 → Pricing → Close)
- **Pitch deck** — HTML slide deck with flow diagrams
- **Proposal** — scope, timeline, pricing, T&Cs

### Add a follow-up document (WhatsApp chat, email, meeting notes)

```
Add this WhatsApp chat for [Name]:
[paste chat]
```

```
Add this follow-up call transcript for [Name] from [date]:
[paste transcript]
```

The AI saves it with the next number in sequence and updates `_meta.json` timeline.

### Update client status

```
Mark [Name] as active — deal closed, starting next week
```

### Push changes to update the dashboard

```
Commit and push the CRM changes
```

Or manually:
```bash
git add .
git commit -m "Update [Name] — [what changed]"
git push
```

Vercel auto-deploys on push. Dashboard updates in ~30 seconds.

---

## How It All Works

```
Add/edit client folder
       |
    git push
       |
  Vercel runs: node build_crm.mjs
       |
  Scans all client folders, reads _meta.json + all docs
       |
  Generates crm_5dc3e405.html (single-page app with all data embedded)
       |
  Live at: https://smallgroup-client.vercel.app/crm_5dc3e405
```

**Never edit `crm_5dc3e405.html` manually** — it's auto-generated on every deploy.

---

## Client Folder Structure

```
ClientName/
├── _meta.json                          # REQUIRED — contact info + timeline
├── 01_discovery_call_transcript.md     # First document (usually the call)
├── 02_whatsapp_chat.md                 # Follow-up conversations
├── 03_sales_script.md                  # Generated sales script
├── 04_pitch_deck.html                  # Generated pitch deck
├── 05_proposal.md                      # Generated proposal
├── 06_revised_proposal.md              # If pricing/scope changed
├── 07_followup_call_transcript_mar01.md # Additional call transcripts
├── assets/                             # Screenshots, images, diagrams
└── n8n_workflows/                      # Automation workflow JSONs (if applicable)
```

### Naming Rules

- **Folder name**: Client's first name (e.g., `Ernest/`, `Shriya/`). Use `FirstName LastName/` only if first names collide.
- **File numbering**: Sequential, starting at `01`. Numbers are flexible — use what makes sense chronologically.
- **File names**: `NN_descriptive_name.md` — lowercase, underscores, no spaces.

### Common File Types

| Document | Naming Pattern |
|----------|---------------|
| Discovery call | `NN_discovery_call_transcript.md` |
| Follow-up call | `NN_followup_call_transcript_MMMDD.md` |
| WhatsApp chat | `NN_whatsapp_chat.md` |
| Follow-up email | `NN_followup_email.md` |
| Pre-call questions | `NN_pre_call_questions.md` |
| Requirements analysis | `NN_requirement_analysis.md` |
| Sales script | `NN_sales_script.md` |
| Pitch deck | `NN_pitch_deck.html` |
| Proposal | `NN_proposal.md` |
| Revised proposal | `NN_revised_proposal.md` |

---

## `_meta.json` Reference

Every client folder **must** have a `_meta.json`. Here's the full schema:

```json
{
  "name": "Full Name",
  "company": "Company Name",
  "email": "email@example.com",
  "phone": "+1-xxx-xxx-xxxx",
  "industry": "Industry or Niche",
  "status": "lead",
  "source": "How they found us (Calendly, Reddit, referral, etc.)",
  "notes": "One-line summary of the deal and key context",
  "created": "2026-03-01",
  "timeline": [
    { "date": "2026-03-01", "event": "Discovery call — identified 2 systems needed" },
    { "date": "2026-03-05", "event": "Pitch deck and proposal sent" }
  ],
  "current_status": "Proposal sent, waiting for budget approval. Follow-up scheduled for Friday."
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Client's full name |
| `status` | string | Pipeline stage (see below) |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `company` | string | Company name (empty string if unknown) |
| `email` | string | Email address |
| `phone` | string | Phone number |
| `industry` | string | Industry / niche |
| `source` | string | How the lead came in |
| `notes` | string | Key context — deal size, systems discussed, budget, blockers |
| `created` | string | ISO date (YYYY-MM-DD) |
| `timeline` | array | Chronological events with dates |
| `current_status` | string | Latest update — what's happening right now |

### Status Values

| Status | Meaning | Dashboard Color |
|--------|---------|-----------------|
| `lead` | Initial contact, no proposal yet | Gray |
| `pitched` | Proposal/deck sent, awaiting decision | Blue |
| `active` | Deal closed, work in progress | Green |
| `closed` | Engagement completed | Red |
| `archived` | No longer relevant | Light gray |

Dashboard sorts by: `active` > `pitched` > `lead` > `closed` > `archived`, then by creation date (newest first).

---

## Repo Structure

```
SmallGroup-CRM/
├── CLAUDE.md              # AI playbook (166KB) — the brain of the system
├── README.md              # You are here
├── _learnings.md          # Insights from past deals (AI reads this before new work)
├── _templates/            # Reusable templates
│   ├── sales_script_template.md
│   ├── pitch_deck_template.html
│   └── proposal_template.md
├── _internal/             # Sales training, n8n workflows, strategy docs
├── _research/             # SEO guides, growth research, market references
├── _registry.md           # Maps hashed URLs to client names (for public pitch deck links)
│
├── build_crm.mjs          # CRM builder (runs on Vercel deploy)
├── crm_5dc3e405.html      # Auto-generated dashboard (DO NOT EDIT)
├── index.html             # Blank landing page (CRM is unlisted)
├── vercel.json            # Deployment config
├── package.json           # Just: { "build": "node build_crm.mjs" }
│
├── Ernest/                # Client folders...
├── Joseph/
├── Shriya/
├── Matsmith/
├── Filippo/
└── Jason Emer/
```

### Folders the build script ignores

Anything starting with `_` or `.`, plus: `node_modules`, `assets`, `n8n_workflows`.

---

## The Sales Pipeline

When you have a discovery call transcript, the AI follows this pipeline:

```
1. EXTRACT INTEL
   Read transcript → pull out: name, company, ICP, pain points,
   current process, goals, budget, timeline, number of distinct needs

2. DETERMINE PITCH TYPE
   Single need → Single-System Pitch (3-5 pillars, 1 price)
   Multiple independent needs → Multi-System Pitch (separate systems, each priced)

3. GENERATE SALES SCRIPT
   6 steps: Set Frame → Discovery (Roller Coaster) → 3-Pillar Pitch →
   Phase 2 Tease → Pricing & Timeline → Close

4. GENERATE PITCH DECK
   Single: 13 slides (Title → Gap → Overview → Pillars → Results → Pricing → Close)
   Multi: 12 slides (Title → Overview → Per-System deep dives → Summary → Close)

5. GENERATE PROPOSAL
   Overview → Objectives → Scope → Results → Timeline → Investment → T&Cs → Signature

6. UPDATE _meta.json
   Add timeline entry, update status to "pitched", set current_status
```

The AI uses the client's **exact words** from the transcript in all materials.

---

## Sharing Pitch Decks

Pitch decks can be shared via hashed public URLs (client can't guess other clients' URLs):

```bash
# Generate hash for a client
echo -n "clientname" | md5 | head -c 8
# e.g., "ernest" → 1e79137d
```

Then copy `ClientName/NN_pitch_deck.html` to `pitch_HASH.html` at repo root. The URL becomes:
`https://smallgroup-client.vercel.app/pitch_1e79137d`

Current registry is in `_registry.md`.

---

## Pricing Reference

| Service | One-Time Build | Managed/Month |
|---------|---------------|---------------|
| Lead Gen / Outbound | $2,000–5,000 | $500–2,000 |
| Content / SEO / Growth | $5,000–7,500 | $2,000–2,500 |
| Ad Intelligence | $2,000–3,500 | — |
| Website Automation | $500–2,000 | — |

- Month 1: 50% upfront, 50% at month-end
- 6-month commitment for managed option
- Tool/API costs always separate (client pays)
- "Starting at $X" is valid when scope is still unclear

---

## Key Rules

1. **Always read `_learnings.md`** before working on a new client — it has patterns from past deals
2. **Every client folder must have `_meta.json`** — the build script depends on it
3. **Never edit `crm_5dc3e405.html`** — it's regenerated on every deploy
4. **Use the client's exact words** in all sales materials
5. **No outcome guarantees** — promise the system and deliverables, not business results
6. **Conservative projections only** — "targeted", "projected", never "guaranteed"
7. **No AI attribution** in client-facing materials
8. **Update `_learnings.md`** after every closed deal or notable outcome (good or bad)

---

## Local Development

```bash
# Build CRM locally (optional, for testing)
node build_crm.mjs
open crm_5dc3e405.html

# Deploy (just push to main)
git push origin main
# Vercel auto-deploys in ~30 seconds
```

No dependencies to install. `build_crm.mjs` uses only Node.js built-ins (`fs`, `path`, `crypto`).
