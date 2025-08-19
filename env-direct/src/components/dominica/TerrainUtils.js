import { DOMINICA_BOUNDS, MORNE_DIABLOTINS, PARISH_DATA } from './DominicaConstants';

// Point-in-polygon algorithm for checking if coordinates are inside Dominica
export const pointInPolygon = (point, polygon) => {
  const [x, y] = point;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
};

// Create coastline from real Dominica parish boundaries at sea level
export const createCoastlineFromGeoJSON = (parishData, createApproximateCoastline) => {
  if (!parishData || !parishData.features) {
    console.log('No parish data available, using approximated coastline');
    return createApproximateCoastline();
  }

  const coastlinePoints = [];
  
  // Extract all boundary coordinates from parish polygons
  parishData.features.forEach(feature => {
    if (feature.geometry && feature.geometry.type === 'Polygon') {
      const coordinates = feature.geometry.coordinates[0]; // Outer ring
      coordinates.forEach(coord => {
        if (coord.length >= 2) {
          coastlinePoints.push([coord[0], coord[1], 0]); // z=0 for sea level
        }
      });
    }
  });

  // Remove duplicate points and sort for better line rendering
  const uniquePoints = [];
  const tolerance = 0.001; // ~100m tolerance for duplicate removal
  
  coastlinePoints.forEach(point => {
    const isDuplicate = uniquePoints.some(existing => 
      Math.abs(existing[0] - point[0]) < tolerance && 
      Math.abs(existing[1] - point[1]) < tolerance
    );
    if (!isDuplicate) {
      uniquePoints.push(point);
    }
  });

  console.log(`Created coastline from ${uniquePoints.length} boundary points`);
  return uniquePoints;
};

// Fallback: Create approximate coastline at sea level for 3D island outline
export const createApproximateCoastline = () => {
  const coastline = [];
  const resolution = 60; // Reduced resolution for cleaner lines
  
  // Create improved Dominica coastline shape
  for (let i = 0; i <= resolution; i++) {
    const angle = (i / resolution) * 2 * Math.PI;
    
    // More accurate Dominica proportions - elongated north-south
    const radiusLat = 0.21; // ~23km north-south
    const radiusLng = 0.13; // ~14km east-west
    
    // Improved coastal irregularities that match real Dominica shape
    const mainVariation = Math.sin(angle * 2) * 0.03; // Major bays and peninsulas
    const midVariation = Math.sin(angle * 5) * 0.015; // Medium coastal features
    const fineVariation = Math.sin(angle * 8) * 0.008; // Fine coastal detail
    
    const totalVariation = mainVariation + midVariation + fineVariation;
    
    // More accurate center point
    const centerLat = 15.45;
    const centerLng = -61.37;
    
    const lat = centerLat + Math.cos(angle) * (radiusLat + totalVariation);
    const lng = centerLng + Math.sin(angle) * (radiusLng + totalVariation);
    
    coastline.push([lng, lat, 0]); // z=0 for sea level
  }
  
  // Ensure coastline is properly closed by adding first point at the end
  if (coastline.length > 0) {
    coastline.push([...coastline[0]]);
  }
  
  console.log(`Created fallback coastline with ${coastline.length} points`);
  return coastline;
};

