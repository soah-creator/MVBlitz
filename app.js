// MemBlitz - Bible Memory Verse Quiz App

// API.Bible Configuration
const BIBLE_API_KEY = 'wtWRu8mZevMTv5DwqjO6g'; // Get free key from https://scripture.api.bible
const NKJV_BIBLE_ID = 'de4e12af7f28f599-02'; // NKJV Bible ID in API.Bible

// Book name to API.Bible abbreviation mapping
const BOOK_ABBREVIATIONS = {
  "Genesis": "GEN", "Exodus": "EXO", "Leviticus": "LEV", "Numbers": "NUM",
  "Deuteronomy": "DEU", "Joshua": "JOS", "Judges": "JDG", "Ruth": "RUT",
  "1 Samuel": "1SA", "2 Samuel": "2SA", "1 Kings": "1KI", "2 Kings": "2KI",
  "1 Chronicles": "1CH", "2 Chronicles": "2CH", "Ezra": "EZR", "Nehemiah": "NEH",
  "Esther": "EST", "Job": "JOB", "Psalm": "PSA", "Proverbs": "PRO",
  "Ecclesiastes": "ECC", "Song of Solomon": "SNG", "Isaiah": "ISA", "Jeremiah": "JER",
  "Lamentations": "LAM", "Ezekiel": "EZK", "Daniel": "DAN", "Hosea": "HOS",
  "Joel": "JOL", "Amos": "AMO", "Obadiah": "OBA", "Jonah": "JON",
  "Micah": "MIC", "Nahum": "NAM", "Habakkuk": "HAB", "Zephaniah": "ZEP",
  "Haggai": "HAG", "Zechariah": "ZEC", "Malachi": "MAL", "Matthew": "MAT",
  "Mark": "MRK", "Luke": "LUK", "John": "JHN", "Acts": "ACT",
  "Romans": "ROM", "1 Corinthians": "1CO", "2 Corinthians": "2CO", "Galatians": "GAL",
  "Ephesians": "EPH", "Philippians": "PHP", "Colossians": "COL",
  "1 Thessalonians": "1TH", "2 Thessalonians": "2TH", "1 Timothy": "1TI",
  "2 Timothy": "2TI", "Titus": "TIT", "Philemon": "PHM", "Hebrews": "HEB",
  "James": "JAS", "1 Peter": "1PE", "2 Peter": "2PE", "1 John": "1JN",
  "2 John": "2JN", "3 John": "3JN", "Jude": "JUD", "Revelation": "REV"
};

// Bible books for dropdown
const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalm", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
  "Ephesians", "Philippians", "Colossians", "1 Thessalonians",
  "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus",
  "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

// Quiz state
let quizState = {
  verses: [],
  currentIndex: 0,
  score: 0,
  answered: false
};

// DOM Elements
const views = {
  home: document.getElementById('home-view'),
  quiz: document.getElementById('quiz-view'),
  quizComplete: document.getElementById('quiz-complete-view'),
  manage: document.getElementById('manage-view'),
  form: document.getElementById('form-view')
};

// Initialize the app
function init() {
  // Initialize with sample verses if empty
  initializeWithSamples();

  // Populate book dropdown
  populateBookDropdown();

  // Set up event listeners
  setupEventListeners();

  // Update verse count on home
  updateVerseCount();
}

// Populate the book dropdown
function populateBookDropdown() {
  const select = document.getElementById('verse-book');
  BIBLE_BOOKS.forEach(book => {
    const option = document.createElement('option');
    option.value = book;
    option.textContent = book;
    select.appendChild(option);
  });
}

// Set up all event listeners
function setupEventListeners() {
  // Home view
  document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
  document.getElementById('manage-verses-btn').addEventListener('click', () => showView('manage'));

  // Quiz view
  document.getElementById('quiz-back-btn').addEventListener('click', () => showView('home'));
  document.getElementById('reveal-answer-btn').addEventListener('click', revealAnswer);
  document.getElementById('knew-it-btn').addEventListener('click', () => rateAnswer(true));
  document.getElementById('still-learning-btn').addEventListener('click', () => rateAnswer(false));
  document.getElementById('show-image-hint').addEventListener('click', showImageHint);
  document.getElementById('show-text-hint').addEventListener('click', showTextHint);

  // Quiz complete view
  document.getElementById('restart-quiz-btn').addEventListener('click', startQuiz);
  document.getElementById('back-home-btn').addEventListener('click', () => showView('home'));

  // Manage view
  document.getElementById('manage-back-btn').addEventListener('click', () => showView('home'));
  document.getElementById('add-verse-btn').addEventListener('click', () => openVerseForm());
  document.getElementById('add-first-verse-btn').addEventListener('click', () => openVerseForm());

  // Form view
  document.getElementById('form-back-btn').addEventListener('click', () => showView('manage'));
  document.getElementById('cancel-form-btn').addEventListener('click', () => showView('manage'));
  document.getElementById('verse-form').addEventListener('submit', saveVerseForm);
  document.getElementById('verse-image-url').addEventListener('input', previewImage);

  // Dynamic form validation
  document.getElementById('verse-book').addEventListener('change', onBookChange);
  document.getElementById('verse-chapter').addEventListener('change', onChapterChange);
  document.getElementById('verse-verse').addEventListener('input', debounce(onVerseChange, 500));
}

