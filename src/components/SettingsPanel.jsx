// Where the OpenRouter key and model are set (docs/adr/0001, QST-API-KEY = A:
// paste once, remembered in this browser, with a "Forget key" button).
import { useState } from 'react';
import { DEFAULT_MODEL } from '../lib/storage.js';
import { PRESETS } from '../lib/presets.js';
import styles from './SettingsPanel.module.css';

export default function SettingsPanel({ settings, onSave, onForgetKey, onClose }) {
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [model, setModel] = useState(settings.model);
  const [showKey, setShowKey] = useState(false);
  const [defaultPreset, setDefaultPreset] = useState(
    () => PRESETS.find((p) => p.text === (settings.defaultInstructions ?? ''))?.id ?? 'plain',
  );

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <form
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            apiKey: apiKey.trim(),
            model: model.trim() || DEFAULT_MODEL,
            defaultInstructions: PRESETS.find((p) => p.id === defaultPreset)?.text ?? '',
          });
        }}
        aria-label="Settings"
      >
        <h2 className={styles.heading}>Settings</h2>

        <label className={styles.label} htmlFor="api-key">
          OpenRouter API key
        </label>
        <div className={styles.row}>
          <input
            id="api-key"
            className={styles.input}
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-or-v1-…"
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className={styles.secondary} onClick={() => setShowKey((v) => !v)}>
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
        <p className={styles.note}>
          Saved only in this browser, on this computer. It is sent only to openrouter.ai, and never stored
          on GitHub. Treat it like a password.
        </p>

        <label className={styles.label} htmlFor="model">
          Model
        </label>
        <input
          id="model"
          className={styles.input}
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder={DEFAULT_MODEL}
          spellCheck={false}
        />
        <p className={styles.note}>
          An OpenRouter model id, like <code>openai/gpt-4o-mini</code>. <code>{DEFAULT_MODEL}</code> lets
          OpenRouter choose. Browse ids at{' '}
          <a href="https://openrouter.ai/models" target="_blank" rel="noreferrer">
            openrouter.ai/models
          </a>
          .
        </p>

        <label className={styles.label} htmlFor="default-instructions">
          New chats start with
        </label>
        <select
          id="default-instructions"
          className={styles.input}
          value={defaultPreset}
          onChange={(e) => setDefaultPreset(e.target.value)}
        >
          {PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <p className={styles.note}>Each chat can change its own instructions with the bar at the top of the chat.</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.danger}
            disabled={!settings.apiKey}
            onClick={() => {
              onForgetKey();
              setApiKey('');
            }}
          >
            Forget key
          </button>
          <span className={styles.spacer} />
          <button type="button" className={styles.secondary} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.primary}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
