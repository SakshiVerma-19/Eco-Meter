import { signIn, signUp, signInWithGoogle, checkAuthState } from "./auth.js"
import { initializeDatabase } from "./database.js"

document.addEventListener("DOMContentLoaded", () => {
  // Initialize database
  initializeDatabase().catch(console.error)

  // Check if user is already logged in
  checkAuthState((user) => {
    if (user) {
      console.log("User is signed in, redirecting to dashboard")
      window.location.href = "dashboard.html"
    }
  })

  // Modal functionality
  const modal = document.getElementById("signupModal")
  const openBtnNav = document.getElementById("openModalNav")
  const openBtnCard = document.getElementById("openModalCard")
  const closeBtn = document.querySelector(".close")

  if (modal) {
    // Initially hide the modal
    modal.style.display = "none"

    if (openBtnNav) {
      openBtnNav.addEventListener("click", () => {
        modal.style.display = "flex"
      })
    }

    if (openBtnCard) {
      openBtnCard.addEventListener("click", () => {
        modal.style.display = "flex"
      })
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none"
      })
    }

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })
  }

  // Login form
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      console.log("Login form submitted")

      const email = loginForm.querySelector('input[type="email"]').value
      const password = loginForm.querySelector('input[type="password"]').value
      const errorMsg = document.getElementById("login-error")

      try {
        const user = await signIn(email, password)
        console.log("Login successful, user:", user)
        window.location.href = "dashboard.html"
      } catch (error) {
        console.error("Login error:", error)
        if (errorMsg) {
          errorMsg.textContent = getErrorMessage(error)
          errorMsg.style.display = "block"
        } else {
          alert(`Login failed: ${getErrorMessage(error)}`)
        }
      }
    })
  }

  // Google sign-in buttons
  const googleLoginBtn = document.getElementById("google-login-btn")
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {
      try {
        const user = await signInWithGoogle()
        console.log("Google login successful, user:", user)
        window.location.href = "dashboard.html"
      } catch (error) {
        console.error("Google login error:", error)
        const errorMsg = document.getElementById("login-error")
        if (errorMsg) {
          errorMsg.textContent = getErrorMessage(error)
          errorMsg.style.display = "block"
        } else {
          alert(`Google login failed: ${getErrorMessage(error)}`)
        }
      }
    })
  }

  const googleSignupBtn = document.getElementById("google-signup-btn")
  if (googleSignupBtn) {
    googleSignupBtn.addEventListener("click", async () => {
      try {
        const user = await signInWithGoogle()
        console.log("Google signup successful, user:", user)
        window.location.href = "dashboard.html"
      } catch (error) {
        console.error("Google signup error:", error)
        const errorMsg = document.getElementById("signup-error")
        if (errorMsg) {
          errorMsg.textContent = getErrorMessage(error)
          errorMsg.style.display = "block"
        } else {
          alert(`Google signup failed: ${getErrorMessage(error)}`)
        }
      }
    })
  }

  // Signup modal form
  const signupForm = document.getElementById("signup-form")
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      console.log("Signup form submitted")

      const name = signupForm.querySelector('input[type="text"]').value
      const email = signupForm.querySelector('input[type="email"]').value
      const password = signupForm.querySelector('input[type="password"]').value
      const errorMsg = document.getElementById("signup-error")

      try {
        const user = await signUp(email, password, name)
        console.log("Signup successful, user:", user)
        window.location.href = "dashboard.html"
      } catch (error) {
        console.error("Signup error:", error)
        if (errorMsg) {
          errorMsg.textContent = getErrorMessage(error)
          errorMsg.style.display = "block"
        } else {
          alert(`Signup failed: ${getErrorMessage(error)}`)
        }
      }
    })
  }
})

// Helper function to get readable error messages
function getErrorMessage(error) {
  console.log("Error code:", error.code)
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered."
    case "auth/invalid-email":
      return "Please enter a valid email address."
    case "auth/weak-password":
      return "Password should be at least 6 characters."
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password."
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed before completing the sign in."
    case "auth/cancelled-popup-request":
      return "The sign-in popup was cancelled."
    case "auth/popup-blocked":
      return "The sign-in popup was blocked by the browser."
    default:
      return error.message
  }
}
