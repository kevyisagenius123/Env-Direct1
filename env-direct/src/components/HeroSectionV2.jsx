import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Activity, 
  Satellite, 
  Zap, 
  Eye, 
  TrendingUp,
  AlertTriangle,
  Shield,
  Radio,
  Thermometer
} from 'lucide-react';

// 🔥 ENVIRONMENT DIRECT 2.0: CINEMATIC HERO SECTION
// FAANG-grade component with Bloomberg Terminal + NASA Mission Control vibes

const HeroSectionV2 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveMetrics, setLiveMetrics] = useState({
    currentTemp: '28.5°C',
    humidity: '76%',
    activeSensors: '47',
    dataPoints: '2.3K',
    threatLevel: 'LOW',
    systemStatus: 'OPERATIONAL'
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.3, 0.8]);

  // Live data simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate live metric updates with realistic Dominica data
      setLiveMetrics(prev => ({
        ...prev,
        activeSensors: (Math.floor(Math.random() * 5) + 45).toString(),
        dataPoints: (Math.random() * 0.5 + 2.0).toFixed(1) + 'K',
        currentTemp: (28 + Math.random() * 4).toFixed(1) + '°C',
        humidity: (75 + Math.random() * 10).toFixed(0) + '%'
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Animated metrics tiles
  const MetricTile = ({ icon: Icon, label, value, status = 'normal', className = '' }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
      className={`bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${
          status === 'critical' ? 'text-red-400' :
          status === 'warning' ? 'text-yellow-400' :
          'text-envGreen-400'
        }`} />
        <div className={`text-xs px-2 py-1 rounded-full font-mono ${
          status === 'critical' ? 'bg-red-500/20 text-red-300' :
          status === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
          'bg-envGreen-500/20 text-envGreen-300'
        }`}>
          LIVE
        </div>
      </div>
      <div className="text-white/70 text-sm mb-1">{label}</div>
      <div className="text-white font-mono text-lg font-bold">{value}</div>
    </motion.div>
  );

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Cinematic Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-envGreen-900 via-envGreen-800 to-envGreen-700"
      >
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[size:20px_20px] animate-pulse"></div>
        </div>
        
        {/* Dynamic lighting effects */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-envGreen-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-envGreen-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </motion.div>

      {/* Overlay */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black/40"
      />

      {/* Command Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-mono">SYSTEM OPERATIONAL</span>
              </div>
              <div className="text-white/70">
                MISSION TIME: {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-white/70">THREAT LEVEL: 
                <span className="text-yellow-400 ml-1 font-mono">{liveMetrics.threatLevel}</span>
              </div>
              <div className="text-white/70">SENSORS: 
                <span className="text-green-400 ml-1 font-mono">{liveMetrics.activeSensors}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 w-full">
          
          {/* Left Column: Mission Statement */}
          <motion.div 
            style={{ y: textY }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <Globe className="w-4 h-4 mr-2 text-envGreen-200" />
              <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
                Environmental Consulting Services
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                Environment
                <br />
                <span className="bg-gradient-to-r from-envGreen-400 to-envGreen-300 bg-clip-text text-transparent">
                  Direct
                </span>
              </h1>
              
              <div className="text-xl lg:text-2xl text-white/80 max-w-2xl leading-relaxed">
                Dominica's environmental consulting platform. 
                <span className="text-envGreen-300 font-semibold"> Expert advisory services.</span>
                <span className="text-envGreen-200 font-semibold"> Environmental solutions.</span>
                <span className="text-white font-semibold"> Strategic guidance.</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/ops"
                className="group relative px-8 py-4 bg-gradient-to-r from-envGreen-600 to-envGreen-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-envGreen-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-envGreen-400 to-envGreen-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  ENTER COMMAND CENTER
                </span>
              </Link>
              
              <Link
                to="/intelligence"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  INTELLIGENCE BRIEFING
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Live Data Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Status Board */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-bold">MISSION CONTROL</h3>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm font-mono">LIVE DATA</span>
                </div>
              </div>

              {/* Live Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <MetricTile 
                  icon={Thermometer}
                  label="Temperature"
                  value={liveMetrics.currentTemp}
                  status="normal"
                />
                <MetricTile 
                  icon={Radio}
                  label="Humidity"
                  value={liveMetrics.humidity}
                  status="normal"
                />
                <MetricTile 
                  icon={Satellite}
                  label="Active Sensors"
                  value={liveMetrics.activeSensors}
                  status="normal"
                />
                <MetricTile 
                  icon={TrendingUp}
                  label="Data Points"
                  value={liveMetrics.dataPoints}
                  status="normal"
                />
              </div>

              {/* System Status */}
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">System Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-mono text-sm">ALL SYSTEMS OPERATIONAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Environmental Status */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h4 className="text-white/70 text-sm uppercase tracking-wider mb-4">Environmental Status</h4>
              <div className="space-y-3 text-white/60 text-sm">
                <div className="flex justify-between items-center">
                  <span>Air Quality Index</span>
                  <span className="text-envGreen-300 font-mono">Good (42)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Water Quality</span>
                  <span className="text-envGreen-300 font-mono">Excellent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Forest Coverage</span>
                  <span className="text-envGreen-300 font-mono">65.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rainfall (24h)</span>
                  <span className="text-blue-300 font-mono">12.4mm</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSectionV2;
