# Customer Journey Automation - System Design Document

## Overview

A robust, Google Sheet-driven automation system that nurtures leads from booking to post-call follow-up. All prompts, timing rules, and dynamic values are configurable directly in Google Sheets.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           GOOGLE SHEETS (Control Plane)                          │
│                                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────┐ │
│  │  Leads   │  │  Rules   │  │Templates │  │  Queue   │  │ SendLog  │  │Errors │ │
│  │(tracker) │  │(AI+Time) │  │(minimal) │  │(schedule)│  │ (audit)  │  │       │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └───────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 n8n WORKFLOWS                                    │
│                                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐              │
│  │ Booking Handler │    │  Queue Processor│    │  Fathom Handler │              │
│  │ (cal.com hook)  │    │  (Cron: 2 min)  │    │   (webhook)     │              │
│  └────────┬────────┘    └────────┬────────┘    └────────┬────────┘              │
│           │                      │                      │                        │
│           │     Creates Queue    │    Processes Queue   │   Updates Leads        │
│           │     entries ────────►│◄─────────────────────│                        │
│           │                      │                      │                        │
│           │                      ▼                      │                        │
│           │        ┌─────────────────────────┐          │                        │
│           │        │    Message Sender       │          │                        │
│           │        │  (WA + Email + Call)    │          │                        │
│           │        └─────────────────────────┘          │                        │
│           │                      │                      │                        │
│           │        ┌─────────────┴─────────────┐        │                        │
│           │        ▼                           ▼        │                        │
│           │  ┌──────────────┐         ┌──────────────┐  │                        │
│           │  │    Twilio    │         │    Gmail     │  │                        │
│           │  │  (WhatsApp)  │         │   (Email)    │  │                        │
│           │  └──────────────┘         └──────────────┘  │                        │
│           │                                             │                        │
│           └─────────────► Updates Leads checkboxes ◄────┘                        │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Google Sheet Structure

### Tab 1: `Leads` (Customer Tracker)

A clean view of all customers with checkbox tracking for each touchpoint.

| Column | Name | Type | Description |
|--------|------|------|-------------|
| A | `event_id` | STRING | cal.com booking ID |
| B | `name` | STRING | Customer name |
| C | `email` | STRING | Customer email |
| D | `phone` | STRING | WhatsApp number (+country code) |
| E | `company` | STRING | Company name |
| F | `call_datetime_utc` | DATETIME | Scheduled call time in UTC |
| G | `call_datetime_ist` | DATETIME | Scheduled call time in IST (formula) |
| H | `customer_timezone` | STRING | Customer's timezone |
| I | `status` | ENUM | `Pre-Call` / `On-Call` / `Post-Call` / `No-Show` / `Canceled` |
| J | `confirmation_email` | CHECKBOX | ☑ Sent |
| K | `confirmation_wa` | CHECKBOX | ☑ Sent |
| L | `testimonials_wa` | CHECKBOX | ☑ Sent (3h before) |
| M | `reminder_wa` | CHECKBOX | ☑ Sent (1h before) |
| N | `postcall_email` | CHECKBOX | ☑ Sent |
| O | `postcall_wa` | CHECKBOX | ☑ Sent |
| P | `call_summary` | TEXT | AI-generated summary from Fathom |
| Q | `action_items` | TEXT | Action items from call |
| R | `fathom_recording_link` | URL | Link to call recording |
| S | `fathom_transcript_link` | URL | Link to transcript |
| T | `last_interaction` | STRING | Last touchpoint description |
| U | `last_interaction_at` | DATETIME | Timestamp of last touchpoint |
| V | `notes` | TEXT | Internal notes |
| W | `created_at` | DATETIME | When lead was added |

**Formula for Column G (IST Time):**
```
=IF(F2="","",F2+(5.5/24))
```

**Status Values:**
- `Pre-Call` - Booking confirmed, waiting for call
- `On-Call` - Call in progress (optional, set manually or via integration)
- `Post-Call` - Call completed, follow-up sent
- `No-Show` - Customer didn't attend
- `Canceled` - Booking was canceled

