import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  PlayIcon, ArrowRightIcon, MapPinIcon, ChevronDownIcon,
  DocumentTextIcon, ClockIcon, EyeIcon, MicrophoneIcon,
  SignalIcon as SatelliteIcon, FilmIcon
} from '@heroicons/react/24/outline';

// Import all completed features
import {
  VisualTimeline,
  FeatureStoryDeck,
  AuthorSpotlight,
  InteractiveMap,
  MultimediaEmbed,
  AIIntelligenceDigest
} from '../components/magazine/CompletedFeatures';

const ClimateIntelligenceHub = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Cinematic scroll transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  
  // State management
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeDispatch, setActiveDispatch] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveMetrics, setLiveMetrics] = useState({
    globalTemp: '+1.23°C',
    coralCoverage: '-18.2%',
    activeReporters: 47,
    readersEngaged: '2.3M'
  });

  // Fetch real articles data
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/articles');
        if (response.ok) {
          const data = await response.json();
          // Filter for approved articles only
          const approvedArticles = data.filter(article => article.approvalStatus === 'APPROVED');
          setArticles(approvedArticles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Intelligence Feeds
  const intelligenceStory = {
    classification: 'FIELD INVESTIGATION',
    urgency: 'CRITICAL',
    title: 'The Coral Requiem',
    subtitle: 'AI-guided analysis reveals accelerating reef collapse across three ocean basins',
    location: 'Great Barrier Reef Research Station',
    author: 'Dr. Marina Kowalski',
    coordinates: '16.2839°S, 145.7781°E',
    lastUpdate: '23 minutes ago',
    confidence: 94,
    readTime: '18 min investigation'
  };

  // Field Dispatches
  const fieldDispatches = [
    {
      id: 1,
      author: 'Elena Vasquez',
      location: 'Dominica Rainforest Canopy',
      timestamp: '12 minutes ago',
      status: 'TRANSMITTING',
      signal: 'Via Satellite',
      weather: '28°C, Humid, Light Rain',
      preview: 'Unprecedented insect die-offs detected via acoustic monitoring. Forest silence expanding at 2.3km/day...',
      audioLength: '4:32',
      hasVideo: true,
      urgency: 'breaking'
    },
    {
      id: 2,
      author: 'Marcus Thompson',
      location: 'Greenland Ice Sheet Station',
      timestamp: '34 minutes ago',
      status: 'FIELD ACTIVE',
      signal: 'Via Ham Radio',
      weather: '-12°C, Clear, High Winds',
      preview: 'Core samples reveal acceleration in melt rates. Ancient air bubbles tell story of rapid climate shifts...',
      audioLength: '7:18',
      hasVideo: false,
      urgency: 'critical'
    },
    {
      id: 3,
      author: 'Dr. Amara Singh',
      location: 'Amazon Monitoring Station',
      timestamp: '1 hour ago',
      status: 'DATA ANALYSIS',
      signal: 'Via Ground Link',
      weather: '31°C, High Humidity',
      preview: 'Carbon flux measurements show rainforest transitioning from sink to source. Tipping point analysis underway...',
      audioLength: '9:44',
      hasVideo: true,
      urgency: 'intelligence'
    }
  ];

  // Editor Message
  const editorMessage = {
    title: "Planetary Intelligence Briefing",
    author: "Dr. Elena Vasquez, Editor-in-Chief",
    classification: "PUBLIC INTELLIGENCE",
    date: "November 15, 2024",
    content: `This quarter's intelligence synthesis reveals accelerating ecosystem transitions across all monitored regions. Our field teams have documented unprecedented changes in coral reef systems, arctic ice dynamics, and rainforest carbon cycling.

What you are reading is not journalism—it is environmental forensics. Each investigation represents months of field work, AI-assisted pattern recognition, and collaboration with global research networks.

The data is clear: Earth's climate system is entering a phase of rapid reorganization. Our mission is to document this transformation with scientific precision and narrative clarity, providing world leaders with the intelligence needed for informed decision-making.`,
    signature: "Dr. Elena Vasquez",
    confidenceLevel: "HIGH",
    sources: 23
  };

  // Editorial team data for Author Spotlight
  const editorialTeam = [
    {
      name: 'Dr. Elena Vasquez',
      role: 'Editor-in-Chief',
      articles: 23,
      specialization: 'Marine Environmental Forensics',
      status: 'Editorial Leadership',
      location: 'Global Command',
      expertise: 'Coral Reef Crisis Analysis'
    },
    {
      name: 'Marcus Thompson',
      role: 'Field Correspondent',
      articles: 18,
      specialization: 'Arctic Climate Intelligence',
      status: 'Contributing Editor',
      location: 'Greenland Station',
      expertise: 'Ice Dynamics Reporting'
    },
    {
      name: 'Dr. Amara Singh',
      role: 'Senior Research Analyst',
      articles: 15,
      specialization: 'Carbon Flux Analysis',
      status: 'Contributing Editor',
      location: 'Amazon Hub',
      expertise: 'Rainforest Monitoring'
    }
  ];

  // Featured stories for story deck
  const featuredStories = [
    {
      id: 'editorial-1',
      title: 'The Coral Requiem: A Global Investigation',
      subtitle: 'AI-guided analysis reveals accelerating reef collapse across three ocean basins',
      author: 'Dr. Elena Vasquez',
      category: 'LONGITUDINAL CRISIS THREAD',
      readTime: '18 min investigation',
      status: 'ACTIVE',
      priority: 'CRITICAL',
      location: 'Global Ocean Monitoring Network',
      url: '/investigations/coral-requiem'
    },
    {
      id: 'editorial-2', 
      title: 'Arctic Pulse: The Ice Memory Project',
      subtitle: 'Core samples reveal unprecedented acceleration in polar ice dynamics',
      author: 'Marcus Thompson',
      category: 'PREDICTIVE INTELLIGENCE ZONE',
      readTime: '12 min briefing',
      status: 'MONITORING',
      priority: 'HIGH',
      location: 'Greenland Research Station',
      url: '/investigations/arctic-pulse'
    }
  ];

  // Effects
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDispatch(prev => (prev + 1) % fieldDispatches.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [fieldDispatches.length]);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-slate-950">
      {/* Intelligence Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 z-50"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Live Intelligence Overlay */}
      <motion.div 
        className="fixed top-4 right-4 z-40 bg-black/80 backdrop-blur-xl rounded-lg p-4 text-white border border-emerald-400/30"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="flex items-center space-x-3 text-sm mb-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="font-mono text-emerald-400">LIVE INTELLIGENCE</span>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Global Temp:</span>
            <span className="text-red-400 font-mono">{liveMetrics.globalTemp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Coral Coverage:</span>
            <span className="text-orange-400 font-mono">{liveMetrics.coralCoverage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Field Agents:</span>
            <span className="text-cyan-400 font-mono">{liveMetrics.activeReporters}</span>
          </div>
        </div>
      </motion.div>

      {/* HERO SECTION */}
      <HeroFeature 
        story={intelligenceStory}
        scrollProgress={heroOpacity}
        parallaxY={parallaxY}
        textY={textY}
      />

      {/* SCROLL PREAMBLE */}
      <ScrollPreamble />

      {/* EDITOR'S LETTER */}
      <EditorsLetter message={editorMessage} />

      {/* DISPATCH CAROUSEL */}
      <DispatchCarousel 
        dispatches={fieldDispatches}
        activeDispatch={activeDispatch}
        setActiveDispatch={setActiveDispatch}
      />

      {/* ADVANCED AI INTELLIGENCE DIGEST */}
      <AIIntelligenceDigest articles={articles} />

      {/* VISUAL TIMELINE */}
      <VisualTimeline articles={articles} />

      {/* FEATURE STORY DECK */}
      <FeatureStoryDeck stories={featuredStories} articles={articles} />

      {/* AUTHOR SPOTLIGHT */}
      <AuthorSpotlight team={editorialTeam} articles={articles} />

      {/* INTERACTIVE GLOBAL OPERATIONS MAP */}
      <InteractiveMap dispatches={fieldDispatches} />

      {/* IMMERSIVE MEDIA CENTER */}
      <MultimediaEmbed />

      {/* PUBLISHED INTELLIGENCE SECTION */}
      <PublishedIntelligence articles={articles} loading={loading} />

      {/* FOOTER */}
      <EditorialFooter />
    </div>
  );
};

// HERO COMPONENT
const HeroFeature = ({ story, scrollProgress, parallaxY, textY }) => {
  return (
    <motion.section 
      className="relative h-screen overflow-hidden"
      style={{ opacity: scrollProgress }}
    >
      {/* Cinematic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: parallaxY }}
      >
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-900/30 to-cyan-900/30">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>
      </motion.div>

      {/* Command Center Masthead */}
      <motion.div 
        className="absolute top-8 left-8 z-20"
        style={{ y: textY }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide">
          Climate Intelligence
        </h1>
        <div className="text-emerald-400 text-lg mt-2 font-mono tracking-wider">
          PLANETARY MONITORING NETWORK
        </div>
        <div className="text-slate-400 text-sm mt-1 font-mono">
          EST. 2012 • CLASSIFICATION: PUBLIC INTEL
        </div>
      </motion.div>

      {/* Mission Status */}
      <motion.div 
        className="absolute top-8 right-8 z-20 space-y-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-mono flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>CRITICAL MISSION ACTIVE</span>
        </div>
        <div className="bg-black/60 backdrop-blur-xl text-white px-4 py-2 rounded-lg text-sm border border-emerald-400/30">
          <div className="flex items-center space-x-3">
            <SatelliteIcon className="w-4 h-4 text-emerald-400" />
            <span className="font-mono">{story?.author} • {story?.location}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Intelligence Brief */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ y: textY }}
      >
        <div className="max-w-6xl mx-auto px-8 text-center text-white">
          <motion.div 
            className="text-red-400 uppercase tracking-[0.3em] font-mono font-medium mb-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {story?.classification} • {story?.urgency}
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.3 }}
          >
            {story?.title}
          </motion.h2>
          
          <motion.h3 
            className="text-xl md:text-2xl font-light mb-8 text-emerald-200 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
          >
            {story?.subtitle}
          </motion.h3>

          <motion.div 
            className="flex items-center justify-center space-x-8 mb-8 text-sm text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.9 }}
          >
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4" />
              <span>{story?.coordinates}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4" />
              <span>{story?.lastUpdate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <EyeIcon className="w-4 h-4" />
              <span>Confidence: {story?.confidence}%</span>
            </div>
          </motion.div>

          {/* Mission Brief CTA */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            <button className="bg-emerald-600 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-500 transition-all duration-300 flex items-center space-x-3 group">
              <DocumentTextIcon className="w-5 h-5 group-hover:rotate-3 transition-transform" />
              <span>ENTER MISSION BRIEF</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="border border-emerald-400/50 text-emerald-400 px-6 py-4 rounded-lg font-medium hover:bg-emerald-400/10 transition-all duration-300 flex items-center space-x-3">
              <PlayIcon className="w-5 h-5" />
              <span>FIELD AUDIO</span>
              <span className="text-sm text-slate-400">{story?.readTime}</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-mono tracking-wide">SCROLL FOR INTELLIGENCE BRIEFING</span>
          <ChevronDownIcon className="w-6 h-6" />
        </div>
      </motion.div>
    </motion.section>
  );
};

// SCROLL PREAMBLE
const ScrollPreamble = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  return (
    <motion.section 
      ref={ref}
      className="py-16 bg-gradient-to-b from-slate-950 to-slate-900"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center px-8">
        <motion.blockquote 
          className="text-2xl md:text-3xl font-light text-emerald-200 leading-relaxed italic"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          "We are the first generation to witness the Earth's climate system in rapid transition, 
          and the last generation that can document its original state with scientific precision."
        </motion.blockquote>
        <motion.div 
          className="mt-6 text-slate-400 font-mono text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          — Mission Statement, Climate Intelligence Network
        </motion.div>
      </div>
    </motion.section>
  );
};

