const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

function rowToVerse(row) {
  return {
    id: row.id,
    reference: {
      book: row.book,
      chapter: row.chapter,
      verse: row.verse
    },
    text: row.text,
    imageHintUrl: row.image_hint_url || null,
    textHint: row.text_hint || null
  };
}

// GET /api/verses
router.get('/', (req, res) => {
  const rows = db.prepare(
    'SELECT * FROM verses WHERE user_id = ? ORDER BY created_at ASC'
  ).all(req.userId);
  res.json(rows.map(rowToVerse));
});

// POST /api/verses
router.post('/', (req, res) => {
  const { reference, text, imageHintUrl, textHint } = req.body;
  if (!reference || !text) {
    return res.status(400).json({ error: 'reference and text are required' });
  }

  const id = 'verse-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  db.prepare(
    'INSERT INTO verses (id, user_id, book, chapter, verse, text, image_hint_url, text_hint) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(id, req.userId, reference.book, reference.chapter, reference.verse, text, imageHintUrl || null, textHint || null);

  res.status(201).json(rowToVerse({ id, book: reference.book, chapter: reference.chapter, verse: reference.verse, text, image_hint_url: imageHintUrl || null, text_hint: textHint || null }));
});

// PUT /api/verses/:id
router.put('/:id', (req, res) => {
  const { reference, text, imageHintUrl, textHint } = req.body;
  if (!reference || !text) {
    return res.status(400).json({ error: 'reference and text are required' });
  }

  const result = db.prepare(
    'UPDATE verses SET book = ?, chapter = ?, verse = ?, text = ?, image_hint_url = ?, text_hint = ? WHERE id = ? AND user_id = ?'
  ).run(reference.book, reference.chapter, reference.verse, text, imageHintUrl || null, textHint || null, req.params.id, req.userId);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Verse not found' });
  }

  res.json(rowToVerse({ id: req.params.id, book: reference.book, chapter: reference.chapter, verse: reference.verse, text, image_hint_url: imageHintUrl || null, text_hint: textHint || null }));
});

// DELETE /api/verses/:id
router.delete('/:id', (req, res) => {
  const result = db.prepare(
    'DELETE FROM verses WHERE id = ? AND user_id = ?'
  ).run(req.params.id, req.userId);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Verse not found' });
  }

  res.json({ success: true });
});

module.exports = router;
