// The home screen: "Today's lesson", its steps, the path through the course,
// and achievements (docs/adr/0006: QST-BUILD-ORDER = A, lesson home +
// progress). It replaces the old Course panel, whose job it now does.
import { useState } from 'react';
import { SYLLABUS, nextLesson } from '../lib/syllabus.js';
import { ASK_MORE, STEPS, lessonById, stepsDone } from '../lib/lessons.js';
import { achievementsFor } from '../lib/achievements.js';
import styles from './LessonHome.module.css';

export default function LessonHome({ state, busy, onToggleStep, onAskMore }) {
  const done = state.course.done;
  const next = nextLesson(done);
  // Which lesson is on screen: today's by default, or one picked from the path.
  const [viewingId, setViewingId] = useState(null);
  const lesson = lessonById(viewingId ?? next?.id ?? SYLLABUS[SYLLABUS.length - 1].id);
  const isToday = lesson.id === next?.id;
  const ticked = stepsDone(state, lesson.id);
  const lessonCount = SYLLABUS.filter((w) => done.includes(w.id)).length;
  const badges = achievementsFor(state);
  const earnedCount = badges.filter((b) => b.isEarned).length;

  return (
    <div className={styles.home}>
      <div className={styles.column}>
        <section className={styles.progressRow} aria-label="Course progress">
          <span>
            <strong>{lessonCount}</strong> of {SYLLABUS.length} lessons done
          </span>
          <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={SYLLABUS.length} aria-valuenow={lessonCount}>
            <div className={styles.barFill} style={{ width: `${(lessonCount / SYLLABUS.length) * 100}%` }} />
          </div>
          <span>
            <strong>{earnedCount}</strong> of {badges.length} badges
          </span>
        </section>

        {!next && <p className={styles.complete}>🎉 You finished the whole course.</p>}

        <article className={styles.card}>
          <div className={styles.kicker}>
            {isToday ? "Today's lesson" : done.includes(lesson.id) ? 'Finished lesson' : 'Later lesson'} · {lesson.label}
            <span className={styles.where}>built in {lesson.where}</span>
          </div>
          <h2 className={styles.lessonTitle}>{lesson.title}</h2>
          <p className={styles.learn}>{lesson.learn}</p>

          <h3 className={styles.sub}>What you'll build</h3>
          <p>{lesson.build}</p>
          <h3 className={styles.sub}>Why it's useful</h3>
          <p>{lesson.why}</p>
          <h3 className={styles.sub}>How CS people think about it</h3>
          <p>{lesson.csView}</p>

          <div className={styles.askRow}>
            <span className={styles.askLabel}>Ask more:</span>
            {ASK_MORE.map((ask) => (
              <button key={ask.id} type="button" className={styles.ask} disabled={busy} onClick={() => onAskMore(lesson, ask)}>
                {ask.label}
              </button>
            ))}
          </div>
          {!state.settings.apiKey && <p className={styles.note}>"Ask more" uses your OpenRouter key: add it in Settings first.</p>}
        </article>

        <section className={styles.card} aria-label="Steps">
          <div className={styles.stepsHeader}>
            <h3 className={styles.sectionTitle}>Steps</h3>
            <span className={styles.count}>
              {ticked.length} of {STEPS.length}
            </span>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((step, i) => {
              const isTicked = ticked.includes(step.id);
              return (
                <li key={step.id} className={`${styles.step} ${isTicked ? styles.stepDone : ''}`}>
                  <label className={styles.stepLabel}>
                    <input type="checkbox" checked={isTicked} onChange={() => onToggleStep(lesson.id, step.id)} />
                    <span>
                      <span className={styles.stepTitle}>
                        {i + 1}. {step.title}
                      </span>
                      <span className={styles.stepDetail}>{step.detail(lesson)}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={styles.card} aria-label="Your path">
          <h3 className={styles.sectionTitle}>Your path</h3>
          <ol className={styles.path}>
            {SYLLABUS.map((w) => {
              const isDone = done.includes(w.id);
              const isNext = w.id === next?.id;
              const mark = isDone ? '✓' : isNext ? '▶' : '○';
              return (
                <li key={w.id}>
                  <button
                    type="button"
                    className={`${styles.pathItem} ${isDone ? styles.pathDone : ''} ${isNext ? styles.pathNext : ''} ${w.id === lesson.id ? styles.pathViewing : ''}`}
                    onClick={() => setViewingId(w.id === next?.id ? null : w.id)}
                  >
                    <span className={styles.mark} aria-hidden="true">
                      {mark}
                    </span>
                    <span className={styles.pathLabel}>{w.label}</span>
                    <span className={styles.pathTitle}>{w.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={styles.card} aria-label="Achievements">
          <h3 className={styles.sectionTitle}>Achievements</h3>
          <ul className={styles.badges}>
            {badges.map((b) => (
              <li key={b.id} className={`${styles.badge} ${b.isEarned ? styles.earned : styles.locked}`} title={b.how}>
                <span className={styles.badgeIcon} aria-hidden="true">
                  {b.icon}
                </span>
                <span className={styles.badgeName}>{b.name}</span>
                <span className={styles.badgeHow}>{b.isEarned ? 'Earned' : b.how}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
