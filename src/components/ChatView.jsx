// The open conversation: messages, a "thinking…" line, errors, and the input box.
// Replies are shown as plain text — React escapes it — and never inserted as
// HTML, so a reply can't run code on the page that holds the key (ADR-0001).
import { useEffect, useRef, useState } from 'react';
import InstructionsBar from './InstructionsBar.jsx';
import styles from './ChatView.module.css';

export default function ChatView({ chat, waitingHere, busy, error, onSend, onInstructionsChange }) {
  const [draft, setDraft] = useState('');
  const endRef = useRef(null);
  const messages = chat?.messages ?? [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, waitingHere, error]);

  function submit() {
    const text = draft.trim();
    if (!text || busy) return;
    onSend(text);
    setDraft('');
  }

  return (
    <section className={styles.chat}>
      {chat && <InstructionsBar instructions={chat.instructions ?? ''} onChange={onInstructionsChange} />}
      <div className={styles.messages}>
        {messages.length === 0 && !waitingHere && (
          <div className={styles.empty}>
            <p>Ask anything to start a chat.</p>
            <p className={styles.hint}>Your chats and key are saved only in this browser.</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? styles.user : styles.assistant}>
            <div className={styles.bubble}>{m.content}</div>
            {m.role === 'assistant' && m.model && <div className={styles.meta}>{m.model}</div>}
          </div>
        ))}

        {waitingHere && <div className={styles.thinking}>Thinking…</div>}
        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        className={styles.composer}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <textarea
          className={styles.input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            // Enter sends; Shift+Enter makes a new line.
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Type a message… (Enter to send, Shift+Enter for a new line)"
          rows={2}
          aria-label="Message"
        />
        <button type="submit" className={styles.send} disabled={busy || !draft.trim()}>
          Send
        </button>
      </form>
    </section>
  );
}
