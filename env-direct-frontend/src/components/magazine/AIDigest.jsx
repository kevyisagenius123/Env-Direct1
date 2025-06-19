import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SparklesIcon, 
  CpuChipIcon, 
  ClockIcon, 
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  BoltIcon,
  GlobeAltIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const AIDigest = ({ digest, isLoading }) => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [aiPersona, setAiPersona] = useState('analyzing');

  const defaultDigest = {
    weeklyInsights: [
      {
        id: 1,
        category: 'Climate Prediction',
        title: 'Caribbean Hurricane Season Intensification Detected',
        content: 'Advanced modeling indicates 23% higher intensity for upcoming hurricane season. Dominica should prioritize early warning systems and coastal infrastructure.',
        confidence: 94,
        impact: 'high',
        sources: ['NOAA', 'Caribbean Met Office', 'Climate Analytics'],
        timestamp: '2 hours ago',
        aiAnalysis: 'Pattern recognition across 15 climate models shows unprecedented convergence on intensification signals.'
      },
      {
        id: 2,
        category: 'Biodiversity Alert',
        title: 'Coral Restoration Success Rate Exceeds Projections',
        content: 'Machine learning analysis of coral growth patterns shows 156% success rate improvement in Dominica\'s restoration sites.',
        confidence: 87,
        impact: 'medium',
        sources: ['Marine Biology Institute', 'Reef Recovery Foundation'],
        timestamp: '6 hours ago',
        aiAnalysis: 'AI-detected coral health indicators suggest sustainable recovery pathway confirmed.'
      },
      {
        id: 3,
        category: 'Policy Intelligence',
        title: 'Carbon Market Opportunities Identified',
        content: 'Natural language processing of global carbon markets reveals $2.3M opportunity window for Dominica\'s mangrove carbon credits.',
        confidence: 91,
        impact: 'high',
        sources: ['Carbon Market Watch', 'World Bank', 'Blue Carbon Initiative'],
        timestamp: '12 hours ago',
        aiAnalysis: 'Cross-referenced policy documents show optimal timing for carbon credit certification.'
      }
    ],
    ...digest
  };

  // Auto-rotate insights
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % defaultDigest.weeklyInsights.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [defaultDigest.weeklyInsights.length]);

  // Simulate AI streaming effect
  useEffect(() => {
    const currentContent = defaultDigest.weeklyInsights[currentInsight]?.content || '';
    setIsStreaming(true);
    setStreamingText('');
    
    let i = 0;
    const streamTimer = setInterval(() => {
      if (i < currentContent.length) {
        setStreamingText(currentContent.slice(0, i + 1));
        i++;
      } else {
        setIsStreaming(false);
        clearInterval(streamTimer);
      }
    }, 30);

    return () => clearInterval(streamTimer);
  }, [currentInsight, defaultDigest.weeklyInsights]);

  // AI persona states
  useEffect(() => {
    const personas = ['analyzing', 'processing', 'synthesizing', 'predicting'];
    const personaTimer = setInterval(() => {
      setAiPersona(personas[Math.floor(Math.random() * personas.length)]);
    }, 4000);
    return () => clearInterval(personaTimer);
  }, []);

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-skyAsh-700 rounded-lg w-80 mb-12"></div>
            <div className="h-96 bg-skyAsh-700 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const currentData = defaultDigest.weeklyInsights[currentInsight];
  
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'coralRed';
      case 'medium': return 'sandGold';
      case 'low': return 'envGreen';
      default: return 'skyAsh';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'high': return ExclamationTriangleIcon;
      case 'medium': return InformationCircleIcon;
      case 'low': return CheckCircleIcon;
      default: return InformationCircleIcon;
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-lavaGrey-950 via-envGreen-950/20 to-lavaGrey-950">
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-net" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-envGreen-400">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="80" cy="60" r="1.5" fill="currentColor" className="text-seaBlue-400">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
              </circle>
              <line x1="20" y1="20" x2="80" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-skyAsh-600" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-net)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <CpuChipIcon className="w-8 h-8 text-sandGold-400" />
                </motion.div>
                <span className="text-sandGold-400 font-mono text-sm uppercase tracking-widest">Cognitive Intelligence Engine</span>
              </div>
              <h2 className="font-display text-5xl font-black text-white">
                EnvDirect AI
                <span className="block text-2xl text-envGreen-400 font-light mt-2">
                  Real-time Environmental Intelligence Synthesis
                </span>
              </h2>
            </div>

            {/* AI Status Console */}
            <div className="hidden lg:block">
              <div className="backdrop-blur-xl bg-sandGold-900/20 border border-sandGold-400/30 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <BoltIcon className="w-5 h-5 text-sandGold-400" />
                  </motion.div>
                  <span className="text-sandGold-300 font-mono text-sm uppercase">AI Status</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-skyAsh-400 text-sm">Neural State</span>
                    <span className="text-envGreen-400 font-mono text-sm capitalize">{aiPersona}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-skyAsh-400 text-sm">Data Sources</span>
                    <span className="text-white font-mono text-sm">247 active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-skyAsh-400 text-sm">Confidence</span>
                    <span className="text-sandGold-400 font-mono text-sm">{currentData?.confidence || 94}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main AI Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Primary Insight Display */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentInsight}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: 15 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="backdrop-blur-2xl bg-lavaGrey-900/60 border border-envGreen-400/30 rounded-3xl p-8 shadow-broadcast"
              >
                {/* Insight Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sandGold-400 to-envGreen-400 rounded-xl flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sandGold-400 font-mono text-sm uppercase tracking-wider">
                        {currentData?.category}
                      </div>
                      <div className="text-skyAsh-400 text-sm font-mono">
                        {currentData?.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Impact & Confidence Indicators */}
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl bg-${getImpactColor(currentData?.impact)}-500/20 border border-${getImpactColor(currentData?.impact)}-400/30`}>
                      {React.createElement(getImpactIcon(currentData?.impact), { 
                        className: `w-4 h-4 text-${getImpactColor(currentData?.impact)}-400` 
                      })}
                      <span className={`text-${getImpactColor(currentData?.impact)}-300 text-sm font-semibold capitalize`}>
                        {currentData?.impact} Impact
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-skyAsh-700 rounded-full h-2">
                        <motion.div 
                          className="h-2 bg-gradient-to-r from-envGreen-400 to-sandGold-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${currentData?.confidence || 94}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-white font-mono text-sm">{currentData?.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="mb-8">
                  <h3 className="font-display text-3xl font-bold text-white mb-6 leading-tight">
                    {currentData?.title}
                  </h3>
                  
                  {/* Streaming Text Effect */}
                  <div className="relative">
                    <p className="text-skyAsh-200 text-lg leading-relaxed mb-6">
                      {streamingText}
                      {isStreaming && (
                        <motion.span 
                          className="inline-block w-2 h-6 bg-envGreen-400 ml-1"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </p>
                  </div>

                  {/* AI Analysis */}
                  <div className="bg-envGreen-900/20 border border-envGreen-400/20 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <CpuChipIcon className="w-5 h-5 text-envGreen-400" />
                      <span className="text-envGreen-400 font-mono text-sm uppercase tracking-wider">AI Analysis</span>
                    </div>
                    <p className="text-envGreen-200 italic leading-relaxed">
                      {currentData?.aiAnalysis}
                    </p>
                  </div>
                </div>

                {/* Sources */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-skyAsh-400 text-sm">Sources:</span>
                    <div className="flex items-center space-x-2">
                      {currentData?.sources?.map((source, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-seaBlue-600/60 text-seaBlue-200 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {source}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    className="flex items-center space-x-2 bg-envGreen-600 hover:bg-envGreen-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <EyeIcon className="w-5 h-5" />
                    <span>Deep Analysis</span>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Insights */}
            <div className="backdrop-blur-xl bg-lavaGrey-900/60 border border-skyAsh-600/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <ArrowTrendingUpIcon className="w-6 h-6 text-seaBlue-400" />
                <span className="text-seaBlue-400 font-mono text-sm uppercase tracking-wider">Quick Intelligence</span>
              </div>
              <div className="space-y-4">
                {defaultDigest.weeklyInsights.filter((_, index) => index !== currentInsight).slice(0, 2).map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer p-4 rounded-xl hover:bg-skyAsh-800/30 transition-all duration-300"
                    onClick={() => setCurrentInsight(defaultDigest.weeklyInsights.findIndex(item => item.id === insight.id))}
                  >
                    <h4 className="font-display text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-envGreen-300 transition-colors">
                      {insight.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-skyAsh-400 text-sm">{insight.category}</span>
                      <span className="text-envGreen-400 font-mono text-sm">{insight.confidence}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Performance Metrics */}
            <div className="backdrop-blur-xl bg-sandGold-900/20 border border-sandGold-400/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <BoltIcon className="w-6 h-6 text-sandGold-400" />
                <span className="text-sandGold-400 font-mono text-sm uppercase tracking-wider">AI Performance</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-skyAsh-400 text-sm">Accuracy Rate</span>
                  <span className="text-envGreen-400 font-mono font-semibold">94.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-skyAsh-400 text-sm">Processing Speed</span>
                  <span className="text-sandGold-400 font-mono font-semibold">2.3ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-skyAsh-400 text-sm">Data Points</span>
                  <span className="text-seaBlue-400 font-mono font-semibold">847K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-skyAsh-400 text-sm">Model Version</span>
                  <span className="text-white font-mono font-semibold">EnvDirect v3.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {defaultDigest.weeklyInsights.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentInsight(index)}
                  className={`transition-all duration-300 ${
                    index === currentInsight 
                      ? 'w-8 h-3 bg-envGreen-400 rounded-full' 
                      : 'w-3 h-3 bg-skyAsh-600 rounded-full hover:bg-skyAsh-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            
            <div className="w-px h-8 bg-skyAsh-600"></div>
            
            <div className="flex items-center space-x-2 text-skyAsh-400 text-sm font-mono">
              <GlobeAltIcon className="w-4 h-4" />
              <span>Real-time Global Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDigest; 