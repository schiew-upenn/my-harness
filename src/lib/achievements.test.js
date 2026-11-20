// Achievements on the home screen (docs/adr/0006).
import { describe, it, expect } from 'vitest';
import { achievementsFor } from './achievements.js';
import { STEPS, toggleStep } from './lessons.js';
import { SYLLABUS } from './syllabus.js';
import { emptyState } from './storage.js';

const earnedIds = (state) => achievementsFor(state).filter((a) => a.isEarned).map((a) => a.id);
const finish = (state, id) => STEPS.reduce((s, step) => toggleStep(s, id, step.id), state);

describe('achievements', () => {
  it('a brand-new student has earned nothing yet', () => {
    expect(earnedIds(emptyState())).toEqual([]);
  });

  it('ticking the very first step earns "First step"', () => {
    const s = toggleStep(emptyState(), 'w1', 'read');
    expect(earnedIds(s)).toEqual(['first-step']);
  });

  it('finishing Week 1 earns its badge', () => {
    expect(earnedIds(finish(emptyState(), 'w1'))).toContain('done-w1');
  });

  it('reopening a finished lesson takes its badge back, so badges always match the checklist', () => {
    let s = finish(emptyState(), 'w1');
    s = toggleStep(s, 'w1', 'reflect');
    expect(earnedIds(s)).not.toContain('done-w1');
  });

  it('"Halfway there" arrives after half the lessons, not before', () => {
    const half = Math.ceil(SYLLABUS.length / 2);
    let s = emptyState();
    for (const w of SYLLABUS.slice(0, half - 1)) s = finish(s, w.id);
    expect(earnedIds(s)).not.toContain('halfway');
    s = finish(s, SYLLABUS[half - 1].id);
    expect(earnedIds(s)).toContain('halfway');
  });
});
