<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# What my-harness should become: a building-project harness

- **Date**: 2026-11-19
- **Iteration**: 3
- **Status**: Accepted
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
- Status: answered
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
I would want to open it and it shows me a new lesson on something i can build with AI, maybe it's the next lesson. It also tells me why this might be useful, how people with CS degrees think about AI and automating tasks for example

---

### QST-MEANING: What does "building-project harness" mean to you?
- Status: answered
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
B I want it to be like my little AI Studio, but then it should also give me recommendations or somethign on what to build, almost like it's going to keep prompting me and asking me questions on what i want to build and give me suggestions on how to build it. It should be multiple choice or something, detailed, and also smart enough that it can understand what i want out of it

---

### QST-AUDIENCE: Who will use or see the page?
- Status: answered
- Why asking: This decides how much explaining the page needs (a first-visit guide for strangers, or nothing) and how closely it has to stick to the professor's original assignment. If it's graded, the due date also decides how big the next steps can be.
- Need: pick a letter; if it's graded, add the due date and what the professor checks

Options:
- **A — just me**: Nobody else uses it. It can be as personal and unusual as you like.
- **B — me, and the professor looks at it**: It's graded or shown in class, so it has to keep matching the assignment (GitHub Pages only, OpenRouter key, browser storage; ADR-0001) and be easy for the professor to try.
- **C — classmates use it too**: Others open the link and use it with their own keys, so it needs a clear first-visit guide and simpler words.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**B — me, and the professor looks at it.** *Rationale*: the page started as the professor's assignment (ADR-0001, Originating Context), so assuming they will look at it is the safe default. *Confidence*: 0.5 — because I don't know whether it's graded, or when. *If wrong*: if no one but you will ever open it, flip to **A**: fewer rules to keep.

**ANS:** (by Kathryn Chiew)
A

---

### QST-RULES: What kind of "rules" do you need?
- Status: answered
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
C

---

### QST-UI-MESS: Which parts of the page feel messy?
- Status: answered
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
It just looks like a generic AI-chat box page if that makes sense, there's no steps, achievements, nothing

---

### QST-COURSE-FIT: How should the weekly course fit into this?
- Status: answered
- Why asking: Last week you decided the page covers course Weeks 1–3, and Weeks 4–8 each get their own repo (ADR-0003, QST-COURSE-RULES = A). A building-project harness could change that.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — keep as decided**: The page covers Weeks 1–3; Weeks 4–8 get their own repos; the Course panel stays as your progress tracker.
- **B — the harness is the course's home**: Every week's build happens in or through my-harness. This reopens QST-COURSE-RULES in ADR-0003.
- **C — take the course out of the page**: Remove the Course panel. The course is tracked in the ADRs and in chats with Claude only, so the page gets simpler.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**A — keep as decided, for now.** *Rationale*: only Week 1 has been done (ADR-0004), and the right home for the course depends on QST-MEANING, so changing it before that's answered could mean changing it twice. *Confidence*: 0.55 — because this depends on another question. *If wrong*: if you answer QST-MEANING with **A** (project home) or **B** (build studio), flip to **B** here; if you marked the Course panel (E) in QST-UI-MESS, consider **C**.

**ANS:** (by Kathryn Chiew)
A

---

### QST-BUILD-ORDER: Which piece of the new studio gets built first?
- Status: answered
- Why asking: Your answers describe four pieces (see "Decision" below): a lesson home screen, a question-asking coach, a build studio with live preview, and steps and achievements. That's several weeks of work at your pace of 1–2 hours a week (ADR-0003, QST-PACE), so one has to come first. Follow-up to QST-USE-CASE and QST-MEANING (iteration 2).
- Need: pick a letter (or override — any shape answers)

