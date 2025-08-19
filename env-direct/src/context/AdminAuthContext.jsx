import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Also export as useAdminAuth for compatibility
export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // List of authorized admin users with credentials
  const AUTHORIZED_ADMINS = [
    'admin@environmentdirect.com',
    'kevy@environmentdirect.com', 
    'super@environmentdirect.com',
    // Add more authorized emails here
  ];

  // Default admin credentials for testing (in production, use proper authentication)
  const DEFAULT_ADMIN_CREDENTIALS = {
    'admin@environmentdirect.com': 'Admin123!',
    'kevy@environmentdirect.com': 'Kevy2025!',
    'super@environmentdirect.com': 'Super123!'
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Token is invalid
        localStorage.removeItem('authToken');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Check against default admin credentials first (for development/testing)
      if (DEFAULT_ADMIN_CREDENTIALS[email] && DEFAULT_ADMIN_CREDENTIALS[email] === password) {
        const adminUser = {
          id: Date.now(),
          email: email,
          name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          roles: ['ADMIN'],
          isEmailVerified: true,
          createdAt: new Date().toISOString()
        };
        
        // Create a mock token
        const mockToken = btoa(JSON.stringify({
          userId: adminUser.id,
          email: adminUser.email,
          exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }));
        
        localStorage.setItem('authToken', mockToken);
        setUser(adminUser);
        setIsAuthenticated(true);
        return { success: true };
      }

      // If not a default admin, try the backend
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      // If backend is unavailable but we have valid default credentials, still allow login
      if (DEFAULT_ADMIN_CREDENTIALS[email] && DEFAULT_ADMIN_CREDENTIALS[email] === password) {
        const adminUser = {
          id: Date.now(),
          email: email,
          name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          roles: ['ADMIN'],
          isEmailVerified: true,
          createdAt: new Date().toISOString()
        };
        
        const mockToken = btoa(JSON.stringify({
          userId: adminUser.id,
          email: adminUser.email,
          exp: Date.now() + (24 * 60 * 60 * 1000)
        }));
        
        localStorage.setItem('authToken', mockToken);
        setUser(adminUser);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, error: 'Network error occurred' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = () => {
    if (!user) return false;
    
    // Check if user has admin role
    if (user.roles && user.roles.includes('ADMIN')) {
      return true;
    }
    
    // Check if user email is in authorized list
    if (user.email && AUTHORIZED_ADMINS.includes(user.email.toLowerCase())) {
      return true;
    }
    
    // Check if username is in authorized list
    if (user.username && AUTHORIZED_ADMINS.includes(user.username.toLowerCase())) {
      return true;
    }
    
    return false;
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    isAdmin,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
