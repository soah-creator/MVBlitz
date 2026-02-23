// MemBlitz - Bible Memory Verse Quiz App

// API.Bible Configuration
const BIBLE_API_KEY = 'wtWRu8mZevMTv5DwqjO6g'; // Get free key from https://scripture.api.bible
const NKJV_BIBLE_ID = 'de4e12af7f28f599-02'; // NKJV Bible ID in API.Bible

// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_KEY_HERE'; // Get free key from https://unsplash.com/developers

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
  answered: false,
  versesAnswered: 0,
  lastMode: 'random'
};

// Auth state
let isAuthMode = 'login'; // 'login' or 'signup'

// DOM Elements
const views = {
  auth: document.getElementById('auth-view'),
  home: document.getElementById('home-view'),
  quiz: document.getElementById('quiz-view'),
  quizComplete: document.getElementById('quiz-complete-view'),
  manage: document.getElementById('manage-view'),
  form: document.getElementById('form-view')
};

// ===== AUTHENTICATION =====

// Set up auth event listeners immediately (before auth state fires)
function setupAuthListeners() {
  document.getElementById('auth-form').addEventListener('submit', onAuthFormSubmit);
  document.getElementById('login-tab').addEventListener('click', () => switchAuthMode('login'));
  document.getElementById('signup-tab').addEventListener('click', () => switchAuthMode('signup'));
  document.getElementById('google-sign-in-btn').addEventListener('click', signInWithGoogle);
  document.getElementById('guest-btn').addEventListener('click', signInAsGuest);
  document.getElementById('logout-btn').addEventListener('click', handleSignOut);
}

// Attach auth listeners right away
setupAuthListeners();

// Auth state listener
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // User is signed in
    setCurrentUser(user.uid);
    displayUserInfo(user);
    await init();
    showView('home');
  } else {
    // User is signed out
    setCurrentUser(null);
    showView('auth');
  }
});

// Display user info in header
function displayUserInfo(user) {
  const userInfo = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-btn');

  if (user.isAnonymous) {
    userInfo.textContent = 'Guest';
    logoutBtn.textContent = 'Sign Up / Log In';
  } else {
    userInfo.textContent = user.displayName || user.email;
    logoutBtn.textContent = 'Log Out';
  }
}

// Sign in as guest (anonymous)
async function signInAsGuest() {
  try {
    hideAuthError();
    await auth.signInAnonymously();
  } catch (error) {
    showAuthError('Could not start guest session. Please try again.');
  }
}

// Sign up with email/password
async function signUpWithEmail(email, password) {
  try {
    hideAuthError();
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    showAuthError(getAuthErrorMessage(error.code));
  }
}

// Sign in with email/password
async function signInWithEmail(email, password) {
  try {
    hideAuthError();
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    showAuthError(getAuthErrorMessage(error.code));
  }
}

// Sign in with Google
async function signInWithGoogle() {
  try {
    hideAuthError();
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  } catch (error) {
    console.error('Google sign-in error:', error.code, error.message);
    if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
      showAuthError(getAuthErrorMessage(error.code));
    }
  }
}

// Sign out
async function handleSignOut() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

// Get user-friendly auth error messages
function getAuthErrorMessage(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
}

// Show auth error
function showAuthError(message) {
  const errorEl = document.getElementById('auth-error');
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}

// Hide auth error
function hideAuthError() {
  document.getElementById('auth-error').classList.add('hidden');
}

// ===== APP INITIALIZATION =====

// Initialize the app
async function init() {
  // Initialize with sample verses if empty
  await initializeWithSamples();

  // Populate book dropdown
  populateBookDropdown();

  // Set up event listeners (only once)
  if (!init._listenersSet) {
    setupEventListeners();
    init._listenersSet = true;
  }

  // Update verse count on home
  await updateVerseCount();
}