Options:
- **A — lesson home + progress**: The page opens on "Today's lesson": what you'll build, why it's useful, how CS people think about it, with the lesson's steps to tick off and an achievement when it's done. The chat moves one click away. Uses no AI credit. About one session.
- **B — the coach**: A "What should I build?" flow. The AI asks you multiple-choice questions, one at a time, works out what you want, then suggests a project and how to build it. Uses a little credit per conversation. About one to two sessions.
- **C — the live preview studio**: You describe a small app, the AI writes it, and it runs next to the chat in a sealed preview window. Keep asking for changes until it works, then download it. About two sessions.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**A — lesson home + progress.** *Rationale*: it's exactly your QST-USE-CASE answer ("I would want to open it and it shows me a new lesson"), and it fixes your QST-UI-MESS complaint (no steps, no achievements) right away. It also needs no AI calls, so it can't spend your $10 key. B and C then plug into the lesson screen as its "start building" buttons. *Confidence*: 0.7 — because your own words name this first moment; it drops if the coach is what excites you most. *If wrong*: if the multiple-choice coach is the part you most want to see, flip to **B**; if seeing something you built run on screen matters most, **C**.

**ANS:** (by Kathryn Chiew)
A

---

### QST-LESSON-SOURCE: Who writes the lessons the page shows?
- Status: answered
- Why asking: You want the page to show a lesson with why it's useful and how CS people think about it. Those words have to come from somewhere, and the choice decides quality, cost and how up to date the lessons are. It also changes ADR-0003's routine, where Wren teaches each lesson here in VS Code (step 1b). Follow-up to QST-USE-CASE (iteration 2).
- Need: pick a letter (or override — any shape answers)

Options:
- **A — written ahead by Wren**: Each lesson is written once, checked, and built into the page. Free to show, never wrong in surprising ways, but it only changes when we add the next one together.
- **B — written live by the AI**: The page asks the AI (with your key) to write the lesson each time you open it. Always fresh and can adapt to you, but costs a little each time and can make mistakes you won't catch.
- **C — both**: Wren writes the core of each lesson ahead (what, why, how CS people think). An "Ask more" button lets the page's AI go deeper on whatever you're curious about.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)

**C — both.** *Rationale*: your Week 1 catch (ADR-0003, iteration 3: "there was no lesson taught") showed that lessons need to be really taught, which a checked, pre-written core guarantees. Your QST-MEANING answer asks for something "smart enough that it can understand what I want", which is what the "Ask more" part gives. A pre-written core also keeps everyday use free. *Confidence*: 0.65 — because it splits the difference; your preference between reliable and fresh decides it. *If wrong*: if you'd rather every lesson come from the AI so it can be about anything, flip to **B**; if you want zero AI spending on lessons, **A**.

**ANS:** (by Kathryn Chiew)
C

---

## Supporting Materials

### DOC: the session routine (QST-RULES = C)
*Draft. It already exists as "How each week runs" in ADR-0003, but buried in a record. Here it is in five steps, to be shown in the page and pinned in the repo.*

1. **Open the page.** It shows this week's lesson and where you left off.
2. **Tell Claude in VS Code:** "Week N, teach me." Wren teaches the lesson in the chat and ends with one check question.
3. **Decide.** Answer the week's 1–2 questions in its record (ADR).
4. **Build and ship.** Build together; the tests pass; push, and it's live.
5. **Reflect and tick it off.** Write 2–3 sentences on what you learned, then tick the lesson in the page, which earns its achievement.

### FIL: what to look at
- `src/App.jsx`: the whole page layout. The parts listed in QST-UI-MESS come from here.
- `CLAUDE.md`: the rules Claude follows (about 300 lines, written for Claude).
- [ADR-0003](0003-a-week-by-week-ai-building-curriculum.md): the course plan and syllabus.

---

## Decision

### Chosen (answered by Kathryn Chiew, 2026-11-19)

- **Use, QST-USE-CASE**: when she opens the page, it shows her the next lesson on something she can build with AI, why it's useful, and how people with CS degrees think about AI and automating tasks.
- **Meaning, QST-MEANING = B, build studio, plus a coach**: "my little AI Studio" that also keeps asking her questions about what she wants to build, multiple choice and detailed, gives suggestions on how to build it, and is "smart enough that it can understand what I want out of it."
- **Audience, QST-AUDIENCE = A, just me**: no first-visit guide or plain-for-strangers wording needed; the page can be personal.
- **Rules, QST-RULES = C, a session routine**: the same short checklist every session (draft in Supporting Materials).
- **Layout, QST-UI-MESS (override)**: "It just looks like a generic AI-chat box page… there's no steps, achievements, nothing." The fix isn't tidying panels; it's giving the page visible progress.
- **Course, QST-COURSE-FIT = A, keep as decided**: the page covers Weeks 1–3; Weeks 4–8 get their own repos.

