import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import '../components/magazine/Magazine.css';
import { 
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowRightIcon,
  UserGroupIcon,
  ClockIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  CameraIcon,
  MicrophoneIcon,
  BookOpenIcon,
  GlobeAltIcon,
  SparklesIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  FilmIcon,
  CommandLineIcon,
  WifiIcon,
  SignalIcon as SatelliteIcon,
  ClockIcon as LiveIcon,
  EyeIcon,
  BeakerIcon,
  CloudIcon,
  FireIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  RadioIcon
} from '@heroicons/react/24/outline';

// Import enhanced magazine components
import AIDigest from '../components/magazine/AIDigest';
import FilterToolbar from '../components/magazine/FilterToolbar';
import ArticleGrid from '../components/magazine/ArticleGrid';
import StoryMap from '../components/magazine/StoryMap';
import ReferenceFooter from '../components/magazine/ReferenceFooter';

// Import all completed features
import {
  VisualTimeline as CompletedVisualTimeline,
  FeatureStoryDeck as CompletedFeatureStoryDeck,
  AuthorSpotlight as CompletedAuthorSpotlight,
  InteractiveMap as CompletedInteractiveMap,
  MultimediaEmbed as CompletedMultimediaEmbed,
  AIIntelligenceDigest
} from '../components/magazine/CompletedFeatures';

