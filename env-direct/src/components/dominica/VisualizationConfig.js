import { 
  DOMINICA_BOUNDS, 
  PARISH_DATA, 
  HURRICANE_TRACKS, 
  LANDSLIDE_RISK_GRID, 
  TOURISM_FLOWS, 
  SEISMIC_DATA, 
  RAINFALL_DATA,
  MORNE_DIABLOTINS
} from './DominicaConstants';
import { 
  createIslandSurfaceWithBoundaries,
  createParishExtruded3D,
  createHurricaneTrack,
  pointInPolygon
} from './TerrainUtils';

// Smart City 3D Configuration
export const getSmartCityConfig = (smartCityData) => {
  const buildingColors = {
    'residential': '#4CAF50',
    'commercial': '#2196F3', 
    'government': '#FF9800',
    'religious': '#9C27B0',
    'healthcare': '#F44336',
    'education': '#795548',
    'industrial': '#607D8B',
    'tourism': '#FFEB3B',
    'office': '#00BCD4',
    'mixed': '#9E9E9E'
  };

  const buildings = smartCityData.buildings.map(building => ({
    value: [building.position[0], building.position[1], building.height],
    itemStyle: {
      color: buildingColors[building.type] || '#9E9E9E'
    },
    buildingInfo: building.info
  }));

  const roads = smartCityData.roads.map(road => ({
    coords: [[road.position[0], road.position[1], 0], [road.position[0], road.position[1], road.position[2]]],
    lineStyle: {
      color: '#FFD700',
      width: 2,
      opacity: 0.8
    }
  }));

  return {
    buildings,
    roads,
    zones: smartCityData.zones || []
  };
};

// Volcano & Relief DEM Configuration
export const getVolcanoDEMConfig = () => {
  const { data, wireframe } = createIslandSurfaceWithBoundaries();
  
  return {
    type: 'surface',
    data: data,
    wireframe: wireframe,
    itemStyle: {
      color: (params) => {
        const elevation = params.data[2];
        if (elevation < 50) return '#8B4513';
        if (elevation < 200) return '#DAA520'; 
        if (elevation < 500) return '#228B22';
        if (elevation < 800) return '#FF8C00';
        if (elevation < 1200) return '#DC143C';
        return '#8B0000';
      }
    },
    shading: 'realistic',
    realisticMaterial: {
      detailTexture: '#fff',
      textureTiling: 1,
      roughness: 0.8,
      metalness: 0.2
    },
    postEffect: {
      enable: true,
      bloom: { enable: true, intensity: 0.1 },
      SSAO: { enable: true, intensity: 1.2, radius: 5 }
    }
  };
};

// Hurricane Tracking Configuration
export const getHurricaneConfig = (animationFrame) => {
  const series = [];
  
  HURRICANE_TRACKS.forEach((hurricane, hurricaneIndex) => {
    const track = createHurricaneTrack(hurricane);
    
    // Hurricane path
    series.push({
      type: 'line3D',
      data: track.map(point => ({
        coords: [[point.lng, point.lat, point.height], [point.lng, point.lat, point.height + 10]],
        lineStyle: {
          color: point.color,
          width: point.intensity * 2,
          opacity: 0.8
        }
      })),
      lineStyle: {
        width: 4,
        opacity: 0.9
      }
    });

    // Animated hurricane position
    if (track.length > 0) {
      const currentIndex = Math.floor((animationFrame * 0.1) % track.length);
      const currentPoint = track[currentIndex];
      
      series.push({
        type: 'scatter3D',
        data: [{
          value: [currentPoint.lng, currentPoint.lat, currentPoint.height + 15],
          itemStyle: {
            color: currentPoint.color,
            opacity: 0.9
          },
          symbolSize: currentPoint.intensity * 8
        }],
        symbolSize: 20
      });
    }
  });

  return series;
};

// Seismic Activity Configuration
export const getSeismicConfig = () => {
  const seismicPoints = SEISMIC_DATA.map(point => ({
    value: [point.lng, point.lat, point.depth > 0 ? point.depth : 10],
    itemStyle: {
      color: point.magnitude < 2 ? '#00FF00' :
             point.magnitude < 3 ? '#FFFF00' :
             point.magnitude < 4 ? '#FFA500' :
             point.magnitude < 5 ? '#FF0000' : '#8B0000',
      opacity: 0.8
    },
    symbolSize: point.magnitude * 8,
    seismicInfo: {
      magnitude: point.magnitude,
      depth: point.depth,
      date: point.date,
      location: point.location
    }
  }));

  return {
    type: 'scatter3D',
    data: seismicPoints,
    symbolSize: (params) => params.data.seismicInfo?.magnitude * 6 || 10,
    itemStyle: {
      opacity: 0.8,
      borderColor: '#fff',
      borderWidth: 1
    }
  };
};

