import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaBell, FaMoon, FaSun, FaUserCircle, FaSignOutAlt, FaCog, FaUser } from 'react-icons/fa';
import DarkModeToggle from './DarkModeToggle';
import Sidebar from './Sidebar';
import NotificationCenter from './NotificationCenter';
import { useAuth } from '../context/AdminAuthContext';

const ModernNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { isAuthenticated, isAdmin, user: adminUser } = useAuth();
  const navigate = useNavigate();

  // Check for user session
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('user');
    if (userToken && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleUserLogin = () => {
    navigate('/user/login');
  };

  const handleUserLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full bg-envGreen-700 dark:bg-envGreen-800 border-b border-envGreen-600 dark:border-envGreen-700 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            
            {/* Left Section - Sidebar Toggle + Brand */}
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <FaBars className="w-5 h-5" />
              </button>
              
              {/* Brand */}
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-envGreen-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ED</span>
                </div>
                <span className="text-white font-semibold text-lg">Environment Direct</span>
              </Link>
            </div>

            {/* Center Section - Search Bar */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Environment Direct..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30"
                />
              </div>
            </div>

            {/* Right Section - Status + Actions */}
            <div className="flex items-center space-x-4">
              {/* System Status */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-envGreen-300 dark:bg-envGreen-200 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">Available</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {/* Consulting Services Button */}
                <Link
                  to="/services"
                  className="px-3 py-1.5 bg-white text-envGreen-700 text-sm font-medium rounded-md hover:bg-white/90 transition-colors"
                >
                  Our Services
                </Link>

                {/* Admin Dashboard Button - Only show for authorized users */}
                {isAuthenticated && isAdmin() && (
                  <Link
                    to="/admin/dashboard"
                    className="px-3 py-1.5 bg-envGreen-600 border border-white/20 text-white text-sm font-medium rounded-md hover:bg-envGreen-500 transition-colors"
                  >
                    Admin
                  </Link>
                )}

                {/* Dark Mode Toggle */}
                <DarkModeToggle />

                {/* Notifications */}
                <NotificationCenter />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    </>
  );
};

export default ModernNavbar;
