// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

<<<<<<< HEAD
// Import environment configuration
import envConfig from "./config/env.js"

// Get Firebase configuration from environment
const firebaseConfig = envConfig.getFirebaseConfig()

// Validate configuration before initializing
if (!envConfig.validateFirebaseConfig()) {
  throw new Error("Firebase configuration is invalid. Please check your environment variables.")
}

// Log configuration status (only in development)
if (envConfig.isDevelopment()) {
  console.log("Firebase initialized with project:", firebaseConfig.projectId)
  console.log("Environment:", envConfig.getAppConfig().environment)
}

// Initialize Firebase
let app
try {
  app = initializeApp(firebaseConfig)
  console.log("Firebase initialized successfully")
} catch (error) {
  console.error("Failed to initialize Firebase:", error)
  throw error
}

=======
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCouiAJf8jJE9QwtoeGbuz50lKiQTIN8qc",
  authDomain: "eco-meter-29807.firebaseapp.com",
  projectId: "eco-meter-29807",
  storageBucket: "eco-meter-29807.firebasestorage.app",
  messagingSenderId: "235596724653",
  appId: "1:235596724653:web:0f437a69f508604c3ac924",
  measurementId: "G-GM5GFY73QF",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

<<<<<<< HEAD
// Configure Google provider
googleProvider.addScope("email")
googleProvider.addScope("profile")

=======
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
// Export auth functions and Firestore
export {
  auth,
  db,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
<<<<<<< HEAD
  envConfig,
=======
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
}
