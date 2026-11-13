// The saved-chats sidebar (docs/adr/0001, QST-STORAGE = B).
import { describe, it, expect } from 'vitest';
import { emptyState } from './storage.js';
import {
  newChat, addChat, appendMessage, renameChat, deleteChat, selectChat, activeChat, titleFrom,
  NEW_CHAT_TITLE,
} from './chats.js';

function stateWithChats(...ids) {
  let state = emptyState();
  for (const id of [...ids].reverse()) state = addChat(state, newChat('m', 0, id));
  return state; // first id ends up on top and open
}

describe('chat titles', () => {
  it('a new chat is named after the first thing the user asks', () => {
    let s = stateWithChats('a');
    s = appendMessage(s, 'a', { role: 'user', content: 'What is a hash table?' });
    expect(activeChat(s).title).toBe('What is a hash table?');
  });

  it('later messages do not rename the chat', () => {
    let s = stateWithChats('a');
    s = appendMessage(s, 'a', { role: 'user', content: 'First question' });
    s = appendMessage(s, 'a', { role: 'assistant', content: 'An answer' });
    s = appendMessage(s, 'a', { role: 'user', content: 'Second question' });
    expect(activeChat(s).title).toBe('First question');
  });

  it('a chat the user renamed keeps their name', () => {
    let s = stateWithChats('a');
    s = renameChat(s, 'a', 'Algorithms homework');
    s = appendMessage(s, 'a', { role: 'user', content: 'Explain quicksort' });
    expect(activeChat(s).title).toBe('Algorithms homework');
  });

  it('long or multi-line first messages become a short one-line title', () => {
    const title = titleFrom('Please explain\n\nthe difference between a stack and a queue in detail');
    expect(title).not.toMatch(/\n/);
    expect(title.length).toBeLessThanOrEqual(40);
    expect(title.endsWith('…')).toBe(true);
  });

  it('renaming to a blank name is ignored rather than leaving an empty row', () => {
    let s = stateWithChats('a');
    s = renameChat(s, 'a', '   ');
    expect(activeChat(s).title).toBe(NEW_CHAT_TITLE);
  });
});

describe('switching and deleting', () => {
  it('deleting the chat you are looking at opens the next one', () => {
    let s = stateWithChats('a', 'b', 'c'); // 'a' is open
    s = deleteChat(s, 'a');
    expect(s.chats.map((c) => c.id)).toEqual(['b', 'c']);
    expect(s.activeChatId).toBe('b');
  });

  it('deleting a different chat leaves the open one open', () => {
    let s = stateWithChats('a', 'b');
    s = selectChat(s, 'b');
    s = deleteChat(s, 'a');
    expect(s.activeChatId).toBe('b');
  });

  it('deleting the last chat leaves an empty list and nothing open', () => {
    let s = stateWithChats('a');
    s = deleteChat(s, 'a');
    expect(s.chats).toEqual([]);
    expect(activeChat(s)).toBeNull();
  });

  it('a reply that arrives after its chat was deleted does not bring the chat back', () => {
    // The user hits Send, then deletes the chat while waiting for the reply.
    let s = stateWithChats('a', 'b');
    s = deleteChat(s, 'a');
    s = appendMessage(s, 'a', { role: 'assistant', content: 'late reply' });
    expect(s.chats.map((c) => c.id)).toEqual(['b']);
  });
});
