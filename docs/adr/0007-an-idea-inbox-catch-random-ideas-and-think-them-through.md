<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# An idea inbox: catch random ideas and think them through

- **Date**: 2026-11-24
- **Iteration**: 3
- **Status**: Accepted
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
- Status: answered
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
A

---

### QST-IDEA-THINK: What happens to an idea after you catch it?
- Status: answered
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
I think i want it sort of a mix of B and D where we think through it, ponder upon the idea, idea a little bit with wren, and then do something with it. Can we do that?

---

### QST-PONDER-WHERE: Where do you ponder an idea "with Wren"?
- Status: answered
- Why asking: Follow-up to QST-IDEA-THINK. Your ideas are saved in the page (in the browser). Wren is Claude in VS Code, which can't see what the page saves. So step 3 of the ladder either moves the idea to VS Code, or happens inside the page with the page's AI playing Wren's role.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — in the page**: A "Ponder" button on a thought-through idea opens a chat that already knows the idea and its plan, with an AI that acts as a thinking partner (asks one question at a time, suggests, pushes back). Uses your OpenRouter key, a few cents per chat. Everything stays in one place.
- **B — in VS Code with Wren**: A "Copy for Wren" button copies the idea and its plan; you paste it into the Claude panel in VS Code. Wren can also look at your code and start building right away. Free (uses your Claude account), but you switch windows.
- **C — both**: Ponder in the page for small ideas; "Copy for Wren" when it's time to build.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-24)

**C — both.** *Rationale*: pondering is quick and happens right after "Think it through", so keeping it in the page avoids switching windows. Building happens in VS Code anyway (ADR-0006's session routine, step "Learn it with Wren"), so "Copy for Wren" is the hand-off. *Confidence*: 0.65 — because "with Wren" may mean you specifically want Claude in VS Code, not the page's AI. *If wrong*: if you meant VS Code, pick **B**; if you'd rather never leave the page, pick **A**.

**ANS:** (by Kathryn Chiew)
C

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

### Chosen (answered by Kathryn Chiew, 2026-11-24)

- **Catch, QST-IDEA-CATCH = A, 💡 box in the page**: one button, one line, Enter, saved. Private; stays in the browser where it was typed.
- **Think, QST-IDEA-THINK = a mix of B and D**: "we think through it, ponder upon the idea a little bit with wren, and then do something with it."

### The ladder, as answered

1. **Caught**: one line in the 💡 box. No questions.
2. **Thought through**: "Think it through" asks 3 multiple-choice questions, then writes a short plan (B).
3. **Pondered with Wren**: a short back-and-forth about the idea. No ADR needed.
4. **Do something**: build it, park it, or drop it. Only "build it" gets an ADR (D's last steps).

Compared with D as drafted: the ADR step is no longer required for every idea. Ideas that get built still get one.

### Where the pondering happens (QST-PONDER-WHERE = C, both; answered by Kathryn Chiew, 2026-11-24)
Step 3 happens in the page: a "Ponder" chat that already knows the idea and its plan (OpenRouter key). When an idea moves to step 4 and gets built, a "Copy for Wren" button hands it to Wren in VS Code.

---

## Action Items

- [x] Answer QST-IDEA-CATCH and QST-IDEA-THINK - Owner: Kathryn Chiew
- [x] Answer QST-PONDER-WHERE (C, both) - Owner: Kathryn Chiew
- [ ] Build the 💡 box (step 1, caught), with tests, and push it live - Owner: Wren 5.5
- [ ] Build "Think it through" (step 2), then pondering (step 3) - Owner: Wren 5.5

---

## Iterations

### Iteration 1 (2026-11-24)
- Trigger: Kathryn's request to catch random ideas and think them through with the project's method
- Contributors: Kathryn Chiew (the ask), Wren 5.5 (questions, recommendations)
- Changes: two questions (how to catch, what happens next) and the ladder draft
- Outcome: Draft; waiting for answers

### Iteration 2 (2026-11-24)
- Trigger: Kathryn answered QST-IDEA-CATCH = A and QST-IDEA-THINK = "a mix of B and D"
- Contributors: Kathryn Chiew (answers), Wren 5.5 (processing)
- Changes: Decision filled: 💡 box, and a four-step ladder (caught, thought through, pondered with Wren, do something), with an ADR only for ideas that get built. Follow-up QST-PONDER-WHERE minted, because the page's saved ideas can't be seen by Wren in VS Code.
- Outcome: stays Draft until QST-PONDER-WHERE is answered; step 1 (the 💡 box) can be built now

### Iteration 3 (2026-11-24)
- Trigger: Kathryn answered QST-PONDER-WHERE = C
- Contributors: Kathryn Chiew (answer), Wren 5.5 (processing)
- Changes: pondering happens in the page; "Copy for Wren" hands built ideas to VS Code
- Outcome: `Draft → Accepted`

---

## Links

- Related ADRs: [ADR-0006](0006-what-my-harness-should-become-a-building-project-harness.md) (studio, coach, one step at a time), [ADR-0005](0005-a-personal-skills-folder-with-i-have-adhd-always-on.md) (i-have-adhd)