**Visual Example:**

| event_id | name | email | phone | company | call_datetime_utc | call_datetime_ist | customer_timezone | status | confirmation_email | confirmation_wa | testimonials_wa | reminder_wa | postcall_email | postcall_wa |
|----------|------|-------|-------|---------|-------------------|-------------------|-------------------|--------|-------------------|-----------------|-----------------|-------------|----------------|-------------|
| evt_123 | John Smith | john@acme.com | +919876543210 | Acme Corp | 2025-02-02 08:30:00 | 2025-02-02 14:00:00 | Asia/Kolkata | Pre-Call | ☑ | ☑ | ☐ | ☐ | ☐ | ☐ |

---

### Tab 2: `Rules` (Configuration + AI Prompts)

Central configuration for timing, channels, and AI prompts.

| Column | Name | Type | Description |
|--------|------|------|-------------|
| A | `rule_id` | STRING | Unique identifier |
| B | `action_name` | STRING | Human-readable name |
| C | `action_type` | ENUM | `confirmation` / `testimonials` / `reminder` / `postcall` / `noshow` / `canceled` |
| D | `channel` | ENUM | `email` / `whatsapp` / `call` |
| E | `anchor` | ENUM | Reference time: `booking_time` / `call_time` / `fathom_ready` |
| F | `offset_minutes` | INTEGER | Minutes from anchor (negative = before, positive = after) |
| G | `enabled` | CHECKBOX | ☑ = Active |
| H | `ai_prompt` | TEXT | Prompt for AI to generate/personalize message |
| I | `static_content` | TEXT | Fallback content if AI not used |
| J | `requires_ai` | CHECKBOX | ☑ = Use AI to generate message |
| K | `variables` | TEXT | Available variables for this action |
| L | `notes` | TEXT | Documentation |

**Default Rules:**

| rule_id | action_name | action_type | channel | anchor | offset_minutes | enabled | requires_ai |
|---------|-------------|-------------|---------|--------|----------------|---------|-------------|
| `CONF_EMAIL` | Confirmation Email | `confirmation` | `email` | `booking_time` | `0` | ☑ | ☐ |
| `CONF_WA` | Confirmation WhatsApp | `confirmation` | `whatsapp` | `booking_time` | `0` | ☑ | ☐ |
| `TESTI_WA` | Testimonials WhatsApp | `testimonials` | `whatsapp` | `call_time` | `-180` | ☑ | ☐ |
| `REMIND_WA` | Reminder WhatsApp | `reminder` | `whatsapp` | `call_time` | `-60` | ☑ | ☐ |
| `POST_EMAIL` | Post-Call Email | `postcall` | `email` | `fathom_ready` | `0` | ☑ | ☑ |
| `POST_WA` | Post-Call WhatsApp | `postcall` | `whatsapp` | `fathom_ready` | `0` | ☑ | ☑ |
| `NOSHOW_WA` | No-Show Follow-up | `noshow` | `whatsapp` | `call_time` | `60` | ☑ | ☐ |
| `CANCEL_WA` | Cancellation Ack | `canceled` | `whatsapp` | `booking_time` | `0` | ☑ | ☐ |

**AI Prompts Examples:**

For `POST_EMAIL` (ai_prompt column):
```
You are a helpful assistant. Generate a personalized post-call email.

Context:
- Customer Name: {{name}}
- Company: {{company}}
- Call Summary: {{call_summary}}
- Action Items: {{action_items}}

Instructions:
1. Thank them for their time
2. Summarize key discussion points in 3-4 bullets
3. List action items clearly
4. Include the recording link
5. End with a clear next step

Tone: Professional, warm, concise
Length: 150-200 words max
```

For `POST_WA` (ai_prompt column):
```
Generate a short WhatsApp message summarizing the call.

Customer: {{name}}
Summary: {{call_summary}}
Action Items: {{action_items}}
Recording: {{fathom_recording_link}}

Rules:
- Keep under 500 characters
- Use bullet points for action items
- Include recording link
- Friendly but professional tone
```

