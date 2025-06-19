import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Activity, 
  AlertTriangle, 
  Shield, 
  Radio, 
  Satellite,
  Brain,
  TrendingUp,
  TrendingDown,
  MapPin,
  Droplets,
  Wind,
  Thermometer,
  Minus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Eye,
  Zap,
  Signal,
  Clock
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// Import OPS Center components
import ThreatLevelBoard from './ops/ThreatLevelBoard';
import GlobalIntelligenceFeed from './ops/GlobalIntelligenceFeed';
import LiveCommandLog from './ops/LiveCommandLog';
import SensorGrid from './ops/SensorGrid';
import OpsCesiumViewer from './ops/OpsCesiumViewer';

// Clean, structured environmental data
const environmentalData = {
  currentStatus: {
    riskLevel: 'MODERATE',
    threatLevel: 'ORANGE',
    systemStatus: 'OPERATIONAL',
    headline: 'Heavy rainfall risk detected in Eastern Dominica',
    advisory: 'Flash flood advisory issued for La Plaine and Castle Bruce',
    aiSummary: 'Current weather patterns show increased precipitation in eastern regions. Flood risk models indicate 87% probability of river overflow in next 24-48 hours. Tourist areas remain accessible with standard precautions.',
    lastUpdated: new Date().toISOString()
  },
  metrics: [
    {
      id: 'aqi',
      name: 'Air Quality',
      value: 42,
      unit: 'AQI',
      status: 'good',
      trend: 'up',
      location: 'Roseau Capital',
      change: '+2.1%',
      icon: Wind,
      description: 'Excellent air quality conditions'
    },
    {
      id: 'water',
      name: 'Water Purity',
      value: 89,
      unit: '%',
      status: 'good',
      trend: 'up',
      location: 'Layou River',
      change: '+1.3%',
      icon: Droplets,
      description: 'High quality water systems'
    },
    {
      id: 'temperature',
      name: 'Temperature',
      value: 28.3,
      unit: '°C',
      status: 'good',
      trend: 'flat',
      location: 'Island Average',
      change: 'Normal',
      icon: Thermometer,
      description: 'Optimal temperature range'
    },
    {
      id: 'carbon',
      name: 'Carbon Impact',
      value: -14,
      unit: '% YoY',
      status: 'good',
      trend: 'down',
      location: 'Island Wide',
      change: 'Improving',
      icon: Activity,
      description: 'Carbon reduction on track'
    }
  ],
  threats: [
    {
      id: 'flood_risk',
      type: 'Flood Risk',
      location: 'Eastern Dominica',
      level: 'HIGH',
      confidence: 87,
      timeframe: '24-48 hours',
      impact: 'Major river flooding expected',
      priority: 1
    },
    {
      id: 'eco_pressure',
      type: 'Eco-Tourism Pressure',
      location: 'Boiling Lake Trail',
      level: 'MODERATE',
      confidence: 92,
      timeframe: 'Next weekend',
      impact: 'Increased visitor load anticipated',
      priority: 2
    }
  ],
  liveAlerts: [
    '🌧 Heavy rainfall alert in Castle Bruce',
    '🔥 Burn ban issued in Grand Bay', 
    '🐢 Loggerhead turtle nesting activity detected',
    '♻️ New recycling initiative launched in Roseau',
    '🌊 Coastal erosion monitoring expanded'
  ]
};

// Status color system - clean and consistent
const getStatusConfig = (status) => {
  const configs = {
    good: { 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10', 
      border: 'border-emerald-500/20',
      glow: 'shadow-emerald-500/20'
    },
    warning: { 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/20',
      glow: 'shadow-amber-500/20'
    },
    critical: { 
      color: 'text-red-400', 
      bg: 'bg-red-500/10', 
      border: 'border-red-500/20',
      glow: 'shadow-red-500/20'
    }
  };
  return configs[status] || configs.good;
};

