import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ClockIcon, EyeIcon, ArrowRightIcon, FireIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const EditorsPickCarousel = ({ editorsPicks, isLoading }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [hoveredStory, setHoveredStory] = useState(null);

  // Auto-rotate featured story
  useEffect(() => {
    if (editorsPicks?.length > 0) {
      const timer = setInterval(() => {
        setFeaturedIndex((prev) => (prev + 1) % editorsPicks.length);
      }, 12000);
      return () => clearInterval(timer);
    }
  }, [editorsPicks]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-skyAsh-700 rounded-lg w-64 mb-8"></div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 h-96 bg-skyAsh-700 rounded-3xl"></div>
            <div className="col-span-4 space-y-6">
              <div className="h-32 bg-skyAsh-700 rounded-2xl"></div>
              <div className="h-32 bg-skyAsh-700 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!editorsPicks?.length) return null;

  const featuredStory = editorsPicks[featuredIndex];
  const sideStories = editorsPicks.filter((_, index) => index !== featuredIndex).slice(0, 4);

  return (
    <section className="relative py-24 bg-gradient-to-br from-lavaGrey-950 via-lavaGrey-900 to-envGreen-950">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <FireIcon className="w-8 h-8 text-sandGold-400 animate-pulse" />
              <span className="text-sandGold-400 font-mono text-sm uppercase tracking-widest">Editorial Command</span>
            </div>
            <h2 className="font-display text-5xl font-black text-white">
              Priority Intelligence
              <span className="block text-2xl text-envGreen-400 font-light mt-2">
                Curated by Earth Advocates
              </span>
            </h2>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-skyAsh-400 text-sm font-mono">Live Editorial Feed</div>
              <div className="text-white font-semibold">{editorsPicks.length} Priority Stories</div>
            </div>
            <div className="w-3 h-3 bg-envGreen-400 rounded-full animate-ping"></div>
          </div>
        </motion.div>
      </div>

      {/* Main Editorial Layout */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Featured Story - Large Hero */}
          <div className="col-span-12 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredIndex}
                initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotateY: 10 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredStory('featured')}
                onMouseLeave={() => setHoveredStory(null)}
              >
                <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden">
                  {/* Background Image */}
                  <img 
                    src={featuredStory.image} 
                    alt={featuredStory.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Dynamic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-lavaGrey-950/95 via-lavaGrey-900/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-envGreen-900/30 to-transparent" />
                  
                  {/* Floating Priority Badge */}
                  <motion.div
                    className="absolute top-6 left-6 backdrop-blur-xl bg-sandGold-500/20 border border-sandGold-400/50 rounded-full px-4 py-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center space-x-2">
                      <StarIcon className="w-4 h-4 text-sandGold-400" />
                      <span className="text-sandGold-300 text-sm font-semibold">Editor's Choice</span>
                    </div>
                  </motion.div>

                  {/* Impact Metrics */}
                  <div className="absolute top-6 right-6 space-y-3">
                    <motion.div
                      className="backdrop-blur-lg bg-lavaGrey-900/70 border border-envGreen-400/30 rounded-xl px-3 py-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center space-x-2">
                        <EyeIcon className="w-4 h-4 text-envGreen-400" />
                        <span className="text-white text-sm font-mono">{featuredStory.readCount || '12.4K'}</span>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="backdrop-blur-lg bg-lavaGrey-900/70 border border-seaBlue-400/30 rounded-xl px-3 py-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-seaBlue-400" />
                        <span className="text-white text-sm font-mono">{featuredStory.readTime || '8 min'}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {/* Category & Live Quote */}
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-envGreen-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                          {featuredStory.category || 'Climate Intelligence'}
                        </span>
                        {hoveredStory === 'featured' && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-sandGold-300 text-sm font-mono italic"
                          >
                            "{featuredStory.quote || 'Essential reading for changemakers'}"
                          </motion.div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 group-hover:text-envGreen-300 transition-colors">
                        {featuredStory.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-skyAsh-200 text-lg leading-relaxed mb-6 line-clamp-2 max-w-3xl">
                        {featuredStory.summary || featuredStory.excerpt}
                      </p>

                      {/* Author & Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-envGreen-400 to-seaBlue-400 rounded-full flex items-center justify-center text-white font-bold">
                            {featuredStory.author?.[0] || 'EA'}
                          </div>
                          <div>
                            <div className="text-white font-semibold">{featuredStory.author || 'Earth Advocate'}</div>
                            <div className="text-skyAsh-400 text-sm">{featuredStory.publishedAt || 'Just now'}</div>
                          </div>
                        </div>
                        
                        <motion.button
                          className="group/btn flex items-center space-x-3 bg-envGreen-600 hover:bg-envGreen-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                          whileHover={{ scale: 1.05, x: 10 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Read Intelligence</span>
                          <ArrowRightIcon className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side Stories - Asymmetrical Stack */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Quick Intelligence Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-2 bg-seaBlue-400 rounded-full animate-ping"></div>
              <span className="text-seaBlue-400 font-mono text-sm uppercase tracking-wider">Quick Intelligence</span>
            </div>

            {sideStories.map((story, index) => (
              <motion.div
                key={story.id || index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredStory(index)}
                onMouseLeave={() => setHoveredStory(null)}
              >
                <div className="relative backdrop-blur-xl bg-lavaGrey-900/60 border border-skyAsh-600/30 rounded-2xl p-6 hover:border-envGreen-400/50 hover:shadow-glow-green transition-all duration-300">
                  
                  {/* Story Image & Content */}
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-20 h-20 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      {/* Category */}
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-seaBlue-600/60 text-seaBlue-200 px-2 py-1 rounded-md text-xs font-medium">
                          {story.category || 'Alert'}
                        </span>
                        {hoveredStory === index && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-2 h-2 bg-sandGold-400 rounded-full"
                          />
                        )}
                      </div>
                      
                      {/* Title */}
                      <h4 className="font-display text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-envGreen-300 transition-colors">
                        {story.title}
                      </h4>
                      
                      {/* Metadata */}
                      <div className="flex items-center space-x-3 text-xs text-skyAsh-400">
                        <span>{story.readTime || '3 min'}</span>
                        <span>•</span>
                        <span>{story.author || 'EA Team'}</span>
                        <span>•</span>
                        <span className="text-envGreen-400">{story.readCount || Math.floor(Math.random() * 10) + 1}K</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Excerpt */}
                  <AnimatePresence>
                    {hoveredStory === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-skyAsh-600/30"
                      >
                        <p className="text-skyAsh-300 text-sm leading-relaxed line-clamp-2">
                          {story.excerpt || story.summary || "Critical environmental intelligence update with immediate implications for policy and action."}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}

            {/* View All Stories */}
            <motion.button
              className="w-full mt-6 backdrop-blur-lg bg-skyAsh-700/20 border border-skyAsh-600/50 text-skyAsh-300 py-4 rounded-xl font-semibold hover:bg-envGreen-600/20 hover:border-envGreen-400/50 hover:text-envGreen-300 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Editorial Priorities →
            </motion.button>
          </div>
        </div>

        {/* Story Navigation */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-3">
            {editorsPicks.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setFeaturedIndex(index)}
                className={`transition-all duration-300 ${
                  index === featuredIndex 
                    ? 'w-8 h-3 bg-envGreen-400 rounded-full' 
                    : 'w-3 h-3 bg-skyAsh-600 rounded-full hover:bg-skyAsh-500'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPickCarousel; 