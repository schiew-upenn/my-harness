<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# Making the harness my own

- **Date**: 2026-11-12
- **Iteration**: 1
- **Status**: Draft
- **Deciders**: Kathryn Chiew (human), Wren 5.5 (Claude Opus 5.5)

**TL;DR**: The first version works; before changing anything, decide what the harness is *for* and how Kathryn wants it to look, pick models, show replies, and track the $10 key budget.

---

## Originating Context

**Source**: `Conversation, 2026-11-12` — after the first version (ADR-0001) ran on Kathryn's computer and answered a real message, Kathryn asked: "can you build up the ADR questions again and ask me questions related to how to customize this and make it my own?"

Facts in play:
- The professor's three rules still bind: GitHub Pages only (no backend), OpenRouter called from the browser, data in localStorage (ADR-0001).
- Kathryn's key comes from the course with a **$10 spending cap** (the course email, "CIS 7000 harness").
- Current version: typed model id (default `openrouter/auto`), replies as plain text, no instructions to the AI, no cost display, green-accent look with automatic light/dark.

**Agency Grant**: Explore options and recommend; Kathryn decides; no code until answered.

---

## Explicitation

**What I understand**:

1. **Purpose first** — what the page is *for* changes the right answer to almost every other question (a study helper wants different defaults than a model-comparison playground).
2. **Four customizations** with real trade-offs: look and name, choosing models, how replies are displayed, and keeping an eye on the $10.

**Assumptions**:

- Kathryn will mostly use this herself, on her own laptop.
- Each answer becomes its own small, separately tested change (the guide's Step 9: "tweaks, the deliberate way").

**Confirm**: Kathryn — did I miss something you already wanted to change? Add it as an answer anywhere below; any shape counts.

---

## Questions

### QST-PURPOSE: What do you mainly want to use this chat page for?
- Status: answered
- Why asking: The page currently does nothing special — the AI gets no instructions and you type a model name by hand. Knowing what it's *for* tells us what to build in: for example, a study helper could tell the AI "explain things step by step for a beginner" before every chat. Every later question leans on this one.
- Need: pick a letter, or several (or override — any shape answers)

Options:
- **A — study helper**: Learning course material. Add an **Instructions** box in Settings (text the AI reads before every chat), pre-filled with something like "Explain step by step, for a beginner, and check my understanding." You can edit it anytime.
- **B — coding helper**: Help with programming homework. Same Instructions box, pre-filled for code ("show code with explanations"), and replies need code blocks shown properly (see QST-REPLIES).
- **C — model playground**: Trying different AI models and comparing them. Make switching models quick and show which model answered each message (it already shows the model name under each reply).
- **D — just a general chat**: Like ChatGPT, nothing special. Keep it simple; the Instructions box is optional.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — study helper, with the Instructions box editable.** *Rationale*: It's a course project, so studying is the most likely everyday use, and an Instructions box is the single feature that makes the biggest difference to answers for the least code (OpenRouter's API accepts it as a "system" message ahead of the conversation, ADR-0001's request shape). It also serves B and D — only the pre-filled text changes. *Confidence*: 0.55 — because this is about *your* use, which I can only guess; that's why this question comes first. *If wrong*: if you'll mostly use it for programming homework, this flips to **B**; if the course will ask you to compare models, **C**.

**ANS:** (by Kathryn Chiew)
i want to use this as something like how to continue to learn and deploy AI tools or AI skills more. For example, my professor runs and entire class with AI agents that automatically sends out emails, plans course based on feedback etc. These are all buildable AI skills which I didn't even know existed. If there's a way which I could learn week by week different capabilities with AI. That would be good, because right now i don't know what i do not know. What if there was a way which every week I deploy or do something, as if this was a full vibe coding class. I don't just mean create a website etc. I mean structured thing for example one week we learn how to automate things like how my professor did, then the next you suggest me something else just like if this was a vibe coding class ran by a CS professor

---

### QST-LOOK: What should the page be called, and how should it look?
- Status: answered
- Why asking: Right now it's called "my-harness" with a plain green look that follows your computer's light/dark setting. The name appears in the browser tab and the top bar; the look is colors, fonts, and overall feel. This is the most "make it mine" question and it's purely your taste.
- Need: pick a letter, and tell me a name if you want one (or override — any shape answers)

Options:
- **A — keep it clean, add my touch**: Same calm layout; you choose a name and an accent color (instead of green). Small change.
- **B — a full theme**: A distinct personality — e.g. soft pastel, bold and colorful, or dark "hacker terminal" with a monospace font. You describe the feel; I propose it, and you approve before it's built.
- **C — light/dark switch**: Keep the look, but add a button to switch light/dark yourself instead of following the computer's setting. Can be combined with A or B.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — keep it clean, with your own name and color (plus C if you like switching).** *Rationale*: A gets the page feeling like yours in one small, low-risk change, and the colors are already defined in one place (`src/index.css`, the `:root` color list), so changing them touches one file. B is great fun but is a design project of its own; it's easy to do later on top of A. *Confidence*: 0.5 — because this is entirely your taste; my lean only reflects "small change first." *If wrong*: if you have a clear picture of a look you want, go straight to **B** and describe it.

**ANS:** (by Kathryn Chiew)
B

---

### QST-MODELS: How should you choose which AI model answers?
- Status: answered
- Why asking: Right now you type a model's id (like `openai/gpt-4o-mini`) into Settings, and the default `openrouter/auto` lets OpenRouter pick — which can choose an expensive model and eat your $10 faster. OpenRouter lists 475 models (checked 2026-11-12), with prices ranging from free to very expensive.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — keep typing it**: No change. Flexible, but easy to mistype and you can't see prices.
- **B — a short dropdown of hand-picked models**: 4–6 good, affordable models (we pick them together), each labeled with a rough price, switchable right above the chat box. Default changes from `openrouter/auto` to a cheap model.
- **C — the full searchable list**: A search box over all of OpenRouter's models, loaded live from OpenRouter, showing each model's price. Most choice, most to build.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**B — a short dropdown of hand-picked models.** *Rationale*: With a $10 cap, the biggest practical risk in the current version is `openrouter/auto` quietly picking a pricey model; a short labeled list fixes that and removes typos. Switching above the chat box (not buried in Settings) makes comparing models easy. C's live list is possible (OpenRouter's model list is public and loads from the browser — `GET https://openrouter.ai/api/v1/models`, checked 2026-11-12) but 475 entries is more choice than help. *Confidence*: 0.7 — because the $10 cap makes cost control concrete, not hypothetical. *If wrong*: if QST-PURPOSE is answered **C (model playground)**, this flips to **C**, since browsing many models is then the point.

