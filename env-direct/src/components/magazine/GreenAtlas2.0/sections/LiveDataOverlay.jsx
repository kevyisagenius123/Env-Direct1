// 📡 LIVE DATA OVERLAY - Bloomberg Terminal Environmental Intelligence
// Real-time WebSocket data feeds with enterprise-grade monitoring

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { 
  Satellite, 
  Thermometer, 
  Droplets, 
  Wind, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// 🌡️ LIVE ENVIRONMENTAL METRICS
const LiveMetricCard = ({ icon: Icon, title, value, unit, trend, status, lastUpdated }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-orange-400';
      case 'normal': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };
  
  const getTrendIcon = (trend) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-red-400" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-green-400" />;
    return <div className="w-4 h-4" />;
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/60 backdrop-blur-xl rounded-lg p-4 border border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-5 h-5 ${getStatusColor(status)}`} />
        <div className="flex items-center gap-1">
          {getTrendIcon(trend)}
          <span className="text-xs font-mono text-slate-400">LIVE</span>
        </div>
      </div>
      
      <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
      
      <div className="flex items-baseline gap-2 mb-2">
        <span className={`text-2xl font-mono font-bold ${getStatusColor(status)}`}>
          {value}
        </span>
        <span className="text-slate-400 text-sm">{unit}</span>
      </div>
      
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span>Updated {lastUpdated}s ago</span>
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          status === 'critical' ? 'bg-red-400' :
          status === 'warning' ? 'bg-orange-400' : 'bg-green-400'
        }`} />
      </div>
    </motion.div>
  );
};

