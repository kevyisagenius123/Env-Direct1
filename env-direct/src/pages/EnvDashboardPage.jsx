import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Activity, 
  Droplets, 
  Wind, 
  Thermometer, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Radio,
  Zap,
  Eye,
  Shield,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// 🔥 ENVIRONMENT DIRECT COMMAND CENTER 2.0 🔥
// This is a complete rewrite of the dashboard as a broadcast-grade control room

const mockLiveData = {
  currentStatus: {
    riskLevel: 'MODERATE',
    headline: 'Heavy rainfall risk detected in Eastern Dominica',
    advisory: 'Flash flood advisory issued for La Plaine and Castle Bruce',
    region: 'Dominica',
    lastUpdated: new Date().toISOString()
  },
  metrics: [
    {
      id: 'aqi',
      name: 'Air Quality Index',
      value: 42,
      unit: 'AQI',
      status: 'good',
      trend: 'flat',
      location: 'Roseau Capital',
      change: '+2.1% today'
    },
    {
      id: 'water',
      name: 'Water Purity',
      value: 89,
      unit: '%',
      status: 'good',
      trend: 'up',
      location: 'Layou River',
      change: '+1.3% this week'
    },
    {
      id: 'recycling',
      name: 'Recycling Rate',
      value: 34,
      unit: '%',
      status: 'warning',
      trend: 'down',
      location: 'National Average',
      change: '-5.2% this month'
    },
    {
      id: 'carbon',
      name: 'Carbon Footprint',
      value: -14,
      unit: '% YoY',
      status: 'good',
      trend: 'down',
      location: 'Island Wide',
      change: 'Improving trend'
    }
  ],
  alerts: [
    {
      id: 1,
      title: 'Flash Flood Watch',
      level: 'warning',
      region: 'Eastern Dominica',
      issuedAt: '2 hours ago',
      source: 'Met Office'
    },
    {
      id: 2,
      title: 'High Surf Advisory',
      level: 'advisory',
      region: 'West Coast',
      issuedAt: '4 hours ago',
      source: 'Coast Guard'
    }
  ],
  sensors: [
    {
      id: 'rain_1',
      type: 'rainfall',
      location: 'Castle Bruce',
      reading: 24.5,
      unit: 'mm/h',
      status: 'critical',
      updatedAt: 'Just now'
    },
    {
      id: 'temp_1',
      type: 'temperature',
      location: 'Roseau',
      reading: 28.3,
      unit: '°C',
      status: 'good',
      updatedAt: '2 min ago'
    },
    {
      id: 'wind_1',
      type: 'wind',
      location: 'Portsmouth',
      reading: 15.2,
      unit: 'km/h',
      status: 'good',
      updatedAt: '1 min ago'
    }
  ],
  tickerItems: [
    '🌧 Heavy rainfall alert in Castle Bruce',
    '🔥 Burn ban issued in Grand Bay',
    '🐢 Loggerhead turtle nesting activity detected',
    '♻️ New recycling initiative launched in Roseau',
    '🌊 Coastal erosion monitoring expanded'
  ]
};

const airQualityData = [
  { time: '00:00', aqi: 38 },
  { time: '04:00', aqi: 42 },
  { time: '08:00', aqi: 35 },
  { time: '12:00', aqi: 45 },
  { time: '16:00', aqi: 41 },
  { time: '20:00', aqi: 39 }
];

const waterTrendsData = [
  { time: 'Jan', turbidity: 2.1, ph: 7.2 },
  { time: 'Feb', turbidity: 1.8, ph: 7.4 },
  { time: 'Mar', turbidity: 2.3, ph: 7.1 },
  { time: 'Apr', turbidity: 1.9, ph: 7.3 },
  { time: 'May', turbidity: 2.0, ph: 7.2 },
  { time: 'Jun', turbidity: 1.7, ph: 7.4 }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'good': return 'text-green-500 bg-green-500/10 border-green-500/20';
    case 'warning': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
    default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'good': return CheckCircle2;
    case 'warning': return AlertCircle;
    case 'critical': return XCircle;
    default: return Minus;
  }
};

// Hero headline component
const EnvironmentHeadline = ({ data }) => (
  <motion.div 
    className="bg-gradient-to-r from-mygreen-dark to-envGreen-600 text-white p-8 rounded-2xl shadow-2xl mb-8"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <Shield className="w-8 h-8" />
        <h1 className="text-3xl font-bold">🌍 Environmental Risk Level: {data.riskLevel}</h1>
      </div>
      <div className="text-right">
        <div className="text-sm opacity-90">Last Updated</div>
        <div className="font-mono text-lg">{new Date(data.lastUpdated).toLocaleTimeString()}</div>
      </div>
    </div>
    <p className="text-xl mb-2">{data.headline}</p>
    <p className="text-lg opacity-90">{data.advisory}</p>
  </motion.div>
);

// Animated metric tile
const MetricTile = ({ metric, index }) => {
  const StatusIcon = getStatusIcon(metric.status);
  
  return (
    <motion.div
      className={`p-6 rounded-xl border-2 backdrop-blur-sm ${getStatusColor(metric.status)} 
        hover:scale-105 transition-all duration-300 cursor-pointer`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between mb-3">
        <StatusIcon className="w-8 h-8" />
        <div className="text-xs font-medium">{metric.trend}</div>
      </div>
      
      <h3 className="text-sm font-medium opacity-80 mb-1">{metric.name}</h3>
      <div className="flex items-baseline space-x-2 mb-2">
        <span className="text-3xl font-bold">{metric.value}</span>
        <span className="text-lg opacity-70">{metric.unit}</span>
      </div>
      
      <div className="text-xs opacity-60 mb-1">{metric.location}</div>
      <div className="text-xs font-medium">{metric.change}</div>
    </motion.div>
  );
};

// Ticker bar
const TickerBar = ({ items }) => (
  <div className="bg-slate-900 text-white py-3 overflow-hidden relative">
    <motion.div
      className="flex space-x-8 whitespace-nowrap"
      animate={{ x: [1000, -1000] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {items.concat(items).map((item, index) => (
        <span key={index} className="text-sm font-medium">{item}</span>
      ))}
    </motion.div>
  </div>
);

// Main dashboard component
const EnvDashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Ticker Bar */}
      <TickerBar items={mockLiveData.tickerItems} />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Hero Headline */}
        <EnvironmentHeadline data={mockLiveData.currentStatus} />
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockLiveData.metrics.map((metric, index) => (
            <MetricTile key={metric.id} metric={metric} index={index} />
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Air Quality Chart */}
          <motion.div 
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Air Quality Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={airQualityData}>
                <defs>
                  <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#f3f4f6'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#aqiGradient)" 
                  name="AQI"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
          
          {/* Water Trends Chart */}
          <motion.div 
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Droplets className="w-6 h-6 text-cyan-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Water Quality Trends</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={waterTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#f3f4f6'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="turbidity" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  name="Turbidity (NTU)"
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ph" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="pH Level"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
        
        {/* Environmental Insight Panel */}
        <motion.div 
          className="bg-gradient-to-r from-envGreen-600 to-mygreen-dark text-white p-8 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-6 h-6" />
            <h3 className="text-2xl font-bold">Environment Direct AI Summary</h3>
          </div>
          <p className="text-lg leading-relaxed">
            Dominica's eastern coast experienced elevated rainfall levels today, raising the flood index in La Plaine parish. 
            Air quality remains stable island-wide with AQI readings well within safe parameters. Water quality monitoring 
            shows positive trends across major watersheds. Recycling rates continue to lag behind national targets, requiring 
            enhanced community engagement initiatives.
          </p>
          <div className="mt-4 text-sm opacity-80">
            Generated at {currentTime.toLocaleTimeString()} • Next update in 15 minutes
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnvDashboardPage; 