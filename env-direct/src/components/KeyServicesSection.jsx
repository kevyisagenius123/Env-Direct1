import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Placeholder icons (you can replace these with actual SVGs or an icon library)
const PlaceholderIcon = ({ className = "w-12 h-12 text-mygreen mb-4" }) => (
  <svg className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M13 10V3L4 14h7v7l9-11h-7z"></path> {/* Example: lightning bolt */}
  </svg>
);

const serviceItems = [
  {
    title: "Environmental Reporting",
    description: "Comprehensive and actionable environmental reports tailored to your needs, helping you make informed decisions.",
    link: "/reports",
    icon: <PlaceholderIcon />, // Defaults to text-mygreen, which is good for the card background
  },
  {
    title: "Live Data Mapping",
    description: "Visualize real-time environmental data on interactive maps, offering insights into changing conditions.",
    link: "/live-map",
    icon: <PlaceholderIcon className="w-12 h-12 text-env-blue mb-4" />, // text-env-blue is also good
  },
  {
    title: "Expert Training Programs",
    description: "Empower your team with specialized training programs on environmental monitoring and data analysis.",
    link: "/training",
    icon: <PlaceholderIcon className="w-12 h-12 text-mygreen mb-4" />, // Changed from text-mygreen-light for better contrast
  },
];

const KeyServicesSection = () => {
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 md:py-20 bg-mygreen dark:bg-mygreen-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionTitleVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Core Services
          </h2>
          <p className="mt-4 text-lg text-white opacity-90 max-w-2xl mx-auto">
            We provide innovative solutions to help you monitor, understand, and improve the environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <motion.div
              key={index}
              className="premium-card flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow">
                {service.description}
              </p>
              <Link
                to={service.link}
                className="mt-auto premium-button"
              >
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyServicesSection; 
