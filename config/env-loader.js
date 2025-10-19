// Environment loader for browser environments
// This script loads environment variables and makes them available to the application

;(() => {
  // Initialize window.ENV if it doesn't exist
  if (typeof window !== "undefined") {
    window.ENV = window.ENV || {}
  }

  // Function to load environment variables from various sources
  function loadEnvironmentVariables() {
    // Try to load from meta tags first (useful for server-side rendering)
    const metaTags = document.querySelectorAll('meta[name^="env-"]')
    metaTags.forEach((tag) => {
      const key = tag.getAttribute("name").replace("env-", "").toUpperCase()
      const value = tag.getAttribute("content")
      if (value) {
        window.ENV[key] = value
      }
    })

    // Try to load from a global configuration object
    if (window.APP_CONFIG) {
      Object.keys(window.APP_CONFIG).forEach((key) => {
        window.ENV[key.toUpperCase()] = window.APP_CONFIG[key]
      })
    }

    // Log loaded environment variables (only in development)
    if (window.ENV.NODE_ENV === "development") {
      console.log("Loaded environment variables:", Object.keys(window.ENV))
    }
  }

  // Load environment variables when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadEnvironmentVariables)
  } else {
    loadEnvironmentVariables()
  }

  // Export a function to manually reload environment variables
  window.reloadEnvironmentVariables = loadEnvironmentVariables
})()
