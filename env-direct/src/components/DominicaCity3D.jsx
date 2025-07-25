import React, { useState, useEffect, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, TileLayer } from '@deck.gl/layers';
import { BitmapLayer } from '@deck.gl/layers';
import { LightingEffect, AmbientLight, _SunLight as SunLight } from '@deck.gl/core';

// Dominica's center coordinates for full island view
const DOMINICA_CENTER = {
  longitude: -61.371,
  latitude: 15.414,
  zoom: 11,
  pitch: 60,
  bearing: 30
};

// Enhanced lighting setup for 3D city with terrain
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.2
});

const sunLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 15), // 3pm local time
  color: [255, 255, 255],
  intensity: 1.5,
  _shadow: true
});

const lightingEffect = new LightingEffect({ ambientLight, sunLight });

const DominicaCity3D = () => {
  const [viewState, setViewState] = useState(DOMINICA_CENTER);
  const [buildingData, setBuildingData] = useState(null);
  const [roadsData, setRoadsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [colorMode, setColorMode] = useState('building_type'); // 'building_type', 'height', 'amenity'
  const [showTooltip, setShowTooltip] = useState(true);
  const [airportCount, setAirportCount] = useState(0);
  const [showRoads, setShowRoads] = useState(true);
  const [mapStyle, setMapStyle] = useState('satellite');

  // WebGL tile sources for terrain basemap (no API keys required)
  const tileSources = {
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    terrain: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    streets: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    physical: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
    osm: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  // Building type to color mapping
  const buildingTypeColors = {
    'residential': [70, 130, 180, 200],    // Steel blue
    'commercial': [255, 140, 0, 200],      // Dark orange
    'public': [34, 139, 34, 200],          // Forest green
    'church': [138, 43, 226, 200],         // Blue violet
    'school': [255, 215, 0, 200],          // Gold
    'hospital': [220, 20, 60, 200],        // Crimson
    'industrial': [105, 105, 105, 200],    // Dim gray
    'yes': [176, 196, 222, 200],           // Light steel blue (default)
    'default': [128, 128, 128, 200]        // Gray fallback
  };

  // Amenity type to color mapping
  const amenityColors = {
    'school': [255, 215, 0, 200],          // Gold
    'college': [255, 165, 0, 200],         // Orange
    'hospital': [220, 20, 60, 200],        // Crimson
    'clinic': [255, 105, 180, 200],        // Hot pink
    'bank': [0, 100, 0, 200],              // Dark green
    'restaurant': [255, 69, 0, 200],       // Red orange
    'cafe': [210, 180, 140, 200],          // Tan
    'shop': [255, 20, 147, 200],           // Deep pink
    'place_of_worship': [138, 43, 226, 200], // Blue violet
    'social_facility': [255, 182, 193, 200], // Light pink
    'government': [25, 25, 112, 200],       // Midnight blue
    'default': [128, 128, 128, 200]         // Gray fallback
  };

  // Airport-specific colors and properties
  const airportColors = {
    'terminal': [255, 0, 0, 255],          // Bright red - very prominent
    'airport': [255, 50, 50, 255],         // Bright red-orange
    'aeroway': [255, 100, 100, 255],       // Red variant
    'default': [255, 0, 0, 255]            // Bright red fallback
  };

  // Check if building is airport-related
  const isAirportBuilding = (properties) => {
    return (
      properties.aeroway === 'terminal' ||
      properties.aeroway === 'airport' ||
      properties.amenity === 'airport' ||
      (properties.name && (
        properties.name.toLowerCase().includes('airport') ||
        properties.name.toLowerCase().includes('terminal')
      ))
    );
  };

  // Calculate building height based on properties
  const getBuildingHeight = (properties) => {
    // Special handling for airports - make them very tall and prominent
    if (isAirportBuilding(properties)) {
      return 100; // Very tall for airports (100 meters)
    }

    // Check for explicit height
    if (properties.height) {
      const height = parseFloat(properties.height);
      if (!isNaN(height)) return height;
    }

    // Check for building levels
    if (properties['building:levels']) {
      const levels = parseInt(properties['building:levels']);
      if (!isNaN(levels)) return levels * 3.5; // Assume 3.5m per floor
    }

    // Height based on building type
    const buildingType = properties.building || 'yes';
    const amenity = properties.amenity;

    if (amenity === 'hospital' || amenity === 'college') return 25;
    if (amenity === 'school') return 15;
    if (amenity === 'place_of_worship') return 20;
    if (buildingType === 'commercial') return 12;
    if (buildingType === 'public') return 15;
    if (buildingType === 'industrial') return 8;
    if (buildingType === 'church') return 18;
    
    // Default residential/generic building height
    return Math.random() * 8 + 4; // Random between 4-12m
  };

  // Get building color based on current color mode
  const getBuildingColor = (properties) => {
    // ALWAYS highlight airports regardless of color mode
    if (isAirportBuilding(properties)) {
      return airportColors.terminal; // Bright red for airports
    }

    if (colorMode === 'building_type') {
      const buildingType = properties.building || 'default';
      return buildingTypeColors[buildingType] || buildingTypeColors.default;
    }
    
    if (colorMode === 'amenity') {
      const amenity = properties.amenity || 'default';
      return amenityColors[amenity] || amenityColors.default;
    }
    
    if (colorMode === 'height') {
      const height = getBuildingHeight(properties);
      // Create height-based color gradient (blue to red)
      const normalized = Math.min(height / 30, 1); // Normalize to 0-1 based on 30m max
      const red = Math.floor(normalized * 255);
      const blue = Math.floor((1 - normalized) * 255);
      return [red, 50, blue, 200];
    }
    
    return buildingTypeColors.default;
  };

  // Load building and road data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load buildings
        const buildingResponse = await fetch('/geojson/export.geojson');
        if (!buildingResponse.ok) {
          throw new Error(`Failed to load building data: ${buildingResponse.statusText}`);
        }
        
        const buildingData = await buildingResponse.json();
        const buildings = buildingData.features
          .filter(feature => feature.properties.building)
          .map(feature => ({
            ...feature,
            properties: {
              ...feature.properties,
              computed_height: getBuildingHeight(feature.properties),
              computed_color: getBuildingColor(feature.properties)
            }
          }));
        
        // Count airports for statistics
        const airportCount = buildings.filter(building => 
          isAirportBuilding(building.properties)
        ).length;
        
        console.log(`Loaded ${buildings.length} buildings in Dominica`);
        console.log(`Found ${airportCount} airport buildings`);
        setAirportCount(airportCount);
        setBuildingData({ ...buildingData, features: buildings });

        // Try to load roads if available
        try {
          const roadsResponse = await fetch('/geojson/mroadsv.json');
          if (roadsResponse.ok) {
            const roadsData = await roadsResponse.json();
            setRoadsData(roadsData);
            console.log(`Loaded ${roadsData.features?.length || 0} road segments`);
          }
        } catch (roadErr) {
          console.log('Roads data not available:', roadErr.message);
        }
        
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [colorMode]);

  // Create building and road layers
  const layers = useMemo(() => {
    const deckLayers = [];

    // Building layer
    if (buildingData) {
      deckLayers.push(
        new GeoJsonLayer({
          id: 'buildings',
          data: buildingData,
          pickable: true,
          stroked: true,
          filled: true,
          extruded: true,
          wireframe: false,
          lineWidthMinPixels: 1,
          lineWidthMaxPixels: 2,
          getLineColor: [255, 255, 255, 100],
          getFillColor: (feature) => {
            // Highlight selected/hovered buildings
            if (selectedBuilding && feature.properties['@id'] === selectedBuilding['@id']) {
              return [255, 255, 0, 255]; // Bright yellow for selected
            }
            if (hoveredBuilding && feature.properties['@id'] === hoveredBuilding['@id']) {
              return [255, 165, 0, 255]; // Orange for hovered
            }
            return getBuildingColor(feature.properties);
          },
          getElevation: (feature) => feature.properties.computed_height,
          elevationScale: 1,
          material: {
            ambient: 0.2,
            diffuse: 0.8,
            shininess: 64,
            specularColor: [255, 255, 255]
          },
          transitions: {
            getFillColor: 300,
            getElevation: 500
          },
          onHover: (info) => {
            setHoveredBuilding(info.object || null);
          },
          onClick: (info) => {
            setSelectedBuilding(info.object || null);
            if (info.object) {
              console.log('Selected building:', info.object.properties);
            }
          }
        })
      );
    }

    // Roads layer
    if (roadsData && showRoads) {
      deckLayers.push(
        new GeoJsonLayer({
          id: 'roads',
          data: roadsData,
          pickable: false,
          stroked: true,
          filled: false,
          getLineColor: [80, 80, 80, 180],
          getLineWidth: (feature) => {
            const roadType = feature.properties.highway || feature.properties.road_type || 'unclassified';
            switch (roadType) {
              case 'primary': return 8;
              case 'secondary': return 6;
              case 'tertiary': return 4;
              case 'residential': return 2;
              default: return 2;
            }
          },
          lineWidthMinPixels: 1,
          lineWidthMaxPixels: 10
        })
      );
    }

    return deckLayers.filter(Boolean);
  }, [buildingData, roadsData, selectedBuilding, hoveredBuilding, colorMode, showRoads]);

  // Reset view to Dominica
  const resetView = () => {
    setViewState({
      ...DOMINICA_CENTER,
      transitionDuration: 2000
    });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mb-4 mx-auto"></div>
          <p className="text-white text-xl mb-2">Loading 3D Buildings of Dominica...</p>
          <p className="text-white/70 text-sm">
            Loading comprehensive building data with terrain basemap...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-red-900">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Error: {error}</p>
          <p className="text-white/70 text-sm mb-4">
            Failed to load building data. Please check the file paths.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      {/* Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 text-white rounded-lg p-3">
        <h1 className="text-xl font-bold text-center">🏝️ 3D Dominica: Buildings on Real Terrain</h1>
        <p className="text-sm text-center opacity-75">
          {buildingData?.features?.length || 0} buildings on satellite/terrain basemap
        </p>
        {airportCount > 0 && (
          <p className="text-xs text-center text-red-300 font-semibold">
            ✈️ {airportCount} Airport{airportCount > 1 ? 's' : ''} highlighted in red
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Map Controls</h3>
        
        {/* Basemap Style Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Basemap Style:</label>
          <select
            value={mapStyle}
            onChange={(e) => setMapStyle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="satellite">Satellite</option>
            <option value="terrain">Terrain</option>
            <option value="streets">Streets</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Color Mode Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Buildings By:</label>
          <select
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="building_type">Building Type</option>
            <option value="amenity">Amenity Type</option>
            <option value="height">Building Height</option>
          </select>
        </div>

        {/* Layer Toggles */}
        <div className="mb-4 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showRoads}
              onChange={(e) => setShowRoads(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">Show Roads</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showTooltip}
              onChange={(e) => setShowTooltip(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">Show Tooltips</span>
          </label>
        </div>

        {/* View Controls */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pitch: {Math.round(viewState.pitch)}°
            </label>
            <input
              type="range"
              min="0"
              max="85"
              value={viewState.pitch}
              onChange={(e) => setViewState(prev => ({ ...prev, pitch: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bearing: {Math.round(viewState.bearing)}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={viewState.bearing}
              onChange={(e) => setViewState(prev => ({ ...prev, bearing: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zoom: {viewState.zoom.toFixed(1)}
            </label>
            <input
              type="range"
              min="8"
              max="18"
              step="0.1"
              value={viewState.zoom}
              onChange={(e) => setViewState(prev => ({ ...prev, zoom: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={resetView}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>

      {/* Building Info Panel */}
      {(selectedBuilding || hoveredBuilding) && showTooltip && (
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg p-4 max-w-md">
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            {selectedBuilding ? '📍 Selected Building' : '👆 Hovered Building'}
          </h3>
          
          {(() => {
            const building = selectedBuilding || hoveredBuilding;
            const props = building.properties;
            const isAirport = isAirportBuilding(props);
            
            return (
              <div className="space-y-2 text-sm">
                {isAirport && (
                  <div className="bg-red-100 text-red-800 p-2 rounded mb-2 font-semibold">
                    ✈️ AIRPORT FACILITY
                  </div>
                )}
                {props.name && (
                  <div><strong>Name:</strong> {props.name}</div>
                )}
                <div><strong>Building Type:</strong> {props.building || 'Unknown'}</div>
                {props.amenity && (
                  <div><strong>Amenity:</strong> {props.amenity}</div>
                )}
                {props.aeroway && (
                  <div><strong>Aeroway Type:</strong> {props.aeroway}</div>
                )}
                <div><strong>Height:</strong> {props.computed_height.toFixed(1)}m</div>
                {(props['addr:street'] || props['addr:city']) && (
                  <div><strong>Address:</strong> {[props['addr:street'], props['addr:city']].filter(Boolean).join(', ')}</div>
                )}
                {props.website && (
                  <div><strong>Website:</strong> 
                    <a href={props.website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline ml-1">
                      {props.website}
                    </a>
                  </div>
                )}
                <div className="text-xs text-gray-600 mt-2">
                  ID: {props['@id']}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* DeckGL with Mapbox Basemap */}
      <DeckGL
        viewState={viewState}
        onViewStateChange={({viewState}) => setViewState(viewState)}
        controller={true}
        layers={layers}
        effects={[lightingEffect]}
        pickingRadius={5}
        getCursor={({ isDragging, isHovering }) =>
          isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab'
        }
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        {/* Mapbox terrain basemap with buildings overlaid */}
        <Map
          reuseMaps
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1Ijoia2V2eWlzYWdlbml1cyIsImEiOiJjbWQ1Z2lydnIwcHlkMmtxM2VibzU1cngwIn0.DxBiCEY3B4bBGAccJZ2IzQ'}
          mapStyle={mapStyles[mapStyle]}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          onLoad={() => console.log('Mapbox map loaded successfully')}
          onError={(error) => console.error('Mapbox error:', error)}
        />
        {/* Note: Terrain temporarily disabled for debugging
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        */}
      </DeckGL>
    </div>
  );
};

export default DominicaCity3D;