**Variables Reference (for `variables` column):**
```
{{name}}, {{email}}, {{company}}, {{phone}}
{{call_date}}, {{call_time}}, {{call_datetime_ist}}, {{customer_timezone}}
{{call_summary}}, {{action_items}}, {{fathom_recording_link}}, {{fathom_transcript_link}}
{{reschedule_link}}, {{booking_link}}
```

---

### Tab 3: `Templates` (Message Content)

Minimal structure with 3 categories: Call, WhatsApp, Email.

| Column | Name | Type | Description |
|--------|------|------|-------------|
| A | `template_id` | STRING | Unique identifier |
| B | `category` | ENUM | `call` / `whatsapp` / `email` |
| C | `action_type` | STRING | Links to Rules.action_type |
| D | `name` | STRING | Template name |
| E | `subject` | STRING | Email subject line (blank for WA/call) |
| F | `body` | TEXT | Message content with {{variables}} |
| G | `enabled` | CHECKBOX | ☑ = Active |

**Templates:**

---

**CATEGORY: EMAIL**

| template_id | category | action_type | name | subject | body |
|-------------|----------|-------------|------|---------|------|
| `EMAIL_CONF` | email | confirmation | Booking Confirmation | Your call is confirmed - {{call_date}} | (see below) |
| `EMAIL_POST` | email | postcall | Post-Call Summary | Your call recording + summary | (see below) |

**EMAIL_CONF body:**
```
Hi {{name}},

Your call has been confirmed!

**Date:** {{call_date}}
**Time:** {{call_time}} ({{customer_timezone}})

What to expect:
- Understanding your current challenges
- How we can help solve them
- Clear next steps if it's a fit

Need to reschedule? {{reschedule_link}}

Looking forward to speaking with you!
```

**EMAIL_POST body:**
```
Hi {{name}},

Thank you for taking the time to speak with us!

## Summary
{{call_summary}}

## Action Items
{{action_items}}

## Recording
Watch here: {{fathom_recording_link}}

## Transcript
Read here: {{fathom_transcript_link}}

Questions? Just reply to this email.

Best regards
```

---

**CATEGORY: WHATSAPP**

| template_id | category | action_type | name | subject | body |
|-------------|----------|-------------|------|---------|------|
| `WA_CONF` | whatsapp | confirmation | Booking Confirmation | | (see below) |
| `WA_TESTI` | whatsapp | testimonials | Testimonials | | (see below) |
| `WA_REMIND` | whatsapp | reminder | Reminder | | (see below) |
| `WA_POST` | whatsapp | postcall | Post-Call Summary | | (see below) |
| `WA_NOSHOW` | whatsapp | noshow | No-Show Follow-up | | (see below) |
| `WA_CANCEL` | whatsapp | canceled | Cancellation | | (see below) |

**WA_CONF body:**
```
Hi {{name}}!

Your call is confirmed for {{call_date}} at {{call_time}} ({{customer_timezone}}).

Here's what we'll cover:
1. Your current challenges
2. How we can help
3. Next steps

Reschedule if needed: {{reschedule_link}}
```

**WA_TESTI body:**
```
Hi {{name}},

Your call is in 3 hours!

Here's what our customers say:
[TESTIMONIAL_VIDEO_1]
[TESTIMONIAL_VIDEO_2]

See you soon!
```

**WA_REMIND body:**
```
Hi {{name}},

Quick reminder - we're speaking in 1 hour at {{call_time}}.

Make sure you have:
- A quiet space
- Any questions ready

Talk soon!
```

**WA_POST body:**
```
Hi {{name}},

Thanks for the call! Here's everything:

*Summary:*
{{call_summary}}

*Action Items:*
{{action_items}}

*Recording:*
{{fathom_recording_link}}

Questions? Just reply here!
```

**WA_NOSHOW body:**
```
Hi {{name}},

We missed you on our call today!

No worries - would you like to reschedule?

Book a new time: {{booking_link}}
```