// Show a specific view
function showView(viewName) {
  Object.values(views).forEach(view => view.classList.remove('active'));
  views[viewName].classList.add('active');

  // Update content when showing certain views
  if (viewName === 'home') {
    updateVerseCount();
  } else if (viewName === 'manage') {
    renderVerseList();
  }
}

// Update verse count on home screen
function updateVerseCount() {
  const count = getVerses().length;
  const text = count === 1 ? '1 verse available' : `${count} verses available`;
  document.getElementById('verse-count').textContent = text;
}

// Format verse reference for display
function formatReference(ref) {
  return `${ref.book} ${ref.chapter}:${ref.verse}`;
}

// ===== QUIZ FUNCTIONS =====

// Start the quiz
function startQuiz() {
  const allVerses = getVerses();
  if (allVerses.length === 0) {
    alert('No verses available. Please add some verses first.');
    showView('manage');
    return;
  }

  // Shuffle and take up to 10 verses
  quizState.verses = shuffleArray([...allVerses]);
  quizState.currentIndex = 0;
  quizState.score = 0;

  showView('quiz');
  displayCurrentVerse();
}

// Shuffle array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Display the current verse in quiz mode (flashcard style)
function displayCurrentVerse() {
  const verse = quizState.verses[quizState.currentIndex];
  quizState.answered = false;

  // Update progress
  const currentNum = quizState.currentIndex + 1;
  const totalNum = quizState.verses.length;
  document.getElementById('quiz-progress').textContent = `Verse ${currentNum} of ${totalNum}`;

  // Update progress bar
  const progressPercent = (currentNum / totalNum) * 100;
  document.getElementById('progress-bar').style.width = `${progressPercent}%`;

  // Update reference on both sides
  const reference = formatReference(verse.reference);
  document.getElementById('verse-reference').textContent = reference;
  document.getElementById('verse-reference-back').textContent = reference;

  // Set up verse text for reveal
  document.getElementById('verse-text-display').textContent = verse.text;

  // Reset hints
  document.getElementById('image-hint-container').classList.add('hidden');
  document.getElementById('text-hint-container').classList.add('hidden');

  // Set up hint content
  const hintImage = document.getElementById('hint-image');
  if (verse.imageHintUrl) {
    hintImage.src = verse.imageHintUrl;
    document.getElementById('show-image-hint').disabled = false;
  } else {
    document.getElementById('show-image-hint').disabled = true;
  }

  if (verse.textHint) {
    document.getElementById('hint-text').textContent = verse.textHint;
    document.getElementById('show-text-hint').disabled = false;
  } else {
    document.getElementById('show-text-hint').disabled = true;
  }

  // Show front, hide back
  document.getElementById('flashcard-front').classList.remove('hidden');
  document.getElementById('flashcard-back').classList.add('hidden');
}

// Reveal the answer (flip flashcard)
function revealAnswer() {
  document.getElementById('flashcard-front').classList.add('hidden');
  document.getElementById('flashcard-back').classList.remove('hidden');
}

// Rate whether user knew the answer
function rateAnswer(knewIt) {
  if (knewIt) {
    quizState.score++;
  }

  // Move to next verse
  quizState.currentIndex++;

  if (quizState.currentIndex >= quizState.verses.length) {
    showQuizComplete();
  } else {
    displayCurrentVerse();
  }
}

// Show quiz completion screen
function showQuizComplete() {
  document.getElementById('final-score').textContent =
    `${quizState.score}/${quizState.verses.length}`;
  showView('quizComplete');
}

// Show image hint
function showImageHint() {
  document.getElementById('image-hint-container').classList.remove('hidden');
}

