<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# What my-harness should become: a building-project harness

- **Date**: 2026-11-19
- **Iteration**: 1
- **Status**: Draft
- **Deciders**: Kathryn Chiew (human), Wren 5.5 (Claude Opus 5.5)

**TL;DR**: Kathryn finds the project confusing (no visible rules, a messy page, a chat box with no clear job) and wants it to be a *building-project harness*. These six questions decide what that means before anything else gets built.

---

## Originating Context

**Source**: `Human prompt (below)`, Kathryn in conversation, 2026-11-19, after asking for ideas beyond "just a chatbox interface":

> Also, can you give me a list of questions to adapt this project, right now, i'm not sure about the rules of it and how i should use it. There are no rules, the UI is messy, grill me on questions on how to further this. I am confused. This hsould be a building project harness

**Agency Grant**: Wren asks the questions and recommends; Kathryn decides. Nothing new gets built until the first questions are answered.

---

## Explicitation

**What I understand**:

1. **The page has no clear job.** It's a general chat box with extras added on (instructions, a course panel). Without a main purpose, every extra looks like clutter. That's likely most of the "messy" feeling.
2. **The rules exist but aren't written for you.** `CLAUDE.md` is about 300 lines of rules, but they're addressed to Claude. Nothing tells *you* how to use this project, so from your side it feels like there are no rules.
3. **"Building-project harness" points at building, not chatting.** In ADR-0003 you said *"I don't just mean create a website… as if this was a full vibe coding class."* The page should help you make things.
4. **Two things share one name.** "my-harness" is both the web page and the way we work in VS Code (Claude Code, ADRs, skills). Part of the confusion may come from not knowing which one "this project" means.

**Assumptions**:

- The professor's rules still hold for the page: GitHub Pages only, no backend, your own OpenRouter key, storage in the browser (ADR-0001).
- The $10 key cap still applies, so anything that calls the AI a lot needs to stay cheap.

**Confirm**: Kathryn, do these four points match why it feels confusing?

---

## Questions

*Answer in order if you can. QST-USE-CASE and QST-MEANING decide most of the rest.*

### QST-USE-CASE: Picture next week. When would you open my-harness, and what would you be doing?
- Status: unanswered
- Why asking: Every other choice depends on a real moment of use. Right now the page is a general chat box, which is why it's hard to say what belongs on it. One real example tells me more than any list of options.
- Need: 1–3 sentences describing a real situation (any shape answers)

Options: none (elicitation)

Examples to get you started, not to pick from:
- "I'm doing my Week 2 build and I want to…"
- "I have an idea for a small app and I want to see it working without…"
- "I'm studying for a class and I want…"

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**Describe a real moment, not an ideal one.** *Rationale*: ideal descriptions ("a place to build everything") fit every design, so they don't decide anything; a real Tuesday-afternoon moment rules most designs out. *Confidence*: 0.85 — because this is how the earlier answers worked best: your concrete override in ADR-0002 QST-PURPOSE produced the whole course. *If wrong*: if no real moment comes to mind, say so. That's an answer too: it means the page should be shaped around the course (QST-COURSE-FIT B) until a real use shows up.

**ANS:** (by Kathryn Chiew)
[Fill this in]

---

### QST-MEANING: What does "building-project harness" mean to you?
- Status: unanswered
- Why asking: "Harness" means something specific in AI: the program wrapped around a model, meaning its instructions, its tools, its memory, and the loop that runs it. Claude Code is a harness; your chat page is a tiny one. On top of that, "my-harness" is both the web page and the VS Code way of working. The four readings below lead to very different next builds.
- Need: pick a letter, or a combination like "A+B" (or override — any shape answers)

