# Product Requirements Document (PRD): Content Farm Automation

*Provided by Filippo (SYNACT / ORBIT Web3) — February 25, 2026*

---

## 1. Overview & Product Goal

This document defines the requirements for developing a "Content Farm" automation system. The main objective is to generate, produce, and publish a high volume of video content (approximately 900 videos/month) for social media platforms (TikTok and Instagram Reels) distributed across 5 different accounts.

### Core Business (The Offer)

The client's funnel promotes the "Agent Kit": a B2B business model that teaches how to sell AI Agents and "Digital Employees" to local businesses without knowing how to code (No-Code). The model is based on a Setup Fee and a Monthly Retainer for maintenance.

### Content Farm Objective

The video content must leverage the pain points of those looking to make money online (fatigue with trading, dropshipping, or selling working hours) and present selling AI Agents as the biggest "arbitrage" opportunity of 2026. The Call to Action (CTA) of all videos will drive users to watch the "Free Training" to learn this 4-step method (Acquisition, Installation, Training, Collection).

---

## 2. Core Features

### 2.1. Discovery and Scraping (The "Inspiration" Phase)

**Description:** The system must locate currently viral or highly performing content in the niche to use as a baseline for new videos.

**Details:**
- Launch scraping tasks (e.g., via Apify) on TikTok and Instagram.
- Search based on target keywords: Make money online 2026, No-Code Business, Sell AI to businesses, SMMA Automation, Recurring revenue, Dropshipping alternatives.
- Use filters to select only videos with above-average engagement metrics (views/likes/comments ratio).
- Extract text data (transcriptions/audio) and the Hook structure (the first 3-5 seconds).

### 2.2. Scripting and Content Generation

**Description:** Interpreting the extracted content and rewriting it to fit the "Agent Kit" funnel.

**Details:**
- Leverage an LLM (e.g., GPT-4o, Claude) to analyze the viral video transcriptions and adapt them to the client's framework.
- Required Marketing Angles: Attack old models (Trading, Dropshipping); Promise (Sell freedom from chaos to businesses, not technology); Method (Hybrid Model Collect upfront + Monthly Retainer); Simplicity (Drag & Drop approach No-Code, installation in 10 minutes).
- Target Language: All outputs (texts, scripts, captions) must be generated strictly in Italian.
- Generate new scripts with the structure: Hook + Value/Body (4-Step Method) + CTA to Free Training.
- Metadata production: conversion-oriented caption copy, relevant hashtags.

### 2.3. Dynamic Video Production (Avatar & B-Roll)

**Description:** Generation of the final video file (MP4) ready for publishing.

**Details:**
- Voice Generation (TTS): Dynamic and energetic speech synthesis based on the generated script, ensuring that the selected model in ElevenLabs or other tools is optimized for the Italian language.
- Video Avatar: Generation via AI platforms (e.g., HeyGen, SadTalker) of a realistic avatar of the client speaking in sync.
- Visual Enrichment (B-Roll): Addition of targeted stock footage to reinforce the message (e.g., profit charts, abstract drag & drop interfaces, local businesses in chaos vs automated businesses) to maintain high viewer retention.

### 2.4. Distribution and Scheduling (Smart Posting)

**Description:** Automated and staggered publishing of media across social profiles.

**Details:**
- Management of a fleet of 5 accounts (TikTok/Instagram) to dominate the niche.
- Organic rotation algorithm: posts scheduled at varying times, simulating human behavior.
- The goal of the post is to prompt the user to click the "link in bio" or comment a specific keyword to receive the Free Training link via DM Automation (e.g., ManyChat).

### 2.5. Performance Analysis & Feedback Loop (Self-Annealing)

**Description:** Evaluating the effectiveness of generated content in order to optimize future production runs.

**Details:**
- Metric tracking at 48h and 7-day intervals.
- Identifying the "Marketing Angles" that convert best (e.g., does focusing on money / setup fee attract more, or the focus on no technical skills / no-code?).
- Feedback sent to the LLM to recalibrate future scripts based on what drives more traffic to the funnel.

---

## 3. System Flow

**Input:** The CRM/Orchestrator starts the monthly cycle.

**Phase 1 (Scraping):** Apify collects 100 viral videos on keywords related to make money online / AI business.

**Phase 2 (Script Generation):** The LLM adapts the viral transcripts, turning them into hooks to sell the "Agent Kit" and invite users to the free training. Output: 30 high-converting scripts.

**Phase 3 (Video Render):** Pipeline for Avatar generation + TTS + programmatic editing with thematic B-rolls. Result: 30 daily .mp4 files.

**Phase 4 (Distribution):** The scheduler distributes the 30 videos across the 5 accounts asynchronously, managing descriptions and the CTA to the link in bio.

**Phase 5 (Analysis):** A weekly cron job fetches the stats. The system learns whether the target audience reacts better to dropshipping attacks or no-code praise, improving the subsequent cycle.

---

## 4. Technical Requirements & Constraints (Implementation)

- **Extremely High Volume:** Generating 900 videos per month requires careful cost evaluation (paid APIs vs Open-Source self-hosted for Avatar and TTS).
- **Social Anti-Spam:** Advanced techniques (e.g., Mobile Proxies, persistent browser profiles) are required to manage 5 simultaneous accounts without running into bans or shadowbans.
- **Storage:** Cloud storage S3/GCP for temporary housing and management of heavy media files.
- **Modularity:** A microservices architecture to isolate potential breakages (e.g., if Instagram DOM selectors change, the rendering pipeline should not stop).

---

## 5. Technology Stack & Tools (Preferred Tech Stack)

The client has expressed specific preferences for the automation infrastructure:

- **Web Scraping / Discovery:** Apify (Extraction from TikTok / Instagram).
- **Orchestration & Text Generation:** OpenAI or Anthropic (Claude) for video analysis and writing new scripts.
- **Voice & Avatar Generation:** ElevenLabs for both voice generation (Voice Clone or Premium Voice) and advanced AI Avatar generation.
- **Database & Human-in-the-Loop Control:** Airtable. Total state management will take place within an Airtable base, which will aggregate all scripts. Airtable must contain interactive buttons (e.g., "Approve Script", "Approve Video") to allow the client to review and authorize steps prior to subsequent triggers.
- **Media Storage:** Google Drive. To avoid bloating the database and slash the costs of storing heavy media, all physical files (raw footage, generated audio, final edited videos) will be automatically saved in Google Drive folders. Only the reference URL links will be pasted into Airtable.
- **Social Publishing & Scheduling:** Blotato or Buffer (via API) to queue and automatically stagger the pre-approved posts across the 5 accounts.
- **Video Assembly:** (Missing piece) Tool for physically assembling the video — Creatomate, Renderforest API, or a Python script using MoviePy that stitches together the Avatar, B-rolls, and final audio.

---

## 6. Business Setup & Integration (Checklist for the Client)

1. **DM Automation Setup:** ManyChat connected to accounts for auto-DM with Free Training link.
2. **Link in Bio Setup:** All accounts with optimized bio linking to the "Agent Kit" funnel.
3. **Infrastructure Budget:** Define monthly spending cap for infrastructure (LLM tokens, rendering APIs).
4. **Human Approval (Quality Control):** Videos placed in Airtable for human review and one-click approval before posting.
5. **B-Roll Source:** System fetches from free libraries (Pexels) or client provides private archive.
6. **Logistical History and Storage:** Define Airtable nomenclature and Google Drive folder permissions.
