// 🌍 INTERACTIVE 3D EARTH - Cesium.js Environmental Data Visualization
// Bloomberg Terminal meets NASA Mission Control for climate data

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Viewer, Entity, EntityDescription, PointGraphics, LabelGraphics } from 'resium';
import { 
  Cartesian3, 
  Color, 
  IonResource, 
  createWorldTerrain,
  Math as CesiumMath
} from 'cesium';
import { Satellite, Thermometer, Droplets, Wind, Zap } from 'lucide-react';

// 🎯 ENVIRONMENTAL HOTSPOT DATA
const ENVIRONMENTAL_HOTSPOTS = [
  {
    id: 'arctic-ice',
    position: Cartesian3.fromDegrees(-45.0, 78.0, 100000),
    title: 'Arctic Ice Loss',
    description: 'Critical ice sheet melting detected',
    severity: 'critical',
    data: { temp: '+3.2°C', ice_loss: '23%', timeline: '2020-2024' },
    category: 'ice'
  },
  {
    id: 'amazon-fires',
    position: Cartesian3.fromDegrees(-60.0, -3.0, 50000),
    title: 'Amazon Deforestation',
    description: 'Accelerated forest clearing',
    severity: 'high',
    data: { area: '11,568 km²', species: '-2,847', carbon: '+890M tons' },
    category: 'forest'
  },
  {
    id: 'coral-bleaching',
    position: Cartesian3.fromDegrees(145.0, -16.0, 10000),
    title: 'Great Barrier Reef',
    description: 'Mass coral bleaching event',
    severity: 'critical',
    data: { bleached: '67%', temp: '+2.1°C', recovery: '12+ years' },
    category: 'ocean'
  },
  {
    id: 'sahara-expansion',
    position: Cartesian3.fromDegrees(15.0, 20.0, 75000),
    title: 'Sahara Desert Expansion',
    description: 'Desertification accelerating',
    severity: 'medium',
    data: { expansion: '+8%', rainfall: '-35%', affected: '2.3M people' },
    category: 'desert'
  },
  {
    id: 'himalayan-glaciers',
    position: Cartesian3.fromDegrees(84.0, 28.0, 200000),
    title: 'Himalayan Glaciers',
    description: 'Third pole ice retreat',
    severity: 'high',
    data: { retreat: '45m/year', water: '1.9B people', timeline: '2000-2024' },
    category: 'ice'
  }
];

