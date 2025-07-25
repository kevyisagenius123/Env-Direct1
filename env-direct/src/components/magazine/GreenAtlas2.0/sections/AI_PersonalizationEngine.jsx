// 🤖 AI PERSONALIZATION ENGINE - Netflix-Level Content Curation
// Machine learning-powered article recommendations and reading experience

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage, useUserPreferences } from '../../../../hooks/personalization';
import { Brain, Target, TrendingUp, Zap, Eye, BookOpen } from 'lucide-react';

// 🧠 AI RECOMMENDATION ALGORITHM
const useAIRecommendations = (userProfile, readingHistory) => {
  return useMemo(() => {
    // Simulate ML-based content scoring
    const interests = userProfile.interests || [];
    const readingTime = userProfile.avgReadingTime || 5;
    const engagementLevel = userProfile.engagementScore || 0.5;
    
    // Content preference algorithm
    const scoreContent = (article) => {
      let score = 0;
      
      // Interest matching (40% weight)
      const interestMatch = interests.filter(interest => 
        article.tags?.includes(interest) || 
        article.category?.toLowerCase().includes(interest.toLowerCase())
      ).length;
      score += (interestMatch / Math.max(interests.length, 1)) * 40;
      
      // Reading time preference (25% weight)
      const timeScore = Math.max(0, 1 - Math.abs(article.readingTime - readingTime) / 10) * 25;
      score += timeScore;
      
      // Trending factor (20% weight)
      score += (article.views || 0) * 0.0001 * 20;
      
      // Freshness (15% weight)
      const daysOld = (Date.now() - new Date(article.createdAt)) / (1000 * 60 * 60 * 24);
      score += Math.max(0, (7 - daysOld) / 7) * 15;
      
      return Math.min(100, score);
    };
    
    return { scoreContent };
  }, [userProfile, readingHistory]);
};

// 📊 PERSONALIZATION DASHBOARD
const PersonalizationMetrics = ({ userProfile, recommendations }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30"
  >
    <div className="flex items-center gap-3 mb-6">
      <Brain className="w-6 h-6 text-purple-400" />
      <h3 className="text-xl font-bold text-white">AI Personalization Engine</h3>
    </div>
    
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="text-center">
        <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
        <div className="text-2xl font-mono text-white">{(userProfile.accuracy * 100).toFixed(0)}%</div>
        <div className="text-sm text-purple-300">Accuracy</div>
      </div>
      
      <div className="text-center">
        <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
        <div className="text-2xl font-mono text-white">{userProfile.engagementScore.toFixed(2)}</div>
        <div className="text-sm text-blue-300">Engagement</div>
      </div>
      
      <div className="text-center">
        <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
        <div className="text-2xl font-mono text-white">{recommendations.length}</div>
        <div className="text-sm text-yellow-300">Curated</div>
      </div>
      
      <div className="text-center">
        <Eye className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <div className="text-2xl font-mono text-white">{userProfile.articlesRead || 0}</div>
        <div className="text-sm text-green-300">Articles Read</div>
      </div>
    </div>
  </motion.div>
);

