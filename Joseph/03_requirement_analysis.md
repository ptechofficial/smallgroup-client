# Joseph Cyriac - Lead Generation System Design

> **Date:** February 13, 2026
> **Call Date:** February 12, 2026
> **Client:** Joseph Cyriac
> **Business:** Electrical Staffing (Data Center Construction)
> **Geography:** United States & related areas
> **End Goal:** Maximum volume of construction company leads (PMs, Directors, Field Leads) into his pipeline

---

## 1. THE REAL OPPORTUNITY

Joseph is doing outreach manually every night and getting results. His pitch converts. The problem isn't his message - it's his reach. He's limited to however many LinkedIn searches and messages he can do before bed.

**What Joseph told us he wants:** Automate LinkedIn search + messages + follow-ups.

**What Joseph actually needs:** A lead generation machine that puts 1,000+ construction decision-makers into his pipeline every month, with an automated follow-up funnel that nurtures them until they either book a meeting or say no.

**Our job is not to automate what he's doing. Our job is to 10x his pipeline.**

---

## 2. PHASED APPROACH - OVERVIEW

| | Phase 1 | Phase 2 |
|---|---|---|
| **Lead Sourcing** | LinkedIn Sales Navigator / Recruiter Pro only | LinkedIn + Job boards, Apollo, industry directories, community platforms |
| **Outreach Channels** | LinkedIn Connect, InMail, Email | All Phase 1 channels + platform-specific outreach where decision-makers hang out |
| **Services Pitched** | Electricians (data center construction) | Electricians, Plumbers, and other skilled trades |
| **ICP** | Data center construction decision-makers | Expanded to solar, commercial, industrial, utilities |
| **Geography** | USA & related areas | USA & related areas |

---

## 3. THE END GOAL

| Metric | Current (Manual) | Phase 1 Target | Phase 2 Target |
|--------|-----------------|----------------|----------------|
| Leads sourced/month | ~50-100 | 500-1,000 | 2,000-5,000 |
| Outreach sent/month | ~50-100 | 1,500-2,500 | 5,000-10,000 |
| Responses/month | ~15-30 | 100-200 | 300-500 |
| Meetings booked/month | ~3-5 | 15-30 | 40-80 |
| Contracts closed/month | ~1 | 3-6 | 8-15 |

---

## 4. ICP - WHO ARE WE GOING AFTER

### Phase 1 ICP (Data Center Construction - Electricians):

| Field | Value |
|-------|-------|
| **Industry** | Data center construction & operations |
| **Company types** | EPC contractors, general contractors, data center operators (AWS, Google, Meta subcontractors) |
| **Titles** | Project Manager, Director of Construction, Director of Operations, VP Construction, Field Manager, Site Manager |
| **Services** | Licensed electricians (contract / contract-to-hire) |
| **Geography** | United States & related areas |

### Phase 2 ICP (Expanded Verticals + Trades):

| Vertical | Why | Titles | Trades to Pitch |
|----------|-----|--------|-----------------|
| **Solar / Renewable Energy** | Same skillset, booming market | PM, Construction Manager, Site Superintendent | Electricians, Plumbers |
| **Commercial Construction** | Broader pool, similar contract model | Director of Operations, PM, Field Manager | Electricians, Plumbers, Other trades |
| **Industrial / Manufacturing** | Facilities need skilled labor | Facilities Manager, Plant Manager, Maintenance Director | Electricians, Plumbers, Other trades |
| **Utilities / Power** | Substation, grid work | PM, Engineering Manager, Construction Supervisor | Electricians |

---

# PHASE 1: LINKEDIN-CENTRIC LEAD MACHINE

Phase 1 is focused and deliberate: source leads exclusively from LinkedIn, reach them through LinkedIn + Email, and prove the system works before expanding.

---

## 5. PHASE 1 - SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LEAD SOURCING (LinkedIn Only)                    │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  LinkedIn Sales Navigator / Recruiter Pro                    │  │
│   │                                                              │  │
│   │  - ICP search: title + company + industry + geography        │  │
│   │  - Saved searches for recurring lead pulls                   │  │
│   │  - Extracted via Phantombuster                                │  │
│   │  - Volume: 500-1,000 new leads/week                          │  │
│   └──────────────────────────┬──────────────────────────────────┘  │
│                              │                                      │
└──────────────────────────────┼──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     ENRICHMENT & VERIFICATION                       │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  CLAY.COM (Enrichment Hub)                                   │  │
│   │                                                              │  │
│   │  Waterfall email enrichment:                                 │  │
│   │  Apollo → Prospeo → Hunter → Dropcontact                    │  │
│   │  (first match wins = 70-85% email find rate)                │  │
│   │                                                              │  │
│   │  + Email verification (MillionVerifier)                      │  │
│   │  + AI first-line personalization                             │  │
│   └──────────────────────────┬──────────────────────────────────┘  │
│                              │                                      │
└──────────────────────────────┼──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     N8N ORCHESTRATION LAYER                         │
│                                                                     │
│   Check HubSpot for duplicates                                      │
│   Score leads: title match + company fit                            │
│   Route to outreach channels:                                       │
│     HIGH SCORE ──────► LinkedIn Connect + InMail + Email            │
│     MEDIUM SCORE ────► LinkedIn Connect + Email (no InMail)         │
│     LOWER SCORE ─────► Email only                                   │
│                                                                     │
└────────────┬──────────────────┬──────────────────┬──────────────────┘
             │                  │                  │
             ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────────────┐
