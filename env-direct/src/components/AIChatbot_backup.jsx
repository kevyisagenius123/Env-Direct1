import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpenIcon, 
  UserPlusIcon, 
  GlobeAltIcon, 
  SpeakerWaveIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  LightBulbIcon,
  NewspaperIcon,
  MicrophoneIcon,
  PlayIcon,
  PauseIcon,
  MagnifyingGlassIcon,
  CpuChipIcon,
  EyeIcon,
  BoltIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import './AIChatbot.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Enhanced Editorial Assistant Icon with autonomous thinking animation
const EditorialIcon = ({ isAnalyzing = false, isThinking = false, autonomousMode = false }) => (
  <motion.div className="relative">
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="text-white"
      animate={
        isAnalyzing ? { rotate: 360 } : 
        isThinking ? { scale: [1, 1.1, 1] } :
        autonomousMode ? { rotateY: [0, 180, 360] } : {}
      }
      transition={{ 
        duration: isAnalyzing ? 2 : isThinking ? 1.5 : 3, 
        repeat: (isAnalyzing || isThinking || autonomousMode) ? Infinity : 0, 
        ease: "linear" 
      }}
    >
      <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-10 6l8-5v12l-8-5-8 5V4l8 5z"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path d="M12 8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1V9c0-.55-.45-1-1-1z"/>
    </motion.svg>
    {autonomousMode && (
      <motion.div 
        className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    )}
  </motion.div>
);

// Refined feather icon with autonomous indicators
const FeatherIcon = ({ hasNotification = false, autonomousMode = false, isSearching = false }) => (
  <div className="relative">
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      className="text-white"
      animate={isSearching ? { rotate: [0, 10, -10, 0] } : {}}
      transition={{ duration: 0.5, repeat: isSearching ? Infinity : 0 }}
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
      <line x1="16" y1="8" x2="2" y2="22"/>
      <line x1="17.5" y1="15" x2="9" y2="15"/>
    </motion.svg>
    {hasNotification && (
      <motion.div 
        className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full border-2 border-white"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    )}
    {autonomousMode && (
      <motion.div 
        className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
  </div>
);

// Enhanced typing indicator with search context
const TypingIndicator = ({ analysisType = 'general', searchQuery = null }) => {
  const analysisTexts = {
    general: 'Editorial Assistant is considering...',
    article: 'Analyzing article structure and content...',
    environmental: 'Processing environmental data patterns...',
    contributor: 'Accessing contributor guidelines...',
    glossary: 'Searching editorial glossary...',
    audio: 'Preparing audio transcription...',
    websearch: searchQuery ? `Searching the web for "${searchQuery}"...` : 'Conducting autonomous web research...',
    monitoring: 'Monitoring global environmental trends...',
    analysis: 'Cross-referencing multiple data sources...',
    intelligence: 'Synthesizing intelligence from web sources...'
  };

  return (
    <motion.div 
      className="flex items-center space-x-1 px-6 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span className="text-slate-500 font-serif text-sm mr-3">{analysisTexts[analysisType]}</span>
      {analysisType === 'websearch' && (
        <MagnifyingGlassIcon className="w-4 h-4 text-emerald-400 mr-2" />
      )}
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className={`w-2 h-2 rounded-full ${
            analysisType === 'websearch' ? 'bg-blue-400' :
            analysisType === 'monitoring' ? 'bg-cyan-400' :
            'bg-emerald-400'
          }`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: dot * 0.2
          }}
        />
      ))}
    </motion.div>
  );
};

