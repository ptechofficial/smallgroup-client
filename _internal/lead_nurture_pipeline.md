# AI Consulting Lead Nurture Pipeline

> **Version:** 1.1
> **Last Updated:** February 2026
> **Service:** Custom AI Systems / B2B AI Consulting
> **Deal Value:** $1,500 - $8,000 USD
> **Sales Cycle:** 1 week max
> **Volume:** 3-7 calls/week

---

## Table of Contents

1. [Pipeline Overview](#pipeline-overview)
2. [Tech Stack](#tech-stack)
3. [Google Sheets Structure](#google-sheets-structure)
4. [Pre-Call Nurture Sequence](#pre-call-nurture-sequence)
5. [Post-Call Follow-Up Sequence](#post-call-follow-up-sequence)
6. [No-Show Recovery Sequence](#no-show-recovery-sequence)
7. [No-Response Handling](#no-response-handling)
8. [Message Templates](#message-templates)
9. [WhatsApp Templates for Meta Approval](#whatsapp-templates-for-meta-approval)
10. [n8n Workflow Architecture](#n8n-workflow-architecture)
11. [Implementation Checklist](#implementation-checklist)

---

## Pipeline Overview

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            LEAD NURTURE PIPELINE                                 │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌──────────┐      ┌─────────────┐      ┌─────────────┐                        │
│   │ BOOKING  │─────▶│  PRE-CALL   │─────▶│    CALL     │                        │
│   │ (Cal.com)│      │  NURTURE    │      │   TIME      │                        │
│   └──────────┘      └─────────────┘      └──────┬──────┘                        │
│                                                 │                                │
│                          ┌──────────────────────┼──────────────────────┐        │
│                          │                      │                      │        │
│                          ▼                      ▼                      ▼        │
│                   ┌────────────┐         ┌────────────┐         ┌──────────┐   │
│                   │  NO-SHOW   │         │   CALL     │         │ CANCELED │   │
│                   │  RECOVERY  │         │   DONE     │         │  (Lost)  │   │
│                   └─────┬──────┘         └─────┬──────┘         └──────────┘   │
│                         │                      │                                │
│                         ▼                      ▼                                │
│                   ┌────────────┐         ┌────────────┐                        │
│                   │ RESCHEDULED│         │ POST-CALL  │                        │
│                   │ (back to   │         │ FOLLOW-UP  │                        │
│                   │  pre-call) │         └─────┬──────┘                        │
│                   └────────────┘               │                                │
│                                                │                                │
│                          ┌─────────────────────┼─────────────────────┐         │
│                          │                     │                     │         │
│                          ▼                     ▼                     ▼         │
│                   ┌────────────┐        ┌────────────┐        ┌──────────┐    │
│                   │    WON     │        │  ENGAGED   │        │ NO REPLY │    │
│                   │   (Deal)   │        │ (Talking)  │        │ (Day 7)  │    │
│                   └────────────┘        └────────────┘        └────┬─────┘    │
│                                                                    │          │
│                                                                    ▼          │
│                                                             ┌────────────┐    │
│                                                             │ LONG-TERM  │    │
│                                                             │  NURTURE   │    │
│                                                             └────────────┘    │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

### Pipeline Stages

| Stage | Description | How It's Triggered |
|-------|-------------|-------------------|
| `booked` | Call scheduled | Cal.com webhook |
| `no_show` | Lead didn't show up | Manual (15 min after call time) |
| `rescheduled` | Booked new call after no-show | Cal.com webhook |
| `call_done` | Call completed | Fathom webhook |
| `follow_up` | Post-call emails in progress | Automatic |
| `engaged` | Lead replied | Gmail detection |
| `no_reply` | No response after Day 3 | Automatic |
| `long_term` | Moved to monthly nurture | After Day 7 |
| `won` | Deal closed | Manual |
| `lost` | Deal lost / Canceled | Manual |

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Cal.com | Booking + Trigger pipeline |
| Google Sheets | CRM (simple, readable) |
| Gmail | Send emails |
| WhatsApp (Meta API) | Reminders + quick messages |
| Fathom | Call transcripts + summaries |
| n8n | Automation engine |

---

## Google Sheets Structure

### Sheet: `Leads`

**Keep it simple - 12 columns only**

| Col | Header | What It Is | Example |
|-----|--------|------------|---------|
| A | `Name` | Full name | John Smith |
| B | `Email` | Email | john@acme.com |
| C | `Phone` | WhatsApp (+country) | +14155551234 |
| D | `Website` | Business URL | acme.com |
| E | `Problem` | What they need | "Automate lead qualification" |
| F | `Call Time` | Scheduled date/time | 2026-02-11 14:00 |
| G | `Stage` | Current status | booked / call_done / won |
| H | `Summary` | Fathom summary | (from webhook) |
| I | `Next Step` | What happens next | "Send proposal" |
| J | `Last Msg` | When we last messaged | 2026-02-11 |
| K | `Replied` | Did they reply? | Yes / No |
| L | `Notes` | Manual notes | "Budget: $5k, timeline: Q1" |

### Stage Values (Column G)

```
booked       → Just scheduled, nurture starting
no_show      → Didn't show up to call
rescheduled  → Booked again after no-show
call_done    → Call happened, follow-up starting
follow_up    → Post-call sequence active
engaged      → They replied to our messages
no_reply     → No response after 3+ days
long_term    → Moved to monthly nurture
won          → Closed deal
lost         → Not moving forward
```

---

## Pre-Call Nurture Sequence

### Timeline

```
BOOKING
    │
    ├──▶ [IMMEDIATE]
    │       Email: Confirmation + What to Expect
    │       WhatsApp: Quick confirmation
    │
    ├──▶ [24 HRS BEFORE]
    │       Email: Testimonials + Case Study
    │
    ├──▶ [4 HRS BEFORE]
    │       WhatsApp: Reminder + Question
    │
    ├──▶ [30 MIN BEFORE]
    │       WhatsApp: Final reminder + Link
    │
    └──▶ [CALL TIME]
            └── Did they show? ─┬─▶ YES → Post-Call Sequence
                                └─▶ NO  → No-Show Recovery
```

### Timing Logic

| Time Until Call | What Gets Sent |
|-----------------|----------------|
| < 4 hours | Immediate + 30-min reminder only |
| 4-24 hours | Immediate + 4-hr + 30-min |
| 1-7 days | Full sequence |

---

## Post-Call Follow-Up Sequence

### Timeline

```
CALL ENDS (Fathom Webhook)
    │
    ├──▶ [2-4 HOURS AFTER]
    │       Email: Summary + Action Items
    │
    ├──▶ [DAY 2]
    │       Email: Results Showcase + Testimonial
    │
    ├──▶ [DAY 3] ─── Check: Did they reply?
    │       │
    │       ├── YES → Stage = "engaged" → STOP auto sequence
    │       │
    │       └── NO  → Email: Final check-in
    │                 WhatsApp: Soft nudge
    │
    └──▶ [DAY 7] ─── Still no reply?
            │
            └── Move to Stage = "long_term"
                (Monthly value emails)
```

---

## No-Show Recovery Sequence

> **Trigger:** Lead doesn't join call within 10-15 minutes of scheduled time

### Timeline

```
CALL TIME + 10 MIN (No Show Detected)
    │
    ├──▶ [IMMEDIATELY]
    │       WhatsApp: "Hey, I'm on the call - are you joining?"
    │
    ├──▶ [+15 MIN]
    │       Email: "Missed you - here's a link to reschedule"
    │       WhatsApp: "No worries if something came up. Reschedule here: [link]"
    │       Stage → "no_show"
    │
    ├──▶ [+24 HOURS]
    │       Email: "Still want to chat? Book a new time"
    │
    └──▶ [+72 HOURS] ─── Did they reschedule?
            │
            ├── YES → Stage = "rescheduled" → Back to Pre-Call Sequence
            │
            └── NO  → Stage = "lost" (reason: no-show, no reschedule)
```

### No-Show Message Templates

---

#### No-Show Message 1: Immediate WhatsApp
**Timing:** 10 minutes after call start time
**Channel:** WhatsApp

```
Hey {{name}}, I'm on the call waiting for you.

Join here: {{meeting_link}}

Or let me know if something came up!
```

---

#### No-Show Message 2: Reschedule Email
**Timing:** 15 minutes after call start time
**Channel:** Email

```
Subject: Missed our call – want to reschedule?

Hi {{name}},

I was on our call at {{call_time}} but didn't see you join.

No worries – things come up! If you'd still like to chat about {{problem}}, here's a link to book a new time:

[RESCHEDULE LINK]

If your priorities have changed, just let me know.

Talk soon,
[Your Name]
```

---

#### No-Show Message 3: Reschedule WhatsApp
**Timing:** 15 minutes after call start time
**Channel:** WhatsApp

```
No worries if something came up, {{name}}.

Here's a link to reschedule when you're ready: [RESCHEDULE LINK]

Just let me know 👍
```

---

#### No-Show Message 4: 24-Hour Follow-Up
**Timing:** 24 hours after missed call
**Channel:** Email

```
Subject: Quick follow-up on our missed call

Hi {{name}},

Just wanted to follow up on our call from yesterday.

Still interested in discussing {{problem}}? I've got some availability this week:

[RESCHEDULE LINK]

If now's not the right time, no pressure – just let me know.

[Your Name]
```

---

#### No-Show Message 5: Final Attempt
**Timing:** 72 hours after missed call (if no reschedule)
**Channel:** Email

```
Subject: Should I close your file?

Hi {{name}},

I've reached out a couple times since we missed our call.

I'm going to assume timing isn't right for you, which is totally fine.

If things change and you want to revisit {{problem}}, you can always book time here: [RESCHEDULE LINK]

Wishing you the best,
[Your Name]
```

---

## No-Response Handling

### Summary of All Scenarios

| Scenario | Detection | Action | Final Stage |
|----------|-----------|--------|-------------|
| **Pre-call reply** | Gmail detects reply | Log it, continue pre-call sequence | `booked` |
| **No-show** | Manual or Cal.com | No-Show Recovery sequence | `no_show` → `rescheduled` or `lost` |
| **Post-call no reply (Day 3)** | No response to 2 emails | Send Decision Email + WhatsApp | `follow_up` |
| **Post-call no reply (Day 7)** | Still nothing | Move to long-term nurture | `long_term` |
| **Long-term no reply** | After 3 monthly emails | Archive lead | `lost` |

### Long-Term Nurture (After Day 7)

If a lead goes silent after Day 7, move them to `long_term` stage.

**Monthly touch:**
- Send 1 value email per month (case study, YouTube video, industry insight)
- After 3 months with no engagement → Stage = `lost`

---

## Message Templates

### PRE-CALL MESSAGES

---

#### Message 1: Confirmation + What to Expect
**Timing:** Immediately after booking
**Channel:** Email

```
Subject: You're booked, {{name}} – here's what to expect

Hi {{name}},

Your call is confirmed for {{call_datetime}}.

Here's what we'll cover:

1. Deep dive into {{problem}}
2. Identify 2-3 high-impact AI automation opportunities
3. Map out a realistic implementation roadmap
4. See if we're the right fit

To prep:
→ Rough idea of your monthly revenue or lead volume
→ Which manual processes eat most of your time

Meeting link: {{meeting_link}}

Talk soon,
[Your Name]

P.S. 2-min video on how we work: [LOOM_LINK]
```

---

#### Message 2: WhatsApp Booking Confirmation
**Timing:** Immediately after booking
**Channel:** WhatsApp

```
Hey {{name}}! 👋

Call confirmed for {{call_datetime}}.

I'll send a reminder before we connect.

Quick video on what to expect: [LOOM_LINK]

Looking forward to it!
```

---

#### Message 3: Testimonials + Case Study
**Timing:** 24 hours before call
**Channel:** Email

```
Subject: Quick stories before our call

Hi {{name}},

Before we chat, wanted to share what's possible:

---

"[TESTIMONIAL #1]"
— [Client Name], [Company]

---

"[TESTIMONIAL #2]"
— [Client Name], [Company]

---

"[TESTIMONIAL #3]"
— [Client Name], [Company]

---

See you on {{call_day}}!

[Your Name]
```

---

#### Message 4: Reminder + Question
**Timing:** 4 hours before call
**Channel:** WhatsApp

```
Hey {{name}}, we're connecting in about 4 hours at {{call_time}}.

Quick question:

What's the #1 outcome that would make this AI investment a no-brainer for you?

Reply here – I'll make sure we cover it 👍
```

---

#### Message 5: Final Reminder
**Timing:** 30 minutes before call
**Channel:** WhatsApp

```
See you in 30 minutes, {{name}}! 🎯

Link: {{meeting_link}}
```

---

### POST-CALL MESSAGES

---

#### Message 6: Call Summary + Action Items
**Timing:** 2-4 hours after call
**Channel:** Email

```
Subject: Our conversation + next steps

Hi {{name}},

Great connecting today. Quick recap:

**What we discussed:**
{{call_summary}}

**Next step:**
{{next_step}}

[CTA: Schedule Implementation Call / View Proposal]

Questions? Just reply.

[Your Name]
```

---

#### Message 7: Results Showcase
**Timing:** Day 2 (24 hours after call)
**Channel:** Email

```
Subject: What this looks like in action

Hi {{name}},

Following up on {{problem}}.

Here's what clients typically see:
• 60% reduction in manual work within 30 days
• ROI positive within 2 months
• Full implementation in 2-3 weeks

Ready to move forward?

[CTA: {{next_step}}]

[Your Name]
```

---

#### Message 8: Decision Point
**Timing:** Day 3 (if no response)
**Channel:** Email

```
Subject: Quick check-in

Hi {{name}},

Just checking if you had a chance to review my last email.

If you're ready: [CTA]
If timing's off: No worries – let me know and I'll follow up later.

[Your Name]
```

---

#### Message 9: WhatsApp Check-in
**Timing:** Day 3 (if no email response)
**Channel:** WhatsApp

```
Hey {{name}}, checking in on our conversation from {{call_date}}.

Any questions I can answer?
```

---

#### Message 10: Day 7 Close-Out
**Timing:** Day 7 (if still no response)
**Channel:** Email

```
Subject: Closing the loop

Hi {{name}},

Haven't heard back, so I'll assume now isn't the right time.

I'll check in again in a few weeks. If anything changes before then, you know where to find me:

[BOOKING LINK]

Best,
[Your Name]
```

---

## WhatsApp Templates for Meta Approval

> Submit these exact templates to Meta for approval

### Template 1: `booking_confirmation`
**Category:** UTILITY

```
Hey {{1}}! 👋

Call confirmed for {{2}}.

I'll send a reminder before we connect.

Quick video: {{3}}

Looking forward to it!

---
Variables:
{{1}} = name
{{2}} = call_datetime
{{3}} = loom_link
```

---

### Template 2: `call_reminder`
**Category:** UTILITY

```
Hey {{1}}, we're connecting in about 4 hours at {{2}}.

Quick question – what's the #1 outcome that would make this a no-brainer?

Reply here 👍

---
Variables:
{{1}} = name
{{2}} = call_time
```

---

### Template 3: `call_final_reminder`
**Category:** UTILITY

```
See you in 30 minutes, {{1}}! 🎯

Link: {{2}}

---
Variables:
{{1}} = name
{{2}} = meeting_link
```

---

### Template 4: `no_show_waiting`
**Category:** UTILITY

```
Hey {{1}}, I'm on the call waiting for you.

Join here: {{2}}

Or let me know if something came up!

---
Variables:
{{1}} = name
{{2}} = meeting_link
```

---

### Template 5: `no_show_reschedule`
**Category:** UTILITY

```
No worries if something came up, {{1}}.

Reschedule here: {{2}}

Just let me know 👍

---
Variables:
{{1}} = name
{{2}} = reschedule_link
```

---

### Template 6: `post_call_checkin`
**Category:** UTILITY

```
Hey {{1}}, checking in on our conversation from {{2}}.

Any questions I can answer?

---
Variables:
{{1}} = name
{{2}} = call_date
```

---

## n8n Workflow Architecture

### Workflow Overview

| # | Workflow Name | Trigger | Purpose |
|---|--------------|---------|---------|
| 1 | Pre-Call Nurture | Cal.com webhook | Add lead, send immediate messages |
| 2 | Scheduled Messages | Every 15 min | Send timed pre-call messages |
| 3 | Post-Call Follow-Up | Fathom webhook | Save summary, start follow-up |
| 4 | Scheduled Follow-Ups | Every hour | Day 2, Day 3, Day 7 messages |
| 5 | Response Tracker | Every 30 min | Detect replies, update stages |
| 6 | No-Show Handler | Manual trigger | Start no-show recovery |

---

### Workflow 1: Pre-Call Nurture

```
[Cal.com Webhook]
       │
       ▼
[Add Row to Google Sheet]
   - Name, Email, Phone, Website, Problem
   - Call Time, Stage = "booked"
       │
       ▼
[Send Immediate Messages]
   - Email: Confirmation
   - WhatsApp: Confirmation
       │
       ▼
[Update Sheet: Last Msg = now]
```

---

### Workflow 2: Scheduled Pre-Call Messages

```
[Every 15 Minutes]
       │
       ▼
[Get Leads where Stage = "booked"]
       │
       ▼
[Loop: For Each Lead]
       │
       ▼
[Calculate: Hours until call]
       │
       ├── 24 hrs before → Send Testimonial Email
       │
       ├── 4 hrs before → Send WhatsApp Reminder
       │
       └── 30 min before → Send WhatsApp Final
       │
       ▼
[Update Sheet: Last Msg = now]
```

---

### Workflow 3: Post-Call Follow-Up

```
[Fathom Webhook]
       │
       ▼
[Parse: Summary, Action Items]
       │
       ▼
[Find Lead by Email in Sheet]
       │
       ▼
[Update Sheet]
   - Summary = {{fathom_summary}}
   - Stage = "call_done"
       │
       ▼
[Wait 2-4 hours]
       │
       ▼
[Send Summary Email]
       │
       ▼
[Update: Stage = "follow_up", Last Msg = now]
```

---

### Workflow 4: Scheduled Follow-Ups

```
[Every Hour]
       │
       ▼
[Get Leads where Stage = "follow_up" AND Replied = "No"]
       │
       ▼
[Loop: For Each Lead]
       │
       ▼
[Calculate: Hours since Last Msg]
       │
       ├── ~24 hrs → Send Day 2 Email
       │
       ├── ~48 hrs → Send Day 3 Email + WhatsApp
       │
       └── ~168 hrs (Day 7) → Send Close-Out Email
                              Update: Stage = "long_term"
       │
       ▼
[Update Sheet: Last Msg = now]
```

---

### Workflow 5: Response Tracker

```
[Every 30 Minutes]
       │
       ▼
[Gmail: Get Unread Emails]
       │
       ▼
[Loop: For Each Email]
       │
       ▼
[Extract Sender Email]
       │
       ▼
[Find Lead in Sheet by Email]
       │
       ├── Found + Stage = "follow_up"
       │       → Update: Stage = "engaged", Replied = "Yes"
       │
       └── Not Found → Skip
       │
       ▼
[Mark Email as Read]
```

---

### Workflow 6: No-Show Handler

```
[Manual Trigger] (or scheduled check 15 min after call time)
       │
       ▼
[Input: Lead Email]
       │
       ▼
[Find Lead in Sheet]
       │
       ▼
[Update: Stage = "no_show"]
       │
       ▼
[Send Immediately]
   - WhatsApp: "I'm on the call..."
       │
       ▼
[Wait 5 min]
       │
       ▼
[Send]
   - Email: Reschedule
   - WhatsApp: Reschedule link
       │
       ▼
[Schedule: +24 hrs]
   - Email: Follow-up reschedule
       │
       ▼
[Schedule: +72 hrs]
   - Check if rescheduled
   - If no → Stage = "lost"
```

---

## Implementation Checklist

### Day 1: Setup

- [ ] **Cal.com**
  - [ ] Add custom fields: Website, Problem
  - [ ] Enable webhook → n8n
  - [ ] Test booking flow

- [ ] **Google Sheet**
  - [ ] Create sheet with 12 columns
  - [ ] Add data validation for Stage column
  - [ ] Share with n8n

- [ ] **Gmail**
  - [ ] Connect to n8n
  - [ ] Test send

- [ ] **WhatsApp**
  - [ ] Submit 6 templates to Meta
  - [ ] Get API credentials
  - [ ] Test with n8n

- [ ] **Fathom**
  - [ ] Enable webhook
  - [ ] Point to n8n

### Day 2-3: Build Workflows

- [ ] Workflow 1: Pre-Call Nurture
- [ ] Workflow 2: Scheduled Messages
- [ ] Workflow 3: Post-Call
- [ ] Workflow 4: Scheduled Follow-Ups
- [ ] Workflow 5: Response Tracker
- [ ] Workflow 6: No-Show Handler

### Day 4: Test

- [ ] Book test call
- [ ] Verify all pre-call messages
- [ ] Simulate no-show
- [ ] Simulate Fathom webhook
- [ ] Test response detection
- [ ] Check all stage transitions

### Day 5: Go Live

- [ ] Monitor first 3 real leads
- [ ] Adjust timing if needed
- [ ] Document issues

---

## Quick Reference: All Messages

| # | Name | Timing | Channel |
|---|------|--------|---------|
| 1 | Confirmation | Immediate | Email |
| 2 | Booking Confirm | Immediate | WhatsApp |
| 3 | Testimonials | 24 hrs before | Email |
| 4 | Reminder + Question | 4 hrs before | WhatsApp |
| 5 | Final Reminder | 30 min before | WhatsApp |
| 6 | No-Show Waiting | +10 min | WhatsApp |
| 7 | No-Show Reschedule | +15 min | Email + WhatsApp |
| 8 | No-Show Follow-Up | +24 hrs | Email |
| 9 | No-Show Final | +72 hrs | Email |
| 10 | Call Summary | +2-4 hrs | Email |
| 11 | Results Showcase | Day 2 | Email |
| 12 | Decision Point | Day 3 | Email |
| 13 | WhatsApp Check-in | Day 3 | WhatsApp |
| 14 | Close-Out | Day 7 | Email |

---

## Appendix: Links to Replace

| Placeholder | Replace With |
|-------------|--------------|
| `[Your Name]` | Your name |
| `[LOOM_LINK]` | Your "how we work" video |
| `[RESCHEDULE LINK]` | Cal.com reschedule link |
| `[BOOKING LINK]` | Cal.com booking link |
| `[CTA]` | Relevant call-to-action link |
| `[TESTIMONIAL #1-3]` | Your actual testimonials |

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 2026 | Initial design |
| 1.1 | Feb 2026 | Added no-show handling, simplified Google Sheets |

---

*Pipeline designed for AI Consulting. Full automation via n8n.*
