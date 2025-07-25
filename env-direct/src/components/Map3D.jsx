import React, { useState, useEffect, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { FlyToInterpolator } from '@deck.gl/core';
import proj4 from 'proj4';

// Dominica's center coordinates with enhanced 3D view
const DOMINICA_CENTER = {
  longitude: -61.371,
  latitude: 15.414,
  zoom: 10.5,
  pitch: 60,    // More tilted for better 3D effect
  bearing: 15   // Slight rotation for dynamic view
};

// Define coordinate systems for transformation
const UTM_20N = '+proj=utm +zone=20 +datum=WGS84 +units=m +no_defs';
const WGS84 = '+proj=longlat +datum=WGS84 +no_defs';

// Initialize proj4 transformation
proj4.defs('UTM20N', UTM_20N);
proj4.defs('WGS84', WGS84);

const Map3D = () => {
  const [viewState, setViewState] = useState(DOMINICA_CENTER);
  const [geoJsonData, setGeoJsonData] = useState({});
  const [selectedLayers, setSelectedLayers] = useState({
    adm0: true, // Country boundary
    adm1: true  // Administrative divisions (parishes)
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState({ loaded: 0, total: 0, current: '' });
  const [clickedParishes, setClickedParishes] = useState(new Set());
  const [hoveredParish, setHoveredParish] = useState(null);

  // GeoJSON file paths - simplified to just the two you specified
  const geoJsonFiles = {
    adm0: '/geojson/geoBoundaries-DMA-ADM0.geojson', // Country boundary
    adm1: '/geojson/geoBoundaries-DMA-ADM1.geojson'  // Administrative level 1 (parishes)
  };

  // Transform coordinates from UTM to lat/lng with caching
  const transformationCache = new Map();
  
  const transformCoordinate = (coord) => {
    if (!Array.isArray(coord) || coord.length < 2) return coord;
    
    const [x, y] = coord;
    const cacheKey = `${x},${y}`;
    
    // Check cache first
    if (transformationCache.has(cacheKey)) {
      const cached = transformationCache.get(cacheKey);
      return [cached[0], cached[1], ...(coord.slice(2) || [])];
    }
    
    // Check if coordinates are in UTM range (likely for Dominica)
    if (x > 180 || x < -180 || y > 90 || y < -90) {
      try {
        // Transform from UTM 20N to WGS84
        const [lng, lat] = proj4('UTM20N', 'WGS84', [x, y]);
        transformationCache.set(cacheKey, [lng, lat]);
        return [lng, lat, ...(coord.slice(2) || [])];
      } catch (error) {
        console.warn('Failed to transform coordinate:', coord, error);
        return null;
      }
    }
    
    return coord; // Already in lat/lng format
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
    
    console.log(`Processing ${geojson.features.length} features for ${layerName}...`);
    const startTime = performance.now();
    
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
      
      // Quick validation - check first coordinate
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
    
    const endTime = performance.now();
    console.log(`${layerName}: Processed ${geojson.features.length} features in ${(endTime - startTime).toFixed(2)}ms, kept ${processedFeatures.length} valid features`);
    
    return {
      ...geojson,
      features: processedFeatures
    };
  };

  // Load GeoJSON files
  useEffect(() => {
    const loadGeoJsonData = async () => {
      try {
        console.log('[Map3D] Starting to load GeoJSON data...');
        setLoading(true);
        setError(null);
        
        const totalFiles = Object.keys(geoJsonFiles).length;
        let loadedCount = 0;
        
        console.log('[Map3D] Files to load:', geoJsonFiles);
        setLoadingProgress({ loaded: 0, total: totalFiles, current: 'Initializing...' });
        
        const loadFile = async ([key, path]) => {
          try {
            console.log(`[Map3D] Loading ${key} from ${path}...`);
            setLoadingProgress(prev => ({ ...prev, current: `Loading ${key}...` }));
            
            const response = await fetch(path);
            console.log(`[Map3D] Response for ${key}:`, response.status, response.ok);
            
            if (!response.ok) {
              console.error(`[Map3D] Failed to load ${key}: ${response.status} ${response.statusText}`);
              return [key, null];
            }

            // Check if response is actually JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              console.error(`[Map3D] Expected JSON but got ${contentType} for ${key}`);
              return [key, null];
            }
            
            const rawData = await response.json();
            console.log(`[Map3D] Raw data for ${key}:`, rawData?.features?.length, 'features');
            
            setLoadingProgress(prev => ({ ...prev, current: `Processing ${key}...` }));
            
            const validatedData = validateAndCleanGeoJSON(rawData, key);
            console.log(`[Map3D] Validated data for ${key}:`, validatedData?.features?.length, 'features');
            
            loadedCount++;
            setLoadingProgress({ 
              loaded: loadedCount, 
              total: totalFiles, 
              current: `Completed ${key}` 
            });
            
            return [key, validatedData];
          } catch (err) {
            console.error(`[Map3D] Error loading ${key}:`, err);
            loadedCount++;
            setLoadingProgress({ 
              loaded: loadedCount, 
              total: totalFiles, 
              current: `Failed to load ${key}` 
            });
            return [key, null];
          }
        };
        
        const promises = Object.entries(geoJsonFiles).map(loadFile);
        const results = await Promise.all(promises);
        
        const data = Object.fromEntries(
          results.filter(([, data]) => data !== null && data.features && data.features.length > 0)
        );
        
        console.log('[Map3D] Final loaded data:', data);
        console.log('[Map3D] Data keys:', Object.keys(data));
        console.log('[Map3D] Feature counts:', Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, value.features?.length || 0])
        ));
        
        setGeoJsonData(data);
        setError(null);
        console.log('[Map3D] Successfully loaded GeoJSON data:', Object.keys(data));
      } catch (err) {
        console.error('[Map3D] Error loading GeoJSON data:', err);
        setError('Failed to load map data');
      } finally {
        setLoading(false);
        console.log('[Map3D] Loading finished');
      }
    };

    loadGeoJsonData();
  }, []);

  // Layer configurations optimized for basemap usage
  const layerConfigs = {
    adm0: {
      color: [34, 139, 34, 120], // Forest green country boundary with transparency
      extrusionHeight: 100, // Lower base height for basemap
      fillColor: [144, 238, 144, 80], // Light green fill for the island base
      lineColor: [0, 100, 0, 255], // Dark green border
      name: 'Dominica Base Map'
    },
    adm1: {
      color: [70, 130, 180, 120], // Steel blue administrative divisions
      extrusionHeight: 200, // Moderate base height for parishes
      fillColor: [173, 216, 230, 100], // Light blue fill for parishes
      lineColor: [25, 25, 112, 200], // Navy blue borders
      name: 'Parish Boundaries'
    }
  };

  // Get dynamic extrusion height for parishes (enhanced for basemap)
  const getParishExtrusionHeight = (feature) => {
    const parishId = feature?.properties?.shapeName || 
                    feature?.properties?.name ||
                    feature?.properties?.SHAPENAME ||
                    feature?.properties?.NAME ||
                    feature?.properties?.shapeID ||
                    feature?.properties?.SHAPEID ||
                    `parish_${feature?.properties?.shapeGroup || 'unknown'}`;
    
    const baseHeight = layerConfigs.adm1.extrusionHeight;
    
    if (hoveredParish === parishId) {
      return baseHeight * 4; // 4x height on hover (800 units)
    }
    
    if (clickedParishes.has(parishId)) {
      return baseHeight * 8; // 8x height when clicked (1600 units)
    }
    
    return baseHeight; // Base height for basemap parishes (200 units)
  };

  // Get dynamic color for parishes (enhanced for basemap)
  const getParishColor = (feature) => {
    const parishId = feature?.properties?.shapeName || 
                    feature?.properties?.name ||
                    feature?.properties?.SHAPENAME ||
                    feature?.properties?.NAME ||
                    feature?.properties?.shapeID ||
                    feature?.properties?.SHAPEID ||
                    `parish_${feature?.properties?.shapeGroup || 'unknown'}`;
    
    const config = layerConfigs.adm1;
    
    if (hoveredParish === parishId) {
      return [255, 215, 0, 200]; // Gold on hover
    }
    
    if (clickedParishes.has(parishId)) {
      return [255, 69, 0, 220]; // Orange-red when clicked
    }
    
    return config.fillColor; // Use configured fill color for basemap
  };

  // Create DeckGL layers with enhanced interactivity
  const layers = useMemo(() => {
    console.log('[Map3D] Creating layers with data:', Object.keys(geoJsonData));
    console.log('[Map3D] Selected layers:', selectedLayers);
    
    const deckLayers = [];

    Object.entries(geoJsonData).forEach(([key, data]) => {
      console.log(`[Map3D] Processing layer ${key}:`, {
        selected: selectedLayers[key],
        hasData: !!data,
        featureCount: data?.features?.length || 0
      });
      
      if (selectedLayers[key] && data && data.features && data.features.length > 0) {
        const config = layerConfigs[key];
        console.log(`[Map3D] Creating layer for ${key} with config:`, config);
        
        try {
          if (key === 'adm1') {
            // Interactive parish layer optimized for basemap usage
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
                lineWidthMaxPixels: 3,
                getLineColor: config.lineColor,
                getFillColor: (feature) => getParishColor(feature),
                getElevation: (feature) => getParishExtrusionHeight(feature),
                elevationScale: 1,
                material: {
                  ambient: 0.4,
                  diffuse: 0.7,
                  shininess: 20,
                  specularColor: [255, 255, 255]
                },
                transitions: {
                  getElevation: 1000, // Smooth elevation animation
                  getFillColor: 800   // Smooth color animation
                },
                updateTriggers: {
                  getFillColor: [clickedParishes, hoveredParish],
                  getElevation: [clickedParishes, hoveredParish]
                },
                onHover: (info) => {
                  const parishId = info.object?.properties?.shapeName || 
                                 info.object?.properties?.name ||
                                 info.object?.properties?.SHAPENAME ||
                                 info.object?.properties?.NAME ||
                                 info.object?.properties?.shapeID ||
                                 info.object?.properties?.SHAPEID ||
                                 (info.object ? `parish_${info.object.properties?.shapeGroup || 'unknown'}` : null);
                  
                  setHoveredParish(info.object ? parishId : null);
                },
                onClick: (info) => {
                  if (info.object) {
                    const parishId = info.object.properties?.shapeName || 
                                   info.object.properties?.name ||
                                   info.object.properties?.SHAPENAME ||
                                   info.object.properties?.NAME ||
                                   info.object.properties?.shapeID ||
                                   info.object.properties?.SHAPEID ||
                                   `parish_${info.object.properties?.shapeGroup || 'unknown'}`;
                    
                    const parishName = info.object.properties?.shapeName || 
                                     info.object.properties?.name || 
                                     info.object.properties?.SHAPENAME ||
                                     info.object.properties?.NAME ||
                                     'Unknown Parish';
                    
                    console.log(`Clicked on parish: ${parishName}`);
                    
                    // Toggle parish extrusion
                    setClickedParishes(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(parishId)) {
                        newSet.delete(parishId);
                        console.log(`Deselected parish: ${parishName}`);
                      } else {
                        newSet.add(parishId);
                        console.log(`Selected parish: ${parishName} - extruding!`);
                      }
                      return newSet;
                    });
                  }
                },
                onError: (error) => {
                  console.error(`Error in ${key} layer:`, error);
                }
              })
            );
            console.log(`[Map3D] Successfully created ${key} layer`);
          } else if (key === 'adm0') {
            // Enhanced country boundary layer as basemap foundation
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
                lineWidthMaxPixels: 4,
                getLineColor: config.lineColor,
                getFillColor: config.fillColor,
                getElevation: config.extrusionHeight,
                elevationScale: 1,
                material: {
                  ambient: 0.5,
                  diffuse: 0.6,
                  shininess: 10,
                  specularColor: [150, 150, 150]
                },
                onError: (error) => {
                  console.error(`Error in ${key} layer:`, error);
                }
              })
            );
            console.log(`[Map3D] Successfully created ${key} layer`);
          }
        } catch (error) {
          console.error(`Failed to create layer for ${key}:`, error);
        }
      } else {
        console.log(`[Map3D] Skipping layer ${key}:`, {
          selected: selectedLayers[key],
          hasData: !!data,
          featureCount: data?.features?.length || 0
        });
      }
    });

    console.log(`[Map3D] Created ${deckLayers.length} layers total`);
    return deckLayers;
  }, [geoJsonData, selectedLayers, clickedParishes, hoveredParish]);

  // Toggle layer visibility
  const toggleLayer = (layerKey) => {
    setSelectedLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  // Clear all selected parishes
  const clearAllParishes = () => {
    setClickedParishes(new Set());
    console.log('Cleared all selected parishes');
  };

  // Reset view to Dominica
  const resetView = () => {
    setViewState({
      ...DOMINICA_CENTER,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    });
  };

  if (loading) {
    const progressPercentage = loadingProgress.total > 0 
      ? Math.round((loadingProgress.loaded / loadingProgress.total) * 100) 
      : 0;
      
    return (
      <div className="w-full h-screen flex items-center justify-center bg-envGreen-900">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4 mx-auto"></div>
          <p className="text-white text-xl mb-2">Loading 3D Map Data...</p>
          
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-white/90 text-sm mb-1">
            {loadingProgress.loaded} of {loadingProgress.total} layers loaded ({progressPercentage}%)
          </p>
          <p className="text-white/70 text-xs">
            {loadingProgress.current}
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
            Failed to load GeoJSON data. Please check the file paths.
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
    <div className="relative w-full h-screen bg-gray-900">
      {/* Debug Panel */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 text-white rounded-lg p-3 max-w-md">
        <h4 className="font-bold text-sm mb-2">Debug Info</h4>
        <div className="text-xs space-y-1">
          <div>Loading: {loading ? 'TRUE' : 'FALSE'}</div>
          <div>Error: {error || 'None'}</div>
          <div>Data Keys: {Object.keys(geoJsonData).join(', ') || 'None'}</div>
          <div>ADM0 Features: {geoJsonData.adm0?.features?.length || 0}</div>
          <div>ADM1 Features: {geoJsonData.adm1?.features?.length || 0}</div>
          <div>Layers Created: {layers.length}</div>
          <div>Clicked Parishes: {clickedParishes.size} ({Array.from(clickedParishes).join(', ') || 'None'})</div>
          <div>Hovered Parish: {hoveredParish || 'None'}</div>
        </div>
      </div>

      {/* Layer Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <h3 className="font-bold text-lg mb-4 text-envGreen-800">Map Layers</h3>
        
        <div className="mb-4 p-2 bg-envGreen-50 rounded">
          <p className="text-xs text-envGreen-700">
            Loaded: {Object.keys(geoJsonData).length}/{Object.keys(geoJsonFiles).length} layers
          </p>
        </div>
        
        {Object.entries(layerConfigs).map(([key, config]) => (
          <div key={key} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={key}
              checked={selectedLayers[key]}
              onChange={() => toggleLayer(key)}
              className="mr-2 w-4 h-4 text-envGreen-600 bg-gray-100 border-gray-300 rounded focus:ring-envGreen-500"
            />
            <label htmlFor={key} className="text-sm font-medium text-gray-900 flex items-center">
              <div 
                className="w-4 h-4 mr-2 border border-gray-300 rounded"
                style={{ backgroundColor: `rgba(${config.color.join(',')})` }}
              ></div>
              {config.name}
              {geoJsonData[key] && (
                <span className="ml-1 text-xs text-green-600">✓</span>
              )}
            </label>
          </div>
        ))}
        
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
          <button
            onClick={resetView}
            className="w-full px-3 py-2 bg-envGreen-600 text-white rounded hover:bg-envGreen-700 transition-colors"
          >
            Reset View
          </button>
          
          <button
            onClick={clearAllParishes}
            className="w-full px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
            disabled={clickedParishes.size === 0}
          >
            Clear Selected Parishes ({clickedParishes.size})
          </button>
          
          <button
            onClick={() => {
              console.log('Test button clicked! Adding Saint Peter...');
              setClickedParishes(prev => new Set([...prev, 'Saint Peter']));
            }}
            className="w-full px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-xs"
          >
            🧪 Test: Add Saint Peter
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4">
        <h3 className="font-bold text-lg mb-4 text-envGreen-800">View Controls</h3>
        
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pitch: {Math.round(viewState.pitch)}°</label>
            <input
              type="range"
              min="0"
              max="85"
              value={viewState.pitch}
              onChange={(e) => setViewState(prev => ({ ...prev, pitch: Number(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bearing: {Math.round(viewState.bearing)}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={viewState.bearing}
              onChange={(e) => setViewState(prev => ({ ...prev, bearing: Number(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zoom: {viewState.zoom.toFixed(1)}</label>
            <input
              type="range"
              min="8"
              max="16"
              step="0.1"
              value={viewState.zoom}
              onChange={(e) => setViewState(prev => ({ ...prev, zoom: Number(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4">
        <h3 className="font-bold text-lg mb-2 text-envGreen-800">Dominica Basemap</h3>
        <p className="text-sm text-gray-700">
          Interactive administrative boundary basemap with {Object.keys(geoJsonData).length} layers
        </p>
        <p className="text-xs text-gray-600 mt-1">
          • Green base: Island foundation (ADM0)
        </p>
        <p className="text-xs text-gray-600">
          • Blue regions: Parish boundaries (ADM1)
        </p>
        <p className="text-xs text-gray-600">
          • Click parishes to highlight and extrude
        </p>
        {clickedParishes.size > 0 && (
          <div className="mt-2 p-2 bg-orange-50 rounded">
            <p className="text-xs text-orange-700 font-medium">
              {clickedParishes.size} parish{clickedParishes.size > 1 ? 'es' : ''} selected
            </p>
          </div>
        )}
        {hoveredParish && (
          <div className="mt-2 p-2 bg-yellow-50 rounded">
            <p className="text-xs text-yellow-700">
              Hovering: {hoveredParish}
            </p>
          </div>
        )}
        <div className="mt-2 text-xs text-gray-500">
          <div>Lng: {viewState.longitude.toFixed(4)}</div>
          <div>Lat: {viewState.latitude.toFixed(4)}</div>
        </div>
      </div>

      {/* DeckGL Map */}
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
        controller={{
          touchRotate: true,
          touchZoom: true,
          minZoom: 8,
          maxZoom: 16,
          minPitch: 0,
          maxPitch: 85
        }}
        layers={layers}
        pickingRadius={5}
        getCursor={({ isDragging, isHovering }) =>
          isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab'
        }
        style={{ position: 'relative', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Map3D;
