# Emilio — Build Roadmap

**Client:** Emilio Zevallos | Academia Ecom
**What we're building:** Full lead capture → nurture → booking → show-up system on GoHighLevel
**Goal:** Turn ad traffic + YouTube viewers into booked video calls, reduce no-shows from 60% to under 30%, and get prospects further along in the sales process before the call
**Skill reference:** `_skills/sales-funnels/skill.md`

---

## System Overview

```
┌─────────────┐  ┌─────────────┐  ┌──────────────────┐
│ Instagram Ads│  │ Facebook Ads│  │ YouTube Organic   │
└──────┬───────┘  └──────┬──────┘  └────────┬──────────┘
       │                 │                   │
       └────────────┬────┘───────────────────┘
                    ▼
         ┌─────────────────────┐
         │  LEAD CAPTURE PAGE  │
         │  Name + Email + Phone│
         │  + 3 qualifying Qs   │
         └──────────┬──────────┘
                    ▼
         ┌─────────────────────┐
         │    LANDING PAGE     │
         │ VSSL (with chapters)│
         │ + Book a Call       │
         └──────────┬──────────┘
                    │
           ┌───────┴────────┐
           ▼                ▼
      [ BOOKED ]      [ NOT BOOKED ]
           │                │
           ▼                ▼
  ┌─────────────────┐  WhatsApp Nudge Flow
  │ CONFIRMATION    │       +
  │ PAGE (research  │  Pre-Booking Email
  │ hub + breakout  │  Funnel (5 emails)
  │ videos)         │
  └────────┬────────┘
           ▼
  Post-Booking Email Sequence
  (research-oriented, aggressive)
           +
  Sales Rep Manual Outreach
  (selfie video + trust assets)
           +
  WhatsApp Reminders
           +
  Pixel fires → Meta (qualified signal)
           ▼
      [ CALL DAY ]
           │
      ┌────┴─────┐
      ▼          ▼
  [ SHOWED ]  [ NO-SHOW ]
      │          │
      ▼          ▼
  Sales call  Reschedule flow
              → Long-Term Follow-Up
```

---

## 1. Lead Capture Page

**What we build:** A multi-step GHL form page connected to all ad traffic.
**Language:** English (will translate to Spanish later once Emilio confirms messaging)

### Competitor Analysis (Typeform funnel we're improving on)

The competitor asks 9 questions: name, email, WhatsApp, FBA awareness, current income, income goal, FBA stage, available capital, age confirmation. **Problems:** too many steps (kills conversion), age gate is wasted, income question feels intrusive for cold traffic.

**Our approach:** 6 questions. Capture contact info first (so even if they drop off, we have them), then 3 qualifying questions that help the sales team prioritize AND psychologically commit the prospect.

### Form Flow (6 steps)

| Step | Question | Type | Why |
|------|----------|------|-----|
| 1 | **What's your name?** | Text input | Contact capture — get this first |
| 2 | **What's your best email?** | Email input | Contact capture |
| 3 | **What's your WhatsApp number?** | Phone input | Contact capture — enables WhatsApp funnel. After this step, we have enough to follow up even if they abandon |
| 4 | **How much do you know about Amazon FBA?** | Multiple choice | Segments by awareness level — sales rep adjusts pitch accordingly |
| | A: Never heard of it | | Tag: `awareness:cold` |
| | B: I've heard of it, but don't know the details | | Tag: `awareness:warm` |
| | C: I know the model and want to get started | | Tag: `awareness:hot` |
| 5 | **How much capital do you have available to start your Amazon business?** | Multiple choice | Qualifies budget — critical for sales rep to know before the call |
| | A: Less than $2,000 | | Tag: `capital:low` |
| | B: $2,000 – $5,000 | | Tag: `capital:medium` |
| | C: $5,000 – $10,000 | | Tag: `capital:high` |
| | D: More than $10,000 | | Tag: `capital:premium` |
| 6 | **What's your monthly income goal for the next 6 months?** | Multiple choice | Reveals ambition level — helps sales rep frame the pitch around their specific goal |
| | A: $1,000 – $3,000/month | | Tag: `goal:starter` |
| | B: $3,000 – $10,000/month | | Tag: `goal:growth` |
| | C: More than $10,000/month | | Tag: `goal:ambitious` |

