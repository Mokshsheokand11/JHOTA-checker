// This file no longer uses Gemini SDK directly in the browser.
// All AI requests go through a safe backend endpoint.

export async function evaluateJhota(userData: any) {
  const res = await fetch('/api/jhota', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Server error while evaluating Jhota');
  }

  const body = await res.json();
  return body.text;
}
