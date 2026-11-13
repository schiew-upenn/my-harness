// The week-by-week AI-building course (docs/adr/0003 — QST-SYLLABUS = A,
// "as drafted"). This list mirrors the record's "DOC: draft syllabus" table;
// change both together.
//
// `where` follows QST-COURSE-RULES = A: weeks 1–3 improve this page, the rest
// happen in their own new repo started from the ADRs4AI template.

export const SYLLABUS = [
  {
    id: 'w1',
    label: 'Week 1',
    title: 'Prompting & instructions',
    learn: 'How the text an AI reads first shapes every answer.',
    build: 'An Instructions box (with presets) in this page; the same question under different instructions.',
    where: 'this page',
  },
  {
    id: 'w2',
    label: 'Week 2',
    title: 'Models & money',
    learn: 'Why models differ in quality, speed and cost; what "tokens" are.',
    build: 'Model dropdown, formatted replies, and "$ left" balance; compare 3 models on one question.',
    where: 'this page',
  },
  {
    id: 'w3',
    label: 'Week 3',
    title: 'Tool use',
    learn: 'How an AI can call code you wrote — the core idea behind every agent.',
    build: "Give this page's AI one tool (e.g. a calculator) that it decides when to use.",
    where: 'this page',
  },
  {
    id: 'w4',
    label: 'Week 4',
    title: 'Automation',
    learn: 'AI that runs on its own, on a schedule.',
    build: 'A scheduled GitHub Actions job that asks an AI something each morning and emails you the answer.',
    where: 'its own repo',
  },
  {
    id: 'w5',
    label: 'Week 5',
    title: 'Skills',
    learn: 'Packaging instructions an AI agent loads when it needs them.',
    build: 'Your own Claude Code skill, e.g. "make my weekly study plan".',
    where: 'its own repo',
  },
  {
    id: 'w6',
    label: 'Week 6',
    title: 'Your own data (RAG)',
    learn: 'Letting an AI answer from your documents.',
    build: 'Ask questions about your course notes and get answers that cite them.',
    where: 'its own repo',
  },
  {
    id: 'w7',
    label: 'Week 7',
    title: 'MCP',
    learn: 'Connecting AI to outside tools and data through a standard plug.',
    build: 'Use, then write, a tiny MCP server.',
    where: 'its own repo',
  },
  {
    id: 'w8',
    label: 'Week 8',
    title: 'Crews',
    learn: 'Several AI agents with roles, handing work to each other.',
    build: "Recruit a second AI seat with the template's crew layer and run a two-agent workflow.",
    where: 'its own repo',
  },
  {
    id: 'capstone',
    label: 'Capstone',
    title: 'Your own system',
    learn: 'Putting it all together.',
    build: 'Design and build an automation of your choice, with the records to show why.',
    where: 'its own repo',
  },
];

// The lesson to do next: the first one in course order not yet ticked off.
export function nextLesson(done, syllabus = SYLLABUS) {
  return syllabus.find((w) => !done.includes(w.id)) ?? null;
}

export function toggleDone(state, id) {
  const done = state.course.done;
  const next = done.includes(id) ? done.filter((d) => d !== id) : [...done, id];
  return { ...state, course: { ...state.course, done: next } };
}
