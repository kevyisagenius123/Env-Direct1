import React, { useState, useEffect, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { FlyToInterpolator } from '@deck.gl/core';
import { LightingEffect, AmbientLight, _SunLight as SunLight } from '@deck.gl/core';
import proj4 from 'proj4';

// Dominica's center coordinates with enhanced 3D view
const DOMINICA_CENTER = {
  longitude: -61.371,
  latitude: 15.414,
  zoom: 10.5,
  pitch: 60,
  bearing: 15
};

// Define coordinate systems for transformation
const UTM_20N = '+proj=utm +zone=20 +datum=WGS84 +units=m +no_defs';
const WGS84 = '+proj=longlat +datum=WGS84 +no_defs';

// Initialize proj4 transformation
proj4.defs('UTM20N', UTM_20N);
proj4.defs('WGS84', WGS84);

// 🔥 FAANG-GRADE LIGHTING SYSTEM - Enhanced for cinematic quality
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.2  // Increased for better visibility
});

const sunLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 15), // 3pm local time
  color: [255, 255, 255],
  intensity: 1.5,  // Enhanced intensity for dramatic shadows
  _shadow: true
});

// Additional cinematic lighting for enterprise-grade visualization
const supplementaryLight = new AmbientLight({
  color: [100, 150, 255],
  intensity: 0.3
});

const lightingEffect = new LightingEffect({ 
  ambientLight, 
  sunLight,
  supplementaryLight 
});

