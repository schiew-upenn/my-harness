// Saving and loading everything the page remembers, in the browser's localStorage.
// Decision: docs/adr/0001 (QST-API-KEY = A: the key is remembered here;
// QST-STORAGE = B: a list of saved chats).
//
// Everything lives under ONE key as ONE versioned JSON record:
//   { version: 1, settings: { apiKey, model }, chats: [...], activeChatId }
// The `version` lets a future change of shape be detected instead of misread.
//
// Functions take the storage object as a parameter (window.localStorage in the
// app) so the tests can hand them a stand-in.

export const STORAGE_KEY = 'my-harness:v1';
export const DEFAULT_MODEL = 'openrouter/auto';

export function emptyState() {
  return {
    version: 1,
    settings: { apiKey: '', model: DEFAULT_MODEL },
    chats: [],
    activeChatId: null,
  };
}

function looksValid(parsed) {
  return (
    parsed !== null &&
    typeof parsed === 'object' &&
    parsed.version === 1 &&
    Array.isArray(parsed.chats)
  );
}

export function loadState(storage) {
  let raw;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked (e.g. some private-browsing modes): start fresh, in memory.
    return emptyState();
  }
  if (raw == null) return emptyState();

  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = null;
  }

  if (!looksValid(parsed)) {
    // Never silently throw away what we can't read: the next save would
    // overwrite it. Set it aside under a separate key first.
    try {
      storage.setItem(`${STORAGE_KEY}:unreadable-${Date.now()}`, raw);
    } catch {
      // Nothing more we can do; the fresh state below still lets the page work.
    }
    return emptyState();
  }

  const fresh = emptyState();
  return {
    ...fresh,
    ...parsed,
    settings: { ...fresh.settings, ...parsed.settings },
  };
}

export function saveState(storage, state) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        'Could not save — the browser’s storage for this page may be full. Deleting some old chats frees space.',
    };
  }
}
