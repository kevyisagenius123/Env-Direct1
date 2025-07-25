// 🧠 PERSONALIZATION HOOKS - AI-Driven User Experience
// Advanced React hooks for user personalization and preference management

import { useState, useEffect, useCallback, useMemo } from 'react';

// 💾 LOCAL STORAGE HOOK
export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// 👤 USER PREFERENCES HOOK
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'dark',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      environmental: true,
      articles: true
    },
    accessibility: {
      reducedMotion: false,
      highContrast: false,
      fontSize: 'medium'
    },
    content: {
      difficulty: 'intermediate',
      topics: ['climate', 'renewable', 'sustainability'],
      format: 'mixed'
    },
    location: null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: typeof value === 'object' ? { ...prev[key], ...value } : value
    }));
  }, [setPreferences]);

  const resetPreferences = useCallback(() => {
    setPreferences({
      theme: 'dark',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        environmental: true,
        articles: true
      },
      accessibility: {
        reducedMotion: false,
        highContrast: false,
        fontSize: 'medium'
      },
      content: {
        difficulty: 'intermediate',
        topics: ['climate', 'renewable', 'sustainability'],
        format: 'mixed'
      },
      location: null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  }, [setPreferences]);

  return {
    preferences,
    updatePreference,
    resetPreferences
  };
};

// 📊 READING HISTORY HOOK
export const useReadingHistory = () => {
  const [history, setHistory] = useLocalStorage('readingHistory', []);

  const addToHistory = useCallback((article) => {
    const newEntry = {
      id: article.id,
      title: article.title,
      category: article.category,
      timestamp: new Date().toISOString(),
      readTime: article.readTime || 0,
      completed: false
    };

    setHistory(prev => {
      const filtered = prev.filter(item => item.id !== article.id);
      return [newEntry, ...filtered].slice(0, 100); // Keep last 100 articles
    });
  }, [setHistory]);

  const markAsCompleted = useCallback((articleId) => {
    setHistory(prev => 
      prev.map(item => 
        item.id === articleId 
          ? { ...item, completed: true, completedAt: new Date().toISOString() }
          : item
      )
    );
  }, [setHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const getReadingStats = useMemo(() => {
    const stats = {
      totalArticles: history.length,
      completedArticles: history.filter(h => h.completed).length,
      totalReadTime: history.reduce((sum, h) => sum + (h.readTime || 0), 0),
      favoriteCategories: {},
      recentActivity: history.slice(0, 10)
    };

    // Calculate favorite categories
    history.forEach(h => {
      if (h.category) {
        stats.favoriteCategories[h.category] = (stats.favoriteCategories[h.category] || 0) + 1;
      }
    });

    return stats;
  }, [history]);

  return {
    history,
    addToHistory,
    markAsCompleted,
    clearHistory,
    stats: getReadingStats
  };
};

// 🎯 USER BEHAVIOR TRACKING HOOK
export const useUserBehavior = () => {
  const [behavior, setBehavior] = useLocalStorage('userBehavior', {
    clickPatterns: {},
    timeSpent: {},
    scrollDepth: {},
    interactions: []
  });

  const trackClick = useCallback((element, context = {}) => {
    const timestamp = new Date().toISOString();
    setBehavior(prev => ({
      ...prev,
      clickPatterns: {
        ...prev.clickPatterns,
        [element]: (prev.clickPatterns[element] || 0) + 1
      },
      interactions: [
        { type: 'click', element, context, timestamp },
        ...prev.interactions.slice(0, 99)
      ]
    }));
  }, [setBehavior]);

  const trackTimeSpent = useCallback((page, duration) => {
    setBehavior(prev => ({
      ...prev,
      timeSpent: {
        ...prev.timeSpent,
        [page]: (prev.timeSpent[page] || 0) + duration
      }
    }));
  }, [setBehavior]);

  const trackScrollDepth = useCallback((page, depth) => {
    setBehavior(prev => ({
      ...prev,
      scrollDepth: {
        ...prev.scrollDepth,
        [page]: Math.max(prev.scrollDepth[page] || 0, depth)
      }
    }));
  }, [setBehavior]);

  return {
    behavior,
    trackClick,
    trackTimeSpent,
    trackScrollDepth
  };
};

// 🤖 AI PERSONALIZATION HOOK
export const useAIPersonalization = () => {
  const { preferences } = useUserPreferences();
  const { stats } = useReadingHistory();
  const { behavior } = useUserBehavior();

  const personalizedRecommendations = useMemo(() => {
    // Simple recommendation algorithm based on user data
    const topics = preferences.content.topics || [];
    const favoriteCategories = Object.keys(stats.favoriteCategories || {})
      .sort((a, b) => stats.favoriteCategories[b] - stats.favoriteCategories[a])
      .slice(0, 3);

    return {
      recommendedTopics: [...new Set([...topics, ...favoriteCategories])],
      difficulty: preferences.content.difficulty,
      format: preferences.content.format,
      engagement: behavior.interactions?.length || 0,
      readingTime: stats.totalReadTime || 0
    };
  }, [preferences, stats, behavior]);

  const adaptiveUI = useMemo(() => {
    return {
      theme: preferences.theme,
      fontSize: preferences.accessibility.fontSize,
      reducedMotion: preferences.accessibility.reducedMotion,
      highContrast: preferences.accessibility.highContrast
    };
  }, [preferences.accessibility, preferences.theme]);

  return {
    recommendations: personalizedRecommendations,
    uiAdaptation: adaptiveUI,
    userProfile: {
      preferences,
      stats,
      behavior
    }
  };
};

// 🔔 NOTIFICATION PREFERENCES HOOK
export const useNotificationPreferences = () => {
  const { preferences, updatePreference } = useUserPreferences();
  
  const updateNotificationSetting = useCallback((setting, value) => {
    updatePreference('notifications', { [setting]: value });
  }, [updatePreference]);

  const canSendNotification = useCallback((type) => {
    return preferences.notifications?.[type] || false;
  }, [preferences.notifications]);

  return {
    notifications: preferences.notifications || {},
    updateNotificationSetting,
    canSendNotification
  };
};

// 🌍 LOCATION & CONTEXT HOOK  
export const useLocationContext = () => {
  const { preferences, updatePreference } = useUserPreferences();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString()
        };
        setCurrentLocation(location);
        updatePreference('location', location);
        setLocationError(null);
      },
      (error) => {
        setLocationError(error.message);
      }
    );
  }, [updatePreference]);

  return {
    location: currentLocation || preferences.location,
    locationError,
    getCurrentLocation
  };
};

export default {
  useLocalStorage,
  useUserPreferences,
  useReadingHistory,
  useUserBehavior,
  useAIPersonalization,
  useNotificationPreferences,
  useLocationContext
};
