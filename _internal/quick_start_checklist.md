# Multi-Channel Lead Nurturing - Quick Start Checklist

> Get started in 1-2 weeks with this step-by-step checklist

---

## Overview

This checklist will help you implement the multi-channel lead nurturing system in **3 phases over 6 weeks**.

**Time commitment:**
- **Phase 1 (WhatsApp):** 2 weeks, 10-15 hours
- **Phase 2 (Logging):** 1 week, 5-8 hours
- **Phase 3 (Voice AI):** 2 weeks, 12-18 hours

**Total:** 6 weeks, 27-41 hours (spread across 6 weeks = 4-7 hours/week)

---

## Pre-Flight Checklist

Before starting, make sure you have:

### Required Access
- [ ] n8n instance running (self-hosted or cloud)
- [ ] Google Sheets with edit access
- [ ] Cal.com account with admin access
- [ ] Gmail account for sending emails
- [ ] Credit card for Twilio/Voice AI signup

### Required Knowledge
- [ ] Basic understanding of n8n workflows
- [ ] Basic understanding of Google Sheets formulas
- [ ] Basic understanding of webhooks/APIs

### Budget Approval
- [ ] $50-100 for initial testing (WhatsApp + Voice AI)
- [ ] $35-50/month ongoing (for 100 leads/month)

---

## PHASE 1: WhatsApp Integration (Week 1-2)

**Goal:** Add WhatsApp as second communication channel alongside email

### Week 1: Setup & Testing