**WA_CANCEL body:**
```
Hi {{name}},

Got your cancellation for {{call_date}}.

If you change your mind: {{booking_link}}

All the best!
```

---

**CATEGORY: CALL**

| template_id | category | action_type | name | subject | body |
|-------------|----------|-------------|------|---------|------|
| `CALL_SCRIPT` | call | - | Sales Call Script | | (see below) |
| `CALL_NOSHOW` | call | noshow | No-Show Call Script | | (see below) |

**CALL_SCRIPT body:**
```
PRE-CALL PREP:
- Review: {{company}} background
- Check: Previous interactions from CRM
- Note: Key questions to ask

OPENING (2 min):
"Hi {{name}}, thanks for taking the time today. Before we dive in, quick question - what's the #1 thing you're hoping to get out of this call?"

DISCOVERY (15 min):
1. What's your current setup for [problem area]?
2. What's working? What isn't?
3. What have you tried already?
4. What does success look like for you?

PRESENTATION (10 min):
- Address their specific pain points
- Show relevant case studies
- Demo if appropriate

CLOSE (5 min):
"Based on what you've shared, here's what I think makes sense as a next step..."
```

---

### Tab 4: `Queue` (Scheduled Messages)

The heart of the automation - all future messages are scheduled here.

| Column | Name | Type | Description |
|--------|------|------|-------------|
| A | `queue_id` | STRING | Auto-generated unique ID |
| B | `event_id` | STRING | Reference to Leads.event_id |
| C | `customer_name` | STRING | Copied for quick reference |
| D | `customer_contact` | STRING | Phone or email |
| E | `action_type` | STRING | Links to Rules.action_type |
| F | `channel` | ENUM | `email` / `whatsapp` |
| G | `scheduled_at` | DATETIME | When to send (UTC) |
| H | `scheduled_at_ist` | DATETIME | IST view (formula) |
| I | `status` | ENUM | `pending` / `processing` / `sent` / `failed` / `canceled` |
| J | `priority` | INTEGER | 1=highest, 5=lowest |
| K | `content_preview` | TEXT | First 100 chars of message |
| L | `template_id` | STRING | Which template to use |
| M | `created_at` | DATETIME | When added to queue |
| N | `processed_at` | DATETIME | When actually sent |
| O | `error_message` | TEXT | If failed, why |
| P | `retry_count` | INTEGER | Number of retries |
| Q | `lock` | CHECKBOX | ☑ = Hold, don't send |

**Status Flow:**
```
pending → processing → sent
                    ↘ failed (retry up to 3x)

pending → canceled (if booking canceled/rescheduled)
```

**Example Queue View:**

| queue_id | event_id | customer_name | customer_contact | action_type | channel | scheduled_at | status | content_preview |
|----------|----------|---------------|------------------|-------------|---------|--------------|--------|-----------------|
| Q001 | evt_123 | John Smith | john@acme.com | confirmation | email | 2025-02-01 10:30 | sent | Hi John, Your call... |
| Q002 | evt_123 | John Smith | +919876543210 | confirmation | whatsapp | 2025-02-01 10:30 | sent | Hi John! Your call is... |
| Q003 | evt_123 | John Smith | +919876543210 | testimonials | whatsapp | 2025-02-02 05:00 | pending | Hi John, Your call is in... |
| Q004 | evt_123 | John Smith | +919876543210 | reminder | whatsapp | 2025-02-02 07:00 | pending | Hi John, Quick reminder... |

**Key Benefits of Queue Tab:**
1. **Visibility** - See all upcoming messages at a glance
2. **Manual override** - Check `lock` to hold any message
3. **Rescheduling** - When call moves, cancel old queue items, create new ones
4. **Debugging** - Easy to see what went wrong
5. **Analytics** - Count sent/failed/pending by date

---

### Tab 5: `SendLog` (Audit Trail)

Record of every message actually sent.

| Column | Name | Type | Description |
|--------|------|------|-------------|
| A | `log_id` | STRING | Auto-generated |
| B | `timestamp` | DATETIME | When sent |
| C | `queue_id` | STRING | Reference to Queue |
| D | `event_id` | STRING | Reference to Leads |
| E | `customer_name` | STRING | Quick reference |
| F | `action_type` | STRING | What was sent |
| G | `channel` | ENUM | `email` / `whatsapp` |
| H | `recipient` | STRING | Email or phone |
| I | `provider_message_id` | STRING | Twilio SID / Gmail ID |
| J | `status` | ENUM | `sent` / `delivered` / `read` / `failed` |
| K | `content_hash` | STRING | MD5 for deduplication |
| L | `full_content` | TEXT | Actual message sent |
| M | `error_details` | TEXT | If failed |

---

### Tab 6: `Errors` (Issue Tracking)

| Column | Name | Type | Description |
|--------|------|------|-------------|
| A | `error_id` | STRING | Auto-generated |
| B | `timestamp` | DATETIME | When occurred |
| C | `event_id` | STRING | Related lead (if any) |
| D | `queue_id` | STRING | Related queue item (if any) |
| E | `workflow` | STRING | Which n8n workflow |
| F | `error_type` | STRING | Category |
| G | `error_message` | TEXT | Full details |
| H | `resolved` | CHECKBOX | ☑ = Fixed |
| I | `resolved_at` | DATETIME | When fixed |
| J | `resolution_notes` | TEXT | How fixed |

**Error Types:**
- `TWILIO_FAILED` - WhatsApp send failure
- `GMAIL_FAILED` - Email send failure
- `FATHOM_MISMATCH` - Couldn't match recording to lead
- `SHEET_API_ERROR` - Google Sheets API issue
- `INVALID_PHONE` - Bad phone format
- `TEMPLATE_ERROR` - Variable substitution failed

---

## Workflow Specifications

### Workflow 1: Booking Handler (cal.com → Sheet + Queue)

**Trigger:** cal.com webhook

**Events:** `BOOKING_CREATED`, `BOOKING_RESCHEDULED`, `BOOKING_CANCELLED`

