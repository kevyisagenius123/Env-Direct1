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
  FaCircle,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaDatabase,
  FaCloudSun,
  FaSatellite,
  FaLeaf,
  FaBuilding,
  FaMountain,
  FaPhone
} from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

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
      type: 'link',
      description: 'Main homepage'
    },
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: FaChartBar,
      type: 'link',
      description: 'Under construction'
    },
    {
      name: 'Our Services',
      icon: FaBuilding,
      type: 'dropdown',
      description: 'Environmental consulting services',
      items: [
        { name: 'Environmental Impact Assessments', href: '/services/eia', icon: FaLeaf },
        { name: 'Sustainability Consulting', href: '/services/sustainability', icon: FaGlobe },
        { name: 'Climate Risk Analysis', href: '/services/climate-risk', icon: FaCloudSun },
        { name: 'Environmental Compliance', href: '/services/compliance', icon: FaFileAlt },
        { name: 'Green Building Certification', href: '/services/green-building', icon: FaBuilding },
        { name: 'Carbon Footprint Assessment', href: '/services/carbon-assessment', icon: FaLeaf },
      ]
    },
    {
      name: 'Projects',
      icon: FaDatabase,
      type: 'dropdown',
      description: 'Our consulting projects',
      items: [
        { name: 'Active Projects', href: '/projects/active', icon: FaChartBar },
        { name: 'Case Studies', href: '/projects/case-studies', icon: FaFileAlt },
        { name: 'Success Stories', href: '/projects/success-stories', icon: FaNewspaper },
        { name: 'Client Testimonials', href: '/projects/testimonials', icon: FaUser },
      ]
    },
    {
      name: 'About Us',
      icon: FaUser,
      type: 'dropdown',
      description: 'Learn about Environment Direct',
      items: [
        { name: 'Our Team', href: '/about/team', icon: FaUser },
        { name: 'Company History', href: '/about/history', icon: FaFileAlt },
        { name: 'Mission & Vision', href: '/about/mission', icon: FaGlobe },
        { name: 'Certifications', href: '/about/certifications', icon: FaNewspaper },
      ]
    },
    {
      name: 'Resources',
      icon: FaNewspaper,
      type: 'dropdown',
      description: 'Knowledge & insights',
      items: [
        { name: 'Green Atlas Magazine', href: '/green-atlas-magazine', icon: FaNewspaper },
        { name: 'Industry Reports', href: '/resources/reports', icon: FaFileAlt },
        { name: 'White Papers', href: '/resources/whitepapers', icon: FaDatabase },
        { name: 'Blog & News', href: '/resources/blog', icon: FaNewspaper },
        { name: 'Downloads', href: '/resources/downloads', icon: FaFileAlt },
      ]
    },
    {
      name: 'Contact',
      icon: FaPhone,
      type: 'link',
      description: 'Get in touch with us',
      href: '/contact'
    }
  ];

  const quickActions = [
    { name: 'Request Consultation', href: '/consultation', icon: FaPhone },
    { name: 'Client Portal', href: '/client-portal', icon: FaUser },
    { name: 'Settings', href: '/settings', icon: FaCog },
  ];

  // Filter navigation based on search
  const filteredNavigation = navigation.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.items && item.items.some(subItem => 
      subItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

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
          className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl mx-3 transition-all duration-200 ${
            isActive
              ? 'bg-gradient-to-r from-envGreen-600 to-envGreen-700 text-white shadow-lg'
              : 'text-white/80 hover:bg-white/10 hover:text-white'
          }`}
          onClick={() => setIsOpen(false)}
        >
          <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
          <div className="flex-1">
            <div className="font-medium">{item.name}</div>
            {item.description && (
              <div className="text-xs text-white/60 group-hover:text-white/80">
                {item.description}
              </div>
            )}
          </div>
        </Link>
      );
    }

    return (
      <div className="mx-3 mb-2">
        <button
          onClick={() => toggleExpanded(item.name)}
          className={`group w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
            isActive
              ? 'bg-gradient-to-r from-envGreen-600 to-envGreen-700 text-white shadow-lg'
              : 'text-white/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <div className="flex items-center flex-1">
            <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
            <div className="text-left">
              <div className="font-medium">{item.name}</div>
              {item.description && (
                <div className="text-xs text-white/60 group-hover:text-white/80">
                  {item.description}
                </div>
              )}
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown className="w-4 h-4 text-white/60" />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-2 space-y-1">
                {item.items.map((subItem) => {
                  const SubIcon = subItem.icon || FaCircle;
                  return (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      className={`group flex items-center px-4 py-2.5 ml-4 text-sm rounded-lg transition-all duration-200 ${
                        location.pathname === subItem.href
                          ? 'bg-envGreen-500/80 text-white shadow-md'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <SubIcon className="w-4 h-4 mr-3 text-white/60 group-hover:text-white" />
                      {subItem.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-14 z-50 w-80 h-[calc(100vh-3.5rem)] bg-gradient-to-b from-envGreen-800 to-envGreen-900 border-r border-envGreen-600/50 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Navigation</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors lg:hidden"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search navigation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-4">
              <nav className="space-y-2">
                {filteredNavigation.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 px-6">
                <div className="text-white/60 text-xs uppercase tracking-wide mb-4 font-semibold">
                  Quick Actions
                </div>
                <div className="space-y-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.name}
                        to={action.href}
                        className="flex items-center px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {action.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-gradient-to-r from-envGreen-900 to-envGreen-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-envGreen-300 rounded-full animate-pulse mr-2"></div>
                  <span className="text-white/90 text-sm font-medium">Available</span>
                </div>
                <span className="text-white/60 text-xs">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-white/10 text-white text-xs rounded-lg hover:bg-white/20 transition-colors">
                  Schedule Call
                </button>
                <button className="px-3 py-2 bg-red-500/20 text-red-300 text-xs rounded-lg hover:bg-red-500/30 transition-colors">
                  <FaSignOutAlt className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;


