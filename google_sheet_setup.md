# Google Sheet Setup Guide - Customer Journey Automation v2

Quick copy-paste reference for creating your Google Sheet.

---

## Tab 1: Leads

**Copy this header row:**
```
event_id	name	email	phone	company	call_datetime_utc	call_datetime_ist	customer_timezone	status	confirmation_email	confirmation_wa	testimonials_wa	reminder_wa	postcall_email	postcall_wa	call_summary	action_items	fathom_recording_link	fathom_transcript_link	last_interaction	last_interaction_at	notes	created_at
```

**Column Formats:**
- F, G, U, W: Date time
- I: Dropdown (see below)
- J, K, L, M, N, O: Checkbox

**Formula for Column G (IST from UTC):**
```
=IF(F2="","",F2+(5.5/24))
```

**Data Validation for Column I (status):**
```
Pre-Call, On-Call, Post-Call, No-Show, Canceled
```

---

## Tab 2: Rules

**Copy this header row:**
```
rule_id	action_name	action_type	channel	anchor	offset_minutes	enabled	ai_prompt	static_content	requires_ai	variables	notes
```

**Paste these default rules:**

| rule_id | action_name | action_type | channel | anchor | offset_minutes | enabled | requires_ai |
|---------|-------------|-------------|---------|--------|----------------|---------|-------------|
| CONF_EMAIL | Confirmation Email | confirmation | email | booking_time | 0 | TRUE | FALSE |
| CONF_WA | Confirmation WhatsApp | confirmation | whatsapp | booking_time | 0 | TRUE | FALSE |
| TESTI_WA | Testimonials WhatsApp | testimonials | whatsapp | call_time | -180 | TRUE | FALSE |
| REMIND_WA | Reminder WhatsApp | reminder | whatsapp | call_time | -60 | TRUE | FALSE |
| POST_EMAIL | Post-Call Email | postcall | email | fathom_ready | 0 | TRUE | TRUE |
| POST_WA | Post-Call WhatsApp | postcall | whatsapp | fathom_ready | 0 | TRUE | TRUE |
| NOSHOW_WA | No-Show Follow-up | noshow | whatsapp | call_time | 60 | TRUE | FALSE |
| CANCEL_WA | Cancellation Ack | canceled | whatsapp | booking_time | 0 | TRUE | FALSE |

**Column Formats:**
- F: Number
- G, J: Checkbox

**Data Validation:**
- Column C (action_type): `confirmation, testimonials, reminder, postcall, noshow, canceled`
- Column D (channel): `email, whatsapp, call`
- Column E (anchor): `booking_time, call_time, fathom_ready`

**AI Prompt for POST_EMAIL (paste in H column):**
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

**AI Prompt for POST_WA (paste in H column):**
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

**Variables (paste in K column for all rows):**
```
{{name}}, {{email}}, {{company}}, {{phone}}, {{call_date}}, {{call_time}}, {{call_datetime_ist}}, {{customer_timezone}}, {{call_summary}}, {{action_items}}, {{fathom_recording_link}}, {{fathom_transcript_link}}, {{reschedule_link}}, {{booking_link}}
```

---

## Tab 3: Templates

**Copy this header row:**
```
template_id	category	action_type	name	subject	body	enabled
```

**Column Formats:**
- G: Checkbox

**Data Validation:**
- Column B (category): `email, whatsapp, call`

**Paste these templates:**

### EMAIL Templates

**Row 1: EMAIL_CONF**
```
EMAIL_CONF	email	confirmation	Booking Confirmation	Your call is confirmed - {{call_date}}	Hi {{name}},

Your call has been confirmed!

**Date:** {{call_date}}
**Time:** {{call_time}} ({{customer_timezone}})

What to expect:
- Understanding your current challenges
- How we can help solve them
- Clear next steps if it's a fit

Need to reschedule? {{reschedule_link}}

Looking forward to speaking with you!	TRUE
```

**Row 2: EMAIL_POST**
```
EMAIL_POST	email	postcall	Post-Call Summary	Your call recording + summary	Hi {{name}},

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

Best regards	TRUE
```

### WHATSAPP Templates

**Row 3: WA_CONF**
```
WA_CONF	whatsapp	confirmation	Booking Confirmation		Hi {{name}}!

Your call is confirmed for {{call_date}} at {{call_time}} ({{customer_timezone}}).

Here's what we'll cover:
1. Your current challenges
2. How we can help
3. Next steps

Reschedule if needed: {{reschedule_link}}	TRUE
```

**Row 4: WA_TESTI**
```
WA_TESTI	whatsapp	testimonials	Testimonials		Hi {{name}},

Your call is in 3 hours!

Here's what our customers say:
[TESTIMONIAL_VIDEO_1]
[TESTIMONIAL_VIDEO_2]

See you soon!	TRUE
```

**Row 5: WA_REMIND**
```
WA_REMIND	whatsapp	reminder	Reminder		Hi {{name}},

Quick reminder - we're speaking in 1 hour at {{call_time}}.

Make sure you have:
- A quiet space
- Any questions ready

Talk soon!	TRUE
```

