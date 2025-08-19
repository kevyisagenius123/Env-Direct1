import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserFromToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userDataFromToken = JSON.parse(atob(token.split('.')[1]));
        if (userDataFromToken) {
          const nowInSeconds = Date.now() / 1000;
          if (userDataFromToken.exp && userDataFromToken.exp < nowInSeconds) {
            console.log("Token expired, logging out.");
            localStorage.removeItem('token');
            setCurrentUser(null);
          } else {
            setCurrentUser({
              username: userDataFromToken.sub,
              roles: userDataFromToken.roles || [],
              token: token,
            });
          }
        } else {
          localStorage.removeItem('token');
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Failed to parse token:', error);
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  const login = async (username, password) => {
    try {
      // Simulate login - replace with actual API call
      const mockToken = btoa(JSON.stringify({
        sub: username,
        roles: ['USER'],
        exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
      }));
      
      localStorage.setItem('token', mockToken);
      loadUserFromToken();
      return { success: true };
    } catch (error) {
      console.error("Login failed in context:", error);
      setCurrentUser(null);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      // Simulate registration - replace with actual API call
      console.log('Registering user:', { username, email });
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error("Registration failed in context:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