│  LINKEDIN        │ │  EMAIL OUTREACH  │ │  HUBSPOT CRM             │
│  OUTREACH        │ │                  │ │                          │
│                  │ │  Instantly.ai    │ │  - All leads tracked     │
│  Phantombuster   │ │  or Smartlead    │ │  - Pipeline stages       │
│  or Heyreach     │ │                  │ │  - Response handling     │
│                  │ │  3 domains       │ │  - Referral tracking     │
│  - Connect req   │ │  x 3 accounts   │ │  - Meeting scheduler     │
│  - InMail        │ │  = 9 email       │ │                          │
│  - DM follow-up  │ │  accounts        │ │  Notifications:          │
│                  │ │                  │ │  WhatsApp/SMS when       │
│  100/week        │ │  360-450         │ │  someone responds        │
│  connects        │ │  emails/day      │ │                          │
└──────────────────┘ └──────────────────┘ └──────────────────────────┘
```

---

## 6. PHASE 1 - LEAD SOURCING (LinkedIn Only)

### LinkedIn Sales Navigator / Recruiter Pro

**What:** Search for ICP titles at construction companies using LinkedIn's advanced filters
**How:** Phantombuster scrapes Sales Nav/Recruiter search results weekly
**Filters:**
- Titles: Project Manager, Director of Construction, Director of Operations, VP Construction, Field Manager, Site Manager
- Industries: Construction, Data Center, Electrical
- Company size: 50-10,000+
- Geography: United States

**Volume:** 500-1,000 new leads/week
**Quality:** High (title + company + geography match)

### Sales Navigator vs Recruiter Pro

| Feature | Sales Navigator (~$100/mo) | Recruiter Pro (~$160/mo) |
|---------|---------------------------|--------------------------|
| Search filters | Strong for ICP targeting | Strongest - more granular |
| InMail credits | 50/month | 100-150/month |
| Lead lists | Yes | Yes |
| CRM integration | HubSpot sync | HubSpot sync |
| Best for | Finding decision-makers by title + company | More InMail volume, deeper search |
| **Recommendation** | **Start here** | **Upgrade if InMail converts well** |

---

## 7. PHASE 1 - OUTREACH CHANNELS

### Channel 1: LinkedIn Connection Requests

**Volume:** ~100 connections/week (20/day, 5 days/week)
**Tool:** Phantombuster or Heyreach

```
CONNECTION REQUEST NOTE (300 char limit):
──────────────────────────────────────────
Hi {{first_name}}, I work with data center contractors who need
licensed electricians on short notice. We provide crews on a
contract basis - typically on site within 2 weeks. Would love
to connect in case it's ever useful.
```

**After they accept:**

```
DM (Day 2 after accept):
──────────────────────────
Thanks for connecting, {{first_name}}!

Quick question - does {{company}} ever use contract electricians
on your data center/construction projects?

We provide licensed crews and can usually have people on site
within 1-2 weeks. Happy to share more if relevant.
```

```
DM FOLLOW-UP (Day 7 after accept, if no reply):
────────────────────────────────────────────────
Hi {{first_name}}, just circling back. If you ever need to
scale your electrical crew quickly for a project, we might
be a good fit. No pressure - happy to chat whenever timing
makes sense.
```

### Channel 2: LinkedIn InMail

**Volume:** 50-150/month (depending on Sales Nav vs Recruiter Pro)
**Best used for:** High-value leads who don't accept connection requests

```
INMAIL:
────────
Subject: Electricians for {{company}}'s projects

Hi {{first_name}},

{{ai_personalized_line}}

We provide licensed electricians for data center and commercial
construction on a contract basis - typically can have a crew on
site within 2 weeks.

If {{company}} ever needs to scale the electrical side of a
project quickly, I'd love to share how we help teams like yours.

Worth a quick chat?

