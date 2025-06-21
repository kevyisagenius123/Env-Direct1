/**
 * Centralized API configuration
 * This file provides a single source of truth for API URLs and settings
 * across the application.
 */

// Base API URL from environment variables with fallback
export const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Number of retry attempts for failed requests
  RETRY_ATTEMPTS: 3,
  
  // Endpoints
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
    },
    
    // Article endpoints
    ARTICLES: {
      BASE: '/api/articles',
      FEATURED: '/api/articles/featured',
      CATEGORIES: '/api/articles/categories',
      TAGS: '/api/articles/tags',
    },
    
    // Prediction endpoints
    PREDICT: {
      FLOOD_RISK: '/api/predict/flood-risk/all',
      ECO_TOURISM: '/api/predict/eco-tourism/pressure/all',
      HISTORICAL: '/api/predict/historical-comparison',
    },
  }
};

export default API_CONFIG;