// EDITOR'S LETTER
const EditorsLetter = ({ message }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <motion.section 
      ref={ref}
      className="py-20 bg-slate-900"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-5xl mx-auto px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="text-emerald-400 font-mono text-sm uppercase tracking-[0.3em] mb-4">
            {message.classification}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">{message.title}</h2>
          <div className="w-32 h-1 bg-emerald-400 mx-auto"></div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-4 gap-12 items-start"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Author Profile */}
          <div className="md:col-span-1">
            <div className="bg-slate-800 p-6 rounded-lg border border-emerald-400/20">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
              <h3 className="font-semibold text-center text-white">{message.author}</h3>
              <div className="text-center space-y-2 mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-xs text-emerald-400 font-mono">FIELD ACTIVE</span>
                </div>
                <div className="text-xs text-slate-400">
                  Confidence: {message.confidenceLevel}
                </div>
                <div className="text-xs text-slate-400">
                  Sources: {message.sources} verified
                </div>
              </div>
            </div>
          </div>

          {/* Letter Content */}
          <div className="md:col-span-3">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="text-lg text-slate-300 leading-relaxed space-y-6">
                {message.content.split('\n\n').map((paragraph, index) => (
                  <motion.p 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                    className={index === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:text-emerald-400 first-letter:float-left first-letter:mr-3 first-letter:mt-2" : ""}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Signature */}
              <motion.div 
                className="mt-12 pt-8 border-t border-slate-700"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-emerald-400 font-mono text-lg">{message.signature}</div>
                    <div className="text-slate-400 text-sm mt-1">{message.date}</div>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div className="mt-1 font-mono">AUTHENTICATED</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// DISPATCH CAROUSEL
const DispatchCarousel = ({ dispatches, activeDispatch, setActiveDispatch }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <motion.section 
      ref={ref}
      className="py-20 bg-slate-950"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          className="flex items-center justify-between mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div>
            <h2 className="text-4xl font-serif text-white mb-2">Live Field Intelligence</h2>
            <p className="text-slate-400">Real-time dispatches from our correspondent network</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-mono">FIELD ACTIVE</span>
            </div>
            <div className="text-emerald-400 text-sm font-mono">
              {dispatches.length} ACTIVE DISPATCHES
            </div>
          </div>
        </motion.div>

        {/* Dispatch Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {dispatches.map((dispatch, index) => (
            <motion.article 
              key={dispatch.id}
              className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${
                index === activeDispatch ? 'ring-2 ring-emerald-400 scale-105' : 'hover:scale-102'
              }`}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
              onClick={() => setActiveDispatch(index)}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
              
              {/* Status Indicators */}
              <div className="absolute top-4 left-4 z-10 space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                  dispatch.urgency === 'breaking' ? 'bg-red-600 text-white' :
                  dispatch.urgency === 'critical' ? 'bg-orange-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {dispatch.urgency.toUpperCase()}
                </span>
                <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-emerald-400 font-mono">
                  {dispatch.status}
                </div>
              </div>

              {/* Weather & Signal */}
              <div className="absolute top-4 right-4 z-10 text-right">
                <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded mb-1 text-xs text-white font-mono">
                  {dispatch.signal}
                </div>
                <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs text-cyan-400 font-mono">
                  {dispatch.weather}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative p-6 pt-20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                  <div>
                    <h3 className="text-white font-semibold">{dispatch.author}</h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <MapPinIcon className="w-3 h-3" />
                      <span>{dispatch.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {dispatch.preview}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4 text-slate-400">
                    <span>{dispatch.timestamp}</span>
                    {dispatch.hasVideo && <FilmIcon className="w-4 h-4" />}
                    <div className="flex items-center space-x-1">
                      <MicrophoneIcon className="w-3 h-3" />
                      <span>{dispatch.audioLength}</span>
                    </div>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                    <span className="font-mono">LISTEN</span>
                    <PlayIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};



// PUBLISHED INTELLIGENCE SECTION
const PublishedIntelligence = ({ articles, loading }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="text-emerald-400 font-mono text-sm">Loading Intelligence...</div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      ref={ref}
      className="py-24 bg-gradient-to-b from-slate-900 to-slate-950"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl font-serif text-white mb-4">Published Intelligence</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Verified environmental intelligence reports from our global correspondent network
          </p>
          <div className="mt-6">
            <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-mono">
              {articles.length} APPROVED REPORTS
            </span>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {articles.slice(0, 6).map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="bg-slate-800/60 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700/50 hover:border-emerald-400/50 transition-all duration-300 group"
            >
              {/* Article Image */}
              {article.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`http://localhost:8080${article.imageUrl}`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-mono">
                      VERIFIED
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">
                    {article.categories?.[0]?.name || 'Environmental Report'}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-slate-400 mb-4 leading-relaxed text-sm">
                  {article.summary || article.content.substring(0, 150) + '...'}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    By {article.author}
                  </div>
                  <a 
                    href={`/articles/${article.id}`}
                    className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors font-medium"
                  >
                    Read Report →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Contributor Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-lg p-8 border border-emerald-400/30 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Join the Intelligence Network</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Contribute to global environmental intelligence. Submit verified field reports, research findings, 
            and investigative journalism to our editorial review board.
          </p>
          <a 
            href="/submit-article"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <span>Submit Intelligence Report</span>
            <ArrowRightIcon className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

// EDITORIAL FOOTER
const EditorialFooter = () => (
  <footer className="py-16 bg-black">
    <div className="max-w-7xl mx-auto px-8 text-center">
      <div className="text-emerald-400 font-mono text-sm mb-4">
        CLIMATE INTELLIGENCE NETWORK
      </div>
      <p className="text-slate-600 text-sm">
        © 2024 Climate Intelligence Hub. Environmental Intelligence for Global Leaders.
      </p>
    </div>
  </footer>
);

export default ClimateIntelligenceHub; 