/**
 * Logger utility for consistent logging across the application.
 * In production, only warnings and errors are logged.
 * In development, all logs are displayed.
 */

const isDevelopment = import.meta.env.DEV;

/**
 * Application logger with different log levels
 */
export const logger = {
  /**
   * Debug level logging - only shown in development
   * @param {...any} args - Arguments to log
   */
  debug: (...args) => isDevelopment && console.log('[DEBUG]', ...args),
  
  /**
   * Info level logging - only shown in development
   * @param {...any} args - Arguments to log
   */
  info: (...args) => isDevelopment && console.info('[INFO]', ...args),
  
  /**
   * Warning level logging - always shown
   * @param {...any} args - Arguments to log
   */
  warn: (...args) => console.warn('[WARN]', ...args),
  
  /**
   * Error level logging - always shown
   * @param {...any} args - Arguments to log
   */
  error: (...args) => console.error('[ERROR]', ...args)
};

export default logger;