// Populate the book dropdown
function populateBookDropdown() {
  const select = document.getElementById('verse-book');
  // Clear existing options except the first placeholder
  while (select.options.length > 1) {
    select.remove(1);
  }
  BIBLE_BOOKS.forEach(book => {
    const option = document.createElement('option');
    option.value = book;
    option.textContent = book;
    select.appendChild(option);
  });
}

// Set up all event listeners
function setupEventListeners() {
  // Home view — quiz mode buttons
  document.getElementById('quiz-favorites-btn').addEventListener('click', () => startQuiz('favorites'));
  document.getElementById('quiz-random-btn').addEventListener('click', () => startQuiz('random'));
  document.getElementById('manage-verses-btn').addEventListener('click', () => showView('manage'));

  // Quiz view
  document.getElementById('quiz-back-btn').addEventListener('click', () => showView('home'));
  document.getElementById('end-session-btn').addEventListener('click', endSession);
  document.getElementById('reveal-answer-btn').addEventListener('click', revealAnswer);
  document.getElementById('knew-it-btn').addEventListener('click', () => rateAnswer(true));
  document.getElementById('still-learning-btn').addEventListener('click', () => rateAnswer(false));
  document.getElementById('show-image-hint').addEventListener('click', showImageHint);
  document.getElementById('show-text-hint').addEventListener('click', showTextHint);

  // Quiz complete view
  document.getElementById('restart-quiz-btn').addEventListener('click', () => startQuiz(quizState.lastMode || 'random'));
  document.getElementById('back-home-btn').addEventListener('click', () => showView('home'));

  // Manage view
  document.getElementById('manage-back-btn').addEventListener('click', () => showView('home'));
  document.getElementById('add-verse-btn').addEventListener('click', () => openVerseForm());
  document.getElementById('add-first-verse-btn').addEventListener('click', () => openVerseForm());

  // Form view
  document.getElementById('form-back-btn').addEventListener('click', () => showView('manage'));
  document.getElementById('cancel-form-btn').addEventListener('click', () => showView('manage'));
  document.getElementById('verse-form').addEventListener('submit', saveVerseForm);
  document.getElementById('search-image-btn').addEventListener('click', onSearchImageClick);
  document.getElementById('clear-image-btn').addEventListener('click', clearSelectedImage);
  document.getElementById('verse-image-url-manual').addEventListener('input', onManualUrlInput);

  // Dynamic form validation
  document.getElementById('verse-book').addEventListener('change', onBookChange);
  document.getElementById('verse-chapter').addEventListener('change', onChapterChange);
  document.getElementById('verse-verse').addEventListener('input', debounce(onVerseChange, 500));
}

// Handle auth form submission
async function onAuthFormSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;

  if (isAuthMode === 'signup') {
    await signUpWithEmail(email, password);
  } else {
    await signInWithEmail(email, password);
  }
}