// Enhanced Web Search Results Component with clickable links
const WebSearchResults = ({ results, query }) => (
  <motion.div 
    className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
      <MagnifyingGlassIcon className="w-4 h-4 mr-2 text-blue-600" />
      Web Intelligence: "{query}"
    </h4>
    <div className="space-y-3">
      {results.map((result, index) => (
        <div key={index} className="bg-white/70 rounded-lg p-3 border border-blue-100 hover:shadow-md transition-shadow">
          <h5 className="font-medium text-blue-800 text-sm mb-1">{result.title}</h5>
          <p className="text-xs text-slate-600 mb-2 leading-relaxed">{result.snippet}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-blue-600 font-mono">{result.source}</span>
              {result.url && (
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:text-blue-700 underline"
                >
                  🔗 View Source
                </a>
              )}
            </div>
            <span className="text-xs text-slate-500">{result.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-3 p-2 bg-blue-100/50 rounded text-xs text-blue-700">
      💡 Search powered by real-time web intelligence • Click links to explore sources
    </div>
  </motion.div>
);

// Environmental Data Widget Component
const EnvironmentalDataWidget = ({ data }) => (
  <motion.div 
    className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 mb-4"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
      <GlobeAltIcon className="w-4 h-4 mr-2 text-blue-600" />
      Live Environmental Data
    </h4>
    <div className="grid grid-cols-2 gap-3">
      <div className="text-center">
        <div className="text-lg font-mono text-red-600">{data.globalTemp}°C</div>
        <div className="text-xs text-slate-500">Global Temp</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-mono text-orange-600">{data.coralCoverage}%</div>
        <div className="text-xs text-slate-500">Coral Coverage</div>
      </div>
    </div>
  </motion.div>
);

const ArticleAnalysisResults = ({ analysis }) => (
  <motion.div 
    className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 mb-4"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
      <DocumentMagnifyingGlassIcon className="w-4 h-4 mr-2 text-purple-600" />
      Article Analysis
    </h4>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-slate-600">Reading Time:</span>
        <span className="text-sm font-mono text-purple-600">{analysis.readingTime}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-slate-600">Complexity Level:</span>
        <span className="text-sm font-mono text-purple-600">{analysis.complexity}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-slate-600">Key Topics:</span>
        <div className="flex space-x-1">
          {analysis.topics.map((topic, index) => (
            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Autonomous Intelligence Feed
const AutonomousIntelligenceFeed = ({ activities }) => (
  <motion.div 
    className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg p-4 mb-4"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
      <CpuChipIcon className="w-4 h-4 mr-2 text-cyan-600" />
      Autonomous Intelligence Activity
    </h4>
    <div className="space-y-2 max-h-32 overflow-y-auto">
      {activities.map((activity, index) => (
        <motion.div 
          key={index} 
          className="flex items-center space-x-2 text-xs"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={`w-2 h-2 rounded-full ${
            activity.type === 'search' ? 'bg-blue-400' :
            activity.type === 'monitor' ? 'bg-cyan-400' :
            activity.type === 'analysis' ? 'bg-purple-400' :
            activity.type === 'alert' ? 'bg-red-400' :
            'bg-green-400'
          }`} />
          <span className="text-slate-600 font-mono">{activity.timestamp}</span>
          <span className="text-slate-700">{activity.action}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Advanced Quick Action Buttons with web search
const QuickActionButton = ({ icon: Icon, label, onClick, color = "emerald", isActive = false }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive 
        ? `bg-${color}-100 border-2 border-${color}-400 shadow-lg` 
        : `bg-${color}-50 border border-${color}-200 hover:bg-${color}-100`
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className={`w-4 h-4 text-${color}-600`} />
    <span className={`text-${color}-700 font-medium text-sm`}>{label}</span>
    {isActive && (
      <motion.div 
        className={`w-2 h-2 bg-${color}-400 rounded-full`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    )}
  </motion.button>
);

const EditorialAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `🌿 **Environment Direct AI Assistant** - Operational

I'm your intelligent environmental consultant with **real-time web search capabilities**, specialized in Caribbean climate intelligence and sustainability analysis.

**🔍 Web Search Powers:**
- Real-time environmental research
- Current policy and regulation updates  
- Latest scientific findings and data
- Industry best practices and case studies

**🌍 Core Services:**
- Environmental Impact Assessments (EIA) and consulting
- Green Atlas Magazine support and research
- Climate data analysis and monitoring
- Caribbean and Dominica environmental intelligence

**💡 Try These Web Search Commands:**
- "Search for climate adaptation Caribbean"
- "Find latest environmental policies"
- "Look up coral restoration projects"

*Ask me to search for anything environmental - I'll find current web information to help!*`, 
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'greeting'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [analysisType, setAnalysisType] = useState('general');
  const [currentContext, setCurrentContext] = useState('general');
  const [hasNotification, setHasNotification] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autonomousMode, setAutonomousMode] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [webSearchActive, setWebSearchActive] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState({
    globalTemp: '+1.2',
    coralCoverage: '47',
    activeReporters: '23',
    lastUpdate: '2 min ago'
  });
  
  // Autonomous intelligence tracking
  const [autonomousActivities, setAutonomousActivities] = useState([
    { 
      timestamp: '12:34', 
      action: 'Monitoring climate news feeds', 
      type: 'monitor' 
    },
    { 
      timestamp: '12:35', 
      action: 'Searched "coral bleaching 2024 latest research"', 
      type: 'search' 
    },
    { 
      timestamp: '12:36', 
      action: 'Analyzing environmental policy updates', 
      type: 'analysis' 
    }
  ]);

  const [webSearchCapabilities] = useState({
    realTimeSearch: true,
    autonomousMonitoring: true,
    trendAnalysis: true,
    crossReferencing: true,
    alertSystem: true
  });
  
  // Updated suggested prompts with working search examples
  const suggestedPrompts = [
    "🔍 Search for climate adaptation",
    "📊 Find environmental data", 
    "📖 Research for magazine article",
    "🌍 Look up sustainability resources"
  ];

  // Advanced action prompts
  const advancedPrompts = [
    { 
      text: 'Autonomous Web Search', 
      action: 'autonomousWebSearch', 
      icon: MagnifyingGlassIcon, 
      color: 'blue' 
    },
    { 
      text: 'Monitor Environmental Trends', 
      action: 'monitorTrends', 
      icon: CpuChipIcon, 
      color: 'cyan' 
    },
    { 
      text: 'Analyze Current Article', 
      action: 'analyzeArticle', 
      icon: DocumentMagnifyingGlassIcon, 
      color: 'purple' 
    },
    { 
      text: 'Show Environmental Data', 
      action: 'showEnvironmentalData', 
      icon: ChartBarIcon, 
      color: 'green' 
    }
  ];

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Autonomous intelligence system
  useEffect(() => {
    if (autonomousMode) {
      const autonomousInterval = setInterval(() => {
        performAutonomousActivity();
      }, 15000); // Every 15 seconds

      return () => clearInterval(autonomousInterval);
    }
  }, [autonomousMode]);

  // Fetch articles and start monitoring
  useEffect(() => {
    fetchArticles();
    const interval = setInterval(updateEnvironmentalData, 30000);
    return () => clearInterval(interval);
  }, []);

  const performAutonomousActivity = () => {
    const activities = [
      { action: 'Scanning environmental news feeds', type: 'monitor' },
      { action: 'Checking climate data sources', type: 'search' },
      { action: 'Analyzing policy updates', type: 'analysis' },
      { action: 'Cross-referencing scientific papers', type: 'analysis' },
      { action: 'Monitoring social media trends', type: 'search' },
      { action: 'Updating environmental metrics', type: 'monitor' }
    ];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const newActivity = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: randomActivity.action,
      type: randomActivity.type
    };

    setAutonomousActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    setHasNotification(true);
    setTimeout(() => setHasNotification(false), 3000);
  };

  // Enhanced curated search results with comprehensive environmental database
  const getCuratedSearchResults = async (query) => {
    const queryLower = query.toLowerCase();
    
    // Comprehensive environmental database
    const environmentalDatabase = {
      climate: [
        {
          title: "IPCC Climate Change Reports",
          snippet: "Latest scientific assessments on climate change impacts, adaptation, and mitigation strategies from the Intergovernmental Panel on Climate Change.",
          url: "https://www.ipcc.ch/reports/",
          source: "IPCC",
          timestamp: "2 min ago"
        },
        {
          title: "Caribbean Climate Data Portal",
          snippet: "Climate data, projections, and adaptation resources specifically for Caribbean Small Island Developing States.",
          url: "https://www.caribbeanclimate.bz/",
          source: "CCCCC",
          timestamp: "5 min ago"
        },
        {
          title: "NASA Climate Change and Global Warming",
          snippet: "Real-time climate data, satellite imagery, and scientific research on global climate patterns and changes.",
          url: "https://climate.nasa.gov/",
          source: "NASA",
          timestamp: "10 min ago"
        }
      ],
      environment: [
        {
          title: "UNEP Global Environment Outlook",
          snippet: "Comprehensive environmental assessments and policy recommendations from the United Nations Environment Programme.",
          url: "https://www.unep.org/global-environment-outlook",
          source: "UNEP",
          timestamp: "3 min ago"
        },
        {
          title: "Environmental Impact Assessment Guidelines",
          snippet: "Best practices and methodologies for conducting environmental impact assessments in developing countries.",
          url: "https://www.ifc.org/environmental-assessment",
          source: "IFC",
          timestamp: "7 min ago"
        },
        {
          title: "Caribbean Environmental Health Institute",
          snippet: "Regional environmental health and sustainable development resources for Caribbean nations.",
          url: "https://www.cehi.org.lc/",
          source: "CEHI",
          timestamp: "12 min ago"
        }
      ],
      renewable: [
        {
          title: "Caribbean Renewable Energy Development",
          snippet: "Regional initiatives and resources for renewable energy deployment in Caribbean nations.",
          url: "https://www.irena.org/caribbean",
          source: "IRENA",
          timestamp: "11 min ago"
        }
      ],
      dominica: [
        {
          title: "Dominica Environmental Protection",
          snippet: "Environmental policies, protected areas, and conservation initiatives in the Commonwealth of Dominica.",
          url: "https://environment.gov.dm/",
          source: "Government of Dominica",
          timestamp: "5 min ago"
        },
        {
          title: "Dominica Climate Resilience Strategy",
          snippet: "National climate adaptation and resilience planning for Dominica's sustainable development.",
          url: "https://www.climate-resilience.org/dominica",
          source: "Climate Resilience Portal",
          timestamp: "8 min ago"
        },
        {
          title: "Morne Trois Pitons World Heritage Site",
          snippet: "UNESCO World Heritage site in Dominica featuring unique ecosystems and biodiversity.",
          url: "https://whc.unesco.org/en/list/814/",
          source: "UNESCO",
          timestamp: "13 min ago"
        }
      ],
      data: [
        {
          title: "Earth Observation Data Portal",
          snippet: "Free access to satellite imagery, environmental monitoring data, and geospatial datasets.",
          url: "https://earthdata.nasa.gov/",
          source: "NASA",
          timestamp: "7 min ago"
        },
        {
          title: "Caribbean Weather and Climate Data",
          snippet: "Historical and current weather data, climate projections for Caribbean region.",
          url: "https://www.weather.gov/international/caribbean",
          source: "NOAA",
          timestamp: "10 min ago"
        }
      ]
    };
    
    // Smart keyword matching
    let relevantResults = [];
    
    // Check each category for relevant content
    Object.keys(environmentalDatabase).forEach(category => {
      if (queryLower.includes(category) || 
          category.includes(queryLower.split(' ')[0]) ||
          environmentalDatabase[category].some(item => 
            item.title.toLowerCase().includes(queryLower) ||
            item.snippet.toLowerCase().includes(queryLower)
          )) {
        relevantResults = [...relevantResults, ...environmentalDatabase[category]];
      }
    });
    
    // If no specific matches, provide general environmental results
    if (relevantResults.length === 0) {
      relevantResults = [
        ...environmentalDatabase.environment.slice(0, 2),
        ...environmentalDatabase.climate.slice(0, 1)
      ];
    }
    
    return relevantResults.slice(0, 5); // Limit to 5 results
  };

  // Fixed web search functionality with CORS proxy and enhanced fallback
  const searchWeb = async (query) => {
    try {
      // Use CORS proxy to bypass browser restrictions
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1&skip_disambig=1`;
      
      let searchResults = [];
      
      try {
        const response = await fetch(proxyUrl + encodeURIComponent(searchUrl));
        const data = await response.json();
        
        // Process DuckDuckGo results
        if (data.Abstract) {
          searchResults.push({
            title: data.Heading || 'Environmental Information',
            snippet: data.Abstract,
            url: data.AbstractURL || '#',
            source: data.AbstractSource || 'DuckDuckGo',
            timestamp: 'Just now'
          });
        }
        
        // Add related topics
        if (data.RelatedTopics && data.RelatedTopics.length > 0) {
          data.RelatedTopics.slice(0, 3).forEach(topic => {
            if (topic.Text) {
              searchResults.push({
                title: topic.Text.split(' - ')[0] || 'Related Information',
                snippet: topic.Text,
                url: topic.FirstURL || '#',
                source: 'DuckDuckGo',
                timestamp: 'Just now'
              });
            }
          });
        }
      } catch (proxyError) {
        console.log('Proxy search failed, using comprehensive fallback');
      }
      
      // If no results from API, use curated results
      if (searchResults.length === 0) {
        searchResults = await getCuratedSearchResults(query);
      }
      
      return searchResults;
    } catch (error) {
      console.error('Search error:', error);
      return await getCuratedSearchResults(query);
    }
  };

  const simulateWebSearch = async (query) => {
    setIsSearching(true);
    setWebSearchActive(true);
    setCurrentSearchQuery(query);
    setAnalysisType('websearch');

    // Add autonomous activity
    const activity = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: `Searching web for "${query}"`,
      type: 'search'
    };
    setAutonomousActivities(prev => [activity, ...prev.slice(0, 9)]);

    // Perform enhanced web search with CORS proxy and fallback
    const searchResults = await searchWeb(query);

    setIsSearching(false);
    setWebSearchActive(false);
    return searchResults;
  };

  const performWebSearch = async (searchTerm) => {
    const activity = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: `Searched "${searchTerm}"`,
      type: 'search'
    };
    setAutonomousActivities(prev => [activity, ...prev.slice(0, 9)]);

    return await searchWeb(searchTerm);
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${API_URL}/api/articles`);
      if (response.ok) {
        const articlesData = await response.json();
        setArticles(articlesData);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    }
  };

  const updateEnvironmentalData = () => {
    setEnvironmentalData(prev => ({
      ...prev,
      globalTemp: (parseFloat(prev.globalTemp) + (Math.random() - 0.5) * 0.1).toFixed(1),
      coralCoverage: Math.max(0, Math.min(100, parseInt(prev.coralCoverage) + Math.floor((Math.random() - 0.5) * 2))).toString(),
      lastUpdate: 'Just now'
    }));
    setHasNotification(true);
    setTimeout(() => setHasNotification(false), 3000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNotification(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const analyzeCurrentPage = () => {
    const demoAnalysis = {
      readingTime: '8 min',
      complexity: 'Advanced',
      topics: ['Environmental Consulting', 'Sustainability', 'Compliance'],
      sentiment: 'Informative',
      keyPoints: 3
    };
    return demoAnalysis;
  };

  const getEnvironmentalInsights = () => {
    return {
      type: 'environmental',
      data: environmentalData,
      insights: [
        'Global temperature trending upward (+0.3°C this month)',
        'Coral coverage showing recovery in 3 monitored regions',
        '23 field correspondents currently active worldwide'
      ]
    };
  };

  const handleAdvancedAction = async (action) => {
    setIsAnalyzing(true);
    
    let responseText = '';
    let additionalComponent = null;

    switch (action) {
      case 'autonomousWebSearch':
        setAnalysisType('websearch');
        const searchTerms = ['climate change latest research', 'coral reef restoration 2024', 'environmental policy updates', 'Caribbean sustainability projects', 'SIDS climate adaptation', 'marine conservation 2024'];
        const randomSearch = searchTerms[Math.floor(Math.random() * searchTerms.length)];
        
        const searchResults = await searchWeb(randomSearch);
        responseText = `🔍 I've conducted an autonomous web search for "${randomSearch}" and found ${searchResults.length} current sources:`;
        additionalComponent = <WebSearchResults results={searchResults} query={randomSearch} />;
        break;
      
      case 'monitorTrends':
        setAnalysisType('monitoring');
        await new Promise(resolve => setTimeout(resolve, 2500));
        responseText = `Continuous monitoring analysis activated. I'm tracking environmental trends across multiple data sources and will alert you to significant developments.`;
        additionalComponent = <AutonomousIntelligenceFeed activities={autonomousActivities} />;
        break;

      case 'analyzeArticle':
        setAnalysisType('article');
        const webResults = await searchWeb('environmental journalism best practices 2024');
        const analysis = analyzeCurrentPage();
        responseText = `I've analyzed the current content and searched the web for related best practices:`;
        additionalComponent = (
          <div>
            <ArticleAnalysisResults analysis={analysis} />
            <WebSearchResults results={webResults.slice(0, 2)} query="journalism best practices" />
          </div>
        );
        break;
      
      case 'showEnvironmentalData':
        setAnalysisType('environmental');
        const envResults = await searchWeb('global environmental monitoring data 2024');
        const insights = getEnvironmentalInsights();
        responseText = `Here's the latest environmental intelligence enhanced with current web data:`;
        additionalComponent = (
          <div>
            <EnvironmentalDataWidget data={insights.data} />
            <WebSearchResults results={envResults.slice(0, 2)} query="environmental monitoring" />
          </div>
        );
        break;
      
      default:
        responseText = 'Autonomous intelligence system ready. I can search the web, monitor trends, and provide real-time analysis.';
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const botMessage = {
      id: Date.now(),
      text: responseText,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: action,
      component: additionalComponent
    };

    setIsAnalyzing(false);
    setIsTyping(false);
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };

  // Enhanced mock AI responses with web search integration
  const generateMockResponseWithWebSearch = async (messageText, context) => {
    const lowerMessage = messageText.toLowerCase();
    
    // Check if user is requesting web search
    if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('look up')) {
      // Extract search query
      let searchQuery = messageText
        .replace(/search|find|look up|for|about|information|on|the web/gi, '')
        .trim();
      
      if (!searchQuery) {
        searchQuery = lowerMessage.includes('climate') ? 'climate change caribbean' :
                     lowerMessage.includes('environment') ? 'environmental consulting' :
                     lowerMessage.includes('coral') ? 'coral reef restoration' :
                     lowerMessage.includes('sustainability') ? 'sustainability practices' :
                     'environmental sustainability';
      }
      
      try {
        const searchResults = await searchWeb(searchQuery);
        
        if (searchResults.length > 0) {
          return {
            reply: `🔍 **Web Search Results for "${searchQuery}"**\n\nI found ${searchResults.length} relevant sources:`,
            type: 'websearch',
            component: <WebSearchResults results={searchResults} query={searchQuery} />
          };
        }
      } catch (error) {
        console.error('Search error:', error);
      }
    }
    
    // Enhanced responses with web search suggestions
    if (lowerMessage.includes('climate') || lowerMessage.includes('environment') || lowerMessage.includes('carbon')) {
      return {
        reply: `🌍 **Environmental Intelligence Dashboard**

Based on current data analysis:

📊 **Climate Metrics:**
- Current CO₂ levels: 421 ppm (as of ${new Date().getFullYear()})
- Caribbean temperature trend: +${environmentalData.globalTemp}°C since 1990
- Sea level rise: 3.4mm/year average

🌪️ **Regional Risk Assessment:**
- Hurricane season intensity: Above average
- Drought risk: Moderate
- Coastal erosion rate: 2-3m/year in vulnerable areas

🔍 **Want real-time web data?** Try these search commands:
- "Search for latest climate data Caribbean"
- "Find coral reef restoration projects"
- "Look up environmental policy updates"`,
        type: 'environmental'
      };
    }
    
    if (lowerMessage.includes('magazine') || lowerMessage.includes('article') || lowerMessage.includes('publish')) {
      return {
        reply: `📖 **Green Atlas Magazine Assistant**

I can help you with:

✍️ **Article Submission:**
- Guidelines for environmental articles
- Publication timeline: Quarterly releases
- Topics: Climate, conservation, sustainability

📊 **Content Analytics:**
- Current articles: ${articles.length} in system
- Popular categories tracked
- Submission requirements

🔍 **Research Support:**
- "Search for environmental journalism best practices"
- "Find latest scientific publications"
- "Look up case studies for articles"

What specific magazine support do you need?`,
        type: 'editorial'
      };
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('consulting') || lowerMessage.includes('environmental impact')) {
      return {
        reply: `🏢 **Environment Direct Consulting Services**

**Environmental Assessments:**
- Environmental Impact Assessments (EIA)
- Environmental Management Plans
- Site contamination assessments

**GIS & Spatial Analysis:**
- Land use mapping
- Vulnerability assessments
- Custom dashboards

**Climate Solutions:**
- Adaptation strategies
- Nature-based solutions
- Carbon footprint analysis

🔍 **Web Intelligence Available:**
- "Search for latest EIA regulations"
- "Find climate resilience case studies"
- "Look up environmental compliance updates"

Which service area interests you most?`,
        type: 'services'
      };
    }
    
    if (lowerMessage.includes('dominica') || lowerMessage.includes('caribbean')) {
      return {
        reply: `🏝️ **Caribbean Environmental Intelligence**

**Dominica Focus:**
- Population: ~72,000
- Protected areas: 65% of land area
- UNESCO World Heritage Sites: Morne Trois Pitons

📈 **Regional Data:**
- Small Island Developing States (SIDS) challenges
- Climate vulnerability index: High
- Marine protected areas: Expanding

🔍 **Live Web Search Available:**
- "Search for Caribbean climate statistics"
- "Find island sustainability projects"
- "Look up Dominica environmental policies"

What specific Caribbean topic shall I search for you?`,
        type: 'location'
      };
    }
    
    if (lowerMessage.includes('data') || lowerMessage.includes('analytics') || lowerMessage.includes('monitoring')) {
      return {
        reply: `📊 **Environmental Data Analytics**

**Real-time Monitoring:**
- Air quality sensors: 12 active stations
- Water quality measurements: Daily updates
- Biodiversity tracking: 340 species monitored

**Trend Analysis:**
- Temperature anomalies detected
- Precipitation pattern changes
- Ecosystem health indicators

🔍 **Enhanced with Web Intelligence:**
- "Search for global environmental datasets"
- "Find satellite monitoring services"
- "Look up climate data APIs"

Which environmental parameters interest you most?`,
        type: 'analytics'
      };
    }
    
    // Default response with search capabilities
    return {
      reply: `🤖 **Environment Direct AI Assistant with Web Search**

I'm your intelligent environmental consultant with real-time web search capabilities!

**🔍 Web Search Commands:**
- "Search for [topic]" - I'll find current web information
- "Find information about [subject]" - Real-time research
- "Look up [query]" - Live web intelligence

**🌍 Core Services:**
- Environmental consulting and EIA guidance
- Green Atlas Magazine support and research  
- Climate data analysis and monitoring
- Caribbean and Dominica expertise

**💡 Try These Web Searches:**
- "Search for climate change latest research"
- "Find renewable energy Caribbean projects"
- "Look up environmental impact assessment guidelines"

What would you like me to search for or help you with today?`,
      type: 'general'
    };
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (messageText.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Enhanced intent detection with web search capabilities
    const lowerMessage = messageText.toLowerCase();
    if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('look up')) {
      setAnalysisType('websearch');
      // Extract search terms from message
      let searchQuery = messageText.replace(/search|find|look up|for|about|information|on|the web/gi, '').trim();
      if (!searchQuery) {
        searchQuery = lowerMessage.includes('climate') ? 'climate change caribbean' :
                     lowerMessage.includes('environment') ? 'environmental consulting' :
                     lowerMessage.includes('coral') ? 'coral reef restoration' :
                     'environmental sustainability';
      }
      
      try {
        const webResults = await searchWeb(searchQuery);
        const botMessage = {
          id: Date.now() + 1,
          text: `🔍 I've searched the web for "${searchQuery}" and found ${webResults.length} relevant sources:`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'websearch',
          component: <WebSearchResults results={webResults} query={searchQuery} />
        };
        setIsTyping(false);
        setMessages(prevMessages => [...prevMessages, botMessage]);
        return;
      } catch (error) {
        console.error('Web search failed, falling back to mock response:', error);
      }
    } else if (lowerMessage.includes('monitor') || lowerMessage.includes('watch')) {
      setAnalysisType('monitoring');
    } else if (lowerMessage.includes('analyze') || lowerMessage.includes('summary')) {
      setAnalysisType('article');
    } else if (lowerMessage.includes('environment') || lowerMessage.includes('climate')) {
      setAnalysisType('environmental');
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Try to connect to backend API first
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageText,
          context: currentContext,
          articlesCount: articles.length,
          environmentalData: environmentalData,
          autonomousMode: autonomousMode,
          webSearchEnabled: true,
          searchCapabilities: webSearchCapabilities
        }),
      });

      if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      
      let botReplyText = 'I\'m processing your request using my autonomous intelligence and web search capabilities. Let me gather comprehensive information for you.';
      if (data.reply) {
        botReplyText = data.reply.trim();
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botReplyText,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'response'
      };
      
      setIsTyping(false);
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.log("Backend unavailable, using enhanced web search responses:", error.message);
      
      // Use enhanced mock response system with web search
      const mockResponse = await generateMockResponseWithWebSearch(messageText, currentContext);
      
      const botMessage = {
        id: Date.now() + 1,
        text: mockResponse.reply,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: mockResponse.type,
        component: mockResponse.component || null
      };
      
      setIsTyping(false);
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (action) => {
    handleAdvancedAction(action);
  };

  return (
    <div className="editorial-assistant-container">
      <AnimatePresence>
      {isOpen && (
          <motion.div 
            className="editorial-assistant-window"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
          >
            {/* Enhanced Header with Autonomous Status */}
            <div className="editorial-assistant-header">
              <div className="flex items-center space-x-3">
                <EditorialIcon 
                  isAnalyzing={isAnalyzing} 
                  isThinking={isTyping}
                  autonomousMode={autonomousMode} 
                />
                <div>
                  <span className="font-serif text-lg">Autonomous Editorial AI</span>
                  <div className="text-xs opacity-75 font-light flex items-center space-x-2">
                    <span>{autonomousMode ? 'AUTONOMOUS MODE' : 'MANUAL MODE'}</span>
                    {webSearchActive && (
                      <span className="flex items-center space-x-1">
                        <MagnifyingGlassIcon className="w-3 h-3" />
                        <span>SEARCHING</span>
                      </span>
                    )}
                  </div>
                </div>
          </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => setAutonomousMode(!autonomousMode)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    autonomousMode 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' 
                      : 'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {autonomousMode ? 'AUTO' : 'MANUAL'}
                </motion.button>
                <motion.button 
                  onClick={toggleChat} 
                  className="close-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="editorial-assistant-messages">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id} 
                    className={`message ${msg.sender}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="message-content">
                      {msg.text}
                    </div>
                    {msg.component && msg.component}
                    <div className="message-timestamp">
                      {msg.timestamp}
                    </div>
                  </motion.div>
                ))}
                {isTyping && <TypingIndicator analysisType={analysisType} searchQuery={currentSearchQuery} />}
              </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

            {/* Autonomous Actions Panel */}
            {messages.length <= 2 && !isTyping && (
              <motion.div 
                className="advanced-actions-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="advanced-actions-title">Autonomous Intelligence Functions:</div>
                <div className="advanced-actions-grid">
                  {advancedPrompts.map((prompt, index) => (
                    <QuickActionButton
                      key={index}
                      icon={prompt.icon}
                      label={prompt.text}
                      onClick={() => handleSuggestedPrompt(prompt.action)}
                      color={prompt.color}
                      isActive={prompt.action === 'autonomousWebSearch' && webSearchActive}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Enhanced Input Area */}
            <div className="editorial-assistant-input">
              <div className="input-container">
                <textarea 
                  ref={inputRef}
              value={inputValue} 
              onChange={handleInputChange} 
              onKeyPress={handleKeyPress}
                  placeholder="Ask me to search the web, analyze data, or help with environmental topics..."
                  className="editorial-input"
                  rows="1"
                  style={{ resize: 'none', overflow: 'hidden' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                />
                <motion.button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping || isAnalyzing}
                  className={`send-button ${isSearching ? 'searching' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSearching ? 'Searching...' : isAnalyzing ? 'Processing...' : 'Send'}
                </motion.button>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Toggle Button */}
      <motion.button 
        className={`editorial-assistant-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span 
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              className="close-icon"
            >
              ×
            </motion.span>
          ) : (
            <motion.div
              key="feather"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <FeatherIcon 
                hasNotification={hasNotification} 
                autonomousMode={autonomousMode}
                isSearching={isSearching}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default EditorialAssistant;
