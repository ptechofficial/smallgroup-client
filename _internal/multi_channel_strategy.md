# Multi-Channel Lead Nurturing Strategy & Implementation Plan

> **Version:** 2.0
> **Last Updated:** February 2026
> **Channels:** Email + WhatsApp + SMS + Voice AI
> **Focus:** Automated, personalized, multi-touch client journey

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Multi-Channel Strategy](#multi-channel-strategy)
4. [Voice AI Integration](#voice-ai-integration)
5. [Enhanced Tracking & Logging](#enhanced-tracking--logging)
6. [Updated Workflow Architecture](#updated-workflow-architecture)
7. [Google Sheets Enhancement](#google-sheets-enhancement)
8. [Channel-Specific Best Practices](#channel-specific-best-practices)
9. [Message Orchestration Rules](#message-orchestration-rules)
10. [Implementation Roadmap](#implementation-roadmap)
11. [KPIs & Success Metrics](#kpis--success-metrics)

---

## Executive Summary

### Current Limitations
- **Single Channel Risk:** 100% email dependency - if emails land in spam, entire nurture fails
- **Low Engagement:** Email open rates ~20-30%, click rates ~2-3%
- **No Voice Touch:** Missing personal connection that builds trust
- **Limited Logging:** Hard to see full customer interaction history
- **No Urgency Creation:** Email alone doesn't create FOMO or urgency

### Proposed Solution: Multi-Channel Orchestration

```
┌───────────────────────────────────────────────────────────────────────┐
│                     MULTI-CHANNEL TOUCH STRATEGY                      │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   BOOKING → Immediate touch across ALL channels                      │
│             ├─ Email: Detailed confirmation                          │
│             ├─ WhatsApp: Quick ack + video                           │
│             └─ SMS: Backup reminder link                             │
│                                                                       │
│   PRE-CALL → High-frequency, high-touch                              │
│             ├─ Email: Educational content                            │
│             ├─ WhatsApp: Personal messages + media                   │
│             ├─ Voice AI: 24h before (confirm + build rapport)        │
│             └─ SMS: Final reminder (text-to-click)                   │
│                                                                       │
│   CALL COMPLETED → Immediate follow-up                               │
│             ├─ Email: Full summary + recording                       │
│             ├─ WhatsApp: Quick summary + action items                │
│             └─ Voice AI: If no reply by Day 3                        │
│                                                                       │
│   NO-SHOW → Aggressive recovery                                      │
│             ├─ WhatsApp: Immediate check-in                          │
│             ├─ Voice AI: 30 min after (empathetic outreach)          │
│             ├─ Email: +1h reschedule offer                           │
│             └─ SMS: +24h final reminder                              │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

### Expected Results
- **50-70% increase** in show-up rates (multi-channel reminder)
- **40-60% increase** in post-call engagement (voice creates urgency)
- **2-3x better** no-show recovery (immediate voice intervention)
- **Complete visibility** into every touchpoint across all channels

---

## Current State Analysis

### What's Working Well ✅
1. **Email sequences are comprehensive** - good copy, proper timing
2. **Google Sheets CRM is simple** - easy to manage manually
3. **Fathom integration is solid** - AI summaries save time
4. **Clear stage definitions** - easy to understand pipeline
5. **n8n automation foundation** - scalable architecture

### What's Missing ❌
1. **Channel diversity** - 100% email creates single point of failure
2. **Real-time communication** - no instant messaging capability
3. **Human voice element** - no personal connection before/after call
4. **Engagement tracking** - can't see which messages are read/opened
5. **Urgency creation** - email alone doesn't drive immediate action
6. **Interaction history** - hard to see full conversation thread
7. **Response routing** - all replies go to email, not centralized

---

## Multi-Channel Strategy

### Channel Selection Matrix

| Channel | Best For | Timing | Cost | Engagement Rate |
|---------|----------|--------|------|-----------------|
| **Email** | Long-form content, documentation, links | Any time | Free-$0.01/msg | 20-30% open |
| **WhatsApp** | Quick messages, media, urgent reminders | Business hours | $0.005-0.01/msg | 70-90% open |
| **SMS** | Critical alerts, backup reminders | Any time | $0.01-0.03/msg | 98% open |
| **Voice AI** | Rapport building, qualification, urgency | Business hours | $0.05-0.15/min | 30-50% pickup |

### Channel Prioritization Strategy

```
HIGH PRIORITY MESSAGES:
├─ Call reminders (< 4h before) ──────► WhatsApp + SMS + Voice AI
├─ No-show alerts ────────────────────► Voice AI (immediate) + WhatsApp
├─ Post-call follow-up (same day) ────► Email + WhatsApp
└─ Booking confirmations ─────────────► Email + WhatsApp + SMS

MEDIUM PRIORITY MESSAGES:
├─ Pre-call education (24h before) ───► Email + WhatsApp
├─ Testimonials ──────────────────────► WhatsApp (video) + Email
└─ Day 2 follow-up ───────────────────► Email + WhatsApp

LOW PRIORITY MESSAGES:
├─ Day 3+ follow-ups ─────────────────► Email only (unless no response, then Voice AI)
└─ Long-term nurture ─────────────────► Email only
```

---

## Voice AI Integration

### Why Voice AI?

**Traditional objection:** "AI calls are impersonal and spammy"
**Reality:** Done right, they're MORE personal than generic emails

**Benefits:**
1. **Humanizes your brand** - Hearing a voice (even AI) creates connection
2. **Immediate feedback** - Know instantly if they're interested/available
3. **Urgency creation** - "I'm calling to confirm..." triggers action
4. **No-show prevention** - 24h voice check-in reduces no-shows by 40%+
5. **Scalable rapport** - Can't personally call 50+ leads/week, AI can

### Voice AI Use Cases

#### Use Case 1: Pre-Call Confirmation (24h Before)
**Goal:** Confirm attendance, build rapport, answer questions

**Script:**
```
Hi {{name}}, this is Prakarsh's AI assistant calling to confirm your call tomorrow at {{call_time}}.

I wanted to make sure you have everything you need for our conversation about {{problem}}.

Can you confirm you're still available tomorrow?

[WAIT FOR RESPONSE]

If Yes: "Great! Prakarsh is looking forward to it. You'll receive a reminder 30 minutes before. Have a great day!"

If No: "No problem, would you like me to send you a link to reschedule?"

If Voicemail: "Hi {{name}}, just confirming your call with Prakarsh tomorrow at {{call_time}}. If you need to reschedule, check your email for the link. Otherwise, see you tomorrow!"
```

**Expected outcomes:**
- 30-40% connect rate
- 60-70% confirm on voicemail
- 15-20% reschedule proactively (better than no-show)
- Creates "I'm expected" feeling → higher show rate

---

#### Use Case 2: No-Show Recovery (Immediate)
**Goal:** Catch them while still available, reschedule on the spot

**Script:**
```
Hi {{name}}, this is Prakarsh's assistant. I noticed you weren't able to make our call scheduled for {{call_time}}.

No worries at all - things come up!

Are you available now, or would you like to reschedule for later this week?

[WAIT FOR RESPONSE]

If Available Now: "Great! I'll send you the meeting link via text right now. Prakarsh will join in 2 minutes."

If Reschedule: "Perfect, what day works best - tomorrow or Thursday?"

If Voicemail: "Hi {{name}}, we missed you on our call today. I'm sending you a reschedule link via text. Hope to speak soon!"
```

**Expected outcomes:**
- 25-35% connect rate
- 40-50% of connects reschedule immediately
- Converts 10-15% more no-shows than email alone

---

#### Use Case 3: Post-Call Day 3 (If No Email Response)
**Goal:** Re-engage silent leads, create urgency, qualify interest

**Script:**
```
Hi {{name}}, this is Prakarsh's assistant following up on your call from {{call_date}}.

Prakarsh sent over the proposal and recording, but we haven't heard back.

Just checking - are you still interested in moving forward with {{problem}}?

[WAIT FOR RESPONSE]

If Yes: "Great! Do you have any questions about the proposal, or are you ready to schedule the kickoff?"

If Needs Time: "No problem - when should Prakarsh follow up? Next week or next month?"

If Not Interested: "I understand. Can I ask what changed since the call? Your feedback helps us improve."

If Voicemail: "Hi {{name}}, just checking if you received Prakarsh's proposal from {{call_date}}. If you have questions, just reply to the email or text. Thanks!"
```

**Expected outcomes:**
- 20-30% connect rate
- 50-60% clarity on interest level (yes/no/timeline)
- Prevents leads from ghosting without closure

---

#### Use Case 4: High-Value Lead Warm-Up (Pre-Booking)
**Goal:** For ads/outbound - qualify before they book, increase show rate

**Script:**
```
Hi {{name}}, this is Prakarsh's assistant calling about your interest in {{topic}}.

I wanted to reach out personally before you book a call to make sure we're the right fit.

Do you have 60 seconds for me to ask a couple quick questions?

[WAIT FOR RESPONSE]

If Yes:
"Great! Two quick questions:
1. What's the biggest challenge you're facing with {{problem_area}} right now?
2. If we could solve that in the next 30-60 days, would that be valuable?

[BASED ON RESPONSE]

If qualified: "Perfect, it sounds like Prakarsh can definitely help. I'll send you a calendar link via text to book a call. Does that work?"

If not qualified: "Got it - it sounds like you might be earlier in the journey. I'll send you some resources via email that might help. Sound good?"

If Voicemail: "Hi {{name}}, this is Prakarsh's assistant. I wanted to touch base before sending you a booking link. I'll follow up via email with more details. Talk soon!"
```

**Expected outcomes:**
- Pre-qualifies leads (saves time on unqualified calls)
- Increases show rate by 50%+ (they feel personally invited)
- Creates rapport before first meeting

---

### Voice AI Technology Stack Options

#### Option 1: Bland AI (Recommended)
- **Pros:** Built for sales/appointment setting, realistic voices, great for simple scripts
- **Cost:** $0.09/min + $0.01/min phone cost = ~$0.10/min
- **Best for:** Pre-call confirmations, no-show recovery
- **Integration:** Webhook API → n8n

#### Option 2: Vapi.ai
- **Pros:** Most natural conversations, handles complex dialogs, real-time responses
- **Cost:** $0.05/min + $0.013/min (Twilio) = ~$0.065/min
- **Best for:** Qualification calls, objection handling
- **Integration:** REST API → n8n

#### Option 3: Synthflow.ai
- **Pros:** No-code builder, easy voice cloning, built-in CRM
- **Cost:** $0.07-0.12/min depending on plan
- **Best for:** Quick setup without dev work
- **Integration:** Zapier/n8n webhooks

#### Option 4: Retell AI
- **Pros:** Lowest latency (<800ms), best for live conversations
- **Cost:** $0.08/min
- **Best for:** Complex discovery calls
- **Integration:** API + Websockets

**Recommendation:** Start with **Bland AI** for Use Cases 1-2 (simple scripts), then add **Vapi.ai** for Use Case 3-4 (complex qualification) if needed.

---

### Voice AI Best Practices

#### 1. **Always Identify as AI** (Legal + Trust)
```
✅ GOOD: "Hi, this is Prakarsh's AI assistant..."
❌ BAD: "Hi, this is Prakarsh..." (deceptive)
```

#### 2. **Keep Calls Under 2 Minutes**
- Average: 60-90 seconds
- Max: 2 minutes before offering callback
- Script: "I know you're busy - this will take 60 seconds max."

#### 3. **Leave Strategic Voicemails**
- 50-70% of calls go to voicemail
- Voicemail = mini ad for your service
- Always include callback number + text option

#### 4. **Call During Business Hours Only**
```
Optimal times:
- Tuesday-Thursday
- 10am-12pm, 2pm-4pm (local time)
- AVOID: Early morning, lunch (12-1pm), after 5pm, weekends
```

#### 5. **Use Call Results to Update CRM**
```
Call Outcomes:
├─ Connected + Confirmed ──────► Stage = "confirmed" (add to Leads)
├─ Connected + Reschedule ─────► Update call_time, Stage = "rescheduled"
├─ Connected + Not Interested ─► Stage = "lost", Notes = reason
├─ Voicemail Left ─────────────► Log = "VM left", no stage change
├─ No Answer ──────────────────► Retry after 4 hours (max 2 tries)
└─ Wrong Number ───────────────► Flag for manual review
```

---

## Enhanced Tracking & Logging

### Current Problem
- No way to see full interaction history across channels
- Can't tell which messages were actually read/opened
- No unified timeline view per lead

### Solution: Interaction Log System

#### New Google Sheet Tab: `Interaction_Log`

| Column | Name | Type | Description |
|--------|------|------|-------------|
| A | `log_id` | STRING | Auto-generated unique ID |
| B | `event_id` | STRING | Reference to Leads.event_id |
| C | `timestamp` | DATETIME | When interaction happened (UTC) |
| D | `timestamp_ist` | DATETIME | IST view (formula) |
| E | `channel` | ENUM | `email` / `whatsapp` / `sms` / `voice_ai` / `web` |
| F | `direction` | ENUM | `outbound` / `inbound` |
| G | `action_type` | STRING | confirmation / reminder / reply / no_show / etc |
| H | `status` | ENUM | `sent` / `delivered` / `read` / `replied` / `failed` |
| I | `content_preview` | TEXT | First 100 chars of message |
| J | `full_content` | TEXT | Complete message/transcript |
| K | `provider_id` | STRING | Twilio SID / Gmail ID / Bland call ID |
| L | `metadata` | JSON | Extra data (read time, call duration, etc) |
| M | `response_data` | TEXT | If inbound, what they said/wrote |
| N | `response_sentiment` | ENUM | `positive` / `neutral` / `negative` / `question` |
| O | `created_by` | STRING | `system` / `manual` / `ai` |
| P | `notes` | TEXT | Manual notes about interaction |

#### Example Log Entries

| log_id | event_id | timestamp | channel | direction | action_type | status | content_preview |
|--------|----------|-----------|---------|-----------|-------------|--------|-----------------|
| L001 | evt_123 | 2026-02-10 14:00 | email | outbound | confirmation | delivered | Hi John, Your call is confirmed... |
| L002 | evt_123 | 2026-02-10 14:01 | whatsapp | outbound | confirmation | read | Hey John! 👋 Call confirmed for... |
| L003 | evt_123 | 2026-02-10 14:15 | whatsapp | inbound | reply | - | Thanks! Looking forward to it |
| L004 | evt_123 | 2026-02-11 09:00 | voice_ai | outbound | pre_call_confirm | completed | [AI] Called to confirm call at 2pm |
| L005 | evt_123 | 2026-02-11 13:30 | sms | outbound | final_reminder | delivered | See you in 30 min! Link: cal.com/... |

---

### Engagement Scoring System

Track how engaged each lead is based on their interaction patterns.

#### Engagement Score Formula

```
Engagement Score = (Positive Actions × Weight) - (Negative Actions × Weight)

POSITIVE ACTIONS:
├─ Opens email ────────────────► +1 point (per unique open)
├─ Clicks link in email ───────► +3 points
├─ Replies to email ───────────► +5 points
├─ Reads WhatsApp ─────────────► +2 points
├─ Replies to WhatsApp ────────► +5 points
├─ Answers AI call ────────────► +10 points
├─ Confirms on AI call ────────► +15 points
├─ Books/reschedules ──────────► +20 points
└─ Attends call ───────────────► +50 points

NEGATIVE ACTIONS:
├─ No-show ────────────────────► -30 points
├─ Doesn't answer AI call ─────► -5 points
├─ No response after 3 days ───► -10 points
├─ Marks email as spam ────────► -50 points
└─ Requests removal ───────────► -100 points (move to lost)

SCORE RANGES:
├─ 80+ ───► 🔥 Hot Lead (high priority, manual follow-up)
├─ 40-79 ─► ⚡ Warm Lead (continue automation)
├─ 10-39 ─► ❄️ Cool Lead (less frequent touches)
└─ < 10 ──► 🧊 Cold Lead (move to long-term nurture)
```

#### Add to Leads Sheet:

| Column | Name | Formula/Value |
|--------|------|---------------|
| X | `engagement_score` | Calculated from Interaction_Log |
| Y | `last_interaction_channel` | Email / WA / SMS / Voice |
| Z | `last_interaction_date` | Most recent outbound OR inbound |
| AA | `total_touches` | Count of outbound messages |
| AB | `response_rate` | (Inbound / Outbound) × 100% |

---

### Channel Performance Dashboard

Create a new tab: `Dashboard`

#### Metrics to Track:

**Overall:**
- Total leads this month
- Show rate %
- No-show rate %
- Post-call conversion rate %
- Avg engagement score

**Per Channel:**
- Messages sent (Email / WA / SMS / Voice)
- Delivery rate %
- Read/Open rate %
- Reply rate %
- Cost per lead

**Per Stage:**
- Leads in each stage
- Avg time in stage
- Stage conversion rates
- Drop-off points

**Voice AI Specific:**
- Total calls made
- Connect rate %
- Avg call duration
- Outcome breakdown (confirmed / reschedule / not interested)
- Cost per connected call

---

## Updated Workflow Architecture

### New n8n Workflows

#### Workflow 7: Multi-Channel Dispatcher
**Purpose:** Intelligent routing of messages to appropriate channel(s)

```
[Queue Processor detects message ready to send]
       │
       ▼
[Read Rule: What channels for this action_type?]
       │
       ├── If HIGH PRIORITY (< 4h to call, no-show)
       │   └─► Send to ALL enabled channels (Email + WA + SMS + Voice)
       │
       ├── If MEDIUM PRIORITY (24h before, post-call)
       │   └─► Send to Email + WhatsApp
       │
       └── If LOW PRIORITY (Day 3+, long-term)
           └─► Send to Email only
       │
       ▼
[For EACH channel selected]
       │
       ├─► Email ──────► Gmail API
       ├─► WhatsApp ───► Twilio/Meta API
       ├─► SMS ────────► Twilio API
       └─► Voice AI ───► Bland/Vapi API
       │
       ▼
[Log ALL sends to Interaction_Log]
       │
       ▼
[Update Leads: last_interaction_date, last_interaction_channel]
```

---

#### Workflow 8: Voice AI Call Handler

**Trigger:** Queue Processor identifies voice_ai message ready

```
[Voice AI message in Queue]
       │
       ▼
[Get Lead data from Sheets]
       │
       ▼
[Determine script type]
       ├─ pre_call_confirm → Script #1
       ├─ no_show_recovery → Script #2
       └─ post_call_followup → Script #3
       │
       ▼
[Call Bland/Vapi API]
   - Payload: phone, script, lead variables
   - Webhook callback URL: https://n8n.../voice-result
       │
       ▼
[Wait for Webhook Response]
       │
       ├─► Call Status: completed
       │   ├─ Connected: Yes/No
       │   ├─ Duration: 42 seconds
       │   ├─ Outcome: confirmed / reschedule / not_interested / voicemail
       │   └─ Transcript: "Hi, yes I'll be there..."
       │
       ▼
[Update Interaction_Log]
   - channel = "voice_ai"
   - status = "completed"
   - full_content = transcript
   - metadata = {duration, outcome, connected}
       │
       ▼
[Update Leads based on outcome]
   ├─ Confirmed ──────────────► Add note: "Confirmed via AI call"
   ├─ Reschedule ─────────────► Update call_time, create new queue entries
   ├─ Not Interested ─────────► Stage = "lost"
   ├─ Voicemail ──────────────► Add note: "VM left", schedule retry in 4h
   └─ No Answer ──────────────► Schedule retry (max 2 attempts)
       │
       ▼
[Update Engagement Score]
   ├─ Connected + Confirmed ──► +15 points
   ├─ Connected + Other ──────► +10 points
   ├─ Voicemail ──────────────► +0 points
   └─ No Answer ──────────────► -5 points
```

---

#### Workflow 9: Inbound Response Handler

**Purpose:** Capture and log ALL inbound responses across channels

```
[Every 5 minutes - Check for inbound messages]
       │
       ├─► Gmail: Get unread emails
       ├─► Twilio: Get new WhatsApp messages
       ├─► Twilio: Get new SMS replies
       └─► Bland/Vapi: Get new voice transcripts
       │
       ▼
[For EACH inbound message]
       │
       ├─► Extract: sender email/phone, content, timestamp
       │
       ├─► Find Lead in Sheets by email/phone
       │       │
       │       └─ Not found? → Log to Errors, alert team
       │
       ├─► Log to Interaction_Log
       │       ├─ direction = "inbound"
       │       ├─ status = "-" (not applicable for inbound)
       │       └─ response_data = full message
       │
       ├─► Use AI to analyze sentiment
       │       ├─ OpenAI: "Is this message positive/neutral/negative/question?"
       │       └─ Update: response_sentiment
       │
       ├─► Update Leads
       │       ├─ last_interaction_date = now
       │       ├─ last_interaction_channel = [channel]
       │       └─ Stage = "engaged" (if stage was "follow_up")
       │
       ├─► Update Engagement Score
       │       └─ +5 points for any reply
       │
       ├─► Cancel pending Queue items for this lead
       │       └─ Auto-sequence stops when they engage
       │
       └─► Send team notification
               "{{name}} replied via {{channel}}: {{preview}}"
```

---

#### Workflow 10: Engagement Score Calculator

**Trigger:** Cron every hour

```
[Get ALL Leads where Stage NOT IN ("won", "lost")]
       │
       ▼
[For EACH Lead]
       │
       ├─► Get ALL Interaction_Log entries for this event_id
       │
       ├─► Calculate score using formula
       │       ├─ Count each action type
       │       ├─ Multiply by weight
       │       └─ Sum total
       │
       ├─► Update Leads.engagement_score
       │
       └─► IF score changed by 20+ points
               └─► Send team alert: "{{name}} engagement {{increased/decreased}} to {{score}}"
```

---

## Google Sheets Enhancement

### Updated `Leads` Tab Structure

Add new columns to existing 6 columns (A-F):

| Col | Header | Description | Formula/Value |
|-----|--------|-------------|---------------|
| G | `status` | Pre-Call / Post-Call / No-Show | (existing) |
| H | `stage` | booked / follow_up / won | (existing) |
| I | `confirmation_email` | ☑ Sent | (existing) |
| J | `confirmation_wa` | ☑ Sent | (existing) |
| K | `testimonials_wa` | ☑ Sent | (existing) |
| L | `reminder_wa` | ☑ Sent | (existing) |
| M | `precall_voice_ai` | ☑ Called + Outcome | NEW |
| N | `final_reminder_sms` | ☑ Sent | NEW |
| O | `postcall_email` | ☑ Sent | (existing) |
| P | `postcall_wa` | ☑ Sent | (existing) |
| Q | `postcall_voice_ai` | ☑ Called + Outcome | NEW |
| R | `engagement_score` | 0-100 | NEW (calculated) |
| S | `total_touches` | Count | NEW (calculated) |
| T | `response_rate` | % | NEW (calculated) |
| U | `last_interaction_channel` | Email/WA/SMS/Voice | NEW |
| V | `last_interaction_date` | Timestamp | NEW |
| W | `call_summary` | Text from Fathom | (existing) |
| X | `action_items` | Text | (existing) |
| Y | `notes` | Manual notes | (existing) |

---

### New Tab: `Rules` (Enhanced for Multi-Channel)

Add channel selection columns:

| Col | Header | Description |
|-----|--------|-------------|
| A-L | (existing columns) | rule_id, action_name, action_type, etc |
| M | `use_email` | ☑ Enable email for this action |
| N | `use_whatsapp` | ☑ Enable WhatsApp |
| O | `use_sms` | ☑ Enable SMS |
| P | `use_voice_ai` | ☑ Enable Voice AI |
| Q | `priority_level` | HIGH / MEDIUM / LOW |
| R | `voice_script_id` | Which voice script to use (if applicable) |

**Example Rule:**

| rule_id | action_name | action_type | anchor | offset_minutes | use_email | use_whatsapp | use_sms | use_voice_ai | priority_level |
|---------|-------------|-------------|--------|----------------|-----------|--------------|---------|--------------|----------------|
| CONF_MULTI | Booking Confirmation | confirmation | booking_time | 0 | ☑ | ☑ | ☑ | ☐ | MEDIUM |
| PRE_VOICE | 24h Confirmation Call | pre_call_confirm | call_time | -1440 | ☐ | ☐ | ☐ | ☑ | HIGH |
| REMIND_FINAL | 30min Final Reminder | final_reminder | call_time | -30 | ☐ | ☑ | ☑ | ☐ | HIGH |
| NOSHOW_VOICE | No-Show Recovery Call | no_show_recovery | call_time | 30 | ☐ | ☐ | ☐ | ☑ | HIGH |

---

### New Tab: `Voice_Scripts`

Store all voice AI scripts with variables:

| Column | Name | Description |
|--------|------|-------------|
| A | `script_id` | Unique identifier |
| B | `script_name` | Human-readable name |
| C | `use_case` | pre_call / no_show / post_call / qualification |
| D | `max_duration` | Max call length in seconds |
| E | `greeting` | Opening line |
| F | `main_message` | Core script with {{variables}} |
| G | `if_connected` | What to say if they answer |
| H | `if_voicemail` | What to say if VM |
| I | `if_question` | How to handle common questions |
| J | `closing` | Ending line |
| K | `expected_outcomes` | confirmed / reschedule / not_interested / voicemail |
| L | `follow_up_action` | What to do after call |

---

## Channel-Specific Best Practices

### Email Best Practices

**DO:**
✅ Keep subject lines under 60 characters
✅ Use personalization ({{name}}, {{problem}})
✅ Include clear CTA (1 primary action)
✅ Mobile-responsive (60% read on mobile)
✅ Send during business hours (9am-5pm local time)

**DON'T:**
❌ Use spam trigger words ("FREE!", "ACT NOW!")
❌ Send more than 1 email per day to same lead
❌ Use all caps or excessive punctuation!!!
❌ Attach large files (use links instead)
❌ Send from no-reply@ addresses

---

### WhatsApp Best Practices

**DO:**
✅ Keep messages under 500 characters
✅ Use emojis (sparingly) for friendliness 👋 ✅
✅ Include media (images, videos) when relevant
✅ Ask questions to drive engagement
✅ Respond quickly to inbound messages (< 1 hour)

**DON'T:**
❌ Send promotional content (will get banned)
❌ Message outside 8am-8pm local time
❌ Send more than 3 messages without reply
❌ Use link shorteners (looks spammy)
❌ Ignore opt-out requests

**WhatsApp Template Approval Required:**
- All messages must be pre-approved by Meta
- Submit templates 2-3 weeks before going live
- Use variables {{1}}, {{2}} for personalization
- Category: UTILITY (not MARKETING)

---

### SMS Best Practices

**DO:**
✅ Keep under 160 characters (1 SMS unit)
✅ Include sender name ("From Prakarsh")
✅ Use for time-sensitive reminders only
✅ Include opt-out instructions (required by law)
✅ Use URL shorteners (Bitly, Rebrandly)

**DON'T:**
❌ Send marketing content (use for transactional only)
❌ Message before 8am or after 9pm
❌ Send multiple SMS per day
❌ Use SMS as primary channel (expensive)

**Legal Requirements (USA):**
- Must include opt-out: "Reply STOP to unsubscribe"
- Must honor STOP requests immediately
- Must include business name in first message
- Keep records of consent (Cal.com form = consent)

---

### Voice AI Best Practices

**DO:**
✅ Identify as AI assistant immediately
✅ Keep calls under 2 minutes
✅ Leave voicemails (50-70% won't answer)
✅ Call during business hours only
✅ Use natural, conversational language
✅ Give clear next steps

**DON'T:**
❌ Pretend to be human (illegal in many places)
❌ Call same person more than 2x per day
❌ Read long scripts (sounds robotic)
❌ Call outside 9am-8pm local time
❌ Use aggressive sales tactics

**Voice Quality Tips:**
- Use 11Labs or PlayHT voices (most realistic)
- Add pauses with [pause: 1s] in script
- Use conversational fillers: "um", "you know", "right"
- Clone your own voice (builds trust)
- Test with 10-20 calls before scaling

---

## Message Orchestration Rules

### Rule #1: No More Than 3 Touches Per Day
Even with multi-channel, don't overwhelm leads.

**Max daily touches:**
- 1 Email + 1 WhatsApp + 1 SMS = OK
- 2 Emails + 2 WhatsApp = TOO MUCH
- Voice AI call + Email + WhatsApp = OK if high priority

---

### Rule #2: Stagger Messages Across Channels
Don't send all at once - space them out.

**Example: Pre-Call 24h Before**
```
9:00am ──► Email: Testimonials
2:00pm ──► Voice AI: Confirmation call
4:00pm ──► WhatsApp: Quick reminder
```

**NOT:**
```
9:00am ──► Email + WhatsApp + Voice AI all at once (overwhelming)
```

---

### Rule #3: Respect Opt-Outs Per Channel
If they opt out of WhatsApp, keep email/SMS active unless they opt out of ALL.

**Tracking:**
Add to Leads tab:
- `opt_out_email` (checkbox)
- `opt_out_whatsapp` (checkbox)
- `opt_out_sms` (checkbox)
- `opt_out_voice` (checkbox)

Before sending ANY message, check opt-out status.

---

### Rule #4: Escalate Channels Based on Priority

**Low Priority (Day 7 check-in):**
Email only

**Medium Priority (Booking confirmation):**
Email + WhatsApp

**High Priority (30 min before call):**
Email + WhatsApp + SMS

**Critical Priority (No-show):**
Voice AI + WhatsApp + Email + SMS

---

### Rule #5: Stop All Automation When They Engage
As soon as they reply via ANY channel:
1. Update Stage = "engaged"
2. Cancel ALL pending Queue items
3. Alert team for manual follow-up
4. Log engagement score boost (+5 to +10)

---

## Implementation Roadmap

### Phase 1: WhatsApp Integration (Week 1-2)

**Week 1:**
- [ ] Sign up for Twilio WhatsApp Business API OR Meta Business API
- [ ] Submit 6 WhatsApp templates for approval
- [ ] Set up Twilio/Meta credentials in n8n
- [ ] Test send/receive WhatsApp messages via n8n
- [ ] Add WhatsApp columns to Leads tab (confirmation_wa, reminder_wa, postcall_wa)

**Week 2:**
- [ ] Update n8n Workflow 1 (Booking Handler) to send WhatsApp confirmation
- [ ] Update n8n Workflow 2 (Queue Processor) to support WhatsApp channel
- [ ] Update Templates tab with WhatsApp message templates
- [ ] Update Rules tab with use_whatsapp checkboxes
- [ ] Test full pre-call sequence with real lead (Email + WhatsApp)

**Success Criteria:**
- WhatsApp messages send automatically at right times
- Inbound WhatsApp replies are logged
- No spam flags or bans from Meta/Twilio

---

### Phase 2: Enhanced Logging (Week 3)

**Week 3:**
- [ ] Create new Interaction_Log tab in Google Sheets
- [ ] Build n8n Workflow 9 (Inbound Response Handler)
- [ ] Test logging for Email, WhatsApp (all outbound + inbound)
- [ ] Add engagement_score, total_touches, response_rate columns to Leads
- [ ] Build n8n Workflow 10 (Engagement Score Calculator)
- [ ] Test engagement score updates

**Success Criteria:**
- Every message (sent + received) appears in Interaction_Log
- Engagement scores update hourly
- Can see full timeline of interactions per lead

---

### Phase 3: Voice AI Integration (Week 4-5)

**Week 4:**
- [ ] Choose Voice AI platform (Bland AI recommended)
- [ ] Create account + get API credentials
- [ ] Create Voice_Scripts tab in Google Sheets
- [ ] Write 3 scripts: pre_call_confirm, no_show_recovery, post_call_day3
- [ ] Test voice calls manually (call 5-10 test numbers)
- [ ] Fine-tune scripts based on feedback

**Week 5:**
- [ ] Build n8n Workflow 8 (Voice AI Call Handler)
- [ ] Add voice AI rules to Rules tab
- [ ] Update Queue Processor to support voice_ai channel
- [ ] Add precall_voice_ai, postcall_voice_ai columns to Leads
- [ ] Test end-to-end: booking → voice call 24h before
- [ ] Monitor first 10-20 real calls, adjust scripts

**Success Criteria:**
- Voice AI calls trigger automatically based on rules
- Call outcomes (confirmed/reschedule/voicemail) update Leads
- Call transcripts logged to Interaction_Log
- No compliance issues (always identifies as AI)

---

### Phase 4: SMS Backup Channel (Week 6)

**Week 6:**
- [ ] Enable Twilio SMS (already set up if using for WhatsApp)
- [ ] Add SMS templates to Templates tab
- [ ] Add use_sms checkboxes to Rules tab
- [ ] Update Multi-Channel Dispatcher to support SMS
- [ ] Test SMS for: final_reminder (30 min before), no_show_followup
- [ ] Add opt-out handling: "Reply STOP to unsubscribe"

**Success Criteria:**
- SMS sends for high-priority messages only
- Opt-outs are respected (no SMS after STOP)
- Cost stays under $0.03/message

---

### Phase 5: Dashboard & Reporting (Week 7)

**Week 7:**
- [ ] Create Dashboard tab in Google Sheets
- [ ] Add KPI formulas (show rate, engagement score avg, cost per lead)
- [ ] Create channel performance metrics (delivery %, open %, reply %)
- [ ] Build weekly summary email to team
- [ ] Set up alerts for: high engagement leads, low show rate, errors

**Success Criteria:**
- Dashboard shows real-time metrics
- Team gets weekly performance report
- Can identify which channels drive best engagement

---

### Phase 6: Optimization & Scaling (Week 8+)

**Week 8+:**
- [ ] A/B test voice scripts (test 2 versions of pre-call script)
- [ ] A/B test message timing (3h before vs 4h before)
- [ ] Analyze which channels drive best show rates
- [ ] Optimize for cost (disable expensive channels if not working)
- [ ] Scale to 50+ leads/week

**Continuous Improvement:**
- Review Dashboard weekly
- Update scripts based on lead feedback
- Add new channels if needed (LinkedIn, etc)
- Train team on using multi-channel system

---

## KPIs & Success Metrics

### Primary KPIs (Track Weekly)

| Metric | Baseline (Email Only) | Target (Multi-Channel) | How to Measure |
|--------|----------------------|------------------------|----------------|
| **Show Rate** | 60-70% | 80-90% | (Calls attended / Calls booked) × 100% |
| **No-Show Recovery** | 10-15% | 30-40% | (No-shows who reschedule / Total no-shows) × 100% |
| **Post-Call Reply Rate** | 20-30% | 50-60% | (Leads who reply / Calls completed) × 100% |
| **Engagement Score Avg** | N/A | 40-60 | Average engagement_score across all leads |
| **Time to Reply** | 24-48 hours | 4-12 hours | Avg time between our outreach and their reply |

---

### Secondary KPIs (Track Monthly)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Cost Per Lead** | $2-5 | Total channel costs / # leads |
| **Cost Per Booked Call** | $3-7 | Total costs / # booked calls |
| **Cost Per Attended Call** | $5-10 | Total costs / # attended calls |
| **Email Open Rate** | 30-40% | Opens / Sent |
| **WhatsApp Read Rate** | 80-90% | Read receipts / Sent |
| **Voice AI Connect Rate** | 30-50% | Connected calls / Total calls |
| **SMS Delivery Rate** | 95-98% | Delivered / Sent |

---

### Channel ROI Analysis

Track cost vs. value per channel:

**Example (for 100 leads/month):**

| Channel | Messages Sent | Cost | Show Rate Impact | ROI |
|---------|---------------|------|------------------|-----|
| Email | 800 | $8 | +10% | ⭐⭐⭐⭐⭐ Best ROI |
| WhatsApp | 600 | $6 | +15% | ⭐⭐⭐⭐⭐ High ROI |
| SMS | 200 | $6 | +5% | ⭐⭐⭐ Medium ROI |
| Voice AI | 100 | $15 | +20% | ⭐⭐⭐⭐ Good ROI (expensive but effective) |

**Total:** $35/month for 100 leads = $0.35 per lead

**Value:** If show rate goes from 65% → 85% (+20%), that's 20 more attended calls. If close rate is 20%, that's 4 more deals × $3,000 avg = $12,000 more revenue.

**ROI:** $12,000 revenue / $35 cost = **34,000% ROI** 🚀

---

### Lead Quality Indicators

Use engagement score to identify best leads:

| Engagement Score | Lead Quality | Action |
|------------------|--------------|--------|
| 80-100 | 🔥 Hot | Personal follow-up from founder, high-touch sales |
| 60-79 | ⚡ Warm | Continue automation + light personal touch |
| 40-59 | ❄️ Cool | Keep in automation, don't spend manual time |
| 20-39 | 🧊 Cold | Long-term nurture only |
| < 20 | ❌ Dead | Move to lost, don't waste resources |

---

## Conclusion & Next Steps

### What You'll Achieve

With this multi-channel system, you'll:

1. **Increase show rates by 50%+** (multi-channel reminders work)
2. **Recover 3x more no-shows** (voice AI intervention)
3. **Get 2x more post-call replies** (WhatsApp + Voice creates urgency)
4. **Save 10+ hours/week** (automation handles follow-ups)
5. **Never lose a lead to silence** (can see who's engaged, who needs manual touch)

---

### Immediate Action Items

**This Week:**
1. Review this document with your team
2. Decide which phases to implement first (recommend Phase 1-2)
3. Sign up for Twilio (WhatsApp + SMS)
4. Submit WhatsApp templates to Meta for approval
5. Set up test environment in n8n

**Next Week:**
1. Implement Phase 1 (WhatsApp)
2. Test with 5-10 real leads
3. Monitor Interaction_Log for issues
4. Start collecting data for Dashboard

**Within 30 Days:**
1. Complete Phases 1-3 (Email + WhatsApp + Voice AI)
2. Have 50+ leads go through new system
3. Measure KPIs vs. baseline
4. Iterate on scripts/timing based on data

---

### Questions to Answer Before Starting

1. **Budget:** What's your monthly budget for messaging? (WhatsApp/SMS/Voice AI costs)
2. **Volume:** How many leads/month? (Affects platform choice)
3. **Geography:** Where are your leads? (Affects timing, compliance)
4. **Team:** Who will monitor inbound responses? (Still need human for engaged leads)
5. **Priority:** Which problem to solve first? (No-shows? Post-call ghosting? Both?)

---

### Support & Resources

**Recommended Reading:**
- Twilio WhatsApp API Docs: https://www.twilio.com/docs/whatsapp
- Bland AI Documentation: https://docs.bland.ai
- n8n Community: https://community.n8n.io
- TCPA Compliance (USA): https://www.fcc.gov/general/telemarketing-and-robocalls

**Tools Mentioned:**
- n8n (automation): https://n8n.io
- Twilio (WhatsApp/SMS): https://twilio.com
- Bland AI (voice): https://bland.ai
- Vapi.ai (voice): https://vapi.ai
- Synthflow (voice): https://synthflow.ai
- Retell AI (voice): https://retell.ai
- Cal.com (booking): https://cal.com
- Fathom (transcription): https://fathom.video

---

**Document Version:** 2.0
**Last Updated:** February 12, 2026
**Status:** Ready for Implementation
**Next Review:** After Phase 3 completion

---

*This strategy is designed for AI consulting/B2B services with $1,500-8,000 deal sizes and 1-week sales cycles. Adjust timing/channels based on your specific business model.*
