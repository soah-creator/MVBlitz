// API-backed storage for MemBlitz
// Replaces the previous localStorage implementation.

const TOKEN_KEY = 'mb_token';
const USERNAME_KEY = 'mb_username';

// ===== Auth helpers =====

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function isAuthenticated() {
  return !!getToken();
}

function setSession(token, username) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

function getStoredUsername() {
  return localStorage.getItem(USERNAME_KEY) || '';
}

// ===== API fetch helper =====

async function apiFetch(method, path, body = null) {
  const token = getToken();
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  };
  if (body !== null) opts.body = JSON.stringify(body);

  const res = await fetch(path, opts);

  if (res.status === 401) {
    clearSession();
    window.location.reload();
    throw new Error('Session expired. Please log in again.');
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return res.json();
}

// ===== Auth API =====

async function login(username, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Login failed');
  setSession(data.token, data.username);
  return data;
}

async function register(username, password) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  setSession(data.token, data.username);
  return data;
}

function logout() {
  clearSession();
}

// ===== Verse CRUD API =====

async function getVerses() {
  return apiFetch('GET', '/api/verses');
}

async function saveVerse(verse) {
  if (verse.id) {
    return apiFetch('PUT', `/api/verses/${verse.id}`, verse);
  }
  return apiFetch('POST', '/api/verses', verse);
}

async function deleteVerse(id) {
  return apiFetch('DELETE', `/api/verses/${id}`);
}

async function getVerseById(id) {
  const verses = await getVerses();
  return verses.find(v => v.id === id) || null;
}

// initializeWithSamples is now handled server-side on register.
// Keeping a no-op stub so any leftover references don't crash.
function initializeWithSamples() {}