#### Monday: Twilio Account Setup
- [ ] Sign up at [twilio.com](https://www.twilio.com)
- [ ] Verify your identity (required for WhatsApp)
- [ ] Add $20 to account balance
- [ ] Get Account SID and Auth Token (save securely)

**Time:** 30 minutes

---

#### Tuesday: WhatsApp Business API Setup
- [ ] In Twilio, go to Messaging → Try it out → Send a WhatsApp message
- [ ] Request WhatsApp Business API access (can take 1-3 days)
- [ ] While waiting, test with Twilio Sandbox (join by sending code to their test number)
- [ ] Send yourself a test WhatsApp message via Twilio

**Time:** 45 minutes

---

#### Wednesday: WhatsApp Template Submission
- [ ] Go to Twilio → Messaging → Content Templates
- [ ] Submit these 6 templates for approval (copy from LEAD_NURTURE_PIPELINE.md):
  1. `booking_confirmation` (UTILITY category)
  2. `call_reminder` (UTILITY category)
  3. `call_final_reminder` (UTILITY category)
  4. `no_show_waiting` (UTILITY category)
  5. `no_show_reschedule` (UTILITY category)
  6. `post_call_checkin` (UTILITY category)

**Note:** Approval takes 1-3 business days. Continue with other tasks while waiting.

**Time:** 1 hour

**Template Example:**
```
Name: booking_confirmation
Category: UTILITY
Language: English

Body:
Hey {{1}}! 👋

Call confirmed for {{2}}.

I'll send a reminder before we connect.

Quick video on what to expect: {{3}}

Looking forward to it!

Variables:
{{1}} = name
{{2}} = call_datetime
{{3}} = loom_link
```

---

#### Thursday: n8n Twilio Integration
- [ ] In n8n, install Twilio node (if not already installed)
- [ ] Add Twilio credentials:
  - Account SID
  - Auth Token
  - WhatsApp-enabled number (format: `whatsapp:+14155551234`)
- [ ] Create test workflow:
  - Manual Trigger
  - Set variables (your name, your phone)
  - Twilio node → Send WhatsApp
  - Test: Send yourself a message
- [ ] Verify you receive it

**Time:** 45 minutes

---

#### Friday: Google Sheets Updates
- [ ] Open your Leads Google Sheet
- [ ] Add new columns (after existing columns):
  - `confirmation_wa` (checkbox)
  - `testimonials_wa` (checkbox)
  - `reminder_4h_wa` (checkbox)
  - `reminder_30m_wa` (checkbox)
  - `postcall_wa` (checkbox)
  - `noshow_wa` (checkbox)

- [ ] Update Templates tab:
  - Add rows for WhatsApp templates
  - Copy message content from LEAD_NURTURE_PIPELINE.md section "WhatsApp Templates for Meta Approval"

- [ ] Update Rules tab:
  - Add column: `use_whatsapp` (checkbox)
  - Check the box for: confirmation, testimonials, reminder, post_call, no_show actions

**Time:** 1 hour

---

### Week 2: Workflow Implementation

#### Monday: Update Workflow 1 (Booking Handler)
- [ ] Open your existing "Pre-Call Nurture" workflow in n8n
- [ ] Find the node that sends confirmation email
- [ ] Add parallel branch:
  ```
  [Cal.com Webhook]
         │
         ├─► [Send Email] (existing)
         │
         └─► [Send WhatsApp] (NEW)
                 ├─ To: {{phone}}
                 ├─ From: whatsapp:+1415...
                 └─ Body: (use template)
  ```
- [ ] Update Google Sheets node to check `confirmation_wa` = TRUE
- [ ] Test with fake booking

**Time:** 1.5 hours

---

#### Tuesday: Update Workflow 2 (Scheduled Messages)
- [ ] Open "Scheduled Pre-Call Messages" workflow
- [ ] For each timing checkpoint (24h, 4h, 30m), add WhatsApp branch:
  ```
  [Check: 4 hours until call]
         │
         ├─► [Send Email] (existing)
         │
         └─► [Send WhatsApp] (NEW)
                 ├─ To: {{phone}}
                 └─ Body: (use 4h reminder template)
  ```
- [ ] Update Sheet update nodes to check respective WhatsApp checkboxes
- [ ] Test by manually creating a lead with call_time = now + 4 hours

**Time:** 2 hours

---

#### Wednesday: Update Workflow 3 (Post-Call)
- [ ] Open "Post-Call Follow-Up" workflow
- [ ] After Fathom webhook, add WhatsApp node alongside email:
  ```
  [Fathom Data]
         │
         ├─► [Send Email: Summary] (existing)
         │
         └─► [Send WhatsApp: Quick Summary] (NEW)
                 ├─ To: {{phone}}
                 └─ Body: Short summary + action items
  ```
- [ ] Update Sheet to check `postcall_wa` = TRUE
- [ ] Test with fake Fathom webhook (or wait for real call)

**Time:** 1.5 hours

---

#### Thursday: Update Workflow 6 (No-Show Handler)
- [ ] Open "No-Show Handler" workflow
- [ ] Add immediate WhatsApp message:
  ```
  [No-Show Detected]
         │
         ├─► [Send WhatsApp: "I'm on the call..."] (IMMEDIATE)
         │
         └─► [Wait 15 min]
                 ├─► [Send Email: Reschedule] (existing)
                 └─► [Send WhatsApp: Reschedule link] (NEW)
  ```
- [ ] Update Sheet to check `noshow_wa` = TRUE
- [ ] Test by simulating no-show (manually trigger workflow)

**Time:** 1.5 hours

---

#### Friday: End-to-End Testing
- [ ] Create test booking (use your own email/phone)
- [ ] Verify you receive:
  - Confirmation email ✉️
  - Confirmation WhatsApp 📱
- [ ] Wait for scheduled messages (or manually trigger)
- [ ] Verify you receive:
  - 4h reminder WhatsApp 📱
  - 30m reminder WhatsApp 📱
- [ ] Attend the call (or simulate no-show)
- [ ] Verify post-call or no-show messages
- [ ] Check Google Sheets: All checkboxes should be ✓

**Time:** 2 hours (includes waiting time)

---

### Phase 1 Success Criteria ✅
- [ ] WhatsApp templates approved by Meta/Twilio
- [ ] WhatsApp messages send automatically at right times
- [ ] All messages logged with checkboxes in Google Sheets
- [ ] Can reply to WhatsApp and see conversation in Twilio
- [ ] No errors in n8n workflows

**Congratulations! You've added multi-channel communication. Now monitor 5-10 real leads before proceeding to Phase 2.**

---

## PHASE 2: Enhanced Logging (Week 3)

**Goal:** Track every interaction across all channels in one place

### Monday: Create Interaction_Log Tab

- [ ] In Google Sheets, create new tab: `Interaction_Log`
- [ ] Add columns (copy from MULTI_CHANNEL_STRATEGY.md):
  ```
  A: log_id (formula: ="L"&TEXT(ROW(),"0000"))
  B: event_id
  C: timestamp
  D: timestamp_ist (formula: =C2+(5.5/24))
  E: channel (dropdown: email, whatsapp, sms, voice_ai, web)
  F: direction (dropdown: outbound, inbound)
  G: action_type
  H: status (dropdown: sent, delivered, read, replied, failed)
  I: content_preview (first 100 chars)
  J: full_content
  K: provider_id
  L: metadata (JSON)
  M: response_data
  N: response_sentiment (dropdown: positive, neutral, negative, question)
  O: created_by
  P: notes
  ```

**Time:** 30 minutes

---

### Tuesday: Update All Workflows to Log

For EVERY message send (email, WhatsApp), add logging:

**Pattern:**
```
[Send Email/WhatsApp]
       │
       ├─► Success?
       │      └─► [Add Row to Interaction_Log]
       │              ├─ event_id: {{event_id}}
       │              ├─ timestamp: {{NOW}}
       │              ├─ channel: "email" or "whatsapp"
       │              ├─ direction: "outbound"
       │              ├─ action_type: "confirmation" (etc)
       │              ├─ status: "sent"
       │              ├─ content_preview: {{SUBSTRING(message, 0, 100)}}
       │              ├─ full_content: {{message}}
       │              └─ provider_id: {{gmail_id or twilio_sid}}
       │
       └─► Failed?
              └─► [Add Row to Errors]
```

**Time:** 3 hours (touch every workflow)

---

### Wednesday: Build Inbound Response Handler (Workflow 9)

Create new workflow:

```
[Cron: Every 5 minutes]
       │
       ├─► [Gmail: Get Unread Emails]
       │      └─► [For Each Email]
       │              ├─ Extract sender email
       │              ├─ Find lead in Sheets (by email)
       │              ├─ Log to Interaction_Log (direction: inbound)
       │              ├─ Update Leads: last_interaction_date
       │              └─ If stage = "follow_up" → stage = "engaged"
       │
       └─► [Twilio: Get New WhatsApp Messages]
              └─► [For Each Message]
                      ├─ Extract sender phone
                      ├─ Find lead in Sheets (by phone)
                      ├─ Log to Interaction_Log (direction: inbound)
                      ├─ Update Leads: last_interaction_date
                      └─ If stage = "follow_up" → stage = "engaged"
```

**Time:** 2 hours

---

### Thursday: Add Engagement Tracking Columns

- [ ] In Leads tab, add columns:
  ```
  engagement_score (number)
  total_touches (formula: =COUNTIF(Interaction_Log!B:B, A2))
  total_responses (formula: =COUNTIFS(Interaction_Log!B:B, A2, Interaction_Log!F:F, "inbound"))
  response_rate (formula: =IF(total_touches>0, total_responses/total_touches*100, 0))
  last_interaction_channel (lookup from Interaction_Log, most recent)
  last_interaction_date (lookup from Interaction_Log, most recent)
  ```

**Time:** 1 hour

---

### Friday: Build Engagement Score Calculator (Workflow 10)

Create new workflow:

```
[Cron: Every hour]
       │
       ▼
[Get Leads where stage NOT IN ("won", "lost")]
       │
       ▼
[For Each Lead]
       │
       ├─► [Get all Interaction_Log entries for this event_id]
       │
       ├─► [Calculate score using formula]
       │      ├─ Opens email: +1 per open
       │      ├─ Clicks link: +3
       │      ├─ Replies email: +5
       │      ├─ Reads WhatsApp: +2
       │      ├─ Replies WhatsApp: +5
       │      ├─ Attends call: +50
       │      ├─ No-show: -30
       │      └─ No response after 3 days: -10
       │
       └─► [Update Leads.engagement_score]
```

**Time:** 2 hours

---

### Phase 2 Success Criteria ✅
- [ ] Every outbound message logged to Interaction_Log
- [ ] Every inbound reply logged to Interaction_Log
- [ ] Can see full timeline of interactions per lead
- [ ] Engagement scores calculate automatically
- [ ] Response rates calculate automatically

**You now have complete visibility into lead engagement!**

---

## PHASE 3: Voice AI Integration (Week 4-5)

**Goal:** Add voice calls to create human connection and urgency

### Week 4: Voice AI Setup

#### Monday: Choose & Setup Voice AI Platform

**Recommended: Bland AI** (easiest to start)

- [ ] Sign up at [bland.ai](https://bland.ai)
- [ ] Add $50 to account (test with $10-15 first)
- [ ] Get API key
- [ ] Test simple call via their dashboard:
  - Call your own phone
  - Use simple script: "Hi, this is a test call from Bland AI. Just making sure everything works!"
  - Verify call quality

**Time:** 30 minutes

---

#### Tuesday: Create Voice Scripts

- [ ] In Google Sheets, create new tab: `Voice_Scripts`
- [ ] Add columns: script_id, script_name, use_case, greeting, main_message, if_connected, if_voicemail, closing
- [ ] Add 3 scripts (copy from MULTI_CHANNEL_STRATEGY.md):
  1. `PRE_CALL_CONFIRM` - 24h before call
  2. `NO_SHOW_RECOVERY` - Immediate after no-show
  3. `POST_CALL_DAY3` - If no email response

**Example Script:**
```
script_id: PRE_CALL_CONFIRM
script_name: Pre-Call 24h Confirmation
use_case: pre_call_confirm

greeting:
"Hi {{name}}, this is Prakarsh's AI assistant calling to confirm your call tomorrow at {{call_time}}."

main_message:
"I wanted to make sure you have everything you need for our conversation about {{problem}}. Can you confirm you're still available tomorrow?"

if_connected:
"Great! Prakarsh is looking forward to it. You'll receive a reminder 30 minutes before. Have a great day!"

if_voicemail:
"Hi {{name}}, just confirming your call with Prakarsh tomorrow at {{call_time}}. If you need to reschedule, check your email for the link. Otherwise, see you tomorrow!"

closing:
"Thank you, goodbye!"
```

**Time:** 2 hours

---

#### Wednesday: Test Voice Scripts

- [ ] In Bland AI dashboard, create campaign with each script
- [ ] Call yourself 3 times (once per script)
- [ ] Answer one, let one go to voicemail, and ignore one
- [ ] Listen to recordings
- [ ] Adjust scripts based on how they sound:
  - Too fast? Add [pause: 1s]
  - Too robotic? Add conversational words ("um", "you know")
  - Too long? Cut unnecessary words

**Time:** 1.5 hours

---

#### Thursday: n8n Voice AI Integration

- [ ] In n8n, create HTTP Request node for Bland AI
- [ ] Test workflow:
  ```
  [Manual Trigger]
         │
         ├─► [Set Variables]
         │      ├─ phone: "+1234567890"
         │      ├─ name: "Test Lead"
         │      └─ script: "PRE_CALL_CONFIRM"
         │
         ├─► [HTTP Request: POST to Bland AI]
         │      URL: https://api.bland.ai/v1/calls
         │      Headers: Authorization: Bearer {{api_key}}
         │      Body: {
         │        "phone_number": "{{phone}}",
         │        "task": "{{script_from_sheets}}",
         │        "voice": "maya",
         │        "webhook": "https://your-n8n.com/webhook/voice-result"
         │      }
         │
         └─► [Wait for Webhook]
                └─► [Log Result to Interaction_Log]
  ```

- [ ] Execute workflow, verify call is received

**Time:** 2 hours

---

#### Friday: Add Voice to Rules

- [ ] In Rules tab, add column: `use_voice_ai` (checkbox)
- [ ] Enable for:
  - `PRE_CALL_CONFIRM` (24h before, offset: -1440 min)
  - `NO_SHOW_RECOVERY` (30 min after no-show, offset: +30 min)
  - `POST_CALL_DAY3` (Day 3, offset: +4320 min from fathom_ready)

- [ ] In Leads tab, add columns:
  - `precall_voice_ai` (text: "Called - {{outcome}}")
  - `noshow_voice_ai` (text: "Called - {{outcome}}")
  - `postcall_voice_ai` (text: "Called - {{outcome}}")

**Time:** 30 minutes

---

### Week 5: Voice AI Workflows

#### Monday: Build Voice AI Call Handler (Workflow 8)

```
[Queue Processor detects voice_ai message ready]
       │
       ▼
[Get Lead data from Sheets]
       │
       ▼
[Get Script from Voice_Scripts tab (by action_type)]
       │
       ▼
[Replace {{variables}} in script]
       │
       ▼
[HTTP Request: Bland AI Call]
       │
       ├─► [Log to Interaction_Log]
       │      ├─ channel: "voice_ai"
       │      ├─ status: "initiated"
       │      └─ provider_id: {{bland_call_id}}
       │
       └─► [Wait for Webhook Result]
```

**Time:** 2 hours

---

#### Tuesday: Build Voice AI Webhook Handler

```
[Webhook: voice-result]
       │
       ├─► [Parse Bland AI Response]
       │      ├─ call_id
       │      ├─ status: "completed"
       │      ├─ connected: true/false
       │      ├─ duration: 42 seconds
       │      ├─ outcome: "confirmed" / "reschedule" / "voicemail"
       │      └─ transcript: "Hi, yes I'll be there..."
       │
       ├─► [Update Interaction_Log]
       │      ├─ Find row by provider_id = call_id
       │      ├─ Update status: "completed"
       │      ├─ Update full_content: transcript
       │      └─ Update metadata: {duration, connected, outcome}
       │
       ├─► [Update Leads based on outcome]
       │      ├─ If "confirmed" → Add note, engagement +15
       │      ├─ If "reschedule" → Update call_time, create new queue
       │      ├─ If "not_interested" → Stage = "lost"
       │      ├─ If "voicemail" → Schedule retry in 4h (max 2 retries)
       │      └─ If "no_answer" → Schedule retry in 4h (max 2 retries)
       │
       └─► [Update Leads.precall_voice_ai column]
               "Called - {{outcome}} ({{duration}}s)"
```

**Time:** 2 hours

---

#### Wednesday: Integrate Voice into Booking Handler

- [ ] Update Workflow 1 (Booking Handler) to create voice_ai queue entries:
  ```
  [Cal.com Webhook: Booking Created]
         │
         ├─► (existing: email, whatsapp)
         │
         └─► [Create Queue Entry]
                ├─ action_type: "pre_call_confirm"
                ├─ channel: "voice_ai"
                ├─ scheduled_at: call_time - 24 hours
                └─ template_id: "PRE_CALL_CONFIRM"
  ```

**Time:** 1 hour

---

#### Thursday: Integrate Voice into No-Show Handler

- [ ] Update Workflow 6 (No-Show Handler) to trigger voice call:
  ```
  [No-Show Detected]
         │
         ├─► [Wait 30 minutes]
         │
         └─► [Create Queue Entry]
                ├─ action_type: "no_show_recovery"
                ├─ channel: "voice_ai"
                ├─ scheduled_at: NOW
                └─ template_id: "NO_SHOW_RECOVERY"
  ```

**Time:** 1 hour

---

#### Friday: End-to-End Voice Testing

- [ ] Create test booking (call time = tomorrow, same time)
- [ ] Wait 24 hours for voice call (or manually trigger)
- [ ] Answer the call, confirm attendance
- [ ] Check:
  - Call logged to Interaction_Log? ✅
  - Transcript captured? ✅
  - Outcome updated in Leads? ✅
  - Engagement score increased? ✅

- [ ] Simulate no-show tomorrow, verify recovery call triggers

**Time:** 2 hours (includes waiting)

---

### Phase 3 Success Criteria ✅
- [ ] Voice AI calls trigger automatically (24h before)
- [ ] No-show recovery calls work
- [ ] Call transcripts log to Interaction_Log
- [ ] Outcomes update Leads (confirmed/reschedule/voicemail)
- [ ] Engagement scores reflect voice interactions

**Congratulations! You now have a fully automated, multi-channel lead nurturing system!**

---

## Post-Implementation: Monitor & Optimize (Week 6+)

### Week 6: Monitoring

- [ ] Monitor first 10-20 leads through full journey
- [ ] Check Interaction_Log daily for errors
- [ ] Review call transcripts - are scripts working?
- [ ] Check engagement scores - do they make sense?
- [ ] Monitor costs in Twilio/Bland AI dashboards

### Week 7: First Optimization

- [ ] Analyze show rate: Did it improve from baseline?
- [ ] If voice calls too short/long, adjust scripts
- [ ] If WhatsApp read rate low, improve copy
- [ ] If engagement scores all low, adjust point values
- [ ] A/B test: Try 2 versions of pre-call voice script

### Week 8+: Scale

- [ ] Once confident, increase lead volume
- [ ] Add SMS channel (Phase 4 in main doc)
- [ ] Build Dashboard for weekly KPI reviews
- [ ] Train team on using multi-channel system
- [ ] Document learnings in your own LEARNINGS.md

---

## Troubleshooting Guide

### WhatsApp Issues

**Problem:** Templates not approved
- **Solution:** Resubmit with "UTILITY" category (not MARKETING), remove promotional language

**Problem:** Messages not delivered
- **Solution:** Check phone format (must have country code: +14155551234)

**Problem:** "Phone not on WhatsApp"
- **Solution:** Verify they have WhatsApp installed on that number

---

### Voice AI Issues

**Problem:** Calls go straight to voicemail
- **Solution:** Try calling 2-4pm local time (best pickup rate), avoid lunch hours

**Problem:** Script sounds robotic
- **Solution:** Add pauses [pause: 1s], use contractions ("I'll" not "I will"), add filler words

**Problem:** Calls too expensive
- **Solution:** Keep under 2 min, use for high-priority only (pre-call, no-show)

**Problem:** Call outcome wrong
- **Solution:** Improve prompt to Bland AI, add examples of each outcome in task description

---

### n8n Issues

**Problem:** Workflow errors
- **Solution:** Check error message, verify API credentials, check Google Sheets permissions

**Problem:** Messages send duplicate
- **Solution:** Add deduplication check (check if message already sent in last 1 hour)

**Problem:** Scheduled messages don't send
- **Solution:** Check cron expression, verify Queue has pending items with correct scheduled_at

---

## Resources & Links

### Documentation
- Main strategy: [MULTI_CHANNEL_STRATEGY.md](./MULTI_CHANNEL_STRATEGY.md)
- Workflow comparison: [WORKFLOW_COMPARISON.md](./WORKFLOW_COMPARISON.md)
- Original pipeline: [LEAD_NURTURE_PIPELINE.md](./LEAD_NURTURE_PIPELINE.md)

### Platform Links
- Twilio: https://www.twilio.com
- Bland AI: https://bland.ai
- Vapi.ai: https://vapi.ai (alternative voice AI)
- n8n Community: https://community.n8n.io
- Cal.com: https://cal.com

### Support
- Twilio WhatsApp docs: https://www.twilio.com/docs/whatsapp
- Bland AI docs: https://docs.bland.ai
- n8n workflows: https://n8n.io/workflows

---

## Success Celebration 🎉

When you complete all phases, you'll have:

✅ Multi-channel communication (Email + WhatsApp + Voice AI)
✅ Complete interaction logging and visibility
✅ Automated engagement scoring
✅ 50%+ higher show rates
✅ 3x better no-show recovery
✅ 2-3x more post-call engagement
✅ Hours saved every week on manual follow-ups

**Estimated Impact:**
- 20 more attended calls per month
- 4 more deals closed per month
- $12,000+ more revenue per month
- All for just $35/month in extra costs

**ROI: 34,000%** 🚀

---

**Questions?** Review the main strategy document or reach out for help.

**Ready to start?** Begin with Phase 1, Monday, Twilio setup!

Good luck! 🎯
