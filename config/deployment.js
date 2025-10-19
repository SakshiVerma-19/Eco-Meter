// Deployment configuration for different environments
// This file helps manage different configurations for development, staging, and production

import envConfig from "./env.js"

class DeploymentConfig {
  constructor() {
    this.environment = envConfig.getAppConfig().environment
    this.config = this.getEnvironmentConfig()
  }

  getEnvironmentConfig() {
    const baseConfig = {
      app: {
        name: envConfig.getAppConfig().name,
        version: envConfig.getAppConfig().version,
      },
      features: {
        analytics: true,
        debugging: false,
        errorReporting: true,
      },
      api: {
        timeout: 10000,
        retries: 3,
      },
    }

    switch (this.environment) {
      case "development":
        return {
          ...baseConfig,
          features: {
            ...baseConfig.features,
            debugging: true,
            analytics: false,
          },
          api: {
            ...baseConfig.api,
            timeout: 30000,
          },
        }

      case "staging":
        return {
          ...baseConfig,
          features: {
            ...baseConfig.features,
            debugging: true,
          },
        }

      case "production":
        return {
          ...baseConfig,
          features: {
            ...baseConfig.features,
            debugging: false,
          },
        }

      default:
        return baseConfig
    }
  }

  isFeatureEnabled(feature) {
    return this.config.features[feature] || false
  }

  getApiConfig() {
    return this.config.api
  }

  getAppInfo() {
    return this.config.app
  }
}

export default new DeploymentConfig()