Joe
```

**InMail strategy:**
- Use InMails for leads who haven't accepted connection requests after 7 days
- Prioritize InMail for VP/Director-level titles (higher value, lower connect acceptance)
- Track InMail response rate separately - it's typically higher than cold email (10-25%)

### Channel 3: Cold Email (Multi-Account)

**Volume:** 360-450 emails/day across 9 accounts (ramping over 5 weeks)

#### Multi-Email Infrastructure

Single email account = 50 cold emails/day max before spam risk. Joseph needs 200-500+ emails/day. Solution: multiple domains, multiple accounts per domain, all warmed up and sending in rotation.

```
PRIMARY DOMAIN (Joseph's real business):
  josephstaffing.com (or whatever his domain is)
  - This is for REPLIES ONLY. Never cold email from the main domain.

SENDING DOMAINS (lookalike domains for cold outreach):
  Domain 1: josephstaffingsolutions.com
    ├── joe@josephstaffingsolutions.com
    ├── joseph@josephstaffingsolutions.com
    └── jcyriac@josephstaffingsolutions.com

  Domain 2: josephelectricalstaffing.com
    ├── joe@josephelectricalstaffing.com
    ├── joseph@josephelectricalstaffing.com
    └── jcyriac@josephelectricalstaffing.com

  Domain 3: josephlaborsolutions.com
    ├── joe@josephlaborsolutions.com
    ├── joseph@josephlaborsolutions.com
    └── jcyriac@josephlaborsolutions.com
```

#### Email Infrastructure Numbers (Phase 1):

| Domains | Accounts/Domain | Total Accounts | Emails/Account/Day | Total Emails/Day | Total/Month |
|---------|-----------------|----------------|--------------------|--------------------|-------------|
| 3 | 3 | 9 | 40-50 | 360-450 | 8,000-10,000 |

#### Domain Setup Checklist (per domain):
- [ ] Register domain (~$10-12/year)
- [ ] Set up Google Workspace ($6/user/month) OR Zoho Mail ($1/user/month)
- [ ] Configure SPF record
- [ ] Configure DKIM record
- [ ] Configure DMARC record
- [ ] Add to Instantly.ai for warm-up (minimum 14 days before sending)
- [ ] Set up forwarding so all replies go to Joseph's main inbox

#### Warm-up Timeline:
```
Week 1-2:  Warm-up only (Instantly handles this automatically)
Week 3:    Start sending 10-15 emails/account/day
Week 4:    Ramp to 25-30 emails/account/day
Week 5+:   Full volume 40-50 emails/account/day
```

---

## 8. PHASE 1 - EMAIL SEQUENCES (7-Touch Funnel)

Joseph's current approach is 1 message + maybe 1 follow-up. That leaves massive value on the table. Industry data shows most conversions happen on touches 3-7.

### Sequence A: Direct Outreach (For ICP-matched leads from LinkedIn)

```
DAY 1: THE OPENER (Direct value prop)
─────────────────────────────────────
Subject: Electricians for {{company}}'s projects
─────────────────────────────────────
Hi {{first_name}},

{{ai_personalized_line}}

We provide licensed electricians for data center and commercial construction
on a contract or contract-to-hire basis - typically can have a crew on
site within 2 weeks.

Worth a quick chat?

Joe
```

```
DAY 3: THE FOLLOW-UP (Short bump)
─────────────────────────────────
Subject: Re: Electricians for {{company}}'s projects
─────────────────────────────────
Hi {{first_name}},

Just bumping this up. If you're ever short-staffed on the electrical
side, we might be able to help.

Happy to chat for 10 min if useful.

Joe
```

```
DAY 7: THE VALUE ADD (Social proof / specificity)
──────────────────────────────────────────────────
Subject: Re: Electricians for {{company}}'s projects
──────────────────────────────────────────────────
Hi {{first_name}},

Wanted to share a quick example - we recently helped a data center
contractor in Texas staff 12 journeyman electricians in under 10 days
for a commissioning project.

If your team ever needs to scale quickly for upcoming projects, we
handle everything from sourcing to compliance.

Open to a quick call this week?

Joe
```

```
DAY 12: THE DIFFERENT ANGLE (Pain point)
────────────────────────────────────────
Subject: Hiring electricians is brutal right now
────────────────────────────────────────
Hi {{first_name}},

Not sure if you're seeing this, but the electrician shortage is hitting
data center projects hard. We work with teams who can't wait 6-8 weeks
for traditional hiring to fill roles.

Contract staffing gets licensed electricians on site in 1-2 weeks without
the overhead of full-time hires.

If this resonates, happy to share more.

Joe
```

```
DAY 18: THE REFERRAL ASK (If they're not the right person)
───────────────────────────────────────────────────────────
Subject: Quick question, {{first_name}}
───────────────────────────────────────────────────────────
Hi {{first_name}},

I've reached out a few times about electrical staffing for {{company}}'s
construction projects. I realize you might not be the right person for this.

Could you point me to whoever handles contractor/staffing decisions on the
construction side? I'd really appreciate the intro.

Thanks,
Joe
```

```
DAY 24: THE CASE STUDY (Proof)
──────────────────────────────
Subject: How [Client] staffed 15 electricians in 2 weeks
──────────────────────────────
Hi {{first_name}},

I know I've been persistent - here's why:

One of our clients was behind on a data center build in Virginia.
They needed 15 licensed electricians fast. We had a full crew
deployed in 12 days. Project stayed on schedule.

If {{company}} ever faces something similar, we're a phone call away.

Joe
```

```
DAY 30: THE BREAKUP (Creates urgency)
─────────────────────────────────────
Subject: Closing your file, {{first_name}}
─────────────────────────────────────
Hi {{first_name}},

I'll assume the timing isn't right and this will be my last email.

If things change down the road and you need electrical labor
for construction projects, feel free to reach back out.

Wishing you the best,
Joe

P.S. Happy to reconnect anytime - just reply to this email.
```

### Why 7 touches works:

| Touch | Cumulative Response Rate | What happens |
|-------|--------------------------|--------------|
| Touch 1 | 5-8% | Most people ignore first cold email |
| Touch 2 | 12-15% | Some respond just because you followed up |
| Touch 3 | 18-22% | You're now familiar, they consider it |
| Touch 4 | 22-26% | Different angle catches attention |
| Touch 5 | 25-30% | Referral ask works - people help even if not interested |
| Touch 6 | 27-32% | Case study builds credibility |
| Touch 7 | 28-35% | Breakup email triggers "wait, maybe I should respond" |

---

## 9. PHASE 1 - CROSS-CHANNEL COORDINATION

### High-Score Leads (LinkedIn Connect + InMail + Email):

```
Day 0:  [LinkedIn] Send connection request with note
Day 1:  [Email]    Sequence A, Touch 1 (opener)
Day 3:  [Email]    Sequence A, Touch 2 (follow-up)
Day 5:  [LinkedIn] If connected -> Send DM
Day 7:  [LinkedIn] If NOT connected -> Send InMail
Day 7:  [Email]    Sequence A, Touch 3 (value add)
Day 12: [LinkedIn] Follow-up DM (if connected and no DM reply)
Day 12: [Email]    Sequence A, Touch 4 (different angle)
Day 18: [Email]    Sequence A, Touch 5 (referral ask)
Day 24: [Email]    Sequence A, Touch 6 (case study)
Day 30: [Email]    Sequence A, Touch 7 (breakup)
```

**Total touches across 30 days: 11 (4 LinkedIn + 7 Email)**

### Medium-Score Leads (LinkedIn Connect + Email, no InMail):

```
Day 0:  [LinkedIn] Send connection request with note
Day 2:  [Email]    Sequence A, Touch 1 (opener)
Day 5:  [Email]    Sequence A, Touch 2 (follow-up)
Day 7:  [LinkedIn] If connected -> Send DM
Day 10: [Email]    Sequence A, Touch 3 (value add)
Day 15: [Email]    Sequence A, Touch 4 (different angle)
Day 21: [Email]    Sequence A, Touch 5 (referral ask)
Day 27: [Email]    Sequence A, Touch 6 (case study)
Day 33: [Email]    Sequence A, Touch 7 (breakup)
```

### Lower-Score Leads (Email only):

```
Day 1:  [Email]    Sequence A, Touch 1 (opener)
Day 4:  [Email]    Sequence A, Touch 2 (follow-up)
Day 9:  [Email]    Sequence A, Touch 3 (value add)
Day 14: [Email]    Sequence A, Touch 4 (different angle)
Day 20: [Email]    Sequence A, Touch 5 (referral ask)
Day 27: [Email]    Sequence A, Touch 6 (case study)
Day 33: [Email]    Sequence A, Touch 7 (breakup)
```

### Rules:
1. **Never send LinkedIn + Email on the same day** (feels like spam)
2. **Stop ALL sequences the moment someone responds** (any channel)
3. **If they connect on LinkedIn but don't respond to DM, keep email sequence running**
4. **If they respond to email, pause LinkedIn automation for that person**
5. **Use InMail only for high-score leads who haven't accepted connection requests**

---

## 10. RESPONSE HANDLING & CRM PIPELINE

### HubSpot Pipeline Stages:

```
NEW LEAD ──> CONTACTED ──> RESPONDED ──┬──> MEETING BOOKED ──> CONTRACT ──> WON
                                       │
                                       ├──> REFERRAL (new lead created)
                                       │
                                       ├──> NOT NOW (30-day follow-up)
                                       │
                                       └──> NOT INTERESTED (closed-lost)

CONTACTED (no response after 33 days) ──> COLD (long-term nurture)
```

### Response Classification (N8N + AI):

| Response Type | Example | Action |
|---------------|---------|--------|
| **Interested** | "Yes, let's chat" / "Send me more info" | Alert Joseph immediately via WhatsApp, stop all sequences |
| **Referral** | "Wrong person, talk to X" / "Contact our HR" | Create new lead for referred person, alert Joseph, stop sequence |
| **Not now** | "Bad timing" / "Maybe next quarter" | Move to 30-day follow-up, stop current sequence |
| **Not interested** | "Not interested" / "Remove me" | Close as lost, stop everything, respect opt-out |
| **Auto-reply / OOO** | "I'm out of office until..." | Pause sequence, resume after their return date |
| **Question** | "What's your rate?" / "What areas do you cover?" | Alert Joseph, he responds personally |

### Referral Workflow:

```
[Response detected: "Talk to Sarah in procurement"]
    |
    v
[N8N extracts name + role + company from the response]
    |
    v
[Clay: Find Sarah's email and LinkedIn]
    |
    v
[Create new lead in HubSpot]
    - Tagged: "Referral from [Original Lead Name]"
    - Source: "Referral"
    - Priority: HIGH
    |
    v
[Alert Joseph via WhatsApp]
    "Referral received! [Original Lead] says to contact
     Sarah Johnson (Procurement, ABC Construction).
     Email: sarah@abc.com | LinkedIn: [url]

     Recommend: Call Sarah directly, mention [Original Lead's] name."
    |
    v
[Joseph calls Sarah] (Manual - this is where the deal closes)
```

---

## 11. PHASE 1 - TOOL STACK

| Tool | Purpose | Cost/Month | Notes |
|------|---------|------------|-------|
| **LinkedIn Sales Navigator** | ICP search + filtering + InMail | ~$100 | Core lead sourcing. Upgrade to Recruiter Pro (~$160) if InMail converts well |
| **Phantombuster (Starter)** | Scrape Sales Nav results + LinkedIn connect automation | ~$69 | Extracts leads at scale, sends connection requests |
| **Clay (Starter)** | Waterfall enrichment + AI personalization | ~$149 | Tries Apollo -> Prospeo -> Hunter -> Dropcontact to find emails |
| **Instantly.ai (Growth)** | Multi-account cold email sending + warm-up | ~$30 | Handles 9 email accounts, auto warm-up, sequences |
| **Google Workspace** | Email accounts (3 domains x 3 accounts) | ~$54 (9 x $6) | Or Zoho Mail at $1/user for budget option |
| **3 sending domains** | Cold email infrastructure | ~$3/month ($36/year) | Lookalike domains |
| **MillionVerifier** | Email verification before sending | ~$30 (pay-as-you-go) | Verify emails from Clay, avoid bounces |
| **HubSpot (Free CRM)** | Pipeline tracking + response management | $0 | Joseph already has it |
| **N8N (Self-hosted)** | Orchestration - ties everything together | ~$20 | $5 VPS + setup |

**Phase 1 Total: ~$455-505/month**

---

## 12. PHASE 1 - REALISTIC NUMBERS

| Metric | LinkedIn | Email | Combined |
|--------|----------|-------|----------|
| Leads sourced | 400/month | 2,000/month (from same LinkedIn-sourced list, enriched) | 2,400/month |
| Outreach sent | 400 connects + 50-150 InMails/month | 1,500-2,000/month (ramping up) | ~2,000-2,500/month |
| Open rate | N/A | 45-55% | - |
| Response rate | 15-25% (from DMs) + 10-25% (InMail) | 5-10% (7-touch sequence) | - |
| Total responses | 40-70 | 100-200 | 140-270 |
| Meetings booked | 8-15 | 10-20 | 18-35 |
| Contracts (20% close) | - | - | 4-7 |

---

## 13. PHASE 1 - IMPLEMENTATION TIMELINE

### Week 1: Infrastructure Setup

| Task | Details |
|------|---------|
| Buy 3 sending domains | josephstaffingsolutions.com, josephelectricalstaffing.com, josephlaborsolutions.com |
| Set up 9 email accounts | 3 per domain on Google Workspace or Zoho |
| Configure SPF/DKIM/DMARC | For all 3 domains |
| Connect all accounts to Instantly.ai | Start warm-up immediately (runs for 14 days) |
| Set up LinkedIn Sales Navigator (or Recruiter Pro) | Joseph buys it |
| Set up Phantombuster | Connect to Sales Navigator |
| Set up Clay account | Connect enrichment providers |
| Set up N8N | Self-host on VPS or use cloud |
| Configure HubSpot pipeline | Create stages, custom fields, deal pipeline |

### Week 2: Content & Workflows

| Task | Details |
|------|---------|
| Write email sequence | Sequence A (7 touches) |
| Write LinkedIn messages | Connection note, DM, follow-up DM, InMail template |
| Set up N8N: Lead sourcing flow | Sales Nav -> Phantombuster -> Clay (enrich) -> Dedup -> HubSpot |
| Set up N8N: Outreach routing | Score leads -> Route to LinkedIn/InMail/Email based on score |
| Set up N8N: Response handler | Monitor inboxes -> Classify -> Update HubSpot -> Alert Joseph |
| Set up N8N: Referral handler | Extract referral info -> Clay enrich -> New lead -> Alert Joseph |
| Build first lead list | 500-1,000 leads from Sales Navigator |

### Week 3: Start LinkedIn + Begin Email Ramp

| Task | Details |
|------|---------|
| Start LinkedIn outreach | 20 connections/day from Joseph's account |
| Start InMail outreach | Target high-value leads |
| Load leads into Instantly | Start sending 10-15/account/day (domains now 2 weeks old) |
| Monitor responses daily | Check HubSpot for new responses |

### Week 4: Full Launch

| Task | Details |
|------|---------|
| Ramp email to 25-30/account/day | 225-270 emails/day across 9 accounts |
| LinkedIn at full volume | 100 connections/week + InMail |
| Weekly reporting setup | Google Sheets dashboard with key metrics |
| First optimization review | Which subject lines work? Which sequence touch gets most replies? InMail vs connect acceptance rate? |

---

# PHASE 2: DOMINATE EVERY CHANNEL THEY'RE ON

Phase 1 proved the system works on LinkedIn. Phase 2 is about one thing: **your competitors are only on LinkedIn. We're going to be everywhere your buyers are — before they even know they need you.**

Construction decision-makers don't just live on LinkedIn. They're posting jobs on niche boards, bidding on projects, browsing trade directories, talking in Reddit threads, attending conferences, and scrolling Facebook groups. Phase 2 puts Joseph in front of them on every single one of these surfaces.

**Phase 2 also expands services:** not just electricians anymore — plumbers and other skilled trades too.

---

## 14. PHASE 2 - THE FULL PLATFORM MAP

We've identified **7 categories** of platforms where construction PMs, Directors, and VPs actively spend time. Each one is a lead source we can scrape, monitor, or engage on.

### CATEGORY 1: Job Boards (Highest Intent Leads)

These companies are literally advertising that they need what Joseph sells. A company posting "Hiring 5 electricians for data center project" is the warmest possible lead.

| Platform | What It Is | Who's There | Scrapable? | Lead Volume |
|----------|------------|-------------|------------|-------------|
| **Indeed** | Largest US job board | Every construction company hiring trades | Yes - Apify scraper | 500-2,000 job posts/month for electricians + plumbers |
| **LinkedIn Jobs** | Professional job board | Same companies, often cross-posted from Indeed | Yes - Apify scraper | 300-1,000 job posts/month |
| **Trade Hounds** | App-based network for contractors and skilled trades. Contractors post jobs, review profiles with photos/videos | Field managers, contractors actively hiring trades (~100k+ users) | Public job listings, app data accessible via profiles | 100-400 contacts/month |
| **iHireConstruction** | Niche construction/skilled trades job board with resume database | PMs posting for on-site roles, ops directors | Employer access via subscription, resume database | Thousands of listings, focused audience |
| **ConstructionJobs** | Dedicated construction worker site with resume database | GCs doing targeted hiring for trades | Premium employer tools, no public directory | Highly defined trades hiring audience |
| **Roadtechs.com** | Job board for traveling contractors including construction | Utilities/power project managers, traveling crew leads | Public job postings, job alert tools | Niche but relevant for utilities/power vertical |

**How we use them:** Apify scrapes all these boards daily for keywords like "electrician," "plumber," "skilled trades" + "data center," "construction," "commissioning." For each company found, Clay/Apollo finds the PM/Director contact -> send intent-based Sequence B.

**The pitch that writes itself:**
> "I saw you're hiring electricians for your data center project. We can provide 5-10 licensed electricians within 2 weeks on a contract basis - faster than a traditional hiring process."

---

### CATEGORY 2: Industry Directories & Databases (Targeted Company Lists)

These are curated lists of verified construction companies. Instead of searching blindly, we scrape the directories and find the decision-makers inside each company.

| Directory | What It Is | Who's Listed | Scrapable? | Lead Volume |
|-----------|------------|-------------|------------|-------------|
| **ENR Top 400/500** | Engineering News-Record annual ranking of top contractors by revenue. Covers data centers, industrial, solar | Largest firms in the US — VPs, Directors, PMs at companies doing $100M+ in revenue | Public lists online, downloadable PDFs, no API | 400-500 companies -> 2,000-5,000 contacts (one-time, refreshed annually) |
| **ABC Member Directories** | Associated Builders and Contractors — chapter-by-chapter member lists. Merit-shop contractors including renewables | ~600+ member firms per chapter, covering commercial, industrial, data center contractors | Online searchable directories per chapter | Hundreds of chapters -> thousands of companies nationwide |
| **ConWize Directory** | US construction contractors database searchable by trade and location. Self-updated by firms | Builders, EPC firms, suppliers across commercial and industrial | Public searchable directory | Broad coverage of active US construction pros |
| **AGC Member Directory** | Associated General Contractors of America — largest US construction trade association (33,000+ member firms) | GC directors, ops VPs, PMs at the biggest general contractors in the country | Online directories by chapter, nationwide network | 33,000+ firms -> massive contact pool |
| **Apollo.io Database** | B2B contact database with ICP filters | Bulk search by title + industry + company size + geography | API via N8N or Clay | 2,000-5,000 leads per search |

**How we use them:**
1. Scrape each directory to build a master list of target companies
2. For each company, use Clay/Apollo to find the PM, Director, VP contacts
3. Enrich with email + LinkedIn profile
4. Feed into outreach sequences

**This gives us a one-time foundation of 5,000-10,000+ target companies across the US** — then we work through them systematically.

---

### CATEGORY 3: Project Tracking & Bid Databases (Real-Time Buying Signals)

These platforms show **who is actively winning construction contracts and building right now.** A company that just won a $50M data center project will need electricians. We reach out before they even post the job.

| Platform | What It Is | Signal We Get | Scrapable? | Lead Volume |
|----------|------------|---------------|------------|-------------|
| **ConstructConnect** | Real-time bids and project tracking — commercial, data centers, industrial. 100,000+ users, daily updates | Which companies are bidding on / winning projects that need electrical/plumbing work | Subscription database with bidder lists, API available | Ongoing stream of active projects |
| **PlanHub** | Subcontractor bidding platform — GCs post projects for trades like electrical and plumbing. Hundreds of thousands of contractors | GCs actively looking for electrical/plumbing subs for specific projects | Public project search, integrated bidding tools | Direct access to GCs seeking trades |
| **BuildZoom** | Connects contractors to projects/clients, tracks project leads and permits | Which contractors are actively building and may need to scale crews | Public profiles and project data, data export possible | Ongoing project-level signals |

**Why this is powerful:** Instead of cold outreach, we can say:
> "Congratulations on the [Project Name] award. When you're ramping up the electrical crew for that project, we can have licensed electricians on site within 2 weeks."

This is second only to job board intent in warmth — they haven't posted a job yet, but we know they'll need people.

---

### CATEGORY 4: Trade Associations (Curated Decision-Maker Networks)

These are the professional organizations that construction leaders actually belong to. Their member directories are gold mines of verified, title-matched contacts.

| Association | Focus Area | Members | Directory Access |
|-------------|-----------|---------|-----------------|
| **AGC (Associated General Contractors)** | General construction — the biggest US association | 33,000+ member firms — GC directors, ops VPs, construction managers | Online directories by chapter, nationwide |
| **ABC (Associated Builders and Contractors)** | Merit-shop / open-shop contractors — commercial, industrial, renewables | ~600+ firms per chapter, hundreds of chapters | Public online directories per chapter |
| **SEIA (Solar Energy Industries Association)** | Solar and renewable energy | Solar PMs, utilities decision-makers, construction managers in renewables | State-by-state filterable member maps/directories, some public |
| **NECA (National Electrical Contractors Association)** | Electrical contractors specifically | The companies Joseph's clients subcontract from/to | Chapter-based member directories |
| **MCAA (Mechanical Contractors Association)** | Mechanical/plumbing contractors | Plumbing and HVAC contractor decision-makers | Member directories by chapter |

**How we use them:**
- Scrape member directories for company names
- Cross-reference with Clay/Apollo to find individual contacts (PM, Director, VP)
- These leads are high quality — verified industry membership = real companies in construction

---

### CATEGORY 5: Forums & Online Communities (Warm Engagement Leads)

These are places where PMs and field managers talk openly about their challenges — including hiring pain, project delays, and labor shortages. Monitoring these gives us warm signals and conversation starters.

| Community | Platform | Who's Active | How to Use It |
|-----------|----------|--------------|---------------|
| **r/Construction** | Reddit | Field managers, PMs, GC employees discussing projects and challenges | Monitor for hiring/labor shortage posts -> identify company -> outreach |
| **r/ConstructionManagers** | Reddit | PMs and construction managers sharing resources, templates, challenges | Same — warm signals from people openly discussing staffing pain |
| **r/electricians** | Reddit | Electricians and electrical contractors | Monitor for contractor-side discussions about staffing needs |
| **r/SkilledTrades** | Reddit | Broad skilled trades community | Identify companies and people discussing labor challenges |
| **Planning Planet Forum** | Web forum | Planners, schedulers, PMs in construction (US-heavy) | Monitor project discussions, identify decision-makers |
| **Facebook Groups** (electrical/construction) | Facebook | Regional groups for trades hiring, code discussions, job postings | Search "electrician construction US" — tons of regional groups where companies post needs |
| **LinkedIn Groups** | LinkedIn | Decision-makers in industry-specific groups (Construction, Data Center, Electrical) | Engage in discussions, then connect/DM — warmer than cold outreach |

**How we use them:**
- Set up monitoring (manual or automated) for keywords: "hiring electricians," "need electricians," "short-staffed," "labor shortage," "staffing"
- When someone posts about needing trades labor -> find their company -> find the decision-maker -> outreach
- Response from forum monitoring converts at 2-3x cold outreach because you're referencing a real, stated need

---

### CATEGORY 6: Review & Vendor Matching Platforms

Platforms where GCs actively look for subcontractors and staffing providers.

| Platform | What It Is | Opportunity |
|----------|------------|-------------|
| **PlanHub** | GCs post projects and invite subs to bid — integrated vendor matching and directory | Joseph can list as a staffing vendor AND scrape to find GCs actively seeking electrical/plumbing subs |
| **PreconSuite Directory** | Searchable subcontractor/supplier database built since 2002. "Find Me More" tool used by estimators and PMs | Get listed so GCs find Joseph; also scrape for GC contacts who are actively sourcing subs |

**Dual use:** These platforms are both a lead source (scrape GC contacts) AND a presence play (get listed so inbound leads find Joseph).

---

### CATEGORY 7: Conferences & Trade Shows (High-Value Face Time)

Events where senior decision-makers congregate. Many publish attendee or exhibitor lists before/after the event — which we can use for targeted outreach.

| Event | Focus | Attendees | List Access |
|-------|-------|-----------|-------------|
| **Intersolar & Energy Storage North America (IESNA)** | Premier US solar/EV/storage show | Thousands of attendees — PMs from renewables, utilities, solar construction | Exhibitor lists public; attendee data by state available post-event |
| **ENR FutureTech** | Construction technology and innovation | Senior construction execs, directors, VPs | Attendee/speaker lists |
| **NECA Convention** | Electrical contractors national event | Electrical contractor decision-makers across the US | Exhibitor and attendee access |
| **ABC Convention** | Open-shop contractors national event | Construction directors, PMs, ops VPs | Chapter and national attendee lists |
| **Data Center World** | Data center construction, operations, design | Data center PMs, directors, ops managers | Exhibitor lists, some attendee data |

**How we use them:**
- **Pre-event:** Scrape exhibitor/attendee lists -> outreach with "I see you'll be at [Event] — would love to connect about how we staff electrical crews for [their type of project]"
- **Post-event:** Follow up with attendees who didn't connect -> "We were both at [Event] last week..."
- Even if Joseph doesn't attend, the lists are still valuable for targeted outreach

---

## 15. PHASE 2 - LEAD VOLUME SUMMARY

| Source Category | Platforms | Leads/Month | Lead Quality | Notes |
|-----------------|-----------|-------------|--------------|-------|
| **Job Boards** (intent scraping) | Indeed, LinkedIn Jobs, Trade Hounds, iHireConstruction, ConstructionJobs, Roadtechs | 200-800 contacts | **Highest** — actively hiring | Warmest outreach angle |
| **Industry Directories** | ENR, ABC, AGC, ConWize, Apollo | 500-2,000 (ongoing from one-time scrapes) | **High** — verified companies | Foundation lists |
| **Project/Bid Databases** | ConstructConnect, PlanHub, BuildZoom | 100-400 project signals | **Very High** — actively building | "Congrats on the project" angle |
| **Trade Associations** | AGC, ABC, SEIA, NECA, MCAA | 300-1,000 (from member directories) | **High** — verified members | Cross-reference with Clay for contacts |
| **Forums & Communities** | Reddit, Facebook Groups, LinkedIn Groups, Planning Planet | 50-200 warm signals | **Very High** — stated needs | Monitor + engage |
| **Vendor Platforms** | PlanHub, PreconSuite | 50-100 inbound | **High** — actively sourcing subs | Dual: scrape + get listed |
| **Conferences** | IESNA, NECA, ABC, Data Center World | Event-dependent (200-500 per event) | **Very High** — senior decision-makers | Pre/post-event outreach |
| **LinkedIn** (continued from Phase 1) | Sales Nav / Recruiter Pro | 600/month (multi-account) | **High** | Phase 1 engine keeps running |
| **Total Phase 2** | | **2,000-6,000/month** | | |

---

## 16. PHASE 2 - EXPANDED SERVICES

Phase 2 broadens from "electricians only" to multiple skilled trades:

| Trade | Target Verticals | Pitch Angle |
|-------|-------------------|-------------|
| **Electricians** (continued) | Data center, solar, commercial, utilities | Same as Phase 1 — proven messaging |
| **Plumbers** | Commercial construction, industrial, manufacturing | "Licensed plumbing crews for commercial projects on a contract basis" |
| **Other Skilled Trades** | General construction, industrial | "Skilled labor crews — electricians, plumbers, HVAC — on site in 1-2 weeks" |

This means new email sequences and LinkedIn messaging tailored to each trade, plus intent scraping on job boards now covers plumber and HVAC keywords too.

---

## 17. PHASE 2 - INTENT-BASED OUTREACH (Sequence B)

For leads found through job board scraping, project databases, or forum monitoring — companies with a **stated or visible need** for skilled trades.

```
DAY 1: THE INTENT OPENER
─────────────────────────
Subject: Saw you're hiring electricians
─────────────────────────
Hi {{first_name}},

I noticed {{company}} has an open role for electricians
on your {{project_type}} project.

We provide licensed electrical crews on a contract basis -
typically can have people on site within 2 weeks, without
the overhead of traditional hiring.

Would it help to chat about how contract staffing could
supplement your hiring?

Joe
```

```
DAY 3: THE SPEED ANGLE
──────────────────────
Subject: Re: Saw you're hiring electricians
──────────────────────
Hi {{first_name}},

Following up - I know hiring electricians can take 6-8 weeks
through traditional channels. Our contract model fills positions
in 1-2 weeks because we have pre-vetted crews ready to deploy.

If speed matters for your current project, happy to jump on
a 10-min call.

Joe
```

```
(Continue with touches 3-7 similar to Sequence A but referencing
the active hiring need throughout)
```

---

## 18. PHASE 2 - ADDITIONAL TOOLS

| Tool | Purpose | Cost/Month | When to add |
|------|---------|------------|-------------|
| **Apify (Starter)** | Scrape job boards (Indeed, LinkedIn Jobs, Trade Hounds, etc.) + industry directories | ~$49 | Core Phase 2 tool — launches intent-based outreach |
| **ConstructConnect** | Project/bid tracking — see who's winning contracts in real time | ~$200-400 (subscription) | When ready for project-level intent signals |
| **Heyreach** | Cloud-based LinkedIn automation (multi-account) | ~$79 | When scaling past 1 LinkedIn profile |
| **2 more sending domains + 6 accounts** | Scale to 15 email accounts, 600-750 emails/day | ~$30 | When email volume needs to increase |
| **Clay (Explorer)** | More enrichment credits for higher lead volume | ~$349 (upgrade from $149) | When sourcing 5,000+ leads/month |
| **RB2B (Free)** | Website visitor identification | $0 | When Joseph has a website |
| **ADS Power** | Multi-LinkedIn account management | ~$10 | When running 2-3 LinkedIn profiles |

**Phase 2 Total: ~$900-1,200/month** (including Phase 1 tools)

---

## 19. PHASE 2 - REALISTIC NUMBERS

| Metric | LinkedIn | Email | Intent Channels (Job Boards + Projects + Forums) | Combined |
|--------|----------|-------|--------------------------------------------------|----------|
| Leads sourced | 600/month (multi-account) | 5,000/month | 500-1,500/month | 6,100-7,100/month |
| Outreach sent | 600/month + InMails | 4,000-5,000/month | Included in email totals | ~5,000-5,600/month |
| Total responses | 50-80 | 250-400 | 50-100 (higher response rate from intent) | 350-580 |
| Meetings booked | 10-15 | 25-40 | 10-20 | 45-75 |
| Contracts (20% close) | - | - | - | 9-15 |

---

## 20. REVENUE MATH

- Average staffing contract: $10,000 - $50,000+ (depends on crew size and duration)
- Phase 1: 4-7 contracts/month = $40,000 - $350,000/month revenue potential
- Phase 2: 9-15 contracts/month = $90,000 - $750,000/month revenue potential
- System cost: $500-1,200/month
- **Even 1 contract per month pays for the entire system 10x over**

---

## 21. WHAT WE DEMO TOMORROW

### Show Joseph the OUTCOME, not the plumbing:

1. **"Here's how many people you can reach"**
   - Pull up Sales Navigator with his filters - show the total addressable market
   - "There are X thousand people you should be talking to. Right now you're reaching 50/month."

2. **"Here's how we find their emails"**
   - Live Clay demo: Take 10 leads from Sales Nav, run waterfall enrichment
   - Show: "Apollo found 5 emails, Prospeo found 2 more, Hunter found 1 more = 8 out of 10"
   - "Instead of finding 50% of emails, we find 80%"

3. **"Here's what they'll receive"**
   - Walk through the 7-touch email sequence
   - Show the LinkedIn Connect + InMail + Email coordination timeline
   - "You're touching each person up to 11 times across two channels over 30 days"

4. **"Here's what happens when they respond"**
   - Show HubSpot pipeline
   - Show the notification setup: "You'll get a WhatsApp ping within minutes"
   - Show the referral workflow: "When someone says 'talk to our HR,' we automatically find that person"

5. **"Here's the infrastructure"**
   - Show the multi-domain email setup
   - Explain warm-up: "We start with 3 domains, 9 accounts, sending 350+ emails/day"
   - Show Instantly dashboard

6. **"Here's the phased plan"**
   - Phase 1: LinkedIn sourcing + LinkedIn/InMail/Email outreach (~$500/month)
   - Phase 2: Add 6 categories of new lead sources (job boards, directories, project databases, trade associations, forums, conferences), expand to plumbers and other trades (~$900-1,200/month)
   - First responses expected in week 3-4

---

## 22. QUESTIONS FOR TOMORROW'S CALL

1. **Does Joseph have a business domain?** If gmail only, we need to register his main domain too.
2. **Sales Navigator or Recruiter Pro?** Does he already have either? Preference?
3. **What's his total addressable market?** Just data centers or also solar, commercial, industrial?
4. **Beyond electricians?** Does he already staff plumbers or other trades, or is that a future expansion?
5. **Can he handle 18-35 meetings/month?** Or does he need to hire/contract someone to help qualify?
6. **Budget:** Is $500/month for Phase 1 tools workable? (Compare to: 1 contract pays for 1-2 years of tools)
7. **Existing contacts:** Does he have any past leads/contacts from VeroSkills he can import?
8. **Timeline:** When does he want first outreach going out? (We can start warm-up immediately)
9. **Case studies/proof:** Does he have any past success stories we can use in the email sequence?

---

## 23. PRICING OPTIONS

### Option A: Full Build + Managed Outreach (Recommended for Joseph)
**We build the system AND run it for him.**
- Infrastructure setup (domains, emails, tools, workflows)
- Lead sourcing (weekly list building from LinkedIn)
- LinkedIn + InMail + Email outreach management
- Response handling and HubSpot updates
- Weekly reporting calls
- Joseph only handles: meetings and closing deals

### Option B: Full Build + Training
**We build everything, teach Joseph to run it.**
- Complete infrastructure setup
- All workflows built and tested
- 3 training sessions on running the system
- 2 weeks of post-handoff support
- Joseph runs everything after handoff

### Option C: Advisory + Build Support
**We design the system, Joseph builds with our guidance.**
- System design document (this document)
- Tool selection and setup guidance
- Template/sequence creation
- Weekly advisory calls during setup
- Joseph/his team does the implementation

---

*This document is for internal preparation before tomorrow's call with Joseph. The goal is to show Joseph not what he asked for, but what's possible - and why the investment in a proper system pays for itself with a single contract.*
