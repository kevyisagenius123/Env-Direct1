import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion

// Placeholder data - REMOVED as API should be the source of truth
// const rankingData = [ ... ]; 

// Helper for trend indicator
const TrendArrow = ({ trend }) => {
  if (trend === 'up') return <span className="ml-2 text-green-500">▲</span>;
  if (trend === 'down') return <span className="ml-2 text-red-500">▼</span>;
  return <span className="ml-2 text-gray-400">●</span>; // Neutral or stable
};

const ScoreBar = ({ score }) => {
  // Ensure score is a number, default to 0 if not or if NaN/undefined/null
  const numericScore = Number(score);
  const validScore = isNaN(numericScore) || numericScore === null ? 0 : numericScore;
  const percentage = Math.max(0, Math.min(100, validScore)); 

  let bgColorClass = 'bg-green-500'; 
  if (percentage < 50) bgColorClass = 'bg-red-500';
  else if (percentage < 80) bgColorClass = 'bg-yellow-500';

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        className={`${bgColorClass} h-2.5 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const RegionRankingSection = () => {
  const [rankings, setRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Animation variants
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  useEffect(() => {
    const fetchRankings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/rankings`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched Rankings Data:", data); // DEBUGGING: Log fetched data
        setRankings(data);
      } catch (e) {
        console.error("Failed to fetch rankings:", e);
        setError("Failed to load regional rankings. " + e.message);
        setRankings([]); // Clear rankings on error to prevent rendering stale/partial data
      }
      setIsLoading(false);
    };

    fetchRankings();
  }, []);

  let content;
  if (isLoading) {
    content = <p className="text-center text-white py-10">Loading regional rankings...</p>;
  } else if (error) {
    content = <p className="text-center text-red-300 py-10">{error}</p>;
  } else if (rankings && rankings.length > 0) {
    content = (
      <motion.div // This is the container for the list of rankings
        className="bg-white dark:bg-env-gray-dark shadow-xl rounded-lg p-6 md:p-8"
        variants={listContainerVariants}
        initial="hidden"
        // Animate when data is loaded AND this container is in view.
        // Using whileInView ensures it animates when scrolled to, after loading.
        whileInView={!isLoading && rankings.length > 0 ? "visible" : "hidden"} 
        viewport={{ once: true, amount: 0.1 }}
      >
        <ol className="space-y-5">
          {rankings.map((item, index) => (
            <motion.li
              key={item.id || index}
              className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              variants={listItemVariants}
            >
              <div className="flex items-center">
                <span className="text-lg font-semibold text-mygreen-dark dark:text-mygreen-light mr-3">{index + 1}.</span>
                <div>
                  {/* Use optional chaining for safety if item structure is not guaranteed */}
                  <span className="font-medium text-gray-800 dark:text-white">{item?.name || 'N/A'} <TrendArrow trend={item?.trend} /></span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item?.details || 'No details available'}</p>
                </div>
              </div>
              <div className="w-1/3 md:w-1/4">
                <ScoreBar score={item?.score} /> {/* Pass score directly */}
                <p className="text-xs text-right text-gray-500 dark:text-gray-400 mt-1">Score: {item?.score !== undefined && item?.score !== null ? item.score : 'N/A'}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    );
  } else {
    content = <p className="text-center text-white py-10">No regional rankings available at the moment.</p>;
  }

  return (
    <section className="py-12 md:py-20 bg-mygreen dark:bg-mygreen-dark overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionTitleVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Dominica: Parish Environmental Health Scores
          </h2>
          <p className="mt-4 text-lg text-white opacity-90 max-w-2xl mx-auto">
            Comparing Parishes of the Nature Isle by overall environmental performance.
          </p>
        </motion.div>
        {content} {/* This now contains the motion.div for the list */}
        {rankings && rankings.length > 0 && (
          <div className="text-center mt-8">
            <a 
              href="/dominica-rankings-details" 
              className="text-mygreen-light hover:text-white dark:text-mygreen-light dark:hover:text-white font-medium transition-colors"
            >
              View Full Parish Rankings & Methodology
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegionRankingSection; 
