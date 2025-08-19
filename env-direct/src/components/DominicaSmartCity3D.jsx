import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

// Import modular components
import {
  DOMINICA_BOUNDS,
  MORNE_DIABLOTINS,
  HURRICANE_TRACKS,
  LANDSLIDE_RISK_GRID,
  TOURISM_FLOWS,
  SEISMIC_DATA,
  RAINFALL_DATA
} from './dominica/DominicaConstants';

import {
  createIslandSurfaceWithBoundaries,
  createCoastlineFromGeoJSON,
  pointInPolygon,
  createApproximateCoastline,
  createRoseauBuildings,
  createRoseauRoads,
  createHurricaneTrack
} from './dominica/TerrainUtils';

import {
  processGeoJsonToSmartCity,
  calculateEnhancedBuildingHeight,
  getEnhancedBuildingType,
  getBuildingInfo,
  extractCoordinatesFromGeometry
} from './dominica/BuildingUtils';

import {
  ControlPanel,
  StatsPanel,
  Legend,
  LoadingIndicator
} from './dominica/UIComponents.jsx';

import {
  generateChartOptions
} from './dominica/VisualizationConfig';

const DominicaSmartCity3D = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('smartCity');
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [parishData, setParishData] = useState(null);
  const [animationTime, setAnimationTime] = useState(0);
  const [buildingStats, setBuildingStats] = useState({
    buildings: 0,
    zones: 0,
    transport: 0,
    dataPoints: 0
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Try to load parish boundaries (optional)
        try {
          const parishResponse = await fetch('/data/dominica-parishes.geojson');
          if (parishResponse.ok) {
            const parishGeoJson = await parishResponse.json();
            setParishData(parishGeoJson);
          } else {
            console.warn('Parish data not available, using fallback');
          }
        } catch (parishError) {
          console.warn('Parish data loading failed, using fallback:', parishError);
          // Create basic parish data structure for Dominica if external file fails
          setParishData({
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: { name: "Saint George" },
                geometry: {
                  type: "Polygon",
                  coordinates: [[
                    [-61.45, 15.35], [-61.40, 15.35], [-61.40, 15.40], [-61.45, 15.40], [-61.45, 15.35]
                  ]]
                }
              },
              {
                type: "Feature", 
                properties: { name: "Saint Andrew" },
                geometry: {
                  type: "Polygon",
                  coordinates: [[
                    [-61.50, 15.40], [-61.45, 15.40], [-61.45, 15.50], [-61.50, 15.50], [-61.50, 15.40]
                  ]]
                }
              },
              {
                type: "Feature",
                properties: { name: "Saint David" },
                geometry: {
                  type: "Polygon", 
                  coordinates: [[
                    [-61.40, 15.40], [-61.35, 15.40], [-61.35, 15.50], [-61.40, 15.50], [-61.40, 15.40]
                  ]]
                }
              }
            ]
          });
        }

        // Try to load buildings data (optional)
        try {
          const buildingsResponse = await fetch('/data/dominica-buildings.geojson');
          if (buildingsResponse.ok) {
            const buildingsGeoJson = await buildingsResponse.json();
            setGeoJsonData(buildingsGeoJson);
            
            // Calculate stats
            if (buildingsGeoJson.features) {
              setBuildingStats({
                buildings: buildingsGeoJson.features.length,
                zones: 10,
                transport: 25,
                dataPoints: buildingsGeoJson.features.length * 3
              });
            }
          } else {
            console.warn('Buildings data not available, using demo data');
            // Set demo stats
            setBuildingStats({
              buildings: 125,
              zones: 10,
              transport: 25,
              dataPoints: 375
            });
          }
        } catch (buildingsError) {
          console.warn('Buildings data loading failed, using demo data:', buildingsError);
          // Set demo stats
          setBuildingStats({
            buildings: 125,
            zones: 10,
            transport: 25,
            dataPoints: 375
          });
        }
      } catch (error) {
        console.warn('General data loading error:', error);
        // Set demo stats even if everything fails
        setBuildingStats({
          buildings: 125,
          zones: 10,
          transport: 25,
          dataPoints: 375
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Animation timer for dynamic views
  useEffect(() => {
    if (viewMode === 'hurricanes' || viewMode === 'tourism') {
      const interval = setInterval(() => {
        setAnimationTime(prev => prev + 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [viewMode]);

  // Create and update chart
  useEffect(() => {
    if (loading) return;
    if (!chartRef.current) return;

    // Dispose any existing chart instance first
    echarts.dispose(chartRef.current);
    const chart = echarts.init(chartRef.current);
    
    try {
      // Get smart city data if available
      let smartCityData = null;
      if (geoJsonData) {
        smartCityData = processGeoJsonToSmartCity(geoJsonData);
      }

      // Generate chart options using the modular configuration
      const config = generateChartOptions(viewMode, {
        smartCityData,
        animationFrame: animationTime,
        parishData // Make sure parish data is passed
      });

      console.log('Parish data available:', !!parishData, parishData?.features?.length || 0, 'parishes');

      if (config) {
        chart.setOption(config, true); // true = replace all previous options
        
        // Force resize after setting options
        setTimeout(() => {
          if (chart && !chart.isDisposed()) {
            chart.resize();
          }
        }, 100);
      }
    } catch (error) {
      console.error('Chart configuration error:', error);
      
      // Fallback simple chart configuration
      const fallbackConfig = {
        backgroundColor: '#071529',
        title: {
          text: 'Dominica Smart City 3D',
          textStyle: { color: '#cfe3ff' },
          left: 'center',
          top: '5%'
        },
        grid3D: {
          environment: '#071529',
          boxWidth: 100,
          boxDepth: 100,
          viewControl: {
            distance: 150,
            alpha: 30,
            beta: -10
          }
        },
        xAxis3D: { min: -61.6, max: -61.2 },
        yAxis3D: { min: 15.2, max: 15.7 },
        zAxis3D: { min: 0, max: 50 },
        series: [{
          type: 'scatter3D',
          data: [[-61.4, 15.45, 25]],
          symbolSize: 10,
          itemStyle: { color: '#00ff00' }
        }]
      };
      
      chart.setOption(fallbackConfig, true);
    }

    const handleResize = () => {
      if (chart && !chart.isDisposed()) {
        chart.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart && !chart.isDisposed()) {
        chart.dispose();
      }
    };
  }, [viewMode, loading]); // Removed animationTime and other deps that were causing re-renders

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-blue-900 relative">
      {/* Control Panel */}
      <ControlPanel 
        currentMode={viewMode}
        onModeChange={(e) => setViewMode(e.target.value)}
      />

      {/* Stats Panel */}
      <StatsPanel 
        buildingStats={buildingStats}
        viewMode={viewMode}
      />

      {/* Legend */}
      <Legend viewMode={viewMode} />

      {/* 3D Chart Container */}
      <div 
        ref={chartRef} 
        className="w-full h-full"
        style={{ 
          background: 'transparent',
          minHeight: '500px',
          minWidth: '500px',
          position: 'relative',
          zIndex: 1
        }}
      />
      
      {/* Bottom Info Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md rounded-lg px-6 py-2 border border-cyan-500/30">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-cyan-400 font-semibold">
            🇩🇲 Commonwealth of Dominica
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-white">
            Smart City 3D Visualization
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-cyan-300">
            Real Parish Boundaries & DEM Data
          </span>
        </div>
      </div>
    </div>
  );
};

export default DominicaSmartCity3D;