```
┌─────────────────────────────────────────────────────────────────┐
│                     BOOKING_CREATED                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Parse cal.com payload                                        │
│     ├─ event_id = payload.uid                                    │
│     ├─ name = payload.attendees[0].name                          │
│     ├─ email = payload.attendees[0].email                        │
│     ├─ phone = payload.responses.phone                           │
│     ├─ company = payload.responses.company                       │
│     ├─ call_datetime_utc = payload.startTime                     │
│     └─ customer_timezone = payload.attendees[0].timeZone         │
│                                                                  │
│  2. Add/Update Leads row                                         │
│     ├─ Upsert by event_id (idempotent)                           │
│     ├─ Set status = "Pre-Call"                                   │
│     └─ All checkboxes = FALSE                                    │
│                                                                  │
│  3. Read Rules (where enabled = TRUE)                            │
│                                                                  │
│  4. For each Rule, calculate scheduled_at:                       │
│     │                                                            │
│     │  if anchor == "booking_time":                              │
│     │      scheduled_at = NOW + offset_minutes                   │
│     │  if anchor == "call_time":                                 │
│     │      scheduled_at = call_datetime_utc + offset_minutes     │
│     │  if anchor == "fathom_ready":                              │
│     │      SKIP (created later by Fathom Handler)                │
│     │                                                            │
│     └─ Create Queue entry for each                               │
│                                                                  │
│  5. Queue entries created:                                       │
│     ├─ CONF_EMAIL  → scheduled_at = NOW                          │
│     ├─ CONF_WA     → scheduled_at = NOW                          │
│     ├─ TESTI_WA    → scheduled_at = call_time - 3h               │
│     └─ REMIND_WA   → scheduled_at = call_time - 1h               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    BOOKING_RESCHEDULED                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Find lead by event_id                                        │
│                                                                  │
│  2. Update call_datetime_utc with new time                       │
│                                                                  │
│  3. Cancel pending Queue items for this event_id                 │
│     └─ Set status = "canceled" (where status = "pending")        │
│                                                                  │
│  4. Create NEW Queue entries with recalculated times             │
│     ├─ TESTI_WA    → new_call_time - 3h                          │
│     └─ REMIND_WA   → new_call_time - 1h                          │
│                                                                  │
│  5. (Optional) Send reschedule confirmation                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     BOOKING_CANCELLED                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Find lead by event_id                                        │
│                                                                  │
│  2. Set status = "Canceled"                                      │
│                                                                  │
│  3. Cancel ALL pending Queue items for this event_id             │
│                                                                  │
│  4. Create Queue entry for CANCEL_WA (scheduled_at = NOW)        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Workflow 2: Queue Processor (Master Scheduler)

**Trigger:** Cron every 2 minutes

```
┌─────────────────────────────────────────────────────────────────┐
│                     QUEUE PROCESSOR                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Read Queue where:                                            │
│     ├─ status = "pending"                                        │
│     ├─ scheduled_at <= NOW                                       │
│     ├─ lock = FALSE                                              │
│     └─ ORDER BY scheduled_at ASC, priority ASC                   │
│                                                                  │
│  2. For EACH queue item:                                         │
│     │                                                            │
│     │  a. Set status = "processing"                              │
│     │                                                            │
│     │  b. Load lead data from Leads (by event_id)                │
│     │                                                            │
│     │  c. Load template from Templates (by template_id)          │
│     │                                                            │
│     │  d. Load rule from Rules (by action_type)                  │
│     │                                                            │
│     │  e. IF rule.requires_ai = TRUE:                            │
│     │     └─ Call OpenAI/Claude with rule.ai_prompt              │
│     │        └─ Replace {{variables}} with lead data             │
│     │                                                            │
│     │  f. ELSE:                                                  │
│     │     └─ Use template.body, replace {{variables}}            │
│     │                                                            │
│     │  g. SEND MESSAGE:                                          │
│     │     ├─ IF channel = "whatsapp" → Twilio API                │
│     │     └─ IF channel = "email" → Gmail API                    │
│     │                                                            │
│     │  h. IF SUCCESS:                                            │
│     │     ├─ Update Queue: status = "sent", processed_at = NOW   │
│     │     ├─ Update Leads: check corresponding checkbox          │
│     │     ├─ Update Leads: last_interaction, last_interaction_at │
│     │     └─ Log to SendLog                                      │
│     │                                                            │
│     │  i. IF FAILED:                                             │
│     │     ├─ Increment retry_count                               │
│     │     ├─ IF retry_count < 3:                                 │
│     │     │   └─ Set scheduled_at = NOW + 5 min, status=pending  │
│     │     ├─ ELSE:                                               │
│     │     │   └─ Set status = "failed", log to Errors            │
│     │     └─ Continue to next item                               │
│     │                                                            │
│     └─ END FOR EACH                                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Checkbox Mapping (step h):**

| action_type | Leads checkbox column |
|-------------|----------------------|
| `confirmation` + `email` | `confirmation_email` |
| `confirmation` + `whatsapp` | `confirmation_wa` |
| `testimonials` | `testimonials_wa` |
| `reminder` | `reminder_wa` |
| `postcall` + `email` | `postcall_email` |
| `postcall` + `whatsapp` | `postcall_wa` |

---

### Workflow 3: Fathom Handler

**Trigger:** Fathom webhook OR Cron poll every 10 minutes

