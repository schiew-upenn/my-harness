<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# Week 1 — Prompting and instructions

- **Date**: 2026-11-12
- **Iteration**: 4
- **Status**: Accepted
- **Deciders**: Kathryn Chiew (student), Wren 5.5 (Claude Opus 5.5, instructor)

**TL;DR**: Week 1 of the AI-building course: learn how the instructions an AI reads *before* your message shape every answer, then add an Instructions feature to the chat page and test it with a three-way experiment (~1–2 hours, under $0.05 of the key).

---

## Originating Context

**Source**: `ADR-0003` — the course syllabus, Week 1 (accepted 2026-11-12: full course, as drafted, about 1–2 hours a week, Weeks 1–3 built in this page).

**Agency Grant**: Wren plans and teaches; Kathryn makes the two decisions below, runs the experiment, and writes the reflection.

---

## Explicitation

### The lesson (read this first — about 10 minutes)

**1. What the AI actually receives.** When you press Send, the page doesn't just send your latest message. It sends the *whole conversation* as a list, each item labeled with who said it. You can see this in `src/lib/openrouter.js`:

```json
{
  "model": "openai/gpt-4o-mini",
  "messages": [
    { "role": "user",      "content": "What is a stack?" },
    { "role": "assistant", "content": "A stack is..." },
    { "role": "user",      "content": "And a queue?" }
  ]
}
```

The AI has no memory between requests. Each time, it reads this list from the top and writes the next message. That's why your chats need saving: the *page* remembers, not the AI.

**2. The "system" message.** There's a third role besides `user` and `assistant`: **`system`**. A system message sits at the very top of the list, and the AI treats it as standing instructions for the whole conversation, for example *"You are a patient tutor. Explain step by step for a beginner, and end with a question that checks my understanding."* It's often called the **system prompt**. Every AI product you've used (ChatGPT, Claude, the agents in your professor's course) has one, usually hidden. Changing it is the cheapest, most powerful way to change how an AI behaves.

**3. Why it matters for everything after this.** Weeks 3–8 (tools, automation, skills, crews) are all, underneath, carefully written instructions plus a little code. A skill is a system prompt that loads when needed. An agent is a system prompt plus tools. Learning to write and *test* instructions is the foundation.

### This week's plan

| Part | What you do | Time |
|---|---|---|
| Learn | Read the lesson above | ~10 min |
| Decide | Answer QST-WHERE and QST-PRESETS below | ~5 min |
| Build | Wren builds the Instructions feature you chose, with tests; it goes live | ~30–45 min together |
| Experiment | Ask **the same question** — "Explain recursion" — under 3 different instructions; compare the answers | ~20 min |
| Reflect | Answer QST-REFLECTION in 2–3 sentences | ~5 min |

**Cost**: with `openai/gpt-4o-mini`, the whole experiment is a handful of short replies, a fraction of a cent each. Well under $0.05 of your $10.

**Assumptions**:
- You'll use `openai/gpt-4o-mini` (or another cheap model) in Settings for the experiment.

**Confirm**: Kathryn — does this week's size look right for about 1–2 hours?

---

## Questions

### QST-WHERE: Should instructions apply to all chats, or can each chat have its own?
- Status: answered
- Why asking: The instructions are the "system" message the AI reads first. They can live in one place for everything, or be set per chat, so a "Tutor" chat and a "Code helper" chat behave differently side by side. This decides where the Instructions box appears and how the experiment works.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — one for all chats**: A single Instructions box in Settings. Every chat follows it. Simplest; to compare, you change it between questions.
- **B — each chat has its own**: An Instructions box at the top of each chat. New chats start with your default. Different chats can behave differently at the same time, and the sidebar shows them side by side.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**B — each chat has its own.** *Rationale*: This week's experiment is "same question, three instructions, compare." With B that's three chats you can flip between in the sidebar; with A you'd have to keep editing Settings and remember earlier answers. B also matches how real AI products work (each assistant or agent has its own system prompt), which is where Weeks 3–8 go. It's a little more code than A (instructions saved with each chat, in `src/lib/chats.js`) but fits the week. *Confidence*: 0.7 — because the experiment is much clearer with B. *If wrong*: if one consistent behavior everywhere is all you want, take **A**.

**ANS:** (by Kathryn Chiew)
B

---

### QST-PRESETS: Which ready-made instructions should the page offer?
- Status: answered
- Why asking: Writing good instructions from a blank box is hard on day one. Presets are ready-made instructions you pick with one click and can then edit. They also become the three sides of this week's experiment.
- Need: pick a letter, several, or write your own (or override — any shape answers)

