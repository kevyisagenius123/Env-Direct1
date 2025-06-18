import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  EyeIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowRightIcon,
  MapPinIcon,
  HeartIcon,
  CameraIcon,
  MicrophoneIcon,
  FilmIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const ArticleGrid = ({ 
  articles = [], 
  viewMode = 'magazine', 
  isInView = true,
  searchQuery = '',
  activeFilters = {},
  sortBy = 'editorial-featured',
  onArticleClick 
}) => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [hoveredArticle, setHoveredArticle] = useState(null);

  // Enhanced article data with full editorial context
  const enhancedArticles = articles.map((article, index) => ({
    ...article,
    // Add editorial metadata if missing
    author: article.author || {
      name: ['Dr. Elena Vasquez', 'Marcus Chen', 'Dr. Amara Okafor'][index % 3],
      avatar: [`/img/team/elena-vasquez.jpg`, `/img/team/marcus-chen.jpg`, `/img/team/amara-okafor.jpg`][index % 3],
      role: ['Editor-in-Chief', 'Field Correspondent', 'Climate Intelligence'][index % 3],
      location: ['Barbados', 'Dominica', 'Trinidad'][index % 3]
    },
    readTime: article.readTime || `${Math.floor(Math.random() * 8) + 3} min read`,
    publishDate: article.publishDate || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    fieldLocation: article.fieldLocation || ['Caribbean Sea', 'Roseau Valley', 'Windward Islands', 'Coral Gardens', 'Storm Track Alpha'][index % 5],
    storyType: article.storyType || ['Investigation', 'Field Report', 'Data Analysis', 'Photo Essay', 'Expert Interview'][index % 5],
    immersiveElements: article.immersiveElements || {
      hasAudio: Math.random() > 0.5,
      hasVideo: Math.random() > 0.6,
      hasInteractive: Math.random() > 0.7,
      hasPhotography: Math.random() > 0.3
    },
    impact: article.impact || {
      views: `${Math.floor(Math.random() * 100)}K`,
      shares: `${Math.floor(Math.random() * 50)}K`,
      discussions: `${Math.floor(Math.random() * 20)}K`
    },
    tags: article.tags || ['Climate Change', 'Caribbean', 'Research', 'Policy'].slice(0, Math.floor(Math.random() * 3) + 2)
  }));

  useEffect(() => {
    let filtered = enhancedArticles;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilters.category && activeFilters.category !== 'all') {
      filtered = filtered.filter(article => 
        article.category === activeFilters.category
      );
    }

    // Apply location filter  
    if (activeFilters.location && activeFilters.location !== 'all') {
      filtered = filtered.filter(article => 
        article.author.location === activeFilters.location
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'editorial-featured':
        // Keep original order (already editorial-curated)
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        break;
      case 'most-read':
        filtered = filtered.sort((a, b) => parseInt(b.impact.views) - parseInt(a.impact.views));
        break;
      case 'field-reports':
        filtered = filtered.filter(article => article.storyType === 'Field Report');
        break;
      default:
        break;
    }

    setFilteredArticles(filtered);
  }, [articles, searchQuery, activeFilters, sortBy]);

  const getStoryTypeIcon = (type) => {
    switch (type) {
      case 'Investigation': return CameraIcon;
      case 'Field Report': return MapPinIcon;
      case 'Data Analysis': return ChartBarIcon;
      case 'Photo Essay': return FilmIcon;
      case 'Expert Interview': return MicrophoneIcon;
      default: return UserIcon;
    }
  };

  const getStoryTypeColor = (type) => {
    switch (type) {
      case 'Investigation': return 'bg-red-600';
      case 'Field Report': return 'bg-emerald-600';
      case 'Data Analysis': return 'bg-blue-600';
      case 'Photo Essay': return 'bg-purple-600';
      case 'Expert Interview': return 'bg-orange-600';
      default: return 'bg-slate-600';
    }
  };

  if (viewMode === 'magazine') {
    return (
      <div className="space-y-12">
        {/* Featured Lead Story */}
        {filteredArticles.length > 0 && (
          <motion.article
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="group cursor-pointer"
            onClick={() => onArticleClick?.(filteredArticles[0])}
            onMouseEnter={() => setHoveredArticle(0)}
            onMouseLeave={() => setHoveredArticle(null)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Story Image */}
              <div className="relative overflow-hidden rounded-3xl">
                <img 
                  src={filteredArticles[0].image} 
                  alt={filteredArticles[0].title}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Story Type Badge */}
                <div className="absolute top-6 left-6">
                  <div className={`flex items-center space-x-2 ${getStoryTypeColor(filteredArticles[0].storyType)} text-white px-4 py-2 rounded-full`}>
                    <div className="w-4 h-4">
                      {React.createElement(getStoryTypeIcon(filteredArticles[0].storyType), { className: "w-4 h-4" })}
                    </div>
                    <span className="text-sm font-bold uppercase">{filteredArticles[0].storyType}</span>
                  </div>
                </div>

                {/* Immersive Elements Indicators */}
                <div className="absolute top-6 right-6 flex space-x-2">
                  {filteredArticles[0].immersiveElements.hasAudio && (
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <MicrophoneIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {filteredArticles[0].immersiveElements.hasVideo && (
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <FilmIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>

              {/* Story Content */}
              <div className="space-y-6">
                {/* Author & Location */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={filteredArticles[0].author.avatar} 
                    alt={filteredArticles[0].author.name}
                    className="w-16 h-16 rounded-full border-2 border-emerald-400 object-cover"
                  />
                  <div>
                    <div className="text-white text-lg font-semibold">{filteredArticles[0].author.name}</div>
                    <div className="text-emerald-400 text-sm font-medium">{filteredArticles[0].author.role}</div>
                    <div className="text-slate-400 text-sm flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>Reporting from {filteredArticles[0].fieldLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Title & Summary */}
                <div>
                  <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {filteredArticles[0].summary}
                  </p>
                </div>

                {/* Story Metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-slate-400">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4" />
                      <span className="text-sm">{filteredArticles[0].readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserIcon className="w-4 h-4" />
                      <span className="text-sm">{filteredArticles[0].impact.views} views</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="text-slate-400 hover:text-emerald-400 transition-colors">
                      <HeartIcon className="w-5 h-5" />
                    </button>
                    <button className="text-slate-400 hover:text-emerald-400 transition-colors">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                    <button className="text-slate-400 hover:text-emerald-400 transition-colors">
                      <BookmarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Call to Action */}
                <motion.button
                  className="group/btn flex items-center space-x-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <span className="text-lg font-semibold">Read Full Story</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.article>
        )}

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article, index) => (
            <motion.article
              key={index + 1}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onArticleClick?.(article)}
              onMouseEnter={() => setHoveredArticle(index + 1)}
              onMouseLeave={() => setHoveredArticle(null)}
            >
              {/* Article Image */}
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Story Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`flex items-center space-x-2 ${getStoryTypeColor(article.storyType)} text-white px-3 py-1 rounded-full`}>
                    <div className="w-3 h-3">
                      {React.createElement(getStoryTypeIcon(article.storyType), { className: "w-3 h-3" })}
                    </div>
                    <span className="text-xs font-bold uppercase">{article.storyType}</span>
                  </div>
                </div>

                {/* Immersive Elements */}
                <div className="absolute top-4 right-4 flex space-x-1">
                  {article.immersiveElements.hasAudio && (
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                      <MicrophoneIcon className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {article.immersiveElements.hasVideo && (
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <FilmIcon className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              </div>

              {/* Article Content */}
              <div className="space-y-4">
                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-12 h-12 rounded-full border border-slate-600 object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold">{article.author.name}</div>
                    <div className="text-emerald-400 text-sm">{article.author.role}</div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-slate-400 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-slate-500 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{article.fieldLocation}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="hover:text-emerald-400 transition-colors">
                      <HeartIcon className="w-4 h-4" />
                    </button>
                    <button className="hover:text-emerald-400 transition-colors">
                      <ShareIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        {filteredArticles.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center pt-12"
          >
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold transition-colors">
              Load More Stories
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  // Fallback to original grid view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors cursor-pointer"
          onClick={() => onArticleClick?.(article)}
        >
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-white font-semibold text-lg mb-2">{article.title}</h3>
            <p className="text-slate-400 text-sm line-clamp-3">{article.summary}</p>
            <div className="flex items-center justify-between mt-4 text-slate-500 text-sm">
              <span>{article.readTime}</span>
              <span>{article.author.name}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ArticleGrid; 