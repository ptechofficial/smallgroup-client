# SALES CALL SCRIPT — Filippo / SYNACT (Follow-Up Call)

**Date:** February 27, 2026
**Call Type:** Follow-up — present architecture, pricing, and deliverables
**First Call:** February 25, 2026
**Goal:** Walk Filippo through the Phase 1 system, confirm pricing, give him everything he needs to close his client

---

## PRE-CALL INTEL (What We Know From Call #1)

| What We Know | Why It Matters |
|---|---|
| **Filippo is the intermediary — not the end client** | We're selling TO Filippo so he can sell to his client. Keep it collaborative, not salesy. Give him the tools to pitch. |
| **End client is an Italian AI education content creator** | All content output is in Italian. The client has a School community and follower base. He's promoting "Agent Kit" — a B2B no-code AI agent business model. |
| **Client originally wanted 900 videos/month across 5 accounts** | Filippo already pushed back and agreed 60/month is the right starting point. This is Phase 1. |
| **Budget expectation: $6-8K setup** | Client's range. We're coming in at $5K setup + $1,300/mo retainer. Filippo needs room to mark up. |
| **Filippo had a previous project that fell through** | His last client ghosted him. He's motivated but also cautious about being taken seriously. Show reliability. |
| **Human-in-the-loop is non-negotiable** | Client reviews and approves scripts and videos before posting. Airtable-based approval workflow. |
| **Self-annealing / feedback loop is a priority** | Filippo specifically mentioned performance tracking to optimize future content. This is a key selling point. |

---

## PRE-CALL CHECKLIST

- [ ] Pitch deck open and ready to screen share
- [ ] Proposal document ready to send
- [ ] PRD reviewed — reference specific sections to show you read it thoroughly
- [ ] Know the tech stack preferences (Apify, ElevenLabs, Airtable, Google Drive, Blotato/Buffer)
- [ ] Quiet environment, camera on, good audio

---

## THE CALL STRUCTURE

```
STEP 1: SET THE FRAME (3 min)
    Collaborative, not salesy. "Here's what I built for you."
    |
    v
STEP 2: QUICK RECAP & CONFIRM (5 min)
    Confirm Phase 1 scope — 60 videos, 2 accounts, Italian
    |
    v
STEP 3: FIVE-PILLAR SYSTEM WALKTHROUGH (15 min)
    Pillar 1: Content Discovery & Scraping
    Pillar 2: AI Script Generation
    Pillar 3: Dynamic Video Production
    Pillar 4: Smart Distribution
    Pillar 5: Performance Analytics & Feedback Loop
    |
    v
STEP 4: PHASE 2 TEASE (3 min)
    Scale to 900 videos, 5 accounts
    |
    v
STEP 5: PRICING & TIMELINE (5 min)
    $5K setup + $1,300/mo → Tool costs separate → ROI frame
    |
    v
STEP 6: CLOSE & NEXT STEPS (5 min)
    "Take this to your client. Here's everything you need."
```

---

## STEP 1: SET THE FRAME (3 minutes)

**Goal:** Show you did the work. Position this as a collaborative session, not a sales pitch.

> "Filippo, good to see you again. So since our last call, I went through the entire PRD your client put together — the tech stack, the system flow, all of it. I also looked at the sample videos. I've mapped out the full architecture for Phase 1."
>
> "Here's what I want to do today: walk you through exactly what we'd build, how each piece works, the timeline, and the pricing — so you have everything you need to take this back to your client with a clear picture. Sound good?"

