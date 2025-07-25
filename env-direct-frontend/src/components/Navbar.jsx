import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { FaBars, FaTimes, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import logo from '../assets/logo.png';

// Custom NavLink for Desktop - applies specific styling based on isScrolled and isActive
const NavLink = ({ to, children, onClick, isScrolled, className: extraClassName, isSpecial }) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => 
        `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
          isSpecial 
            ? isActive
              ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-500/50 animate-pulse'
              : 'bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold hover:from-red-700 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105'
            : isActive 
              ? isScrolled 
                ? 'text-envGreen-600 dark:text-envGreen-400 font-semibold'
                : 'text-white font-semibold filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]'
              : isScrolled 
                ? 'text-lavaGrey-900 dark:text-skyAsh-100 hover:text-envGreen-600 dark:hover:text-envGreen-400'
                : 'text-white hover:bg-black/10 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]'
        } ${extraClassName || ''}`
      }
    >
      {children}
    </RouterNavLink>
  );
};

const MobileNavLink = ({ to, children, onClick, isScrolled }) => (
  <Link
    to={to}
    onClick={onClick}
    className={    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isScrolled 
        ? 'text-lavaGrey-900 dark:text-skyAsh-100 hover:text-envGreen-600 dark:hover:text-envGreen-400'
        : 'text-white hover:bg-black/10 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]'
    }`}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight = window.innerHeight * 0.5;
      setIsScrolled(window.scrollY > heroSectionHeight);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // New navigation structure with dropdowns
  const navigation = [
    { name: 'Home', href: '/', type: 'link' },
    {
      name: 'Explore', type: 'dropdown', items: [
        { name: 'Intelligence Platform', href: '/dashboard' },
        { name: 'Environmental Lab', href: '/ai-lab' },
        { name: 'Reports', href: '/reports' },
        { name: 'Interactive Map', href: '/live-map' },
      ]
    },
    {
      name: 'Initiatives', type: 'dropdown', items: [
        { name: 'Projects', href: '/projects' },
        { name: 'Services', href: '/services' },
        { name: 'Training', href: '/training' },
      ]
    },
    { name: 'Magazine', href: '/green-atlas-magazine', type: 'link' },
    { name: 'INTELLIGENCE CENTER', href: '/dashboard', type: 'link', isSpecial: true }, 
    { name: 'Contact', href: '/contact', type: 'link' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  // Desktop icon button class
  const desktopIconButtonClass = (isScrolled) => 
    `ml-2 p-1 rounded-full transition-colors ${
      isScrolled 
        ? 'text-mygreen-dark dark:text-mygreen-light hover:bg-mygreen-lighter dark:hover:bg-mygreen-dark/30'
        : 'text-mygreen-dark dark:text-white hover:bg-black/10 dark:hover:bg-mygreen-dark/30'
    } focus:outline-none focus:ring-2 focus:ring-mygreen`;

  // Class for desktop dropdown trigger (text links)
  const desktopDropdownTriggerClass = (isScrolled) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
      isScrolled 
        ? 'text-mygreen-dark dark:text-mygreen-light hover:bg-mygreen-lighter dark:hover:bg-mygreen-dark/30 dark:hover:text-white'
        : 'text-white hover:bg-mygreen-dark/30 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]'
    }`;

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'backdrop-blur-md bg-white/70 dark:bg-lavaGrey-900/70 shadow-lg rounded-b-2xl border-b border-envGreen-500' 
          : 'bg-transparent'
      }`}
      style={{
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : undefined,
        backdropFilter: isScrolled ? 'blur(16px)' : undefined,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={closeMenu}>
            <img src={logo} alt="Environment Direct Logo" className="h-8 w-8" />
            <span className={`self-center text-2xl font-semibold whitespace-nowrap transition-colors ${
              isScrolled 
                ? 'text-envGreen-600 dark:text-envGreen-400' 
                : 'text-white filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]'
            }`}>Environment Direct</span>
          </Link>

          <div className="hidden lg:flex items-center">
            {navigation.map((item) => (
              item.type === 'link' ? (
                <NavLink 
                  key={item.name} 
                  to={item.href}
                  onClick={closeMenu}
                  isScrolled={isScrolled}
                  isSpecial={item.isSpecial}
                >
                  {item.name}
                </NavLink>
              ) : (
                <Menu as="div" key={item.name} className="relative inline-block text-left">
                  <div>
                    <Menu.Button className={`${desktopDropdownTriggerClass(isScrolled)}`}>
                      {item.name}
                      <FaChevronDown className="ml-1 h-3 w-3" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 dark:divide-gray-700 rounded-xl bg-white/80 dark:bg-mygreen-darker/80 shadow-lg ring-1 ring-black/5 focus:outline-none backdrop-blur-md">
                      <div className="px-1 py-1">
                        {item.items.map((subItem) => (
                          <Menu.Item key={subItem.name}>
                            {({ active }) => (
                              <Link
                                to={subItem.href}
                                onClick={closeMenu}
                                className={`${
                                  active ? 'bg-envGreen-500/10 text-envGreen-600 dark:text-envGreen-400' : 'text-mygreen-dark dark:text-mygreen-light'
                                } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )
            ))}

            {/* User Menu Dropdown */}
            <Menu as="div" className="relative inline-block text-left ml-3">
              <div>
                <Menu.Button className={desktopIconButtonClass(isScrolled)}>
                  <FaUserCircle className="h-6 w-6" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-xl bg-white/80 dark:bg-mygreen-darker/80 shadow-lg ring-1 ring-black/5 focus:outline-none backdrop-blur-md">
                  <div className="px-1 py-1">
                    {isAuthLoading ? (
                        <div className="px-4 py-2 text-sm text-mygreen-dark dark:text-mygreen-light">Loading...</div>
                    ) : currentUser ? (
                      <>
                        <div className="px-4 py-3 text-sm text-mygreen-dark dark:text-mygreen-light">
                          <div>Hi, {currentUser.username}!</div>
                        </div>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/submit-article"
                              onClick={closeMenu}
                              className={`${
                                active ? 'bg-envGreen-500/10 text-envGreen-600 dark:text-envGreen-400' : 'text-mygreen-dark dark:text-mygreen-light'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
                            >
                              Submit Article
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? 'bg-red-500 text-white' : 'text-mygreen-dark dark:text-mygreen-light hover:text-red-500'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/login"
                              onClick={closeMenu}
                              className={`${
                                active ? 'bg-envGreen-500/10 text-envGreen-600 dark:text-envGreen-400' : 'text-mygreen-dark dark:text-mygreen-light'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/register"
                              onClick={closeMenu}
                              className={`${
                                active ? 'bg-envGreen-500/10 text-envGreen-600 dark:text-envGreen-400' : 'text-mygreen-dark dark:text-mygreen-light'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
                            >
                              Register
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* DarkModeToggle for desktop */}
            <div className="ml-4">
              <DarkModeToggle isScrolled={isScrolled} />
            </div>
          </div>

          {/* Mobile menu button and dark mode toggle */}
          <div className="lg:hidden flex items-center">
            <div className="mr-2">
              <DarkModeToggle isScrolled={isScrolled} />
            </div>
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled 
                  ? 'text-mygreen-dark dark:text-mygreen-light hover:text-envGreen-600'
                  : 'text-white hover:bg-black/10'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-envGreen-500`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className={`lg:hidden ${isScrolled ? 'bg-white dark:bg-mygreen-darker' : 'bg-envGreen-600'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              item.type === 'link' ? (
                <MobileNavLink
                  key={item.name}
                  to={item.href}
                  onClick={closeMenu}
                  isScrolled={isScrolled}
                >
                  {item.name}
                </MobileNavLink>
              ) : (
                <div key={item.name} className="space-y-1">
                  <div className="px-3 py-2 text-base font-medium text-mygreen-dark dark:text-mygreen-light">
                    {item.name}
                  </div>
                  {item.items.map((subItem) => (
                    <MobileNavLink
                      key={subItem.name}
                      to={subItem.href}
                      onClick={closeMenu}
                      isScrolled={isScrolled}
                    >
                      {subItem.name}
                    </MobileNavLink>
                  ))}
                </div>
              )
            ))}
          </div>
        </div>
      </Transition>
    </motion.nav>
  );
};

export default Navbar; 
