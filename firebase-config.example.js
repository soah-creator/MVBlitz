// Firebase Configuration for MemBlitz
// ============================================
// TO SET UP:
// 1. Copy this file to firebase-config.js
// 2. Create a Firebase project at https://console.firebase.google.com
// 3. Enable Email/Password, Google, and Anonymous sign-in in Authentication
// 4. Create a Firestore database
// 5. Copy your config values below
// ============================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export references
const auth = firebase.auth();
const db = firebase.firestore();