// Import services - now use real API instead of mock
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const GreenAtlasMagazinePage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Cinematic scroll transforms
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  
  // State management for real-time intelligence
  const [currentTime, setCurrentTime] = useState(new Date());
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeDispatch, setActiveDispatch] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Real articles state
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [error, setError] = useState(null);
  
  const [liveMetrics, setLiveMetrics] = useState({
    globalTemp: '+1.23°C',
    coralCoverage: '-18.2%',
    activeReporters: 47,
    storiesInProgress: 23,
    readersEngaged: '2.3M',
    lastUpdate: 'Live'
  });

  // Luxury Editorial Stories
  const [editorialStories] = useState([
    {
      id: 1,
      category: 'FEATURE STORY',
      type: 'luxury',
      title: 'The Coral Requiem',
      subtitle: 'A journey through the world\'s dying reefs reveals both devastation and unexpected hope',
      location: 'Dominica Marine Reserve',
      author: 'Dr. Elena Vasquez',
      authorRole: 'Marine Biologist & Contributing Editor',
      publishDate: 'December 2024',
      lastUpdate: 'New Issue',
      readTime: '18 min read',
      excerpt: 'In the crystalline waters off Dominica, marine biologist Dr. Elena Vasquez documents the final symphony of coral ecosystems—a haunting beauty that speaks to both loss and resilience.',
      mediaType: 'Photography & Field Recording',
      status: 'CURRENT ISSUE',
      backgroundVideo: '/videos/coral-beauty.mp4',
      backgroundImage: '/img/editorial/coral-hero.jpg'
    },
    {
      id: 2,
      category: 'INVESTIGATION',
      type: 'luxury',
      title: 'The Amazon\'s Digital Guardians',
      subtitle: 'How indigenous communities are using AI to protect ancestral lands',
      location: 'Brazilian Amazon',
      author: 'Carlos Mendoza',
      authorRole: 'Environmental Technology Correspondent',
      publishDate: 'November 2024',
      lastUpdate: 'Featured',
      readTime: '12 min read',
      excerpt: 'Deep in the Brazilian rainforest, Kayapo elders collaborate with MIT researchers to create an early warning system that blends ancient wisdom with cutting-edge technology.',
      mediaType: 'Documentary Photography',
      status: 'EDITOR\'S CHOICE',
      backgroundVideo: '/videos/amazon-tech.mp4',
      backgroundImage: '/img/editorial/amazon-hero.jpg'
    }
  ]);

  // Live Dispatch Feed
  const [fieldDispatches] = useState([
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
      urgency: 'breaking',
      coordinates: '15.3092°N, 61.3794°W'
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
      urgency: 'critical',
      coordinates: '72.5796°N, 38.4592°W'
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
      urgency: 'intelligence',
      coordinates: '3.4653°S, 62.2159°W'
    }
  ]);

  // Editorial Team
  const [editorialTeam] = useState([
              {
                name: 'Dr. Elena Vasquez',
                role: 'Marine Biologist & Contributing Editor',
      title: 'Ocean Science Editor',
      location: 'Dominica Marine Research Station',
      status: 'Contributing Editor',
      articles: 47,
      expertise: 'Coral Ecosystems, Marine Conservation',
      education: 'PhD Marine Biology, Stanford',
      bio: 'Elena has spent over a decade documenting coral reef systems across the Caribbean and Pacific.',
      tier: 'Editor',
      recentWork: 'The Coral Requiem',
                avatar: '/img/editorial/elena-vasquez.jpg'
              },
              {
      name: 'Carlos Mendoza',
      role: 'Environmental Technology Correspondent',
      title: 'Innovation & Policy Editor',
      location: 'Brazilian Amazon Research Station',
      status: 'Contributing Writer',
      articles: 34,
      expertise: 'Indigenous Technology, Forest Conservation',
      education: 'MS Environmental Science, MIT',
      bio: 'Carlos specializes in documenting how indigenous communities integrate technology with traditional ecological knowledge.',
      tier: 'Contributor',
      recentWork: 'The Amazon\'s Digital Guardians',
      avatar: '/img/editorial/carlos-mendoza.jpg'
    },
    {
      name: 'Dr. Marina Chen',
      role: 'Editor-in-Chief',
      title: 'Editorial Director',
      location: 'Green Atlas Headquarters, Barbados',
      status: 'Editorial Leadership',
      articles: 156,
      expertise: 'Environmental Journalism, Editorial Strategy',
      education: 'PhD Environmental Communications, Columbia',
      bio: 'Marina leads Green Atlas with a vision of environmental journalism that bridges science, policy, and human stories.',
      tier: 'Editor-in-Chief',
      recentWork: 'Editorial Vision Statement',
      avatar: '/img/editorial/marina-chen.jpg'
    }
  ]);

  // Mission Statement & Editor's Letter
  const editorMessage = {
    title: "Planetary Intelligence Briefing",
    author: "Dr. Elena Vasquez, Editor-in-Chief",
    classification: "PUBLIC INTELLIGENCE",
    date: "November 15, 2024",
    content: `This quarter's intelligence synthesis reveals accelerating ecosystem transitions across all monitored regions. Our field teams have documented unprecedented changes in coral reef systems, arctic ice dynamics, and rainforest carbon cycling.

What you are reading is not journalism—it is environmental forensics. Each investigation represents months of field work, AI-assisted pattern recognition, and collaboration with global research networks.

The data is clear: Earth's climate system is entering a phase of rapid reorganization. Our mission is to document this transformation with scientific precision and narrative clarity, providing world leaders with the intelligence needed for informed decision-making.

Every story in this edition has been verified through multiple sources, cross-referenced with satellite data, and peer-reviewed by our editorial intelligence board.`,
    signature: "Dr. Elena Vasquez",
    confidenceLevel: "HIGH",
    sources: 23,
    verificationMethod: "Multi-source Cross-reference + AI Validation"
  };

  // Fetch real articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        
        // Fetch articles
        const articlesResponse = await fetch(`${API_URL}/api/articles?size=10&sort=createdAt,desc`);
        if (!articlesResponse.ok) {
          throw new Error('Failed to fetch articles');
        }
        const articlesData = await articlesResponse.json();
        setArticles(articlesData.content || []);
        
        // Set featured article as the first one
        if (articlesData.content && articlesData.content.length > 0) {
          setFeaturedArticle(articlesData.content[0]);
        }
        
        // Fetch categories
        const categoriesResponse = await fetch(`${API_URL}/api/categories`);
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData || []);
        }
        
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setLiveMetrics(prev => ({
        ...prev,
        globalTemp: `+${(1.23 + Math.random() * 0.1 - 0.05).toFixed(2)}°C`,
        coralCoverage: `-${(18.2 + Math.random() * 0.5 - 0.25).toFixed(1)}%`,
        readersEngaged: `${(2.3 + Math.random() * 0.3 - 0.15).toFixed(1)}M`
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

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

  // Dispatch carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDispatch(prev => (prev + 1) % fieldDispatches.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [fieldDispatches.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-lg"
        >
          <motion.div
            className="w-24 h-24 border-4 border-emerald-400 border-t-transparent rounded-full mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="font-serif text-4xl font-bold text-white mb-4">Green Atlas</h2>
          <p className="text-emerald-300 text-lg font-light">Environmental Intelligence Magazine</p>
          <div className="mt-8 text-slate-400 text-sm">
            Loading real articles from the backend...
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-lg"
        >
          <ExclamationTriangleIcon className="h-24 w-24 text-red-500 mx-auto mb-8" />
          <h2 className="font-serif text-4xl font-bold text-white mb-4">Connection Failed</h2>
          <p className="text-red-300 text-lg font-light mb-4">Unable to connect to backend server</p>
          <p className="text-slate-400 text-sm mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg transition-colors text-white font-medium"
          >
            Retry Connection
          </button>
          <p className="text-slate-500 text-xs mt-4">
            Make sure the backend server is running on {API_URL}
          </p>
        </motion.div>
      </div>
    );
  }

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

      {/* HERO FEATURE - Cinematic Intelligence Briefing */}
      <HeroFeature 
        story={featuredArticle || editorialStories[0]}
        scrollProgress={heroOpacity}
        parallaxY={parallaxY}
        textY={textY}
      />

      {/* SCROLL PREAMBLE */}
      <ScrollPreamble />

      {/* EDITOR'S LETTER - Presidential Briefing Style */}
      <EditorsLetter message={editorMessage} />

      {/* DISPATCH CAROUSEL - Live Field Intelligence */}
      <DispatchCarousel 
        dispatches={fieldDispatches}
        activeDispatch={activeDispatch}
        setActiveDispatch={setActiveDispatch}
      />

      {/* REAL ARTICLES SECTION */}
      <RealArticlesSection articles={articles} categories={categories} />

      {/* ADVANCED AI INTELLIGENCE DIGEST */}
      <AIIntelligenceDigest articles={articles} />

      {/* VISUAL TIMELINE */}
      <CompletedVisualTimeline articles={articles} />

      {/* FEATURE STORY DECK */}
      <CompletedFeatureStoryDeck stories={editorialStories} articles={articles} />

      {/* AUTHOR SPOTLIGHT */}
      <CompletedAuthorSpotlight team={editorialTeam} articles={articles} />

      {/* INTERACTIVE MAP */}
      <CompletedInteractiveMap dispatches={fieldDispatches} />

      {/* MULTIMEDIA EMBED LAYER */}
      <CompletedMultimediaEmbed />

      {/* EDITORIAL FOOTER */}
      <EditorialFooter />
    </div>
  );
};

