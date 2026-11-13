// Talking to OpenRouter straight from the browser (no backend — docs/adr/0001).
// OpenRouter allows this: a CORS preflight from https://schiew-upenn.github.io
// returned `access-control-allow-origin: *` (checked 2026-11-12, ADR-0001
// Open Follow-ups).
//
// Safety rule from ADR-0001: the key is only ever sent to openrouter.ai, in
// the Authorization header, and nowhere else.

export const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export class ChatError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ChatError';
  }
}

export function buildRequest({ apiKey, model, messages }) {
  return {
    url: OPENROUTER_URL,
    init: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Title': 'my-harness', // shows the app's name in the key owner's OpenRouter activity
      },
      body: JSON.stringify({
        model,
        // Our saved messages carry extra fields (createdAt, model); the API
        // only needs who said it and what was said.
        messages: messages.map(({ role, content }) => ({ role, content })),
      }),
    },
  };
}

export function friendlyError(status, body) {
  const detail = body?.error?.message;
  switch (status) {
    case 401:
      return 'OpenRouter did not accept your key. Check it in Settings.';
    case 402:
      return 'This OpenRouter key is out of credit. Ask whoever gave you the key, or add credit on openrouter.ai.';
    case 429:
      return 'Too many requests right now — wait a moment and try again.';
    case 400:
      return `OpenRouter rejected the request${detail ? `: ${detail}` : ''}. Check the model name in Settings.`;
    default:
      return `OpenRouter error ${status}${detail ? `: ${detail}` : ''}.`;
  }
}

export async function sendChat({ apiKey, model, messages, fetchImpl = globalThis.fetch, signal }) {
  if (!apiKey) {
    throw new ChatError('Add your OpenRouter key in Settings first.');
  }

  const { url, init } = buildRequest({ apiKey, model, messages });

  let res;
  try {
    res = await fetchImpl(url, { ...init, signal });
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    throw new ChatError('Could not reach OpenRouter. Check your internet connection.');
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) throw new ChatError(friendlyError(res.status, body));

  // OpenRouter can answer "200 OK" and still put an error inside the body
  // (for example when the chosen model's provider fails mid-request).
  if (body?.error) throw new ChatError(friendlyError(body.error.code ?? res.status, body));

  const content = body?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || content === '') {
    throw new ChatError('OpenRouter sent back an empty reply. Try again, or pick another model in Settings.');
  }
  return { content, model: body.model ?? model };
}