// Switch between login and signup modes
function switchAuthMode(mode) {
  isAuthMode = mode;
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (mode === 'login') {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    submitBtn.textContent = 'Log In';
  } else {
    loginTab.classList.remove('active');
    signupTab.classList.add('active');
    submitBtn.textContent = 'Sign Up';
  }
  hideAuthError();
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

// Update verse counts on home screen
async function updateVerseCount() {
  const allVerses = await getVerses();
  const favoriteVerses = await getFavoriteVerses();

  const totalCount = allVerses.length;
  const favCount = favoriteVerses.length;

  document.getElementById('random-count').textContent =
    totalCount === 1 ? '1 verse' : `${totalCount} verses`;
  document.getElementById('favorites-count').textContent =
    favCount === 1 ? '1 verse' : `${favCount} verses`;

  // Disable favorites button when 0 favorites
  const favBtn = document.getElementById('quiz-favorites-btn');
  if (favCount === 0) {
    favBtn.classList.add('disabled');
  } else {
    favBtn.classList.remove('disabled');
  }
}

// Format verse reference for display
function formatReference(ref) {
  return `${ref.book} ${ref.chapter}:${ref.verse}`;
}

// ===== QUIZ FUNCTIONS =====

// Start the quiz
async function startQuiz(mode = 'random') {
  let verses;

  if (mode === 'favorites') {
    verses = await getFavoriteVerses();
    if (verses.length === 0) {
      alert('No favorite verses yet. Star some verses in Manage Verses first!');
      return;
    }
  } else {
    verses = await getVerses();
    if (verses.length === 0) {
      alert('No verses available. Please add some verses first.');
      showView('manage');
      return;
    }
  }

  // Shuffle verses
  quizState.verses = shuffleArray([...verses]);
  quizState.currentIndex = 0;
  quizState.score = 0;
  quizState.versesAnswered = 0;
  quizState.lastMode = mode;

  showView('quiz');
  updateScoreDisplay();
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

// Update the running score display
function updateScoreDisplay() {
  const scoreEl = document.getElementById('quiz-score');
  if (quizState.versesAnswered === 0) {
    scoreEl.textContent = '0% correct';
  } else {
    const percentage = Math.round((quizState.score / quizState.versesAnswered) * 100);
    scoreEl.textContent = `${percentage}% correct`;
  }
}

// Rate whether user knew the answer
function rateAnswer(knewIt) {
  quizState.versesAnswered++;

  if (knewIt) {
    quizState.score++;
  }

  updateScoreDisplay();

  // Move to next verse
  quizState.currentIndex++;

  if (quizState.currentIndex >= quizState.verses.length) {
    showQuizComplete(false);
  } else {
    displayCurrentVerse();
  }
}

// End session early
function endSession() {
  if (quizState.versesAnswered === 0) {
    showView('home');
    return;
  }

  if (confirm('End this session and see your results?')) {
    showQuizComplete(true);
  }
}

// Show quiz completion screen
function showQuizComplete(endedEarly = false) {
  const percentage = quizState.versesAnswered > 0
    ? Math.round((quizState.score / quizState.versesAnswered) * 100)
    : 0;

  // Update title based on whether ended early
  document.getElementById('complete-title').textContent =
    endedEarly ? 'Session Ended' : 'Quiz Complete!';

  // Update score display
  document.getElementById('final-score').textContent =
    `${quizState.score}/${quizState.versesAnswered}`;
  document.getElementById('final-percentage').textContent = `${percentage}%`;

  // Update message based on percentage
  let message;
  if (percentage >= 90) {
    message = 'Excellent! You know these verses well!';
  } else if (percentage >= 70) {
    message = 'Great job memorizing Scripture!';
  } else if (percentage >= 50) {
    message = 'Good effort! Keep practicing!';
  } else {
    message = 'Keep studying - you\'ll get there!';
  }
  document.getElementById('score-message').textContent = message;

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
async function renderVerseList() {
  const verses = await getVerses();
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
    const isFav = verse.favorite || false;
    const item = document.createElement('div');
    item.className = 'verse-item';
    item.innerHTML = `
      <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${verse.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">&#9733;</button>
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

  // Add event listeners for favorite/edit/delete buttons
  listEl.querySelectorAll('.btn-favorite').forEach(btn => {
    btn.addEventListener('click', () => toggleFavoriteVerse(btn.dataset.id));
  });

  listEl.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openVerseForm(btn.dataset.id));
  });

  listEl.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => confirmDeleteVerse(btn.dataset.id));
  });
}

// Confirm and delete a verse
async function confirmDeleteVerse(id) {
  const verse = await getVerseById(id);
  if (verse && confirm(`Delete "${formatReference(verse.reference)}"?`)) {
    await deleteVerse(id);
    await renderVerseList();
  }
}

// Toggle favorite on a verse
async function toggleFavoriteVerse(id) {
  await toggleFavorite(id);
  await renderVerseList();
}

// ===== FORM FUNCTIONS =====

// Open the verse form (for add or edit)
async function openVerseForm(id = null) {
  const form = document.getElementById('verse-form');
  const title = document.getElementById('form-title');
  const chapterSelect = document.getElementById('verse-chapter');
  const verseInput = document.getElementById('verse-verse');
  const verseText = document.getElementById('verse-text');

  form.reset();
  document.getElementById('image-preview').classList.remove('visible');
  document.getElementById('image-preview').src = '';
  document.getElementById('clear-image-btn').classList.add('hidden');
  document.getElementById('image-picker-grid').innerHTML = '';
  document.getElementById('image-picker-grid').classList.add('hidden');
  document.getElementById('image-keywords').value = '';
  document.getElementById('verse-image-url-manual').value = '';
  hideImageSearchStatus();
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
    const verse = await getVerseById(id);
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
      document.getElementById('verse-image-url-manual').value = verse.imageHintUrl || '';
      document.getElementById('verse-text-hint').value = verse.textHint || '';

      document.getElementById('verse-favorite').checked = verse.favorite || false;

      if (verse.imageHintUrl) {
        const preview = document.getElementById('image-preview');
        preview.src = verse.imageHintUrl;
        preview.classList.add('visible');
        document.getElementById('clear-image-btn').classList.remove('hidden');
      }
    }
  } else {
    // Add mode
    title.textContent = 'Add New Verse';
    document.getElementById('verse-id').value = '';
  }

  showView('form');
}

// Save the verse form
async function saveVerseForm(e) {
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
    textHint: document.getElementById('verse-text-hint').value.trim() || null,
    favorite: document.getElementById('verse-favorite').checked
  };

  await saveVerse(verse);
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

// ===== UNSPLASH IMAGE SEARCH =====

// Common stop words to filter out when extracting keywords
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'am', 'are', 'was', 'were', 'be',
  'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
  'would', 'could', 'should', 'may', 'might', 'shall', 'can', 'not',
  'no', 'nor', 'so', 'if', 'then', 'than', 'that', 'this', 'these',
  'those', 'it', 'its', 'i', 'me', 'my', 'we', 'us', 'our', 'you',
  'your', 'he', 'him', 'his', 'she', 'her', 'they', 'them', 'their',
  'who', 'whom', 'which', 'what', 'when', 'where', 'how', 'why', 'all',
  'each', 'every', 'both', 'any', 'few', 'more', 'most', 'some', 'such',
  'into', 'also', 'let', 'as', 'up', 'out', 'about', 'upon', 'over',
  'after', 'before', 'between', 'through', 'during', 'without', 'again',
  'there', 'here', 'very', 'just', 'because', 'even', 'own', 'same',
  'himself', 'herself', 'itself', 'themselves', 'ourselves', 'yourself',
  'says', 'said', 'saying', 'lord', 'god', 'jesus', 'christ', 'unto'
]);

// Extract 2-4 meaningful keywords from verse text
function extractImageKeywords(verseText) {
  if (!verseText) return '';

  const words = verseText
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP_WORDS.has(w));

  // Count word frequency to find most distinctive
  const freq = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

  // Sort by frequency (descending), take top 3-4
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);

  return sorted.slice(0, 4).join(' ');
}

// Check if Unsplash API is configured
function isUnsplashConfigured() {
  return UNSPLASH_ACCESS_KEY && UNSPLASH_ACCESS_KEY !== 'YOUR_UNSPLASH_KEY_HERE';
}

// Search Unsplash for images
async function searchUnsplashImages(query) {
  if (!isUnsplashConfigured()) {
    return { error: 'Unsplash API key not configured. Enter your key in app.js or use a manual URL.' };
  }

  if (!query || !query.trim()) {
    return { error: 'Please enter keywords to search for.' };
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&orientation=landscape`,
      { headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
    );

    if (response.status === 401) {
      return { error: 'Invalid Unsplash API key. Check your key in app.js.' };
    }
    if (response.status === 403) {
      return { error: 'Unsplash rate limit reached. Try again later or enter a URL manually.' };
    }
    if (!response.ok) {
      return { error: 'Image search failed. Try again or enter a URL manually.' };
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      return { error: 'No images found. Try different keywords.' };
    }

    return {
      images: data.results.map(img => ({
        id: img.id,
        thumbUrl: img.urls.small,
        regularUrl: img.urls.regular,
        credit: img.user.name,
        creditLink: img.user.links.html
      }))
    };
  } catch (err) {
    return { error: 'Network error. Check your connection or enter a URL manually.' };
  }
}

// Show image search status
function showImageSearchStatus(message, isError = false) {
  const status = document.getElementById('image-search-status');
  status.textContent = message;
  status.classList.remove('hidden', 'error');
  if (isError) status.classList.add('error');
}

function hideImageSearchStatus() {
  document.getElementById('image-search-status').classList.add('hidden');
}

// Render image picker grid with search results
function renderImagePicker(images) {
  const grid = document.getElementById('image-picker-grid');
  grid.innerHTML = '';
  grid.classList.remove('hidden');

  images.forEach(img => {
    const item = document.createElement('div');
    item.className = 'image-picker-item';
    item.dataset.url = img.regularUrl;
    item.innerHTML = `
      <img src="${img.thumbUrl}" alt="Search result" loading="lazy">
      <a class="unsplash-credit" href="${img.creditLink}?utm_source=memblitz&utm_medium=referral" target="_blank" rel="noopener">${img.credit}</a>
    `;
    item.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return; // Let credit link work
      selectPickerImage(img.regularUrl + '?w=400');
      // Highlight selected
      grid.querySelectorAll('.image-picker-item').forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
    });
    grid.appendChild(item);
  });
}

