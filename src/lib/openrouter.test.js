// Calling OpenRouter from the browser (docs/adr/0001). `fetchImpl` stands in
// for the network so these tests never spend real credit or need a real key.
import { describe, it, expect, vi } from 'vitest';
import { sendChat, buildRequest, OPENROUTER_URL } from './openrouter.js';

function reply(status, body) {
  return async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });
}

const history = [
  { role: 'user', content: 'Hi', createdAt: 1 },
  { role: 'assistant', content: 'Hello!', createdAt: 2, model: 'x/y' },
  { role: 'user', content: 'What is CORS?', createdAt: 3 },
];

describe('the request', () => {
  it('goes only to OpenRouter, with the key in the Authorization header', () => {
    const { url, init } = buildRequest({ apiKey: 'sk-or-test', model: 'x/y', messages: history });
    expect(url).toBe(OPENROUTER_URL);
    expect(new URL(url).hostname).toBe('openrouter.ai');
    expect(init.headers.Authorization).toBe('Bearer sk-or-test');
    expect(init.body).not.toContain('sk-or-test'); // the key travels in the header only
  });

  it('sends the whole conversation, but only who-said-what (not our saved timestamps)', () => {
    const { init } = buildRequest({ apiKey: 'k', model: 'x/y', messages: history });
    expect(JSON.parse(init.body)).toEqual({
      model: 'x/y',
      messages: [
        { role: 'user', content: 'Hi' },
        { role: 'assistant', content: 'Hello!' },
        { role: 'user', content: 'What is CORS?' },
      ],
    });
  });
});

describe('the reply', () => {
  it('returns the assistant text and the model that actually answered', async () => {
    const fetchImpl = reply(200, { model: 'actual/model', choices: [{ message: { content: 'CORS is…' } }] });
    const r = await sendChat({ apiKey: 'k', model: 'openrouter/auto', messages: history, fetchImpl });
    expect(r).toEqual({ content: 'CORS is…', model: 'actual/model' });
  });

  it('without a key, nothing is sent and the user is told to add one', async () => {
    const fetchImpl = vi.fn();
    await expect(sendChat({ apiKey: '', model: 'x/y', messages: history, fetchImpl })).rejects.toThrow(/Settings/);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('a wrong or cancelled key gives a plain-language message', async () => {
    const fetchImpl = reply(401, { error: { code: 401, message: 'No auth credentials found' } });
    await expect(sendChat({ apiKey: 'bad', model: 'x/y', messages: history, fetchImpl })).rejects.toThrow(
      /did not accept your key/,
    );
  });

  it('a key that has used up its spending cap says so', async () => {
    // The course keys have a $10 cap; this is what hitting it looks like.
    const fetchImpl = reply(402, { error: { code: 402, message: 'Insufficient credits' } });
    await expect(sendChat({ apiKey: 'k', model: 'x/y', messages: history, fetchImpl })).rejects.toThrow(/out of credit/);
  });

  it('an error hidden inside a "200 OK" reply is still shown as an error', async () => {
    const fetchImpl = reply(200, { error: { code: 502, message: 'Provider returned error' } });
    await expect(sendChat({ apiKey: 'k', model: 'x/y', messages: history, fetchImpl })).rejects.toThrow(
      /Provider returned error/,
    );
  });

  it('no internet connection gives a plain-language message', async () => {
    const fetchImpl = async () => {
      throw new TypeError('Failed to fetch');
    };
    await expect(sendChat({ apiKey: 'k', model: 'x/y', messages: history, fetchImpl })).rejects.toThrow(
      /internet connection/,
    );
  });
});
