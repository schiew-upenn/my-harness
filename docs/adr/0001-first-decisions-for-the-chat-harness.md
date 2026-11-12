<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# First decisions for the chat harness

- **Date**: 2026-11-12
- **Iteration**: 2
- **Status**: Draft
- **Deciders**: Kathryn Chiew (human), Wren 5.5 (Claude Opus 5.5)

**TL;DR**: Before any code, settle three things for the backend-free chat page — how the OpenRouter key gets in and where it lives, whether the page has a build step, and what localStorage remembers.

---

## Originating Context

**Source**: `Human prompt (below)` — the course project prompt from Kathryn's professor, pasted 2026-11-12 in place of the getting-started guide's Wordle example.

> I want to build a simple harness: a chat page interface online
> - github pages only (no backend)
> - openrouter API keys through CORS on the frontend
> - storage in local storage

The guide's recruitment mission asked: "Before you write any code: what are the 2–3 decisions we should settle first? Put them to me as proper QST cards in the record — with your recommendation on each."

**Agency Grant**: Explore options and recommend; no code until these are answered.

---

## Explicitation

**What I understand**:

1. **No backend** — GitHub Pages only serves files. Everything (the chat logic, the call to the AI) runs in the visitor's browser. There is no server of ours to hide a secret on.
2. **OpenRouter from the browser** — the page calls OpenRouter's chat API (`https://openrouter.ai/api/v1/chat/completions`) directly with `fetch`. "Through CORS" means OpenRouter allows a web page on another site (ours) to call it.
3. **localStorage** — the browser's small built-in storage for this site (roughly 5 MB). It survives reloads and closing the browser, but it lives only in that one browser on that one computer.

**Assumptions**:

- Each visitor brings **their own** OpenRouter API key. The repo is public, so a key written into the code would be visible to anyone and quickly stolen — that is a constraint, not an option.
- OpenRouter currently accepts browser (cross-origin) requests. The prompt says so; I have not yet tested it from this machine — the first spike verifies it (see Open Follow-ups).
- "Simple" means a working chat first; extras (multiple models, markdown, streaming) come after.

**Confirm**: Kathryn — does this match the assignment as your professor intends it?

---

## Questions

### QST-API-KEY: How does the visitor's OpenRouter key get into the page, and where is it kept?
- Status: answered
- Why asking: The page has no server, so the visitor's own API key has to live in their browser. That key can spend their money, so where it is kept is the main safety decision of the project. The answer shapes the settings screen and how careful the rest of the code must be.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — paste and remember**: The visitor pastes their key into a settings box once; it is saved in localStorage so it is still there next visit. A "Forget key" button deletes it. Simplest. Weakness: anything that runs code on our page could read it, so the page must stay free of untrusted scripts.
- **B — paste every visit**: Same paste box, but the key is kept only while the tab is open (sessionStorage) and disappears when it closes. Safer if the computer is shared; mildly annoying to re-paste each time.
- **C — sign in with OpenRouter**: A "Connect OpenRouter" button sends the visitor to openrouter.ai to log in and approve; OpenRouter sends back a key made for this app (OpenRouter's PKCE sign-in flow), which is then saved like A. No copying secrets by hand, and the visitor can see/limit that key on OpenRouter. More code, and a redirect round-trip to get right.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — paste and remember.** *Rationale*: The prompt names localStorage as the storage, and A is the least code between "empty page" and "working chat." A's one weakness (scripts on our page could read the key) is handled by two rules we would follow anyway: load no third-party scripts, and put the AI's replies on screen as plain text, never as HTML, so a reply cannot inject code. C is a good later upgrade and can reuse A's storage unchanged. *Confidence*: 0.7 — because A is the standard pattern for bring-your-own-key static apps and its risks are known; I have not yet run OpenRouter's sign-in flow, so C's real cost is an estimate. *If wrong*: if the page is meant for classmates or other people who don't already have an OpenRouter key (or wouldn't know how to make one), this flips to **C**; if it will be used on shared lab computers, it flips to **B**.

**ANS:** (by Kathryn Chiew)
A

---