Options:
- **A — project home**: The page becomes home base for your weekly course projects. Each project gets a card with its goal, steps, notes and status, plus an AI chat that knows which project you're on. Chat becomes one part of the page, not the whole thing.
- **B — build studio**: You describe something small ("a flashcard quiz", "a tip calculator"); the AI writes it; it runs right next to the chat in a live preview window. You ask for changes until it works, then save or download it. A small vibe-coding studio in your browser, still with no backend.
- **C — harness lab**: The page stays a chat, but each week you add one real harness piece and watch how it changes the AI: instructions (done), model choice, tools, memory, an agent loop. The point is understanding how tools like Claude Code work inside.
- **D — the VS Code workflow**: You don't mean the web page. You mean the way you build with Claude in VS Code: this repo's rules, skills and ADRs, ready for any project. The web page was just the first thing built with it.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**B — build studio.** *Rationale*: it's the only reading where opening the page means making something, which matches "building project" and the "vibe coding class" wording in ADR-0003. It works within ADR-0001's rules: the AI-made page runs in a sealed preview frame (a sandboxed iframe) that can't read your saved key. And the later course weeks still fit, since tools (Week 3) become things the studio's AI can do. *Confidence*: 0.45 — because "harness" honestly fits all four, and only you know which one you meant; this is yours to route. *If wrong*: if what you mainly want is to stay organized across the weeks, flip to **A**; if you want to understand how AI tools work, **C**; if you weren't talking about the web page at all, **D**.

**ANS:** (by Kathryn Chiew)
[Fill this in]

---

### QST-AUDIENCE: Who will use or see the page?
- Status: unanswered
- Why asking: This decides how much explaining the page needs (a first-visit guide for strangers, or nothing) and how closely it has to stick to the professor's original assignment. If it's graded, the due date also decides how big the next steps can be.
- Need: pick a letter; if it's graded, add the due date and what the professor checks

Options:
- **A — just me**: Nobody else uses it. It can be as personal and unusual as you like.
- **B — me, and the professor looks at it**: It's graded or shown in class, so it has to keep matching the assignment (GitHub Pages only, OpenRouter key, browser storage; ADR-0001) and be easy for the professor to try.
- **C — classmates use it too**: Others open the link and use it with their own keys, so it needs a clear first-visit guide and simpler words.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**B — me, and the professor looks at it.** *Rationale*: the page started as the professor's assignment (ADR-0001, Originating Context), so assuming they will look at it is the safe default. *Confidence*: 0.5 — because I don't know whether it's graded, or when. *If wrong*: if no one but you will ever open it, flip to **A**: fewer rules to keep.

**ANS:** (by Kathryn Chiew)
[Fill this in]

---

### QST-RULES: What kind of "rules" do you need?
- Status: unanswered
- Why asking: You said "there are no rules." There are plenty, but they're written for Claude, not for you, so from your side it feels like none. "Rules" could mean any of these.
- Need: pick letters, any combination (or override — any shape answers)

Options:
- **A — a "how I use this" page**: One short page in plain language, written for you: what this project is, how a work session goes, what to type to Claude, where things live.
- **B — rules for the app**: A short list of what the page must and must not do (for example "the key is only ever sent to OpenRouter", "every feature gets a test", "the page fits on one screen"). Every future build is checked against it.
- **C — a session routine**: The same checklist every time you sit down, for example "1. tell Claude which week you're on → 2. learn the lesson → 3. decide → 4. build → 5. write two sentences on what you learned".
- **D — fewer rules**: Hide or cut the template parts you don't use (the multi-agent crew, inbox and tour machinery) so what's left is small enough to understand.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**A + C — a "how I use this" page with the session routine inside it.** *Rationale*: the only guides in the repo are written for AI (`CLAUDE.md`, and `docs/inbox/ONBOARDING.md` for AI seats), and your confusion is about how *you* use the project. That's exactly A, and C is the heart of it. B already partly exists as "Rules that follow from these" in ADR-0001. D is tempting, but `CLAUDE.md` notes the course asks for this template, so explaining it beats deleting it. *Confidence*: 0.65 — because your words ("how I should use it") point at A, but "no rules" could also mean B. *If wrong*: if by "rules" you meant how the page itself should behave, flip to **B**.

**ANS:** (by Kathryn Chiew)
[Fill this in]

---

### QST-UI-MESS: Which parts of the page feel messy?
- Status: unanswered
- Why asking: "Messy" could mean too many things, things in the wrong place, confusing words, or the look. These are the parts on the page today (from `src/App.jsx`). Knowing which ones bother you tells me what to cut, move or rename.
- Need: pick letters, any number, plus one sentence on what bugs you. A screenshot with things circled works too.