### What we dropped vs. the competitor
- **Current income** — too personal for cold traffic, creates friction. Capital question gives us enough financial signal.
- **Age confirmation** — unnecessary legal CYA that adds zero value. Remove.
- **FBA stage** — redundant with question 4 (awareness level). The competitor asks both "have you heard of FBA" AND "what stage are you at" which overlaps.

### What we added vs. the competitor
- **Income goal** — forward-looking (aspirational) instead of backward-looking (current income). Feels motivating, not judgmental. And gives sales rep a hook: "You said you want to hit $10K/month — let me show you how Emilio's students are doing it."

### Behavior on submit
- Contact created in GHL with tags: `new-lead`, `source:[instagram|facebook|youtube]`, + qualifying tags from steps 4-6
- Redirect immediately to the Landing Page
- Triggers both the Pre-Booking Email Funnel and WhatsApp Nudge Funnel
- **Pixel event:** `Lead` fires back to Meta for ad optimization
- **If prospect drops off after step 3 but before completing:** Contact still created with whatever we captured. Tagged `incomplete-form`. Still enters WhatsApp nudge (first message references the training, not the form).

### Open decision (ask Emilio)
- Does the page show a short teaser video above the form, or just a headline + promise?
- Option A: Clean form only — "Get my free Amazon FBA strategy training"
- Option B: Form + 30-second teaser clip from Emilio to hook before they enter details

---

## 2. Landing Page (academiaecom.com)

**What we build:** A two-step VSL page hosted on GHL.

### Step 1 — Watch the Training
- Emilio's 15-18 min strategy training video (embedded, no external redirect)
- **Chapter titles on the video** — label each section so viewers can navigate (e.g., "0:00 My Amazon Story", "3:20 The FBA Model Explained", "8:00 How I Find Products", "12:30 My Exact Strategy", "15:00 Next Steps"). This dramatically increases retention — people who skip around are better than people who bounce at minute 2.
- Progress bar below the video (psychological urgency)
- No booking CTA visible initially

### Step 2 — Book Your Call
- After ~3-4 minutes of watch time, the booking section reveals below the video
- GHL calendar embed (replaces Calendly) — "Book a free strategy call"
- **Booking window: 2-3 days out minimum** — don't allow same-day bookings. This gives us time to run the full post-booking research sequence before the call. Emilio's 60% no-show rate means leads aren't educated enough before calling.
- Calendar captures: preferred date/time, pre-qualifying question ("How much do you have to invest in your Amazon product?")

### Below the fold (reinforcement)
- What you'll discover on the call (3-4 bullet points)
- Student testimonials / social proof (average results, not outlier wins)
- "Still have questions?" — links to WhatsApp chat

### Pixel conditioning
- When someone books: fire `Schedule` event back to Meta ads
- This tells the algorithm "find more people like this person who actually booked"
- If over time the sales team reports unqualified leads booking: switch to Conversion API — sales rep marks "qualified" in GHL pipeline, that signal fires back to Meta instead

---

## 3. Confirmation Page (NEW — The Research Hub)

**What we build:** A dedicated page that loads immediately after someone books a call. This is NOT a throwaway "thanks" page — it's the #1 lever for reducing no-shows and getting people further along in the sales process.

**Why this matters for Emilio:** His 60% no-show rate means people book and then forget, lose interest, or don't feel confident enough to show up. This page gives them reasons to show up informed.

### Page Structure

#### 3A. Confirmation Video (1-2 min, from Emilio)
Short, personal video:
> "Hey [Name], congrats on booking your strategy call! I'm really excited to talk with you. Between now and your call, I want to help you get as prepared as possible. Below this video, you'll find a few short videos that answer the most common questions people have before we chat. Watch whichever ones are relevant to you — by the time we talk, you'll know if this is right for you. See you on [day]!"

**Tone:** Warm, human, no-pressure. This is Emilio's LatAm audience — trust is everything.

#### 3B. Breakout Videos (4-8 short videos)
Each answers ONE specific question or handles ONE objection. 30 seconds to 3 minutes each.

