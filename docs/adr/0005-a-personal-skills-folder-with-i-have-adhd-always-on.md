<!-- adr template version: "adr-madr 3.12.0" -->
<!-- kept in deliberate homage to MADR — Markdown Architectural Decision Records, the lineage this template family descends from. This is the simple-decisions form: use it when a decision needs recording, not discussion. The deliberation-native form is adr.md. Mint with `just adr "<title>" madr`. (Ruling: QST-MADR-FATE, 2026-08-13 — "keeping the template, acknowledging it, is good form.") -->

# A personal skills folder, with i-have-adhd always on

* Status: Accepted
* Deciders: Kathryn Chiew (human), Wren 5.5 (Claude Opus 5.5)
* Date: 2026-11-19

**TL;DR**: Kathryn keeps her own Claude skills in `~/.claude/skills/` so they work in every project. The first one, [i-have-adhd](https://github.com/ayghri/i-have-adhd), is switched on for every reply by `~/.claude/CLAUDE.md`.

Technical Story: Kathryn, 2026-11-19: *"I want to also build a skills folder where i will pre-load certain skills. For this one, i want this to be the format of all responses that claude provides for me"*, with a link to https://github.com/ayghri/i-have-adhd.

## Context and Problem Statement

Kathryn wants a folder of skills she picks herself, and she wants the first one, i-have-adhd, to shape **every** reply Claude gives her. i-have-adhd is one instruction file (`SKILL.md`, MIT license) with ten rules: put the next action first, number the steps, restate where things stand, no filler openers or closers, and so on. Out of the box it only switches on when you type `/i-have-adhd` (`disable-model-invocation: true`) and it lasts one session. So "every reply" needs a second piece that loads it automatically.

## Decision Drivers

* "All responses" means every project, including the separate repos planned for Weeks 4–8 ([ADR-0003](0003-a-week-by-week-ai-building-curriculum.md), QST-COURSE-RULES).
* She should be able to change the rules herself, so a copy she owns works better than an installed plugin that updates on its own.
* Keep the setup small: Kathryn's course pace is 1–2 hours a week (ADR-0003, QST-PACE).

## Considered Options

* **All my projects**: personal folder `~/.claude/skills/` plus `~/.claude/CLAUDE.md`
* **Only my-harness**: this repo's `.claude/skills/` plus this repo's `CLAUDE.md`, saved in git
* **Both, kept in git**: the real copy lives in a repo and the personal folder points to it

## Decision Outcome

Chosen option: "**All my projects**" (Kathryn's pick, 2026-11-19), because it's the only option that reaches every project with no extra setup.

What was set up (outside this repo, so not in git):

* `~/.claude/skills/i-have-adhd/SKILL.md` and `LICENSE`, copied unchanged from upstream `main` on 2026-11-19.
* `~/.claude/CLAUDE.md`, which Claude Code reads at the start of every session in every project. It says the rules are always on, keeps any project's own required pieces (like the "Written for:" line) working inside that format, and pulls in the full rules with `@~/.claude/skills/i-have-adhd/SKILL.md`.
* "stop adhd mode" or "normal mode" still turns the rules off for the rest of one session.

### Positive Consequences

* Every new session in every project answers in this format from the first message.
* New skills are added the same way: put a folder in `~/.claude/skills/`.

### Negative Consequences

* The personal folder isn't in git. If the laptop is wiped, the setup is gone, though it can be rebuilt from this record and the upstream repo.
* The rules push toward short replies, while the course's "Teach it" step (ADR-0003, step 1b) needs full explanations. The skill already handles this: it makes an exception when asked to "explain" or "walk me through" something, and lessons should be taught under that exception.
* The upstream copy may change later; this copy won't pick up those changes unless someone copies them in.

## Open question

### QST-CHAT-PAGE-ADHD: Should the chat page also get an "ADHD-friendly" preset?
- Status: answered
- Why asking: This record only changes how *Claude Code* answers you. The AI in your chat page (through OpenRouter) still answers the old way. The Instructions box from Week 1 could offer these rules as a fourth preset.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — add a preset**: A fourth preset, "ADHD-friendly", that puts a short version of the ten rules into a chat's instructions. Small build with tests, about 30 minutes.
- **B — not now**: Leave the page alone. You can paste the rules into the Instructions box yourself whenever you want them.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-19)
**B — not now.** *Rationale*: Week 1's exercise (writing your own instructions, [ADR-0004](0004-week-1-prompting-and-instructions.md) iteration 4) is still open, and turning these rules into your own instructions *is* that exercise. Doing it yourself teaches more than me adding a preset. *Confidence*: 0.6, because it depends on whether you want the practice or just the result. *If wrong*: if you'd rather have it ready to use in the page now, flip to **A**.

**ANS:** (by Kathryn Chiew)
A

---

## Action Items

- [ ] Add an "ADHD-friendly" preset to the chat page's Instructions box (QST-CHAT-PAGE-ADHD = A, 2026-11-19), with a test - Owner: Wren 5.5

---

## Links

* Related to [ADR-0003](0003-a-week-by-week-ai-building-curriculum.md): Week 5 ("Skills") will build a skill of her own; this record is her first look at one.
* Related to [ADR-0004](0004-week-1-prompting-and-instructions.md): a skill is a packaged version of the instructions taught in Week 1.