// 📈 REAL-TIME CHART COMPONENT WITH ECHARTS
const RealTimeChart = ({ title, data, type = 'line' }) => {
  const chartOptions = useMemo(() => {
    const baseOptions = {
      title: {
        text: title,
        textStyle: {
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 'bold'
        },
        left: 'center'
      },
      backgroundColor: 'transparent',
      animation: {
        duration: 1000,
        easing: 'cubicInOut'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '20%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#374151',
        textStyle: { color: '#e2e8f0' }
      }
    };

    if (type === 'line') {
      return {
        ...baseOptions,
        xAxis: {
          type: 'category',
          data: data.labels || [],
          axisLine: { lineStyle: { color: '#374151' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#374151' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 },
          splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [{
          name: title,
          type: 'line',
          data: data.values || [],
          smooth: true,
          lineStyle: { color: '#10b981', width: 2 },
          areaStyle: { 
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#10b98140' },
                { offset: 1, color: '#10b98110' }
              ]
            }
          }
        }]
      };
    } else if (type === 'bar') {
      return {
        ...baseOptions,
        xAxis: {
          type: 'category',
          data: data.labels || [],
          axisLine: { lineStyle: { color: '#374151' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#374151' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 },
          splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [{
          name: title,
          type: 'bar',
          data: data.values || [],
          itemStyle: { color: '#10b981' }
        }]
      };
    } else if (type === 'doughnut') {
      return {
        ...baseOptions,
        series: [{
          name: title,
          type: 'pie',
          radius: ['40%', '70%'],
          data: (data.labels || []).map((label, index) => ({
            value: data.values[index] || 0,
            name: label,
            itemStyle: { color: `hsl(${index * 60}, 70%, 60%)` }
          }))
        }]
      };
    }

    return baseOptions;
  }, [title, data, type]);
  
  return (
    <div className="bg-black/60 backdrop-blur-xl rounded-lg p-4 border border-slate-700/50 h-64">
      <ReactECharts 
        option={chartOptions}
        style={{ height: '100%', width: '100%' }}
        theme="dark"
      />
    </div>
  );
};

// 🌐 GLOBAL CLIMATE STATUS BOARD
const GlobalStatusBoard = ({ metrics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/80 backdrop-blur-xl rounded-lg p-6 border border-slate-700/50 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Satellite className="w-6 h-6 text-envGreen-400" />
          Global Environmental Status
        </h2>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-mono text-sm">SYSTEMS ONLINE</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <LiveMetricCard
          icon={Thermometer}
          title="Global Temperature"
          value={metrics.globalTemp}
          unit="°C anomaly"
          trend={0.12}
          status="warning"
          lastUpdated={3}
        />
        <LiveMetricCard
          icon={Wind}
          title="CO₂ Concentration"
          value={metrics.co2}
          unit="ppm"
          trend={0.25}
          status="critical"
          lastUpdated={1}
        />
        <LiveMetricCard
          icon={Droplets}
          title="Sea Level Rise"
          value={metrics.seaLevel}
          unit="mm/year"
          trend={0.08}
          status="warning"
          lastUpdated={5}
        />
        <LiveMetricCard
          icon={Zap}
          title="Renewable Energy"
          value={metrics.renewable}
          unit="% of grid"
          trend={-0.03}
          status="normal"
          lastUpdated={2}
        />
      </div>
    </motion.div>
  );
};

// 🚨 EMERGENCY ALERTS TICKER
const EmergencyAlertsTicker = ({ alerts }) => {
  const [currentAlert, setCurrentAlert] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % alerts.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [alerts.length]);
  
  if (!alerts.length) return null;
  
  return (
    <motion.div
      layout
      className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-4"
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
        <span className="text-red-400 font-mono text-sm">BREAKING</span>
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentAlert}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white text-sm"
            >
              {alerts[currentAlert]?.message}
            </motion.p>
          </AnimatePresence>
        </div>
        <span className="text-red-400 text-xs">
          {alerts[currentAlert]?.timestamp}
        </span>
      </div>
    </motion.div>
  );
};

// 📡 SATELLITE DATA FEED
const SatelliteDataFeed = ({ feeds }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Satellite className="w-4 h-4 text-envGreen-400" />
        Satellite Data Feeds
      </h3>
      
      {feeds.map((feed, index) => (
        <motion.div
          key={feed.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-slate-800/50 rounded p-3 border border-slate-700/30"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-envGreen-400 font-mono text-xs">{feed.satellite}</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">ACTIVE</span>
            </div>
          </div>
          
          <p className="text-white text-sm mb-1">{feed.location}</p>
          <p className="text-slate-400 text-xs">{feed.data}</p>
          
          <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
            <span>Resolution: {feed.resolution}</span>
            <span>{feed.updated}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// 🚀 MAIN LIVE DATA OVERLAY COMPONENT
const LiveDataOverlay = ({ performanceMetrics }) => {
  const [liveMetrics, setLiveMetrics] = useState({
    globalTemp: '+1.23',
    co2: '421.78',
    seaLevel: '+3.2',
    renewable: '31.4'
  });
  
  const [chartData, setChartData] = useState({
    temperature: {
      labels: [],
      values: []
    },
    co2: {
      labels: [],
      values: []
    }
  });
  
  const [emergencyAlerts] = useState([
    {
      id: 1,
      message: "Antarctic ice shelf collapse detected by Landsat-9 satellite imagery",
      timestamp: "2 min ago",
      severity: "critical"
    },
    {
      id: 2,
      message: "Unprecedented coral bleaching event underway in Great Barrier Reef",
      timestamp: "15 min ago",
      severity: "high"
    },
    {
      id: 3,
      message: "Amazon deforestation rate increases 23% in Q1 2024",
      timestamp: "1 hr ago",
      severity: "high"
    }
  ]);
  
  const [satelliteFeeds] = useState([
    {
      id: 'landsat-9',
      satellite: 'LANDSAT-9',
      location: 'Antarctic Peninsula',
      data: 'Ice shelf monitoring - Larsen C',
      resolution: '30m',
      updated: '3 min ago'
    },
    {
      id: 'modis-terra',
      satellite: 'MODIS/TERRA',
      location: 'Amazon Basin',
      data: 'Forest cover analysis',
      resolution: '250m',
      updated: '8 min ago'
    },
    {
      id: 'sentinel-2',
      satellite: 'SENTINEL-2',
      location: 'Great Barrier Reef',
      data: 'Ocean temperature mapping',
      resolution: '10m',
      updated: '12 min ago'
    }
  ]);
  
  // 🔄 SIMULATE LIVE DATA UPDATES
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
      // Update live metrics
      setLiveMetrics(prev => ({
        globalTemp: (parseFloat(prev.globalTemp) + (Math.random() - 0.5) * 0.02).toFixed(2),
        co2: (parseFloat(prev.co2) + (Math.random() - 0.5) * 0.1).toFixed(2),
        seaLevel: (parseFloat(prev.seaLevel) + (Math.random() - 0.5) * 0.05).toFixed(1),
        renewable: (parseFloat(prev.renewable) + (Math.random() - 0.5) * 0.3).toFixed(1)
      }));
      
      // Update chart data
      setChartData(prev => {
        const newTemp = {
          labels: [...prev.temperature.labels.slice(-19), now.toLocaleTimeString()],
          values: [...prev.temperature.values.slice(-19), parseFloat(liveMetrics.globalTemp)]
        };
        
        const newCO2 = {
          labels: [...prev.co2.labels.slice(-19), now.toLocaleTimeString()],
          values: [...prev.co2.values.slice(-19), parseFloat(liveMetrics.co2)]
        };
        
        return {
          temperature: newTemp,
          co2: newCO2
        };
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [liveMetrics]);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      <div className="container mx-auto px-6 py-4 pointer-events-auto">
        
        {/* Emergency Alerts */}
        <EmergencyAlertsTicker alerts={emergencyAlerts} />
        
        {/* Global Status Board */}
        <GlobalStatusBoard metrics={liveMetrics} />
        
        {/* Data Visualization Grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          
          {/* Temperature Chart */}
          <RealTimeChart
            title="Global Temperature Anomaly"
            data={chartData.temperature}
            type="line"
          />
          
          {/* CO2 Chart */}
          <RealTimeChart
            title="CO₂ Concentration"
            data={chartData.co2}
            type="line"
          />
          
          {/* Satellite Data Feed */}
          <div className="bg-black/60 backdrop-blur-xl rounded-lg p-4 border border-slate-700/50">
            <SatelliteDataFeed feeds={satelliteFeeds} />
          </div>
        </div>
        
        {/* Performance Metrics (Dev Only) */}
        {process.env.NODE_ENV === 'development' && performanceMetrics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 bg-black/80 rounded p-3 text-xs font-mono text-green-400"
          >
            FCP: {performanceMetrics.fcp}ms | LCP: {performanceMetrics.lcp}ms | 
            CLS: {performanceMetrics.cls} | FID: {performanceMetrics.fid}ms
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LiveDataOverlay;
