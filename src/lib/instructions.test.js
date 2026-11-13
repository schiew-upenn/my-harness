// Week 1: each chat's own instructions (docs/adr/0004 — QST-WHERE = B,
// QST-PRESETS = A).
import { describe, it, expect } from 'vitest';
import { buildRequest } from './openrouter.js';
import { emptyState, loadState, STORAGE_KEY } from './storage.js';
import { addChat, newChat, setInstructions, activeChat } from './chats.js';
import { PRESETS, instructionsLabel } from './presets.js';

const tutor = PRESETS.find((p) => p.id === 'tutor').text;
const ask = [{ role: 'user', content: 'Explain recursion' }];

function sent(instructions) {
  const { init } = buildRequest({ apiKey: 'k', model: 'm', messages: ask, instructions });
  return JSON.parse(init.body).messages;
}

describe('what the AI receives', () => {
  it('a chat with instructions sends them first, as the system message', () => {
    expect(sent(tutor)).toEqual([
      { role: 'system', content: tutor },
      { role: 'user', content: 'Explain recursion' },
    ]);
  });

  it('a Plain chat sends no system message at all', () => {
    expect(sent('')).toEqual([{ role: 'user', content: 'Explain recursion' }]);
  });

  it('a box left with only spaces or blank lines counts as Plain', () => {
    expect(sent('  \n ')).toEqual([{ role: 'user', content: 'Explain recursion' }]);
  });
});

describe('instructions belong to each chat', () => {
  it('the three experiment chats keep different instructions side by side', () => {
    let s = emptyState();
    s = addChat(s, newChat('m', 0, 'plain', ''));
    s = addChat(s, newChat('m', 0, 'tutor', tutor));
    s = addChat(s, newChat('m', 0, 'code', PRESETS.find((p) => p.id === 'coding').text));
    expect(s.chats.map((c) => instructionsLabel(c.instructions))).toEqual(['Coding helper', 'Patient tutor', 'Plain']);
  });

  it('editing one chat’s instructions leaves the other chats alone', () => {
    let s = emptyState();
    s = addChat(s, newChat('m', 0, 'a', tutor));
    s = addChat(s, newChat('m', 0, 'b', tutor));
    s = setInstructions(s, 'b', 'Answer like a pirate.');
    expect(s.chats.find((c) => c.id === 'a').instructions).toBe(tutor);
    expect(activeChat(s).instructions).toBe('Answer like a pirate.');
  });

  it('an edited preset is labeled Custom, so the sidebar does not claim it is still the preset', () => {
    expect(instructionsLabel(`${tutor} Use emoji.`)).toBe('Custom');
    expect(instructionsLabel(tutor)).toBe('Patient tutor');
  });
});

describe('Regression tests', () => {
  it('chats saved before Week 1 (no instructions field) load as Plain and send no system message', () => {
    // Bug this guards against: the live page already holds chats from the
    // first version, which have no `instructions`. Calling .trim() on
    // undefined would crash Send in every old chat.
    const old = JSON.stringify({
      version: 1,
      settings: { apiKey: 'k', model: 'm' },
      chats: [{ id: 'c1', title: 'Hi', messages: [] }],
      activeChatId: 'c1',
    });
    const s = loadState({ getItem: (k) => (k === STORAGE_KEY ? old : null), setItem() {} });
    const chat = activeChat(s);
    expect(instructionsLabel(chat.instructions)).toBe('Plain');
    expect(s.settings.defaultInstructions).toBe('');
    expect(sent(chat.instructions ?? '')).toEqual([{ role: 'user', content: 'Explain recursion' }]);
  });
});
