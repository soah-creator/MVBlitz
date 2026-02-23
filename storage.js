// Firestore storage utilities for MemBlitz

let currentUserId = null;

// Set the current user ID (called from auth state listener)
function setCurrentUser(uid) {
  currentUserId = uid;
}

// Get the user's verses collection reference
function versesCollection() {
  return db.collection('users').doc(currentUserId).collection('verses');
}

// Generate a unique ID
function generateId() {
  return 'verse-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Get all verses from Firestore
async function getVerses() {
  const snapshot = await versesCollection().get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add or update a verse
async function saveVerse(verse) {
  if (verse.id) {
    // Update existing verse
    await versesCollection().doc(verse.id).set(verse);
  } else {
    // Add new verse
    verse.id = generateId();
    await versesCollection().doc(verse.id).set(verse);
  }
  return verse;
}

// Delete a verse by ID
async function deleteVerse(id) {
  await versesCollection().doc(id).delete();
}

// Get a single verse by ID
async function getVerseById(id) {
  const doc = await versesCollection().doc(id).get();
  if (doc.exists) {
    return { id: doc.id, ...doc.data() };
  }
  return null;
}

// Toggle the favorite status of a verse
async function toggleFavorite(id) {
  const doc = await versesCollection().doc(id).get();
  if (doc.exists) {
    const current = doc.data().favorite || false;
    await versesCollection().doc(id).update({ favorite: !current });
    return !current;
  }
  return false;
}

// Get all favorite verses
async function getFavoriteVerses() {
  const snapshot = await versesCollection().where('favorite', '==', true).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Reset all verses to the latest sample data
async function resetToSamples() {
  if (typeof SAMPLE_VERSES === 'undefined') {
    return false;
  }

  // Delete all existing verses
  const snapshot = await versesCollection().get();
  const batchSize = 500;
  const docs = snapshot.docs;
  for (let i = 0; i < docs.length; i += batchSize) {
    const batch = db.batch();
    docs.slice(i, i + batchSize).forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }

  // Re-seed from SAMPLE_VERSES
  for (let i = 0; i < SAMPLE_VERSES.length; i += batchSize) {
    const batch = db.batch();
    SAMPLE_VERSES.slice(i, i + batchSize).forEach(verse => {
      batch.set(versesCollection().doc(verse.id), verse);
    });
    await batch.commit();
  }

  return true;
}

// ===== QUIZ HISTORY =====

// Get the user's quiz history collection reference
function quizHistoryCollection() {
  return db.collection('users').doc(currentUserId).collection('quizHistory');
}

// Save a quiz session
async function saveQuizSession(session) {
  session.date = new Date().toISOString();
  await quizHistoryCollection().add(session);
}

// Get recent quiz sessions
async function getQuizHistory(limit = 10) {
  const snapshot = await quizHistoryCollection()
    .orderBy('date', 'desc')
    .limit(limit)
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get aggregated quiz stats
async function getQuizStats() {
  const snapshot = await quizHistoryCollection().get();
  const sessions = snapshot.docs.map(doc => doc.data());

  let totalQuizzes = sessions.length;
  let totalVerses = 0;
  let totalCorrect = 0;
  let totalAnswered = 0;
  let bestScore = 0;

  sessions.forEach(s => {
    if (s.players) {
      s.players.forEach(p => {
        totalVerses += p.versesAnswered || 0;
        totalCorrect += p.score || 0;
        totalAnswered += p.versesAnswered || 0;
        const pct = p.versesAnswered > 0 ? Math.round((p.score / p.versesAnswered) * 100) : 0;
        if (pct > bestScore) bestScore = pct;
      });
    }
  });

  const avgAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return { totalQuizzes, totalVerses, avgAccuracy, bestScore };
}

// Initialize with sample verses if user has no verses yet
async function initializeWithSamples() {
  if (typeof SAMPLE_VERSES === 'undefined') {
    return false;
  }

  const snapshot = await versesCollection().limit(1).get();

  if (snapshot.empty) {
    // Seed all sample verses using a batch write
    const batchSize = 500; // Firestore batch limit
    for (let i = 0; i < SAMPLE_VERSES.length; i += batchSize) {
      const batch = db.batch();
      const chunk = SAMPLE_VERSES.slice(i, i + batchSize);
      chunk.forEach(verse => {
        const docRef = versesCollection().doc(verse.id);
        batch.set(docRef, verse);
      });
      await batch.commit();
    }
    return true;
  }
  return false;
}
