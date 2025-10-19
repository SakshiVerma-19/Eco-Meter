// Environment configuration for ECO Meter
// This file handles environment variables and sensitive configuration data

class EnvironmentConfig {
  constructor() {
    this.config = this.loadConfig()
  }

  loadConfig() {
    // Check if we're in a build environment with environment variables
    if (typeof process !== "undefined" && process.env) {
      return {
        firebase: {
          apiKey: process.env.FIREBASE_API_KEY || this.getFromWindow("FIREBASE_API_KEY"),
          authDomain: process.env.FIREBASE_AUTH_DOMAIN || this.getFromWindow("FIREBASE_AUTH_DOMAIN"),
          projectId: process.env.FIREBASE_PROJECT_ID || this.getFromWindow("FIREBASE_PROJECT_ID"),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET || this.getFromWindow("FIREBASE_STORAGE_BUCKET"),
          messagingSenderId:
            process.env.FIREBASE_MESSAGING_SENDER_ID || this.getFromWindow("FIREBASE_MESSAGING_SENDER_ID"),
          appId: process.env.FIREBASE_APP_ID || this.getFromWindow("FIREBASE_APP_ID"),
          measurementId: process.env.FIREBASE_MEASUREMENT_ID || this.getFromWindow("FIREBASE_MEASUREMENT_ID"),
        },
        app: {
          name: process.env.APP_NAME || this.getFromWindow("APP_NAME") || "ECO Meter",
          version: process.env.APP_VERSION || this.getFromWindow("APP_VERSION") || "1.0.0",
          environment: process.env.NODE_ENV || this.getFromWindow("NODE_ENV") || "development",
        },
      }
    }

    // Fallback to window environment variables or default values
    return {
      firebase: {
        apiKey: this.getFromWindow("FIREBASE_API_KEY") || "AIzaSyCouiAJf8jJE9QwtoeGbuz50lKiQTIN8qc",
        authDomain: this.getFromWindow("FIREBASE_AUTH_DOMAIN") || "eco-meter-29807.firebaseapp.com",
        projectId: this.getFromWindow("FIREBASE_PROJECT_ID") || "eco-meter-29807",
        storageBucket: this.getFromWindow("FIREBASE_STORAGE_BUCKET") || "eco-meter-29807.firebasestorage.app",
        messagingSenderId: this.getFromWindow("FIREBASE_MESSAGING_SENDER_ID") || "235596724653",
        appId: this.getFromWindow("FIREBASE_APP_ID") || "1:235596724653:web:0f437a69f508604c3ac924",
        measurementId: this.getFromWindow("FIREBASE_MEASUREMENT_ID") || "G-GM5GFY73QF",
      },
      app: {
        name: this.getFromWindow("APP_NAME") || "ECO Meter",
        version: this.getFromWindow("APP_VERSION") || "1.0.0",
        environment: this.getFromWindow("NODE_ENV") || "development",
      },
    }
  }

  getFromWindow(key) {
    // Check if environment variables are available on window object
    if (typeof window !== "undefined" && window.ENV && window.ENV[key]) {
      return window.ENV[key]
    }
    return null
  }

  getFirebaseConfig() {
    return this.config.firebase
  }

  getAppConfig() {
    return this.config.app
  }

  isProduction() {
    return this.config.app.environment === "production"
  }

  isDevelopment() {
    return this.config.app.environment === "development"
  }

  // Validate that all required Firebase config is present
  validateFirebaseConfig() {
    const required = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"]
    const missing = required.filter((key) => !this.config.firebase[key])

    if (missing.length > 0) {
      console.warn("Missing Firebase configuration:", missing)
      return false
    }
    return true
  }
}

// Create and export a singleton instance
const envConfig = new EnvironmentConfig()

// Validate configuration on load
if (!envConfig.validateFirebaseConfig()) {
  console.error("Firebase configuration is incomplete. Please check your environment variables.")
}

export default envConfig
