import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "./firebase.js"

// Sign up with email and password
export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // You could store additional user data like name in a database here
    localStorage.setItem("userName", name)
    return userCredential.user
  } catch (error) {
    console.error("Sign up error:", error)
    throw error
  }
}

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Sign in error:", error)
    throw error
  }
}

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    console.error("Sign out error:", error)
    throw error
  }
}

// Check if user is authenticated
export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user)
  })
}
