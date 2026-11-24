// The home screen's lessons and steps (docs/adr/0006).
import { describe, it, expect } from 'vitest';
import {
  ASK_MORE, STEPS, askMoreInstructions, currentStep, finishStep, lessonById, lessonStatus, stepsDone, undoStep,
} from './lessons.js';
import { SYLLABUS, nextLesson, toggleDone } from './syllabus.js';
import { emptyState, loadState, saveState, STORAGE_KEY } from './storage.js';
import { buildRequest } from './openrouter.js';

function fakeStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return { getItem: (k) => (data.has(k) ? data.get(k) : null), setItem: (k, v) => data.set(k, String(v)) };
}

function finishLesson(state, lessonId) {
  return STEPS.reduce((s) => finishStep(s, lessonId), state);
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

  it('every step says how you know it is done, so "can I move on?" always has an answer', () => {
    for (const step of STEPS) expect(step.doneWhen.length, step.id).toBeGreaterThan(10);
  });
});

describe('steps go one at a time (QST-ONE-AT-A-TIME)', () => {
  it('a new student starts on step 1, with steps 2–5 waiting', () => {
    expect(currentStep(emptyState(), 'w1').id).toBe('read');
    expect(stepsDone(emptyState(), 'w1')).toEqual([]);
  });

  it('finishing a step opens the next one, in order', () => {
    let s = finishStep(emptyState(), 'w1');
    expect(stepsDone(s, 'w1')).toEqual(['read']);
    expect(currentStep(s, 'w1').id).toBe('learn');
    s = finishStep(s, 'w1');
    expect(currentStep(s, 'w1').id).toBe('decide');
  });

  it('finishing all five steps finishes the lesson, and the next lesson becomes today’s', () => {
    const s = finishLesson(emptyState(), 'w1');
    expect(s.course.done).toContain('w1');
    expect(lessonStatus(s, 'w1')).toBe('done');
    expect(lessonStatus(s, 'w2')).toBe('today');
    expect(currentStep(s, 'w2').id).toBe('read');
  });

  it('a later lesson can be read but its steps stay locked until the earlier one is finished', () => {
    const s = emptyState();
    expect(lessonStatus(s, 'w2')).toBe('later');
    expect(finishStep(s, 'w2')).toBe(s);
  });

  it('Undo takes back only the last finished step (for a mis-click)', () => {
    let s = finishStep(finishStep(emptyState(), 'w1'), 'w1');
    s = undoStep(s, 'w1');
    expect(stepsDone(s, 'w1')).toEqual(['read']);
    expect(currentStep(s, 'w1').id).toBe('learn');
  });

  it('Undo on a finished lesson reopens it at step 5', () => {
    const s = undoStep(finishLesson(emptyState(), 'w1'), 'w1');
    expect(s.course.done).not.toContain('w1');
    expect(lessonStatus(s, 'w1')).toBe('today');
    expect(currentStep(s, 'w1').id).toBe('reflect');
    expect(nextLesson(s.course.done).id).toBe('w1');
  });

  it('a lesson ticked off in the old Course panel shows all its steps done', () => {
    // The old panel stored only "done" weeks, no steps. Those weeks must not
    // suddenly look 0-of-5 on the home screen.
    const s = toggleDone(emptyState(), 'w1');
    expect(stepsDone(s, 'w1')).toHaveLength(STEPS.length);
  });

  it('steps are still finished after the page is reloaded', () => {
    const storage = fakeStorage();
    saveState(storage, finishStep(emptyState(), 'w1'));
    expect(stepsDone(loadState(storage), 'w1')).toEqual(['read']);
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

  it('steps ticked out of order in the checkbox version count only up to the first gap', () => {
    // The 2026-11-19 checkbox version let any step be ticked in any order, so
    // saved data can hold e.g. steps 1 and 4 with 2 and 3 empty. With steps in
    // order, that must read as "step 1 done, you are on step 2", not as a
    // checklist with holes in it.
    const s = { ...emptyState(), course: { done: [], steps: { w1: ['read', 'build'] } } };
    expect(stepsDone(s, 'w1')).toEqual(['read']);
    expect(currentStep(s, 'w1').id).toBe('learn');
  });
});
