// The home screen's lessons and steps (docs/adr/0006).
import { describe, it, expect } from 'vitest';
import { ASK_MORE, STEPS, askMoreInstructions, lessonById, stepsDone, toggleStep } from './lessons.js';
import { SYLLABUS, nextLesson, toggleDone } from './syllabus.js';
import { emptyState, loadState, saveState, STORAGE_KEY } from './storage.js';
import { buildRequest } from './openrouter.js';

function fakeStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return { getItem: (k) => (data.has(k) ? data.get(k) : null), setItem: (k, v) => data.set(k, String(v)) };
}

function tickAll(state, lessonId) {
  return STEPS.reduce((s, step) => toggleStep(s, lessonId, step.id), state);
}

describe('lesson content', () => {
  it('every lesson in the syllabus has its teaching written, so no lesson card shows up blank', () => {
    // Guards the case where a week is added to syllabus.js but its lesson
    // text is forgotten: the home screen would show empty sections.
    for (const week of SYLLABUS) {
      const lesson = lessonById(week.id);
      expect(lesson.why.length, `${week.id} why`).toBeGreaterThan(40);
      expect(lesson.csView.length, `${week.id} csView`).toBeGreaterThan(40);
    }
  });
});

describe('lesson steps', () => {
  it('ticking all five steps finishes the lesson, and the next lesson becomes today’s', () => {
    const s = tickAll(emptyState(), 'w1');
    expect(s.course.done).toContain('w1');
    expect(nextLesson(s.course.done).id).toBe('w2');
  });

  it('ticking some steps shows progress but does not finish the lesson', () => {
    let s = toggleStep(emptyState(), 'w1', 'read');
    s = toggleStep(s, 'w1', 'learn');
    expect(stepsDone(s, 'w1')).toEqual(['read', 'learn']);
    expect(s.course.done).not.toContain('w1');
    expect(nextLesson(s.course.done).id).toBe('w1');
  });

  it('unticking a step of a finished lesson reopens it', () => {
    let s = tickAll(emptyState(), 'w1');
    s = toggleStep(s, 'w1', 'reflect');
    expect(s.course.done).not.toContain('w1');
    expect(stepsDone(s, 'w1')).toHaveLength(STEPS.length - 1);
    expect(nextLesson(s.course.done).id).toBe('w1');
  });

  it('a lesson ticked off in the old Course panel shows all its steps done', () => {
    // The old panel stored only "done" weeks, no steps. Those weeks must not
    // suddenly look 0-of-5 on the new home screen.
    const s = toggleDone(emptyState(), 'w1');
    expect(stepsDone(s, 'w1')).toHaveLength(STEPS.length);
  });

  it('steps are still ticked after the page is reloaded', () => {
    const storage = fakeStorage();
    saveState(storage, toggleStep(emptyState(), 'w2', 'read'));
    expect(stepsDone(loadState(storage), 'w2')).toEqual(['read']);
  });
});

describe('Ask more', () => {
  it('the chat it opens sends the lesson to the AI first, then the question', () => {
    const lesson = lessonById('w3');
    const ask = ASK_MORE[0];
    const { init } = buildRequest({
      apiKey: 'sk-or-test',
      model: 'openrouter/auto',
      instructions: askMoreInstructions(lesson),
      messages: [{ role: 'user', content: ask.prompt }],
    });
    const body = JSON.parse(init.body);
    expect(body.messages[0].role).toBe('system');
    expect(body.messages[0].content).toContain('Tool use');
    expect(body.messages[0].content).toContain(lesson.csView);
    expect(body.messages[1]).toEqual({ role: 'user', content: ask.prompt });
  });
});

describe('Regression tests', () => {
  it('progress saved before lesson steps existed still loads, with no steps ticked', () => {
    // Bug this guards against: the live page already holds data saved by the
    // Course-panel version (2026-11-12), whose `course` has `done` but no
    // `steps`. Reading steps from that data must not crash the home screen.
    const coursePanelData = JSON.stringify({
      version: 1,
      settings: { apiKey: 'sk-or-x', model: 'openai/gpt-4o-mini' },
      chats: [],
      activeChatId: null,
      course: { done: ['w1'] },
    });
    const state = loadState(fakeStorage({ [STORAGE_KEY]: coursePanelData }));
    expect(state.course.steps).toEqual({});
    expect(state.course.done).toEqual(['w1']);
    expect(stepsDone(state, 'w2')).toEqual([]);
  });
});
