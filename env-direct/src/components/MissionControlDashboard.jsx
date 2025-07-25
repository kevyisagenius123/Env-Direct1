import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Zap,
  Globe,
  Satellite,
  Radio,
  Eye,
  Brain,
  Shield,
  Target
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// 🔥 FAANG-GRADE MISSION CONTROL DASHBOARD
// Bloomberg Terminal meets NASA Mission Control meets Tesla Autopilot

const MissionControlDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemMetrics, setSystemMetrics] = useState({
    threatLevel: 'ELEVATED',
    activeSensors: 2847,
    dataPointsToday: 14.7,
    systemUptime: '99.97%',
    alertsActive: 7,
    dataLatency: '47ms'
  });

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [activeModule, setActiveModule] = useState('overview');

  // Live data simulation with micro-animations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate live metric fluctuations
      setSystemMetrics(prev => ({
        ...prev,
        activeSensors: prev.activeSensors + Math.floor(Math.random() * 10 - 5),
        dataPointsToday: (prev.dataPointsToday + Math.random() * 0.1).toFixed(1),
        dataLatency: Math.floor(Math.random() * 20 + 40) + 'ms',
        alertsActive: Math.max(0, prev.alertsActive + Math.floor(Math.random() * 3 - 1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Real-time environmental data (simulated)
  const environmentalData = useMemo(() => ({
    airQuality: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      aqi: Math.floor(Math.random() * 50 + 30),
      pm25: Math.floor(Math.random() * 25 + 10),
      pm10: Math.floor(Math.random() * 40 + 15),
      no2: Math.floor(Math.random() * 30 + 10),
      so2: Math.floor(Math.random() * 15 + 5)
    })),
    
    climateMetrics: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      temperature: 26 + Math.sin(i * 0.5) * 3 + Math.random() * 2,
      humidity: 75 + Math.sin(i * 0.3) * 15 + Math.random() * 5,
      pressure: 1013 + Math.sin(i * 0.2) * 10 + Math.random() * 3,
      windSpeed: Math.max(0, 8 + Math.sin(i * 0.4) * 6 + Math.random() * 4)
    })),
    
    threats: [
      { name: 'Flash Flood Risk', value: 73, color: '#ef4444', status: 'CRITICAL' },
      { name: 'Air Quality Alert', value: 45, color: '#f59e0b', status: 'MODERATE' },
      { name: 'Heat Index', value: 62, color: '#f97316', status: 'ELEVATED' },
      { name: 'UV Radiation', value: 38, color: '#22d3ee', status: 'NORMAL' }
    ]
  }), [selectedTimeRange]);

  // Bloomberg-style metric tile with micro-animations
  const MetricTile = ({ icon: Icon, title, value, unit, change, trend, status = 'normal', className = '' }) => {
    const statusColors = {
      critical: 'border-red-500/50 bg-red-500/5',
      warning: 'border-yellow-500/50 bg-yellow-500/5',
      normal: 'border-emerald-500/50 bg-emerald-500/5',
      info: 'border-blue-500/50 bg-blue-500/5'
    };

    const trendColors = {
      up: 'text-emerald-400',
      down: 'text-red-400',
      flat: 'text-gray-400'
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className={`
          bg-slate-900/90 backdrop-blur-sm border-2 rounded-xl p-6 
          ${statusColors[status]} ${className}
          transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10
        `}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              status === 'critical' ? 'bg-red-500/20' :
              status === 'warning' ? 'bg-yellow-500/20' :
              status === 'normal' ? 'bg-emerald-500/20' :
              'bg-blue-500/20'
            }`}>
              <Icon className={`w-5 h-5 ${
                status === 'critical' ? 'text-red-400' :
                status === 'warning' ? 'text-yellow-400' :
                status === 'normal' ? 'text-emerald-400' :
                'text-blue-400'
              }`} />
            </div>
            <div className="text-slate-300 text-sm font-medium uppercase tracking-wider">{title}</div>
          </div>
          
          {status !== 'normal' && (
            <div className={`px-2 py-1 rounded-full text-xs font-mono uppercase ${
              status === 'critical' ? 'bg-red-500/20 text-red-300' :
              status === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-blue-500/20 text-blue-300'
            }`}>
              LIVE
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <motion.span 
              key={value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-white font-mono"
            >
              {value}
            </motion.span>
            {unit && <span className="text-slate-400 text-sm font-medium">{unit}</span>}
          </div>
          
          {change && (
            <div className="flex items-center gap-2">
              {trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-400" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
              {trend === 'flat' && <div className="w-4 h-4 border-b-2 border-gray-400" />}
              <span className={`text-sm font-medium ${trendColors[trend]}`}>{change}</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Interactive chart with real-time updates
  const InteractiveChart = ({ data, dataKey, color, title }) => (
    <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: color }} />
          <span className="text-slate-400 text-sm font-mono">LIVE</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${dataKey})`}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  // Threat assessment radar
  const ThreatRadar = ({ threats }) => (
    <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">Threat Assessment Matrix</h3>
        <Shield className="w-5 h-5 text-red-400" />
      </div>
      
      <div className="space-y-4">
        {threats.map((threat, index) => (
          <motion.div
            key={threat.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: threat.color }}
              />
              <span className="text-slate-300 text-sm">{threat.name}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-32 bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${threat.value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: threat.color }}
                />
              </div>
              <span className="text-white font-mono text-sm w-8">{threat.value}%</span>
              <span className={`text-xs px-2 py-1 rounded-full font-mono ${
                threat.status === 'CRITICAL' ? 'bg-red-500/20 text-red-300' :
                threat.status === 'ELEVATED' ? 'bg-orange-500/20 text-orange-300' :
                threat.status === 'MODERATE' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {threat.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Command Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-emerald-400" />
                <div>
                  <h1 className="text-white text-2xl font-bold">ENVIRONMENT DIRECT</h1>
                  <p className="text-slate-400 text-sm">Mission Control Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-mono">OPERATIONAL</span>
                </div>
                <div className="text-slate-400">
                  MISSION TIME: <span className="text-white font-mono">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-emerald-400 focus:outline-none"
              >
                <option value="1h">Last Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last Week</option>
              </select>
              
              <div className={`px-3 py-2 rounded-lg font-mono text-sm ${
                systemMetrics.threatLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-300' :
                systemMetrics.threatLevel === 'ELEVATED' ? 'bg-orange-500/20 text-orange-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                THREAT: {systemMetrics.threatLevel}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        {/* System Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          <MetricTile
            icon={Satellite}
            title="Active Sensors"
            value={systemMetrics.activeSensors.toLocaleString()}
            change="+12 today"
            trend="up"
            status="normal"
          />
          
          <MetricTile
            icon={Brain}
            title="Data Points"
            value={systemMetrics.dataPointsToday}
            unit="M today"
            change="+2.3% vs yesterday"
            trend="up"
            status="info"
          />
          
          <MetricTile
            icon={Zap}
            title="System Uptime"
            value={systemMetrics.systemUptime}
            change="847 days"
            trend="flat"
            status="normal"
          />
          
          <MetricTile
            icon={AlertTriangle}
            title="Active Alerts"
            value={systemMetrics.alertsActive}
            change="+2 since 06:00"
            trend="up"
            status={systemMetrics.alertsActive > 5 ? 'warning' : 'normal'}
          />
          
          <MetricTile
            icon={Radio}
            title="Data Latency"
            value={systemMetrics.dataLatency}
            change="Optimal"
            trend="flat"
            status="normal"
          />
          
          <MetricTile
            icon={Target}
            title="Accuracy Rate"
            value="99.3%"
            change="+0.1% improvement"
            trend="up"
            status="normal"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          <InteractiveChart
            data={environmentalData.climateMetrics}
            dataKey="temperature"
            color="#10b981"
            title="Temperature Monitoring (°C)"
          />
          
          <InteractiveChart
            data={environmentalData.airQuality}
            dataKey="aqi"
            color="#3b82f6"
            title="Air Quality Index"
          />
          
          <ThreatRadar threats={environmentalData.threats} />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-6">Multi-Parameter Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={environmentalData.climateMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="windSpeed" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-6">Air Quality Breakdown</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={environmentalData.airQuality.slice(-12)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="pm25" fill="#ef4444" />
                <Bar dataKey="pm10" fill="#f59e0b" />
                <Bar dataKey="no2" fill="#3b82f6" />
                <Bar dataKey="so2" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionControlDashboard;
