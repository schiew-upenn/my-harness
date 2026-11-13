// The list of saved chats (docs/adr/0001, QST-STORAGE = B): new, switch,
// rename, delete. On small screens it slides in from the left.
import { useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar({
  chats, activeChatId, open, onClose, onNewChat, onSelect, onRename, onDelete, onOpenSettings,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  function startRename(chat) {
    setEditingId(chat.id);
    setEditText(chat.title);
  }

  function finishRename() {
    if (editingId) onRename(editingId, editText);
    setEditingId(null);
  }

  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}
      <nav className={`${styles.sidebar} ${open ? styles.open : ''}`} aria-label="Saved chats">
        <button type="button" className={styles.newChat} onClick={onNewChat}>
          + New chat
        </button>

        <ul className={styles.list}>
          {chats.length === 0 && <li className={styles.none}>No saved chats yet.</li>}
          {chats.map((c) => (
            <li key={c.id} className={`${styles.item} ${c.id === activeChatId ? styles.active : ''}`}>
              {editingId === c.id ? (
                <input
                  className={styles.renameInput}
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={finishRename}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') finishRename();
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  aria-label="Chat name"
                />
              ) : (
                <>
                  <button type="button" className={styles.select} onClick={() => onSelect(c.id)} title={c.title}>
                    {c.title}
                  </button>
                  <button type="button" className={styles.icon} onClick={() => startRename(c)} aria-label={`Rename “${c.title}”`}>
                    ✎
                  </button>
                  <button
                    type="button"
                    className={styles.icon}
                    onClick={() => {
                      if (window.confirm(`Delete “${c.title}”? This can’t be undone.`)) onDelete(c.id);
                    }}
                    aria-label={`Delete “${c.title}”`}
                  >
                    🗑
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        <button type="button" className={styles.settings} onClick={onOpenSettings}>
          ⚙ Settings
        </button>
      </nav>
    </>
  );
}