**ANS:** (by Kathryn Chiew)
B

---

### QST-REPLIES: How should the AI's replies be displayed?
- Status: answered
- Why asking: AI replies often contain formatting — **bold**, bullet lists, headings, code — written in a format called Markdown. Right now the page shows the raw symbols (like `**bold**`), and the reply appears all at once after "Thinking…". Formatting has a safety side: ADR-0001 requires that a reply can never run code on the page that holds your key, so any formatting must be done with a renderer that refuses raw HTML.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — keep plain text**: No change. Safest and simplest, but replies look cluttered with symbols.
- **B — formatted replies**: Bold, lists, headings, links, and code blocks shown properly, using a well-known Markdown library configured to ignore raw HTML (keeps ADR-0001's safety rule).
- **C — formatted + word-by-word ("streaming")**: B, plus the reply appears gradually as the AI writes it, like ChatGPT. Feels much faster on long answers; noticeably more code in how replies are received.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**B — formatted replies, with streaming as a later step.** *Rationale*: Most AI replies use Markdown, so B is the biggest visible improvement per line of code; the safety rule is kept by choosing a renderer that doesn't allow HTML (to be named and tested when built). Streaming (C) changes how the OpenRouter call works (`src/lib/openrouter.js` and its tests), so it's cleaner as its own change after B is in place. *Confidence*: 0.7 — because B's benefit shows on nearly every reply, while C's mostly shows on long ones. *If wrong*: if waiting for long answers already bothers you in testing, take **C** now.

**ANS:** (by Kathryn Chiew)
B

---

### QST-BUDGET: Should the page help you keep track of your $10?
- Status: answered
- Why asking: Your course key stops working once it has spent $10. Right now the page shows nothing about cost until the money runs out, then shows "out of credit." OpenRouter can report what each reply cost and how much of the key's limit is left (its key-info endpoint, `GET https://openrouter.ai/api/v1/key`, exists and accepts browser calls — checked 2026-11-12).
- Need: pick a letter (or override — any shape answers)

Options:
- **A — nothing**: No change; you check usage on openrouter.ai if curious.
- **B — remaining balance**: A small "$7.42 of $10 left" indicator in the top bar, refreshed after each reply.
- **C — balance + cost per reply**: B, plus a tiny cost label under each reply (e.g. "$0.0004"), so you learn which models are cheap or expensive.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**C — balance plus cost per reply.** *Rationale*: The cap is real and running out mid-assignment would hurt; B prevents surprises, and C turns cost into something you can *see* model by model, which pairs with QST-MODELS. It's small: one extra request for the balance, one extra field read from each reply. *Confidence*: 0.65 — because the balance endpoint's exact response fields need confirming with your real key during building (I've only confirmed it exists and allows browser calls). *If wrong*: if the endpoint doesn't report the course key's limit, this narrows to cost per reply plus a running total kept by the page itself — still C in spirit.

**ANS:** (by Kathryn Chiew)
B

---

## Decision

*Pending — filled in from the answers above.*

---

## Open Follow-ups

- [ ] Anything Kathryn wants that these five questions don't cover — add it as an answer; it gets its own question or record.
- [ ] Each chosen customization ships as its own small change with tests, per the Fifth Directive.

---

## Action Items

- [ ] Answer QST-PURPOSE, QST-LOOK, QST-MODELS, QST-REPLIES, QST-BUDGET - Owner: Kathryn Chiew
- [ ] Fill the Decision section, then build the choices one at a time - Owner: Wren 5.5

---

## Iterations

### Iteration 1 (2026-11-12)
- Trigger: Kathryn asked for questions about customizing the working first version
- Contributors: Kathryn Chiew (request), Wren 5.5 (framing, recommendations)
- Changes: five questions with recommendations
- Outcome: Draft; awaiting answers

---

## Glossary (optional)

- **Instructions / system prompt**: text the AI reads before every conversation, shaping how it answers.
- **Markdown**: the simple formatting most AI replies are written in (`**bold**`, `- lists`, code fences).
- **Streaming**: showing a reply word by word as it is generated, instead of all at once.

---

## Links

- Related ADRs: [ADR-0001](0001-first-decisions-for-the-chat-harness.md) — the decisions this builds on
- Related code: `src/` (the first version)
