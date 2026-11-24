// The lessons the home screen shows, and each lesson's steps (docs/adr/0006).
//
// QST-LESSON-SOURCE = C: Wren writes each lesson's core here, ahead of time
// (why it's useful, how CS people think about it); the "Ask more" buttons let
// the page's AI go deeper, using the student's own key.
// QST-RULES = C: every lesson's steps are the five-step session routine.
//
// The week list itself (title, what you'll learn, what you'll build) lives in
// syllabus.js, which mirrors ADR-0003; this file adds the teaching on top.
import { SYLLABUS, nextLesson } from './syllabus.js';

export const LESSON_TEXT = {
  w1: {
    why:
      'Every AI tool starts with instructions. The same model can be a strict grader, a friendly tutor or a code ' +
      'reviewer: the only difference is the text it reads first. Writing that text well is the cheapest way to ' +
      'make an AI more useful.',
    csView:
      'Engineers call this the "system prompt" and treat it like code: they write it carefully, test it on the ' +
      'same questions, and change one thing at a time to see what improves. It is the first thing they check ' +
      'when an AI app behaves badly.',
  },
  w2: {
    why:
      'There are hundreds of models, and the best one for a quick question is not the best one for hard code. ' +
      'Picking well saves money (your key has a $10 limit) and makes answers faster.',
    csView:
      'Engineers think in trade-offs: quality vs. speed vs. cost. They measure usage in tokens (pieces of words), ' +
      'compare models on the same task, and use the cheapest model that is good enough, saving expensive ones ' +
      'for the hard parts.',
  },
  w3: {
    why:
      'On its own, an AI can only write text. Give it tools (a calculator, a search, a way to send an email) and ' +
      'it can actually do things. This is the step from chatbot to agent.',
    csView:
      'Engineers describe each tool to the model like a function: its name, what it does, what inputs it needs. ' +
      'The model decides when to call it; your code runs it and hands back the result. Every agent, including ' +
      'Claude Code, works this way.',
  },
  w4: {
    why:
      "This is how your professor's course runs itself: an AI job that wakes up on a schedule, does a task, and " +
      'sends you the result, without you opening anything.',
    csView:
      'Engineers ask: what do I do over and over, the same way each time? That is a candidate for automation. ' +
      'They use schedulers (like GitHub Actions on a timer), keep secrets like API keys in safe storage, and log ' +
      'every run so they can see what happened.',
  },
  w5: {
    why:
      'Instead of re-typing the same long instructions, you package them once as a skill, and the AI loads it when ' +
      'the task calls for it. You already use one: i-have-adhd.',
    csView:
      'Engineers treat skills like reusable functions for AI: write once, name clearly, say when to use it, share ' +
      'it with the team. Good skills are short, specific, and tested on real requests.',
  },
  w6: {
    why:
      "AI models don't know your course notes or your files. RAG lets an AI look up the right pieces of your " +
      'documents first, then answer from them, and show where the answer came from.',
    csView:
      'Engineers split documents into small chunks, find the chunks most related to the question (often with ' +
      '"embeddings", a way to measure meaning), and give only those to the model. Citing sources lets you check ' +
      'the answer instead of just trusting it.',
  },
  w7: {
    why:
      'MCP is a standard plug that connects AI apps to outside tools and data: calendars, files, databases. Build ' +
      'one connector and any MCP-ready AI can use it.',
    csView:
      'Engineers like standards because they stop everyone rebuilding the same thing. MCP is to AI tools roughly ' +
      'what USB is to devices: one shape of plug, many devices. This project already uses one (adrs4ai).',
  },
  w8: {
    why:
      'Some jobs are too big for one AI. A crew splits the work across agents with roles (one plans, one builds, ' +
      "one reviews) that hand work to each other, like your professor's setup.",
    csView:
      'Engineers design crews like small teams: clear roles, clear hand-offs (often written messages or files), ' +
      'and a human who checks the important decisions. More agents is not automatically better: every hand-off ' +
      'is a place where things can get lost.',
  },
  capstone: {
    why:
      'This is where you design something you actually want, using everything from the earlier weeks, and keep ' +
      'the records that show why you built it the way you did.',
    csView:
      'Engineers start from the problem, not the tool: who is this for, what should happen, how will I know it ' +
      'works? Then they pick the smallest set of pieces that solves it, ship a first version fast, and improve it ' +
      'from real use.',
  },
};

// One lesson: its syllabus entry plus the teaching written above.
export function lessonById(id) {
  const week = SYLLABUS.find((w) => w.id === id);
  if (!week) return null;
  return { ...week, ...(LESSON_TEXT[id] ?? { why: '', csView: '' }) };
}

// The session routine (ADR-0006, QST-RULES = C), as every lesson's checklist.
// `detail` says what to do; `doneWhen` says how you know you can move on.
export const STEPS = [
  {
    id: 'read',
    title: 'Read this lesson',
    detail: () => 'Read the lesson card below, top to bottom.',
    doneWhen: 'You have read all of it, including "How CS people think about it".',
  },
  {
    id: 'learn',
    title: 'Learn it with Wren',
    detail: (lesson) =>
      `In VS Code, open the my-harness folder and the Claude chat panel (where you talk to Wren), then type: "${lesson.label}, teach me". Wren teaches it right there and ends with one check question.`,
    doneWhen: 'You can say the main idea in one sentence of your own.',
  },
  {
    id: 'decide',
    title: 'Decide',
    detail: () => "Answer the week's 1–2 questions in its record (ADR).",
    doneWhen: 'Every question for this week has your answer.',
  },
  {
    id: 'build',
    title: 'Build and ship',
    detail: () => 'Build it together with Wren, one small piece at a time.',
    doneWhen: 'The tests pass, it is pushed, and you can see it live.',
  },
  {
    id: 'reflect',
    title: 'Reflect',
    detail: () => 'Write 2–3 sentences: what you learned, what surprised you.',
    doneWhen: 'Your sentences are saved in the week’s record.',
  },
];

const ALL_STEP_IDS = STEPS.map((s) => s.id);

// Steps go one at a time, in order (ADR-0006, QST-ONE-AT-A-TIME): you can only
// finish the step you are on, and the next one opens after it.

// Which steps of a lesson are finished. Only an unbroken run from step 1
// counts, so progress always reads "steps 1 to N". A lesson already marked
// done (for example, ticked in the old Course panel) counts as all done.
export function stepsDone(state, lessonId) {
  if (state.course.done.includes(lessonId)) return ALL_STEP_IDS;
  const saved = state.course.steps?.[lessonId] ?? [];
  const firstGap = ALL_STEP_IDS.findIndex((id) => !saved.includes(id));
  return firstGap === -1 ? ALL_STEP_IDS : ALL_STEP_IDS.slice(0, firstGap);
}

// The step you are on now, or null when the lesson is finished.
export function currentStep(state, lessonId) {
  const finished = stepsDone(state, lessonId);
  return STEPS.find((s) => !finished.includes(s.id)) ?? null;
}

// Lessons also go in order: 'done', 'today' (the first unfinished one), or
// 'later'. A later lesson can be read ahead, but its steps stay locked.
export function lessonStatus(state, lessonId) {
  if (state.course.done.includes(lessonId)) return 'done';
  return nextLesson(state.course.done)?.id === lessonId ? 'today' : 'later';
}

function withSteps(state, lessonId, finished) {
  const complete = finished.length === ALL_STEP_IDS.length;
  const otherDone = state.course.done.filter((d) => d !== lessonId);
  return {
    ...state,
    course: {
      ...state.course,
      done: complete ? [...otherDone, lessonId] : otherDone,
      steps: { ...state.course.steps, [lessonId]: finished },
    },
  };
}

// Finish the step you are on. Finishing step 5 finishes the lesson, and the
// next lesson becomes today's. Does nothing on a locked (later) lesson.
export function finishStep(state, lessonId) {
  if (lessonStatus(state, lessonId) !== 'today') return state;
  const step = currentStep(state, lessonId);
  if (!step) return state;
  return withSteps(state, lessonId, [...stepsDone(state, lessonId), step.id]);
}

// Take back the last finished step (for a mis-click). On a finished lesson
// this reopens it at step 5.
export function undoStep(state, lessonId) {
  const finished = stepsDone(state, lessonId);
  if (finished.length === 0) return state;
  return withSteps(state, lessonId, finished.slice(0, -1));
}

// The "Ask more" buttons (QST-LESSON-SOURCE = C): each starts a chat that
// already knows the lesson, and sends one question.
export const ASK_MORE = [
  { id: 'simpler', label: 'Explain it more simply', prompt: "Explain this lesson more simply, as if I'm new to programming." },
  { id: 'example', label: 'Give me a real example', prompt: 'Give me one real-world example of this, step by step.' },
  { id: 'work', label: 'How do engineers use this?', prompt: 'How do software engineers use this at work? Give one concrete story.' },
];

export function askMoreInstructions(lesson) {
  return [
    'You are a patient computer-science instructor. The student is a beginner taking a week-by-week course on building with AI.',
    `Today's lesson: ${lesson.label}, ${lesson.title}.`,
    `What they'll learn: ${lesson.learn}`,
    `What they'll build: ${lesson.build}`,
    `Why it's useful: ${lesson.why}`,
    `How CS people think about it: ${lesson.csView}`,
    'Lead with the main point. Use plain language, short paragraphs, and one concrete example. End with one question that checks their understanding.',
  ].join('\n');
}
