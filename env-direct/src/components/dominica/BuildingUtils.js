import { DOMINICA_BOUNDS } from './DominicaConstants';

// Enhanced building height calculation
export const calculateEnhancedBuildingHeight = (properties) => {
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
export const getEnhancedBuildingType = (properties) => {
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
export const getBuildingInfo = (properties) => {
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
export const extractCoordinatesFromGeometry = (geometry) => {
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
export const processGeoJsonToSmartCity = (geoJsonData) => {
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
