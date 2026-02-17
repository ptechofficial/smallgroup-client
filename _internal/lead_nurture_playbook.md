# Lead Nurture Playbook: Email Sequences & CRM Guide

> **Version:** 1.0
> **Last Updated:** February 2026
> **Channel:** Email Only (WhatsApp ready for later)

---

## Table of Contents

1. [Google Sheet Structure](#google-sheet-structure)
2. [Stage Definitions](#stage-definitions)
3. [Team Notifications](#team-notifications)
4. [Pre-Call Email Sequence](#pre-call-email-sequence)
5. [Post-Call Email Sequence](#post-call-email-sequence)
6. [No-Show Recovery Sequence](#no-show-recovery-sequence)
7. [Quick Reference: All Emails](#quick-reference-all-emails)

---

## Google Sheet Structure

### Sheet: `Leads`

**6 Columns Only**

| Col | Header | Description | Example |
|-----|--------|-------------|---------|
| A | `Name` | Full name | John Smith |
| B | `Email` | Email address | john@acme.com |
| C | `Phone` | Phone/WhatsApp (for later) | +14155551234 |
| D | `Problem` | What they need help with | "Automate lead qualification" |
| E | `Call Time` | Scheduled date/time | 2026-02-11 14:00 |
| F | `Stage` | Current pipeline stage | booked / follow_up / won |

### Data Entry Rules

- **New booking**: Add row, set Stage = `booked`
- **After call**: Update Stage = `call_done` → then `follow_up`
- **They reply**: Update Stage = `engaged`
- **Deal closes**: Update Stage = `won` or `lost`

---

## Stage Definitions

| Stage | Meaning | Next Action |
|-------|---------|-------------|
| `booked` | Call scheduled, pre-call sequence active | Send pre-call emails |
| `no_show` | Didn't attend call | Send no-show recovery emails |
| `rescheduled` | Booked new call after no-show | Back to pre-call sequence |
| `call_done` | Call completed | Send summary email |
| `follow_up` | Post-call sequence active | Day 2, Day 3, Day 7 emails |
| `engaged` | Lead replied to any email | Manual follow-up (stop auto emails) |
| `won` | Deal closed | Archive |
| `lost` | Not moving forward | Archive |

---

## Team Notifications

**Send these internal emails to your team at key moments.**

---

### Notification 1: New Booking Alert

**When:** Immediately after someone books a call
**To:** team@yourcompany.com
**Subject:** New Call Booked: {{name}}

```
NEW LEAD BOOKED

Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Problem: {{problem}}
Call Time: {{call_datetime}}

---
Sheet updated. Pre-call sequence started.
```

---

### Notification 2: Call Completed

**When:** After Fathom webhook fires (call ended)
**To:** team@yourcompany.com
**Subject:** Call Completed: {{name}}

```
CALL COMPLETED

Name: {{name}}
Email: {{email}}
Call Time: {{call_datetime}}

Summary from Fathom:
{{fathom_summary}}

---
Post-call sequence started. Follow up within 2-4 hours.
```

---

### Notification 3: No-Show Alert

**When:** 15 minutes after scheduled call time, lead didn't join
**To:** team@yourcompany.com
**Subject:** NO-SHOW: {{name}}

```
LEAD NO-SHOW

Name: {{name}}
Email: {{email}}
Scheduled Time: {{call_datetime}}

---
No-show recovery sequence started.
Stage updated to: no_show
```

---

### Notification 4: Lead Replied

**When:** Lead responds to any email
**To:** team@yourcompany.com
**Subject:** REPLY RECEIVED: {{name}}

```
LEAD REPLIED

Name: {{name}}
Email: {{email}}
Stage: {{previous_stage}} → engaged

---
Auto sequence STOPPED. Manual follow-up required.
```

---

### Notification 5: Day 3 No Response Warning

**When:** Lead hasn't replied after Day 3 email
**To:** team@yourcompany.com
**Subject:** No Response (Day 3): {{name}}

```
NO RESPONSE - DAY 3

Name: {{name}}
Email: {{email}}
Problem: {{problem}}
Call Date: {{call_date}}

---
Day 3 check-in sent. If no reply by Day 7, lead moves to long-term nurture.
Consider a personal follow-up if this is a high-value lead.
```

---

### Notification 6: Lead Moving to Long-Term

**When:** Day 7, still no response
**To:** team@yourcompany.com
**Subject:** Moving to Long-Term: {{name}}

```
LEAD MOVED TO LONG-TERM NURTURE

Name: {{name}}
Email: {{email}}
Problem: {{problem}}

---
No response after 7 days. Stage updated to: long_term
Will receive monthly value emails.
```

---

## Pre-Call Email Sequence

### Timeline Overview

```
BOOKING
    │
    ├──▶ [IMMEDIATE] ─────────── Email 1: Confirmation + What to Expect
    │
    ├──▶ [24 HRS BEFORE] ─────── Email 2: Testimonials + Case Study
    │
    ├──▶ [4 HRS BEFORE] ──────── Email 3: Reminder + Quick Question
    │
    ├──▶ [30 MIN BEFORE] ─────── Email 4: Final Reminder with Link
    │
    └──▶ [CALL TIME]
            └── Did they show? ─┬─▶ YES → Post-Call Sequence
                                └─▶ NO  → No-Show Recovery
```

### Timing Logic

| Time Until Call | Emails Sent |
|-----------------|-------------|
| < 4 hours | Email 1 (immediate) + Email 4 (30 min before) only |
| 4-24 hours | Email 1 + Email 3 + Email 4 |
| 1-7 days | Full sequence (all 4 emails) |

---

### Pre-Call Email 1: Confirmation + What to Expect

**Timing:** Immediately after booking
**Subject:** You're booked, {{name}} – here's what to expect

```
Hi {{name}},

Your call is confirmed for {{call_datetime}}.

Here's what we'll cover:

1. Deep dive into {{problem}}
2. Identify 2-3 high-impact AI automation opportunities
3. Map out a realistic implementation roadmap
4. See if we're the right fit

To get the most out of our call, come prepared with:
→ Rough idea of your monthly revenue or lead volume
→ Which manual processes eat most of your time

Meeting link: {{meeting_link}}

Talk soon,
{{your_name}}

P.S. Here's a 2-min video on how we work: {{loom_link}}
```

**CRM Action:** Stage remains `booked`, log "Email 1 sent"

---

### Pre-Call Email 2: Testimonials + Case Study

**Timing:** 24 hours before call
**Subject:** Quick stories before our call tomorrow

```
Hi {{name}},

Before we chat tomorrow, wanted to share what's possible:

---

"We went from 12 to 47 booked calls per month in 6 weeks. Hit our $50K/month milestone 3 months ahead of schedule."
— [Client Name], [Company]

---

"We were stuck at $2M ARR for 18 months. They diagnosed that our inventory system was the bottleneck, not marketing. Now at $4.2M."
— [Client Name], [Company]

---

"They don't just build—they challenge our assumptions. Saved us from a $40K mistake on day one."
— [Client Name], [Company]

---

See you on {{call_day}} at {{call_time}}!

{{your_name}}
```

**CRM Action:** Stage remains `booked`, log "Email 2 sent"

---

### Pre-Call Email 3: Reminder + Quick Question

**Timing:** 4 hours before call
**Subject:** Quick question before our call in 4 hours

```
Hi {{name}},

We're connecting in about 4 hours at {{call_time}}.

Quick question before we meet:

What's the #1 outcome that would make this AI investment a no-brainer for you?

Just hit reply – I'll make sure we cover it on the call.

Talk soon,
{{your_name}}

Meeting link: {{meeting_link}}
```

**CRM Action:** Stage remains `booked`, log "Email 3 sent"

---

### Pre-Call Email 4: Final Reminder

**Timing:** 30 minutes before call
**Subject:** Starting in 30 minutes – {{name}}

```
Hi {{name}},

Just a quick reminder – we're meeting in 30 minutes.

Here's your link: {{meeting_link}}

See you there!

{{your_name}}
```

**CRM Action:** Stage remains `booked`, log "Email 4 sent"

---

## Post-Call Email Sequence

### Timeline Overview

```
CALL ENDS
    │
    ├──▶ [2-4 HOURS AFTER] ───── Email 5: Summary + Action Items
    │
    ├──▶ [DAY 2] ─────────────── Email 6: Results Showcase
    │
    ├──▶ [DAY 3] ─── Reply? ─┬── YES → Stage = "engaged" → STOP sequence
    │                        │
    │                        └── NO  → Email 7: Check-in
    │
    └──▶ [DAY 7] ─── Reply? ─┬── YES → Stage = "engaged" → STOP sequence
                             │
                             └── NO  → Email 8: Close-out
                                       Stage = "long_term"
```

---

### Post-Call Email 5: Summary + Action Items

**Timing:** 2-4 hours after call
**Subject:** Our conversation + next steps

```
Hi {{name}},

Great connecting today. Here's a quick recap:

**What we discussed:**
{{call_summary}}

**Key opportunities identified:**
{{opportunities}}

**Recommended next step:**
{{next_step}}

[LINK: Schedule Implementation Call / View Proposal]

Questions? Just reply to this email.

{{your_name}}
```

**CRM Action:** Update Stage to `follow_up`, log "Email 5 sent"

---

### Post-Call Email 6: Results Showcase

**Timing:** Day 2 (24 hours after call)
**Subject:** What this looks like in action

```
Hi {{name}},

Following up on our conversation about {{problem}}.

Here's what clients typically see after working with us:

• 60% reduction in manual work within 30 days
• ROI positive within 2 months
• Full implementation in 2-3 weeks

And here's how we're different: We withhold 20% of our fee until you hit measurable outcomes. We only get paid in full when you win.

Ready to move forward?

[LINK: {{next_step_link}}]

{{your_name}}
```

**CRM Action:** Stage remains `follow_up`, log "Email 6 sent"

---

### Post-Call Email 7: Check-in (Day 3)

**Timing:** Day 3 (if no response to previous emails)
**Subject:** Quick check-in

```
Hi {{name}},

Just checking if you had a chance to review my last email.

Three quick options:

1. Ready to move forward? [LINK: {{next_step_link}}]
2. Have questions? Just reply – happy to clarify anything.
3. Timing's off? No worries – let me know and I'll follow up later.

{{your_name}}
```

**CRM Action:** Stage remains `follow_up`, log "Email 7 sent", send Team Notification 5

---

### Post-Call Email 8: Close-out (Day 7)

**Timing:** Day 7 (if still no response)
**Subject:** Closing the loop

```
Hi {{name}},

Haven't heard back, so I'll assume now isn't the right time for {{problem}}.

That's totally fine – timing matters.

I'll check in again in a few weeks with some relevant case studies. If anything changes before then, you know where to find me:

[BOOKING LINK]

Wishing you the best,
{{your_name}}
```

**CRM Action:** Update Stage to `long_term`, log "Email 8 sent", send Team Notification 6

---

## No-Show Recovery Sequence

### Timeline Overview

```
CALL TIME + 10 MIN (No Show)
    │
    ├──▶ [IMMEDIATELY] ────────── Email 9: "Are you joining?"
    │
    ├──▶ [+15 MIN] ────────────── Email 10: Reschedule offer
    │                             Update Stage → "no_show"
    │
    ├──▶ [+24 HOURS] ──────────── Email 11: Follow-up reschedule
    │
    └──▶ [+72 HOURS] ─── Rescheduled?
            │
            ├── YES → Stage = "rescheduled" → Back to Pre-Call
            │
            └── NO  → Email 12: Final attempt
                      Stage = "lost"
```

---

### No-Show Email 9: Are You Joining?

**Timing:** 10 minutes after scheduled call time
**Subject:** I'm on the call – are you joining?

```
Hi {{name}},

I'm on the call waiting for you.

Join here: {{meeting_link}}

If something came up, just let me know – happy to reschedule.

{{your_name}}
```

**CRM Action:** Stage remains `booked`, log "No-show Email 9 sent"

---

### No-Show Email 10: Reschedule Offer

**Timing:** 15 minutes after scheduled call time
**Subject:** Missed our call – want to reschedule?

```
Hi {{name}},

I was on our call at {{call_time}} but didn't see you join.

No worries – things come up!

If you'd still like to chat about {{problem}}, here's a link to book a new time:

[RESCHEDULE LINK]

If your priorities have changed, just let me know.

Talk soon,
{{your_name}}
```

**CRM Action:** Update Stage to `no_show`, log "No-show Email 10 sent", send Team Notification 3

---

### No-Show Email 11: Follow-up Reschedule

**Timing:** 24 hours after missed call
**Subject:** Quick follow-up on our missed call

```
Hi {{name}},

Just wanted to follow up on our call from yesterday.

Still interested in discussing {{problem}}? I've got availability this week:

[RESCHEDULE LINK]

If now's not the right time, no pressure – just let me know.

{{your_name}}
```

**CRM Action:** Stage remains `no_show`, log "No-show Email 11 sent"

---

### No-Show Email 12: Final Attempt

**Timing:** 72 hours after missed call (if no reschedule)
**Subject:** Should I close your file?

```
Hi {{name}},

I've reached out a couple times since we missed our call.

I'm going to assume timing isn't right for you, which is totally fine.

If things change and you want to revisit {{problem}}, you can always book time here:

[RESCHEDULE LINK]

Wishing you the best,
{{your_name}}
```

**CRM Action:** Update Stage to `lost`, log "No-show Email 12 sent"

---

## Quick Reference: All Emails

### Pre-Call Sequence

| # | Email Name | Timing | Subject Line |
|---|------------|--------|--------------|
| 1 | Confirmation | Immediate | You're booked, {{name}} – here's what to expect |
| 2 | Testimonials | 24 hrs before | Quick stories before our call tomorrow |
| 3 | Reminder + Question | 4 hrs before | Quick question before our call in 4 hours |
| 4 | Final Reminder | 30 min before | Starting in 30 minutes – {{name}} |

### Post-Call Sequence

| # | Email Name | Timing | Subject Line |
|---|------------|--------|--------------|
| 5 | Summary | 2-4 hrs after | Our conversation + next steps |
| 6 | Results Showcase | Day 2 | What this looks like in action |
| 7 | Check-in | Day 3 | Quick check-in |
| 8 | Close-out | Day 7 | Closing the loop |

### No-Show Sequence

| # | Email Name | Timing | Subject Line |
|---|------------|--------|--------------|
| 9 | Are You Joining? | +10 min | I'm on the call – are you joining? |
| 10 | Reschedule Offer | +15 min | Missed our call – want to reschedule? |
| 11 | Follow-up Reschedule | +24 hrs | Quick follow-up on our missed call |
| 12 | Final Attempt | +72 hrs | Should I close your file? |

### Team Notifications

| # | Notification | Trigger | Subject Line |
|---|--------------|---------|--------------|
| 1 | New Booking | Cal.com webhook | New Call Booked: {{name}} |
| 2 | Call Completed | Fathom webhook | Call Completed: {{name}} |
| 3 | No-Show | 15 min after call time | NO-SHOW: {{name}} |
| 4 | Lead Replied | Gmail detection | REPLY RECEIVED: {{name}} |
| 5 | Day 3 No Response | Day 3 email sent | No Response (Day 3): {{name}} |
| 6 | Moving to Long-Term | Day 7 email sent | Moving to Long-Term: {{name}} |

---

## Variables Reference

| Variable | Source | Example |
|----------|--------|---------|
| `{{name}}` | Cal.com booking | John Smith |
| `{{email}}` | Cal.com booking | john@acme.com |
| `{{phone}}` | Cal.com booking | +14155551234 |
| `{{problem}}` | Cal.com custom field | Automate lead qualification |
| `{{call_datetime}}` | Cal.com booking | Tuesday, Feb 11 at 2:00 PM EST |
| `{{call_time}}` | Cal.com booking | 2:00 PM EST |
| `{{call_day}}` | Cal.com booking | Tuesday |
| `{{call_date}}` | Cal.com booking | Feb 11 |
| `{{meeting_link}}` | Cal.com booking | https://cal.com/... |
| `{{call_summary}}` | Fathom webhook | (AI-generated summary) |
| `{{opportunities}}` | Manual / Fathom | (from call notes) |
| `{{next_step}}` | Manual | Schedule implementation call |
| `{{next_step_link}}` | Your booking link | https://cal.com/... |
| `{{your_name}}` | Static | Prakarsh |
| `{{loom_link}}` | Static | Your "how we work" video |

---

## Placeholders to Replace Before Using

| Placeholder | Replace With |
|-------------|--------------|
| `{{your_name}}` | Your actual name |
| `{{loom_link}}` | Link to your intro/explainer video |
| `[RESCHEDULE LINK]` | Cal.com reschedule URL |
| `[BOOKING LINK]` | Cal.com booking URL |
| `[Client Name], [Company]` | Real testimonials from your clients |
| `team@yourcompany.com` | Your team's email address |

---

## Stage Transition Summary

```
booked ──────────────────────────────────────────┐
    │                                            │
    ├── Call happens ─────▶ call_done ──▶ follow_up
    │                                            │
    │                           ┌────────────────┤
    │                           │                │
    │                     They reply         No reply
    │                           │                │
    │                           ▼                ▼
    │                       engaged          long_term
    │                           │                │
    │                           ▼                ▼
    │                     won / lost           lost
    │
    └── No show ─────────▶ no_show
                              │
                    ┌─────────┴─────────┐
                    │                   │
              Reschedules          No response
                    │                   │
                    ▼                   ▼
              rescheduled             lost
                    │
                    ▼
               (back to booked)
```

---

*Playbook ready for n8n implementation. All WhatsApp messages converted to email.*
