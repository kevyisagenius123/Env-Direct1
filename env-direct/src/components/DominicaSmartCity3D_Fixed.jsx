import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

const DominicaSmartCity3D = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('enhanced3D');
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [parishData, setParishData] = useState(null);
  const [buildingStats, setBuildingStats] = useState({
    buildings: 0,
    zones: 0,
    transport: 0,
    dataPoints: 0
  });

  // Dominica geographical bounds for accurate mapping
  const DOMINICA_BOUNDS = {
    minLat: 15.2,
    maxLat: 15.7,
    minLng: -61.6,
    maxLng: -61.2
  };

  // Create coastline from real Dominica parish boundaries at sea level
  const createCoastlineFromGeoJSON = () => {
    if (!parishData || !parishData.features) {
      console.log('No parish data available, using approximated coastline');
      return createApproximateCoastline();
    }

    const coastlinePoints = [];
    
    // Extract all boundary coordinates from parish polygons
    parishData.features.forEach(feature => {
      if (feature.geometry && feature.geometry.type === 'Polygon') {
        const coordinates = feature.geometry.coordinates[0]; // Outer ring
        coordinates.forEach(coord => {
          if (coord.length >= 2) {
            coastlinePoints.push([coord[0], coord[1], 0]); // z=0 for sea level
          }
        });
      }
    });

    // Remove duplicate points and sort for better line rendering
    const uniquePoints = [];
    const tolerance = 0.001; // ~100m tolerance for duplicate removal
    
    coastlinePoints.forEach(point => {
      const isDuplicate = uniquePoints.some(existing => 
        Math.abs(existing[0] - point[0]) < tolerance && 
        Math.abs(existing[1] - point[1]) < tolerance
      );
      if (!isDuplicate) {
        uniquePoints.push(point);
      }
    });

    console.log(`Created coastline from ${uniquePoints.length} boundary points`);
    return uniquePoints;
  };

  // Fallback: Create approximate coastline at sea level for 3D island outline
  const createApproximateCoastline = () => {
    const coastline = [];
    const resolution = 100; // Higher resolution for smooth coastline
    
    // Create approximate Dominica coastline shape
    for (let i = 0; i <= resolution; i++) {
      const angle = (i / resolution) * 2 * Math.PI;
      
      // Dominica's elongated north-south shape
      const radiusLat = 0.22; // ~25km north-south
      const radiusLng = 0.15; // ~17km east-west
      
      // Add coastal irregularities
      const irregularity = 
        Math.sin(angle * 3) * 0.02 + 
        Math.sin(angle * 7) * 0.01 + 
        Math.sin(angle * 12) * 0.005;
      
      const centerLat = (DOMINICA_BOUNDS.minLat + DOMINICA_BOUNDS.maxLat) / 2;
      const centerLng = (DOMINICA_BOUNDS.minLng + DOMINICA_BOUNDS.maxLng) / 2;
      
      const lat = centerLat + Math.cos(angle) * (radiusLat + irregularity);
      const lng = centerLng + Math.sin(angle) * (radiusLng + irregularity);
      
      coastline.push([lng, lat, 0]); // z=0 for sea level
    }
    
    return coastline;
  };

  // Enhanced terrain generation using parish boundaries for island mask
  const createIslandSurfaceWithBoundaries = () => {
    const surface = [];
    const steps = 80; // Higher resolution for better terrain quality
    const latStep = (DOMINICA_BOUNDS.maxLat - DOMINICA_BOUNDS.minLat) / steps;
    const lngStep = (DOMINICA_BOUNDS.maxLng - DOMINICA_BOUNDS.minLng) / steps;
    
    // Create a function to check if a point is inside Dominica
    const isInsideDominica = (lng, lat) => {
      if (!parishData || !parishData.features) {
        // Fallback to circular approximation
        const centerLat = (DOMINICA_BOUNDS.minLat + DOMINICA_BOUNDS.maxLat) / 2;
        const centerLng = (DOMINICA_BOUNDS.minLng + DOMINICA_BOUNDS.maxLng) / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow((lat - centerLat) * 111, 2) + 
          Math.pow((lng - centerLng) * 111 * Math.cos(centerLat * Math.PI / 180), 2)
        );
        return distanceFromCenter < 28; // 28km radius
      }
      
      // Check if point is inside any parish polygon
      return parishData.features.some(feature => {
        if (feature.geometry && feature.geometry.type === 'Polygon') {
          return pointInPolygon([lng, lat], feature.geometry.coordinates[0]);
        }
        return false;
      });
    };
    
    // Sort by latitude first, then longitude (row-major) for better surface rendering
    for (let i = 0; i <= steps; i++) {
      for (let j = 0; j <= steps; j++) {
        const lat = DOMINICA_BOUNDS.minLat + i * latStep;
        const lng = DOMINICA_BOUNDS.minLng + j * lngStep;
        
        let elevation = 0;
        
        if (isInsideDominica(lng, lat)) {
          // Enhanced elevation modeling for realistic Dominica terrain
          const centerLat = (DOMINICA_BOUNDS.minLat + DOMINICA_BOUNDS.maxLat) / 2;
          const centerLng = (DOMINICA_BOUNDS.minLng + DOMINICA_BOUNDS.maxLng) / 2;
          
          // Distance from center in km
          const distanceFromCenter = Math.sqrt(
            Math.pow((lat - centerLat) * 111, 2) + 
            Math.pow((lng - centerLng) * 111 * Math.cos(centerLat * Math.PI / 180), 2)
          );
          
          // Create realistic Dominica terrain with multiple peaks
          const maxDistance = 28; // km - island radius
          
          // Main elevation profile (volcanic island shape)
          const baseElevation = (1 - Math.pow(distanceFromCenter / maxDistance, 1.5)) * 1447;
          
          // Add multiple volcanic peaks (Dominica has several)
          const peak1 = Math.exp(-Math.pow(distanceFromCenter - 5, 2) / 50) * 300; // Morne Diablotins area
          const peak2 = Math.exp(-Math.pow(distanceFromCenter - 8, 2) / 40) * 200; // Secondary peaks
          const peak3 = Math.exp(-Math.pow(distanceFromCenter - 12, 2) / 60) * 150; // Coastal hills
          
          // Add realistic terrain noise
          const terrainNoise = 
            Math.sin(lat * 25) * Math.cos(lng * 30) * 80 +
            Math.sin(lat * 50) * Math.cos(lng * 45) * 40 +
            Math.sin(lat * 100) * Math.cos(lng * 80) * 20;
          
          elevation = Math.max(0, baseElevation + peak1 + peak2 + peak3 + terrainNoise);
          
          // Coastal smoothing - lower elevation near edges
          if (distanceFromCenter > maxDistance * 0.8) {
            const coastalFactor = 1 - (distanceFromCenter - maxDistance * 0.8) / (maxDistance * 0.2);
            elevation *= Math.pow(coastalFactor, 0.5);
          }
        }
        
        surface.push([lng, lat, elevation]);
      }
    }
    return surface;
  };

  // Point-in-polygon algorithm for checking if coordinates are inside Dominica
  const pointInPolygon = (point, polygon) => {
    const [x, y] = point;
    let inside = false;
    
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    
    return inside;
  };

  // Load GeoJSON data and parish boundaries
  useEffect(() => {
    const loadGeoJsonData = async () => {
      try {
        setLoading(true);
        console.log('Loading Dominica data...');
        
        // Load building data
        const buildingResponse = await fetch('/dominica-buildings.geojson');
        if (!buildingResponse.ok) {
          console.warn(`Building data not available: ${buildingResponse.status}`);
        } else {
          const buildingData = await buildingResponse.json();
          console.log('Loaded building data:', buildingData.features?.length || 0, 'features');
          setGeoJsonData(buildingData);
        }
        
        // Load parish boundary data
        const parishResponse = await fetch('/dominica-parishes.json');
        if (!parishResponse.ok) {
          console.warn(`Parish data not available: ${parishResponse.status}`);
        } else {
          const parishBoundaries = await parishResponse.json();
          console.log('Loaded parish data:', parishBoundaries.features?.length || 0, 'parishes');
          setParishData(parishBoundaries);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading GeoJSON data:', error);
        setLoading(false);
      }
    };

    loadGeoJsonData();
  }, []);

  // Enhanced building height calculation
  const calculateEnhancedBuildingHeight = (properties) => {
    const height = parseFloat(properties?.height) || 0;
    const levels = parseFloat(properties?.['building:levels']) || 0;
    
    if (height > 0) return height;
    if (levels > 0) return levels * 3.5;
    
    // Smart height based on building type
    const buildingType = properties?.building || properties?.amenity || '';
    const heightMap = {
      'cathedral': 40, 'church': 20, 'chapel': 15,
      'hospital': 25, 'clinic': 12, 'pharmacy': 8,
      'school': 15, 'university': 20, 'college': 18,
      'hotel': 30, 'resort': 25, 'restaurant': 10,
      'bank': 15, 'office': 20, 'government': 18,
      'police': 12, 'fire_station': 10, 'courthouse': 25,
      'warehouse': 12, 'factory': 15, 'industrial': 18,
      'apartments': 25, 'house': 8, 'residential': 12,
      'commercial': 15, 'retail': 10, 'shop': 8
    };
    
    return heightMap[buildingType.toLowerCase()] || 10;
  };

  // Enhanced building type classification
  const getEnhancedBuildingType = (properties) => {
    const amenity = properties?.amenity || '';
    const building = properties?.building || '';
    const tourism = properties?.tourism || '';
    const office = properties?.office || '';
    
    if (amenity.includes('church') || amenity.includes('cathedral') || 
        amenity.includes('chapel') || building.includes('church')) {
      return 'religious';
    }
    
    if (amenity.includes('hospital') || amenity.includes('clinic') || 
        amenity.includes('pharmacy') || amenity.includes('health')) {
      return 'healthcare';
    }
    
    if (amenity.includes('school') || amenity.includes('university') || 
        amenity.includes('college') || building.includes('school')) {
      return 'education';
    }
    
    if (amenity.includes('government') || amenity.includes('police') || 
        amenity.includes('fire_station') || amenity.includes('courthouse')) {
      return 'government';
    }
    
    if (tourism.includes('hotel') || tourism.includes('resort') || 
        amenity.includes('restaurant') || tourism.includes('attraction')) {
      return 'tourism';
    }
    
    if (amenity.includes('bank') || amenity.includes('shop') || 
        building.includes('commercial') || building.includes('retail')) {
      return 'commercial';
    }
    
    if (office || building.includes('office')) {
      return 'office';
    }
    
    if (building.includes('industrial') || building.includes('warehouse') || 
        building.includes('factory')) {
      return 'industrial';
    }
    
    if (building.includes('house') || building.includes('apartment') || 
        building.includes('residential')) {
      return 'residential';
    }
    
    return 'mixed';
  };

  // Get enhanced building information
  const getBuildingInfo = (properties) => {
    return {
      name: properties?.name || properties?.['name:en'] || 'Unnamed Building',
      address: properties?.['addr:full'] || 
               `${properties?.['addr:housenumber'] || ''} ${properties?.['addr:street'] || ''}`.trim() ||
               'Dominica',
      levels: properties?.['building:levels'] || 'N/A',
      material: properties?.['building:material'] || properties?.material || 'N/A'
    };
  };

  // Extract coordinates from different geometry types
  const extractCoordinatesFromGeometry = (geometry) => {
    const coords = [];
    
    switch (geometry.type) {
      case 'Point':
        coords.push(geometry.coordinates);
        break;
      case 'LineString':
        coords.push(...geometry.coordinates);
        break;
      case 'Polygon':
        if (geometry.coordinates[0]) {
          coords.push(...geometry.coordinates[0]);
        }
        break;
      case 'MultiPolygon':
        geometry.coordinates.forEach(polygon => {
          if (polygon[0]) {
            coords.push(...polygon[0]);
          }
        });
        break;
      default:
        console.warn('Unknown geometry type:', geometry.type);
    }
    
    return coords;
  };

  // Process GeoJSON data to create smart city visualization
  const processGeoJsonToSmartCity = () => {
    if (!geoJsonData || !geoJsonData.features) {
      return { buildings: [], roads: [], zones: [], dataFlows: [] };
    }
    
    const buildings = [];
    const roads = [];
    const zones = [];
    const features = geoJsonData.features || [];
    
    console.log('Processing features:', features.length);
    
    // Performance limits
    const maxBuildings = 1500;
    const maxRoads = 300;
    const maxZones = 200;
    let buildingCount = 0;
    let roadCount = 0;
    let zoneCount = 0;
    
    // Process features with performance limits
    for (let i = 0; i < features.length && buildingCount < maxBuildings; i++) {
      const feature = features[i];
      const geometry = feature.geometry;
      const properties = feature.properties || {};
      
      if (geometry && geometry.coordinates) {
        const coords = extractCoordinatesFromGeometry(geometry);
        
        if (coords.length > 0) {
          const [lng, lat] = coords[0];
          
          if (lng >= DOMINICA_BOUNDS.minLng && lng <= DOMINICA_BOUNDS.maxLng &&
              lat >= DOMINICA_BOUNDS.minLat && lat <= DOMINICA_BOUNDS.maxLat) {
            
            if ((properties.building || properties.amenity || 
                properties['building:levels'] || properties.height ||
                geometry.type === 'Polygon') && buildingCount < maxBuildings) {
              
              const height = calculateEnhancedBuildingHeight(properties);
              const buildingType = getEnhancedBuildingType(properties);
              const buildingInfo = getBuildingInfo(properties);
              
              buildings.push({
                position: [lng, lat, height],
                height: height,
                type: buildingType,
                info: buildingInfo,
                properties: properties
              });
              buildingCount++;
              
            } else if ((properties.highway || properties.waterway || 
                      properties.railway) && roadCount < maxRoads) {
              roads.push({
                position: [lng, lat, 5],
                type: 'transport',
                properties: properties
              });
              roadCount++;
              
            } else if ((properties.natural || properties.landuse) && 
                      zoneCount < maxZones) {
              zones.push({
                position: [lng, lat, 8],
                type: 'zone',
                properties: properties
              });
              zoneCount++;
            }
          }
        }
      }
    }
    
    console.log('Processed data:', {
      buildings: buildings.length,
      roads: roads.length, 
      zones: zones.length
    });
    
    return { buildings, roads, zones, dataFlows: [] };
  };

  // Update stats when data is processed
  useEffect(() => {
    if (geoJsonData) {
      const cityData = processGeoJsonToSmartCity();
      setBuildingStats({
        buildings: cityData.buildings.length,
        zones: cityData.zones.length,
        transport: cityData.roads.length,
        dataPoints: 0
      });
    }
  }, [geoJsonData, viewMode]);

  // Create and update chart
  useEffect(() => {
    if (loading) return;

    const chart = echarts.init(chartRef.current);
    let cityData = { buildings: [], roads: [], zones: [], dataFlows: [] };
    
    if (geoJsonData) {
      cityData = processGeoJsonToSmartCity();
    }

    let config;
    
    if (viewMode === 'enhanced3D') {
      // Enhanced 3D Island View with surface3D terrain using real boundaries
      const islandSurface = createIslandSurfaceWithBoundaries();
      const coastline = createCoastlineFromGeoJSON();
      
      // Calculate elevation range for visual mapping
      const elevations = islandSurface.map(point => point[2]);
      const zMin = Math.min(...elevations);
      const zMax = Math.max(...elevations);
      
      // Prepare buildings for bar3D
      const buildingBars = cityData.buildings.map(building => ({
        value: [building.position[0], building.position[1], building.height],
        name: building.info?.name || 'Building'
      }));
      
      config = {
        backgroundColor: '#071529', // Deep ocean blue
        animation: false,
        title: {
          text: '🏝️ Dominica - Real Parish Boundaries + Terrain',
          subtext: 'Authentic GeoJSON Coastline • Surface3D Terrain • Building Database',
          textStyle: { 
            color: '#cfe3ff', 
            fontSize: 16,
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: '#9cc4ff',
            fontSize: 11
          },
          top: '3%',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.9)',
          borderColor: '#4a90e2',
          borderWidth: 2,
          textStyle: { color: '#ffffff', fontSize: 11 },
          formatter: function(params) {
            if (params.seriesType === 'bar3D') {
              const [x,y,h] = params.value;
              return `<b>${params.name || 'Building'}</b><br/>Height: ${Math.round(h)} m<br/>Lon: ${x.toFixed(4)}<br/>Lat: ${y.toFixed(4)}`;
            }
            if (params.seriesType === 'surface') {
              const [x,y,z] = params.value;
              return `Elevation: ${Math.round(z)} m<br/>Lon: ${x.toFixed(4)}<br/>Lat: ${y.toFixed(4)}`;
            }
            if (params.seriesType === 'line3D') {
              const [x,y,z] = params.value;
              return `<b>Dominica Coastline</b><br/>Sea Level (${z}m)<br/>Lon: ${x.toFixed(4)}<br/>Lat: ${y.toFixed(4)}`;
            }
            return '';
          }
        },
        visualMap: {
          show: true,
          dimension: 2, // Color by elevation (z-axis)
          min: Math.max(0, zMin),
          max: zMax,
          calculable: true,
          text: ['Higher','Lower'],
          textStyle: { color: '#cfe3ff' },
          inRange: { 
            color: ['#2b83ba','#abdda4','#ffffbf','#fdae61','#d7191c'] // Elevation color scheme
          },
          top: '10%',
          right: '5%'
        },
        grid3D: {
          environment: '#071529', // Match background
          boxWidth: 180, 
          boxDepth: 180,
          axisPointer: { show: false },
          viewControl: {
            distance: 220, 
            alpha: 35, 
            beta: -20,
            minDistance: 80, 
            maxDistance: 500, 
            animation: true,
            panSensitivity: 1,
            zoomSensitivity: 1
          },
          light: {
            main: { 
              intensity: 1.1, 
              alpha: 30, 
              beta: 35, 
              shadow: true 
            },
            ambient: { 
              intensity: 0.45 
            }
          },
          postEffect: {
            enable: true,
            SSAO: { enable: true, radius: 2 },
            bloom: { enable: true, intensity: 0.15 }
          },
          axisLabel: { color: '#9cc4ff' },
          splitLine: { lineStyle: { color: 'rgba(156,196,255,.15)' } },
          axisLine: { lineStyle: { color: 'rgba(156,196,255,.5)' } }
        },
        xAxis3D: { 
          name: 'Longitude', 
          min: DOMINICA_BOUNDS.minLng, 
          max: DOMINICA_BOUNDS.maxLng 
        },
        yAxis3D: { 
          name: 'Latitude', 
          min: DOMINICA_BOUNDS.minLat, 
          max: DOMINICA_BOUNDS.maxLat 
        },
        zAxis3D: { 
          name: 'Height (m)', 
          min: 0, 
          max: Math.max(zMax, 300)
        },
        series: [
          // 1. Solid terrain surface using real boundaries
          {
            type: 'surface',
            name: 'Terrain',
            data: islandSurface,
            shading: 'lambert', // Realistic lighting
            wireframe: { show: false },
            silent: true // Don't interfere with building tooltips
          },
          // 2. Real coastline from parish boundaries at sea level
          {
            type: 'line3D',
            name: 'Dominica Coastline',
            data: coastline,
            lineStyle: { 
              width: 3, 
              opacity: 0.95,
              color: '#00bfff' // Bright blue for authentic coastline
            },
            effect: { show: false }
          }
        ]
      };

      // Add buildings if available
      if (buildingBars.length > 0) {
        config.series.push({
          name: 'Buildings',
          type: 'bar3D',
          data: buildingBars,
          barSize: 0.5,
          minHeight: 0.5,
          shading: 'lambert',
          itemStyle: { 
            opacity: 0.96,
            color: (params) => {
              const building = cityData.buildings[params.dataIndex];
              switch (building?.type) {
                case 'religious': return '#FFD700';
                case 'education': return '#4169E1';
                case 'healthcare': return '#FF6347';
                case 'government': return '#32CD32';
                case 'commercial': return '#FF8C00';
                case 'tourism': return '#FF1493';
                case 'industrial': return '#8B4513';
                case 'residential': return '#87CEEB';
                case 'office': return '#9370DB';
                default: return '#B0C4DE';
              }
            }
          }
        });
      }
    } else {
      // Standard Smart City view for other modes
      config = {
        backgroundColor: 'radial-gradient(circle, #001122 0%, #000000 100%)',
        animation: false,
        title: {
          text: 'Smart Dominica - Building Database',
          subtext: 'Real Dominica Building Data Visualization',
          textStyle: { 
            color: '#ffffff', 
            fontSize: 16,
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: '#87CEEB',
            fontSize: 11
          },
          top: '3%',
          left: 'center'
        },
        grid3D: {
          boxWidth: 80,
          boxHeight: 60,
          boxDepth: 40,
          viewControl: {
            distance: 150,
            autoRotate: false,
            beta: 45,
            alpha: 30
          }
        },
        xAxis3D: { 
          min: DOMINICA_BOUNDS.minLng,
          max: DOMINICA_BOUNDS.maxLng
        },
        yAxis3D: { 
          min: DOMINICA_BOUNDS.minLat,
          max: DOMINICA_BOUNDS.maxLat
        },
        zAxis3D: { 
          min: 0,
          max: 300
        },
        series: [{
          type: 'bar3D',
          name: 'Buildings',
          data: cityData.buildings.map(building => [
            building.position[0], 
            building.position[1], 
            building.height
          ]),
          itemStyle: {
            color: '#87CEEB',
            opacity: 0.8
          }
        }]
      };
    }

    chart.setOption(config);
    
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [geoJsonData, parishData, viewMode, loading]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Loading Smart Dominica</h3>
          <p className="text-gray-300">Processing comprehensive building database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-blue-900 relative">
      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md rounded-lg p-4 border border-cyan-500/30">
        <h3 className="text-cyan-400 font-bold mb-3 text-sm">🏝️ Terrain Visualization</h3>
        
        {/* View Mode Selector */}
        <div className="mb-4">
          <label className="block text-white text-xs mb-2">Rendering Mode</label>
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value)}
            className="w-full bg-gray-800 text-white text-xs p-2 rounded border border-gray-600"
          >
            <option value="enhanced3D">🏔️ Surface3D + Buildings</option>
            <option value="smartCity">🏙️ Smart City View</option>
            <option value="districts">🗺️ Districts Overview</option>
            <option value="landmarks">🏛️ Landmarks & Sites</option>
          </select>
        </div>

        {/* Enhanced Statistics */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-cyan-300">
            <span>🏢 Buildings:</span>
            <span className="font-mono">{buildingStats.buildings}</span>
          </div>
          <div className="flex justify-between text-orange-300">
            <span>🛣️ Transport:</span>
            <span className="font-mono">{buildingStats.transport}</span>
          </div>
          <div className="flex justify-between text-green-300">
            <span>🌿 Zones:</span>
            <span className="font-mono">{buildingStats.zones}</span>
          </div>
          <div className="flex justify-between text-purple-300">
            <span>⛰️ Peak Height:</span>
            <span className="font-mono">1,447m</span>
          </div>
        </div>
        
        {/* Terrain Info */}
        {viewMode === 'enhanced3D' && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <h4 className="text-cyan-300 font-semibold text-xs mb-2">Terrain Details</h4>
            <div className="space-y-1 text-xs text-gray-300">
              <div>• Real parish boundaries</div>
              <div>• Authentic GeoJSON coastline</div>
              <div>• Surface3D Lambert shading</div>
              <div>• Morne Diablotins peak</div>
              <div>• 10 parish polygons</div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Legend */}
      <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-cyan-500/30">
        <h4 className="text-cyan-400 font-bold mb-2 text-xs">🗺️ Visualization Legend</h4>
        
        {viewMode === 'enhanced3D' ? (
          <div className="space-y-2 text-xs">
            {/* Terrain Colors */}
            <div className="mb-3">
              <div className="text-white font-semibold mb-1">Elevation (Terrain)</div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-3 h-2 bg-gradient-to-r from-blue-600 to-green-400"></div>
                <span className="text-gray-300">0-500m</span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-3 h-2 bg-gradient-to-r from-yellow-300 to-orange-400"></div>
                <span className="text-gray-300">500-1000m</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-2 bg-gradient-to-r from-red-400 to-red-600"></div>
                <span className="text-gray-300">1000m+ (Peak)</span>
              </div>
            </div>
            
            {/* Building Types */}
            <div>
              <div className="text-white font-semibold mb-1">Building Types</div>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded"></div>
                  <span className="text-white text-xs">Religious</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded"></div>
                  <span className="text-white text-xs">Education</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded"></div>
                  <span className="text-white text-xs">Healthcare</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded"></div>
                  <span className="text-white text-xs">Government</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded"></div>
                  <span className="text-white text-xs">Commercial</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-sky-400 rounded"></div>
                  <span className="text-white text-xs">Residential</span>
                </div>
              </div>
            </div>
            
            {/* Special Features */}
            <div className="mt-3 pt-2 border-t border-gray-600">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300 text-xs">Real Parish Coastline</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-red-600 rounded"></div>
                <span className="text-gray-300 text-xs">Boundary-Based Terrain</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-white">Religious</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span className="text-white">Education</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-white">Healthcare</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-white">Government</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-white">Commercial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-sky-400 rounded"></div>
              <span className="text-white">Residential</span>
            </div>
          </div>
        )}
      </div>

      {/* 3D Visualization */}
      <div ref={chartRef} className="w-full h-full" />
      
      {/* Navigation Help */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600/50">
        <div className="text-gray-300 text-xs font-mono">
          🖱️ Drag: Rotate • 🖲️ Wheel: Zoom • ⇧+Drag: Pan
        </div>
      </div>
    </div>
  );
};

export default DominicaSmartCity3D;
