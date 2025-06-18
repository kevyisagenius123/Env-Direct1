// clean-deps.js
// This script safely removes the .vite/deps directory to prevent EPERM errors on Windows

import { existsSync, rmSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Path to the node_modules/.vite/deps directory
const depsPath = resolve(__dirname, '..', 'node_modules', '.vite', 'deps');

console.log(`Checking for Vite deps directory at: ${depsPath}`);

// Check if the directory exists
if (existsSync(depsPath)) {
  try {
    console.log('Found .vite/deps directory, attempting to remove...');

    // Use rmSync with force and recursive options to handle Windows permission issues
    rmSync(depsPath, { 
      force: true,      // Ignore errors if files are read-only
      recursive: true,  // Remove directories and their contents recursively
      maxRetries: 3,    // Retry a few times if there are issues
      retryDelay: 100   // Wait between retries
    });

    console.log('Successfully removed .vite/deps directory');
  } catch (error) {
    console.error(`Error removing .vite/deps directory: ${error.message}`);
    console.log('Continuing with Vite startup anyway...');
    // Don't exit with error code, let Vite try to handle it
  }
} else {
  console.log('No .vite/deps directory found, continuing...');
}

console.log('Starting Vite development server...');
