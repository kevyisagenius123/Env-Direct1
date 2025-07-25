import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="bg-envGreen-700 dark:bg-envGreen-800 text-white py-20 px-4 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Company Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 dark:bg-white/5 rounded-full border border-white/20 dark:border-white/10">
              <div className="w-2 h-2 bg-white rounded-full mr-3" />
              <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
                Environmental Intelligence Agency
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                Environment Direct
              </h1>
              
              <h2 className="text-xl lg:text-2xl text-white/90 font-light max-w-2xl">
                Dominica's national environmental consulting agency. AI-powered analysis. 
                Satellite-driven insights for environmental consulting and strategic planning.
              </h2>
            </div>

            {/* Value Proposition */}
            <div className="bg-white/5 dark:bg-white/10 rounded-lg p-6 border border-white/10 dark:border-white/20">
              <h3 className="text-lg font-semibold mb-3 text-white">What We Deliver:</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-envGreen-200 dark:text-envGreen-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time environmental consulting and risk assessment
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-envGreen-200 dark:text-envGreen-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Satellite imagery analysis and predictive modeling
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-envGreen-200 dark:text-envGreen-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Policy recommendations for sustainable development
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/climate-intelligence"
                className="px-8 py-4 bg-white text-envGreen-700 dark:text-envGreen-800 font-semibold rounded-lg hover:bg-white/90 transition-colors duration-300 text-center"
              >
                Explore Our Platform
              </Link>
              <Link
                to="/reports"
                className="px-8 py-4 border-2 border-white/30 dark:border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors duration-300 text-center"
              >
                See Case Studies
              </Link>
            </div>
          </motion.div>

          {/* Trust Signals & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Live Status */}
            <div className="bg-white/5 dark:bg-white/10 rounded-lg p-4 border border-white/10 dark:border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-envGreen-400 dark:bg-envGreen-300 rounded-full animate-pulse mr-2" />
                  <span className="text-white/90 font-medium">All Systems Operational</span>
                </div>
                <span className="text-white/70 text-sm">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 