// Enhanced terrain generation using parish boundaries for island mask
export const createIslandSurfaceWithBoundaries = (parishData) => {
  const surface = [];
  const steps = 80; // Reduced for better performance and cleaner rendering
  const latStep = (DOMINICA_BOUNDS.maxLat - DOMINICA_BOUNDS.minLat) / steps;
  const lngStep = (DOMINICA_BOUNDS.maxLng - DOMINICA_BOUNDS.minLng) / steps;
  
  // Create a function to check if a point is inside Dominica using improved shape
  const isInsideDominica = (lng, lat) => {
    if (!parishData || !parishData.features) {
      // Improved fallback with more accurate Dominica shape
      const centerLat = 15.45; // More accurate center
      const centerLng = -61.37;
      
      // Create elongated north-south shape like real Dominica
      const latDistance = Math.abs(lat - centerLat);
      const lngDistance = Math.abs(lng - centerLng);
      
      // Dominica is roughly 47km long (N-S) and 29km wide (E-W)
      const maxLatDistance = 0.21; // ~23.5km from center
      const maxLngDistance = 0.13; // ~14.5km from center
      
      // Create elongated elliptical shape with coastal irregularities
      const normalizedLat = latDistance / maxLatDistance;
      const normalizedLng = lngDistance / maxLngDistance;
      
      // Add coastal complexity to avoid weird bottom shapes
      const coastalVariation = 
        Math.sin(lat * 50) * 0.1 + 
        Math.cos(lng * 45) * 0.08 +
        Math.sin((lat + lng) * 30) * 0.05;
      
      const ellipseDistance = Math.sqrt(normalizedLat * normalizedLat + normalizedLng * normalizedLng);
      return ellipseDistance < (1.0 + coastalVariation);
    }
    
    // Check if point is inside any parish polygon
    return parishData.features.some(feature => {
      if (feature.geometry && feature.geometry.type === 'Polygon') {
        return pointInPolygon([lng, lat], feature.geometry.coordinates[0]);
      }
      return false;
    });
  };
  
  // Create surface data with proper ordering for ECharts surface rendering
  for (let i = 0; i <= steps; i++) {
    for (let j = 0; j <= steps; j++) {
      // Use consistent coordinate ordering
      const lat = DOMINICA_BOUNDS.minLat + i * latStep;
      const lng = DOMINICA_BOUNDS.minLng + j * lngStep;
      
      let elevation = 0;
      
      if (isInsideDominica(lng, lat)) {
        // Distance from Morne Diablotins (primary peak)
        const distanceFromPeak = Math.sqrt(
          Math.pow((lat - MORNE_DIABLOTINS.lat) * 111, 2) + 
          Math.pow((lng - MORNE_DIABLOTINS.lng) * 111 * Math.cos(MORNE_DIABLOTINS.lat * Math.PI / 180), 2)
        );
        
        // Main volcanic cone elevation - more realistic falloff
        const peakElevation = MORNE_DIABLOTINS.elevation * Math.exp(-Math.pow(distanceFromPeak / 6, 1.8));
        
        // Secondary volcanic features
        const ridge1 = 350 * Math.exp(-Math.pow(distanceFromPeak - 4, 2) / 15); // Morne Trois Pitons area
        const ridge2 = 250 * Math.exp(-Math.pow(distanceFromPeak - 8, 2) / 25); // Eastern mountains
        const ridge3 = 180 * Math.exp(-Math.pow(distanceFromPeak - 12, 2) / 20); // Coastal hills
        
        // Reduced terrain noise to prevent weird shapes
        const terrainNoise = 
          Math.sin(lat * 25) * Math.cos(lng * 28) * 40 +
          Math.sin(lat * 50) * Math.cos(lng * 45) * 20 +
          Math.sin(lat * 80) * Math.cos(lng * 75) * 10;
        
        elevation = Math.max(0, peakElevation + ridge1 + ridge2 + ridge3 + terrainNoise);
        
        // Improved coastal smoothing to prevent sharp edges
        const centerLat = 15.45;
        const centerLng = -61.37;
        const distanceFromCenter = Math.sqrt(
          Math.pow((lat - centerLat) * 111, 2) + 
          Math.pow((lng - centerLng) * 111 * Math.cos(centerLat * Math.PI / 180), 2)
        );
        
        const maxDistance = 25; // Slightly smaller for better shape
        if (distanceFromCenter > maxDistance * 0.7) {
          const coastalFactor = 1 - (distanceFromCenter - maxDistance * 0.7) / (maxDistance * 0.3);
          elevation *= Math.pow(Math.max(0, coastalFactor), 0.4);
        }
        
        // Additional smoothing for very low elevations to prevent artifacts
        if (elevation < 10) {
          elevation = Math.max(0, elevation * 0.8);
        }
      } else {
        // Ensure ocean floor is consistently at 0
        elevation = 0;
      }
      
      // ECharts expects [x, y, z] format consistently
      surface.push([lng, lat, elevation]);
    }
  }
  
  console.log(`Generated surface with ${surface.length} points`);
  return surface;
};

