# Small Group — Client Management & Sales System

A folder-based CRM and sales material generator. Add clients as folders, drop in transcripts and docs, and let AI generate pitch decks, sales scripts, and proposals.

Works with **Claude Code**, **Cursor**, **Windsurf**, or any AI coding assistant that reads `CLAUDE.md`.

---

## Quick Start

### Add a new person

Just tell your AI assistant:

> "Add a new client named John Smith"

It will ask you:
1. Who is this? (name, company, industry)
2. What do you have? (call transcript, chat, notes, etc.)
3. What do you need? (sales materials, just store info, etc.)

Then it creates a folder:

```
JohnSmith/
├── _meta.json          ← contact info (auto-created)
├── 01_transcript.md    ← whatever you provide
├── 02_sales_script.md  ← generated if requested
├── 03_pitch_deck.html  ← generated if requested
└── 04_proposal.md      ← generated if requested
```

### Generate sales materials

Drop a discovery call transcript into a client folder and say:

> "Generate sales materials for John Smith"

The system reads the transcript and produces a sales script, pitch deck, and proposal using the client's own words.

### Just store documents

Not every contact needs a full pitch. You can say:

> "Add Sarah as a lead, no materials needed yet"

It creates the folder with `_meta.json` only. Add documents later when ready.

---

## CRM Dashboard

A visual dashboard auto-generates from all client folders.

**View it:** `https://smallgroup-client.vercel.app/crm_5dc3e405`

- Shows all contacts with status, industry, and doc count
- Click a contact to see all their documents
- Click any document for a full preview (markdown, HTML, images, PDFs)
- Search by name, company, industry, or status
- Updates automatically on every `git push`

---

## How It Works

```
You add/edit client folders → git push → Vercel rebuilds CRM → live dashboard updates
```

Every client folder has a `_meta.json` with contact info:

```json
{
  "name": "John Smith",
  "company": "Smith Co",
  "email": "john@smith.co",
  "phone": "",
  "industry": "SaaS",
  "status": "lead",
  "source": "Reddit",
  "notes": "Interested in lead gen automation",
  "created": "2026-02-25"
}
```

**Status values:** `lead` → `pitched` → `active` → `closed` / `archived`

---

## Folder Structure

```
lead_nurturing/
├── CLAUDE.md           ← AI instructions (the playbook)
├── _learnings.md       ← insights from past engagements
├── _templates/         ← sales script, pitch deck, proposal templates
├── _internal/          ← training & reference materials
├── _research/          ← SEO, growth, market research
├── build_crm.mjs      ← CRM build script (runs on deploy)
├── Ernest/             ← client folder
├── Joseph/             ← client folder
├── Shriya/             ← client folder
└── ...
```

---

## Commands Reference

| What you want | What to say |
|---------------|-------------|
| Add a new contact | "Add [name] as a new client" |
| Add a transcript | "Here's the discovery call transcript for [name]" |
| Generate everything | "Generate sales materials for [name]" |
| Generate one thing | "Create a pitch deck for [name]" |
| Update status | "Mark [name] as active" |
| Update CRM | Just `git push` — it rebuilds automatically |
| View CRM locally | `node build_crm.mjs` then open `crm_5dc3e405.html` |
