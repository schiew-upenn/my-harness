<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# A week-by-week AI-building curriculum

- **Date**: 2026-11-12
- **Iteration**: 1
- **Status**: Draft
- **Deciders**: Kathryn Chiew (human), Wren 5.5 (Claude Opus 5.5)

**TL;DR**: Kathryn wants a structured, professor-style "vibe coding class" in building with AI — one new capability built and deployed each week — and these questions settle where it happens, what's in it, its pace, and how it fits the professor's rules.

---

## Originating Context

**Source**: `ADR-0002#QST-PURPOSE` — Kathryn's answer (2026-11-12) overrode all four offered options. Verbatim:

> i want to use this as something like how to continue to learn and deploy AI tools or AI skills more. For example, my professor runs and entire class with AI agents that automatically sends out emails, plans course based on feedback etc. These are all buildable AI skills which I didn't even know existed. If there's a way which I could learn week by week different capabilities with AI. That would be good, because right now i don't know what i do not know. What if there was a way which every week I deploy or do something, as if this was a full vibe coding class. I don't just mean create a website etc. I mean structured thing for example one week we learn how to automate things like how my professor did, then the next you suggest me something else just like if this was a vibe coding class ran by a CS professor

**Agency Grant**: Wren proposes the syllabus and each week's lesson, like an instructor; Kathryn decides what's in, the order, and the pace.

---

## Explicitation

**What I understand**:

1. **"I don't know what I don't know"** — the core need is a *map*: someone who knows the territory lays out the capabilities in a sensible order, so each week builds on the last.
2. **Build and deploy, not just read** — every week ends with something working and shipped, not only an explanation.
3. **The professor's setup is the motivating example** — agents that send emails and plan the course from feedback. The course email came from "Clarion 5 … the CAM course's collaborator seat", which suggests (my inference, unconfirmed) it runs on the same kind of crew machinery this template already ships: named AI seats, inbox briefs, and the `just recruit` / `just wake` recipes in this repo's `justfile`. If so, the end of this curriculum is within reach of the very repo you're in.
4. **Wren as instructor** — I propose each week's lesson as a record with options, you choose, we build it together, and the record keeps what you learned.

**Assumptions**:

