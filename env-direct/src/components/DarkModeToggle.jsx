import React, { useState, useEffect } from 'react';

const DarkModeToggle = ({ isScrolled }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved preference in localStorage, default to false (light mode)
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // Determine icon color based on dark mode and navbar state
  let iconColorClass = '';
  let moonOutlineColorClass = 'stroke-envGreen-600 dark:stroke-envGreen-400';

  if (isDarkMode) {
    iconColorClass = 'text-sandGold-400'; // Yellow in dark mode
  } else {
    iconColorClass = isScrolled 
      ? 'text-lavaGrey-700' 
      : 'text-lavaGrey-900'; // Dark color for visibility on light hero
  }

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 ${
        isScrolled 
          ? 'hover:bg-skyAsh-200 dark:hover:bg-lavaGrey-700 focus:ring-envGreen-600 dark:focus:ring-envGreen-400' 
          : 'hover:bg-white/20 dark:hover:bg-black/20 focus:ring-white/50 dark:focus:ring-envGreen-400'
      }`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        // Sun icon for dark mode (to switch to light)
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-6 w-6 ${iconColorClass}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m8.66-15.66l-.707.707M4.04 19.96l-.707.707M21 12h-1M4 12H3m15.66 8.66l-.707-.707M4.04 4.04l-.707-.707" 
          />
        </svg>
      ) : (
        // Moon icon for light mode (to switch to dark)
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          {/* Green Outline Path */}
          <path 
            className={moonOutlineColorClass}
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
          {/* Moon Body Path */}
          <path 
            className={iconColorClass}
            stroke="currentColor"
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      )}
    </button>
  );
};

export default DarkModeToggle;
