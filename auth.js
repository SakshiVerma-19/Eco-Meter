import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  googleProvider,
  signInWithPopup,
  db,
  doc,
  setDoc,
  getDoc,
} from "./firebase.js"

// Sign up with email and password
export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Store user data in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
    })

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

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    // Check if this is a new user
    const isNewUser = result._tokenResponse.isNewUser

    if (isNewUser) {
      // Store user data in Firestore for new users
      await setDoc(doc(db, "users", result.user.uid), {
        name: result.user.displayName || "Google User",
        email: result.user.email,
        createdAt: new Date().toISOString(),
      })
    }

    // Store display name in localStorage
    localStorage.setItem("userName", result.user.displayName || result.user.email.split("@")[0])

    return result.user
  } catch (error) {
    console.error("Google sign in error:", error)
    throw error
  }
}

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth)
    localStorage.removeItem("userName")
    return true
  } catch (error) {
    console.error("Sign out error:", error)
    throw error
  }
}

// Check if user is authenticated
export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // If user is signed in but no userName in localStorage (e.g. after page refresh)
      if (!localStorage.getItem("userName")) {
        try {
          // Try to get user data from Firestore
          const userRef = doc(db, "users", user.uid)
          const userSnap = await getDoc(userRef)

          if (userSnap.exists()) {
            localStorage.setItem("userName", userSnap.data().name || user.displayName || user.email.split("@")[0])
          } else {
            localStorage.setItem("userName", user.displayName || user.email.split("@")[0])
          }
        } catch (error) {
          console.error("Error getting user data:", error)
          localStorage.setItem("userName", user.displayName || user.email.split("@")[0])
        }
      }
    }
    callback(user)
  })
}
