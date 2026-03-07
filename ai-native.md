# Steps to Make Small Group AI-Native Agency

---

```
┌─────────────┐
│   LEAD GEN  │ ← Content, Outbound, Referral
└──────┬──────┘
       ↓
┌─────────────┐
│ LEAD NURTURE│ ← Warmup before they get on a call
└──────┬──────┘
       ↓
┌─────────────┐
│  DISCOVERY  │ ← We learn their problems
│    CALL     │
└──────┬──────┘
       ↓
┌─────────────┐
│ SALES CALL  │ ← Pitch, proposal, negotiate
└──────┬──────┘
       ↓
┌─────────────┐
│    CLOSE    │ ← Contract signed, payment in
└──────┬──────┘
       ↓
┌─────────────┐
│ ONBOARDING  │ ← Set them up, create channels
└──────┬──────┘
       ↓
┌─────────────┐
│  DELIVERY   │ ← AI does 80%, humans do QC
└──────┬──────┘
       ↓
┌─────────────┐
│   UPDATES   │ ← Client always knows what's happening
└──────┬──────┘
       ↓
┌─────────────┐
│   PAYMENT   │ ← Tracked, invoiced, on time
└──────┬──────┘
       ↓
┌─────────────┐
│   PEOPLE    │ ← Productive, paid, reviewed
└──────┬──────┘
       ↓
┌─────────────┐
│  COMPANY    │ ← Margins, taxes, pipeline, growth
│   REVIEW    │
└─────────────┘
```

---

# BARE MINIMUM

What Small Group needs to call itself an AI-Native Agency.

---

## 1. Lead Generation Engine

**Outbound:** Define ICP → build prospect lists (Apollo/LinkedIn) → enrich → Claude writes value-first messages → send via email/LinkedIn DM → track in sheet.

**Inbound:** LinkedIn 1 post/day, YouTube 1 video/week. Every piece of content drives to VSL.

**VSL:** A video explaining how we help businesses become AI-native. This is the top of funnel. Every outbound message, every LinkedIn post, every YouTube video → links to the VSL → VSL drives to Cal.com booking.

Playbooks: `_skills/linkedin/`, `_skills/youtube/`, `linkedin-quick-start.md`.

---

## 2. Lead Nurturing

Starts the moment someone books on Cal.com.

**Email warmup:** Confirmation email with pre-call form (biggest challenge, current tools, budget range) + relevant case study link.

**Client research:** Claude auto-researches the prospect — website, LinkedIn, company data, recent news. Saved to lead profile in CRM.

**WhatsApp warmup:** 24hrs before call — personal WhatsApp message from sales guy with a 1-liner about what we'll cover + a relevant result we've gotten for a similar business.

By the time they show up, they've given us info, seen our proof, and feel like we already know them.

---

## 3. Sales Intelligence System

For every client-facing interaction, AI prepares the person before and processes everything after.

**Discovery Call:**
- Goal of the call, script, key questions to ask, phrases for stronger presence
- Delivered to sales guy's email 2 hours before
- Fathom records and transcribes the call
- After call: Claude extracts pain points, budget signals, objections, timeline, what excited them

**Sales Call:**
- Goal of the call, personalized pitch script, phrases, proposal PDF
- All generated from the discovery call transcript
- Delivered to sales guy's email 2 hours before
- After call: transcript captured, intel extracted, next steps generated

**Proposal Generator:**
- Once scope is finalized, Claude generates full proposal from transcript data + our positioning templates
- Uses `_skills/ai-native/prompts/` and `_skills/sales/` frameworks

**Follow-up & Future Conversations:**
- For any future touchpoint with a prospect or client, AI agent creates the right message — follow-up emails, check-in messages, re-engagement after going cold — all based on full conversation history from CRM

---

## 4. Client Onboarding

Sale closed → sequence fires:

- **WhatsApp group** created: client + their key person + assigned dev(s) + sales lead + Prakarsh
- **Notion workspace** set up: project board with scope, milestones, task structure
- **GitHub repo** created (if dev work): standard structure, CLAUDE.md with client context
- **Any other tools** the project needs: Vercel, hosting, API keys, etc.

**Client directory:** A structured profile for each client — contact info, scope, pricing, tools, access credentials, communication preferences. Pushed to CRM and kept updated.

---

## 5. Client Updates & Reporting

**Weekly reports:** n8n pulls completed work → Claude writes client-facing summary.

**Review gate:** Report goes to assigned Small Group team member first for review and edits. Only after approval does it go to the client.

**Milestone updates:** Major milestone hit → Claude drafts update → team member reviews → sent to client.

**Monthly report:** Claude generates comprehensive monthly review from all weekly data. Team member reviews before sending. This document justifies the retainer.

Nothing goes to the client without a human reviewing it first.

---

## 6. CRM

Single source of truth for everything client-related.

Every conversation (WhatsApp, email, call transcript, Slack), every pitch, every script, every proposal, every invoice, every note — all tagged by client, date, and type.

Claude can query the full history at any point. Before any call, Claude pulls context from here. If a team member leaves, zero context is lost. Feeds into reporting, reviews, health scoring, and content ideas.

---

## 7. Payment Tracking & Invoicing

**Payment timeline** set during client onboarding — when payments are due, how much, which milestones trigger invoices.

**Auto-reminders** sent to the sales guy: 3 days before due, 1 day after overdue, 7 days overdue escalation.

**If payment is delayed:** Sales guy has to provide justification — logged in CRM. No silent overdue invoices.

**When paid:** Notification to sales guy and finance. Invoice status updated. Receipt sent to client.

Builds on SmallGroup-Invoice (multi-currency, GST/LUT already handled). Add: TDS tracking, quarterly GST summary, year-end P&L for CA.

---

## 8. Employee Daily Updates & Team Management

Every day, each team member submits what they worked on — with proof (screenshots, links, commits, whatever is relevant). Not just "I worked on X" — show the output.

Data flows to a **Team Management dashboard on a separate Small Group site**. Shows per-employee: daily submissions, work patterns, client allocation, consistency.

Brings back what Saurabh started, but structured and permanent. The data here feeds into employee reviews, client reporting cross-checks, and margin calculations (who spent time on what).

---

## 9. Employee Salary & Records

**Records:** Name, role, joining date, salary (fixed + variable), bank details, PAN, UAN. History of changes, leaves.

**Monthly payslip:** Auto-generated PDF (reuse SmallGroup-Invoice pattern). Sent to employee by 1st of every month.

**Timely messages:** Salary credited notifications, upcoming deductions (TDS, PF), tax-saving reminders, Form 16 availability.

**Disbursement tracking:** Amount, date paid, UTR number. Feeds directly into company review dashboard.

---

## 10. Company Monthly Review Dashboard

A single dashboard that gives the full picture of Small Group every month.

**Expense & Earnings:** Total revenue (invoiced + collected), total costs (salaries + tools + other), margins (gross, net, per-client).

**Client Reports:** Active clients, project status per client, revenue per client, outstanding payments.

**Sales Pipeline Review:** Leads generated, calls booked, deals in progress, deals closed, conversion rates, pipeline value.

**Content Pipeline Review:** Posts published, videos published, engagement metrics, leads from content, Cal.com bookings from content.

**Employee Work Done:** Summary from daily updates, hours allocated per client, output delivered.

---

# ADVANCED

Once bare minimum is running. These give us an edge.

---

## 11. PR Review System

PR opened → Claude reviews the diff automatically → checks for bugs, security issues, naming consistency, patterns (reads from project's CLAUDE.md) → posts a structured review comment on the PR.

Human reviewer goes from doing a full 45-min review to a 10-min check of what Claude already flagged. Speeds up delivery across all 9 dev clients.

---

## 12. Employee Onboarding & Document System

All employee paperwork — generated, sent, and tracked automatically.

- **Offer letter:** Generated from template with name, role, salary, joining date, terms. Sent for e-signature.
- **Joining letter:** Issued on Day 1 with confirmed details.
- **Monthly salary slips:** Already covered in #9, but linked here as part of the employee lifecycle.
- **Experience / employment certificate:** Generated on request or on exit — confirms tenure, role, and duration.
- **Relieving letter:** On exit, auto-generated with last working day, clearance status.
- **Internship certificate:** For interns — generated with project details and duration.

All documents follow Small Group branding, reuse the PDF generation pattern from SmallGroup-Invoice. Employee gets a complete paper trail from offer to exit.

---

## 13. Trend Monitoring — Upwork & Fiverr

Automated monitoring of what businesses are actually paying for right now.

**Upwork:** Track trending job posts in our categories — AI automation, n8n workflows, lead gen systems, content automation, CRM buildouts. Monitor: what clients are asking for, budget ranges, frequency of posts, which skills are hot.

**Fiverr:** Track top-selling gigs in AI/automation categories. Monitor: pricing trends, service packaging, what's getting reviews, what gaps exist.

**Weekly digest:** Claude summarizes trends — what's growing, what's dying, where there's demand we can serve, pricing intelligence from real market data.

This tells us what to build next, how to price it, and where demand is moving — based on what people are actually spending money on, not what LinkedIn influencers say is trending.