**Row 6: WA_POST**
```
WA_POST	whatsapp	postcall	Post-Call Summary		Hi {{name}},

Thanks for the call! Here's everything:

*Summary:*
{{call_summary}}

*Action Items:*
{{action_items}}

*Recording:*
{{fathom_recording_link}}

Questions? Just reply here!	TRUE
```

**Row 7: WA_NOSHOW**
```
WA_NOSHOW	whatsapp	noshow	No-Show Follow-up		Hi {{name}},

We missed you on our call today!

No worries - would you like to reschedule?

Book a new time: {{booking_link}}	TRUE
```

**Row 8: WA_CANCEL**
```
WA_CANCEL	whatsapp	canceled	Cancellation		Hi {{name}},

Got your cancellation for {{call_date}}.

If you change your mind: {{booking_link}}

All the best!	TRUE
```

### CALL Templates

**Row 9: CALL_SCRIPT**
```
CALL_SCRIPT	call	-	Sales Call Script		PRE-CALL PREP:
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
"Based on what you've shared, here's what I think makes sense as a next step..."	TRUE
```

---

## Tab 4: Queue

**Copy this header row:**
```
queue_id	event_id	customer_name	customer_contact	action_type	channel	scheduled_at	scheduled_at_ist	status	priority	content_preview	template_id	created_at	processed_at	error_message	retry_count	lock
```

**Column Formats:**
- G, H, M, N: Date time
- J, P: Number
- Q: Checkbox

**Data Validation:**
- Column F (channel): `email, whatsapp`
- Column I (status): `pending, processing, sent, failed, canceled`

**Formula for Column H (IST from UTC):**
```
=IF(G2="","",G2+(5.5/24))
```

---

## Tab 5: SendLog

**Copy this header row:**
```
log_id	timestamp	queue_id	event_id	customer_name	action_type	channel	recipient	provider_message_id	status	content_hash	full_content	error_details
```

**Column Formats:**
- B: Date time

**Data Validation:**
- Column G (channel): `email, whatsapp`
- Column J (status): `sent, delivered, read, failed`

---

## Tab 6: Errors

**Copy this header row:**
```
error_id	timestamp	event_id	queue_id	workflow	error_type	error_message	resolved	resolved_at	resolution_notes
```

**Column Formats:**
- B, I: Date time
- H: Checkbox

**Data Validation for error_type:**
```
TWILIO_FAILED, GMAIL_FAILED, FATHOM_MISMATCH, SHEET_API_ERROR, INVALID_PHONE, TEMPLATE_ERROR
```

---

## Quick Checklist

- [ ] Create new Google Sheet
- [ ] Create 6 tabs: Leads, Rules, Templates, Queue, SendLog, Errors
- [ ] Paste header rows
- [ ] Set up data validation dropdowns
- [ ] Set up checkbox columns
- [ ] Add IST formula columns
- [ ] Paste default Rules
- [ ] Paste all Templates
- [ ] Share with n8n service account (Editor access)
- [ ] Copy Sheet ID for n8n

---

## Variable Reference

| Variable | Source | Example |
|----------|--------|---------|
| `{{name}}` | Leads.name | John Smith |
| `{{email}}` | Leads.email | john@acme.com |
| `{{phone}}` | Leads.phone | +919876543210 |
| `{{company}}` | Leads.company | Acme Corp |
| `{{call_date}}` | Formatted from call_datetime_utc | February 2, 2025 |
| `{{call_time}}` | Formatted from call_datetime_utc | 2:00 PM |
| `{{call_datetime_ist}}` | Leads.call_datetime_ist | Feb 2, 2025 2:00 PM IST |
| `{{customer_timezone}}` | Leads.customer_timezone | Asia/Kolkata |
| `{{call_summary}}` | Leads.call_summary | Discussed pricing... |
| `{{action_items}}` | Leads.action_items | 1. Send proposal... |
| `{{fathom_recording_link}}` | Leads.fathom_recording_link | https://fathom.video/... |
| `{{fathom_transcript_link}}` | Leads.fathom_transcript_link | https://fathom.video/... |
| `{{reschedule_link}}` | Generated from cal.com | https://cal.com/reschedule/... |
| `{{booking_link}}` | Your cal.com booking page | https://cal.com/you/30min |

---

## Timing Quick Reference

| Touchpoint | Anchor | Offset | When |
|------------|--------|--------|------|
| Confirmation (Email+WA) | booking_time | 0 | Immediately on booking |
| Testimonials (WA) | call_time | -180 | 3 hours before call |
| Reminder (WA) | call_time | -60 | 1 hour before call |
| Post-Call (Email+WA) | fathom_ready | 0 | As soon as recording ready |
| No-Show (WA) | call_time | +60 | 1 hour after missed call |

**To change timing:** Edit the `offset_minutes` value in the Rules tab.

---

*Ready for n8n workflow setup!*