### What this adds up to
The page turns from a chat box into a **studio built around lessons**, in four pieces:
1. **Lesson home**: opens on "Today's lesson" (what, why, how CS people think).
2. **Coach**: multiple-choice questions that work out what you want to build, then suggest how.
3. **Build studio**: the AI writes a small app that runs in a sealed live preview.
4. **Steps and achievements**: each lesson's steps to tick off, and a visible record of what's done.

The plain chat stays, one click away. ADR-0001's rules still hold: GitHub Pages only, the key only ever goes to OpenRouter, and replies never run as code on the main page (the preview runs in a sandboxed iframe that can't read the key).

### Tension to watch
COURSE-FIT = A keeps Weeks 4–8 in their own repos, while the page becomes the place lessons are shown. These fit together if the page *shows* every week's lesson and progress, while Weeks 4–8 are *built* elsewhere. If that's not what Kathryn means, QST-COURSE-RULES in ADR-0003 reopens.

### Build plan (answered by Kathryn Chiew, 2026-11-19)

- **First piece, QST-BUILD-ORDER = A, lesson home + progress**: the page opens on "Today's lesson", with its steps to tick off and achievements. No AI calls. The coach (B) and the live preview studio (C) come after, as the lesson screen's "start building" buttons.
- **Lessons, QST-LESSON-SOURCE = C, both**: Wren writes each lesson's core ahead of time (what you'll build, why it's useful, how CS people think about it). An "Ask more" button lets the page's AI go deeper, using Kathryn's key.

---

## Action Items

- [x] Answer the six questions - Owner: Kathryn Chiew
- [x] Process the answers and fill the Decision section - Owner: Wren 5.5
- [x] Answer QST-BUILD-ORDER and QST-LESSON-SOURCE - Owner: Kathryn Chiew
- [ ] Put the session routine in the repo (and later in the page) - Owner: Wren 5.5
- [ ] Build the first piece, with tests, and push it live - Owner: Wren 5.5 with Kathryn Chiew

---

## Iterations

### Iteration 1 (2026-11-19)
- Trigger: Kathryn: "I am confused. This should be a building project harness", asking to be grilled with questions
- Contributors: Kathryn Chiew (the ask), Wren 5.5 (questions, recommendations)
- Changes: six questions on use, meaning, audience, rules, layout and course fit
- Outcome: Draft; awaiting answers

### Iteration 2 (2026-11-19)
- Trigger: Kathryn answered all six (USE-CASE: open it and see the next lesson; MEANING: B plus a multiple-choice coach; AUDIENCE: A; RULES: C; UI-MESS: "no steps, achievements, nothing"; COURSE-FIT: A)
- Contributors: Kathryn Chiew (answers), Wren 5.5 (processing)
- Changes: Decision filled with a four-piece studio; session routine drafted; two follow-up questions minted (QST-BUILD-ORDER, QST-LESSON-SOURCE); COURSE-FIT tension noted
- Outcome: stays Draft until the follow-ups are answered

### Iteration 3 (2026-11-19)
- Trigger: Kathryn answered QST-BUILD-ORDER = A and QST-LESSON-SOURCE = C
- Contributors: Kathryn Chiew (answers), Wren 5.5 (processing)
- Changes: build plan recorded: lesson home + progress first, lessons pre-written with an "Ask more" button
- Outcome: `Draft → Accepted`

---

## Glossary (optional)

- **Harness**: the program wrapped around an AI model: its instructions, tools, memory, and the loop that runs it. Claude Code is one; the chat page is a small one.
- **Sandboxed iframe**: a sealed window inside a page that runs other code but can't reach the page's saved data (like the API key).

---

## Links

- Related ADRs: [ADR-0001](0001-first-decisions-for-the-chat-harness.md) (the professor's rules); [ADR-0002](0002-making-the-harness-my-own.md) (the look); [ADR-0003](0003-a-week-by-week-ai-building-curriculum.md) (the course); [ADR-0005](0005-a-personal-skills-folder-with-i-have-adhd-always-on.md) (the chat-page preset)