// === COMPONENT: HEADER BAR ===
const HeaderBar = ({ currentTime, activeSensors, totalSensors, threatLevel, systemStatus }) => {
  const threatColors = {
    GREEN: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    YELLOW: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    ORANGE: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    RED: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const statusColors = {
    OPERATIONAL: 'text-emerald-400',
    MONITORING: 'text-amber-400',
    ALERT: 'text-red-400'
  };

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Environment Direct</h1>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Intelligence Platform</p>
              </div>
            </div>
          </div>

          {/* Status Indicators - Clean spacing */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className={`w-4 h-4 ${statusColors[systemStatus]}`} />
              <span className={`text-sm font-medium ${statusColors[systemStatus]}`}>
                {systemStatus}
              </span>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${threatColors[threatLevel]}`}>
              THREAT: {threatLevel}
            </div>
            
            <div className="flex items-center gap-2 text-cyan-400">
              <Radio className="w-4 h-4" />
              <span className="text-sm font-mono">{activeSensors}/{totalSensors}</span>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                SYSTEM TIME
              </div>
              <div className="text-sm font-mono text-white">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// === COMPONENT: LIVE TICKER ===
const LiveTicker = ({ alerts }) => (
  <div className="bg-slate-800/50 border-b border-slate-700/50 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-8 py-2">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {alerts.concat(alerts).map((alert, index) => (
          <span key={index} className="text-sm text-slate-300 font-medium">
            {alert}
          </span>
        ))}
      </motion.div>
    </div>
  </div>
);

// === COMPONENT: RISK BANNER ===
const RiskBanner = ({ status }) => (
  <div className="max-w-[1440px] mx-auto px-8 py-6">
    <motion.div 
      className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Environmental Risk Level: {status.riskLevel}
            </h2>
            <p className="text-lg text-white/90 mb-1">{status.headline}</p>
            <p className="text-white/80">{status.advisory}</p>
          </div>
        </div>
        <div className="text-right text-white/80">
          <div className="text-xs uppercase tracking-wide">Last Updated</div>
          <div className="text-sm font-mono">{new Date(status.lastUpdated).toLocaleTimeString()}</div>
        </div>
      </div>
    </motion.div>
  </div>
);

// === COMPONENT: AI SUMMARY ===
const AISummary = ({ summary }) => (
  <div className="max-w-[1440px] mx-auto px-8 py-4">
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
      <div className="flex items-start gap-3">
        <Brain className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-purple-400 mb-2">AI Intelligence Summary</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{summary}</p>
        </div>
      </div>
    </div>
  </div>
);

// === COMPONENT: DASHBOARD TABS ===
const DashboardTabs = ({ activeView, setActiveView }) => {
  const tabs = [
    { id: 'overview', name: 'Overview', icon: Globe },
    { id: 'live', name: 'Live Data', icon: Activity },
    { id: 'threats', name: 'Threats', icon: AlertTriangle },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'map', name: 'Map View', icon: MapPin }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-4">
      <div className="border-b border-slate-700/50">
        <nav className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-all ${
                  activeView === tab.id
                    ? 'text-emerald-400 border-emerald-400 bg-slate-800/50'
                    : 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-slate-800/30'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

// === COMPONENT: METRIC CARD ===
const MetricCard = ({ metric, index }) => {
  const Icon = metric.icon;
  const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus;
  const config = getStatusConfig(metric.status);
  
  return (
    <motion.div
      className={`${config.bg} ${config.border} border rounded-xl p-6 hover:shadow-lg hover:${config.glow} transition-all duration-300 cursor-pointer group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2, scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center border ${config.border}`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{metric.name}</h3>
            <p className="text-xs text-slate-400">{metric.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TrendIcon className={`w-4 h-4 ${config.color}`} />
          <span className={`text-xs font-medium ${config.color}`}>{metric.change}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{metric.value}</span>
          <span className={`text-lg ${config.color}`}>{metric.unit}</span>
        </div>
      </div>
      
      <p className="text-sm text-slate-400">{metric.description}</p>
      
      {/* Status indicator */}
      <div className="mt-3 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')}`}></div>
        <span className={`text-xs font-medium ${config.color} capitalize`}>{metric.status}</span>
      </div>
    </motion.div>
  );
};

