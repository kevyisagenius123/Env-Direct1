import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CampaignBannerSection = () => {
  const [bannerData, setBannerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Animation variants
  const contentWrapperVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1, duration: 0.4, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const fetchBannerData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/banner`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        // Check if response is okay AND has content
        if (response.status === 204) { // No Content
            console.warn("Campaign banner API returned 204 No Content");
            setBannerData({}); // Set to an empty object to indicate successful fetch but no data
        } else {
            const data = await response.json();
            setBannerData(data);
        }
      } catch (e) {
        console.error("Failed to fetch campaign banner:", e);
        setError("Failed to load campaign information. " + e.message);
      }
      setIsLoading(false);
    };
    fetchBannerData();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-mygreen dark:bg-mygreen-dark text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xl">Loading campaign details...</p>
        </div>
      </section>
    );
  }

  // Render error state if no banner data is available to render a fallback
  if (error && (!bannerData || Object.keys(bannerData).length === 0)) {
    return (
      <section className="py-16 md:py-24 bg-mygreen dark:bg-mygreen-dark text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xl text-red-300">{error}</p>
            <p className="text-sm text-gray-300 mt-2">Please check the API or network connection.</p>
        </div>
      </section>
    );
  }

  // If there is no banner data (e.g. API returned empty object from 204, or null from an issue not caught as error)
  // and no error state is active, render a minimal fallback or null.
  // Here we use the bannerData potentially being an empty object for fallback content.
  const headline = bannerData?.headline || "Join Our Coastal Cleanup Campaign!";
  const description = bannerData?.description || "Help keep Dominica's beaches pristine. Join volunteers for our monthly cleanup.";
  const ctaText = bannerData?.ctaText || "Register Now";
  const ctaLink = bannerData?.ctaLink || "/register-cleanup";
  const textColor = bannerData?.textColor || "text-white";

  // If API call finished (not loading) but bannerData is effectively empty for UI (e.g. from 204)
  // and no error was explicitly set, we might still want to show something or hide section.
  // The logic above will use default text if bannerData is an empty object.
  // If bannerData is strictly null and no error, then the section could be hidden based on requirements.
  // For now, if !isLoading and bannerData is null (and not error), default content will be shown. If it was an empty object, default content also shown.

  return (
    <motion.section
      className={`py-20 md:py-28 bg-mygreen dark:bg-mygreen-dark ${textColor} relative overflow-hidden`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {!isLoading && (
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={contentWrapperVariants}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
          >
            <motion.h2 
              variants={itemVariants}
              className={`text-4xl md:text-5xl font-bold mb-6 leading-tight`}
            >
              {headline}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className={`text-lg md:text-xl opacity-90 mb-10`}
            >
              {description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to={ctaLink}
                className={`inline-block bg-white hover:bg-gray-100 text-mygreen-dark dark:bg-mygreen-light dark:hover:bg-mygreen dark:text-mygreen-dark font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-mygreen-light focus:ring-opacity-50`}
              >
                {ctaText}
              </Link>
            </motion.div>
          </motion.div>
        )}
        {isLoading && (
            <div className="max-w-3xl mx-auto">
                 <p className="text-xl">Loading campaign details...</p>
            </div>
        )}
        {error && (!bannerData || Object.keys(bannerData).length === 0) && (
            <div className="max-w-3xl mx-auto">
                <p className="text-xl text-red-300">{error}</p>
                <p className="text-sm text-gray-300 mt-2">Please check the API or network connection.</p>
            </div>
        )}
      </div>
    </motion.section>
  );
};

export default CampaignBannerSection;
