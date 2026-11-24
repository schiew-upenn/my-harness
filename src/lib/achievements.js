// Achievements: visible wins on the home screen (docs/adr/0006, QST-UI-MESS:
// "there's no steps, achievements, nothing").
//
// Every achievement is worked out from course progress at the moment it is
// shown, not stored separately, so it can never disagree with the checklist.
// (Things like "sent a first message" were left out on purpose: deleting old
// chats would make the badge disappear.)
import { SYLLABUS } from './syllabus.js';

const LESSON_BADGES = {
  w1: { icon: '✍️', name: 'Prompt shaper' },
  w2: { icon: '⚖️', name: 'Model picker' },
  w3: { icon: '🔧', name: 'Toolsmith' },
  w4: { icon: '⏰', name: 'Automator' },
  w5: { icon: '🧩', name: 'Skill maker' },
  w6: { icon: '📚', name: 'Librarian' },
  w7: { icon: '🔌', name: 'Plug builder' },
  w8: { icon: '🤝', name: 'Crew lead' },
  capstone: { icon: '🏆', name: 'Builder' },
};

const lessonsDone = (state) => SYLLABUS.filter((w) => state.course.done.includes(w.id)).length;

export const ACHIEVEMENTS = [
  {
    id: 'first-step',
    icon: '👣',
    name: 'First step',
    how: 'Finish your first lesson step.',
    earned: (s) => s.course.done.length > 0 || Object.values(s.course.steps ?? {}).some((ids) => ids.length > 0),
  },
  ...SYLLABUS.map((w) => ({
    id: `done-${w.id}`,
    icon: LESSON_BADGES[w.id]?.icon ?? '⭐',
    name: LESSON_BADGES[w.id]?.name ?? w.title,
    how: `Finish ${w.label}: ${w.title}.`,
    earned: (s) => s.course.done.includes(w.id),
  })),
  {
    id: 'halfway',
    icon: '🌗',
    name: 'Halfway there',
    how: `Finish ${Math.ceil(SYLLABUS.length / 2)} lessons.`,
    earned: (s) => lessonsDone(s) >= Math.ceil(SYLLABUS.length / 2),
  },
];

export function achievementsFor(state) {
  return ACHIEVEMENTS.map(({ earned, ...a }) => ({ ...a, isEarned: earned(state) }));
}
