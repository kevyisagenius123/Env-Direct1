import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, ArrowRightIcon, MapPinIcon, ChevronDownIcon,
  DocumentTextIcon, ClockIcon, EyeIcon, MicrophoneIcon,
  SignalIcon as SatelliteIcon, FilmIcon, GlobeAltIcon,
  UserGroupIcon, BeakerIcon, ShieldCheckIcon,
  CommandLineIcon, RadioIcon, CameraIcon,
  CloudIcon, FireIcon, BoltIcon,
  ChartBarIcon, AcademicCapIcon, CogIcon
} from '@heroicons/react/24/outline';

// Import completed features
import {
  VisualTimeline,
  FeatureStoryDeck,
  AuthorSpotlight,
  InteractiveMap,
  MultimediaEmbed,
  AIIntelligenceDigest
} from '../components/magazine/CompletedFeatures';

const PlanetaryIntelligenceSystem = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Cinematic scroll transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  
  // State management for planetary intelligence
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeMission, setActiveMission] = useState(0);
  const [intelligenceMode, setIntelligenceMode] = useState('global');
  const [contributorNetworkActive, setContributorNetworkActive] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real articles data
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/articles');
        if (response.ok) {
          const data = await response.json();
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

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Planetary Intelligence Hub */}
      <div className="relative min-h-screen">
        <h1 className="text-6xl font-bold text-center pt-32">
          Planetary Intelligence System
        </h1>
        <p className="text-xl text-center mt-8 max-w-4xl mx-auto px-8">
          Global environmental command center with autonomous AI monitoring and real-time intelligence.
        </p>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8">
          {articles.slice(0, 3).map((article, index) => (
            <motion.div
              key={article.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
              <p className="text-slate-300 text-sm mb-4">
                {article.content?.substring(0, 120)}...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 text-sm">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs">
                  {article.category?.name || 'Environmental'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Intelligence Features */}
        <div className="mt-32 max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Advanced Intelligence Features
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* AI Intelligence Digest */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <BeakerIcon className="w-8 h-8 mr-3 text-cyan-400" />
                AI Intelligence Digest
              </h3>
              <AIIntelligenceDigest articles={articles} />
            </div>

            {/* Visual Timeline */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <ClockIcon className="w-8 h-8 mr-3 text-purple-400" />
                Environmental Timeline
              </h3>
              <VisualTimeline articles={articles} />
            </div>

            {/* Interactive Map */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <GlobeAltIcon className="w-8 h-8 mr-3 text-green-400" />
                Global Operations Map
              </h3>
              <InteractiveMap articles={articles} />
            </div>

            {/* Author Spotlight */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <UserGroupIcon className="w-8 h-8 mr-3 text-amber-400" />
                Intelligence Network
              </h3>
              <AuthorSpotlight articles={articles} />
            </div>
          </div>

          {/* Feature Story Deck */}
          <div className="mt-24">
            <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center">
              <DocumentTextIcon className="w-8 h-8 mr-3 text-indigo-400" />
              Mission Intelligence Stories
            </h3>
            <FeatureStoryDeck articles={articles} />
          </div>

          {/* Multimedia Center */}
          <div className="mt-24">
            <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center">
              <FilmIcon className="w-8 h-8 mr-3 text-red-400" />
              Intelligence Media Center
            </h3>
            <MultimediaEmbed />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 border-t border-slate-700 pt-16 pb-8">
          <div className="max-w-4xl mx-auto text-center px-8">
            <h3 className="text-2xl font-semibold mb-4">
              Earth's Cognitive Center for Environmental Awareness
            </h3>
            <p className="text-slate-300 mb-8">
              Leveraging autonomous AI and real-time intelligence to monitor, analyze, and predict 
              environmental changes across our planet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm">
                Autonomous Intelligence
              </span>
              <span className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm">
                Real-time Monitoring
              </span>
              <span className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm">
                Predictive Analytics
              </span>
              <span className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm">
                Global Operations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetaryIntelligenceSystem; 