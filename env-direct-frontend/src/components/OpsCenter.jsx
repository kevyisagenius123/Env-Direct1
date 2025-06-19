import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Activity, 
  AlertTriangle, 
  Shield, 
  Radio, 
  Monitor,
  Command,
  Satellite,
  Eye,
  Brain,
  TrendingUp,
  MapPin,
  Zap,
  Users
} from 'lucide-react';
import ThreatLevelBoard from './ops/ThreatLevelBoard';
import GlobalIntelligenceFeed from './ops/GlobalIntelligenceFeed';
import LiveCommandLog from './ops/LiveCommandLog';
import SensorGrid from './ops/SensorGrid';
import OpsCesiumViewer from './ops/OpsCesiumViewer';

const OpsCenter = () => {
  const [isOpsMode, setIsOpsMode] = useState(false);
  const [activeModule, setActiveModule] = useState('overview');
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL');
  const [threatLevel, setThreatLevel] = useState('GREEN');
  const [activeSensors, setActiveSensors] = useState(42);
  const [totalSensors] = useState(48);
  
  // Real-time system heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate system updates
      setActiveSensors(prev => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(0, Math.min(totalSensors, prev + change));
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [totalSensors]);

  const moduleOptions = [
    { id: 'overview', name: 'OVERVIEW', icon: Globe, color: 'blue' },
    { id: 'threats', name: 'THREATS', icon: AlertTriangle, color: 'red' },
    { id: 'sensors', name: 'SENSORS', icon: Radio, color: 'green' },
    { id: 'intelligence', name: 'INTEL', icon: Brain, color: 'purple' },
    { id: 'operations', name: 'OPS', icon: Command, color: 'orange' },
    { id: 'satellite', name: 'SATELLITE', icon: Satellite, color: 'indigo' }
  ];

  const statusColors = {
    OPERATIONAL: 'text-green-400',
    MONITORING: 'text-yellow-400',
    ALERT: 'text-red-400',
    CRITICAL: 'text-red-600'
  };

  const threatColors = {
    GREEN: 'text-green-400 bg-green-900/20',
    YELLOW: 'text-yellow-400 bg-yellow-900/20',
    ORANGE: 'text-orange-400 bg-orange-900/20',
    RED: 'text-red-400 bg-red-900/20'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-green-400 relative">
      {/* OPS Mode Toggle */}
      <motion.button
        onClick={() => setIsOpsMode(!isOpsMode)}
        className={`fixed ${isOpsMode ? 'top-4 right-4' : 'top-20 right-4'} z-[70] px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 ${
          isOpsMode 
            ? 'bg-red-600 text-white shadow-red-500/50' 
            : 'bg-green-600 text-white shadow-green-500/50'
        } shadow-lg hover:shadow-xl`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          {isOpsMode ? 'EXIT OPS' : 'ENTER OPS'}
        </div>
      </motion.button>

      <AnimatePresence mode="wait">
        {isOpsMode ? (
          <motion.div
            key="ops-mode"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-slate-950"
          >
            {/* Header Bar */}
            <div className="h-20 bg-slate-900 border-b border-green-500/30 flex items-center justify-between px-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-7 h-7 text-green-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">ENVIRONMENT DIRECT</h1>
                    <p className="text-sm text-green-400">PLANETARY OPERATIONS CENTER</p>
                  </div>
                </div>
                
                {/* System Status */}
                <div className="flex items-center gap-4 ml-8">
                  <div className="flex items-center gap-2">
                    <Activity className={`w-5 h-5 ${statusColors[systemStatus]}`} />
                    <span className={`font-mono text-sm ${statusColors[systemStatus]}`}>
                      {systemStatus}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${threatColors[threatLevel]}`}>
                    THREAT: {threatLevel}
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Radio className="w-4 h-4" />
                    <span className="font-mono text-sm">{activeSensors}/{totalSensors}</span>
                  </div>
                </div>
              </div>

              {/* Module Navigation */}
              <div className="flex items-center gap-2">
                {moduleOptions.map((module) => {
                  const Icon = module.icon;
                  return (
                    <motion.button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        activeModule === module.id
                          ? `bg-${module.color}-600 text-white`
                          : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {module.name}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="h-[calc(100vh-5rem)] grid grid-cols-12 gap-6 p-6">
              {/* Left Panel - Threat Board & Intelligence */}
              <div className="col-span-3 space-y-6">
                <ThreatLevelBoard />
                <GlobalIntelligenceFeed />
              </div>

              {/* Center - 3D Globe/Map */}
              <div className="col-span-6 bg-slate-900 rounded-lg border border-green-500/30 overflow-hidden">
                <OpsCesiumViewer />
              </div>

              {/* Right Panel - Sensor Grid & Command Log */}
              <div className="col-span-3 space-y-6">
                <SensorGrid />
                <LiveCommandLog />
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-green-500/30 flex items-center justify-between px-6">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
                <div className="text-gray-400">
                  Last Update: {new Date().toLocaleTimeString()}
                </div>
                <div className="text-cyan-400">
                  Dominica Environmental Grid Online
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
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
          </motion.div>
        ) : (
          <motion.div
            key="normal-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 p-8"
          >
            {/* Normal Dashboard Preview */}
            <div className="text-center py-20">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900 rounded-lg border border-green-500/30">
                <Eye className="w-8 h-8 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Mission Control Standby</h2>
                  <p className="text-green-400">Click "ENTER OPS" to activate command interface</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpsCenter;