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
