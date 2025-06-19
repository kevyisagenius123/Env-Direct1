// Shapefile loader for Dominica GeoJSON data
// Loads converted GeoJSON files from shapefiles

// Shapefile configuration for Dominica data - Updated with actual converted files
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
    name: 'Constituencies',
    path: '/geojson/Constituency.json',
    color: '#8B4513',
    fillColor: '#CD853F',
    weight: 1,
    fillOpacity: 0.2,
    description: 'Electoral Constituencies'
  },
  {
    name: 'Communities',
    path: '/geojson/Community.json',
    color: '#9370DB',
    fillColor: '#DDA0DD',
    weight: 1,
    fillOpacity: 0.3,
    description: 'Local Communities'
  },
  {
    name: 'Settlements',
    path: '/geojson/Dominica_Settlements.json',
    color: '#FF6347',
    fillColor: '#FFA07A',
    weight: 1,
    fillOpacity: 0.4,
    description: 'Settlement Areas'
  },
  {
    name: 'Watersheds',
    path: '/geojson/Dominica_Watershed.json',
    fallbackPath: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/Dominica_watershed/Dominica_Watershed.shp',
    color: '#00BFFF',
    fillColor: '#87CEEB',
    weight: 2,
    fillOpacity: 0.3,
    description: 'Water Catchment Areas'
  },
  {
    name: 'Forestry Zones',
    path: '/geojson/Forestry_Zones.json',
    color: '#228B22',
    fillColor: '#90EE90',
    weight: 2,
    fillOpacity: 0.4,
    description: 'Forest Management Areas'
  },
  {
    name: 'Roads',
    path: '/geojson/mroadsv.json',
    color: '#696969',
    fillColor: '#A9A9A9',
    weight: 3,
    fillOpacity: 0.7,
    description: 'Road Network'
  },
  {
    name: 'National Trail',
    path: '/geojson/National_Trail.json',
    color: '#8B4513',
    fillColor: '#D2691E',
    weight: 3,
    fillOpacity: 0.6,
    description: 'Waitukubuli National Trail'
  },
  {
    name: 'Flood Risk',
    path: '/geojson/Flood_final.json',
    color: '#FF0000',
    fillColor: '#FF6B6B',
    weight: 1,
    fillOpacity: 0.5,
    description: 'Flood Risk Zones'
  }
  // Note: Landslide_Susceptibility.json is 432MB - too large for web use
  // Consider simplifying this file or loading it separately
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
    console.log(`📊 Features: ${geojson.features?.length || 0}, File size: ~${Math.round(JSON.stringify(geojson).length / 1024)}KB`);
    return geojson;
    
  } catch (error) {
    console.warn(`⚠️ Could not load ${shapefilePath}, using mock data:`, error.message);
    
    // Return mock data for coastline only
    if (shapefilePath.includes('coast')) {
      return mockDominicaGeoJSON.coast;
    } else {
      // For other layers, return empty collection if file not found
      return {
        type: "FeatureCollection",
        features: []
      };
    }
  }
};

// Load multiple shapefiles
export const loadAllShapefiles = async () => {
  const loadedLayers = [];
  
  console.log('🗺️ Loading Dominica geographic data...');
  console.log(`📁 Attempting to load ${shapefileConfig.length} layers`);
  
  for (const config of shapefileConfig) {
    try {
      console.log(`📊 Loading: ${config.name}`);
      const geojson = await loadShapefile(config.path);
      
      const featureCount = geojson.features?.length || 0;
      if (featureCount > 0) {
        loadedLayers.push({
          ...config,
          data: geojson,
          loaded: true,
          featureCount
        });
        console.log(`✅ ${config.name}: ${featureCount} features loaded`);
      } else {
        console.log(`⚠️ ${config.name}: No features found`);
        loadedLayers.push({
          ...config,
          data: null,
          loaded: false,
          error: 'No features in file'
        });
      }
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
  const totalFeatures = loadedLayers.reduce((sum, l) => sum + (l.featureCount || 0), 0);
  
  console.log(`🎉 Successfully loaded ${successCount}/${shapefileConfig.length} layers`);
  console.log(`📊 Total features: ${totalFeatures}`);
  
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