// Create parish-based 3D extruded polygons
export const createParishExtruded3D = (parishData) => {
  if (!parishData || !parishData.features) return [];
  
  const extrudedParishes = [];
  
  parishData.features.forEach(feature => {
    const parishName = feature.properties?.NAME_1 || feature.properties?.name || 'Unknown';
    const parishStats = PARISH_DATA[parishName] || { population: 1000, gdp_per_capita: 8000 };
    
    if (feature.geometry && feature.geometry.type === 'Polygon') {
      const coordinates = feature.geometry.coordinates[0];
      const height = (parishStats.population / 1000) * 5 + (parishStats.gdp_per_capita / 1000) * 2;
      
      // Convert polygon to center point with height
      const lats = coordinates.map(coord => coord[1]);
      const lngs = coordinates.map(coord => coord[0]);
      const centerLat = lats.reduce((a, b) => a + b) / lats.length;
      const centerLng = lngs.reduce((a, b) => a + b) / lngs.length;
      
      extrudedParishes.push({
        position: [centerLng, centerLat, height],
        height: height,
        name: parishName,
        population: parishStats.population,
        gdp: parishStats.gdp_per_capita
      });
    }
  });
  
  return extrudedParishes;
};

// Create animated hurricane tracks
export const createHurricaneTrack = (hurricane, time) => {
  const trackPoints = [];
  const animatedIndex = Math.floor((time % 100) / 100 * hurricane.track.length);
  
  hurricane.track.forEach((point, index) => {
    if (index <= animatedIndex) {
      const intensity = hurricane.intensity[index];
      const height = intensity * 10; // Scale category to height
      trackPoints.push([...point.slice(0, 2), height]);
    }
  });
  
  return trackPoints;
};

// Generate Roseau city buildings from OSM data
export const createRoseauBuildings = () => {
  // Simulated Roseau building centroids (would come from OSM in production)
  const roseauBuildings = [
    { lat: 15.3017, lng: -61.3870, height: 45, type: 'government', name: 'Government HQ' },
    { lat: 15.2994, lng: -61.3889, height: 25, type: 'commercial', name: 'Bay Front' },
    { lat: 15.3008, lng: -61.3855, height: 20, type: 'commercial', name: 'Market Plaza' },
    { lat: 15.3025, lng: -61.3875, height: 35, type: 'office', name: 'Financial Center' },
    { lat: 15.2986, lng: -61.3901, height: 15, type: 'residential', name: 'Waterfront Homes' },
    { lat: 15.3040, lng: -61.3845, height: 30, type: 'education', name: 'Dominica State College' },
    { lat: 15.2975, lng: -61.3912, height: 18, type: 'healthcare', name: 'Princess Margaret Hospital' },
    { lat: 15.3000, lng: -61.3877, height: 22, type: 'tourism', name: 'Heritage Hotel' }
  ];
  
  return roseauBuildings.map(building => ({
    position: [building.lng, building.lat, building.height],
    height: building.height,
    type: building.type,
    name: building.name
  }));
};

// Create Roseau road network as glowing lines
export const createRoseauRoads = () => {
  const roads = [
    // Main coastal road
    { points: [[-61.392, 15.295, 2], [-61.387, 15.301, 2], [-61.382, 15.306, 2]], type: 'primary' },
    // Cross streets
    { points: [[-61.390, 15.298, 2], [-61.385, 15.299, 2]], type: 'secondary' },
    { points: [[-61.388, 15.302, 2], [-61.383, 15.303, 2]], type: 'secondary' },
    // Hill roads
    { points: [[-61.387, 15.301, 2], [-61.384, 15.308, 8]], type: 'tertiary' },
    { points: [[-61.385, 15.299, 2], [-61.382, 15.305, 6]], type: 'tertiary' }
  ];
  
  return roads;
};
