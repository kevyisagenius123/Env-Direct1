// Shapefile loader for Dominica GeoJSON data
// Loads converted GeoJSON files from shapefiles

// Shapefile configuration for Dominica data
export const shapefileConfig = [
  {
    name: 'Coast',
    path: '/geojson/coast.geojson',
    fallbackPath: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/coastp.shp',
    color: '#0077be',
    fillColor: '#0077be',
    weight: 2,
    fillOpacity: 0.3,
    description: 'Dominica Coastline'
  },
  {
    name: 'Parishes',
    path: '/geojson/parishes.geojson',
    fallbackPath: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/parishp.shp',
    color: '#8B4513',
    fillColor: '#CD853F',
    weight: 1,
    fillOpacity: 0.2,
    description: 'Parish Boundaries'
  },
  {
    name: 'Protected Areas',
    path: '/geojson/protected_areas.geojson',
    fallbackPath: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/prtareap.shp',
    color: '#228B22',
    fillColor: '#90EE90',
    weight: 2,
    fillOpacity: 0.4,
    description: 'Protected Conservation Areas'
  },
  {
    name: 'Watersheds',
    path: '/geojson/watersheds.geojson',
    fallbackPath: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/Dominica_watershed/Dominica_Watershed.shp',
    color: '#00BFFF',
    fillColor: '#87CEEB',
    weight: 2,
    fillOpacity: 0.3,
    description: 'Water Catchment Areas'
  },
  {
    name: 'Landslide Risk',
    path: '/geojson/landslide_risk.geojson',
    fallbackPath: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/CHARIM_Hazards/Landslide_Susceptibility.shp',
    color: '#FF4500',
    fillColor: '#FFA500',
    weight: 1,
    fillOpacity: 0.5,
    description: 'Landslide Susceptibility Zones'
  }
];

// Mock GeoJSON data for Dominica (fallback if real GeoJSON files not available)
const mockDominicaGeoJSON = {
  coast: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Dominica Coast",
          type: "coastline"
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [-61.484, 15.631], [-61.465, 15.615], [-61.440, 15.595],
            [-61.415, 15.570], [-61.390, 15.540], [-61.365, 15.505],
            [-61.345, 15.465], [-61.330, 15.420], [-61.320, 15.370],
            [-61.315, 15.315], [-61.315, 15.260], [-61.320, 15.205],
            [-61.330, 15.155], [-61.345, 15.110], [-61.365, 15.070],
            [-61.390, 15.035], [-61.415, 15.005], [-61.440, 14.980],
            [-61.465, 14.960], [-61.484, 14.944], [-61.465, 14.960],
            [-61.440, 14.980], [-61.415, 15.005], [-61.390, 15.035]
          ]
        }
      }
    ]
  },
  parishes: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "St. George Parish",
          population: 25000
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-61.390, 15.300], [-61.350, 15.300], [-61.350, 15.250],
            [-61.390, 15.250], [-61.390, 15.300]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "St. John Parish",
          population: 15000
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-61.390, 15.400], [-61.350, 15.400], [-61.350, 15.350],
            [-61.390, 15.350], [-61.390, 15.400]
          ]]
        }
      }
    ]
  },
  protectedAreas: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Morne Trois Pitons National Park",
          type: "National Park",
          established: 1975
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-61.360, 15.320], [-61.320, 15.320], [-61.320, 15.280],
            [-61.360, 15.280], [-61.360, 15.320]
          ]]
        }
      }
    ]
  },
  watersheds: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Northern Watershed",
          area: "125 sq km"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-61.400, 15.500], [-61.330, 15.500], [-61.330, 15.420],
            [-61.400, 15.420], [-61.400, 15.500]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Southern Watershed",
          area: "98 sq km"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-61.400, 15.280], [-61.330, 15.280], [-61.330, 15.200],
            [-61.400, 15.200], [-61.400, 15.280]
          ]]
        }
      }
    ]
  },
  landslideRisk: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "High Risk Zone",
          risk_level: "High",
          area: "45 sq km"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-61.370, 15.380], [-61.340, 15.380], [-61.340, 15.340],
            [-61.370, 15.340], [-61.370, 15.380]
          ]]
        }
      }
    ]
  }
};

// Load GeoJSON file or return mock data
export const loadShapefile = async (shapefilePath) => {
  try {
    console.log(`Loading GeoJSON file: ${shapefilePath}`);
    
    // Try to load the real GeoJSON file
    const response = await fetch(shapefilePath);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const geojson = await response.json();
    console.log(`✅ Successfully loaded real GeoJSON: ${shapefilePath}`);
    return geojson;
    
  } catch (error) {
    console.warn(`⚠️ Could not load ${shapefilePath}, using mock data:`, error.message);
    
    // Return appropriate mock data based on path
    if (shapefilePath.includes('coast')) {
      return mockDominicaGeoJSON.coast;
    } else if (shapefilePath.includes('parishes')) {
      return mockDominicaGeoJSON.parishes;
    } else if (shapefilePath.includes('protected_areas')) {
      return mockDominicaGeoJSON.protectedAreas;
    } else if (shapefilePath.includes('watersheds')) {
      return mockDominicaGeoJSON.watersheds;
    } else if (shapefilePath.includes('landslide_risk')) {
      return mockDominicaGeoJSON.landslideRisk;
    } else {
      // Default polygon for unknown paths
      return {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: "Sample Area",
              description: "Placeholder data - convert your shapefiles to GeoJSON"
            },
            geometry: {
              type: "Polygon",
              coordinates: [[
                [-61.380, 15.350], [-61.340, 15.350], [-61.340, 15.310],
                [-61.380, 15.310], [-61.380, 15.350]
              ]]
            }
          }
        ]
      };
    }
  }
};

// Load multiple shapefiles
export const loadAllShapefiles = async () => {
  const loadedLayers = [];
  
  console.log('🗺️ Loading Dominica geographic data...');
  
  for (const config of shapefileConfig) {
    try {
      console.log(`📊 Loading: ${config.name}`);
      const geojson = await loadShapefile(config.path);
      
      loadedLayers.push({
        ...config,
        data: geojson,
        loaded: true
      });
      
      console.log(`✅ ${config.name}: ${geojson.features?.length || 0} features loaded`);
    } catch (error) {
      console.error(`❌ Failed to load ${config.name}:`, error);
      loadedLayers.push({
        ...config,
        data: null,
        loaded: false,
        error: error.message
      });
    }
  }
  
  const successCount = loadedLayers.filter(l => l.loaded).length;
  console.log(`🎉 Loaded ${successCount}/${shapefileConfig.length} geographic layers`);
  
  return loadedLayers;
};

// Style function for GeoJSON layers
export const getShapefileStyle = (config) => {
  return {
    color: config.color,
    fillColor: config.fillColor,
    weight: config.weight,
    fillOpacity: config.fillOpacity,
    opacity: 0.8
  };
}; 