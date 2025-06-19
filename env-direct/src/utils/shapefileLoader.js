// Temporary mock shapefile loader to avoid import issues
// TODO: Replace with actual shapefile loading once shpjs is properly configured

// Shapefile configuration for Dominica data
export const shapefileConfig = [
  {
    name: 'Coast',
    path: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/coastp.shp',
    color: '#0077be',
    fillColor: '#0077be',
    weight: 2,
    fillOpacity: 0.3,
    description: 'Dominica Coastline'
  },
  {
    name: 'Parishes',
    path: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/parishp.shp',
    color: '#8B4513',
    fillColor: '#CD853F',
    weight: 1,
    fillOpacity: 0.2,
    description: 'Parish Boundaries'
  },
  {
    name: 'Protected Areas',
    path: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/prtareap.shp',
    color: '#228B22',
    fillColor: '#90EE90',
    weight: 2,
    fillOpacity: 0.4,
    description: 'Protected Conservation Areas'
  },
  {
    name: 'Watersheds',
    path: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/Dominica_watershed/Dominica_Watershed.shp',
    color: '#00BFFF',
    fillColor: '#87CEEB',
    weight: 2,
    fillOpacity: 0.3,
    description: 'Water Catchment Areas'
  }
];

// Mock GeoJSON data for Dominica (based on real coordinates)
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
  }
};

// Mock shapefile loader (temporary solution)
export const loadShapefile = async (shapefilePath) => {
  console.log(`Mock loading shapefile: ${shapefilePath}`);
  
  // Simulate loading delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Return appropriate mock data based on path
  if (shapefilePath.includes('coastp.shp')) {
    return mockDominicaGeoJSON.coast;
  } else if (shapefilePath.includes('parishp.shp')) {
    return mockDominicaGeoJSON.parishes;
  } else if (shapefilePath.includes('prtareap.shp')) {
    return mockDominicaGeoJSON.protectedAreas;
  } else if (shapefilePath.includes('Dominica_Watershed.shp')) {
    return mockDominicaGeoJSON.watersheds;
  } else {
    // Default polygon for unknown shapefiles
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Sample Area",
            description: "Placeholder data"
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
};

// Load multiple shapefiles
export const loadAllShapefiles = async () => {
  const loadedLayers = [];
  
  for (const config of shapefileConfig) {
    try {
      console.log(`Loading shapefile: ${config.name}`);
      const geojson = await loadShapefile(config.path);
      
      loadedLayers.push({
        ...config,
        data: geojson,
        loaded: true
      });
      
      console.log(`Successfully loaded: ${config.name}`);
    } catch (error) {
      console.error(`Failed to load ${config.name}:`, error);
      loadedLayers.push({
        ...config,
        data: null,
        loaded: false,
        error: error.message
      });
    }
  }
  
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