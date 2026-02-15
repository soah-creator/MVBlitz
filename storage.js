// Local storage utilities for MemBlitz
const STORAGE_KEY = 'memblitz_verses';
const SAMPLE_VERSION_KEY = 'memblitz_sample_version';
const CURRENT_SAMPLE_VERSION = 4; // Increment this when SAMPLE_VERSES changes

// Generate a unique ID
function generateId() {
  return 'verse-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Get all verses from storage
function getVerses() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save all verses to storage
function saveAllVerses(verses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(verses));
}

// Add or update a verse
function saveVerse(verse) {
  const verses = getVerses();

  if (verse.id) {
    // Update existing verse
    const index = verses.findIndex(v => v.id === verse.id);
    if (index !== -1) {
      verses[index] = verse;
    } else {
      verses.push(verse);
    }
  } else {
    // Add new verse
    verse.id = generateId();
    verses.push(verse);
  }

  saveAllVerses(verses);
  return verse;
}

// Delete a verse by ID
function deleteVerse(id) {
  const verses = getVerses();
  const filtered = verses.filter(v => v.id !== id);
  saveAllVerses(filtered);
}

// Get a single verse by ID
function getVerseById(id) {
  const verses = getVerses();
  return verses.find(v => v.id === id);
}

// Initialize with sample verses if storage is empty or sample version changed
function initializeWithSamples() {
  if (typeof SAMPLE_VERSES === 'undefined') {
    return false;
  }

  const verses = getVerses();
  const storedVersion = localStorage.getItem(SAMPLE_VERSION_KEY);
  const currentVersion = CURRENT_SAMPLE_VERSION.toString();

  // Initialize if empty or if sample data version has changed
  if (verses.length === 0 || storedVersion !== currentVersion) {
    // Only auto-replace if user hasn't added custom verses
    const hasOnlySampleVerses = verses.every(v => v.id && v.id.startsWith('sample-'));

    if (verses.length === 0 || hasOnlySampleVerses) {
      saveAllVerses(SAMPLE_VERSES);
      localStorage.setItem(SAMPLE_VERSION_KEY, currentVersion);
      return true;
    }
  }
  return false;
}

// Clear all verses (for testing/reset)
function clearAllVerses() {
  localStorage.removeItem(STORAGE_KEY);
}
