// Shapefile loader for Dominica GeoJSON data
// Loads converted GeoJSON files from shapefiles
import proj4 from 'proj4';

// Define coordinate systems for Dominica
// UTM Zone 20N (EPSG:32620) - likely projection used in the shapefiles
const UTM_20N = '+proj=utm +zone=20 +datum=WGS84 +units=m +no_defs';
// WGS84 (EPSG:4326) - what Leaflet expects
const WGS84 = '+proj=longlat +datum=WGS84 +no_defs';

// Function to transform coordinates from UTM to WGS84
const transformCoordinates = (coordinates) => {
  if (!coordinates || coordinates.length === 0) return coordinates;
  
  // Handle different geometry types
  if (typeof coordinates[0] === 'number') {
    // Single coordinate pair [x, y]
    const [lng, lat] = proj4(UTM_20N, WGS84, coordinates);
    return [lng, lat];
  } else if (Array.isArray(coordinates[0])) {
    // Array of coordinate pairs [[x1, y1], [x2, y2], ...]
    return coordinates.map(coord => {
      if (typeof coord[0] === 'number') {
        const [lng, lat] = proj4(UTM_20N, WGS84, coord);
        return [lng, lat];
      } else {
        // Nested array (like for polygons with holes)
        return transformCoordinates(coord);
      }
    });
  }
  
  return coordinates;
};

// Function to transform GeoJSON geometry
const transformGeometry = (geometry) => {
  if (!geometry || !geometry.coordinates) return geometry;
  
  return {
    ...geometry,
    coordinates: transformCoordinates(geometry.coordinates)
  };
};

// Function to transform entire GeoJSON
const transformGeoJSON = (geojson) => {
  if (!geojson || !geojson.features) return geojson;
  
  return {
    ...geojson,
    features: geojson.features.map(feature => ({
      ...feature,
      geometry: transformGeometry(feature.geometry)
    }))
  };
};

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
    color: '#8B4513',
    fillColor: '#D2691E',
    weight: 1,
    fillOpacity: 0.6,
    description: 'Road Network'
  },

  {
    name: 'Parishes',
    path: '/geojson/parishp.json',
    color: '#800080',
    fillColor: '#DDA0DD',
    weight: 2,
    fillOpacity: 0.3,
    description: 'Parish Boundaries'
  }
  // Note: Large layers like Flood Risk (7.2MB) and Landslide Susceptibility (432MB) 
  // are still disabled as they may cause performance issues in browsers
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
    console.log(`✅ Successfully loaded ${shapefilePath} (${geojson.features?.length || 0} features)`);
    
    // Transform coordinates from UTM to WGS84 for Leaflet
    console.log(`🔄 Transforming coordinates from UTM to WGS84 for ${shapefilePath}`);
    const transformedGeoJSON = transformGeoJSON(geojson);
    console.log(`✅ Coordinate transformation complete for ${shapefilePath}`);
    
    return transformedGeoJSON;
    
  } catch (error) {
    console.error(`❌ Failed to load ${shapefilePath}:`, error.message);
    
    // Return mock data for coastline only
    if (shapefilePath.includes('coast')) {
      console.log(`🔄 Using mock coastline data for ${shapefilePath}`);
      return mockDominicaGeoJSON.coast;
    } else {
      // For other layers, return empty collection if file not found
      console.log(`📄 Returning empty collection for ${shapefilePath}`);
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