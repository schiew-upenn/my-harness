// The list of saved chats (docs/adr/0001, QST-STORAGE = B): create, switch,
// rename, delete, and add messages.
//
// Every function takes the whole page state and returns a NEW state object
// (it never edits the old one). React relies on that to know what changed.

export const NEW_CHAT_TITLE = 'New chat';

export function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function newChat(model, now = Date.now(), id = makeId(), instructions = '') {
  return {
    id,
    title: NEW_CHAT_TITLE,
    autoTitle: true, // becomes false once titled from the first message, or renamed
    instructions, // this chat's own system message (docs/adr/0004, QST-WHERE = B)
    model,
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function activeChat(state) {
  return state.chats.find((c) => c.id === state.activeChatId) ?? null;
}

export function addChat(state, chat) {
  return { ...state, chats: [chat, ...state.chats], activeChatId: chat.id };
}

export function selectChat(state, id) {
  if (!state.chats.some((c) => c.id === id)) return state;
  return { ...state, activeChatId: id };
}

export function renameChat(state, id, title) {
  const clean = title.trim();
  if (!clean) return state; // a blank name would leave an unclickable-looking row
  return {
    ...state,
    chats: state.chats.map((c) =>
      c.id === id ? { ...c, title: clean, autoTitle: false } : c,
    ),
  };
}

export function deleteChat(state, id) {
  const chats = state.chats.filter((c) => c.id !== id);
  const activeChatId =
    state.activeChatId === id ? (chats[0]?.id ?? null) : state.activeChatId;
  return { ...state, chats, activeChatId };
}

// One line, at most `max` characters, for the sidebar.
export function titleFrom(text, max = 40) {
  const oneLine = text.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= max) return oneLine || NEW_CHAT_TITLE;
  return `${oneLine.slice(0, max - 1).trimEnd()}…`;
}

export function appendMessage(state, chatId, message, now = Date.now()) {
  return {
    ...state,
    chats: state.chats.map((c) => {
      if (c.id !== chatId) return c;
      const named =
        c.autoTitle && message.role === 'user'
          ? { title: titleFrom(message.content), autoTitle: false }
          : {};
      return {
        ...c,
        ...named,
        ...(message.model ? { model: message.model } : {}),
        messages: [...c.messages, message],
        updatedAt: now,
      };
    }),
  };
}

export function setInstructions(state, chatId, instructions) {
  return {
    ...state,
    chats: state.chats.map((c) => (c.id === chatId ? { ...c, instructions } : c)),
  };
}

export function updateSettings(state, patch) {
  return { ...state, settings: { ...state.settings, ...patch } };
}
