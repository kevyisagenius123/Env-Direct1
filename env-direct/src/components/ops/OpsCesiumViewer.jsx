import React, { useEffect, useRef, useState } from 'react';
// Temporarily disable Cesium imports to avoid dependency issues
// import { Viewer, Entity, CzmlDataSource, PointGraphics, LabelGraphics } from 'resium';
// import * as Cesium from 'cesium';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Radio, 
  Camera, 
  Droplets, 
  Activity,
  Satellite,
  Target,
  Layers,
  Globe,
  MapPin,
  Zap,
  Signal
} from 'lucide-react';

const OpsCesiumViewer = () => {
  const [viewMode, setViewMode] = useState('sensors');
  const [activeLayer, setActiveLayer] = useState('all');
  const mapRef = useRef(null);
  
  const sensorData = [
    {
      id: 'LAY-001',
      name: 'Layou Weather Station',
      position: { lat: 15.3419, lng: -61.4065 },
      type: 'weather',
      status: 'online',
      threat: null
    },
    {
      id: 'MORT-012',
      name: 'Morne Seismic Monitor',
      position: { lat: 15.3181, lng: -61.3456 },
      type: 'seismic',
      status: 'warning',
      threat: 'landslide'
    },
    {
      id: 'CHAM-008',
      name: 'Champagne Reef Cam',
      position: { lat: 15.2876, lng: -61.3912 },
      type: 'camera',
      status: 'online',
      threat: 'bleaching'
    },
    {
      id: 'PORT-015',
      name: 'Portsmouth Air Quality',
      position: { lat: 15.5851, lng: -61.4642 },
      type: 'air',
      status: 'offline',
      threat: null
    }
  ];

  const threatZones = [
    {
      id: 'flood-zone-1',
      name: 'Layou River Flood Zone',
      position: { lat: 15.340, lng: -61.410 },
      level: 'RED'
    },
    {
      id: 'coral-zone-1',
      name: 'Champagne Reef Bleaching',
      position: { lat: 15.2876, lng: -61.3902 },
      level: 'ORANGE'
    }
  ];

  const viewModes = [
    { id: 'sensors', name: 'SENSORS', icon: Radio },
    { id: 'threats', name: 'THREATS', icon: AlertTriangle },
    { id: 'satellite', name: 'SATELLITE', icon: Satellite },
    { id: 'tactical', name: 'TACTICAL', icon: Target }
  ];

  const layerOptions = [
    { id: 'all', name: 'ALL LAYERS' },
    { id: 'environmental', name: 'ENVIRONMENTAL' },
    { id: 'geological', name: 'GEOLOGICAL' },
    { id: 'marine', name: 'MARINE' },
    { id: 'atmospheric', name: 'ATMOSPHERIC' }
  ];

  const sensorIcons = {
    weather: Activity,
    seismic: Activity,
    camera: Camera,
    air: Signal,
    marine: Droplets
  };

  const statusColors = {
    online: 'bg-green-500',
    warning: 'bg-yellow-500',
    offline: 'bg-red-500'
  };

  const threatLevelColors = {
    RED: 'bg-red-500',
    ORANGE: 'bg-orange-500',
    YELLOW: 'bg-yellow-500'
  };

  return (
    <div className="h-full relative bg-slate-950 rounded-lg overflow-hidden">
      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-3">
        {/* View Mode Selector */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg border border-green-500/30 p-3">
          <div className="text-xs text-green-400 font-bold mb-2">VIEW MODE</div>
          <div className="grid grid-cols-2 gap-2">
            {viewModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <motion.button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`px-3 py-2 rounded text-xs font-bold transition-all ${
                    viewMode === mode.id
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-1">
                    <Icon className="w-3 h-3" />
                    <span>{mode.name}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Layer Control */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg border border-blue-500/30 p-3">
          <div className="text-xs text-blue-400 font-bold mb-2">LAYERS</div>
          <select
            value={activeLayer}
            onChange={(e) => setActiveLayer(e.target.value)}
            className="w-full bg-slate-800 text-white text-xs rounded border border-gray-600 px-2 py-1"
          >
            {layerOptions.map((layer) => (
              <option key={layer.id} value={layer.id}>
                {layer.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status Panel */}
      <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-3">
        <div className="text-xs text-cyan-400 font-bold mb-2">LIVE STATUS</div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Sensors Active:</span>
            <span className="text-green-400 font-bold">42/48</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Threats:</span>
            <span className="text-red-400 font-bold">4 ACTIVE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Coverage:</span>
            <span className="text-cyan-400 font-bold">94.7%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Sat Link:</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-purple-500/30 p-3">
        <div className="text-xs text-purple-400 font-bold mb-2">LEGEND</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-300">Online Sensors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-gray-300">Warning Status</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-gray-300">Critical/Offline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400/30 border border-red-400"></div>
            <span className="text-gray-300">Threat Zones</span>
          </div>
        </div>
      </div>

      {/* Simplified Map Display - Dominica Outline */}
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-green-950">
        <div className="relative">
          {/* Dominica Island Representation */}
          <div className="relative w-80 h-96 bg-green-800/20 rounded-lg border-2 border-green-500/30 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-blue-900/50"></div>
            
            {/* Island Shape Outline */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 384">
              <path
                d="M160 20 C200 25, 250 60, 270 120 C280 180, 260 240, 240 280 C200 350, 120 360, 80 320 C40 280, 30 220, 50 160 C70 100, 120 25, 160 20 Z"
                fill="rgba(34, 197, 94, 0.1)"
                stroke="rgba(34, 197, 94, 0.5)"
                strokeWidth="2"
              />
            </svg>
            
            {/* Sensor Markers */}
            {sensorData.map((sensor, index) => {
              const Icon = sensorIcons[sensor.type] || Radio;
              // Convert lat/lng to relative positions within the island shape
              const x = ((sensor.position.lng + 61.5) / 0.5) * 320;
              const y = ((15.6 - sensor.position.lat) / 0.5) * 384;
              
              return (
                <motion.div
                  key={sensor.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${Math.max(10, Math.min(90, (x/320)*100))}%`, top: `${Math.max(10, Math.min(90, (y/384)*100))}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.3 }}
                >
                  <div className={`w-6 h-6 rounded-full ${statusColors[sensor.status]} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    {sensor.id}
                  </div>
                  {sensor.status === 'online' && (
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
                  )}
                </motion.div>
              );
            })}
            
            {/* Threat Zone Overlays */}
            {threatZones.map((zone, index) => {
              // Convert lat/lng to relative positions
              const x = ((zone.position.lng + 61.5) / 0.5) * 320;
              const y = ((15.6 - zone.position.lat) / 0.5) * 384;
              
              return (
                <motion.div
                  key={zone.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${Math.max(10, Math.min(90, (x/320)*100))}%`, top: `${Math.max(10, Math.min(90, (y/384)*100))}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.3 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full ${threatLevelColors[zone.level]}/20 border-2 ${threatLevelColors[zone.level].replace('bg-', 'border-')} flex items-center justify-center`}
                    animate={{
                      scale: zone.level === 'RED' ? [1, 1.2, 1] : [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </motion.div>
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {zone.level} THREAT
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Dominica Label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <h3 className="text-lg font-bold text-white">DOMINICA</h3>
            <p className="text-sm text-green-400">Environmental Monitoring Grid</p>
          </div>
        </div>
      </div>

      {/* Pulse Animation Overlay for Critical Threats */}
      <div className="absolute inset-0 pointer-events-none">
        {threatZones.filter(zone => zone.level === 'RED').map((zone) => (
          <motion.div
            key={`pulse-${zone.id}`}
            className="absolute inset-0"
            animate={{
              backgroundColor: ['rgba(239, 68, 68, 0)', 'rgba(239, 68, 68, 0.05)', 'rgba(239, 68, 68, 0)']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OpsCesiumViewer;