const DominicaCombined3D = () => {
  const [viewState, setViewState] = useState(DOMINICA_CENTER);
  
  // Parish boundary data (basemap)
  const [parishData, setParishData] = useState({});
  const [selectedLayers, setSelectedLayers] = useState({
    adm0: true, // Country boundary
    adm1: true  // Administrative divisions (parishes)
  });
  
  // Building data
  const [buildingData, setBuildingData] = useState(null);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedParishes, setClickedParishes] = useState(new Set());
  const [hoveredParish, setHoveredParish] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [colorMode, setColorMode] = useState('building_type');

  // Parish boundary file paths
  const parishFiles = {
    adm0: '/geojson/geoBoundaries-DMA-ADM0.geojson', // Country boundary
    adm1: '/geojson/geoBoundaries-DMA-ADM1.geojson'  // Administrative level 1 (parishes)
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

  // Airport-specific colors
  const airportColors = {
    'terminal': [255, 0, 0, 255],          // Bright red
    'airport': [255, 50, 50, 255],         // Bright red-orange
    'aeroway': [255, 100, 100, 255],       // Red variant
    'default': [255, 0, 0, 255]            // Bright red fallback
  };

  // Parish layer configurations for basemap (lower heights)
  const layerConfigs = {
    adm0: {
      color: [34, 139, 34, 120],
      extrusionHeight: 10, // Very low for basemap
      fillColor: [144, 238, 144, 60], // More transparent
      lineColor: [0, 100, 0, 255],
      name: 'Dominica Base Map'
    },
    adm1: {
      color: [70, 130, 180, 120],
      extrusionHeight: 20, // Very low for basemap
      fillColor: [173, 216, 230, 80], // More transparent
      lineColor: [25, 25, 112, 150],
      name: 'Parish Boundaries'
    }
  };

  // Transform coordinates from UTM to lat/lng
  const transformationCache = new Map();
  
  const transformCoordinate = (coord) => {
    if (!Array.isArray(coord) || coord.length < 2) return coord;
    
    const [x, y] = coord;
    const cacheKey = `${x},${y}`;
    
    if (transformationCache.has(cacheKey)) {
      const cached = transformationCache.get(cacheKey);
      return [cached[0], cached[1], ...(coord.slice(2) || [])];
    }
    
    if (x > 180 || x < -180 || y > 90 || y < -90) {
      try {
        const [lng, lat] = proj4('UTM20N', 'WGS84', [x, y]);
        transformationCache.set(cacheKey, [lng, lat]);
        return [lng, lat, ...(coord.slice(2) || [])];
      } catch (error) {
        console.warn('Failed to transform coordinate:', coord, error);
        return null;
      }
    }
    
    return coord;
  };

  // Transform geometry coordinates recursively
  const transformGeometry = (geometry) => {
    if (!geometry || !geometry.coordinates) return geometry;
    
    const transformCoordinatesArray = (coordsArray, depth = 0) => {
      if (depth === 0) {
        return transformCoordinate(coordsArray);
      } else {
        const results = [];
        for (let i = 0; i < coordsArray.length; i++) {
          const transformed = transformCoordinatesArray(coordsArray[i], depth - 1);
          if (transformed !== null) {
            results.push(transformed);
          }
        }
        return results;
      }
    };
    
    const { type, coordinates } = geometry;
    let transformedCoords;
    
    try {
      switch (type) {
        case 'Point':
          transformedCoords = transformCoordinatesArray(coordinates, 0);
          break;
        case 'LineString':
        case 'MultiPoint':
          transformedCoords = transformCoordinatesArray(coordinates, 1);
          break;
        case 'Polygon':
        case 'MultiLineString':
          transformedCoords = transformCoordinatesArray(coordinates, 2);
          break;
        case 'MultiPolygon':
          transformedCoords = transformCoordinatesArray(coordinates, 3);
          break;
        default:
          return geometry;
      }
      
      return {
        ...geometry,
        coordinates: transformedCoords
      };
    } catch (error) {
      console.warn('Error transforming geometry:', error);
      return null;
    }
  };

  // Validate and clean GeoJSON coordinates
  const validateAndCleanGeoJSON = (geojson, layerName) => {
    if (!geojson || !geojson.features) return null;
    
    console.log(`[Combined3D] Processing ${geojson.features.length} features for ${layerName}...`);
    
    const isValidCoordinate = (coord) => {
      if (!Array.isArray(coord) || coord.length < 2) return false;
      const [lng, lat] = coord;
      return (
        typeof lng === 'number' && 
        typeof lat === 'number' && 
        !isNaN(lng) && 
        !isNaN(lat) && 
        lat >= -90 && 
        lat <= 90 && 
        lng >= -180 && 
        lng <= 180
      );
    };
    
    const processedFeatures = [];
    
    for (const feature of geojson.features) {
      if (!feature.geometry || !feature.geometry.coordinates) continue;
      
      const transformedGeometry = transformGeometry(feature.geometry);
      if (!transformedGeometry) continue;
      
      let isValid = false;
      const { type, coordinates } = transformedGeometry;
      
      switch (type) {
        case 'Point':
          isValid = isValidCoordinate(coordinates);
          break;
        case 'LineString':
        case 'MultiPoint':
          isValid = coordinates.length > 0 && isValidCoordinate(coordinates[0]);
          break;
        case 'Polygon':
        case 'MultiLineString':
          isValid = coordinates.length > 0 && coordinates[0].length > 0 && isValidCoordinate(coordinates[0][0]);
          break;
        case 'MultiPolygon':
          isValid = coordinates.length > 0 && coordinates[0].length > 0 && coordinates[0][0].length > 0 && isValidCoordinate(coordinates[0][0][0]);
          break;
      }
      
      if (isValid) {
        processedFeatures.push({
          ...feature,
          geometry: transformedGeometry
        });
      }
    }
    
    console.log(`[Combined3D] ${layerName}: Kept ${processedFeatures.length}/${geojson.features.length} valid features`);
    
    return {
      ...geojson,
      features: processedFeatures
    };
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

  // Calculate building height (made taller)
  const getBuildingHeight = (properties) => {
    if (isAirportBuilding(properties)) {
      return 150; // Much taller for airports
    }

    if (properties.height) {
      const height = parseFloat(properties.height);
      if (!isNaN(height)) return height * 2; // Double specified heights
    }

    if (properties['building:levels']) {
      const levels = parseInt(properties['building:levels']);
      if (!isNaN(levels)) return levels * 6; // Increase floor height from 3.5m to 6m
    }

    const buildingType = properties.building || 'yes';
    const amenity = properties.amenity;

    if (amenity === 'hospital' || amenity === 'college') return 75; // Much taller
    if (amenity === 'school') return 45; // Much taller
    if (amenity === 'place_of_worship') return 60; // Much taller
    if (buildingType === 'commercial') return 40; // Much taller
    if (buildingType === 'public') return 50; // Much taller
    if (buildingType === 'industrial') return 25; // Much taller
    if (buildingType === 'church') return 55; // Much taller
    
    return Math.random() * 20 + 15; // Random between 15-35m (much taller)
  };

  // Get building color
  const getBuildingColor = (properties) => {
    if (isAirportBuilding(properties)) {
      return airportColors.terminal;
    }

    const buildingType = properties.building || 'default';
    return buildingTypeColors[buildingType] || buildingTypeColors.default;
  };

  // Get parish extrusion height (keep flat for basemap)
  const getParishExtrusionHeight = (feature) => {
    const parishId = feature?.properties?.shapeName || 
                    feature?.properties?.name ||
                    feature?.properties?.SHAPENAME ||
                    feature?.properties?.NAME ||
                    `parish_${feature?.properties?.shapeGroup || 'unknown'}`;
    
    const baseHeight = layerConfigs.adm1.extrusionHeight;
    
    // Keep parishes flat - no rising to avoid blocking buildings
    return baseHeight; // Always use base height (100 units)
  };

  // Get parish color
  const getParishColor = (feature) => {
    const parishId = feature?.properties?.shapeName || 
                    feature?.properties?.name ||
                    feature?.properties?.SHAPENAME ||
                    feature?.properties?.NAME ||
                    `parish_${feature?.properties?.shapeGroup || 'unknown'}`;
    
    const config = layerConfigs.adm1;
    
    if (hoveredParish === parishId) {
      return [255, 215, 0, 150]; // Gold on hover (more transparent)
    }
    
    if (clickedParishes.has(parishId)) {
      return [255, 69, 0, 180]; // Orange-red when clicked
    }
    
    return config.fillColor;
  };

  // Load parish boundary data
  useEffect(() => {
    const loadParishData = async () => {
      try {
        console.log('[Combined3D] Loading parish boundary data...');
        
        const loadFile = async ([key, path]) => {
          try {
            const response = await fetch(path);
            if (!response.ok) {
              console.error(`[Combined3D] Failed to load ${key}: ${response.status}`);
              return [key, null];
            }
            
            // Check if we're getting HTML instead of JSON
            const contentType = response.headers.get('content-type');
            if (contentType && !contentType.includes('application/json')) {
              console.error(`[Combined3D] Error loading ${key}: Expected JSON but got ${contentType}`);
              return [key, null];
            }
            
            const rawData = await response.json();
            const validatedData = validateAndCleanGeoJSON(rawData, key);
            return [key, validatedData];
          } catch (err) {
            console.error(`[Combined3D] Error loading ${key}:`, err);
            return [key, null];
          }
        };
        
        const promises = Object.entries(parishFiles).map(loadFile);
        const results = await Promise.all(promises);
        
        const data = Object.fromEntries(
          results.filter(([, data]) => data !== null && data.features && data.features.length > 0)
        );
        
        setParishData(data);
        console.log('[Combined3D] Parish data loaded:', Object.keys(data));
      } catch (err) {
        console.error('[Combined3D] Error loading parish data:', err);
      }
    };

    loadParishData();
  }, []);

  // Load building data
  useEffect(() => {
    const loadBuildingData = async () => {
      try {
        console.log('[Combined3D] Loading building data...');
        setLoading(true);
        setError(null);
        
        const response = await fetch('/geojson/export.geojson');
        if (!response.ok) {
          throw new Error(`Failed to load building data: ${response.statusText}`);
        }
        
        // Check if we're getting HTML instead of JSON
        const contentType = response.headers.get('content-type');
        if (contentType && !contentType.includes('application/json')) {
          throw new Error(`Expected JSON but got ${contentType}. This usually means the file is being served as HTML instead of JSON.`);
        }
        
        const data = await response.json();
        
        // Filter only building features and add computed properties
        const buildings = data.features
          .filter(feature => feature.properties.building)
          .map(feature => ({
            ...feature,
            properties: {
              ...feature.properties,
              computed_height: getBuildingHeight(feature.properties),
              computed_color: getBuildingColor(feature.properties)
            }
          }));
        
        const airportCount = buildings.filter(building => 
          isAirportBuilding(building.properties)
        ).length;
        
        console.log(`[Combined3D] Loaded ${buildings.length} buildings in Dominica`);
        console.log(`[Combined3D] Found ${airportCount} airport buildings`);
        setBuildingData({ ...data, features: buildings });
        
      } catch (err) {
        console.error('[Combined3D] Error loading building data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBuildingData();
  }, []);

  // Create combined layers (parishes + buildings)
  const layers = useMemo(() => {
    console.log('[Combined3D] Creating layers...');
    const deckLayers = [];

    // Add parish boundary layers (basemap)
    Object.entries(parishData).forEach(([key, data]) => {
      if (selectedLayers[key] && data && data.features && data.features.length > 0) {
        const config = layerConfigs[key];
        
        if (key === 'adm1') {
          // Interactive parish layer
          deckLayers.push(
            new GeoJsonLayer({
              id: `${key}-layer`,
              data,
              pickable: true,
              stroked: true,
              filled: true,
              extruded: true,
              wireframe: false,
              lineWidthMinPixels: 1,
              lineWidthMaxPixels: 2,
              getLineColor: config.lineColor,
              getFillColor: (feature) => getParishColor(feature),
              getElevation: (feature) => getParishExtrusionHeight(feature),
              elevationScale: 1,
              material: {
                ambient: 0.6,
                diffuse: 0.4,
                shininess: 5,
                specularColor: [100, 100, 100]
              },
              transitions: {
                getFillColor: 600  // Only color transitions, no elevation
              },
              updateTriggers: {
                getFillColor: [clickedParishes, hoveredParish]
                // Removed getElevation trigger since height is constant
              },
              onHover: (info) => {
                const parishId = info.object?.properties?.shapeName || 
                               info.object?.properties?.name ||
                               info.object?.properties?.SHAPENAME ||
                               info.object?.properties?.NAME ||
                               (info.object ? `parish_${info.object.properties?.shapeGroup || 'unknown'}` : null);
                
                setHoveredParish(info.object ? parishId : null);
              },
              onClick: (info) => {
                if (info.object) {
                  const parishId = info.object.properties?.shapeName || 
                                 info.object.properties?.name ||
                                 info.object.properties?.SHAPENAME ||
                                 info.object.properties?.NAME ||
                                 `parish_${info.object.properties?.shapeGroup || 'unknown'}`;
                  
                  setClickedParishes(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(parishId)) {
                      newSet.delete(parishId);
                    } else {
                      newSet.add(parishId);
                    }
                    return newSet;
                  });
                }
              }
            })
          );
        } else if (key === 'adm0') {
          // Country boundary layer
          deckLayers.push(
            new GeoJsonLayer({
              id: `${key}-layer`,
              data,
              pickable: false,
              stroked: true,
              filled: true,
              extruded: true,
              wireframe: false,
              lineWidthMinPixels: 2,
              lineWidthMaxPixels: 3,
              getLineColor: config.lineColor,
              getFillColor: config.fillColor,
              getElevation: config.extrusionHeight,
              elevationScale: 1,
              material: {
                ambient: 0.7,
                diffuse: 0.3,
                shininess: 5,
                specularColor: [100, 100, 100]
              }
            })
          );
        }
      }
    });

    // Add buildings layer on top
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
          getLineColor: [255, 255, 255, 150],
          getFillColor: (feature) => {
            if (selectedBuilding && feature.properties['@id'] === selectedBuilding['@id']) {
              return [255, 255, 0, 255]; // Yellow for selected
            }
            if (hoveredBuilding && feature.properties['@id'] === hoveredBuilding['@id']) {
              return [255, 165, 0, 255]; // Orange for hovered
            }
            return getBuildingColor(feature.properties);
          },
          getElevation: (feature) => {
            // Buildings start just above parish base height
            const buildingHeight = feature.properties.computed_height;
            const baseHeight = 25; // Slightly above parish base
            return baseHeight + buildingHeight;
          },
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
              console.log('[Combined3D] Selected building:', info.object.properties);
            }
          }
        })
      );
    }

    console.log(`[Combined3D] Created ${deckLayers.length} layers total`);
    return deckLayers;
  }, [parishData, buildingData, selectedLayers, clickedParishes, hoveredParish, selectedBuilding, hoveredBuilding]);

  // Reset view
  const resetView = () => {
    setViewState({
      ...DOMINICA_CENTER,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mb-4 mx-auto"></div>
          <p className="text-white text-xl mb-2">Loading Combined 3D Map...</p>
          <p className="text-white/70 text-sm">Loading parishes and buildings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-red-900">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Error: {error}</p>
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
    <div className="relative w-full h-screen bg-gray-900">
      {/* Header Info */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 text-white rounded-lg p-3 max-w-md">
        <h1 className="text-xl font-bold text-center">🏝️ Dominica: Parishes & Buildings</h1>
        <div className="text-sm text-center space-y-1 mt-2">
          <p>🏛️ Parish Boundaries: {Object.keys(parishData).length} layers</p>
          <p>🏢 Buildings: {buildingData?.features?.length || 0} structures</p>
          <p>📍 Selected Parishes: {clickedParishes.size}</p>
        </div>
      </div>

      {/* Layer Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <h3 className="font-bold text-lg mb-4 text-envGreen-800">Map Layers</h3>
        
        {Object.entries(layerConfigs).map(([key, config]) => (
          <div key={key} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={key}
              checked={selectedLayers[key]}
              onChange={() => setSelectedLayers(prev => ({ ...prev, [key]: !prev[key] }))}
              className="mr-2 w-4 h-4 text-envGreen-600"
            />
            <label htmlFor={key} className="text-sm font-medium text-gray-900 flex items-center">
              <div 
                className="w-4 h-4 mr-2 border border-gray-300 rounded"
                style={{ backgroundColor: `rgba(${config.color.join(',')})` }}
              ></div>
              {config.name}
              {parishData[key] && <span className="ml-1 text-xs text-green-600">✓</span>}
            </label>
          </div>
        ))}
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 mr-2 bg-blue-400 border border-gray-300 rounded"></div>
            <span className="text-sm font-medium text-gray-900">Buildings</span>
            {buildingData && <span className="ml-1 text-xs text-green-600">✓</span>}
          </div>
          
          <button
            onClick={resetView}
            className="w-full px-3 py-2 bg-envGreen-600 text-white rounded hover:bg-envGreen-700 transition-colors mt-2"
          >
            Reset View
          </button>
          
          <button
            onClick={() => setClickedParishes(new Set())}
            className="w-full px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors mt-2"
            disabled={clickedParishes.size === 0}
          >
            Clear Selected ({clickedParishes.size})
          </button>
        </div>
      </div>

      {/* Building Info Panel */}
      {(selectedBuilding || hoveredBuilding) && (
        <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-sm">
          <h4 className="font-bold text-lg mb-2 text-gray-800">
            {selectedBuilding ? 'Selected' : 'Hovered'} Building
          </h4>
          <div className="text-sm text-gray-700 space-y-1">
            {(selectedBuilding || hoveredBuilding)?.properties && (
              <>
                <div><strong>Type:</strong> {(selectedBuilding || hoveredBuilding).properties.building || 'Unknown'}</div>
                <div><strong>Height:</strong> {(selectedBuilding || hoveredBuilding).properties.computed_height?.toFixed(1) || 'N/A'}m</div>
                {(selectedBuilding || hoveredBuilding).properties.amenity && (
                  <div><strong>Amenity:</strong> {(selectedBuilding || hoveredBuilding).properties.amenity}</div>
                )}
                {(selectedBuilding || hoveredBuilding).properties.name && (
                  <div><strong>Name:</strong> {(selectedBuilding || hoveredBuilding).properties.name}</div>
                )}
                {isAirportBuilding((selectedBuilding || hoveredBuilding).properties) && (
                  <div className="text-red-600 font-bold">✈️ Airport Building</div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* DeckGL Map with Enhanced Lighting */}
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
        controller={{
          touchRotate: true,
          touchZoom: true,
          minZoom: 8,
          maxZoom: 18,
          minPitch: 0,
          maxPitch: 85
        }}
        layers={layers}
        effects={[lightingEffect]}
        pickingRadius={5}
        getCursor={({ isDragging, isHovering }) =>
          isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab'
        }
        style={{ position: 'relative', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default DominicaCombined3D;
