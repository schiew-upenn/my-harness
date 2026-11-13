// What the page remembers between visits (docs/adr/0001, QST-API-KEY + QST-STORAGE).
import { describe, it, expect } from 'vitest';
import { loadState, saveState, emptyState, STORAGE_KEY, DEFAULT_MODEL } from './storage.js';

// A stand-in for window.localStorage: same three methods, kept in a Map.
function fakeStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
  };
}

describe('loading and saving', () => {
  it('a first-time visitor starts with no chats, no key, and the default model', () => {
    const state = loadState(fakeStorage());
    expect(state.chats).toEqual([]);
    expect(state.settings.apiKey).toBe('');
    expect(state.settings.model).toBe(DEFAULT_MODEL);
  });

  it('the key and saved chats are still there after the page is reloaded', () => {
    const storage = fakeStorage();
    const before = {
      ...emptyState(),
      settings: { apiKey: 'sk-or-test', model: 'some/model' },
      chats: [{ id: 'c1', title: 'Hello', messages: [{ role: 'user', content: 'hi' }] }],
      activeChatId: 'c1',
    };
    expect(saveState(storage, before)).toEqual({ ok: true });

    const after = loadState(storage); // what a reload does
    expect(after).toEqual(before);
  });

  it('unreadable saved data is set aside, not silently overwritten by the next save', () => {
    // e.g. a half-written save, or data from some future version of the page
    const storage = fakeStorage({ [STORAGE_KEY]: '{"version":1,"chats":[' });
    const state = loadState(storage);

    expect(state.chats).toEqual([]); // the page still opens
    const backups = [...storage.data.keys()].filter((k) => k.startsWith(`${STORAGE_KEY}:unreadable-`));
    expect(backups).toHaveLength(1);
    expect(storage.data.get(backups[0])).toBe('{"version":1,"chats":[');
  });

  it('a full browser storage reports a readable error instead of crashing the page', () => {
    const storage = fakeStorage();
    storage.setItem = () => {
      throw new DOMException('quota exceeded', 'QuotaExceededError');
    };
    const result = saveState(storage, emptyState());
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/full/);
  });

  it('settings saved before a new setting existed still load, with the new setting defaulted', () => {
    const storage = fakeStorage({
      [STORAGE_KEY]: JSON.stringify({ version: 1, settings: { apiKey: 'sk-or-old' }, chats: [] }),
    });
    const state = loadState(storage);
    expect(state.settings.apiKey).toBe('sk-or-old');
    expect(state.settings.model).toBe(DEFAULT_MODEL);
  });
});
