// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"

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
const auth = getAuth(app)

// Export auth functions
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }
