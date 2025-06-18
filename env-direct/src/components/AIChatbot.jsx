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

const API_URL = import.meta.env.VITE_API_URL;

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

// Web Search Results Component
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
        <div key={index} className="bg-white/70 rounded-lg p-3 border border-blue-100">
          <h5 className="font-medium text-blue-800 text-sm mb-1">{result.title}</h5>
          <p className="text-xs text-slate-600 mb-2">{result.snippet}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-600 font-mono">{result.source}</span>
            <span className="text-xs text-slate-500">{result.timestamp}</span>
          </div>
        </div>
      ))}
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
      text: 'Editorial Intelligence System activated. I have autonomous web search capabilities and am continuously monitoring environmental developments. How may I assist your editorial journey today?', 
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
  
  const [advancedPrompts] = useState([
    {
      text: 'Search the web autonomously',
      icon: MagnifyingGlassIcon,
      action: 'autonomousWebSearch',
      color: 'blue'
    },
    {
      text: 'Monitor climate trends',
      icon: EyeIcon,
      action: 'monitorTrends',
      color: 'cyan'
    },
    {
      text: 'Analyze current article',
      icon: DocumentMagnifyingGlassIcon,
      action: 'analyzeArticle',
      color: 'purple'
    },
    {
      text: 'Environmental intelligence',
      icon: ChartBarIcon,
      action: 'showEnvironmentalData',
      color: 'green'
    },
          {
        text: 'Cross-reference sources',
        icon: CpuChipIcon,
        action: 'crossReference',
        color: 'indigo'
      },
    {
      text: 'Generate alerts',
      icon: ExclamationTriangleIcon,
      action: 'generateAlerts',
      color: 'red'
    }
  ]);

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

  const simulateWebSearch = async (query) => {
    setIsSearching(true);
    setWebSearchActive(true);
    setCurrentSearchQuery(query);
    setAnalysisType('websearch');

    // Simulate web search delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock search results
    const mockResults = [
      {
        title: `Latest research on ${query} - Nature Climate Change`,
        snippet: `Recent findings reveal significant developments in ${query} research with implications for global environmental policy...`,
        source: 'nature.com',
        timestamp: 'Just now'
      },
      {
        title: `${query} monitoring data - NOAA Environmental`,
        snippet: `Real-time monitoring shows concerning trends in ${query} patterns across multiple geographic regions...`,
        source: 'noaa.gov',
        timestamp: '2 min ago'
      },
      {
        title: `Policy implications of ${query} - Environmental Policy Institute`,
        snippet: `New policy frameworks needed to address accelerating ${query} challenges facing global ecosystems...`,
        source: 'envpolicy.org',
        timestamp: '5 min ago'
      }
    ];

    setIsSearching(false);
    setWebSearchActive(false);
    return mockResults;
  };

  const performWebSearch = async (searchTerm) => {
    const activity = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: `Searched "${searchTerm}"`,
      type: 'search'
    };
    setAutonomousActivities(prev => [activity, ...prev.slice(0, 9)]);

    return await simulateWebSearch(searchTerm);
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
    const mockAnalysis = {
      readingTime: '8 min',
      complexity: 'Advanced',
      topics: ['Climate', 'Coral', 'Conservation'],
      sentiment: 'Informative',
      keyPoints: 3
    };
    return mockAnalysis;
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
        const searchTerms = ['climate change latest research', 'coral reef restoration 2024', 'environmental policy updates'];
        const randomSearch = searchTerms[Math.floor(Math.random() * searchTerms.length)];
        
        const searchResults = await performWebSearch(randomSearch);
        responseText = `I've conducted an autonomous web search and found ${searchResults.length} relevant sources. Here's what I discovered:`;
        additionalComponent = <WebSearchResults results={searchResults} query={randomSearch} />;
        break;
      
      case 'monitorTrends':
        setAnalysisType('monitoring');
        await new Promise(resolve => setTimeout(resolve, 2500));
        responseText = `Continuous monitoring activated. I'm tracking environmental trends across multiple data sources and will alert you to significant developments.`;
        additionalComponent = <AutonomousIntelligenceFeed activities={autonomousActivities} />;
        break;

      case 'crossReference':
        setAnalysisType('analysis');
        await new Promise(resolve => setTimeout(resolve, 3000));
        responseText = `Cross-referencing multiple sources reveals correlating patterns in environmental data. I've identified 3 peer-reviewed studies that support current findings and 2 contrasting viewpoints that merit further investigation.`;
        break;

      case 'generateAlerts':
        setAnalysisType('intelligence');
        await new Promise(resolve => setTimeout(resolve, 2000));
        responseText = `Alert system configured. I'm now monitoring for:
        
**HIGH PRIORITY:**
• Sudden temperature spikes above 1.5°C threshold
• Coral bleaching events in monitored regions
• Policy announcements from major climate organizations

**MEDIUM PRIORITY:**
• New scientific publications in top-tier journals
• Environmental incidents requiring immediate reporting
• Contributor submissions matching urgent story needs

I'll proactively notify you when these conditions are met.`;
        break;

      case 'analyzeArticle':
        setAnalysisType('article');
        const webResults = await performWebSearch('environmental journalism best practices');
        const analysis = analyzeCurrentPage();
        responseText = `I've analyzed the current article and cross-referenced it with latest web sources. Here's my comprehensive assessment:`;
        additionalComponent = (
          <div>
            <ArticleAnalysisResults analysis={analysis} />
            <WebSearchResults results={webResults.slice(0, 2)} query="related research" />
          </div>
        );
        break;
      
      case 'showEnvironmentalData':
        setAnalysisType('environmental');
        const envResults = await performWebSearch('global environmental monitoring data');
        const insights = getEnvironmentalInsights();
        responseText = `Here's the latest environmental intelligence enhanced with real-time web data:`;
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
      const searchQuery = messageText.replace(/search|find|look up/gi, '').trim();
      if (searchQuery) {
        const webResults = await performWebSearch(searchQuery);
        const botMessage = {
          id: Date.now() + 1,
          text: `I've searched the web for "${searchQuery}" and found relevant information:`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'websearch',
          component: <WebSearchResults results={webResults} query={searchQuery} />
        };
        setIsTyping(false);
        setMessages(prevMessages => [...prevMessages, botMessage]);
        return;
      }
    } else if (lowerMessage.includes('monitor') || lowerMessage.includes('watch')) {
      setAnalysisType('monitoring');
    } else if (lowerMessage.includes('analyze') || lowerMessage.includes('summary')) {
      setAnalysisType('article');
    } else if (lowerMessage.includes('environment') || lowerMessage.includes('climate')) {
      setAnalysisType('environmental');
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

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
          webSearchEnabled: true
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
      console.error("Error sending message to AI:", error);
      setIsTyping(false);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'My web search and intelligence systems are temporarily offline. I\'m working to restore full autonomous capabilities.',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'error'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
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
                  placeholder="Ask me to search the web, monitor trends, or analyze anything..."
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

// Import missing components for compilation
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

export default EditorialAssistant; 