Options:
- **A — chat list (left side)**: the list of saved chats with rename and delete, plus the Settings and Course buttons at the bottom.
- **B — Instructions bar**: the box above each chat with the presets (from Week 1).
- **C — top bar**: the chat's title and the raw model name (like `openrouter/auto`).
- **D — Settings panel**: the key, a model name you have to type by hand, and the default instructions.
- **E — Course panel**: the syllabus that slides over the page.
- **F — the whole thing**: no single part. Too many boxes and pop-up panels with equal weight, and it's not clear where to start.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**F — the whole thing.** *Rationale*: reading `src/App.jsx`, the page stacks three panels that open over each other (Settings, Course, and the chat list on small screens), two warning banners, and the Instructions bar, all with about the same importance, and nothing marks the main job. That's what happens when there's no answer to QST-MEANING yet. *Confidence*: 0.4 — because this is my reading of the code, not your experience of the page. *If wrong*: if one or two parts bother you and the rest is fine, your letters replace this pick, and the fix is small (rename or move those parts) instead of a redesign.

**ANS:** (by Kathryn Chiew)
[Fill this in]

---

### QST-COURSE-FIT: How should the weekly course fit into this?
- Status: unanswered
- Why asking: Last week you decided the page covers course Weeks 1–3, and Weeks 4–8 each get their own repo (ADR-0003, QST-COURSE-RULES = A). A building-project harness could change that.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — keep as decided**: The page covers Weeks 1–3; Weeks 4–8 get their own repos; the Course panel stays as your progress tracker.
- **B — the harness is the course's home**: Every week's build happens in or through my-harness. This reopens QST-COURSE-RULES in ADR-0003.
- **C — take the course out of the page**: Remove the Course panel. The course is tracked in the ADRs and in chats with Claude only, so the page gets simpler.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**A — keep as decided, for now.** *Rationale*: only Week 1 has been done (ADR-0004), and the right home for the course depends on QST-MEANING, so changing it before that's answered could mean changing it twice. *Confidence*: 0.55 — because this depends on another question. *If wrong*: if you answer QST-MEANING with **A** (project home) or **B** (build studio), flip to **B** here; if you marked the Course panel (E) in QST-UI-MESS, consider **C**.

**ANS:** (by Kathryn Chiew)
[Fill this in]

---

## Supporting Materials

### FIL: what to look at
- `src/App.jsx`: the whole page layout. The parts listed in QST-UI-MESS come from here.
- `CLAUDE.md`: the rules Claude follows (about 300 lines, written for Claude).
- [ADR-0003](0003-a-week-by-week-ai-building-curriculum.md): the course plan and syllabus.

---

## Decision

*Pending: filled after Kathryn answers.*

---

## Action Items

- [ ] Answer QST-USE-CASE and QST-MEANING first, then the rest - Owner: Kathryn Chiew
- [ ] Process the answers, fill the Decision section, propose the first build - Owner: Wren 5.5

---

## Iterations

### Iteration 1 (2026-11-19)
- Trigger: Kathryn: "I am confused. This should be a building project harness", asking to be grilled with questions
- Contributors: Kathryn Chiew (the ask), Wren 5.5 (questions, recommendations)
- Changes: six questions on use, meaning, audience, rules, layout and course fit
- Outcome: Draft; awaiting answers

---

## Glossary (optional)

- **Harness**: the program wrapped around an AI model: its instructions, tools, memory, and the loop that runs it. Claude Code is one; the chat page is a small one.
- **Sandboxed iframe**: a sealed window inside a page that runs other code but can't reach the page's saved data (like the API key).

---

## Links

- Related ADRs: [ADR-0001](0001-first-decisions-for-the-chat-harness.md) (the professor's rules); [ADR-0002](0002-making-the-harness-my-own.md) (the look); [ADR-0003](0003-a-week-by-week-ai-building-curriculum.md) (the course); [ADR-0005](0005-a-personal-skills-folder-with-i-have-adhd-always-on.md) (the chat-page preset)
