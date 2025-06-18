import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Flame,
  Droplets,
  TreePine,
  Fish,
  Zap,
  DollarSign,
  Activity,
  MapPin
} from 'lucide-react';

const GlobalIntelligenceFeed = () => {
  const [feedData, setFeedData] = useState([
    {
      id: 1,
      type: 'DEFORESTATION',
      region: 'Amazon Basin',
      metric: 'Forest Loss',
      value: 11247,
      unit: 'km²',
      change: -8.3,
      severity: 'high',
      source: 'PRODES/INPE',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      description: 'YTD deforestation rate exceeds 2023 levels'
    },
    {
      id: 2,
      type: 'CORAL_BLEACHING',
      region: 'Great Barrier Reef',
      metric: 'Bleaching Index',
      value: 72.4,
      unit: '%',
      change: 15.6,
      severity: 'critical',
      source: 'GBRMPA',
      timestamp: new Date(Date.now() - 32 * 60 * 1000),
      description: 'Mass bleaching event confirmed - Alert Level 3'
    },
    {
      id: 3,
      type: 'CARBON_MARKET',
      region: 'Global',
      metric: 'CO₂ Price',
      value: 94.75,
      unit: 'EUR/t',
      change: 2.8,
      severity: 'medium',
      source: 'ICE Futures',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      description: 'Carbon credits surge on EU policy announcement'
    },
    {
      id: 4,
      type: 'OCEAN_ACIDITY',
      region: 'North Pacific',
      metric: 'pH Level',
      value: 7.89,
      unit: 'pH',
      change: -0.12,
      severity: 'high',
      source: 'NOAA/PMEL',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      description: 'Ocean acidification accelerating in North Pacific'
    },
    {
      id: 5,
      type: 'WILDFIRE',
      region: 'California',
      metric: 'Active Fires',
      value: 23,
      unit: 'incidents',
      change: 8,
      severity: 'high',
      source: 'CAL FIRE',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      description: 'Red flag warnings issued across 6 counties'
    },
    {
      id: 6,
      type: 'GLACIAL_MELT',
      region: 'Greenland',
      metric: 'Ice Loss',
      value: 8.9,
      unit: 'Gt/day',
      change: 45.2,
      severity: 'critical',
      source: 'DMI/GEUS',
      timestamp: new Date(Date.now() - 67 * 60 * 1000),
      description: 'Record daily ice loss due to heat dome event'
    }
  ]);

  const typeIcons = {
    DEFORESTATION: TreePine,
    CORAL_BLEACHING: Fish,
    CARBON_MARKET: DollarSign,
    OCEAN_ACIDITY: Droplets,
    WILDFIRE: Flame,
    GLACIAL_MELT: Activity
  };

  const severityColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-orange-400',
    critical: 'text-red-400'
  };

  // Simulate real-time feed updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFeedData(prev => {
        // Update existing entries with new values
        const updated = prev.map(item => ({
          ...item,
          value: item.type === 'CARBON_MARKET' 
            ? parseFloat((item.value + (Math.random() - 0.5) * 2).toFixed(2))
            : parseFloat((item.value * (1 + (Math.random() - 0.5) * 0.02)).toFixed(1)),
          change: parseFloat(((Math.random() - 0.5) * 20).toFixed(1)),
          timestamp: new Date()
        }));
        
        return updated;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date) => {
    const minutes = Math.floor((new Date() - date) / 60000);
    if (minutes < 1) return 'LIVE';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-blue-500/30 h-full">
      {/* Header */}
      <div className="p-4 border-b border-blue-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">GLOBAL INTELLIGENCE</h3>
              <p className="text-xs text-blue-400">PLANETARY FEED</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">LIVE</span>
          </div>
        </div>
      </div>

      {/* Feed Items */}
      <div className="max-h-96 overflow-y-auto">
        {feedData.map((item, index) => {
          const Icon = typeIcons[item.type] || Activity;
          const isPositiveChange = item.change > 0;
          const ChangeIcon = isPositiveChange ? ArrowUpRight : ArrowDownRight;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 border-b border-gray-700 hover:bg-slate-800/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-600 transition-colors">
                    <Icon className="w-4 h-4 text-gray-300" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">
                        {item.type.replace('_', ' ')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 ${severityColors[item.severity]} bg-current`}>
                        {item.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{item.region}</span>
                      <span>•</span>
                      <span className="text-cyan-400">{item.source}</span>
                    </div>
                    
                    <div className="text-xs text-gray-300 mb-2">
                      {item.description}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-xs text-gray-400">{item.metric}</div>
                          <div className="text-lg font-bold text-white font-mono">
                            {item.value.toLocaleString()} {item.unit}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-gray-400">{formatTimeAgo(item.timestamp)}</div>
                        <div className={`flex items-center gap-1 ${isPositiveChange ? 'text-red-400' : 'text-green-400'}`}>
                          <ChangeIcon className="w-3 h-3" />
                          <span className="text-sm font-bold">
                            {Math.abs(item.change).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-blue-500/30">
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-400">
            Data sources: NOAA, ESA, NASA, IPCC, UNEP
          </div>
          <button className="text-blue-400 hover:text-blue-300 transition-colors">
            VIEW FULL INTELLIGENCE REPORT
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalIntelligenceFeed;