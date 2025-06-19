import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowRightIcon,
  MapPinIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  WifiIcon,
  ClockIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

const ClimateIntelligencePage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Cinematic scroll transforms
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  // State
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);

  // Live data
  const [liveData, setLiveData] = useState({
    temperature: '28.4°C',
    windSpeed: '23 km/h',
    pressure: '1013.2 hPa',
    activeReporters: 7
  });

  // Cover story
  const coverStory = {
    title: "The Storm Before The Storm",
    subtitle: "Artificial intelligence reveals hurricane patterns that could reshape the Caribbean forever",
    deck: "An unprecedented nine-month investigation spanning three nations uncovers the climate data governments don't want you to see.",
    classification: 'Field Investigation',
    urgency: 'Critical Climate Intelligence'
  };

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 z-50"
        style={{ width: `${readingProgress}%` }}
      />

      {/* HERO SECTION - Full Cinematic */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-green-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Masthead */}
        <motion.div 
          className="absolute top-8 left-8 z-20"
          style={{ y: titleY }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-serif text-white tracking-wider"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Climate Intelligence
          </motion.h1>
          <motion.div 
            className="text-white/80 text-lg mt-2 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Environmental Forensics & Field Investigation
          </motion.div>
        </motion.div>

        {/* Live Status */}
        <motion.div 
          className="absolute top-8 right-8 z-20 space-y-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>FIELD ACTIVE</span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm">
            <div className="flex items-center space-x-3">
              <WifiIcon className="w-4 h-4" />
              <span>{liveData.activeReporters} correspondents</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ y: contentY }}
        >
          <div className="max-w-5xl mx-auto px-8 text-center text-white">
            <motion.div 
              className="text-red-400 uppercase tracking-widest font-medium mb-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              {coverStory.classification} • {coverStory.urgency}
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              {coverStory.title}
            </motion.h2>
            
            <motion.h3 
              className="text-xl md:text-2xl font-light mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.1 }}
            >
              {coverStory.subtitle}
            </motion.h3>

            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.4 }}
            >
              {coverStory.deck}
            </motion.p>

            {/* Call to Action */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.7 }}
            >
              <button 
                onClick={() => setShowFullScreen(true)}
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-3 group"
              >
                <DocumentTextIcon className="w-5 h-5 group-hover:rotate-3 transition-transform" />
                <span>Enter Mission Brief</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="border border-white/30 text-white px-6 py-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
              >
                <PlayIcon className="w-5 h-5" />
                <span>Audio Narration</span>
                <span className="text-sm text-gray-300">18 min</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-light">Scroll to explore investigation</span>
            <ChevronDownIcon className="w-6 h-6" />
          </div>
        </motion.div>
      </motion.section>

      {/* DEMO SECTIONS */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-4xl font-serif text-gray-900 mb-4">Climate Intelligence Network</h2>
        <p className="text-xl text-gray-600">Real-time environmental monitoring and analysis</p>
      </section>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {showFullScreen && (
          <motion.div 
            className="fixed inset-0 bg-black z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button 
              onClick={() => setShowFullScreen(false)}
              className="absolute top-8 right-8 text-white hover:text-gray-300 z-60"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="min-h-screen flex items-center justify-center p-8">
              <motion.div 
                className="max-w-4xl text-white text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-6xl font-serif mb-8">{coverStory.title}</h1>
                <p className="text-2xl text-gray-300 mb-8">{coverStory.subtitle}</p>
                <button 
                  onClick={() => setShowFullScreen(false)}
                  className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Begin Reading Full Investigation
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClimateIntelligencePage; 