// 📊 REAL-TIME DATA PANEL
const DataPanel = ({ selectedHotspot, globalMetrics }) => {
  if (!selectedHotspot) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 right-6 bg-black/90 backdrop-blur-xl rounded-lg p-6 border border-envGreen-500/30 min-w-80"
      >
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Satellite className="w-5 h-5 text-envGreen-400" />
          Global Environmental Status
        </h3>
        
        <div className="space-y-3">
          {Object.entries(globalMetrics).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-slate-300 capitalize">{key.replace('_', ' ')}</span>
              <span className="text-envGreen-400 font-mono">{value}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            Click on hotspots to view detailed analysis
          </p>
        </div>
      </motion.div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getSeverityIcon = (category) => {
    switch (category) {
      case 'ice': return <Thermometer className="w-5 h-5" />;
      case 'ocean': return <Droplets className="w-5 h-5" />;
      case 'forest': return <Wind className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      key={selectedHotspot.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="absolute top-6 right-6 bg-black/90 backdrop-blur-xl rounded-lg p-6 border border-envGreen-500/30 min-w-80"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={getSeverityColor(selectedHotspot.severity)}>
          {getSeverityIcon(selectedHotspot.category)}
        </div>
        <h3 className="text-white font-bold">{selectedHotspot.title}</h3>
      </div>
      
      <p className="text-slate-300 mb-4">{selectedHotspot.description}</p>
      
      <div className="space-y-3 mb-4">
        {Object.entries(selectedHotspot.data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-slate-400 capitalize">{key.replace('_', ' ')}</span>
            <span className={`font-mono ${getSeverityColor(selectedHotspot.severity)}`}>
              {value}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          selectedHotspot.severity === 'critical' ? 'bg-red-400' :
          selectedHotspot.severity === 'high' ? 'bg-orange-400' :
          'bg-yellow-400'
        }`} />
        <span className={`text-sm font-mono uppercase ${getSeverityColor(selectedHotspot.severity)}`}>
          {selectedHotspot.severity} PRIORITY
        </span>
      </div>
    </motion.div>
  );
};

// 🎮 CESIUM CONTROLS
const CesiumControls = ({ viewer, onViewChange }) => {
  const [currentView, setCurrentView] = useState('global');
  
  const viewPresets = {
    global: {
      position: Cartesian3.fromDegrees(0, 0, 20000000),
      heading: 0,
      pitch: -90,
      roll: 0
    },
    arctic: {
      position: Cartesian3.fromDegrees(-45.0, 78.0, 2000000),
      heading: 0,
      pitch: -45,
      roll: 0
    },
    amazon: {
      position: Cartesian3.fromDegrees(-60.0, -3.0, 1000000),
      heading: 0,
      pitch: -45,
      roll: 0
    },
    pacific: {
      position: Cartesian3.fromDegrees(145.0, -16.0, 500000),
      heading: 0,
      pitch: -30,
      roll: 0
    }
  };
  
  const handleViewChange = (viewName) => {
    if (viewer && viewPresets[viewName]) {
      viewer.camera.setView(viewPresets[viewName]);
      setCurrentView(viewName);
      onViewChange(viewName);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-xl rounded-lg p-4 border border-envGreen-500/30"
    >
      <h4 className="text-white font-semibold mb-3">Quick Views</h4>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(viewPresets).map(view => (
          <button
            key={view}
            onClick={() => handleViewChange(view)}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              currentView === view 
                ? 'bg-envGreen-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// 🌍 MAIN INTERACTIVE EARTH COMPONENT
const InteractiveEarth3D = ({ onViewportEnter }) => {
  const earthRef = useRef(null);
  const viewerRef = useRef(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [globalMetrics, setGlobalMetrics] = useState({
    co2_ppm: 421.78,
    global_temp: '+1.23°C',
    sea_level: '+3.2mm/year',
    deforestation: '10.3M ha/year',
    species_lost: '8,734 (2024)'
  });
  
  const isInView = useInView(earthRef, { threshold: 0.3 });
  
  // 🎯 CESIUM CONFIGURATION
  const cesiumConfig = useMemo(() => ({
    terrainProvider: createWorldTerrain(),
    imageryProvider: new IonResource.fromAssetId(3954),
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false
  }), []);
  
  // ⏰ LIVE METRICS UPDATES
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalMetrics(prev => ({
        ...prev,
        co2_ppm: (421.78 + Math.random() * 0.2 - 0.1).toFixed(2),
        global_temp: `+${(1.23 + Math.random() * 0.1 - 0.05).toFixed(2)}°C`,
        sea_level: `+${(3.2 + Math.random() * 0.2 - 0.1).toFixed(1)}mm/year`
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // 📡 VIEWPORT TRACKING
  useEffect(() => {
    if (isInView && onViewportEnter) {
      onViewportEnter();
    }
  }, [isInView, onViewportEnter]);
  
  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
    
    // Fly to location
    if (viewerRef.current) {
      viewerRef.current.camera.flyTo({
        destination: Cartesian3.fromDegrees(
          hotspot.position.x, 
          hotspot.position.y, 
          500000
        ),
        duration: 2
      });
    }
  };
  
  const getPointColor = (severity) => {
    switch (severity) {
      case 'critical': return Color.RED;
      case 'high': return Color.ORANGE;
      case 'medium': return Color.YELLOW;
      default: return Color.GREEN;
    }
  };
  
  return (
    <section ref={earthRef} className="relative h-screen bg-black">
      
      {/* 🌍 CESIUM 3D EARTH */}
      <div className="absolute inset-0">
        <Viewer 
          ref={viewerRef}
          {...cesiumConfig}
          className="w-full h-full"
        >
          {ENVIRONMENTAL_HOTSPOTS.map(hotspot => (
            <Entity
              key={hotspot.id}
              position={hotspot.position}
              onClick={() => handleHotspotClick(hotspot)}
            >
              <PointGraphics
                pixelSize={15}
                color={getPointColor(hotspot.severity)}
                outlineColor={Color.WHITE}
                outlineWidth={2}
                heightReference={1}
                disableDepthTestDistance={Number.POSITIVE_INFINITY}
              />
              <LabelGraphics
                text={hotspot.title}
                font="12pt sans-serif"
                pixelOffset={new Cartesian3(0, -50, 0)}
                fillColor={Color.WHITE}
                outlineColor={Color.BLACK}
                outlineWidth={2}
                style={0}
                showBackground={true}
                backgroundColor={Color.BLACK.withAlpha(0.7)}
              />
              <EntityDescription>
                <div>
                  <h3>{hotspot.title}</h3>
                  <p>{hotspot.description}</p>
                </div>
              </EntityDescription>
            </Entity>
          ))}
        </Viewer>
      </div>
      
      {/* 📊 DATA OVERLAY PANELS */}
      <DataPanel 
        selectedHotspot={selectedHotspot} 
        globalMetrics={globalMetrics} 
      />
      
      {/* 🎮 NAVIGATION CONTROLS */}
      <CesiumControls
        viewer={viewerRef.current}
        onViewChange={(view) => console.log(`Switched to ${view} view`)}
      />
      
      {/* 📍 LEGEND */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 bg-black/90 backdrop-blur-xl rounded-lg p-4 border border-envGreen-500/30"
      >
        <h4 className="text-white font-semibold mb-3">Environmental Hotspots</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-sm text-slate-300">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span className="text-sm text-slate-300">High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-sm text-slate-300">Medium Priority</span>
          </div>
        </div>
      </motion.div>
      
      {/* 🎬 SECTION TITLE OVERLAY */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute bottom-6 right-6 text-right"
      >
        <h2 className="text-4xl font-bold text-white mb-2">
          Global Environmental Consulting
        </h2>
        <p className="text-envGreen-300 text-lg">
          Real-time satellite data visualization
        </p>
      </motion.div>
    </section>
  );
};

export default InteractiveEarth3D;
