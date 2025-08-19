import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

const DominicaECharts3DFast = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true); // Start with true while loading GeoJSON
  const [viewMode, setViewMode] = useState('fast'); // fast, minimal, points
  const [geoJsonData, setGeoJsonData] = useState(null);

  // Dominica's bounds
  const DOMINICA_BOUNDS = {
    minLat: 15.2,
    maxLat: 15.7,
    minLng: -61.5,
    maxLng: -61.2
  };

  // Load GeoJSON data on component mount
  useEffect(() => {
    const loadGeoJsonData = async () => {
      try {
        const response = await fetch('/dominica.geojson');
        const data = await response.json();
        setGeoJsonData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading GeoJSON data:', error);
        setLoading(false);
      }
    };

    loadGeoJsonData();
  }, []);

  // Process GeoJSON data to create 3D smart city visualization
  const processGeoJsonToSmartCity = () => {
    if (!geoJsonData) return { buildings: [], roads: [], zones: [], dataFlows: [] };
    
    const buildings = [];
    const roads = [];
    const zones = [];
    const dataFlows = [];
    const features = geoJsonData.features || [];
    
    // Sample features to create city blocks
    const sampleRate = Math.max(1, Math.floor(features.length / 800));
    
    features.forEach((feature, index) => {
      if (index % sampleRate !== 0) return;
      
      const geometry = feature.geometry;
      const properties = feature.properties || {};
      
      if (geometry && geometry.coordinates) {
        const coords = extractCoordinatesFromGeometry(geometry);
        
        coords.forEach((coord, coordIndex) => {
          if (coord.length >= 2) {
            const [lng, lat] = coord;
            
            if (lng >= DOMINICA_BOUNDS.minLng && lng <= DOMINICA_BOUNDS.maxLng &&
                lat >= DOMINICA_BOUNDS.minLat && lat <= DOMINICA_BOUNDS.maxLat) {
              
              // Create smart city elements based on feature type
              if (properties.building || properties.amenity) {
                // Create buildings with varying heights
                const height = calculateBuildingHeight(properties);
                const buildingType = getBuildingType(properties);
                buildings.push({
                  position: [lng, lat, height / 2],
                  height: height,
                  type: buildingType,
                  properties: properties
                });
              } else if (properties.highway || properties.waterway) {
                // Create road/transport networks
                roads.push([lng, lat, 5]);
              } else if (properties.natural || properties.landuse) {
                // Create zones and districts
                const zoneHeight = calculateZoneHeight(properties);
                zones.push({
                  position: [lng, lat, zoneHeight],
                  type: properties.natural || properties.landuse,
                  properties: properties
                });
              }
              
              // Add data flow connections randomly
              if (coordIndex % 50 === 0) {
                dataFlows.push({
                  start: [lng, lat, 50],
                  end: [lng + 0.01, lat + 0.01, 100],
                  intensity: Math.random()
                });
              }
            }
          }
        });
      }
    });
    
    return { buildings, roads, zones, dataFlows };
  };

  // Extract coordinates from different geometry types
  const extractCoordinatesFromGeometry = (geometry) => {
    const coords = [];
    
    switch (geometry.type) {
      case 'Point':
  // Calculate building height based on properties
  const calculateBuildingHeight = (properties) => {
    if (properties.building === 'skyscraper' || properties.amenity === 'bank') return 200 + Math.random() * 300;
    if (properties.building === 'commercial' || properties.shop) return 80 + Math.random() * 120;
    if (properties.building === 'residential' || properties.amenity === 'school') return 40 + Math.random() * 80;
    if (properties.building === 'industrial') return 60 + Math.random() * 100;
    if (properties.building === 'government' || properties.amenity === 'hospital') return 100 + Math.random() * 150;
    return 20 + Math.random() * 60; // Default building height
  };

  // Get building type for coloring
  const getBuildingType = (properties) => {
    if (properties.amenity === 'bank' || properties.building === 'commercial') return 'commercial';
    if (properties.building === 'residential') return 'residential';
    if (properties.amenity === 'hospital' || properties.amenity === 'school') return 'public';
    if (properties.building === 'industrial') return 'industrial';
    if (properties.amenity === 'government') return 'government';
    return 'mixed';
  };

  // Calculate zone heights for districts
  const calculateZoneHeight = (properties) => {
    if (properties.natural === 'forest') return 15 + Math.random() * 25;
    if (properties.natural === 'water') return 1;
    if (properties.landuse === 'industrial') return 30 + Math.random() * 20;
    if (properties.landuse === 'commercial') return 25 + Math.random() * 15;
    if (properties.landuse === 'residential') return 10 + Math.random() * 15;
    return 5 + Math.random() * 10;
  };  Math.pow((lat - centerLat) * 111, 2) + Math.pow((lng - centerLng) * 111 * Math.cos(lat * Math.PI / 180), 2)
    );
    
    // Base elevation from topography (Dominica is mountainous in center)
    let elevation = 0;
    
    if (distanceFromCenter < 10) {
      elevation = 1200 - (distanceFromCenter * 60); // Central mountains
    } else if (distanceFromCenter < 20) {
      elevation = 800 - (distanceFromCenter * 30); // Hills
    } else if (distanceFromCenter < 30) {
      elevation = 300 - (distanceFromCenter * 8); // Foothills
  useEffect(() => {
    if (!chartRef.current || !geoJsonData) return;

    const chart = echarts.init(chartRef.current, null, {
      renderer: 'canvas',
      devicePixelRatio: 1
    });

    let config;
    
    if (viewMode === 'fast') {
      // Smart City Visualization with Buildings and Data Flows
      const cityData = processGeoJsonToSmartCity();
      
      // Create building series
      const buildingSeries = [{
        type: 'bar3D',
        name: 'Buildings',
        data: cityData.buildings.map(building => [
          building.position[0], 
          building.position[1], 
          building.height
        ]),
        shading: 'realistic',
        itemStyle: {
          color: (params) => {
            const building = cityData.buildings[params.dataIndex];
            switch (building?.type) {
              case 'commercial': return '#FFD700'; // Gold
              case 'residential': return '#87CEEB'; // Sky blue
              case 'public': return '#98FB98'; // Pale green
              case 'industrial': return '#DDA0DD'; // Plum
              case 'government': return '#F0E68C'; // Khaki
              default: return '#B0C4DE'; // Light steel blue
            }
          },
          opacity: 0.9
        },
        emphasis: {
          itemStyle: {
            color: '#FFA500'
          }
        }
      }];

      // Create road/transport network
      const roadSeries = [{
        type: 'scatter3D',
        name: 'Transport Network',
        data: cityData.roads,
        symbolSize: 3,
        itemStyle: {
          color: '#FF6B35',
          opacity: 0.8
        }
      }];

      // Create zone districts
      const zoneSeries = [{
        type: 'scatter3D',
        name: 'Districts',
        data: cityData.zones.map(zone => zone.position),
        symbolSize: 8,
        itemStyle: {
          color: (params) => {
            const zone = cityData.zones[params.dataIndex];
            if (zone?.type === 'forest') return '#228B22';
            if (zone?.type === 'water') return '#00CED1';
            if (zone?.type === 'industrial') return '#8B4513';
            if (zone?.type === 'commercial') return '#DAA520';
            return '#32CD32';
          },
          opacity: 0.6
        }
      }];

      // Create data flow lines (glowing connections)
      const dataFlowSeries = [{
        type: 'line3D',
        name: 'Data Flows',
        data: cityData.dataFlows.map(flow => [flow.start, flow.end]),
        lineStyle: {
          color: '#00FFFF',
          width: 2,
          opacity: 0.8
        },
        effect: {
          show: true,
          trailLength: 0.5,
          period: 4,
          color: '#FFD700',
          symbolSize: 3
        }
      }];

      config = {
        backgroundColor: 'radial-gradient(circle, #001122 0%, #000000 100%)',
        animation: true,
        animationDuration: 2000,
        title: {
          text: 'Smart Dominica - Urban Planning Visualization',
          subtext: 'Interactive 3D City Model with Real-time Data',
          textStyle: { 
            color: '#ffffff', 
            fontSize: 18,
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: '#87CEEB',
            fontSize: 12
          },
          top: '3%',
          left: 'center'
        },
        grid3D: {
          boxWidth: 100,
          boxHeight: 80,
          boxDepth: 60,
          show: true,
          boxLineStyle: {
            color: '#333333',
            opacity: 0.2
          },
          viewControl: {
            distance: 180,
            autoRotate: true,
            autoRotateSpeed: 6,
            beta: 45,
            alpha: 30,
            panSensitivity: 2,
            zoomSensitivity: 2
          },
          light: {
            main: {
              intensity: 1.5,
              shadow: true,
              shadowQuality: 'high',
              color: '#ffffff'
            },
            ambient: {
              intensity: 0.4,
              color: '#404040'
            },
            ambientCubemap: {
              texture: null,
              diffuseIntensity: 0.5,
              specularIntensity: 0.5
            }
          },
          environment: '#001122',
          postEffect: {
            enable: true,
            bloom: {
              enable: true,
              intensity: 0.3
            },
            SSAO: {
              enable: true,
              intensity: 1.2,
              radius: 5
            }
          }
        },
        xAxis3D: { 
          name: 'Longitude',
          nameTextStyle: { color: '#ffffff' },
          min: DOMINICA_BOUNDS.minLng,
          max: DOMINICA_BOUNDS.maxLng,
          axisLine: { lineStyle: { color: '#666666' } },
          splitLine: { lineStyle: { color: '#333333', opacity: 0.3 } }
        },
        yAxis3D: { 
          name: 'Latitude',
          nameTextStyle: { color: '#ffffff' },
          min: DOMINICA_BOUNDS.minLat,
          max: DOMINICA_BOUNDS.maxLat,
          axisLine: { lineStyle: { color: '#666666' } },
          splitLine: { lineStyle: { color: '#333333', opacity: 0.3 } }
        },
        zAxis3D: { 
          name: 'Height (m)',
          nameTextStyle: { color: '#ffffff' },
          min: 0,
          max: 600,
          axisLine: { lineStyle: { color: '#666666' } },
          splitLine: { lineStyle: { color: '#333333', opacity: 0.3 } }
        },
        legend: {
          show: true,
          textStyle: { color: '#ffffff' },
          top: '85%',
          orient: 'horizontal'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#00FFFF',
          borderWidth: 1,
          textStyle: { color: '#ffffff' },
          formatter: function(params) {
            if (params.seriesName === 'Buildings') {
              const building = cityData.buildings[params.dataIndex];
              return `Building Type: ${building?.type || 'Mixed'}<br/>
                      Height: ${params.data[2].toFixed(0)}m<br/>
                      Location: ${params.data[0].toFixed(4)}, ${params.data[1].toFixed(4)}`;
            }
            return `${params.seriesName}<br/>
                    Height: ${params.data[2]?.toFixed(0) || 0}m<br/>
                    Location: ${params.data[0]?.toFixed(4)}, ${params.data[1]?.toFixed(4)}`;
          }
        },
        series: [...buildingSeries, ...roadSeries, ...zoneSeries]
      };
    } else if (viewMode === 'minimal') {
      // Simplified cityscape view
      const cityData = processGeoJsonToSmartCity();
      config = {
        backgroundColor: '#001122',
        animation: false,
        title: {
          text: 'Dominica - Simplified Urban View',
          textStyle: { color: '#ffffff', fontSize: 14 },
          top: '5%',
          left: 'center'
        },
        grid3D: {
          boxWidth: 80,
          boxHeight: 50,
          boxDepth: 30,
          show: false,
          viewControl: {
            distance: 150,
            autoRotate: true,
            autoRotateSpeed: 5
          },
          light: {
            main: { intensity: 1.2 },
            ambient: { intensity: 0.3 }
          }
        },
        xAxis3D: { show: false },
        yAxis3D: { show: false },
        zAxis3D: { show: false },
        series: [{
          type: 'scatter3D',
          data: cityData.buildings.map(b => b.position),
          symbolSize: 5,
          itemStyle: { 
            opacity: 0.7,
            color: '#32CD32'
          }
        }]
      };
    } else {
      // Key landmarks and infrastructure
      const cityData = processGeoJsonToSmartCity();
      const keyBuildings = cityData.buildings
        .filter(b => b.height > 100)
        .map(b => b.position);
        
      config = {
        backgroundColor: '#001122',
        animation: false,
        title: {
          text: 'Dominica - Key Infrastructure',
          textStyle: { color: '#ffffff', fontSize: 14 },
          top: '5%',
          left: 'center'
        },
        grid3D: {
          boxWidth: 60,
          boxHeight: 40,
          boxDepth: 25,
          show: false,
          viewControl: {
            distance: 120
          }
        },
        xAxis3D: { show: false },
        yAxis3D: { show: false },
        zAxis3D: { show: false },
        series: [{
          type: 'scatter3D',
          data: keyBuildings,
          symbolSize: 8,
          itemStyle: { color: '#FFD700' }
        }]
      };
    }

    chart.setOption(config);
    
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    setLoading(false);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [viewMode, geoJsonData]);
          type: 'scatter3D',
          data: data,
          symbolSize: 4,
          itemStyle: { color: '#00aaff' }
        }]
      };
    }

    chart.setOption(config);
    
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    // Set loading to false immediately
    setLoading(false);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [viewMode, geoJsonData]);

  // Helper function to create surface data from scattered points
  const createSurfaceFromPoints = (points) => {
    // Create a simplified grid from the scattered points
    return points.filter((_, index) => index % 5 === 0); // Take every 5th point
  };  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">⚡ Loading super fast 3D...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 text-white rounded-lg p-3">
        <h1 className="text-xl font-bold text-center">🗺️ Dominica - Real GeoJSON Data</h1>
        <p className="text-sm text-center text-gray-300">OpenStreetMap geographic features</p>
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 rounded-lg p-3">
        <h3 className="font-bold mb-2">View Modes</h3>
        
        <div className="space-y-2">
          <button
            onClick={() => setViewMode('fast')}
            className={`w-full px-3 py-2 text-sm rounded ${
              viewMode === 'fast' ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}
          >
            🏔️ Full Terrain
          </button>
          
          <button
            onClick={() => setViewMode('minimal')}
            className={`w-full px-3 py-2 text-sm rounded ${
              viewMode === 'minimal' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            � Surface View
          </button>
          
          <button
            onClick={() => setViewMode('points')}
            className={`w-full px-3 py-2 text-sm rounded ${
              viewMode === 'points' ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            📍 Key Points
          </button>
        </div>
      </div>

      {/* Geographic Info */}
      <div className="absolute bottom-4 right-4 z-10 bg-emerald-900/80 text-white rounded-lg p-3">
        <h4 className="font-bold text-sm mb-1">🏝️ Dominica Facts</h4>
        <div className="text-xs space-y-1">
          <div>• Length: 47 km (29 mi)</div>
          <div>• Width: 26 km (16 mi)</div>
          <div>• Highest: Morne Diablotin (1,447m)</div>
          <div>• Capital: Roseau</div>
          <div>• Nature Island of Caribbean</div>
        </div>
      </div>

      {/* Chart Container */}
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default DominicaECharts3DFast;
