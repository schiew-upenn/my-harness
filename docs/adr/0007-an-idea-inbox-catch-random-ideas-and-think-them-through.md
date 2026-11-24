<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# An idea inbox: catch random ideas and think them through

- **Date**: 2026-11-24
- **Iteration**: 1
- **Status**: Draft
- **Deciders**: Kathryn Chiew (human), Wren 5.5 (Claude Opus 5.5)

**TL;DR**: Kathryn has ideas at random moments in the day. This decides how to catch one in under 10 seconds, and how this project's thinking method (brain dump → questions → decision → build) then turns the good ones into things she builds.

---

## Originating Context

**Source**: Human request, 2026-11-24, in conversation:

> "I also have a lot of ideas that i always want to generate -- things that i'm interested in doing, out of random sporatic moments in the day, with this, incorporated with the AI harness that i ahve, is there anyway which we can take this thinking medothology into this and then adapt it too?"

**Agency Grant**: Explore options; Kathryn picks.

---

## Explicitation

**What I understand**:

1. **Catching**: ideas show up at random times. If saving one takes more than a few seconds, it's lost. Catching must never ask questions.
2. **Thinking**: this repo already has a method for turning a messy thought into a decision: a brain dump becomes an ADR with questions (QSTs), answers, then a build. Kathryn wants that method for her own ideas, inside the page.
3. **Fit with ADR-0006**: the "coach" planned in ADR-0006 (multiple-choice questions about what to build) is the natural tool for thinking an idea through. The idea inbox would feed it.

**Assumptions**:

- Ideas are personal. This repo is **public** (checked 2026-11-24), so anything saved as a file in it can be read by anyone.
- The page's saved data lives in one browser on one device (localStorage). An idea typed on the phone does not show up on the laptop by itself.
- One idea moves one step at a time, like the lesson steps (ADR-0006, QST-ONE-AT-A-TIME).

**Confirm**: Kathryn, through the two questions below.

---

## Questions

### QST-IDEA-CATCH: How should you catch an idea in under 10 seconds?
- Status: unanswered
- Why asking: This decides what gets built first, and it depends on where you are when ideas show up. The page saves to one browser on one device, and this repo is public, so "where" and "private" pull against each other.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — 💡 box in the page**: A 💡 button always on screen. Type one line, press Enter, saved. Private. Ideas stay in the browser where you typed them: phone ideas on the phone, laptop ideas on the laptop.
- **B — 💡 box, plus move them by hand**: Same as A, plus "Copy my ideas" and "Paste ideas" buttons, so you can move phone ideas to the laptop (for example, by texting them to yourself).
- **C — a private GitHub repo as the inbox**: On your phone, one idea = one new issue in a private "ideas" repo (GitHub app). The page shows them using a GitHub key saved like your OpenRouter key. Works on every device and Wren can read them in VS Code. About 20 minutes of setup and a second key in the browser.
- **D — just tell Wren**: At the laptop, type "idea: …" in the Claude panel; Wren saves it in this repo. Nothing new to build, but laptop only, and public.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-24)

**A — 💡 box in the page.** *Rationale*: it is the fastest to use (one button, one line), stays private, needs no setup, and takes about an hour to build. It also works on the phone if you open the page there. *Confidence*: 0.6 — because it depends on where your ideas come up, which only you know. *If wrong*: if most ideas come on your phone and you want them on the laptop too, pick **C** (or **B** if you'd rather not set up a second key).

**ANS:** (by Kathryn Chiew)
[Fill this in]   <!-- literal placeholder — parser-significant, do not paraphrase -->

---

### QST-IDEA-THINK: What happens to an idea after you catch it?
- Status: unanswered
- Why asking: This is where the project's thinking method comes in. Catching never asks questions; this decides how an idea gets thought through later, and by what.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — a list you pick from**: Ideas wait in a list. When you want, you pick one and start building. No AI involved.
- **B — "Think it through" button**: On any saved idea, the page's AI (your key, a few cents) asks you 3 multiple-choice questions: who it's for, what the smallest version is, which course week it uses. Then it writes a short plan you can save with the idea. This is the ADR-0006 coach, fed by your ideas.
- **C — Wren makes it an ADR**: In VS Code: "Wren, think through my idea about …". Wren writes an ADR with questions, like this one, and you answer.
- **D — all three, as a ladder**: Each idea moves one step at a time: **Caught** → **Thought through** (B, in the page) → **Decided** (C, an ADR with Wren, only for ideas worth building) → **Building** (it becomes a project, or your Capstone). Most ideas stop early, and that's fine.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-24)

**D — all three, as a ladder.** *Rationale*: the ladder is this repo's own method at a smaller size: catching = brain dump, "Think it through" = questions, ADR = decision, then build. The quick in-page step filters ideas before anything costs your time in VS Code. It also builds the ADR-0006 coach as a side effect. *Confidence*: 0.7 — because it matches the method you asked for; it drops if three stages feel like too many. *If wrong*: if you want ideas to go straight from list to building, pick **A**; if thinking it through in the page is enough and ADRs feel heavy, pick **B**.

**ANS:** (by Kathryn Chiew)
[Fill this in]   <!-- literal placeholder — parser-significant, do not paraphrase -->

---

## Supporting Materials

### DOC: the ladder, step by step (QST-IDEA-THINK = D)

1. **Caught**: one line, saved instantly. No questions.
2. **Thought through**: "Think it through" asks 3 multiple-choice questions, then writes a short plan.
3. **Decided**: worth building? Wren writes an ADR; you answer its questions.
4. **Building**: it becomes a project (its own repo from the ADRs4AI template) or your Capstone.

Each idea can also be **parked** (keep, not now) or **dropped** at any step.

### FIL: what to look at
- [ADR-0006](0006-what-my-harness-should-become-a-building-project-harness.md): the studio plan; the coach is its next piece.
- `src/lib/storage.js`: where the page saves everything (one browser, one device).

---

## Decision

*Waiting for Kathryn's answers to QST-IDEA-CATCH and QST-IDEA-THINK.*

---

## Action Items

- [ ] Answer QST-IDEA-CATCH and QST-IDEA-THINK - Owner: Kathryn Chiew
- [ ] Build the catching piece, with tests, and push it live - Owner: Wren 5.5

---

## Iterations

### Iteration 1 (2026-11-24)
- Trigger: Kathryn's request to catch random ideas and think them through with the project's method
- Contributors: Kathryn Chiew (the ask), Wren 5.5 (questions, recommendations)
- Changes: two questions (how to catch, what happens next) and the ladder draft
- Outcome: Draft; waiting for answers

---

## Links

- Related ADRs: [ADR-0006](0006-what-my-harness-should-become-a-building-project-harness.md) (studio, coach, one step at a time), [ADR-0005](0005-a-personal-skills-folder-with-i-have-adhd-always-on.md) (i-have-adhd)