// Show text hint
function showTextHint() {
  document.getElementById('text-hint-container').classList.remove('hidden');
}

// ===== MANAGE VERSES FUNCTIONS =====

// Render the verse list
function renderVerseList() {
  const verses = getVerses();
  const listEl = document.getElementById('verse-list');
  const emptyState = document.getElementById('empty-state');

  listEl.innerHTML = '';

  if (verses.length === 0) {
    emptyState.classList.remove('hidden');
    listEl.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  listEl.classList.remove('hidden');

  verses.forEach(verse => {
    const item = document.createElement('div');
    item.className = 'verse-item';
    item.innerHTML = `
      <div class="verse-item-info">
        <div class="verse-item-reference">${formatReference(verse.reference)}</div>
        <div class="verse-item-preview">${verse.text}</div>
      </div>
      <div class="verse-item-actions">
        <button class="btn btn-secondary btn-small edit-btn" data-id="${verse.id}">Edit</button>
        <button class="btn btn-danger btn-small delete-btn" data-id="${verse.id}">Delete</button>
      </div>
    `;
    listEl.appendChild(item);
  });

  // Add event listeners for edit/delete buttons
  listEl.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openVerseForm(btn.dataset.id));
  });

  listEl.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => confirmDeleteVerse(btn.dataset.id));
  });
}

// Confirm and delete a verse
function confirmDeleteVerse(id) {
  const verse = getVerseById(id);
  if (verse && confirm(`Delete "${formatReference(verse.reference)}"?`)) {
    deleteVerse(id);
    renderVerseList();
  }
}

// ===== FORM FUNCTIONS =====

// Open the verse form (for add or edit)
function openVerseForm(id = null) {
  const form = document.getElementById('verse-form');
  const title = document.getElementById('form-title');
  const chapterSelect = document.getElementById('verse-chapter');
  const verseInput = document.getElementById('verse-verse');
  const verseText = document.getElementById('verse-text');

  form.reset();
  document.getElementById('image-preview').classList.remove('visible');
  document.getElementById('verse-range-hint').textContent = '';
  hideFetchStatus();

  // Reset chapter/verse to disabled state
  chapterSelect.innerHTML = '<option value="">--</option>';
  chapterSelect.disabled = true;
  verseInput.disabled = true;
  verseText.value = '';
  verseText.setAttribute('readonly', true);

  if (id) {
    // Edit mode
    const verse = getVerseById(id);
    if (verse) {
      title.textContent = 'Edit Verse';
      document.getElementById('verse-id').value = verse.id;

      // Set book and trigger chapter population
      document.getElementById('verse-book').value = verse.reference.book;
      onBookChange();

      // Set chapter and trigger verse range hint
      chapterSelect.value = verse.reference.chapter;
      onChapterChange();

      // Set verse and text
      verseInput.value = verse.reference.verse;
      verseText.value = verse.text;
      verseText.removeAttribute('readonly'); // Allow editing in edit mode

      document.getElementById('verse-image-url').value = verse.imageHintUrl || '';
      document.getElementById('verse-text-hint').value = verse.textHint || '';

      if (verse.imageHintUrl) {
        previewImage();
      }
    }
  } else {
    // Add mode
    title.textContent = 'Add New Verse';
    document.getElementById('verse-id').value = '';
  }

  showView('form');
}

// Preview image from URL
function previewImage() {
  const url = document.getElementById('verse-image-url').value;
  const preview = document.getElementById('image-preview');

  if (url) {
    preview.src = url;
    preview.classList.add('visible');
    preview.onerror = () => preview.classList.remove('visible');
  } else {
    preview.classList.remove('visible');
  }
}

// Save the verse form
function saveVerseForm(e) {
  e.preventDefault();

  const id = document.getElementById('verse-id').value || null;
  const verse = {
    id: id,
    reference: {
      book: document.getElementById('verse-book').value,
      chapter: parseInt(document.getElementById('verse-chapter').value),
      verse: document.getElementById('verse-verse').value
    },
    text: document.getElementById('verse-text').value.trim(),
    imageHintUrl: document.getElementById('verse-image-url').value.trim() || null,
    textHint: document.getElementById('verse-text-hint').value.trim() || null
  };

  saveVerse(verse);
  showView('manage');
}

