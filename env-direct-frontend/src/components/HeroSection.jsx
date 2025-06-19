import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-mygreen-light dark:bg-gradient-to-br dark:from-green-900 dark:to-teal-800"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-mygreen-dark dark:text-gray-200 leading-tight mb-6"
        >
          Environment <span className="text-white dark:text-mygreen-light">Direct</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg sm:text-xl md:text-2xl text-mygreen-dark dark:text-gray-300 opacity-90 mb-10"
        >
          Your trusted source for real-time environmental insights and community action in Dominica.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-block bg-mygreen-dark hover:bg-mygreen text-white dark:bg-mygreen dark:hover:bg-mygreen-light dark:text-white dark:hover:text-mygreen-dark font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-mygreen focus:ring-opacity-50"
          >
            Explore Live Data
          </Link>
          <Link
            to="/get-involved"
            className="inline-block bg-transparent hover:bg-mygreen-dark/10 text-mygreen-dark dark:text-mygreen-light dark:hover:bg-mygreen-light/20 border-2 border-mygreen-dark dark:border-mygreen-light font-semibold py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-mygreen-light focus:ring-opacity-50"
          >
            Get Involved
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection; 