// Select an image from the picker
function selectPickerImage(url) {
  document.getElementById('verse-image-url').value = url;
  document.getElementById('verse-image-url-manual').value = url;

  const preview = document.getElementById('image-preview');
  preview.src = url;
  preview.classList.add('visible');

  document.getElementById('clear-image-btn').classList.remove('hidden');
}

// Clear the selected image
function clearSelectedImage() {
  document.getElementById('verse-image-url').value = '';
  document.getElementById('verse-image-url-manual').value = '';
  document.getElementById('image-preview').classList.remove('visible');
  document.getElementById('image-preview').src = '';
  document.getElementById('clear-image-btn').classList.add('hidden');
  document.getElementById('image-picker-grid').querySelectorAll('.image-picker-item').forEach(
    el => el.classList.remove('selected')
  );
}

// Handle search image button click
async function onSearchImageClick() {
  const keywordsInput = document.getElementById('image-keywords');
  let keywords = keywordsInput.value.trim();

  // Auto-extract keywords from verse text if empty
  if (!keywords) {
    const verseText = document.getElementById('verse-text').value;
    keywords = extractImageKeywords(verseText);
    keywordsInput.value = keywords;
  }

  if (!keywords) {
    showImageSearchStatus('Enter verse text first, then search for images.', true);
    return;
  }

  const searchBtn = document.getElementById('search-image-btn');
  searchBtn.disabled = true;
  searchBtn.textContent = 'Searching...';
  hideImageSearchStatus();

  const result = await searchUnsplashImages(keywords);

  searchBtn.disabled = false;
  searchBtn.textContent = 'Search Image';

  if (result.error) {
    document.getElementById('image-picker-grid').classList.add('hidden');
    showImageSearchStatus(result.error, true);
  } else {
    hideImageSearchStatus();
    renderImagePicker(result.images);
  }
}

// Handle manual URL input
function onManualUrlInput() {
  const url = document.getElementById('verse-image-url-manual').value.trim();
  const preview = document.getElementById('image-preview');

  document.getElementById('verse-image-url').value = url;

  if (url) {
    preview.src = url;
    preview.classList.add('visible');
    preview.onerror = () => preview.classList.remove('visible');
    document.getElementById('clear-image-btn').classList.remove('hidden');
  } else {
    preview.classList.remove('visible');
    document.getElementById('clear-image-btn').classList.add('hidden');
  }
}
