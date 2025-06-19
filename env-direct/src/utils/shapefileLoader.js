import shp from 'shpjs';

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
  },
  {
    name: 'Landslide Risk',
    path: '/Kevy_Shapefiles-20250619T204234Z-1-001/Kevy_Shapefiles/CHARIM_Hazards/Landslide_Susceptibility.shp',
    color: '#FF4500',
    fillColor: '#FFA500',
    weight: 1,
    fillOpacity: 0.5,
    description: 'Landslide Susceptibility Zones'
  }
];

// Load shapefile and convert to GeoJSON
export const loadShapefile = async (shapefilePath) => {
  try {
    // Load the shapefile buffer
    const response = await fetch(shapefilePath);
    if (!response.ok) {
      throw new Error(`Failed to load shapefile: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    
    // Convert shapefile to GeoJSON using shpjs
    const geojson = await shp(arrayBuffer);
    
    return geojson;
  } catch (error) {
    console.error(`Error loading shapefile ${shapefilePath}:`, error);
    throw error;
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