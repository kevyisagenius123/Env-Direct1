import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaGlobe, FaUniversity, FaLeaf } from 'react-icons/fa';

const PrestigeQuoteBar = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      text: "Green Atlas represents a world-class model for what environmental media should be — independent, intelligent, and indispensable.",
      author: "Dr. Maria Santos",
      title: "Former UN Climate Director",
      organization: "United Nations Environment Programme",
      icon: FaGlobe,
      accent: "border-envGreen-400 dark:border-envGreen-300"
    },
    {
      text: "The sophistication of their climate intelligence platform rivals any government environmental monitoring system I've encountered.",
      author: "Professor James Mitchell",
      title: "Director, Caribbean Climate Institute",
      organization: "University of the West Indies",
      icon: FaUniversity,
      accent: "border-seaBlue-400 dark:border-seaBlue-300"
    },
    {
      text: "This level of environmental journalism and data integration is exactly what small island developing states need for climate resilience.",
      author: "Ambassador Elena Rodriguez",
      title: "Climate Envoy",
      organization: "Caribbean Community (CARICOM)",
      icon: FaLeaf,
      accent: "border-sandGold-400 dark:border-sandGold-300"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000); // Change quote every 8 seconds

    return () => clearInterval(timer);
  }, [quotes.length]);

  const currentQuoteData = quotes[currentQuote];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-lavaGrey-950 via-lavaGrey-900 to-lavaGrey-950 dark:from-lavaGrey-950 dark:via-lavaGrey-900 dark:to-lavaGrey-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.3)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_0%,transparent_50%)]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Quote icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/20 dark:to-white/10 backdrop-blur-md rounded-full border border-white/20 dark:border-white/30">
              <FaQuoteLeft className="w-8 h-8 text-envGreen-400 dark:text-envGreen-300" />
            </div>
          </motion.div>

          {/* Quote content */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="space-y-8"
              >
                {/* Quote text */}
                <blockquote className={`text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed text-white px-8 py-12 bg-lavaGrey-900/40 dark:bg-lavaGrey-950/60 backdrop-blur-md rounded-2xl border-l-4 ${currentQuoteData.accent} border border-white/10 dark:border-white/20`}>
                  "{currentQuoteData.text}"
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center justify-center space-x-6">
                  {/* Author icon */}
                  <div className="hidden md:flex p-4 bg-gradient-to-br from-envGreen-600/20 to-seaBlue-600/20 dark:from-envGreen-500/30 dark:to-seaBlue-500/30 rounded-full border border-white/10 dark:border-white/20">
                    <currentQuoteData.icon className="w-6 h-6 text-envGreen-400 dark:text-envGreen-300" />
                  </div>
                  
                  {/* Author info */}
                  <div className="text-center md:text-left">
                    <div className="text-xl font-semibold text-white mb-1">
                      {currentQuoteData.author}
                    </div>
                    <div className="text-envGreen-400 dark:text-envGreen-300 font-medium mb-1">
                      {currentQuoteData.title}
                    </div>
                    <div className="text-skyAsh-400 dark:text-skyAsh-300 text-sm">
                      {currentQuoteData.organization}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quote indicators */}
          <motion.div
            className="flex justify-center space-x-3 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentQuote
                    ? 'bg-envGreen-400 dark:bg-envGreen-300 scale-125'
                    : 'bg-white/30 dark:bg-white/40 hover:bg-white/50 dark:hover:bg-white/60'
                }`}
              />
            ))}
          </motion.div>

          {/* Credibility badges */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
          >
            <div className="flex items-center space-x-3 px-6 py-3 bg-white/5 dark:bg-white/10 backdrop-blur-md rounded-full border border-white/10 dark:border-white/20">
              <FaUniversity className="w-5 h-5 text-seaBlue-400 dark:text-seaBlue-300" />
              <span className="text-white font-medium text-sm">Academic Partnership</span>
            </div>
            
            <div className="flex items-center space-x-3 px-6 py-3 bg-white/5 dark:bg-white/10 backdrop-blur-md rounded-full border border-white/10 dark:border-white/20">
              <FaGlobe className="w-5 h-5 text-envGreen-400 dark:text-envGreen-300" />
              <span className="text-white font-medium text-sm">UN Collaboration</span>
            </div>
            
            <div className="flex items-center space-x-3 px-6 py-3 bg-white/5 dark:bg-white/10 backdrop-blur-md rounded-full border border-white/10 dark:border-white/20">
              <FaLeaf className="w-5 h-5 text-sandGold-400 dark:text-sandGold-300" />
              <span className="text-white font-medium text-sm">CARICOM Recognition</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrestigeQuoteBar; 