// Tourism Flow Configuration  
export const getTourismConfig = (animationFrame) => {
  const series = [];
  
  TOURISM_FLOWS.forEach((flow, index) => {
    const progress = (animationFrame * 0.05 + index * 0.3) % 1;
    const currentLng = flow.origin.lng + (flow.destination.lng - flow.origin.lng) * progress;
    const currentLat = flow.origin.lat + (flow.destination.lat - flow.origin.lat) * progress;
    const currentHeight = 50 + Math.sin(progress * Math.PI) * 30;

    // Flow path
    series.push({
      type: 'line3D',
      data: [{
        coords: [
          [flow.origin.lng, flow.origin.lat, 0],
          [currentLng, currentLat, currentHeight],
          [flow.destination.lng, flow.destination.lat, 0]
        ],
        lineStyle: {
          color: flow.type === 'flight' ? '#00BFFF' : '#32CD32',
          width: 3,
          opacity: 0.8
        }
      }]
    });

    // Moving indicator
    series.push({
      type: 'scatter3D', 
      data: [{
        value: [currentLng, currentLat, currentHeight],
        itemStyle: {
          color: flow.type === 'flight' ? '#FFD700' : '#FF69B4',
          opacity: 0.9
        },
        symbolSize: 15
      }]
    });
  });

  return series;
};

// Parish Statistics Configuration
export const getParishConfig = () => {
  const parishSeries = [];
  
  PARISH_DATA.forEach(parish => {
    const extrudedParish = createParishExtruded3D(parish);
    if (extrudedParish.length > 0) {
      parishSeries.push({
        type: 'surface',
        data: extrudedParish,
        itemStyle: {
          color: parish.population < 5000 ? '#E8F5E8' :
                 parish.population < 10000 ? '#C8E6C9' :
                 parish.population < 15000 ? '#A5D6A7' :
                 parish.population < 20000 ? '#81C784' : '#66BB6A',
          opacity: 0.8
        },
        parishInfo: {
          name: parish.name,
          population: parish.population,
          area: parish.area,
          density: parish.density
        }
      });
    }
  });

  return parishSeries;
};

// Landslide Risk Configuration
export const getLandslideConfig = () => {
  const landslideData = LANDSLIDE_RISK_GRID.map(point => ({
    value: [point.lng, point.lat, point.riskIndex * 20],
    itemStyle: {
      color: point.riskIndex < 0.2 ? '#00FF00' :
             point.riskIndex < 0.4 ? '#ADFF2F' :
             point.riskIndex < 0.6 ? '#FFFF00' :
             point.riskIndex < 0.8 ? '#FFA500' : '#FF0000',
      opacity: 0.7
    },
    riskInfo: {
      riskIndex: point.riskIndex,
      soilType: point.soilType,
      slope: point.slope,
      vegetation: point.vegetation
    }
  }));

  return {
    type: 'bar3D',
    data: landslideData,
    bevelSize: 0.5,
    bevelSmoothness: 2,
    itemStyle: {
      opacity: 0.8,
      borderColor: '#333',
      borderWidth: 0.5
    }
  };
};

// Rainfall Patterns Configuration
export const getRainfallConfig = () => {
  const rainfallData = RAINFALL_DATA.map(point => ({
    value: [point.lng, point.lat, point.annualRainfall / 100],
    itemStyle: {
      color: point.annualRainfall < 1500 ? '#ADD8E6' :
             point.annualRainfall < 2000 ? '#87CEEB' :
             point.annualRainfall < 2500 ? '#4682B4' :
             point.annualRainfall < 3000 ? '#1E90FF' : '#0000FF',
      opacity: 0.7
    },
    rainfallInfo: {
      annualRainfall: point.annualRainfall,
      wetSeason: point.wetSeason,
      drySeason: point.drySeason,
      station: point.station
    }
  }));

  return {
    type: 'scatter3D',
    data: rainfallData,
    symbolSize: (params) => Math.sqrt(params.data.rainfallInfo?.annualRainfall / 100) || 10,
    itemStyle: {
      opacity: 0.8,
      borderColor: '#fff',
      borderWidth: 1
    }
  };
};