### QST-STACK: Is the page plain files, or built with a framework and a build step?
- Status: answered
- Why asking: GitHub Pages can serve plain files as-is, or serve the output of a build tool (which then needs an automatic GitHub Actions job to build it on every push). This choice decides what files we write, how we test, and how "Ship it" (deploying to https://schiew-upenn.github.io/my-harness/) works.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — plain files, no build**: `index.html`, one CSS file, and a few JavaScript files. GitHub Pages serves them directly. Tests for the logic (building requests, saving/loading chats) run with Node's built-in test runner — no extra packages to install.
- **B — framework + build (e.g. Vue or React with Vite)**: Components and a build step; needs `npm install`, a GitHub Actions workflow to build and publish, and more files to understand. Pays off when the interface gets large.
- **C — framework from a CDN, no build**: Plain files, but the page downloads a framework (e.g. Vue) from a public CDN when it opens. No build step, but the page now runs someone else's script — which matters next to an API key (see QST-API-KEY).

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — plain files, no build.** *Rationale*: A chat page is a message list, an input box, and a settings box — small enough that a framework adds more to learn than it saves. A deploys by just pushing, which keeps Chapter 3's Step 8 short. Node is already installed on this Mac (`node --version` → v26.0.0, checked 2026-11-12, though the setup notes said it wasn't), so `node --test` gives us real tests with zero dependencies, and the Fifth Directive's gate (`just gate`) can run them. C is ruled out mostly by QST-API-KEY's "no untrusted scripts" rule. *Confidence*: 0.75 — because the feature list in the prompt is short and fixed; it would drop if the interface is expected to grow a lot. *If wrong*: if the course expects a framework (the guide's own example used Vue), or the page grows past roughly one screen of controls (chat list, settings panels, markdown rendering), this flips to **B**.

**ANS:** (by Kathryn Chiew)
B

---

### QST-STORAGE: What does the page remember in localStorage?
- Status: answered
- Why asking: "Storage in local storage" can mean very different amounts of app. Remembering one chat is a small feature; a list of saved chats (like the sidebar in ChatGPT) roughly doubles the interface. localStorage also has a size limit (about 5 MB per site), so long histories eventually need trimming.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — one saved chat**: The current conversation is saved and comes back after a reload; a "New chat" button clears it. Settings (key, chosen model) are saved too.
- **B — a list of saved chats**: A sidebar of past conversations you can switch between, rename, and delete. Each chat saved with its title, model, and messages.
- **C — settings only**: Only the key and model choice are saved; the conversation is gone when the page reloads.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — one saved chat, stored in a shape that can hold many.** *Rationale*: A delivers what the prompt asks (chats survive a reload) with the smallest interface. Saving it in a versioned format that already holds a *list* of chats (with just one in it) means moving to B later is purely an interface change — no saved data is lost or converted. C under-reads the prompt. *Confidence*: 0.6 — because this is mostly a product-taste call, which is yours, not mine. *If wrong*: if you'd want several chats going at once (say, one per class or topic), this flips to **B**.

**ANS:** (by Kathryn Chiew)
B

---

### QST-FRAMEWORK: Which framework, now that the page uses one?
- Status: unanswered
- Why asking: Kathryn answered QST-STACK with **B** (a framework with a build step), but B named two candidates ("e.g. Vue or React"), so the answer leaves the actual toolkit open. Every file we write depends on it. With any of these, the page is built by Vite (the build tool) and published to https://schiew-upenn.github.io/my-harness/ by an automatic GitHub Actions job on each push. Follow-up to QST-STACK.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — Vue**: Each piece of the screen (chat list, message area, settings) is one `.vue` file holding its HTML, its JavaScript, and its own styles (scoped CSS: a component's styles can't leak onto the rest of the page). Reads close to plain HTML. It's the framework the course guide's own example project used.
- **B — React**: The most widely used framework, and the most job-market demand. Screens are written in JSX (HTML-like markup inside JavaScript), which takes more getting used to; styles are handled separately (no built-in scoped CSS).
- **C — Svelte**: Small and tidy; components look much like plain HTML. Fewer tutorials and examples than Vue or React.

**Recommendation**: (by Wren 5.5, Claude Opus 5.5, 2026-11-12)

**A — Vue.** *Rationale*: The course guide's example project was specified as "Vue using scoped CSS" (Step 5's mission text), so Vue matches what the course demonstrates and any examples your classmates follow. Vue's one-file-per-component layout (`ChatList.vue`, `MessageView.vue`, `SettingsPanel.vue`) is the easiest of the three to read with limited coding background, and scoped CSS keeps the sidebar's styles from breaking the chat area's. Testing works the same way in all three (Vitest), so that doesn't separate them. *Confidence*: 0.75 — because the course connection is concrete; this drops if the professor has a different framework in mind. *If wrong*: if the professor expects or prefers React, or you specifically want React for job-market reasons, this flips to **B**.

**ANS:** (by Kathryn Chiew)
[Fill this in]   <!-- literal placeholder — parser-significant, do not paraphrase -->

---

## Supporting Materials