// === COMPONENT: THREAT CARD ===
const ThreatCard = ({ threat, index }) => {
  const levelColors = {
    'HIGH': 'border-red-500/50 bg-red-500/5 text-red-400',
    'MODERATE': 'border-amber-500/50 bg-amber-500/5 text-amber-400',
    'LOW': 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400'
  };

  return (
    <motion.div
      className={`rounded-lg border p-4 ${levelColors[threat.level]} hover:shadow-lg transition-all duration-300`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -1 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-base text-white mb-1">{threat.type}</h4>
          <p className="text-sm opacity-70">{threat.location}</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-current/20">
            {threat.level}
          </span>
        </div>
      </div>
      
      <p className="text-sm mb-3 text-slate-300">{threat.impact}</p>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">{threat.timeframe}</span>
        <span className="font-medium">{threat.confidence}% confidence</span>
      </div>
    </motion.div>
  );
};

// === COMPONENT: FOOTER STATUS ===
const FooterStatus = ({ currentTime }) => (
  <div className="bg-slate-900/90 border-t border-slate-700/50 mt-8">
    <div className="max-w-[1440px] mx-auto px-8 py-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="font-medium">LIVE</span>
          </div>
          <div className="text-slate-400">
            Last Update: {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-cyan-400">
            Dominica Environmental Grid Online
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-blue-400">
            <Satellite className="w-4 h-4" />
            <span>SAT-LINK ACTIVE</span>
          </div>
          <div className="flex items-center gap-2 text-purple-400">
            <Brain className="w-4 h-4" />
            <span>AI MONITORING</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// === MAIN COMPONENT ===
const UnifiedIntelligencePlatform = () => {
  const [activeView, setActiveView] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSensors, setActiveSensors] = useState(42);
  const totalSensors = 48;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSensors(prev => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(0, Math.min(totalSensors, prev + change));
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [totalSensors]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header Bar - Fixed top navigation */}
      <HeaderBar 
        currentTime={currentTime}
        activeSensors={activeSensors}
        totalSensors={totalSensors}
        threatLevel={environmentalData.currentStatus.threatLevel}
        systemStatus={environmentalData.currentStatus.systemStatus}
      />

      {/* Live Ticker - Breaking news scroll */}
      <LiveTicker alerts={environmentalData.liveAlerts} />

      {/* Risk Banner - Primary alert display */}
      <RiskBanner status={environmentalData.currentStatus} />

      {/* AI Summary - Intelligence briefing */}
      <AISummary summary={environmentalData.currentStatus.aiSummary} />

      {/* Dashboard Tabs - Main navigation */}
      <DashboardTabs activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Container */}
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        <AnimatePresence mode="wait">
          {/* Overview View - Executive summary */}
          {activeView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Environmental Metrics Section */}
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">Environmental Metrics</h2>
                  <p className="text-sm text-slate-400">Real-time monitoring of key environmental indicators</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {environmentalData.metrics.map((metric, index) => (
                    <MetricCard key={metric.id} metric={metric} index={index} />
                  ))}
                </div>
              </section>

              {/* Active Threats Section */}
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">Active Threats</h2>
                  <p className="text-sm text-slate-400">Current environmental risks requiring attention</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {environmentalData.threats.map((threat, index) => (
                    <ThreatCard key={threat.id} threat={threat} index={index} />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* Live Data View - Real-time charts */}
          {activeView === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">Live Environmental Data</h2>
                  <p className="text-sm text-slate-400">Real-time sensor feeds and monitoring systems</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Wind className="w-5 h-5 text-blue-400" />
                      Air Quality Trends
                    </h3>
                    <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-slate-400">Live Chart Component</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-cyan-400" />
                      Water Quality
                    </h3>
                    <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-slate-400">Live Chart Component</span>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* Threats View - Detailed threat analysis */}
          {activeView === 'threats' && (
            <motion.div
              key="threats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">Threat Assessment Center</h2>
                  <p className="text-sm text-slate-400">Comprehensive environmental risk analysis and monitoring</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <ThreatLevelBoard />
                  </div>
                  <div className="lg:col-span-2">
                    <GlobalIntelligenceFeed />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* Analytics View - Historical analysis */}
          {activeView === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h2>
                  <p className="text-sm text-slate-400">Historical trends and predictive analysis</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    Historical Analysis
                  </h3>
                  <div className="h-80 bg-slate-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-slate-400">Analytics Dashboard</span>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* Map View - Interactive visualization */}
          {activeView === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">Interactive Map</h2>
                  <p className="text-sm text-slate-400">3D visualization of Dominica's environmental monitoring network</p>
                </div>
                <div className="h-[600px] bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                  <OpsCesiumViewer />
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Status - System status bar */}
      <FooterStatus currentTime={currentTime} />
    </div>
  );
};

export default UnifiedIntelligencePlatform;