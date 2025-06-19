import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToActionSection = () => {
  const contentWrapperVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="py-16 md:py-24 bg-mygreen dark:bg-mygreen-dark"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={contentWrapperVariants}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-white opacity-90 max-w-xl mx-auto">
            Contribute to a healthier planet by submitting environmental observations or explore real-time data on our interactive map.
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6"
        >
          <Link
            to="/submit-report"
            className="inline-block bg-white hover:bg-gray-200 text-mygreen-dark font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg transform hover:scale-105"
          >
            Submit a Report
          </Link>
          <Link
            to="/live-map"
            className="inline-block bg-mygreen-light hover:bg-mygreen text-mygreen-dark dark:bg-mygreen-lighter dark:hover:bg-mygreen dark:text-mygreen-dark font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg transform hover:scale-105"
          >
            Explore Live Map
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CallToActionSection; 
