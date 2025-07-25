import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaChartBar, 
  FaGlobe, 
  FaFileAlt, 
  FaNewspaper, 
  FaChevronDown, 
  FaChevronRight,
  FaTimes,
  FaBars,
  FaCircle
} from 'react-icons/fa';
import logo from '../assets/logo.png';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const navigation = [
    { 
      name: 'Home', 
      href: '/', 
      icon: FaHome,
      type: 'link' 
    },
    {
      name: 'Dashboards',
      icon: FaChartBar,
      type: 'dropdown',
      items: [
        { name: 'Intelligence Platform', href: '/dashboard' },
        { name: 'Environmental Lab', href: '/ai-lab' },
        { name: 'Interactive Map', href: '/live-map' },
      ]
    },
    {
      name: 'Monitoring',
      icon: FaGlobe,
      type: 'dropdown',
      items: [
        { name: 'Climate Intelligence', href: '/climate-intelligence' },
        { name: 'Satellite Data', href: '/satellite' },
        { name: 'Sensors', href: '/sensors' },
      ]
    },
    {
      name: 'Reports',
      icon: FaFileAlt,
      type: 'dropdown',
      items: [
        { name: 'Environmental Reports', href: '/reports' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Analytics', href: '/analytics' },
      ]
    },
    {
      name: 'News',
      icon: FaNewspaper,
      type: 'dropdown',
      items: [
        { name: 'Green Atlas Magazine', href: '/green-atlas-magazine' },
        { name: 'Updates', href: '/news' },
        { name: 'Publications', href: '/publications' },
      ]
    },
    {
      name: 'Services',
      icon: FaFileAlt,
      type: 'dropdown',
      items: [
        { name: 'Consulting', href: '/services' },
        { name: 'Training', href: '/training' },
        { name: 'Projects', href: '/projects' },
      ]
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: FaFileAlt,
      type: 'link'
    }
  ];

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = item.type === 'link' 
      ? location.pathname === item.href
      : item.items?.some(subItem => location.pathname === subItem.href);
    
    const isExpanded = expandedItems[item.name];

    if (item.type === 'link') {
      return (
        <Link
          to={item.href}
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-colors ${
            isActive
              ? 'bg-envGreen-600 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
          onClick={() => setIsOpen(false)}
        >
          <Icon className="w-5 h-5 mr-3" />
          {item.name}
        </Link>
      );
    }

    return (
      <div className="mx-2">
        <button
          onClick={() => toggleExpanded(item.name)}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            isActive
              ? 'bg-envGreen-600 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <div className="flex items-center">
            <Icon className="w-5 h-5 mr-3" />
            {item.name}
          </div>
          {isExpanded ? (
            <FaChevronDown className="w-4 h-4" />
          ) : (
            <FaChevronRight className="w-4 h-4" />
          )}
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pl-4 mt-1">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.href}
                    className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                      location.pathname === subItem.href
                        ? 'bg-envGreen-500 text-white'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-envGreen-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-14 z-40 w-72 h-[calc(100vh-3.5rem)] bg-gray-900 border-r border-gray-700 overflow-y-auto"
      >
        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Environment Direct..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-envGreen-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="px-2">
          <div className="text-gray-500 text-xs uppercase tracking-wide px-4 py-2 font-semibold">
            Navigation
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>

        {/* System Status */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="text-gray-500 text-xs uppercase tracking-wide mb-3 font-semibold">
            System Status
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaCircle className="w-3 h-3 text-green-400 mr-2" />
              <span className="text-gray-300 text-sm">System Online</span>
            </div>
            <button className="px-3 py-1 bg-envGreen-600 text-white text-xs rounded-md hover:bg-envGreen-700 transition-colors">
              Status
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