Options:
- **A — three presets**: **Patient tutor** (step by step, for a beginner, ends with a check-your-understanding question), **Coding helper** (code first, then a short explanation), **Plain** (no instructions at all, to see the AI's default behavior). Each one editable after picking.
- **B — blank box only**: No presets; you write every instruction yourself. Good practice, slower start.
- **C — presets + save your own**: A, plus a "Save as preset" button so instructions you write become one-click options too.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — three presets.** *Rationale*: The three presets *are* the experiment: Plain shows the default, and Tutor and Coding helper show two very different directions, so the differences are easy to see. Everything stays editable, so you still practice writing your own. C's "save your own" is a nice extra, but it adds building beyond the 1–2 hour budget (ADR-0003 QST-PACE = A); it can be a stretch goal or come back later. *Confidence*: 0.7 — because A gives the experiment its three sides at the smallest size. *If wrong*: if you'd rather have presets that match your own courses (say, a "CIS 7000 study buddy"), tell me the presets you want; any list overrides mine.

**ANS:** (by Kathryn Chiew)
A

---

### QST-REFLECTION: After the experiment, what did you notice?
- Status: answered
- Why asking: Reflection is where the week's learning becomes yours (ADR-0003, "How each week runs", step 4). Write it after you've compared the three answers to "Explain recursion".
- Need: 2–3 sentences, in your own words

Options: none (elicitation)

Some prompts if you're stuck: How did the three answers differ in length, tone, or structure? Which would you actually want when studying, and why? Did anything surprise you about how much a few sentences of instructions changed the AI?

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

No pick, since this one is yours alone. *Rationale*: an instructor can't answer what the student noticed. *Confidence*: n/a — because there is no lean to be confident about. *If wrong*: n/a.

**ANS:** (by Kathryn Chiew, 2026-11-12, given in conversation after the experiment)
The easiest was obviously the patient tutor. It used simpler words, for someone who is not technical.

---

## Decision

### Chosen (answered by Kathryn Chiew, 2026-11-12)

- **QST-WHERE = B, each chat has its own instructions.** An Instructions bar at the top of each chat; the chat saves its instructions with its messages; new chats start from a default chosen in Settings. The sidebar shows which preset each chat uses, so the three experiment chats are easy to tell apart.
- **QST-PRESETS = A, three presets**: Patient tutor, Coding helper, Plain (no instructions). Picking one fills the box; the text stays editable.

### How it works
When a chat has instructions, the page puts them first in the messages list as a `system` message (`src/lib/openrouter.js`); an empty box sends no system message at all, which is what "Plain" means.

---

## Open Follow-ups

- [ ] Stretch goal (if time allows): "Save as preset" (QST-PRESETS option C).
- [ ] After the reflection: tick off Week 1 in the page's 📚 Course panel, and Wren proposes Week 2 ("models & money").

---

## Action Items

- [ ] Read the lesson; answer QST-WHERE and QST-PRESETS - Owner: Kathryn Chiew
- [x] Build the Instructions feature with tests; deploy - Owner: Wren 5.5
- [x] Run the three-way experiment; answer QST-REFLECTION - Owner: Kathryn Chiew

---

## Iterations

### Iteration 1 (2026-11-12)
- Trigger: ADR-0003 accepted (syllabus as drafted, starting Week 1)
- Contributors: Wren 5.5 (lesson plan)
- Changes: lesson, plan, two decisions, one deferred reflection
- Outcome: Draft; awaiting Kathryn's decisions

### Iteration 2 (2026-11-12)
- Trigger: Kathryn answered WHERE (B) and PRESETS (A), wrote "i dont understand this?" in the reflection slot, and said "read and proceed"
- Contributors: Kathryn Chiew (answers), Wren 5.5 (processing, build)
- Changes: Decision recorded; Instructions feature built. Wren tried restoring the reflection's slot to the placeholder, but the ADR extension re-applied Kathryn's draft, so her text stands for now. It is a question, not a reflection; it was explained in conversation, and Kathryn replaces it with her real reflection after the experiment.
- Outcome: `Draft → Accepted`; QST-REFLECTION's current "answered" is a placeholder state until then

### Iteration 3 (2026-11-12)
- Trigger: Kathryn ran the three-way experiment ("Explain recursion" under Plain, Patient tutor, Coding helper) on the live page and reported back in conversation
- Contributors: Kathryn Chiew (experiment, reflection), Wren 5.5 (recording)
- Changes: QST-REFLECTION answered with her words, replacing the earlier question; action items closed
- Outcome: Week 1 complete — Accepted and done; next is Week 2 ("models & money")

### Iteration 4 (2026-11-12)
- Trigger: Kathryn: "there was no lesson taught" — correct: the lesson lived only in this file
- Contributors: Kathryn Chiew (the catch), Wren 5.5 (teaching)
- Changes: lesson taught in conversation, using her own experiment as the example, plus a hands-on exercise writing her own instructions; course routine fixed in ADR-0003 iteration 3
- Outcome: Week 1 reopened until the exercise is done

---

## Glossary (optional)

- **System prompt / system message**: standing instructions placed first in the conversation; the AI follows them throughout.
- **Role**: who a message is from: `system` (instructions), `user` (you), `assistant` (the AI).
- **Preset**: a ready-made set of instructions you can pick with one click.

---

## Links

- Related ADRs: [ADR-0003](0003-a-week-by-week-ai-building-curriculum.md) (the course); [ADR-0001](0001-first-decisions-for-the-chat-harness.md) (the request shape)
- Related code: `src/lib/openrouter.js` (where the messages list is built)
