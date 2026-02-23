// Firebase Configuration for MemBlitz
// ============================================
// TO SET UP:
// 1. Create a Firebase project at https://console.firebase.google.com
// 2. Enable Email/Password and Google sign-in in Authentication
// 3. Create a Firestore database
// 4. Copy your config values below
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyBGD7CrI63wibfL6wkJpY6_Jujfs1XW0WY",
  authDomain: "mvblitz-1d1f4.firebaseapp.com",
  projectId: "mvblitz-1d1f4",
  storageBucket: "mvblitz-1d1f4.firebasestorage.app",
  messagingSenderId: "624367581655",
  appId: "1:624367581655:web:300c8c767493772a3fb392",
  measurementId: "G-L25304B1BC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export references
const auth = firebase.auth();
const db = firebase.firestore();