// 🎯 SMART CONTENT CARDS
const SmartContentCard = ({ article, score, onInteraction }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const confidenceColor = useMemo(() => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  }, [score]);
  
  return (
    <motion.article
      layout
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onInteraction('click', article)}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 cursor-pointer transition-all duration-300"
    >
      {/* AI Confidence Score */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${confidenceColor.replace('text-', 'bg-')} animate-pulse`} />
          <span className={`text-xs font-mono ${confidenceColor}`}>
            {score.toFixed(0)}% MATCH
          </span>
        </div>
        
        <motion.div
          animate={{ rotate: isHovered ? 90 : 0 }}
          className="text-slate-400"
        >
          <BookOpen className="w-4 h-4" />
        </motion.div>
      </div>
      
      {/* Article Content */}
      <h3 className="text-white font-semibold mb-2 line-clamp-2">
        {article.title}
      </h3>
      
      <p className="text-slate-300 text-sm mb-4 line-clamp-3">
        {article.summary || article.content?.substring(0, 120) + '...'}
      </p>
      
      {/* Metadata */}
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>{article.readingTime || 5} min read</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
      
      {/* Interest Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {article.tags?.slice(0, 3).map(tag => (
          <span 
            key={tag}
            className="px-2 py-1 bg-envGreen-500/20 text-envGreen-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
};

// 🎨 READING MODE CUSTOMIZER
const ReadingModeCustomizer = ({ preferences, onPreferenceChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      layout
      className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-white hover:text-envGreen-400 transition-colors"
      >
        <span className="font-medium">Customize Reading Experience</span>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
          ⌄
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 space-y-4"
          >
            {/* Font Size */}
            <div>
              <label className="text-sm text-slate-300 block mb-2">Font Size</label>
              <input
                type="range"
                min={12}
                max={24}
                value={preferences.fontSize || 16}
                onChange={(e) => onPreferenceChange('fontSize', e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Reading Speed */}
            <div>
              <label className="text-sm text-slate-300 block mb-2">Reading Speed</label>
              <select
                value={preferences.readingSpeed || 'normal'}
                onChange={(e) => onPreferenceChange('readingSpeed', e.target.value)}
                className="w-full bg-slate-800 text-white rounded px-3 py-2"
              >
                <option value="slow">Slow & Detailed</option>
                <option value="normal">Normal</option>
                <option value="fast">Quick Scan</option>
              </select>
            </div>
            
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Dark Mode</span>
              <button
                onClick={() => onPreferenceChange('darkMode', !preferences.darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.darkMode ? 'bg-envGreen-600' : 'bg-slate-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 🚀 MAIN AI PERSONALIZATION ENGINE
const AI_PersonalizationEngine = () => {
  const [userProfile, setUserProfile] = useLocalStorage('greenAtlasProfile', {
    interests: ['climate-change', 'biodiversity', 'renewable-energy'],
    avgReadingTime: 7,
    engagementScore: 0.75,
    accuracy: 0.87,
    articlesRead: 42,
    darkMode: true,
    fontSize: 16,
    readingSpeed: 'normal'
  });
  
  const [articles] = useState([
    {
      id: 1,
      title: "Antarctic Ice Sheet Collapse Accelerates Beyond Predictions",
      summary: "New satellite data reveals unprecedented ice loss rates...",
      tags: ['climate-change', 'antarctica', 'sea-level'],
      readingTime: 8,
      views: 15420,
      createdAt: '2024-01-15',
      category: 'Climate Science'
    },
    {
      id: 2,
      title: "Revolutionary Solar Panel Technology Achieves 47% Efficiency",
      summary: "Breakthrough perovskite-silicon tandem cells...",
      tags: ['renewable-energy', 'solar', 'technology'],
      readingTime: 6,
      views: 8930,
      createdAt: '2024-01-14',
      category: 'Technology'
    },
    {
      id: 3,
      title: "Amazon Rainforest Reaches Critical Tipping Point",
      summary: "Scientists warn of irreversible ecosystem collapse...",
      tags: ['biodiversity', 'amazon', 'deforestation'],
      readingTime: 10,
      views: 23180,
      createdAt: '2024-01-13',
      category: 'Ecosystem'
    }
  ]);
  
  const { scoreContent } = useAIRecommendations(userProfile, []);
  
  const recommendations = useMemo(() => {
    return articles
      .map(article => ({
        ...article,
        score: scoreContent(article)
      }))
      .sort((a, b) => b.score - a.score);
  }, [articles, scoreContent]);
  
  const handleInteraction = useCallback((type, article) => {
    console.log(`AI Tracking: ${type} on article ${article.id}`);
    
    // Update engagement metrics
    setUserProfile(prev => ({
      ...prev,
      articlesRead: type === 'click' ? prev.articlesRead + 1 : prev.articlesRead,
      engagementScore: Math.min(1, prev.engagementScore + 0.01)
    }));
  }, [setUserProfile]);
  
  const handlePreferenceChange = useCallback((key, value) => {
    setUserProfile(prev => ({
      ...prev,
      [key]: value
    }));
  }, [setUserProfile]);
  
  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-6">
        
        {/* AI Engine Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            AI-Powered Content Discovery
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our neural network analyzes your reading patterns, interests, and engagement 
            to curate the most relevant environmental stories for you.
          </p>
        </motion.div>
        
        {/* Personalization Metrics */}
        <PersonalizationMetrics 
          userProfile={userProfile} 
          recommendations={recommendations} 
        />
        
        {/* Reading Preferences */}
        <div className="mt-8 mb-12">
          <ReadingModeCustomizer
            preferences={userProfile}
            onPreferenceChange={handlePreferenceChange}
          />
        </div>
        
        {/* AI-Curated Articles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {recommendations.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SmartContentCard
                article={article}
                score={article.score}
                onInteraction={handleInteraction}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AI_PersonalizationEngine;
