import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, 
  Thermometer, 
  Droplets, 
  Wind, 
  Zap,
  Camera,
  Waves,
  TreePine,
  CheckCircle,
  AlertCircle,
  XCircle,
  Activity,
  MapPin,
  Battery,
  Wifi,
  RefreshCw
} from 'lucide-react';

const SensorGrid = () => {
  const [sensors, setSensors] = useState([
    {
      id: 'LAY-001',
      name: 'Layou Weather Station',
      type: 'weather',
      location: 'Layou Valley',
      status: 'online',
      battery: 92,
      signal: 'strong',
      lastReading: '2.4°C, 78% humidity',
      coordinates: [15.3419, -61.4065],
      dataPoints: 1247,
      lastUpdate: new Date(Date.now() - 3 * 60 * 1000)
    },
    {
      id: 'CAR-005',
      name: 'Carib River Level',
      type: 'water',
      location: 'Calibishie',
      status: 'online',
      battery: 67,
      signal: 'moderate',
      lastReading: '1.8m depth, normal flow',
      coordinates: [15.6014, -61.3456],
      dataPoints: 892,
      lastUpdate: new Date(Date.now() - 8 * 60 * 1000)
    },
    {
      id: 'MORT-012',
      name: 'Morne Seismic Monitor',
      type: 'seismic',
      location: 'Morne Trois Pitons',
      status: 'warning',
      battery: 34,
      signal: 'weak',
      lastReading: '0.2 magnitude tremor',
      coordinates: [15.3181, -61.3456],
      dataPoints: 2156,
      lastUpdate: new Date(Date.now() - 25 * 60 * 1000)
    },
    {
      id: 'CHAM-008',
      name: 'Champagne Reef Cam',
      type: 'camera',
      location: 'Champagne Reef',
      status: 'online',
      battery: 89,
      signal: 'strong',
      lastReading: '28.4°C water temp',
      coordinates: [15.2876, -61.3912],
      dataPoints: 3421,
      lastUpdate: new Date(Date.now() - 1 * 60 * 1000)
    },
    {
      id: 'PORT-015',
      name: 'Portsmouth Air Quality',
      type: 'air',
      location: 'Portsmouth Bay',
      status: 'offline',
      battery: 12,
      signal: 'none',
      lastReading: 'AQI: 45 (Good)',
      coordinates: [15.5851, -61.4642],
      dataPoints: 567,
      lastUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 'SCOTT-021',
      name: 'Scott\'s Head Wave Monitor',
      type: 'marine',
      location: 'Scott\'s Head',
      status: 'online',
      battery: 78,
      signal: 'strong',
      lastReading: '1.2m wave height',
      coordinates: [15.1892, -61.3456],
      dataPoints: 1834,
      lastUpdate: new Date(Date.now() - 6 * 60 * 1000)
    }
  ]);

  const sensorIcons = {
    weather: Thermometer,
    water: Droplets,
    seismic: Activity,
    camera: Camera,
    air: Wind,
    marine: Waves,
    forest: TreePine
  };

  const statusColors = {
    online: {
      color: 'text-green-400',
      bg: 'bg-green-900/20',
      border: 'border-green-500/30',
      icon: CheckCircle
    },
    warning: {
      color: 'text-yellow-400',
      bg: 'bg-yellow-900/20',
      border: 'border-yellow-500/30',
      icon: AlertCircle
    },
    offline: {
      color: 'text-red-400',
      bg: 'bg-red-900/20',
      border: 'border-red-500/30',
      icon: XCircle
    }
  };

  const signalStrength = {
    strong: { bars: 4, color: 'text-green-400' },
    moderate: { bars: 3, color: 'text-yellow-400' },
    weak: { bars: 2, color: 'text-orange-400' },
    none: { bars: 0, color: 'text-red-400' }
  };

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => {
        // Don't update offline sensors
        if (sensor.status === 'offline') return sensor;
        
        const batteryChange = Math.random() > 0.8 ? -1 : 0;
        const newBattery = Math.max(0, sensor.battery + batteryChange);
        
        let newStatus = sensor.status;
        if (newBattery < 20) newStatus = 'warning';
        if (newBattery < 5) newStatus = 'offline';
        
        return {
          ...sensor,
          battery: newBattery,
          dataPoints: sensor.dataPoints + Math.floor(Math.random() * 3),
          lastUpdate: new Date()
        };
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date) => {
    const minutes = Math.floor((new Date() - date) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-green-400';
    if (battery > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const onlineSensors = sensors.filter(s => s.status === 'online').length;
  const warningSensors = sensors.filter(s => s.status === 'warning').length;
  const offlineSensors = sensors.filter(s => s.status === 'offline').length;

  return (
    <div className="bg-slate-900 rounded-lg border border-cyan-500/30 h-full">
      {/* Header */}
      <div className="p-4 border-b border-cyan-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Radio className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">SENSOR GRID</h3>
              <p className="text-xs text-cyan-400">NETWORK STATUS</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>
        
        {/* Status Summary */}
        <div className="flex items-center gap-4 mt-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400">{onlineSensors} Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-yellow-400">{warningSensors} Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-red-400">{offlineSensors} Offline</span>
          </div>
        </div>
      </div>

      {/* Sensor List */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {sensors.map((sensor, index) => {
          const Icon = sensorIcons[sensor.type] || Radio;
          const statusStyle = statusColors[sensor.status];
          const StatusIcon = statusStyle.icon;
          const signal = signalStrength[sensor.signal];

          return (
            <motion.div
              key={sensor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border ${statusStyle.bg} ${statusStyle.border} hover:bg-opacity-50 transition-all cursor-pointer group`}
            >
              {/* Sensor Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-slate-600 transition-colors">
                    <Icon className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{sensor.id}</span>
                      <StatusIcon className={`w-4 h-4 ${statusStyle.color}`} />
                    </div>
                    <div className="text-xs text-gray-300 truncate">{sensor.name}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{sensor.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sensor Status Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                <div>
                  <div className="text-gray-400">Battery</div>
                  <div className={`flex items-center gap-1 ${getBatteryColor(sensor.battery)}`}>
                    <Battery className="w-3 h-3" />
                    <span className="font-bold">{sensor.battery}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Signal</div>
                  <div className={`flex items-center gap-1 ${signal.color}`}>
                    <Wifi className="w-3 h-3" />
                    <div className="flex gap-0.5">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-2 rounded-sm ${
                            i < signal.bars ? 'bg-current' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Reading */}
              <div className="text-xs">
                <div className="text-gray-400">Last Reading</div>
                <div className="text-white font-mono">{sensor.lastReading}</div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700 text-xs">
                <div className="text-gray-400">
                  {formatTimeAgo(sensor.lastUpdate)}
                </div>
                <div className="text-cyan-400">
                  {sensor.dataPoints.toLocaleString()} readings
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-cyan-500/30">
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-400">
            Network Coverage: 94.7%
          </div>
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
            DEPLOY NEW SENSOR
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorGrid;