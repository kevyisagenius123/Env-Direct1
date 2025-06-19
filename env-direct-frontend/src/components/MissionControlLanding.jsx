import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Brain, 
  Shield, 
  Satellite, 
  Activity, 
  AlertTriangle,
  Monitor,
  Zap,
  Radio,
  Target,
  TrendingUp,
  Users,
  ExternalLink,
  ArrowRight,
  Command
} from 'lucide-react';

const MissionControlLanding = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus] = useState('OPERATIONAL');
  const [globalThreats] = useState(4);
  const [activeSensors] = useState(42);
  const [totalSensors] = useState(48);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const capabilities = [
    {
      icon: Globe,
      title: 'OPS CENTER',
      description: 'Mission-critical environmental command interface',
      link: '/ops',
      color: 'from-red-600 to-orange-500',
      features: ['Real-time threat assessment', '3D global visualization', 'Command & control']
    },
    {
      icon: Brain,
      title: 'AI LAB',
      description: 'Environmental forensics & intelligence analysis',
      link: '/ai-lab',
      color: 'from-purple-600 to-blue-500',
      features: ['Image analysis', 'Audio biodiversity', 'Predictive modeling']
    },
    {
      icon: Activity,
      title: 'LIVE MONITORING',
      description: 'Real-time sensor network & data streams',
      link: '/live-map',
      color: 'from-green-600 to-teal-500',
      features: ['48 sensor nodes', 'Live data feeds', 'Alert systems']
    },
    {
      icon: TrendingUp,
      title: 'ANALYTICS',
      description: 'Advanced predictive environmental modeling',
      link: '/analytics-dashboard',
      color: 'from-blue-600 to-cyan-500',
      features: ['Predictive models', 'Trend analysis', 'Risk assessment']
    }
  ];

  const systemMetrics = [
    { label: 'System Status', value: systemStatus, color: 'text-green-400' },
    { label: 'Active Threats', value: globalThreats, color: 'text-red-400' },
    { label: 'Sensor Network', value: `${activeSensors}/${totalSensors}`, color: 'text-cyan-400' },
    { label: 'Coverage', value: '94.7%', color: 'text-blue-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/50" />
      
      {/* Header Status Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-green-500/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">ENVIRONMENT DIRECT 2.0</h1>
                  <p className="text-xs text-green-400">PLANETARY INTELLIGENCE PLATFORM</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-6 text-sm">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-gray-400">{metric.label}:</span>
                    <span className={`font-mono font-bold ${metric.color}`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400">MISSION TIME</div>
              <div className="font-mono text-white">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold mb-6"
              animate={{ 
                boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.4)', '0 0 0 10px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0.4)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              INTELLIGENCE-GRADE ENVIRONMENTAL PLATFORM
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-cyan-100 bg-clip-text text-transparent">
              MISSION CONTROL
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-gray-300">
              For Planetary Environmental Intelligence
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Welcome to the world's most advanced environmental command system. 
              Real-time monitoring, AI-powered analysis, and mission-critical decision support 
              for Dominica's environmental protection and global climate intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ops">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    ENTER OPS CENTER
                  </div>
                </motion.button>
              </Link>
              
              <Link to="/ai-lab">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-lg border border-purple-500/50 hover:bg-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    ACCESS AI LAB
                  </div>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Capabilities Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300 group"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${capability.color} rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{capability.title}</h3>
                  <p className="text-gray-400 mb-4">{capability.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {capability.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Link to={capability.link}>
                    <button className="w-full px-4 py-2 bg-slate-800 text-white rounded border border-gray-600 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 group">
                      <span>Access System</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Live Status Feed */}
          <motion.div 
            className="bg-slate-900/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">LIVE SYSTEM STATUS</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-mono">REAL-TIME</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Radio className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-semibold">Sensor Network</span>
                </div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">{activeSensors}/{totalSensors}</div>
                <div className="text-sm text-gray-400">Active monitoring stations</div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-white font-semibold">Active Threats</span>
                </div>
                <div className="text-2xl font-bold text-red-400 mb-1">{globalThreats}</div>
                <div className="text-sm text-gray-400">Requiring immediate attention</div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Satellite className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">Satellite Link</span>
                </div>
                <div className="text-2xl font-bold text-green-400 mb-1">ACTIVE</div>
                <div className="text-sm text-gray-400">Real-time data streaming</div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="text-center mt-16 pt-8 border-t border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-400 mb-4">
              Built for environmental intelligence professionals, government agencies, and planetary scientists
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <span>🇩🇲 Dominica Environmental Authority</span>
              <span>🌍 UN Environmental Programme</span>
              <span>🛰️ NASA Earth Observatory</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MissionControlLanding;