```
┌─────────────────────────────────────────────────────────────────┐
│                      FATHOM HANDLER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Receive Fathom data:                                         │
│     ├─ recording_url                                             │
│     ├─ transcript_url                                            │
│     ├─ summary (AI-generated by Fathom)                          │
│     ├─ action_items                                              │
│     ├─ meeting_start_time                                        │
│     └─ attendee_emails                                           │
│                                                                  │
│  2. Match to Lead:                                               │
│     ├─ Primary: Find lead where email IN attendee_emails         │
│     ├─ Secondary: Find lead where call_datetime_utc              │
│     │             within 30 min of meeting_start_time            │
│     └─ IF no match → Log to Errors, EXIT                         │
│                                                                  │
│  3. Update Leads:                                                │
│     ├─ call_summary = summary                                    │
│     ├─ action_items = action_items                               │
│     ├─ fathom_recording_link = recording_url                     │
│     ├─ fathom_transcript_link = transcript_url                   │
│     └─ status = "Post-Call"                                      │
│                                                                  │
│  4. Create Queue entries:                                        │
│     ├─ POST_EMAIL → scheduled_at = NOW                           │
│     └─ POST_WA → scheduled_at = NOW                              │
│                                                                  │
│  5. Queue Processor will pick up and send                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Workflow 4: No-Show Detector

**Trigger:** Cron every 15 minutes

```
┌─────────────────────────────────────────────────────────────────┐
│                    NO-SHOW DETECTOR                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Find Leads where:                                            │
│     ├─ status = "Pre-Call"                                       │
│     ├─ call_datetime_utc < (NOW - 45 minutes)                    │
│     └─ fathom_recording_link IS EMPTY                            │
│                                                                  │
│  2. For each potential no-show:                                  │
│     ├─ Update status = "No-Show"                                 │
│     └─ Create Queue entry for NOSHOW_WA (scheduled_at = NOW)     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Integration Details

### cal.com Webhook Setup

**Webhook URL:** `https://your-n8n.com/webhook/calcom-booking`

**Events:**
- `BOOKING_CREATED`
- `BOOKING_RESCHEDULED`
- `BOOKING_CANCELLED`

**Required booking questions:**
1. Phone Number (required) - Label: "WhatsApp number with country code"
2. Company (optional)

---

### Twilio WhatsApp

**Credentials needed:**
- Account SID
- Auth Token
- WhatsApp-enabled number

**n8n setup:** Use HTTP Request node or Twilio node

---

### Gmail

**Setup:**
- Enable Gmail API in Google Cloud Console
- OAuth2 or service account credentials
- Connect in n8n via Gmail node

**Limits:** 500/day (personal) or 2000/day (Workspace)

---

### Fathom

**Option A:** Webhook to `https://your-n8n.com/webhook/fathom-ready`
**Option B:** Poll Fathom API every 10 minutes

---

## Quick Reference

### Journey Timeline (Default)

```
BOOKING CREATED
     │
     ├──[NOW]──────────► Confirmation Email ✓
     ├──[NOW]──────────► Confirmation WhatsApp ✓
     │
     │    ... time passes ...
     │
     ├──[call - 3h]────► Testimonials WhatsApp ✓
     ├──[call - 1h]────► Reminder WhatsApp ✓
     │
     │    === CALL HAPPENS ===
     │
     ├──[fathom ready]─► Post-Call Email ✓
     └──[fathom ready]─► Post-Call WhatsApp ✓
```

### Changing Timing

Edit the `Rules` tab, `offset_minutes` column:

| To change | Update this row | offset_minutes |
|-----------|-----------------|----------------|
| Testimonials timing | `TESTI_WA` | `-180` → `-120` (2h before) |
| Reminder timing | `REMIND_WA` | `-60` → `-30` (30min before) |
| Add 24h before msg | Create new rule | `-1440` |

### Adding New Touchpoints

1. Add row to `Rules` with new `action_type`
2. Add row(s) to `Templates` for that action_type
3. Add checkbox column to `Leads` (optional)
4. Update n8n checkbox mapping

---

## Implementation Checklist

- [ ] Create Google Sheet with 6 tabs
- [ ] Set up cal.com webhook
- [ ] Configure Twilio WhatsApp
- [ ] Set up Gmail API
- [ ] Configure Fathom webhook/API
- [ ] Build n8n: Booking Handler
- [ ] Build n8n: Queue Processor
- [ ] Build n8n: Fathom Handler
- [ ] Build n8n: No-Show Detector
- [ ] Test with dummy booking
- [ ] Go live!

---

*Document Version: 2.0*
*Last Updated: February 1, 2025*
