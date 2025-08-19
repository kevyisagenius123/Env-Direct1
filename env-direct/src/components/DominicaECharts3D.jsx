import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

const DominicaECharts3D = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('surface'); // surface, scatter, globe
  const [chartInstance, setChartInstance] = useState(null);

  // Dominica's geographical bounds
  const DOMINICA_BOUNDS = {
    minLat: 15.2,
    maxLat: 15.7,
    minLng: -61.5,
    maxLng: -61.2
  };

  // Generate optimized 3D data for Dominica (much smaller dataset for fast loading)
  const generateDominicaData = () => {
    const surfaceData = [];
    const scatterData = [];
    
    // Much larger step size for very fast loading (0.05 instead of 0.01)
    const step = 0.05;
    
    // Generate elevation data grid with minimal density
    for (let lat = DOMINICA_BOUNDS.minLat; lat <= DOMINICA_BOUNDS.maxLat; lat += step) {
      for (let lng = DOMINICA_BOUNDS.minLng; lng <= DOMINICA_BOUNDS.maxLng; lng += step) {
        // Simulate elevation data based on distance from center (mountainous interior)
        const centerLat = (DOMINICA_BOUNDS.minLat + DOMINICA_BOUNDS.maxLat) / 2;
        const centerLng = (DOMINICA_BOUNDS.minLng + DOMINICA_BOUNDS.maxLng) / 2;
        
        const distanceFromCenter = Math.sqrt(
          Math.pow(lat - centerLat, 2) + Math.pow(lng - centerLng, 2)
        );
        
        // Create simplified mountainous terrain
        let elevation = Math.max(0, 1200 * (1 - distanceFromCenter * 4) + 
                                     Math.random() * 100 - 50); // Much reduced randomness
        elevation = Math.max(0, elevation);
        
        surfaceData.push([lng, lat, elevation]);
        
        // Add very few scatter points for maximum performance
        if (Math.random() < 0.005 && elevation > 200) {
          scatterData.push([lng, lat, elevation + 30]);
        }
      }
    }
    
    return { surfaceData, scatterData };
  };

  // Generate minimal coastal and marine data
  const generateCoastalData = () => {
    const coastalPoints = [];
    const marineData = [];
    
    // Much reduced steps for maximum performance
    const steps = 20; // Reduced from 100 to 20
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * 2 * Math.PI;
      const radiusLat = (DOMINICA_BOUNDS.maxLat - DOMINICA_BOUNDS.minLat) / 2;
      const radiusLng = (DOMINICA_BOUNDS.maxLng - DOMINICA_BOUNDS.minLng) / 2;
      
      const centerLat = (DOMINICA_BOUNDS.minLat + DOMINICA_BOUNDS.maxLat) / 2;
      const centerLng = (DOMINICA_BOUNDS.minLng + DOMINICA_BOUNDS.maxLng) / 2;
      
      const lat = centerLat + radiusLat * Math.sin(angle) * 0.8;
      const lng = centerLng + radiusLng * Math.cos(angle) * 0.8;
      
      coastalPoints.push([lng, lat, 0]);
      
      // Minimal marine depth data for performance
      if (i % 4 === 0) { // Only every 4th point
        marineData.push([lng + radiusLng * 0.3, lat + radiusLat * 0.3, -200]);
      }
    }
    
    return { coastalPoints, marineData };
  };

  // Optimized chart configuration for surface view with better performance
  const getSurfaceConfig = (data) => ({
    backgroundColor: '#001829',
  // Highly optimized chart configuration for maximum performance
  const getSurfaceConfig = (data) => ({
    backgroundColor: '#001829',
    animation: false, // Disable all animations
    tooltip: {
      trigger: 'none' // Disable tooltips for better performance
    },
    visualMap: {
      show: false, // Hide visual map for performance
      type: 'continuous',
      min: -500,
      max: 1200,
      inRange: {
        color: ['#313695', '#74add1', '#fee090', '#f46d43', '#a50026']
      }
    },
    xAxis3D: {
      type: 'value',
      show: false, // Hide axes for performance
      min: DOMINICA_BOUNDS.minLng,
      max: DOMINICA_BOUNDS.maxLng
    },
    yAxis3D: {
      type: 'value',
      show: false,
      min: DOMINICA_BOUNDS.minLat,
      max: DOMINICA_BOUNDS.maxLat
    },
    zAxis3D: {
      type: 'value',
      show: false,
      min: -200,
      max: 1200
    },
    grid3D: {
      boxWidth: 100, // Reduced size
      boxHeight: 60,
      boxDepth: 40,
      show: false, // Hide grid
      viewControl: {
        alpha: 30,
        beta: 30,
        distance: 200,
        autoRotate: false, // Disable auto rotate for performance
        rotateSensitivity: 2,
        zoomSensitivity: 2
      },
      light: {
        main: {
          intensity: 1,
          shadow: false
        },
        ambient: {
          intensity: 0.4
        }
      },
      postEffect: {
        enable: false
      }
    },
    series: [
      {
        type: 'surface',
        data: data.surfaceData,
        wireframe: {
          show: false
        },
        itemStyle: {
          opacity: 0.9
        },
        shading: 'color', // Simplest shading
        silent: true, // Disable interactions for performance
        progressiveThreshold: 100, // Lower threshold for faster rendering
        progressive: 200
      }
    ]
  });st getGlobeConfig = () => ({
    backgroundColor: '#000',
    globe: {
      baseTexture: '/images/world.topo.bathy.200401.jpg',
      heightTexture: '/images/bathymetry_bw_composite_4k.jpg',
      displacementScale: 0.1,
      shading: 'lambert',
      light: {
        ambient: {
          intensity: 0.1
        },
        main: {
          intensity: 1.5
        }
      },
      viewControl: {
        autoRotate: true,
        autoRotateSpeed: 2,
        targetCoord: [-61.371, 15.414], // Dominica coordinates
        distance: 100
      },
      layers: [
        {
          type: 'scatter3D',
          coordinateSystem: 'globe',
          data: [[-61.371, 15.414, 1]], // Dominica marker
          symbolSize: 20,
          itemStyle: {
            color: '#ff6b6b'
          }
        }
      ]
    },
    series: []
  });

  // Initialize chart with progress tracking
  useEffect(() => {
    if (!chartRef.current) return;

    const initializeChart = async () => {
      try {
        setLoading(true);
        setLoadingProgress(10);
        
        // Dispose existing chart instance
        if (chartInstance) {
          chartInstance.dispose();
        }

        setLoadingProgress(30);
        const chart = echarts.init(chartRef.current);
        setChartInstance(chart);

        setLoadingProgress(50);
        // Generate data with progress updates
        const data = generateDominicaData();
        setLoadingProgress(70);
        
        const { coastalPoints, marineData } = generateCoastalData();
        setLoadingProgress(80);

        // Set chart configuration based on view mode
        let config;
        switch (viewMode) {
          case 'surface':
            config = getSurfaceConfig({ 
              ...data, 
              surfaceData: [...data.surfaceData, ...coastalPoints, ...marineData] 
            });
            break;
          case 'scatter':
            config = {
              ...getSurfaceConfig(data),
              series: [
                {
                  type: 'scatter3D',
                  data: data.surfaceData.filter((_, index) => index % 8 === 0), // Reduced density
                  symbolSize: 2, // Smaller symbols for performance
                  itemStyle: {
                    color: (params) => {
                      const elevation = params.data[2];
                      if (elevation < 0) return '#1e3a8a'; // Blue for water
                      if (elevation < 100) return '#22c55e'; // Green for lowlands
                      if (elevation < 500) return '#eab308'; // Yellow for hills
                      return '#dc2626'; // Red for mountains
                    }
                  },
                  progressiveThreshold: 300,
                  progressive: 600
                }
              ]
            };
            break;
          case 'globe':
            config = getGlobeConfig();
            break;
          default:
            config = getSurfaceConfig(data);
        }

        setLoadingProgress(90);
        chart.setOption(config, true); // Use notMerge for better performance

        setLoadingProgress(100);
        
        // Handle resize
        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);

        setTimeout(() => setLoading(false), 500); // Small delay to show completion

        return () => {
          window.removeEventListener('resize', handleResize);
          chart.dispose();
        };

      } catch (err) {
        console.error('Error initializing ECharts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    initializeChart();
  }, [viewMode]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-blue-500/30 border-t-blue-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-400">{loadingProgress}%</span>
            </div>
          </div>
          <h2 className="text-white text-2xl mb-3 font-bold">Loading ECharts 3D Dominica</h2>
          <div className="w-64 bg-gray-700 rounded-full h-2 mx-auto mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-white/70 text-sm">
            {loadingProgress < 30 ? 'Initializing 3D engine...' :
             loadingProgress < 60 ? 'Generating terrain data...' :
             loadingProgress < 90 ? 'Rendering 3D visualization...' :
             'Finalizing display...'}
          </p>
          <div className="mt-4 text-xs text-gray-400">
            💡 Tip: This optimized version loads faster with reduced data density
          </div>
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
      {/* Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 text-white rounded-lg p-3">
        <h1 className="text-xl font-bold text-center">🏝️ Dominica 3D - ECharts GL</h1>
        <p className="text-sm text-center text-gray-300 mt-1">
          Interactive 3D terrain visualization using Apache ECharts GL
        </p>
      </div>

      {/* View Mode Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4">
        <h3 className="font-bold text-lg mb-3 text-gray-800">View Modes</h3>
        
        <div className="space-y-2">
          <button
            onClick={() => setViewMode('surface')}
            className={`w-full px-3 py-2 rounded transition-colors ${
              viewMode === 'surface' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🏔️ Surface Terrain
          </button>
          
          <button
            onClick={() => setViewMode('scatter')}
            className={`w-full px-3 py-2 rounded transition-colors ${
              viewMode === 'scatter' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📍 Fast Points View
          </button>
          
          <button
            onClick={() => setViewMode('globe')}
            className={`w-full px-3 py-2 rounded transition-colors ${
              viewMode === 'globe' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🌍 Globe View
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-300">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Performance:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Optimized data density</li>
            <li>• Progressive rendering</li>
            <li>• Fast scatter mode</li>
            <li>• Reduced animations</li>
            <li>• Memory efficient</li>
          </ul>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-sm">
        <h4 className="font-bold text-lg mb-2 text-gray-800">Dominica Terrain Info</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <div><strong>Highest Peak:</strong> Morne Diablotins (1,447m)</div>
          <div><strong>Area:</strong> 751 km²</div>
          <div><strong>Coordinates:</strong> 15.414°N, 61.371°W</div>
          <div><strong>Type:</strong> Volcanic Island</div>
          <div><strong>Features:</strong> Rainforests, Mountains, Waterfalls</div>
        </div>
        
        <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
          💡 Use mouse to rotate, zoom, and explore the 3D terrain. 
          Switch between different visualization modes above.
        </div>
      </div>

      {/* ECharts Container */}
      <div 
        ref={chartRef} 
        className="w-full h-full"
        style={{ background: 'linear-gradient(to bottom, #001829, #003366)' }}
      />
    </div>
  );
};

export default DominicaECharts3D;
