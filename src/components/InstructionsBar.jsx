// The Instructions bar at the top of each chat (docs/adr/0004, Week 1):
// shows which instructions this chat uses; click to pick a preset or edit.
import { useState } from 'react';
import { PRESETS, instructionsLabel } from '../lib/presets.js';
import styles from './InstructionsBar.module.css';

export default function InstructionsBar({ instructions, onChange }) {
  const [open, setOpen] = useState(false);
  const label = instructionsLabel(instructions);

  return (
    <div className={styles.bar}>
      <button type="button" className={styles.toggle} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className={styles.key}>Instructions:</span> {label} <span aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className={styles.editor}>
          <p className={styles.help}>
            The AI reads these first, before every message in this chat (the "system" message). Pick a preset or
            write your own.
          </p>
          <div className={styles.presets}>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`${styles.preset} ${label === p.name ? styles.selected : ''}`}
                onClick={() => onChange(p.text)}
              >
                {p.name}
              </button>
            ))}
          </div>
          <textarea
            className={styles.text}
            value={instructions}
            onChange={(e) => onChange(e.target.value)}
            placeholder="No instructions — the AI's default behavior (Plain)."
            rows={3}
            aria-label="Instructions for this chat"
          />
        </div>
      )}
    </div>
  );
}
