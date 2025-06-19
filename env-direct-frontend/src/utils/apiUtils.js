/**
 * Utility functions for API operations
 */

/**
 * Joins a base URL with a path, ensuring no double slashes
 * @param {string} baseUrl - The base URL (may or may not end with /)
 * @param {string} path - The path to append (may or may not start with /)
 * @returns {string} - The properly joined URL
 */
export const joinUrl = (baseUrl, path) => {
  if (!baseUrl || !path) return baseUrl || path || '';
  
  // Remove trailing slash from baseUrl
  const cleanBase = baseUrl.replace(/\/+$/, '');
  // Remove leading slash from path
  const cleanPath = path.replace(/^\/+/, '');
  
  return `${cleanBase}/${cleanPath}`;
};

/**
 * Gets the API base URL from environment variables
 * @returns {string} - The API base URL
 */
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:8080';
};

/**
 * Creates a full API URL by joining the base URL with the given path
 * @param {string} path - The API path (e.g., '/api/articles')
 * @returns {string} - The complete API URL
 */
export const createApiUrl = (path) => {
  return joinUrl(getApiBaseUrl(), path);
}; 