- Your OpenRouter key's $10 cap must cover all the weeks' experiments, so lessons default to cheap models and small tests. (My own work with you in Claude Code doesn't spend that key.)
- The chat page stays the assignment the professor set; the curriculum *uses* it but shouldn't break its rules without asking (QST-COURSE-RULES).

**Confirm**: Kathryn — is "a structured class where Wren plays the CS professor and every week we build and ship one AI capability" what you meant?

---

## Questions

### QST-CLASS-SHAPE: Where does each week's class happen?
- Status: answered
- Why asking: "Learn AI skills week by week" can be built two very different ways: you learning by *building things with me* in code (like this week), or a *tutor inside your chat page* that teaches you lessons in conversation. They lead to different work, so this sets the shape of everything else.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — build-along with Wren**: Each week I propose a lesson as a short record (what you'll learn, why it matters, what we'll build). We build and deploy it together here in VS Code, then you write two or three sentences on what you learned. The chat page grows when a lesson fits it.
- **B — a tutor inside the chat page**: Add a "Class" mode to the page: the AI in your page acts as the professor, gives you a weekly lesson and exercises, and remembers your progress in the browser. You learn by talking, not by building.
- **C — both**: Build-along with Wren (A), plus a "Syllabus" panel in the chat page that shows the weeks, what's done, and what's next.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — build-along with Wren.** *Rationale*: Your answer stressed "every week I deploy or do something … I don't just mean create a website" — that's learning by building, which B can't give you (an AI in a chat window can explain automation, but can't set one up with you). This week already proved the A loop works: questions → your decisions → build → ship. C adds a nice dashboard but is extra building that teaches little; it can come later as a lesson of its own. *Confidence*: 0.75 — because your own words point at doing, not reading. *If wrong*: if what you mostly want is guided explanations you can go through on your own time, without building each week, this flips to **B**.

**ANS:** (by Kathryn Chiew)
C ? so it's a full course

---

### QST-SYLLABUS: Does this draft syllabus look right, and where should it start?
- Status: answered
- Why asking: This is the "map" for what you don't know yet. The draft (in Supporting Materials below, "DOC: draft syllabus") goes from the basics of talking to AI models, through tools and automation like your professor's, to teams of AI agents. Each week depends a little on the ones before. You may want a different order or different topics.
- Need: pick a letter (or override — any shape answers; you can also cross out or add weeks)

Options:
- **A — as drafted**: Start with Week 1 (prompting + your chat page's Instructions box) and go in order.
- **B — automation first**: Jump straight to Week 4 (an AI task that runs on its own on a schedule and emails you the result, like your professor's agents), then fill in the earlier weeks as they're needed.
- **C — different topics**: Tell me what you'd want instead or in addition (anything AI-related you've seen or heard of), and I'll redraft.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — as drafted.** *Rationale*: Weeks 1–3 teach the three ideas every later week uses — instructions shape the AI (week 1), models differ in cost and quality (week 2), and AI can *call your code* (week 3, the core of every agent). Week 4's automation is much easier to understand and debug once those are familiar. Weeks 1–2 also deliver the chat-page upgrades you already chose in ADR-0002 (dropdown, formatting, balance), so nothing you picked is wasted. *Confidence*: 0.65 — because the order follows how the ideas depend on each other, but motivation matters too and you know yours. *If wrong*: if what keeps you going is seeing the "wow" first, flip to **B** — Week 4 can be done first with me filling in the background as we go.

**ANS:** (by Kathryn Chiew)
A

---

### QST-PACE: How much time can you give the class each week?
- Status: answered
- Why asking: Only you know this, and it decides how big each week's lesson should be. A lesson that's too big gets abandoned halfway; too small feels pointless. The guide recommends telling the collaborator constraints it can't know — this is the biggest one.
- Need: pick a letter, or give a number of hours (or override — any shape answers)

Options:
- **A — about 1–2 hours**: One small, complete build per week.
- **B — about 3–5 hours**: One proper build plus a stretch goal.
- **C — it varies**: Each lesson has a short core (about an hour) and optional extras you do when you have time.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**C — a short core with optional extras.** *Rationale*: Student weeks are uneven (exams, deadlines), and a fixed size will be wrong in some weeks. A one-hour core means you always finish something and ship it; extras let good weeks go deeper. *Confidence*: 0.5 — because this is your schedule, not something I can know. *If wrong*: if you'd rather commit to a fixed amount and plan around it, take **A** or **B** to match it.

**ANS:** (by Kathryn Chiew)
A

---

### QST-COURSE-RULES: How should the class fit with your professor's rules for the chat page?
- Status: answered
- Why asking: The professor's assignment says the chat page is GitHub Pages only, with no backend (ADR-0001). Some weeks — automation especially — need something that runs when your browser is closed (for example, a scheduled GitHub Actions job keeping your key in GitHub's secret storage). That's fine for a learning project, but it isn't "GitHub Pages only," so it shouldn't quietly change the assignment repo.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — separate projects for outside-the-page weeks**: Weeks that improve the chat page (1–3) happen here in `my-harness`. Weeks that need more than the page (automation, skills, agents) each get their own new repo, started from the same ADRs4AI template — which also gives you practice reusing it, as your professor wants.
- **B — everything in `my-harness`**: One repo holds the chat page and all the weekly projects, in separate folders.
- **C — ask the professor first**: Pause the outside-the-page weeks until the professor says how they want it.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — separate projects for outside-the-page weeks.** *Rationale*: It keeps your assignment exactly what the professor asked for (nothing graded gets surprising extras), and each new repo from the template rehearses the setup you learned this week — `CLAUDE.md` now records that your course wants the template reused (Project-Specific Notes). *Confidence*: 0.7 — because it protects the assignment and doubles as practice. *If wrong*: if the professor says extra work should live in the same repo (or should be shown together), flip to **B**; if you're unsure whether extra repos are welcome at all, **C**.

**ANS:** (by Kathryn Chiew)
A

---

## Supporting Materials

### DOC: draft syllabus
*Draft for QST-SYLLABUS — each week: what you'll learn → what you'll build and ship. Order follows how the ideas depend on each other.*

| Week | You'll learn | You'll build and ship |
|---|---|---|
| 1 | **Prompting & instructions** — how the text an AI reads first shapes every answer | An Instructions box (with presets) in your chat page; test the same question with different instructions |
| 2 | **Models & money** — why models differ in quality, speed and cost; what "tokens" are | The model dropdown, formatted replies, and "$ left" balance from ADR-0002; a side-by-side comparison of 3 models on one question |
| 3 | **Tool use** — how an AI can *call code you wrote* (the core idea behind every agent) | Your chat page's AI gets one tool, e.g. a calculator or a Wikipedia lookup, and decides itself when to use it |
| 4 | **Automation** — AI that runs on its own, on a schedule | A scheduled GitHub Actions job that asks an AI something every morning and delivers the answer to your inbox (a GitHub issue, which emails you) — the shape of your professor's emailing agents |
| 5 | **Skills** — packaging instructions an AI agent loads when needed (like the `adr-authoring` skill I used on these records) | Your own Claude Code skill, e.g. "make my weekly study plan" |
| 6 | **Your own data (RAG)** — letting an AI answer from your documents | Ask questions about your course notes and get answers that cite them |
| 7 | **MCP** — connecting AI to outside tools and data through a standard plug | Use and then write a tiny MCP server (this repo already has one configured: `adrs4ai`, in `.mcp.json`) |
| 8 | **Crews** — several AI agents with roles, handing work to each other | Recruit a second AI "seat" with this template's crew layer (`just recruit`, inbox briefs) and run a small two-agent workflow — the closest step to your professor's setup |
| Capstone | **Your own system** | Design and build an automation of your choice, start to finish, with the records to show why |

---

## Decision

*Pending — filled in from the answers above.*

---

## Open Follow-ups

- [ ] Unverified assumption: the professor's agents run on this template's crew machinery (inferred from "collaborator seat" in the course email). Worth asking in class — it would make Week 8 a direct look behind the curtain.
- [ ] Concern: $10 key budget across all weeks; each lesson states its expected cost before running.
- [ ] Each week gets its own small record (lesson plan → decisions → what was learned), so the class leaves a trail you can show.

---

## Action Items

- [ ] Answer QST-CLASS-SHAPE, QST-SYLLABUS, QST-PACE, QST-COURSE-RULES - Owner: Kathryn Chiew
- [ ] Turn the answers into a final syllabus and propose Week 1's lesson - Owner: Wren 5.5

---

## Iterations

### Iteration 1 (2026-11-12)
- Trigger: Kathryn's override answer to ADR-0002 QST-PURPOSE
- Contributors: Kathryn Chiew (the idea), Wren 5.5 (syllabus draft, questions)
- Changes: four questions and a draft eight-week syllabus
- Outcome: Draft; awaiting answers

---

## Glossary (optional)

- **Vibe coding**: building software by describing what you want to an AI collaborator and steering it, rather than writing every line yourself.
- **Tool use / function calling**: an AI deciding to run a piece of code you provided (a "tool") and using its result in its answer.
- **Skill**: a packaged set of instructions an AI agent loads when a task calls for it.
- **MCP (Model Context Protocol)**: a standard way to plug tools and data sources into AI applications.
- **RAG (retrieval-augmented generation)**: looking up relevant pieces of your documents and giving them to the AI along with your question.
- **Seat / crew**: a named, persistent AI collaborator identity, and a team of them working through shared files (see `docs/inbox/ONBOARDING.md`).

---

## Links

- Related ADRs: [ADR-0002](0002-making-the-harness-my-own.md) (QST-PURPOSE, where this began); [ADR-0001](0001-first-decisions-for-the-chat-harness.md) (the professor's rules)