// Get visualization configuration based on mode
export const getVisualizationConfig = (mode, data = {}) => {
  const { smartCityData, animationFrame = 0 } = data;
  
  switch (mode) {
    case 'smartCity':
      return smartCityData ? getSmartCityConfig(smartCityData) : null;
    case 'volcano':
      return getVolcanoDEMConfig();
    case 'hurricanes':
      return getHurricaneConfig(animationFrame);
    case 'seismic':
      return getSeismicConfig();
    case 'tourism':
      return getTourismConfig(animationFrame);
    case 'parish':
      return getParishConfig();
    case 'landslide':
      return getLandslideConfig();
    case 'rainfall':
      return getRainfallConfig();
    default:
      return null;
  }
};

// Generate comprehensive ECharts options
export const generateChartOptions = (mode, data = {}) => {
  const { smartCityData, animationFrame = 0, parishData } = data;
  
  // Base configuration that works for all modes
  const baseOptions = {
    backgroundColor: '#001122',
    title: {
      text: `Dominica - ${mode.charAt(0).toUpperCase() + mode.slice(1)} View`,
      textStyle: { color: '#cfe3ff', fontSize: 16 },
      left: 'center',
      top: '3%'
    },
    tooltip: {
      show: true,
      formatter: (params) => {
        if (params.seriesType === 'bar3D') {
          return `Building<br/>Height: ${Math.round(params.value[2])} m<br/>Location: ${params.value[0].toFixed(4)}, ${params.value[1].toFixed(4)}`;
        }
        if (params.seriesType === 'surface') {
          return `Elevation: ${Math.round(params.value[2])} m<br/>Location: ${params.value[0].toFixed(4)}, ${params.value[1].toFixed(4)}`;
        }
        return `Value: ${params.value}`;
      }
    },
    grid3D: {
      boxWidth: 120,
      boxHeight: 80, 
      boxDepth: 120,
      axisLine: { lineStyle: { color: '#ffffff', opacity: 0.3 } },
      axisLabel: { color: '#ffffff', fontSize: 10 },
      environment: '#001122',
      light: {
        main: {
          intensity: 1.8,     // Enhanced lighting for Lambert shading
          shadow: true,
          alpha: 45,          // Light angle for optimal terrain visibility
          beta: 60,
          shadowQuality: 'high'
        },
        ambient: { 
          intensity: 0.4      // Ambient lighting for Lambert effect
        },
        ambientCubemap: {
          // Enhanced ambient lighting for more realistic shading
          texture: null,
          exposure: 1,
          diffuseIntensity: 0.5,
          specularIntensity: 0.8
        }
      },
      viewControl: {
        alpha: 45,          // Higher angle to see surface better
        beta: 60,           // Better viewing angle
        distance: 120,      // Closer view
        minDistance: 50,
        maxDistance: 400,
        panSensitivity: 1,
        rotateSensitivity: 1,
        zoomSensitivity: 1,
        animation: true,
        animationDurationUpdate: 1000
      }
    },
    xAxis3D: {
      type: 'value',
      min: DOMINICA_BOUNDS.minLng,
      max: DOMINICA_BOUNDS.maxLng,
      name: 'Longitude'
    },
    yAxis3D: {
      type: 'value', 
      min: DOMINICA_BOUNDS.minLat,
      max: DOMINICA_BOUNDS.maxLat,
      name: 'Latitude'
    },
    zAxis3D: {
      type: 'value',
      min: 0,
      max: mode === 'volcano' ? 1500 : 1500, // Increased to show full Dominica elevation range
      name: 'Elevation (m)'
    }
  };

  // Mode-specific series configuration
  let series = [];
  
  try {
    switch (mode) {
      case 'smartCity':
        console.log('Creating dense Dominica terrain grid using real GeoJSON parish data...');
        
        let terrainPoints = [];
        
        // Use real parish GeoJSON data if available to create a dense grid
        if (parishData && parishData.features) {
          console.log('Using real Dominica parish GeoJSON data with', parishData.features.length, 'parishes');
          
          // Create a dense grid within Dominica bounds and check if points are inside parishes
          const gridResolution = 50; // 50x50 grid for dense terrain
          const minLng = DOMINICA_BOUNDS.minLng;
          const maxLng = DOMINICA_BOUNDS.maxLng;
          const minLat = DOMINICA_BOUNDS.minLat;
          const maxLat = DOMINICA_BOUNDS.maxLat;
          
          for (let i = 0; i < gridResolution; i++) {
            for (let j = 0; j < gridResolution; j++) {
              const lng = minLng + (maxLng - minLng) * (i / (gridResolution - 1));
              const lat = minLat + (maxLat - minLat) * (j / (gridResolution - 1));
              
              // Check if this point is inside any parish (i.e., on land)
              let isOnLand = false;
              let parishName = 'Ocean';
              
              for (const parish of parishData.features) {
                if (pointInPolygon([lng, lat], parish.geometry)) {
                  isOnLand = true;
                  parishName = parish.properties.name || 'Unknown Parish';
                  break;
                }
              }
              
              // Generate elevation based on whether point is on land and distance from center
              let elevation = 0;
              if (isOnLand) {
                const centerLng = -61.4;
                const centerLat = 15.45;
                const distanceFromCenter = Math.sqrt(
                  Math.pow((lng - centerLng) * 111 * Math.cos(centerLat * Math.PI / 180), 2) +
                  Math.pow((lat - centerLat) * 111, 2)
                );
                
                // Create realistic elevation profile for land areas
                elevation = Math.max(0, 600 * (1 - distanceFromCenter / 25) + Math.random() * 200);
                
                // Special handling for Morne Diablotins area
                const distanceFromPeak = Math.sqrt(
                  Math.pow((lng - MORNE_DIABLOTINS.lng) * 111 * Math.cos(centerLat * Math.PI / 180), 2) +
                  Math.pow((lat - MORNE_DIABLOTINS.lat) * 111, 2)
                );
                if (distanceFromPeak < 3) {
                  elevation = Math.max(elevation, 1200 + (200 * (1 - distanceFromPeak / 3)));
                }
                
                // Add some terrain variation
                elevation += Math.sin(lng * 20) * Math.cos(lat * 20) * 50;
              }
              
              terrainPoints.push([lng, lat, elevation]);
            }
          }
          
          console.log('Generated', terrainPoints.length, 'dense terrain points from parish boundaries');
        } else {
          console.log('No parish GeoJSON data available, using fallback terrain generation');
          // Fallback to synthetic terrain if no parish data
          const dominicanSurface = createIslandSurfaceWithBoundaries();
          terrainPoints = dominicanSurface.map(point => [point[0], point[1], point[2]]);
        }
        
        // Add terrain as scatter3D with realistic Lambert-inspired colors and shading
        series.push({
          type: 'scatter3D',
          data: terrainPoints,
          symbolSize: 3, // Smaller points for higher resolution
          shading: 'lambert', // Lambert shading for realistic lighting
          itemStyle: {
            color: (params) => {
              const elevation = params.data[2];
              const lng = params.data[0];
              const lat = params.data[1];
              
              // Create Lambert-like lighting effect based on position and elevation
              const lightAngle = (lng + 61.4) * 10 + (lat - 15.4) * 10; // Simulate light direction
              const lightIntensity = 0.8 + 0.2 * Math.sin(lightAngle);
              
              let baseColor;
              if (elevation > 800) baseColor = [255, 255, 255];  // Snow peaks
              else if (elevation > 600) baseColor = [139, 69, 19];   // Brown peaks
              else if (elevation > 400) baseColor = [34, 139, 34];   // Dark green hills
              else if (elevation > 200) baseColor = [50, 205, 50];   // Green forest
              else if (elevation > 50) baseColor = [144, 238, 144];  // Light green lowlands
              else if (elevation > 10) baseColor = [255, 255, 0];    // Yellow coastal
              else if (elevation > 2) baseColor = [244, 164, 96];    // Sandy beaches
              else baseColor = [65, 105, 225];                       // Blue ocean
              
              // Apply Lambert lighting simulation
              const shadedColor = baseColor.map(c => Math.floor(c * lightIntensity));
              return `rgb(${shadedColor[0]}, ${shadedColor[1]}, ${shadedColor[2]})`;
            },
            opacity: 0.9
          },
          emphasis: {
            itemStyle: {
              color: '#ffffff'
            }
          }
        });

        // Add parish boundaries if available for precise island shape
        if (parishData && parishData.features) {
          console.log('Adding parish boundaries for precise island shape');
          
          // Create parish boundary lines
          const parishBoundaries = [];
          parishData.features.forEach(feature => {
            if (feature.geometry && feature.geometry.coordinates) {
              const coords = feature.geometry.coordinates;
              if (feature.geometry.type === 'Polygon') {
                coords[0].forEach((coord, index) => {
                  if (index < coords[0].length - 1) {
                    parishBoundaries.push([
                      [coord[0], coord[1], 5],  // Start point slightly elevated
                      [coords[0][index + 1][0], coords[0][index + 1][1], 5] // End point
                    ]);
                  }
                });
              }
            }
          });
          
          // Add parish boundaries as lines
          series.push({
            type: 'line3D',
            data: parishBoundaries,
            lineStyle: {
              color: '#FF6B35',
              width: 2,
              opacity: 0.8
            }
          });
        }

        // Add Morne Diablotins peak marker (highest point in Dominica)
        series.push({
          type: 'scatter3D',
          data: [[MORNE_DIABLOTINS.lng, MORNE_DIABLOTINS.lat, MORNE_DIABLOTINS.elevation + 50]], 
          symbolSize: 25,
          itemStyle: { 
            color: '#ff0000', // Red marker for highest peak
            opacity: 1
          }
        });

        // Add buildings if smart city data is available
        if (smartCityData && smartCityData.buildings) {
          console.log('Adding buildings:', smartCityData.buildings.length);
          
          const buildingPoints = smartCityData.buildings.map(building => [
            building.position[0], // longitude
            building.position[1], // latitude
            building.height || 20  // height
          ]);
          
          series.push({
            type: 'scatter3D',
            data: buildingPoints,
            symbolSize: 6,
            itemStyle: {
              color: '#FFD700', // Gold for buildings
              opacity: 0.9
            }
          });
        }
        
        // Add buildings if available
        if (smartCityData && smartCityData.buildings) {
          const buildings = smartCityData.buildings.map(building => [
            building.position[0], 
            building.position[1], 
            building.height || 10
          ]);
          
          series.push({
            type: 'bar3D',
            data: buildings,
            bevelSize: 0.3,
            bevelSmoothness: 2,
            itemStyle: { color: '#4CAF50', opacity: 0.8 }
          });
        }
        break;
        
      case 'volcano':
        const volcanoSurface = createIslandSurfaceWithBoundaries();
        const volcanoGridSize = 81; // Known grid size
        const volcanoGrid = [];
        
        for (let i = 0; i < volcanoGridSize; i++) {
          const row = [];
          for (let j = 0; j < volcanoGridSize; j++) {
            const index = i * volcanoGridSize + j;
            if (volcanoSurface[index]) {
              row.push(volcanoSurface[index][2]);
            } else {
              row.push(0);
            }
          }
          volcanoGrid.push(row);
        }
        
        series.push({
          type: 'surface',
          data: volcanoGrid,
          dataShape: [81, 81], // Explicitly specify data shape
          shading: 'lambert',
          itemStyle: {
            color: (params) => {
              const elevation = params.data;
              if (elevation > 1000) return '#8B0000';
              if (elevation > 500) return '#A0522D'; 
              if (elevation > 100) return '#228B22';
              return '#4682B4';
            }
          }
        });
        break;
        
      default:
        // Fallback: simple terrain with proper 2D grid format
        const defaultSurface = createIslandSurfaceWithBoundaries();
        const defaultGridSize = 81; // Known grid size
        const defaultGrid = [];
        
        for (let i = 0; i < defaultGridSize; i++) {
          const row = [];
          for (let j = 0; j < defaultGridSize; j++) {
            const index = i * defaultGridSize + j;
            if (defaultSurface[index]) {
              row.push(defaultSurface[index][2]);
            } else {
              row.push(0);
            }
          }
          defaultGrid.push(row);
        }
        
        series.push({
          type: 'surface',
          data: defaultGrid,
          dataShape: [81, 81], // Explicitly specify data shape
          shading: 'lambert',
          itemStyle: { color: '#2d5a27', opacity: 0.7 }
        });
    }
  } catch (error) {
    console.error('Error generating series for mode:', mode, error);
    
    // Ultimate fallback: simple scatter plot
    series = [{
      type: 'scatter3D',
      data: [[-61.4, 15.45, 25]],
      symbolSize: 10,
      itemStyle: { color: '#00ff00' }
    }];
  }

  return { ...baseOptions, series };
};