// ===== DYNAMIC FORM VALIDATION =====

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// When book is selected, populate chapters
function onBookChange() {
  const book = document.getElementById('verse-book').value;
  const chapterSelect = document.getElementById('verse-chapter');
  const verseInput = document.getElementById('verse-verse');
  const verseText = document.getElementById('verse-text');

  // Reset downstream fields
  chapterSelect.innerHTML = '<option value="">Select chapter...</option>';
  verseInput.value = '';
  verseInput.disabled = true;
  verseText.value = '';
  document.getElementById('verse-range-hint').textContent = '';

  if (!book) {
    chapterSelect.disabled = true;
    return;
  }

  // Populate chapters
  const chapterCount = getChapterCount(book);
  for (let i = 1; i <= chapterCount; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    chapterSelect.appendChild(option);
  }
  chapterSelect.disabled = false;
}

// When chapter is selected, enable verse input and show range
function onChapterChange() {
  const book = document.getElementById('verse-book').value;
  const chapter = parseInt(document.getElementById('verse-chapter').value);
  const verseInput = document.getElementById('verse-verse');
  const verseText = document.getElementById('verse-text');
  const rangeHint = document.getElementById('verse-range-hint');

  verseInput.value = '';
  verseText.value = '';

  if (!book || !chapter) {
    verseInput.disabled = true;
    rangeHint.textContent = '';
    return;
  }

  const verseCount = getVerseCount(book, chapter);
  rangeHint.textContent = `(1-${verseCount})`;
  verseInput.disabled = false;
  verseInput.max = verseCount;
  verseInput.placeholder = `1-${verseCount}`;
}

// When verse is entered, validate and fetch text
function onVerseChange() {
  const book = document.getElementById('verse-book').value;
  const chapter = parseInt(document.getElementById('verse-chapter').value);
  const verseValue = document.getElementById('verse-verse').value.trim();

  if (!book || !chapter || !verseValue) {
    return;
  }

  // Validate the verse reference
  if (!isValidReference(book, chapter, verseValue)) {
    const verseCount = getVerseCount(book, chapter);
    showFetchStatus(`Invalid verse. Must be between 1 and ${verseCount}`, true);
    return;
  }

  // Fetch the verse text
  fetchVerseText(book, chapter, verseValue);
}

// Show fetch status message
function showFetchStatus(message, isError = false) {
  const status = document.getElementById('fetch-status');
  status.textContent = message;
  status.classList.remove('hidden', 'error');
  if (isError) {
    status.classList.add('error');
  }
}

// Hide fetch status
function hideFetchStatus() {
  document.getElementById('fetch-status').classList.add('hidden');
}

// Fetch verse text from API.Bible (NKJV)
async function fetchVerseText(book, chapter, verse) {
  const verseText = document.getElementById('verse-text');

  // Check if API key is configured
  if (BIBLE_API_KEY === 'YOUR_API_KEY_HERE') {
    showFetchStatus('API key not configured. Please enter verse manually.', true);
    verseText.removeAttribute('readonly');
    setTimeout(hideFetchStatus, 3000);
    return;
  }

  // Format the passage ID for API.Bible (e.g., "JHN.3.16" or "JHN.3.16-JHN.3.17")
  const bookAbbr = BOOK_ABBREVIATIONS[book];
  if (!bookAbbr) {
    showFetchStatus('Unknown book. Please enter verse manually.', true);
    verseText.removeAttribute('readonly');
    setTimeout(hideFetchStatus, 3000);
    return;
  }

  let passageId;
  if (verse.includes('-')) {
    const [startVerse, endVerse] = verse.split('-').map(v => v.trim());
    passageId = `${bookAbbr}.${chapter}.${startVerse}-${bookAbbr}.${chapter}.${endVerse}`;
  } else {
    passageId = `${bookAbbr}.${chapter}.${verse}`;
  }

  showFetchStatus('Loading verse...');

  try {
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${NKJV_BIBLE_ID}/passages/${passageId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false`,
      {
        headers: {
          'api-key': BIBLE_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error('Verse not found');
    }

    const data = await response.json();

    if (data.data && data.data.content) {
      // Clean up the text (remove extra whitespace and newlines)
      const cleanText = data.data.content.replace(/\s+/g, ' ').trim();
      verseText.value = cleanText;
      verseText.removeAttribute('readonly');
      hideFetchStatus();
    } else {
      throw new Error('No text returned');
    }
  } catch (error) {
    showFetchStatus('Could not fetch verse. Please enter manually.', true);
    verseText.removeAttribute('readonly');
    setTimeout(hideFetchStatus, 3000);
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
