import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  Flame, 
  Droplets, 
  Wind, 
  TreePine,
  Fish,
  MapPin,
  Clock,
  Users,
  ArrowUp,
  ArrowDown,
  ExternalLink
} from 'lucide-react';

const ThreatLevelBoard = () => {
  const [threats, setThreats] = useState([
    {
      id: 1,
      level: 'RED',
      type: 'FLASH_FLOOD',
      location: 'Layou River Basin',
      severity: 9.2,
      timeToImpact: '2.3 hrs',
      affected: 1420,
      trend: 'up',
      description: 'Extreme rainfall detected upstream',
      coordinates: [15.3419, -61.4065],
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      level: 'ORANGE',
      type: 'LANDSLIDE_RISK',
      location: 'Morne Trois Pitons',
      severity: 7.8,
      timeToImpact: '6.8 hrs',
      affected: 340,
      trend: 'stable',
      description: 'Soil saturation critical threshold',
      coordinates: [15.3181, -61.3456],
      lastUpdate: new Date(Date.now() - 12 * 60 * 1000)
    },
    {
      id: 3,
      level: 'ORANGE',
      type: 'CORAL_BLEACHING',
      location: 'Champagne Reef',
      severity: 6.4,
      timeToImpact: 'Ongoing',
      affected: 850,
      trend: 'up',
      description: 'Water temperature anomaly +2.3°C',
      coordinates: [15.2876, -61.3912],
      lastUpdate: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: 4,
      level: 'YELLOW',
      type: 'PLASTIC_POLLUTION',
      location: 'Portsmouth Bay',
      severity: 4.2,
      timeToImpact: 'N/A',
      affected: 120,
      trend: 'down',
      description: 'Marine debris concentration spike',
      coordinates: [15.5851, -61.4642],
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]);

  const threatIcons = {
    FLASH_FLOOD: Droplets,
    LANDSLIDE_RISK: AlertTriangle,
    CORAL_BLEACHING: Fish,
    PLASTIC_POLLUTION: Shield,
    DEFORESTATION: TreePine,
    WILDFIRE: Flame,
    STORM_SURGE: Wind
  };

  const levelColors = {
    RED: {
      bg: 'bg-red-900/30',
      border: 'border-red-500',
      text: 'text-red-400',
      accent: 'bg-red-500'
    },
    ORANGE: {
      bg: 'bg-orange-900/30',
      border: 'border-orange-500',
      text: 'text-orange-400',
      accent: 'bg-orange-500'
    },
    YELLOW: {
      bg: 'bg-yellow-900/30',
      border: 'border-yellow-500',
      text: 'text-yellow-400',
      accent: 'bg-yellow-500'
    },
    GREEN: {
      bg: 'bg-green-900/30',
      border: 'border-green-500',
      text: 'text-green-400',
      accent: 'bg-green-500'
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setThreats(prev => prev.map(threat => ({
        ...threat,
        severity: Math.max(0, Math.min(10, threat.severity + (Math.random() - 0.5) * 0.3)),
        affected: Math.max(0, threat.affected + Math.floor((Math.random() - 0.5) * 20)),
        lastUpdate: new Date()
      })));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date) => {
    const minutes = Math.floor((new Date() - date) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-red-500/30 h-full">
      {/* Header */}
      <div className="p-4 border-b border-red-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">THREAT ASSESSMENT</h3>
              <p className="text-xs text-red-400">SITUATION BOARD</p>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            ACTIVE: {threats.length}
          </div>
        </div>
      </div>

      {/* Threat List */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {threats.map((threat, index) => {
          const Icon = threatIcons[threat.type] || AlertTriangle;
          const colors = levelColors[threat.level];
          const TrendIcon = threat.trend === 'up' ? ArrowUp : threat.trend === 'down' ? ArrowDown : null;

          return (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border ${colors.bg} ${colors.border} hover:bg-opacity-50 transition-all cursor-pointer group`}
            >
              {/* Threat Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${colors.accent}/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${colors.accent} text-white`}>
                        {threat.level}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {threat.type.replace('_', ' ')}
                      </span>
                      {TrendIcon && (
                        <TrendIcon className={`w-4 h-4 ${colors.text}`} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-300">{threat.location}</span>
                    </div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Threat Details */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-gray-400">SEVERITY</div>
                  <div className={`font-bold ${colors.text}`}>
                    {threat.severity.toFixed(1)}/10
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">IMPACT TIME</div>
                  <div className="text-white font-mono">
                    {threat.timeToImpact}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">AFFECTED</div>
                  <div className="text-cyan-400 font-bold">
                    {threat.affected.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-2 text-xs text-gray-300 border-t border-gray-700 pt-2">
                {threat.description}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(threat.lastUpdate)}
                </div>
                <div className="flex items-center gap-1 text-xs text-cyan-400">
                  <Users className="w-3 h-3" />
                  Response Team Alpha
                </div>
              </div>

              {/* Severity Bar */}
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <div 
                  className={`h-1 rounded-full ${colors.accent} transition-all duration-500`}
                  style={{ width: `${threat.severity * 10}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-red-500/30">
        <div className="flex items-center justify-between">
          <button className="text-xs text-gray-400 hover:text-white transition-colors">
            VIEW ALL THREATS
          </button>
          <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
            BRIEF COMMANDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreatLevelBoard;