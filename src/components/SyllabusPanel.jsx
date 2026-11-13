// "Your AI-building course": the weeks, what's done, what's next
// (docs/adr/0003, QST-CLASS-SHAPE = C).
import { SYLLABUS, nextLesson } from '../lib/syllabus.js';
import styles from './SyllabusPanel.module.css';

export default function SyllabusPanel({ done, onToggle, onClose }) {
  const next = nextLesson(done);
  const count = SYLLABUS.filter((w) => done.includes(w.id)).length;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <section className={styles.panel} onClick={(e) => e.stopPropagation()} aria-label="Course">
        <header className={styles.header}>
          <div>
            <h2 className={styles.heading}>Your AI-building course</h2>
            <p className={styles.progress}>
              {count} of {SYLLABUS.length} done
              {next ? ` · next up: ${next.label}, ${next.title}` : ' · all done! 🎉'}
            </p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <ol className={styles.list}>
          {SYLLABUS.map((w) => {
            const isDone = done.includes(w.id);
            const isNext = next?.id === w.id;
            return (
              <li key={w.id} className={`${styles.week} ${isDone ? styles.done : ''} ${isNext ? styles.next : ''}`}>
                <label className={styles.check}>
                  <input type="checkbox" checked={isDone} onChange={() => onToggle(w.id)} />
                  <span className={styles.label}>{w.label}</span>
                </label>
                <div className={styles.body}>
                  <div className={styles.titleRow}>
                    <span className={styles.title}>{w.title}</span>
                    {isNext && <span className={styles.badge}>next up</span>}
                    <span className={styles.where}>{w.where}</span>
                  </div>
                  <p className={styles.line}>
                    <strong>Learn:</strong> {w.learn}
                  </p>
                  <p className={styles.line}>
                    <strong>Build:</strong> {w.build}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className={styles.footnote}>
          Each week's plan, decisions and reflection are kept in the project's records (docs/adr). Progress here is
          saved in this browser.
        </p>
      </section>
    </div>
  );
}