// HERO FEATURE COMPONENT
const HeroFeature = ({ story, scrollProgress, parallaxY, textY }) => {
  const ref = useRef(null);

  return (
    <motion.section 
      ref={ref}
      className="relative h-screen overflow-hidden"
      style={{ opacity: scrollProgress }}
    >
      {/* Cinematic Background */}
        <motion.div 
          className="absolute inset-0"
        style={{ y: parallaxY }}
      >
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-900/30 to-cyan-900/30">
          {story?.imageUrl ? (
            <div className={`absolute inset-0 bg-cover bg-center opacity-40`} style={{ backgroundImage: `url(${story.imageUrl})` }} />
          ) : (
            <div className="absolute inset-0 bg-[url('/img/satellite-earth.jpg')] bg-cover bg-center opacity-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>
        </motion.div>

      {/* Elegant Masthead */}
        <motion.div
        className="absolute top-8 left-8 z-20"
        style={{ y: textY }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
            >
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide">
                  Green Atlas
                </h1>
        <div className="text-emerald-300 text-lg mt-2 font-light tracking-wider">
          Environmental Magazine
                </div>
        <div className="text-stone-300 text-sm mt-1">
          Est. 2012 • Current Issue: December 2024
                </div>
      </motion.div>

      {/* Editorial Info */}
      <motion.div 
        className="absolute top-8 right-8 z-20 space-y-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <div className="bg-emerald-600 text-white px-4 py-2 rounded-sm text-sm font-medium flex items-center space-x-2">
          <span>{story?.category || (story?.categories && story?.categories[0]?.name) || 'FEATURE STORY'}</span>
                </div>
        <div className="bg-black/60 backdrop-blur-xl text-white px-4 py-2 rounded-sm text-sm border border-stone-400/30">
          <div className="flex items-center space-x-3">
            <UserGroupIcon className="w-4 h-4 text-emerald-300" />
            <span>{story?.author || 'Environmental Team'} • {story?.location || 'Global Reporting'}</span>
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
            className="text-emerald-300 uppercase tracking-[0.3em] font-mono font-medium mb-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {story?.publishDate || (story?.createdAt ? new Date(story.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Current Issue')} • {story?.readTime || 'Feature Article'}
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
            {story?.subtitle || story?.summary || 'Environmental intelligence and field research from our global correspondent network'}
          </motion.h3>

          <motion.div 
            className="flex items-center justify-center space-x-8 mb-8 text-sm text-stone-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.9 }}
          >
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4" />
              <span>{story?.location || 'Global'}</span>
                      </div>
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="w-4 h-4" />
              <span>{story?.authorRole || story?.author || 'Environmental Correspondent'}</span>
                    </div>
            <div className="flex items-center space-x-2">
              <CameraIcon className="w-4 h-4" />
              <span>{story?.mediaType || 'Environmental Journalism'}</span>
                  </div>
                </motion.div>

          {/* Mission Brief CTA */}
                <motion.div
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            <a 
              href={story?.id ? `/articles/${story.id}` : '#'} 
              className="bg-white text-stone-900 px-8 py-4 rounded-sm font-semibold text-lg hover:bg-stone-100 transition-all duration-300 flex items-center space-x-3 group"
            >
              <BookOpenIcon className="w-5 h-5 group-hover:rotate-3 transition-transform" />
              <span>Read Feature</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button className="border border-stone-400/50 text-stone-300 px-6 py-4 rounded-sm font-medium hover:bg-stone-400/10 transition-all duration-300 flex items-center space-x-3">
              <PlayIcon className="w-5 h-5" />
              <span>Listen</span>
              <span className="text-sm text-stone-400">{story?.readTime}</span>
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
          <span className="text-sm font-light tracking-wide">Scroll to explore</span>
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
          — Mission Statement, Green Atlas Planetary Intelligence Network
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
                    <div>Verification: {message.verificationMethod}</div>
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
              <span className="text-white text-sm font-mono">LIVE FEED</span>
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



// VISUAL TIMELINE - Complete Implementation




const EditorialFooter = () => (
  <footer className="py-16 bg-black">
    <div className="max-w-7xl mx-auto px-8 text-center">
      <div className="text-emerald-400 font-mono text-sm mb-4">
        PLANETARY INTELLIGENCE NETWORK
      </div>
      <p className="text-slate-600 text-sm">
            © 2024 Green Atlas Magazine. Environmental Intelligence for Global Leaders.
      </p>
      </div>
    </footer>
  );

// REAL ARTICLES SECTION COMPONENT
const RealArticlesSection = ({ articles, categories }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return 'Recent';
    }
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Climate Change': 'text-red-400 bg-red-400/10',
      'Conservation': 'text-emerald-400 bg-emerald-400/10',
      'Renewable Energy': 'text-yellow-400 bg-yellow-400/10',
      'Biodiversity': 'text-green-400 bg-green-400/10',
      'Sustainable Living': 'text-blue-400 bg-blue-400/10'
    };
    return colors[categoryName] || 'text-slate-400 bg-slate-400/10';
  };

  if (!articles || articles.length === 0) {
  return (
      <section className="py-24 px-8 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-emerald-300 mb-8">Published Articles</h2>
          <div className="bg-slate-800/50 rounded-lg p-12">
            <BookOpenIcon className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl text-slate-400 mb-4">No Articles Published Yet</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Be the first to contribute to our environmental intelligence platform. 
              Submit your research and field reports through our contributor portal.
            </p>
            </div>
      </div>
    </section>
  );
  }

  return (
    <section className="py-24 px-8 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-serif text-emerald-300 mb-4">
            Published Intelligence
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Verified environmental journalism from our global network of contributors and research partners.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-2">
            <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">
              {articles.length} APPROVED ARTICLES
            </span>
              </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700/50 hover:border-emerald-400/50 transition-all duration-300 group"
            >
              {/* Article Image */}
              <div className="relative overflow-hidden h-48 bg-slate-700">
                {article.imageUrl ? (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-cyan-600 flex items-center justify-center">
                    <BookOpenIcon className="h-12 w-12 text-white opacity-50" />
                  </div>
                )}
                
                {/* Category Badge */}
                {article.categories && article.categories.length > 0 && (
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.categories[0].name)}`}>
                      {article.categories[0].name}
                    </span>
                </div>
                )}
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Metadata */}
                <div className="flex items-center space-x-4 text-xs text-slate-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{formatDate(article.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <UserIcon className="h-3 w-3" />
                    <span>{article.author || 'Environmental Team'}</span>
            </div>
          </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-slate-400 text-sm line-clamp-3 mb-4">
                  {article.summary || article.content?.substring(0, 150) + '...' || 'Environmental intelligence report with detailed analysis and field observations.'}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag.id} 
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                      >
                        <TagIcon className="h-3 w-3" />
                        <span>{tag.name}</span>
                      </span>
              ))}
            </div>
                )}

                {/* Read More Button */}
                <a 
                  href={`/articles/${article.id}`}
                  className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors"
                >
                  <span>Read Full Report</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </a>
          </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action for Contributors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-lg p-8 border border-emerald-400/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Contribute to Environmental Intelligence
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join our global network of environmental journalists, researchers, and field reporters. 
              Share your investigations and help build the world's most comprehensive climate intelligence database.
            </p>
            <a 
              href="/submit-article"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <span>Submit Article</span>
              <ChevronRightIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
        </div>
    </section>
  );
};

export default GreenAtlasMagazinePage; 
