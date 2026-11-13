// The whole page: sidebar of chats, the open chat, and the settings panel.
// Holds the page state, saves it to localStorage on every change, and sends
// messages to OpenRouter. Decisions: docs/adr/0001.
import { useEffect, useState } from 'react';
import { loadState, saveState } from './lib/storage.js';
import {
  activeChat, addChat, appendMessage, deleteChat, newChat, renameChat, selectChat, updateSettings,
} from './lib/chats.js';
import { sendChat } from './lib/openrouter.js';
import { toggleDone } from './lib/syllabus.js';
import SyllabusPanel from './components/SyllabusPanel.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatView from './components/ChatView.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';
import styles from './App.module.css';

export default function App() {
  const [state, setState] = useState(() => loadState(window.localStorage));
  const [saveError, setSaveError] = useState(null);
  const [sendError, setSendError] = useState(null);
  const [sendingChatId, setSendingChatId] = useState(null);
  // First visit (no key yet): open Settings straight away.
  const [settingsOpen, setSettingsOpen] = useState(() => !state.settings.apiKey);
  const [sidebarOpen, setSidebarOpen] = useState(false); // small screens only
  const [courseOpen, setCourseOpen] = useState(false);

  useEffect(() => {
    const result = saveState(window.localStorage, state);
    setSaveError(result.ok ? null : result.error);
  }, [state]);

  const chat = activeChat(state);

  function handleNewChat() {
    setState((s) => addChat(s, newChat(s.settings.model)));
    setSendError(null);
    setSidebarOpen(false);
  }

  function handleSelect(id) {
    setState((s) => selectChat(s, id));
    setSendError(null);
    setSidebarOpen(false);
  }

  async function handleSend(text) {
    // Work out the next state here (not inside setState) because we need the
    // full conversation to send.
    let next = state;
    let chatId = chat?.id;
    if (!chatId) {
      const created = newChat(state.settings.model);
      next = addChat(next, created);
      chatId = created.id;
    }
    next = appendMessage(next, chatId, { role: 'user', content: text, createdAt: Date.now() });
    setState(next);
    setSendError(null);
    setSendingChatId(chatId);

    const messages = next.chats.find((c) => c.id === chatId).messages;
    try {
      const answer = await sendChat({
        apiKey: next.settings.apiKey,
        model: next.settings.model,
        messages,
      });
      setState((s) =>
        appendMessage(s, chatId, {
          role: 'assistant',
          content: answer.content,
          model: answer.model,
          createdAt: Date.now(),
        }),
      );
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSendingChatId(null);
    }
  }

  return (
    <div className={styles.layout}>
      <Sidebar
        chats={state.chats}
        activeChatId={state.activeChatId}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelect={handleSelect}
        onRename={(id, title) => setState((s) => renameChat(s, id, title))}
        onDelete={(id) => setState((s) => deleteChat(s, id))}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenCourse={() => {
          setCourseOpen(true);
          setSidebarOpen(false);
        }}
      />

      <main className={styles.main}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setSidebarOpen(true)}
            aria-label="Show chats"
          >
            ☰
          </button>
          <h1 className={styles.title}>{chat?.title ?? 'my-harness'}</h1>
          <span className={styles.model} title="Model used for the next message (change in Settings)">
            {state.settings.model}
          </span>
        </header>

        {saveError && <p className={styles.banner}>{saveError}</p>}
        {!state.settings.apiKey && !settingsOpen && (
          <p className={styles.banner}>
            No OpenRouter key yet.{' '}
            <button type="button" className={styles.linkButton} onClick={() => setSettingsOpen(true)}>
              Add it in Settings
            </button>
          </p>
        )}

        <ChatView
          chat={chat}
          waitingHere={sendingChatId !== null && sendingChatId === chat?.id}
          busy={sendingChatId !== null}
          error={sendError}
          onSend={handleSend}
        />
      </main>

      {courseOpen && (
        <SyllabusPanel
          done={state.course.done}
          onToggle={(id) => setState((s) => toggleDone(s, id))}
          onClose={() => setCourseOpen(false)}
        />
      )}

      {settingsOpen && (
        <SettingsPanel
          settings={state.settings}
          onSave={(patch) => {
            setState((s) => updateSettings(s, patch));
            setSettingsOpen(false);
          }}
          onForgetKey={() => setState((s) => updateSettings(s, { apiKey: '' }))}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
}