| # | Breakout Video | What It Covers | Why It Matters |
|---|---------------|----------------|----------------|
| 1 | "How much money do I need to start?" | Realistic capital requirements for Amazon FBA, what the investment covers | #1 question new prospects ask — handle it before the call |
| 2 | "What if I have no experience with e-commerce?" | Stories of students who started from zero, the learning curve | Overcomes "this isn't for me" objection (most of Emilio's audience is beginners) |
| 3 | "How long until I see results?" | Realistic timeline — first 90 days, 6 months, 1 year | Sets expectations, prevents disappointment on the call |
| 4 | "What makes Academia Ecom different?" | Emilio's personal selling experience, the community, ongoing support | Trust-building — why learn from Emilio specifically |
| 5 | "What does the course actually include?" | Quick walkthrough of the curriculum, Discord community, support structure | Reduces unknown → makes the call about "should I do this" not "what is this" |
| 6 | "Is Amazon FBA still worth it in 2026?" | Market data, trends, why FBA is still viable | Handles the macro-level doubt |
| 7 | "Meet [Sales Rep Name]" | Short intro from the person they'll actually speak with | Humanizes the call — they're meeting a person, not a company |
| 8 | "What happens on the call?" | Walk through: "We'll ask about your goals, your budget, your timeline — and then honestly tell you if this is a fit" | Removes fear of being "sold to" — critical for LatAm trust dynamic |

**Ask Emilio:** What are the top 3-5 questions his sales reps get on every single call? Those become breakout videos.

#### 3C. Testimonials (below breakout videos)
- 2-3 student video testimonials (or screenshot testimonials if no video)
- Show average results, not the best-case outlier
- Ideally Hispanic students who started from zero (matches audience identity)

#### 3D. Trust Assets
- Link to Emilio's YouTube channel
- Link to Discord community
- Any press, features, or credibility markers

---

## 4. Pre-Booking Email Funnel (5 emails, every 2-3 days)

**Trigger:** Lead submits the capture form but has NOT booked a call
**Goal:** Drive them back to the landing page to book a call
**Platform:** GHL email sequences
**Exit condition:** Lead books a call → removed from this sequence, enters Post-Booking sequence

### Email 1 — Immediate (within 5 min of form submit)
**Subject:** Your Amazon FBA training is ready
**Purpose:** Deliver the training link, set expectations
- "Here's the training I promised — [link to landing page]"
- Brief intro from Emilio: who he is, why he teaches this
- CTA: Watch the training now

### Email 2 — Day 2-3
**Subject:** Did you finish watching?
**Purpose:** Re-engage if they haven't booked yet
- "Most people don't finish — but the best part is in the last 5 minutes"
- Quick value nugget (one tip from the training)
- CTA: Finish watching + book your call

### Email 3 — Day 5-6
**Subject:** [Student name] started with zero experience too
**Purpose:** Social proof / overcome "this isn't for me" objection
- Student success story (ideally a Hispanic student who started from scratch)
- Focus on the transformation, not the course features
- CTA: Book your free strategy call

### Email 4 — Day 8-9
**Subject:** The #1 mistake new Amazon sellers make
**Purpose:** Standalone value — build authority
- Teach one specific insight (not covered in the training video)
- Position Emilio as the expert who can help them avoid this
- CTA: "Want me to look at your specific situation? Book a call"

### Email 5 — Day 11-12
**Subject:** Last chance — should I close your file?
**Purpose:** Urgency / final push
- "I keep spots open for serious people. If you're not interested, no hard feelings."
- Scarcity angle: "My team only takes X calls per week"
- Final CTA: Book now or reply to this email if you have questions

---

## 5. Post-Booking Email Sequence (NEW — Research Delivery)

**Trigger:** Lead books a call
**Goal:** Get them to show up informed, with common questions already answered, further along in the sales process
**Window:** From booking until call time (2-3 days)
**Volume:** 2-3 emails per day (aggressive but research-oriented, not reminder spam)
**Expected open rates:** 60-70% when the content is genuinely useful

**Key principle:** These are NOT "reminder: your call is tomorrow" emails. Each email delivers actual value — a breakout video, a student story, an answer to a real question. The prospect should feel like they're being educated, not chased.

### Day 1 (day of booking)

**Email 1 — Immediately after booking**
**Subject:** Your strategy call is confirmed — here's how to prepare
- Confirmation details (date, time, who they'll speak with)
- "Between now and your call, I want to share a few things that will help you get the most out of our conversation."
- Link to Confirmation Page: "Start here — I've prepared some short videos for you"
- CTA: Visit the confirmation page

**Email 2 — Same day, evening**
**Subject:** Quick question — how much do you need to start on Amazon?
- Embed or link to Breakout Video #1 ("How much money do I need to start?")
- Short text summary of the answer
- "This is the #1 question people ask on the call. Now you already know."

### Day 2

**Email 3 — Morning**
**Subject:** [Student name] went from zero to [result] in [timeframe]
- Student success story (repurposed from breakout videos / testimonials)
- Focus on someone who matches the prospect's profile (beginner, Hispanic, similar capital level)

**Email 4 — Afternoon**
**Subject:** What actually happens on the call (no surprises)
- Embed or link to Breakout Video #8 ("What happens on the call?")
- Walk through: "We'll ask about your goals, we'll be honest about whether this is a fit, zero pressure"
- Removes fear of being "sold to" — huge for Emilio's LatAm trust-first audience

### Day 3 (day before or day of call)

**Email 5 — Morning**
**Subject:** See you tomorrow — one last thing
- Embed or link to Breakout Video #4 ("What makes Academia Ecom different?")
- Reminder of call time + meeting link
- "If something came up, no problem — reschedule here: [link]"

**Email 6 — 2 hours before call**
**Subject:** Your call is in 2 hours
- Meeting link prominently displayed
- "If you watched any of the videos I sent, you're already ahead of most people. Looking forward to chatting."
- Reschedule link if needed

---

## 6. Sales Rep Manual Pre-Call Outreach (NEW)

**The #1 influence on show rate:** A real human establishing communication before the call — not the day of, but within hours of booking.

This is the single biggest gap in Emilio's current system. His sales reps currently only text manually on the morning of the call. By then it's too late.

### Protocol

| When | What | Channel |
|------|------|---------|
| Within 2-4 hours of booking | **Selfie video** from the sales rep who will take the call | WhatsApp |
| | "Hey [Name], it's [Rep Name] from Academia Ecom! I just saw you booked a call with me for [day]. Really looking forward to it. If you have any questions before then, just reply here — I'm around. Talk soon!" | |
| Day 2 (if no reply) | Share a trust asset | WhatsApp |
| | Send a specific breakout video or student story relevant to their qualifying answers (e.g., if `capital:low` → send "How much money do I need to start?" video) | |
| Day of call, 1 hour before | Quick check-in | WhatsApp |
| | "Hey [Name], see you in an hour! Here's the meeting link: [link]. If something came up, just let me know." | |

### Why This Works for Emilio's Audience
- Hispanic/LatAm buyers need human trust — an automated bot doesn't create trust
- A real face on a selfie video makes the call feel like meeting a person, not a sales pitch
- The rep already has qualifying data from the form — they can personalize their outreach
- Emilio said himself: "When they meet with me, the conversion rate increases dramatically." The selfie video gives them a preview of that personal connection.

### Rules for Sales Reps
- WhatsApp from the actual business number (not a random unknown number)
- Selfie video must look professional but natural — not scripted, not salesy
- If the prospect replies, have a real conversation. DO NOT hand off to a bot.
- Use qualifying tags to personalize: "I see you're interested in getting to $10K/month — we've helped a lot of people in a similar position"

---

## 7. WhatsApp Funnel

**Platform:** GHL WhatsApp Business API integration

### 7A. Non-Booker Nudge Sequence

**Trigger:** Lead submitted form but has NOT booked a call within 1 hour
**Goal:** Get them to book
**Exit condition:** Lead books → move to Post-Booking flows (Sections 5, 6, 7B)

| Timing | Message |
|--------|---------|
| +1 hour after form | "Hey [Name]! This is [Sales Rep Name] from Academia Ecom. Did you get a chance to watch Emilio's training? Here's the link if you need it: [landing page URL]" |
| +24 hours | "Just checking in — the training covers the exact strategy Emilio uses to sell on Amazon. It's only 15 minutes. Worth a watch: [link]" |
| +3 days | "Quick question [Name] — are you still interested in starting your Amazon FBA business? If so, I'd love to book you a quick call with our team. No pressure, just a conversation. [calendar link]" |
| +7 days | "Hey [Name], I know life gets busy. Just wanted to let you know the offer to chat is still open. A lot of our students started exactly where you are now. Whenever you're ready: [calendar link]" |

**After 7 days with no response:**
- Tag as `cold-lead`
- Move to Long-Term Follow-Up (Section 8)
- No more automated messages

**If they respond at any point:**
- Tag as `engaged`
- Human sales rep takes over the conversation (no bot replies after first response)

### 7B. Booked — WhatsApp Reminders

**Trigger:** Lead books a call via GHL calendar
**Goal:** Support the research sequence (Sections 5 + 6) with WhatsApp touchpoints
**Tags:** `booked`, `call-date:[date]`

**Note:** These work alongside the Post-Booking Email Sequence and Sales Rep Manual Outreach — they are NOT the only thing happening post-booking anymore.

| Timing | Message |
|--------|---------|
| Immediately after booking | "Your call is confirmed for [date/time]. You'll be speaking with [Rep Name]. I've sent some short videos to your email that'll help you prepare — check them out when you get a chance!" |
| 24 hours before call | "Reminder — your strategy call is tomorrow at [time]. [Rep Name] is looking forward to it! If you need to reschedule, just reply here." |
| 1 hour before call | "See you in 1 hour, [Name]! Here's your meeting link: [link]. If something came up, reply here to reschedule — no problem at all." |

**If they don't show up:**
- +30 min after missed call → WhatsApp: "Hey [Name], looks like we missed you! No worries — want to reschedule? [calendar link]"
- +1 day → WhatsApp: "Still interested in chatting? Here's the link to pick a new time: [calendar link]"
- If no response after 2 reschedule attempts → tag `no-show-cold`, move to Long-Term Follow-Up

---

## 8. Long-Term WhatsApp Follow-Up Strategy

**Trigger:** Lead tagged `cold-lead` or `no-show-cold`
**Goal:** Stay on radar without being annoying — re-engage when the time is right
**Frequency:** Once every 2 weeks, max 4 messages over 2 months

| Week | Message Type |
|------|-------------|
| Week 2 | Value share: "Hey [Name], Emilio just dropped a new video on [topic]. Thought you might find it useful: [YouTube link]" |
| Week 4 | Social proof: "One of our students [first name] just made their first Amazon sale this week. Started from zero 3 months ago. Just wanted to share some motivation." |
| Week 6 | Direct ask: "Hey [Name], are you still thinking about Amazon FBA? Our team has a few spots open this week for free strategy calls. No commitment: [link]" |
| Week 8 | Final: "Hey [Name], just wanted to check in one last time. If Amazon FBA isn't for you right now, totally understand. But if you ever want to chat, we're here: [link]. Wishing you the best!" |

**After Week 8 with no engagement:** Tag `archived`. No more outreach.

---

## 9. GHL Setup — Technical Scope

| Component | What we configure |
|-----------|------------------|
| **GHL Account** | Emilio's own account ($97/mo plan), WhatsApp add-on (~$10/mo) |
| **Pipeline** | Stages: New Lead → Watching Training → Booked → Research Sent → Showed Up → Enrolled → Cold → Archived |
| **Tags** | **Source:** `source:instagram`, `source:facebook`, `source:youtube` · **Qualifying:** `awareness:cold/warm/hot`, `capital:low/medium/high/premium`, `goal:starter/growth/ambitious` · **Funnel:** `new-lead`, `incomplete-form`, `watching`, `engaged`, `booked`, `researching`, `no-show`, `no-show-cold`, `cold-lead`, `enrolled`, `archived` |
| **Calendar** | GHL native calendar replacing Calendly — same qualifying questions, **2-3 day minimum booking window** |
| **Forms** | Lead capture form (name, email, phone + 3 qualifying Qs) with source tracking |
| **Funnels/Pages** | Lead capture page + Landing page (VSL + calendar) + **Confirmation page (research hub)** |
| **Email Sequences** | Pre-booking nurture (5 emails, Section 4) + **Post-booking research sequence (6 emails, Section 5)** |
| **WhatsApp Workflows** | Non-booker nudge (7A) + Booked reminders (7B) + Long-term follow-up (8) |
| **Automations** | Form submit → create contact → tag → trigger pre-booking email + WhatsApp; Booking → stop pre-booking sequence → redirect to confirmation page → start post-booking emails → notify sales rep for manual outreach; Response detected → tag engaged → notify sales rep; **Booking event → fire `Schedule` pixel event to Meta** |
| **Pixel/Conversion API** | `Lead` event on form submit; `Schedule` event on booking; Optional: Conversion API for sales-rep-confirmed-qualified signal |

---

## 10. What We Need from Emilio

Before we start building, we need the following:

### Must-Have (blocks build)
- [ ] **Training video file or URL** — the 15-18 min strategy video to embed on the landing page
- [ ] **Branding assets** — Logo (high-res), brand colors (hex codes), any brand fonts
- [ ] **GoHighLevel account created** — he signs up at $97/mo, we get access
- [ ] **WhatsApp Business number** — the existing Academia Ecom WhatsApp number
- [ ] **Calendar availability** — which days/times his sales reps take calls, timezone
- [ ] **Sales rep names** — who the prospect will be speaking with (for personalized messages)
- [ ] **Language preference** — Are all messages in Spanish? Or bilingual (Spanish primary, English fallback)?
- [ ] **Confirmation video from Emilio** (1-2 min) — short personal welcome for the confirmation page: "Congrats on booking, here's how to prepare" (we provide the script)
- [ ] **Top 5 questions his sales reps get on every call** — these become breakout videos

### Must-Have for breakout videos (Emilio records, we provide scripts)
- [ ] **Breakout Video 1:** "How much money do I need to start?" (1-2 min)
- [ ] **Breakout Video 2:** "What if I have no experience?" (1-2 min)
- [ ] **Breakout Video 3:** "How long until I see results?" (1-2 min)
- [ ] **Breakout Video 4:** "What makes Academia Ecom different?" (1-2 min)
- [ ] **Breakout Video 5:** "What happens on the call?" (1 min)
- [ ] **Sales rep intro video** — short selfie-style from each rep (30 sec)

### Nice-to-Have (improves quality)
- [ ] **Student testimonial videos** — 2-3 success stories for confirmation page + email sequence (name, before/after, quote)
- [ ] **Current ad creatives** — so we match the landing page look/feel to what the ad promised
- [ ] **Competitor funnel links** — he mentioned he'd share these; helps inform design choices
- [ ] **Current email templates** — his existing email drip, so we can improve rather than start from scratch
- [ ] **Headshot / video thumbnail** — for the landing page and email signature
- [ ] **Domain access** — if we're pointing academiaecom.com to the GHL-hosted funnel
- [ ] **Additional breakout videos** on topics from sales rep feedback (we'll identify after launch)

---

## 11. Delivery Milestones

| Phase | What | Timeline |
|-------|------|----------|
| **Phase 1** | GHL setup: account, pipeline, tags, calendar (with 2-3 day window), forms, pixel events | Day 1-2 |
| **Phase 2** | Lead capture page + Landing page (VSSL with chapters + calendar) | Day 2-4 |
| **Phase 3** | Confirmation page (research hub structure, breakout video embeds) | Day 4-5 |
| **Phase 4** | Pre-booking email funnel (5 emails written + configured) | Day 3-5 |
| **Phase 5** | Post-booking email sequence (6 research emails written + configured) | Day 5-6 |
| **Phase 6** | WhatsApp flows (non-booker + booked reminders + long-term) | Day 5-7 |
| **Phase 7** | Sales rep outreach protocol documented + trained | Day 6-7 |
| **Phase 8** | Connect traffic sources: ad forms → GHL, YouTube links updated, pixel verified | Day 7-8 |
| **Phase 9** | Test full flow end-to-end (form → landing → booking → confirmation → emails → WhatsApp → call) | Day 8-9 |
| **Go Live** | Switch over from ClickFunnels | Day 9-10 |

**Total: 10 days from receiving all assets (including breakout videos from Emilio)**

---

## 12. Show Rate Target

| Metric | Current | Target |
|--------|---------|--------|
| Show rate | ~40% (60% no-show) | **60-70%** |
| Pre-call touchpoints | 2-3 (manual WhatsApp morning-of) | **10-15** (confirmation page + 6 emails + 3 WhatsApp + sales rep selfie video + trust assets) |
| Prospect preparedness | Cold — most haven't watched full training | Warm — common questions answered, they know the rep's face, they've seen student results |

**How we get there:** Confirmation page breakout videos + aggressive post-booking email sequence + sales rep selfie video within hours + 2-3 day booking window for all of it to land.
