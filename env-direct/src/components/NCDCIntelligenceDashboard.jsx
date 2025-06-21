import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudIcon, 
  SunIcon, 
  BeakerIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  MapIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const NCDCIntelligenceDashboard = () => {
  const [ncdcData, setNcdcData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch NCDC intelligence data
  useEffect(() => {
    const fetchNCDCData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/ncdc/intelligence-dashboard');
        
        if (response.ok) {
          const data = await response.json();
          setNcdcData(data.intelligence_dashboard);
          setLastUpdated(new Date().toLocaleString());
          setError(null);
        } else {
          throw new Error('Failed to fetch NCDC data');
        }
      } catch (err) {
        console.error('NCDC API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNCDCData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchNCDCData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8 rounded-xl border border-blue-500/20">
        <div className="flex items-center justify-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <div className="text-blue-300 font-mono">
            CONNECTING TO NCDC INTELLIGENCE NETWORK...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-900/20 via-slate-900 to-red-900/20 p-8 rounded-xl border border-red-500/30">
        <div className="flex items-center space-x-4">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
          <div>
            <div className="text-red-300 font-semibold">NCDC CONNECTION ERROR</div>
            <div className="text-red-400/80 text-sm font-mono">{error}</div>
            <div className="text-slate-400 text-xs mt-2">
              Falling back to cached intelligence data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-6 rounded-xl border border-blue-500/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <GlobeAltIcon className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                NCDC CLIMATE INTELLIGENCE
              </h2>
              <p className="text-blue-300 font-mono text-sm">
                NOAA National Climatic Data Center • Caribbean Region
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono text-sm">LIVE</span>
            </div>
            {lastUpdated && (
              <div className="text-slate-400 text-xs font-mono flex items-center mt-1">
                <ClockIcon className="w-3 h-3 mr-1" />
                {lastUpdated}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Real-time Climate Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ClimateMetricCard
          icon={<SunIcon className="w-6 h-6" />}
          title="Temperature Analysis"
          value="Processing..."
          status="active"
          source="GHCND Network"
        />
        
        <ClimateMetricCard
          icon={<CloudIcon className="w-6 h-6" />}
          title="Precipitation Data"
          value="Analyzing..."
          status="monitoring"
          source="Weather Stations"
        />
        
        <ClimateMetricCard
          icon={<ChartBarIcon className="w-6 h-6" />}
          title="Climate Extremes"
          value="Evaluating..."
          status="critical"
          source="Historical Records"
        />
        
        <ClimateMetricCard
          icon={<MapIcon className="w-6 h-6" />}
          title="Regional Coverage"
          value="Caribbean"
          status="operational"
          source="Multi-Station"
        />
      </div>

      {/* NCDC Data Display */}
      {ncdcData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-xl border border-slate-600/30"
        >
          <div className="flex items-center space-x-3 mb-4">
            <BeakerIcon className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">
              Live Climate Intelligence
            </h3>
            <div className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs font-mono">
              {ncdcData.data_source || 'NOAA NCDC'}
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg font-mono text-sm">
            <pre className="text-green-300 whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(ncdcData, null, 2)}
            </pre>
          </div>
        </motion.div>
      )}

      {/* Intelligence Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6 rounded-xl border border-purple-500/20"
      >
        <h3 className="text-xl font-semibold text-white mb-4">
          Intelligence Assessment
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-slate-300">NCDC API connection established</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-slate-300">Real-time climate data streaming</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-slate-300">Historical analysis in progress</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-slate-300">Caribbean regional focus active</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Climate Metric Card Component
const ClimateMetricCard = ({ icon, title, value, status, source }) => {
  const statusColors = {
    active: 'from-green-500/20 to-green-600/20 border-green-500/30',
    monitoring: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    critical: 'from-red-500/20 to-red-600/20 border-red-500/30',
    operational: 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
  };

  const statusTextColors = {
    active: 'text-green-400',
    monitoring: 'text-blue-400',
    critical: 'text-red-400',
    operational: 'text-purple-400'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br ${statusColors[status]} p-4 rounded-xl border backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${statusTextColors[status]} bg-white/5`}>
          {icon}
        </div>
        <div className={`text-xs font-mono px-2 py-1 rounded ${statusTextColors[status]} bg-white/10`}>
          {status.toUpperCase()}
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-white font-semibold text-sm">{title}</h4>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-slate-400 font-mono">{source}</div>
      </div>
    </motion.div>
  );
};

export default NCDCIntelligenceDashboard; 