// Ready-made instructions (the "system" message) — docs/adr/0004,
// QST-PRESETS = A: Patient tutor, Coding helper, Plain. Picking one fills a
// chat's Instructions box; the text stays editable.

export const PRESETS = [
  {
    id: 'plain',
    name: 'Plain',
    text: '', // no system message at all: the model's default behavior
  },
  {
    id: 'tutor',
    name: 'Patient tutor',
    text:
      'You are a patient tutor. Explain step by step for a beginner, in simple words, with one small example. ' +
      'Keep it short. End with one question that checks my understanding.',
  },
  {
    id: 'coding',
    name: 'Coding helper',
    text:
      'You are a coding helper. Show the code first, in a code block, then explain it briefly in plain words. ' +
      'Point out one common mistake to avoid.',
  },
];

// What to call a chat's instructions in the sidebar and the Instructions bar.
export function instructionsLabel(text) {
  const clean = (text ?? '').trim();
  if (!clean) return 'Plain';
  const preset = PRESETS.find((p) => p.text && p.text === clean);
  return preset ? preset.name : 'Custom';
}
