import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, PlayIcon, SparklesIcon, GlobeAltIcon, BoltIcon } from '@heroicons/react/24/outline';

const HeroBanner = ({ featuredArticles, onSearch, searchQuery, setSearchQuery }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAIMode, setIsAIMode] = useState(false);
  const [briefingActive, setBriefingActive] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState({
    activeReports: 247,
    globalTemp: '+1.23°C',
    co2Level: '421.3 ppm',
    biodiversityIndex: 0.82
  });

  // Cinematic auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % featuredArticles.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredArticles.length]);

  // Live metrics simulation
  useEffect(() => {
    const metricsTimer = setInterval(() => {
      setLiveMetrics(prev => ({
        activeReports: prev.activeReports + Math.floor(Math.random() * 3),
        globalTemp: `+${(1.23 + (Math.random() - 0.5) * 0.02).toFixed(2)}°C`,
        co2Level: `${(421.3 + (Math.random() - 0.5) * 0.5).toFixed(1)} ppm`,
        biodiversityIndex: (0.82 + (Math.random() - 0.5) * 0.01).toFixed(3)
      }));
    }, 3000);
    return () => clearInterval(metricsTimer);
  }, []);

  const currentArticle = featuredArticles[currentFeature];

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-lavaGrey-950 via-envGreen-950 to-seaBlue-950">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover opacity-30"
          poster="/img/earth-hero-poster.jpg"
        >
          <source src="/videos/earth-observatory.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-lavaGrey-950/90 via-transparent to-envGreen-950/60" />
      </div>

      {/* Mission Control Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full border-envGreen-400/20">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-envGreen-400/10" />
          ))}
        </div>
      </div>

      {/* Live Metrics HUD */}
      <motion.div 
        className="absolute top-8 right-8 z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="backdrop-blur-xl bg-lavaGrey-900/70 border border-envGreen-400/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <BoltIcon className="w-5 h-5 text-sandGold-400 animate-pulse" />
            <span className="text-xs font-mono text-skyAsh-300 uppercase tracking-wider">Live Intelligence</span>
          </div>
          <div className="space-y-3">
            {Object.entries(liveMetrics).map(([key, value]) => (
              <motion.div 
                key={key}
                className="flex justify-between items-center"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xs text-skyAsh-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-mono text-sm text-envGreen-300 font-semibold">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-12 gap-8 items-center">
          
          {/* Left: Cinematic Brand & Mission Statement */}
          <div className="col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-3 h-3 bg-envGreen-400 rounded-full animate-pulse" />
                <span className="text-envGreen-400 text-sm font-mono uppercase tracking-widest">Live Intelligence Feed</span>
              </div>
              
              <h1 className="font-display text-7xl font-black text-white leading-tight mb-6">
                Green Atlas
                <span className="block text-5xl text-envGreen-400 font-light">Intelligence</span>
              </h1>
              
              <p className="text-xl text-skyAsh-300 leading-relaxed max-w-2xl">
                The Earth's real-time operating system. Sovereign-grade environmental intelligence 
                for ministers, scientists, and global changemakers.
              </p>
            </motion.div>

            {/* Interactive Mission Controls */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => setBriefingActive(!briefingActive)}
                className="group relative px-8 py-4 bg-envGreen-600/20 backdrop-blur-lg border border-envGreen-400/50 rounded-xl text-envGreen-300 font-semibold transition-all duration-300 hover:bg-envGreen-500/30 hover:shadow-glow-green"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <SparklesIcon className="w-5 h-5 inline mr-2" />
                Start Intelligence Briefing
                {briefingActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-sandGold-400 rounded-full animate-ping" />
                )}
              </motion.button>

              <motion.button
                onClick={() => setIsAIMode(!isAIMode)}
                className={`group px-6 py-4 backdrop-blur-lg border rounded-xl font-semibold transition-all duration-300 ${
                  isAIMode 
                    ? 'bg-sandGold-500/20 border-sandGold-400/50 text-sandGold-300 shadow-glow-blue' 
                    : 'bg-seaBlue-600/20 border-seaBlue-400/50 text-seaBlue-300 hover:bg-seaBlue-500/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <GlobeAltIcon className="w-5 h-5 inline mr-2" />
                {isAIMode ? 'AI Mode Active' : 'Enable AI Mode'}
              </motion.button>
            </motion.div>

            {/* Advanced Search Interface */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="relative group">
                <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-skyAsh-400 group-hover:text-envGreen-400 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && onSearch(searchQuery)}
                  placeholder={isAIMode ? "Ask environmental intelligence..." : "Search global environmental intelligence..."}
                  className="w-full pl-16 pr-6 py-5 bg-lavaGrey-900/50 backdrop-blur-xl border border-skyAsh-600/30 rounded-2xl text-white text-lg placeholder-skyAsh-400 focus:border-envGreen-400/50 focus:ring-4 focus:ring-envGreen-400/20 focus:outline-none transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  {isAIMode && (
                    <div className="px-3 py-1 bg-sandGold-500/20 border border-sandGold-400/50 rounded-lg">
                      <span className="text-xs text-sandGold-300 font-mono uppercase">AI</span>
                    </div>
                  )}
                  <button 
                    onClick={() => onSearch(searchQuery)}
                    className="px-4 py-2 bg-envGreen-600 text-white rounded-lg hover:bg-envGreen-500 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Featured Intelligence Card */}
          <div className="col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: 15 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative group cursor-pointer"
              >
                <div className="backdrop-blur-2xl bg-lavaGrey-900/60 border border-envGreen-400/30 rounded-3xl p-8 shadow-broadcast hover:shadow-glow-green transition-all duration-500 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-sandGold-400 rounded-full animate-pulse" />
                      <span className="text-sandGold-400 text-sm font-mono uppercase tracking-wider">Featured Intelligence</span>
                    </div>
                    <div className="text-skyAsh-400 text-sm font-mono">
                      {String(currentFeature + 1).padStart(2, '0')}/{String(featuredArticles.length).padStart(2, '0')}
                    </div>
                  </div>

                  {currentArticle && (
                    <>
                      <div className="relative mb-6">
                        <img 
                          src={currentArticle.image} 
                          alt={currentArticle.title}
                          className="w-full h-48 object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-lavaGrey-900/80 via-transparent to-transparent rounded-2xl" />
                        <motion.button
                          className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <PlayIcon className="w-6 h-6 ml-1" />
                        </motion.button>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-white mb-4 leading-tight group-hover:text-envGreen-300 transition-colors">
                        {currentArticle.title}
                      </h3>
                      
                      <p className="text-skyAsh-300 text-sm leading-relaxed mb-6 line-clamp-3">
                        {currentArticle.summary}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-envGreen-400 to-seaBlue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {currentArticle.author?.[0] || 'AI'}
                            </div>
                            <span className="text-skyAsh-300 text-sm">{currentArticle.author || 'AI Analysis'}</span>
                          </div>
                        </div>
                        <motion.button
                          className="px-6 py-3 bg-envGreen-600 text-white rounded-xl font-semibold hover:bg-envGreen-500 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Access Report
                        </motion.button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Feature Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredArticles.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFeature ? 'bg-envGreen-400 w-8' : 'bg-skyAsh-600 hover:bg-skyAsh-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-envGreen-400/50 rounded-full p-1">
          <div className="w-1 h-3 bg-envGreen-400 rounded-full mx-auto animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner; 