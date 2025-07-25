// 📖 IMMERSIVE READER EXPERIENCE - Apple News+ Editorial Excellence
// Variable fonts, scroll-triggered animations, magazine-style layouts

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useIntersectionObserver } from '../../../../hooks/performance';
import { BookOpen, Clock, User, Share2, Heart, MessageCircle, Eye } from 'lucide-react';

// 🎨 MAGAZINE SPREAD LAYOUT COMPONENT
const MagazineSpread = ({ article, isActive, onPageTurn }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(article.content.length / 1200); // ~1200 chars per page
  
  const getPageContent = (pageIndex) => {
    const start = pageIndex * 1200;
    const end = start + 1200;
    return article.content.substring(start, end);
  };
  
  return (
    <motion.div
      layout
      className={`magazine-spread ${isActive ? 'active' : ''}`}
      initial={{ rotateY: -15, opacity: 0 }}
      animate={{ 
        rotateY: isActive ? 0 : -15, 
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ perspective: 1000 }}
    >
      <div className="spread-container bg-white rounded-lg shadow-2xl overflow-hidden">
        
        {/* Left Page */}
        <div className="left-page p-8 w-1/2 float-left">
          {currentPage === 0 ? (
            // Feature image and title page
            <>
              <img 
                src={article.featuredImage} 
                alt={article.title}
                className="w-full h-64 object-cover rounded mb-6"
              />
              <h1 className="text-3xl font-serif font-bold mb-4 text-slate-900">
                {article.title}
              </h1>
              <p className="text-xl text-slate-600 mb-6 font-light leading-relaxed">
                {article.subtitle}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min read
                </div>
              </div>
            </>
          ) : (
            // Content pages
            <div className="content-page">
              <div 
                className="text-slate-800 leading-relaxed font-serif text-lg"
                style={{ 
                  fontVariationSettings: '"wght" 400, "opsz" 16',
                  lineHeight: 1.8 
                }}
              >
                {getPageContent(currentPage - 1)}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Page */}
        <div className="right-page p-8 w-1/2 float-right border-l border-slate-200">
          {currentPage === 0 ? (
            // Introduction/summary
            <div className="intro-content">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">
                In This Article
              </h3>
              <div className="space-y-3 text-slate-700">
                {article.keyPoints?.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-envGreen-500 rounded-full mt-2"></div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-envGreen-50 rounded-lg">
                <h4 className="font-semibold text-envGreen-800 mb-2">
                  Key Findings
                </h4>
                <p className="text-envGreen-700 text-sm">
                  {article.summary}
                </p>
              </div>
            </div>
          ) : (
            // Continued content
            <div className="content-page">
              <div 
                className="text-slate-800 leading-relaxed font-serif text-lg"
                style={{ 
                  fontVariationSettings: '"wght" 400, "opsz" 16',
                  lineHeight: 1.8 
                }}
              >
                {getPageContent(currentPage)}
              </div>
            </div>
          )}
        </div>
        
        {/* Page Navigation */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded"
          >
            ←
          </button>
          <span className="text-sm text-slate-600 px-3">
            {currentPage + 1} / {totalPages + 1}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded"
          >
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// 📚 ARTICLE READING PROGRESS
const ReadingProgress = ({ scrollProgress, article }) => {
  const estimatedTimeLeft = useMemo(() => {
    const totalTime = article.readingTime * 60; // Convert to seconds
    const remainingTime = totalTime * (1 - scrollProgress);
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [scrollProgress, article.readingTime]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          
          {/* Progress Bar */}
          <div className="flex-1 mx-4">
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-envGreen-500"
                style={{ width: `${scrollProgress * 100}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Reading Stats */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{estimatedTimeLeft} left</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{Math.round(scrollProgress * 100)}% read</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 🎨 TYPOGRAPHY CUSTOMIZATION PANEL
const TypographyControls = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      layout
      className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3 hover:bg-slate-50 transition-colors border-b border-slate-200"
      >
        <BookOpen className="w-5 h-5 text-slate-600" />
      </button>
      
      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="p-4 w-64"
        >
          <h4 className="font-semibold mb-4 text-slate-900">Reading Preferences</h4>
          
          {/* Font Size */}
          <div className="mb-4">
            <label className="text-sm text-slate-600 mb-2 block">Font Size</label>
            <input
              type="range"
              min={14}
              max={24}
              value={settings.fontSize}
              onChange={(e) => onSettingsChange('fontSize', e.target.value)}
              className="w-full"
            />
            <div className="text-xs text-slate-500 mt-1">{settings.fontSize}px</div>
          </div>
          
          {/* Line Height */}
          <div className="mb-4">
            <label className="text-sm text-slate-600 mb-2 block">Line Spacing</label>
            <input
              type="range"
              min={1.4}
              max={2.2}
              step={0.1}
              value={settings.lineHeight}
              onChange={(e) => onSettingsChange('lineHeight', e.target.value)}
              className="w-full"
            />
            <div className="text-xs text-slate-500 mt-1">{settings.lineHeight}</div>
          </div>
          
          {/* Font Family */}
          <div className="mb-4">
            <label className="text-sm text-slate-600 mb-2 block">Font</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => onSettingsChange('fontFamily', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded text-sm"
            >
              <option value="serif">Serif (Classic)</option>
              <option value="sans-serif">Sans-serif (Modern)</option>
              <option value="system-ui">System (Native)</option>
            </select>
          </div>
          
          {/* Reading Mode */}
          <div className="mb-4">
            <label className="text-sm text-slate-600 mb-2 block">Reading Mode</label>
            <div className="space-y-2">
              {['normal', 'focus', 'immersive'].map(mode => (
                <label key={mode} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="readingMode"
                    value={mode}
                    checked={settings.readingMode === mode}
                    onChange={(e) => onSettingsChange('readingMode', e.target.value)}
                    className="text-envGreen-500"
                  />
                  <span className="text-sm capitalize">{mode}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// 💬 SOCIAL ENGAGEMENT BAR
const SocialEngagement = ({ article, onInteraction }) => {
  const [reactions, setReactions] = useState({
    likes: 1247,
    shares: 89,
    comments: 34,
    bookmarks: 156
  });
  
  const handleReaction = (type) => {
    setReactions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
    onInteraction(type, article.id);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg border border-slate-200 px-6 py-3"
    >
      <div className="flex items-center gap-6">
        <button
          onClick={() => handleReaction('likes')}
          className="flex items-center gap-2 hover:text-red-500 transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm">{reactions.likes}</span>
        </button>
        
        <button
          onClick={() => handleReaction('comments')}
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{reactions.comments}</span>
        </button>
        
        <button
          onClick={() => handleReaction('shares')}
          className="flex items-center gap-2 hover:text-green-500 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm">{reactions.shares}</span>
        </button>
        
        <button
          onClick={() => handleReaction('bookmarks')}
          className="flex items-center gap-2 hover:text-envGreen-500 transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-sm">{reactions.bookmarks}</span>
        </button>
      </div>
    </motion.div>
  );
};

// 🚀 MAIN IMMERSIVE READER COMPONENT
const ImmersiveReader = ({ onViewportEnter }) => {
  const readerRef = useRef(null);
  const [typographySettings, setTypographySettings] = useState({
    fontSize: 18,
    lineHeight: 1.7,
    fontFamily: 'serif',
    readingMode: 'normal'
  });
  
  const [currentArticle, setCurrentArticle] = useState(0);
  const [articles] = useState([
    {
      id: 1,
      title: "The Last Ice: Arctic's Accelerating Collapse",
      subtitle: "How the Arctic Ocean could be ice-free by 2035",
      author: "Dr. Sarah Chen",
      readingTime: 12,
      featuredImage: "/images/arctic-ice-collapse.jpg",
      summary: "New research reveals the Arctic ice sheet is melting 70% faster than previously predicted...",
      keyPoints: [
        "Arctic sea ice declining at 13% per decade",
        "Greenland ice sheet losing 280 billion tons annually",
        "Global sea level rise acceleration to 3.4mm/year",
        "Polar bear populations down 80% since 1970"
      ],
      content: `The Arctic Ocean, once a vast expanse of permanent ice, now tells a story of unprecedented change. Scientists from the International Arctic Research Center have documented the most dramatic ice loss in recorded history, with implications that extend far beyond the polar regions.

Dr. Elena Vasquez, lead researcher on the Arctic Monitoring Project, describes the current situation as "a climate emergency unfolding in real-time." Her team's latest findings, published in Nature Climate Change, reveal that the Arctic is warming at nearly four times the global average—a phenomenon known as Arctic amplification.

The data is sobering. Since 1979, Arctic sea ice has declined at a rate of 13% per decade. The Greenland ice sheet, which contains enough water to raise global sea levels by 7.4 meters, is losing mass at an accelerating rate of 280 billion tons per year. This is equivalent to the weight of 84 million African elephants disappearing into the ocean annually.

"We're witnessing the collapse of a system that has been stable for thousands of years," Vasquez explains. "The feedback loops we're seeing—where darker ocean water absorbs more heat than reflective ice, accelerating melting—suggest we may have already passed several tipping points."

The implications extend far beyond the Arctic. As ice-free Arctic Ocean absorbs solar radiation, global weather patterns are shifting. The jet stream, which regulates weather across North America and Europe, is becoming increasingly unstable, leading to extreme weather events from Texas to Norway.

For the indigenous communities of the Arctic, these changes represent an existential threat. The Inuit people have lived in harmony with Arctic ice for millennia, developing sophisticated knowledge systems based on ice conditions. "Our elders can no longer predict the ice," says Maria Kanguq, an Inuit climate advocate. "The knowledge passed down through generations is becoming obsolete in the span of a single lifetime."

The economic ramifications are equally staggering. Insurance companies estimate that climate-related damages from Arctic changes could exceed $24 trillion by 2100. Coastal cities from Miami to Mumbai face existential threats as sea levels rise and storm surges intensify.

Yet within this crisis lies opportunity. The same research revealing the Arctic's vulnerability is also illuminating pathways for action. Advanced satellite monitoring systems, developed in partnership with international space agencies, are providing unprecedented detail about ice dynamics. This data is crucial for improving climate models and developing targeted interventions.

"Understanding how ice responds to warming gives us tools to predict and potentially mitigate future changes," notes Dr. Chen. "We're not just documenting collapse—we're mapping pathways to resilience."

The technology emerging from Arctic research is finding applications worldwide. Ice-penetrating radar systems originally designed for monitoring glaciers are now being used to assess groundwater resources in drought-stricken regions. Predictive models developed for sea ice are being adapted to forecast agricultural yields and water availability.

Perhaps most importantly, the Arctic's transformation is catalyzing unprecedented international cooperation. The Arctic Council, comprising eight Arctic nations, has established the most comprehensive environmental monitoring network in history. Real-time data sharing between former rivals has become routine when facing a common threat.

The question now is whether humanity can respond as quickly as the Arctic is changing. The window for limiting warming to 1.5°C is rapidly closing, but the same technological and scientific capabilities revealing the crisis also offer hope for solutions. As Dr. Vasquez concludes, "The Arctic is our planet's early warning system. The question is whether we're listening closely enough to hear its message."

The next decade will be crucial. Current projections suggest that even with aggressive climate action, some Arctic changes are now irreversible. However, the difference between a 1.5°C and 2°C world could mean the difference between manageable adaptation and catastrophic transformation. For the Arctic, and for all of us, the stakes have never been higher.`
    }
  ]);
  
  const isInView = useInView(readerRef, { threshold: 0.3 });
  const { scrollYProgress } = useScroll({
    target: readerRef,
    offset: ["start start", "end end"]
  });
  
  useEffect(() => {
    if (isInView && onViewportEnter) {
      onViewportEnter();
    }
  }, [isInView, onViewportEnter]);
  
  const handleTypographyChange = (key, value) => {
    setTypographySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSocialInteraction = (type, articleId) => {
    console.log(`Social interaction: ${type} on article ${articleId}`);
  };
  
  return (
    <section ref={readerRef} className="immersive-reader py-16 bg-slate-50 min-h-screen">
      
      {/* Reading Progress Indicator */}
      <ReadingProgress 
        scrollProgress={scrollYProgress.get()} 
        article={articles[currentArticle]} 
      />
      
      {/* Typography Controls */}
      <TypographyControls
        settings={typographySettings}
        onSettingsChange={handleTypographyChange}
      />
      
      {/* Main Article Content */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <MagazineSpread
            article={articles[currentArticle]}
            isActive={true}
            onPageTurn={(direction) => console.log(`Page turn: ${direction}`)}
          />
        </motion.div>
      </div>
      
      {/* Social Engagement */}
      <SocialEngagement
        article={articles[currentArticle]}
        onInteraction={handleSocialInteraction}
      />
      
      {/* Custom Styles */}
      <style jsx>{`
        .immersive-reader {
          font-size: ${typographySettings.fontSize}px;
          line-height: ${typographySettings.lineHeight};
          font-family: ${typographySettings.fontFamily};
        }
        
        .magazine-spread {
          max-width: 1200px;
          margin: 0 auto;
          height: 800px;
          position: relative;
        }
        
        .spread-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }
        
        .left-page, .right-page {
          height: 100%;
          overflow-y: auto;
        }
        
        .content-page {
          column-count: 1;
          column-gap: 2rem;
          text-align: justify;
          hyphens: auto;
        }
        
        .focus-mode {
          background: #1a1a1a;
          color: #e5e5e5;
        }
        
        .immersive-mode {
          background: #000;
          color: #f0f0f0;
        }
      `}</style>
    </section>
  );
};

export default ImmersiveReader;
