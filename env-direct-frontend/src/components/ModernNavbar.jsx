import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch, FaBell, FaMoon, FaSun, FaUserCircle } from 'react-icons/fa';
import DarkModeToggle from './DarkModeToggle';
import Sidebar from './Sidebar';

const ModernNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full bg-gray-900 border-b border-gray-700 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            
            {/* Left Section - Sidebar Toggle + Brand */}
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
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
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Environment Direct..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-envGreen-500 focus:ring-1 focus:ring-envGreen-500"
                />
              </div>
            </div>

            {/* Right Section - Status + Actions */}
            <div className="flex items-center space-x-4">
              {/* System Status */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">System Online</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {/* Intelligence Center Button */}
                <Link
                  to="/dashboard"
                  className="px-3 py-1.5 bg-envGreen-600 text-white text-sm font-medium rounded-md hover:bg-envGreen-700 transition-colors"
                >
                  Intelligence
                </Link>

                {/* Dark Mode Toggle */}
                <DarkModeToggle />

                {/* Notifications */}
                <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors relative">
                  <FaBell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-envGreen-500 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </button>

                {/* User Menu */}
                <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <FaUserCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Spacer */}
      <div className="h-14"></div>
    </>
  );
};

export default ModernNavbar;
