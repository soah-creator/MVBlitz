const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

let SAMPLE_VERSES = [];
try {
  SAMPLE_VERSES = require('../../data.js');
} catch (e) {
  console.warn('Could not load sample verses for seeding:', e.message);
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if (username.length < 3 || username.length > 50) {
    return res.status(400).json({ error: 'Username must be 3–50 characters' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    const hash = await bcrypt.hash(password, 12);

    const createUserAndSeed = db.transaction(() => {
      const result = db.prepare(
        'INSERT INTO users (username, password_hash) VALUES (?, ?)'
      ).run(username, hash);
      const userId = result.lastInsertRowid;

      if (Array.isArray(SAMPLE_VERSES) && SAMPLE_VERSES.length > 0) {
        const insertVerse = db.prepare(
          'INSERT INTO verses (id, user_id, book, chapter, verse, text, image_hint_url, text_hint) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        );
        SAMPLE_VERSES.forEach((v, i) => {
          const verseId = `verse-${userId}-seed-${i}`;
          insertVerse.run(
            verseId, userId,
            v.reference.book, v.reference.chapter, v.reference.verse,
            v.text, v.imageHintUrl || null, v.textHint || null
          );
        });
      }

      return userId;
    });

    const userId = createUserAndSeed();
    const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, username });
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Username already taken' });
    }
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, username: user.username });
});

module.exports = router;