**Custom-Built Positioning (we haven't built this exact system before):**

> "I want to be upfront — I'm building this specifically around your client's workflow. This isn't some off-the-shelf content tool. Every piece of this pipeline — from how we scrape Italian-language content to how the approval flow works in Airtable — is designed for how his business actually operates. That's the difference."

---

## STEP 2: QUICK RECAP & CONFIRM (5 minutes)

**Goal:** Confirm scope. Make sure nothing changed since last call.

> "Let me make sure I have the scope right for Phase 1:
>
> - **60 videos per month** — 30 per account, one post per day
> - **2 accounts** — one Instagram, one TikTok
> - **All content in Italian**
> - **AI avatar videos** with subtitles and light B-roll
> - **Human-in-the-loop** — client approves scripts and videos before they go live
> - **Performance tracking** — the system learns what works and optimizes the next batch
>
> Did I miss anything? Has your client come back with answers on the three questions — same videos on both platforms or unique per platform?"

**Let Filippo respond. Adjust scope if needed.**

> "Perfect. So let me walk you through the system."

---

## STEP 3: FIVE-PILLAR SYSTEM WALKTHROUGH (15 minutes)

> "I've broken this into five parts. Each one is a module in the pipeline. Let me show you how they connect."

### PILLAR 1: "Content Discovery & Scraping"

**Problem:**
> "Your client's funnel is about the 'Agent Kit' — selling AI agents to local businesses. The content needs to speak to people tired of trading, dropshipping, and grinding hours. But you can't just guess what resonates. You need to know what's already working in the niche."

**Feature:**
> "We set up Apify to scrape TikTok and Instagram daily. It searches target keywords — 'make money online 2026', 'no-code business', 'sell AI to businesses', 'dropshipping alternatives' — and filters for above-average engagement. We're not scraping random content. We're finding the videos that are already going viral in the exact niche your client operates in.
>
> We extract the transcriptions, the hook structure — the first 3 to 5 seconds — and the engagement metrics. This becomes the raw material for everything else."

**Solution:**
> "Instead of guessing what content to create, every video starts from a proven viral blueprint. Your client's content is inspired by what's already winning."

---

### PILLAR 2: "AI Script Generation"

**Problem:**
> "Having viral references is only half the equation. The scripts need to be rewritten for the Agent Kit framework — in Italian — with the right hooks, the right marketing angles, and the right CTA driving to the Free Training."

**Feature:**
> "We feed the scraped transcriptions into an LLM — Claude or GPT-4o — with a custom prompt that knows the client's framework. It rewrites scripts using the four marketing angles from the PRD: attack old models, promise freedom, explain the hybrid model, and emphasize simplicity.
>
> Every script follows the structure: **Hook + Value Body + CTA to Free Training**. The LLM also generates the caption copy and hashtags — all in Italian. Every script lands in Airtable with an 'Approve Script' button. Nothing moves forward until the client clicks approve."

**Solution:**
> "60 unique, high-converting scripts per month. Each one based on proven viral content, adapted to the Agent Kit funnel, approved by the client before production."

---

### PILLAR 3: "Dynamic Video Production"

**Problem:**
> "Scripts are just text. Your client needs finished MP4 files — an AI avatar speaking the script in Italian, with subtitles and B-roll, ready to post."

**Feature:**
> "Once a script is approved, the pipeline triggers automatically. ElevenLabs generates the voice — energetic, optimized for Italian. That audio drives the AI avatar — synced lip movements, realistic delivery. Then we layer in B-roll: profit charts, drag-and-drop interfaces, local businesses — pulled from Pexels or a client-provided archive.
>
> The finished video is assembled — avatar, audio, B-roll, subtitles — and saved to Google Drive. Only the link goes back into Airtable, so we don't bloat the database. The client gets another approval gate: 'Approve Video' before it's queued for posting."

**Solution:**
> "60 finished, publish-ready MP4 files per month. Two human approval gates — one at script, one at video. Nothing posts without the client's sign-off."

---

### PILLAR 4: "Smart Distribution"

**Problem:**
> "Having great videos means nothing if they don't reach people. Posting needs to be consistent, well-timed, and simulate natural behavior to avoid platform flags."

**Feature:**
> "We use Blotato or Buffer via API to schedule and stagger posts across both accounts. Posts go out at varying times — not the same time every day. The rotation simulates human posting behavior.
>
> Each post includes optimized captions and hashtags generated in Pillar 2. The CTA drives to the link in bio or prompts a keyword comment for ManyChat DM automation — which the client sets up on his side."

**Solution:**
> "Consistent daily posting on both Instagram and TikTok. Automated, staggered, optimized for reach. The client's only job is having ManyChat and the link in bio ready."

---

### PILLAR 5: "Performance Analytics & Feedback Loop"

**This is the one Filippo specifically asked about.**

> "Filippo, you mentioned this on our last call — the self-annealing loop. This is what makes this system get smarter over time."

**Feature:**
> "We track metrics at 48-hour and 7-day intervals. Views, likes, comments, shares, link clicks — everything. The system identifies which marketing angles are converting best. Is 'attack dropshipping' getting more engagement than 'no-code simplicity'? Is the money hook outperforming the freedom hook?
>
> That data feeds back into the LLM. The next batch of scripts is weighted toward what's working. Over time, the system naturally converges on the highest-performing content style for your client's audience."

**Solution:**
> "The system doesn't just produce content — it learns. Month 2 outperforms Month 1. Month 3 outperforms Month 2. It's not static automation — it's a feedback loop that compounds."

---

## STEP 4: PHASE 2 TEASE (3 minutes)

> "Filippo, everything I just walked you through is Phase 1 — 60 videos, 2 accounts. Once this is running and we've dialed in the content quality, here's what Phase 2 looks like.
>
> We scale to 5 accounts across Instagram and TikTok. Volume goes up to 300, 600, even 900 videos per month. The pipeline is the same — we just turn up the dial on scraping volume, script generation, and rendering capacity.
>
> The R&D from Phase 1 is what makes Phase 2 possible. By then we know which hooks work, which marketing angles convert, what B-roll style gets retention. Phase 1 is the proving ground. Phase 2 is the scale play.
>
> But that's down the road. Phase 1 first. Prove the machine, then scale it."

---

## STEP 5: PRICING & TIMELINE (5 minutes)

### Timeline First:

> "Let me walk you through the timeline.
>
> **Week 1-2:** Infrastructure setup — Apify scrapers configured, LLM prompts tuned for Italian and the Agent Kit framework, Airtable base built with approval workflows, Google Drive structure set up, social scheduling connected.
>
> **Week 3:** First batch of content produced. 10-15 test videos created. Client reviews quality, gives feedback. We iterate on prompts, avatar style, B-roll approach.
>
> **Week 4:** System goes live. First videos posted. Performance tracking active.
>
> **Month 2 onward:** Full production — 60 videos/month. Weekly optimization based on analytics. Continuous prompt refinement."

### Value Stack:

> "Here's everything included in what we build:
>
> - Full scraping pipeline configured for the niche keywords
> - Custom LLM prompt engineering for Italian-language Agent Kit scripts
> - Avatar + TTS + B-roll video production pipeline
> - Airtable workspace with human-in-the-loop approval flow
> - Google Drive media storage architecture
> - Social scheduling setup (Blotato/Buffer)
> - Performance analytics dashboard and feedback loop
> - Weekly optimization and prompt tuning"

### Tool Costs (Separate — Client Owns These):

> "The tools are subscribed to by the client — he owns all of them:
>
> | Tool | Estimated Cost |
> |------|---------------|
> | Apify (scraping) | ~$49/mo |
> | LLM API (OpenAI/Claude) | ~$50-100/mo |
> | ElevenLabs (voice + avatar) | ~$100-150/mo |
> | Video assembly (Creatomate or similar) | ~$50-80/mo |
> | Social scheduling (Blotato/Buffer) | ~$30-50/mo |
> | Airtable | ~$20/mo |
> | Google Drive storage | ~$12/mo |
> | **Total** | **~$300-450/mo** |
>
> These are estimates. We'll help select the most cost-effective stack for 60 videos."

### Pricing:

> "For Small Group's work — here's the investment:
>
> **Setup fee: $5,000** — covers the full system build. Infrastructure, pipeline configuration, prompt engineering, first batch of test content, and all the iteration needed to get quality right.
>
> **Monthly retainer: $1,300/month** — covers ongoing production, optimization, performance analysis, prompt tuning, and system maintenance. 60 videos per month delivered.
>
> Month 1 is the setup fee. Retainer starts Month 2 when production is at full volume."

### The ROI Frame:

> "Think about it this way — 60 videos a month, if even 5% of them gain traction and drive leads to the funnel, that's 3 videos per month bringing in organic traffic. At the Agent Kit price point — setup fee plus monthly retainer from local businesses — one closed deal from those leads pays for months of this system.
>
> Compare that to paying a video editor and a social media manager to produce 60 videos manually. You're looking at $3,000-5,000/month minimum, and they can't optimize based on data like this system does."

---

## STEP 6: CLOSE & NEXT STEPS (5 minutes)

**This close is different — Filippo isn't the end buyer. Give him what he needs to close his client.**

> "Filippo, I'm going to send you three things after this call:
>
> 1. **The pitch deck** — you can screen share this with your client or send it directly. It walks through the entire system visually.
> 2. **The proposal** — clean breakdown of deliverables, pricing, timeline, and terms.
> 3. **The architecture summary** — the technical flow so your client can see exactly how the pipeline works.
>
> You know your client better than I do. Take whatever's useful, mark it up however you need to, and present it. If he has technical questions, I'm happy to jump on a call with both of you."

### Get Alignment:

> "Based on what I showed you — does this system match what your client described in the PRD? Is there anything you'd want me to adjust before you take it to him?"

### Next Steps:

> "What's the timeline on your end? When are you planning to present this to your client? I want to make sure everything you need is ready before that conversation."

---

## OBJECTION HANDLING

### "The setup fee is higher than what we discussed on the call"

> "On our first call I estimated $4-4.5K before I'd reviewed the full PRD and sample videos. After going through the technical requirements — the Italian-language optimization, the dual-platform production, the Airtable approval workflow, the performance feedback loop — $5K reflects the actual scope. It's a complex system with five integrated modules."

### "Can we reduce the monthly retainer?"

> "The $1,300 covers ongoing production of 60 videos, performance analysis, prompt optimization, and system maintenance. If we reduce that, we'd need to reduce output — maybe 30 videos instead of 60. But I'd recommend starting at 60 and adjusting after Month 2 based on results."

### "My client might want to start with fewer videos"

> "We can absolutely scope Phase 1 at 30 videos instead of 60. That would bring the retainer down to around $800-900/month. But the setup fee stays the same — the infrastructure build is the same regardless of volume. I'd recommend 60 because the analytics feedback loop gets better data with more volume."

### "Can we just do the setup and no retainer?"

> "Yes — that's an option. $5,000 one-time build. We build the entire system, train the client on how to operate it, and include 2 weeks of post-handoff support. After that, he runs it himself. The tradeoff is he'll need someone technical managing the system — prompt tuning, monitoring scrapers, handling platform changes, reviewing analytics. About 8-10 hours per week."

### "My client wants to see proof this works"

> "I'll be straight with you — we haven't built this exact system before for a content farm at this scale. What I can show is the infrastructure we've built for other clients: content automation pipelines, scraping systems, AI-generated content at volume. But honestly, the strength here is that this is built specifically for your client's workflow — his framework, his audience, his language. Generic tools can't do that."

### "What if the content quality isn't good enough?"

> "That's exactly why we have the human-in-the-loop. Nothing posts without approval. The first 2 weeks are entirely R&D — we produce test batches, the client reviews, we iterate. The system doesn't go live until quality meets the standard. And the monthly retainer includes continuous optimization — if something isn't working, we adjust."

---

## POST-CALL ACTIONS

**After the call:**
1. Send pitch deck, proposal, and architecture summary to Filippo via WhatsApp
2. Ask Filippo for a timeline on when he'll present to his client
3. Offer to join a 3-way call if the client has technical questions

**If Filippo presents and client says yes:**
1. Send agreement to Filippo
2. Request client's Airtable, Google Drive, and social account access
3. Begin infrastructure setup Week 1

**If client needs changes:**
1. Adjust scope/pricing based on feedback
2. Turn around revised proposal within 24 hours

**If client goes silent:**
1. Follow up with Filippo at Day 3 and Day 7
2. Offer a quick 15-min call with the client to answer questions directly
