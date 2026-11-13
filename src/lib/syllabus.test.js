// The course progress panel (docs/adr/0003, QST-CLASS-SHAPE = C).
import { describe, it, expect } from 'vitest';
import { SYLLABUS, nextLesson, toggleDone } from './syllabus.js';
import { emptyState, loadState, saveState, STORAGE_KEY } from './storage.js';

function fakeStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return { getItem: (k) => (data.has(k) ? data.get(k) : null), setItem: (k, v) => data.set(k, String(v)) };
}

describe('course progress', () => {
  it('a new student starts at Week 1', () => {
    expect(nextLesson([]).id).toBe('w1');
  });

  it('after finishing Week 1, Week 2 is next', () => {
    const s = toggleDone(emptyState(), 'w1');
    expect(nextLesson(s.course.done).id).toBe('w2');
  });

  it('skipping ahead does not hide an unfinished earlier week', () => {
    // e.g. doing the automation week early: Week 1 is still the next lesson
    const s = toggleDone(emptyState(), 'w4');
    expect(nextLesson(s.course.done).id).toBe('w1');
  });

  it('un-ticking a week by mistake puts it back as unfinished', () => {
    let s = toggleDone(emptyState(), 'w1');
    s = toggleDone(s, 'w1');
    expect(s.course.done).toEqual([]);
  });

  it('when every week is done there is no next lesson', () => {
    let s = emptyState();
    for (const w of SYLLABUS) s = toggleDone(s, w.id);
    expect(nextLesson(s.course.done)).toBeNull();
  });

  it('progress is still there after the page is reloaded', () => {
    const storage = fakeStorage();
    saveState(storage, toggleDone(emptyState(), 'w1'));
    expect(loadState(storage).course.done).toEqual(['w1']);
  });
});

describe('Regression tests', () => {
  it('chats saved before the course panel existed still load, with no weeks done', () => {
    // Bug this guards against: the live page and localhost already hold data
    // saved by the first version (2026-11-12), which has no `course` field.
    // Reading `state.course.done` on that data would crash the whole page.
    const firstVersionData = JSON.stringify({
      version: 1,
      settings: { apiKey: 'sk-or-x', model: 'openai/gpt-4o-mini' },
      chats: [{ id: 'c1', title: 'Hi', messages: [] }],
      activeChatId: 'c1',
    });
    const state = loadState(fakeStorage({ [STORAGE_KEY]: firstVersionData }));
    expect(state.course.done).toEqual([]);
    expect(state.chats).toHaveLength(1); // nothing lost
    expect(nextLesson(state.course.done).id).toBe('w1');
  });
});