### DOC: references
- OpenRouter API — chat completions endpoint: `POST https://openrouter.ai/api/v1/chat/completions` with header `Authorization: Bearer <key>` (OpenAI-compatible request/response shape).
- OpenRouter OAuth PKCE (for QST-API-KEY option C): https://openrouter.ai/docs (search "OAuth PKCE").
- Course guide: https://jlumbroso.github.io/adrs4ai-getting-started/docs/03-first-project/

---

## Decision

### Context
A backend-free chat page on GitHub Pages that calls OpenRouter from the browser and keeps its data in localStorage (the professor's prompt, above).

### Chosen (answered by Kathryn Chiew, 2026-11-12)

- **API key — QST-API-KEY = A, paste and remember.** The visitor pastes their OpenRouter key into a settings box; it is saved in localStorage, with a "Forget key" button. Supporting fact (Kathryn, in conversation): the professor hands each student an OpenRouter key, so users already have one — the recommendation's flip-to-C condition does not hold.
- **Stack — QST-STACK = B, a framework with a build step** (Kathryn overrode the recommended A). Which framework is QST-FRAMEWORK, still open. Consequences regardless of framework: Vite builds the site; a GitHub Actions workflow builds and publishes to GitHub Pages on each push (the repo's Pages source must be set to "GitHub Actions"); `npm install` brings in packages, which are bundled into the site at build time — nothing loads from a third-party CDN, so QST-API-KEY's "no untrusted scripts" rule still holds.
- **Storage — QST-STORAGE = B, a list of saved chats** (Kathryn overrode the recommended A). A sidebar of conversations: create, switch, rename, delete. Saved as one versioned localStorage record holding settings plus the list of chats (each with id, title, model, messages, timestamps).

### Rules that follow from these
- The API key is never written into any repository file, and is only ever sent to `openrouter.ai`.
- AI replies are displayed as text, never inserted as raw HTML (a reply must not be able to run code next to the key).
- The verification gate (`just gate`) gains the app's tests and build once the project is scaffolded.

### Consequences
- More to build than the recommended path: a framework project plus a chat sidebar. Worth it for the features Kathryn wants; keep the first version small (one model, no streaming) and grow.
- Step 8 (ship it) includes turning on GitHub Actions publishing in the repo's Pages settings.

---

## Open Follow-ups

- [ ] Unverified assumption: OpenRouter accepts calls from a GitHub Pages origin. Verify with a tiny one-file test page before building the real one.
- [ ] Future task: streaming replies (words appearing as they're written) vs. waiting for the whole reply — decide after the first version works.
- [ ] Future task: which model(s) to offer, and whether to show cost per message.
- [ ] Concern: GitHub Pages for a *public* repo is public — anyone can open the page. That is fine as long as no key is ever in the code (see Assumptions).

---

## Action Items

- [x] Answer QST-API-KEY, QST-STACK, QST-STORAGE - Owner: Kathryn Chiew
- [x] Fill the Decision section and bump the iteration - Owner: Wren 5.5
- [ ] Answer QST-FRAMEWORK - Owner: Kathryn Chiew
- [ ] Scaffold the project with the chosen framework; add its tests and build to `just gate` - Owner: Wren 5.5

---

## Validation

- [ ] Kathryn Chiew: Decision captured matches intent (and the professor's prompt)
- [ ] Wren 5.5: Approach is implementable on GitHub Pages with no backend

---

## Iterations

### Iteration 1 (2026-11-12)
- Trigger: initial draft from the professor's project prompt, at the guide's Chapter 3 Step 5
- Contributors: Kathryn Chiew (prompt), Wren 5.5 (framing, recommendations)
- Changes: three decision questions with recommendations
- Outcome: Draft; awaiting answers

### Iteration 2 (2026-11-12)
- Trigger: Kathryn answered all three questions (API-KEY A; STACK B, overriding the recommended A; STORAGE B, overriding the recommended A), plus a fact from class: the professor provides each student an OpenRouter key
- Contributors: Kathryn Chiew (answers), Wren 5.5 (processing)
- Changes: Decision section filled; QST-STACK's answer left the framework unnamed, so follow-up QST-FRAMEWORK minted (recommendation: Vue)
- Outcome: stays Draft until QST-FRAMEWORK is answered

---

## Glossary (optional)

- **CORS**: the browser rule that decides whether a page on one site may call another site's API. OpenRouter allowing it is what makes "no backend" possible.
- **localStorage**: per-site storage built into the browser; survives reloads, stays on that one device.
- **Build step**: a tool that turns source files into the files actually served; plain-files sites skip it.

---

## Links

- Related ADRs: none yet
- Related code: none yet
