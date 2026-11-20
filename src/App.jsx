// The whole page: sidebar, then either the home screen ("Today's lesson",
// docs/adr/0006) or the open chat, plus the settings panel.
// Holds the page state, saves it to localStorage on every change, and sends
// messages to OpenRouter. Decisions: docs/adr/0001, docs/adr/0006.
import { useEffect, useState } from 'react';
import { loadState, saveState } from './lib/storage.js';
import {
  activeChat, addChat, appendMessage, deleteChat, newChat, renameChat, selectChat, setInstructions, updateSettings,
} from './lib/chats.js';
import { sendChat } from './lib/openrouter.js';
import { askMoreInstructions, toggleStep } from './lib/lessons.js';
import LessonHome from './components/LessonHome.jsx';
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
  // The page opens on the lesson (ADR-0006, QST-USE-CASE); chats are one click away.
  const [view, setView] = useState('home');

  useEffect(() => {
    const result = saveState(window.localStorage, state);
    setSaveError(result.ok ? null : result.error);
  }, [state]);

  const chat = activeChat(state);

  // New chats start with the default instructions chosen in Settings (Week 1).
  function freshChat(s) {
    return newChat(s.settings.model, Date.now(), undefined, s.settings.defaultInstructions ?? '');
  }

  function openChatView() {
    setView('chat');
    setSendError(null);
    setSidebarOpen(false);
  }

  function handleNewChat() {
    setState((s) => addChat(s, freshChat(s)));
    openChatView();
  }

  function handleSelect(id) {
    setState((s) => selectChat(s, id));
    openChatView();
  }

  // Add the user's message to `base` (a state that already holds the chat),
  // show it, and ask OpenRouter for the reply.
  async function sendIn(base, chatId, text) {
    const next = appendMessage(base, chatId, { role: 'user', content: text, createdAt: Date.now() });
    setState(next);
    setSendError(null);
    setSendingChatId(chatId);

    const sending = next.chats.find((c) => c.id === chatId);
    try {
      const answer = await sendChat({
        apiKey: next.settings.apiKey,
        model: next.settings.model,
        messages: sending.messages,
        instructions: sending.instructions ?? '',
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

  function handleSend(text) {
    // Work out the next state here (not inside setState) because we need the
    // full conversation to send.
    let base = state;
    let chatId = chat?.id;
    if (!chatId) {
      const created = freshChat(state);
      base = addChat(base, created);
      chatId = created.id;
    }
    sendIn(base, chatId, text);
  }

  // "Ask more" on the home screen: a new chat that already knows the lesson,
  // with the chosen question sent straight away (ADR-0006, QST-LESSON-SOURCE = C).
  function handleAskMore(lesson, ask) {
    if (sendingChatId !== null) return;
    const created = newChat(state.settings.model, Date.now(), undefined, askMoreInstructions(lesson));
    const base = renameChat(addChat(state, created), created.id, `Ask more: ${lesson.label}`);
    openChatView();
    sendIn(base, created.id, ask.prompt);
  }

  const onHome = view === 'home';

  return (
    <div className={styles.layout}>
      <Sidebar
        chats={state.chats}
        activeChatId={onHome ? null : state.activeChatId}
        homeActive={onHome}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenHome={() => {
          setView('home');
          setSidebarOpen(false);
        }}
        onNewChat={handleNewChat}
        onSelect={handleSelect}
        onRename={(id, title) => setState((s) => renameChat(s, id, title))}
        onDelete={(id) => setState((s) => deleteChat(s, id))}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <main className={styles.main}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setSidebarOpen(true)}
            aria-label="Show menu"
          >
            ☰
          </button>
          <h1 className={styles.title}>{onHome ? 'my-harness · your AI studio' : (chat?.title ?? 'New chat')}</h1>
          {!onHome && (
            <span className={styles.model} title="Model used for the next message (change in Settings)">
              {state.settings.model}
            </span>
          )}
        </header>

        {saveError && <p className={styles.banner}>{saveError}</p>}
        {!state.settings.apiKey && !settingsOpen && !onHome && (
          <p className={styles.banner}>
            No OpenRouter key yet.{' '}
            <button type="button" className={styles.linkButton} onClick={() => setSettingsOpen(true)}>
              Add it in Settings
            </button>
          </p>
        )}

        {onHome ? (
          <LessonHome
            state={state}
            busy={sendingChatId !== null}
            onToggleStep={(lessonId, stepId) => setState((s) => toggleStep(s, lessonId, stepId))}
            onAskMore={handleAskMore}
          />
        ) : (
          <ChatView
            chat={chat}
            waitingHere={sendingChatId !== null && sendingChatId === chat?.id}
            busy={sendingChatId !== null}
            error={sendError}
            onSend={handleSend}
            onInstructionsChange={(text) => chat && setState((s) => setInstructions(s, chat.id, text))}
          />
        )}
      </main>

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
