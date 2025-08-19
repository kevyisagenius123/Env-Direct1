// Dominica geographical and data constants

export const DOMINICA_BOUNDS = {
  minLat: 15.2,
  maxLat: 15.7,
  minLng: -61.6,
  maxLng: -61.2
};

export const MORNE_DIABLOTINS = {
  lat: 15.5047,
  lng: -61.4025,
  elevation: 1447 // meters
};

export const PARISH_DATA = {
  'Saint George': { population: 21241, gdp_per_capita: 12500, area: 56.8 },
  'Saint Andrew': { population: 10117, gdp_per_capita: 8900, area: 178.4 },
  'Saint David': { population: 6034, gdp_per_capita: 9200, area: 131.6 },
  'Saint John': { population: 6561, gdp_per_capita: 10800, area: 59.0 },
  'Saint Joseph': { population: 5637, gdp_per_capita: 9600, area: 120.1 },
  'Saint Luke': { population: 1668, gdp_per_capita: 8500, area: 77.9 },
  'Saint Mark': { population: 1834, gdp_per_capita: 8200, area: 9.9 },
  'Saint Patrick': { population: 7622, gdp_per_capita: 10200, area: 84.4 },
  'Saint Paul': { population: 9786, gdp_per_capita: 11500, area: 67.4 },
  'Saint Peter': { population: 1430, gdp_per_capita: 8800, area: 27.7 }
};

export const HURRICANE_TRACKS = [
  {
    name: 'Hurricane Maria (2017)',
    track: [
      [-59.8, 14.2, 0], [-60.2, 14.6, 15], [-60.8, 15.1, 25], 
      [-61.3, 15.4, 35], [-61.8, 15.8, 20], [-62.4, 16.3, 0]
    ],
    intensity: [1, 2, 3, 5, 4, 2], // Category scale
    color: '#ff0000'
  },
  {
    name: 'Hurricane David (1979)',
    track: [
      [-59.5, 13.8, 0], [-60.1, 14.3, 12], [-60.7, 14.9, 22],
      [-61.2, 15.3, 30], [-61.7, 15.7, 18], [-62.2, 16.1, 0]
    ],
    intensity: [1, 2, 3, 4, 3, 1],
    color: '#ff6600'
  },
  {
    name: 'Tropical Storm Erika (2015)',
    track: [
      [-60.0, 14.5, 0], [-60.4, 14.8, 8], [-60.9, 15.2, 12],
      [-61.3, 15.5, 15], [-61.7, 15.8, 10], [-62.1, 16.2, 0]
    ],
    intensity: [1, 1, 2, 2, 1, 1],
    color: '#ffaa00'
  }
];

export const LANDSLIDE_RISK_GRID = [
  // High risk areas (mountainous interior)
  { lat: 15.50, lng: -61.40, risk: 8.5, type: 'high' },    // Morne Diablotins area
  { lat: 15.48, lng: -61.38, risk: 7.8, type: 'high' },
  { lat: 15.45, lng: -61.42, risk: 8.2, type: 'high' },
  { lat: 15.42, lng: -61.35, risk: 7.5, type: 'high' },
  { lat: 15.38, lng: -61.41, risk: 8.0, type: 'high' },
  { lat: 15.35, lng: -61.38, risk: 7.2, type: 'high' },
  
  // Medium risk areas (slopes and valleys)
  { lat: 15.47, lng: -61.32, risk: 6.2, type: 'medium' },
  { lat: 15.44, lng: -61.28, risk: 5.8, type: 'medium' },
  { lat: 15.41, lng: -61.31, risk: 6.5, type: 'medium' },
  { lat: 15.39, lng: -61.25, risk: 5.5, type: 'medium' },
  { lat: 15.36, lng: -61.29, risk: 6.0, type: 'medium' },
  { lat: 15.33, lng: -61.33, risk: 5.9, type: 'medium' },
  { lat: 15.30, lng: -61.30, risk: 5.2, type: 'medium' },
  
  // Lower risk areas (coastal zones)
  { lat: 15.30, lng: -61.39, risk: 3.5, type: 'low' },     // Roseau area
  { lat: 15.28, lng: -61.38, risk: 3.2, type: 'low' },
  { lat: 15.32, lng: -61.37, risk: 3.8, type: 'low' },
  { lat: 15.52, lng: -61.30, risk: 4.1, type: 'low' },     // Portsmouth area
  { lat: 15.54, lng: -61.28, risk: 3.9, type: 'low' },
  { lat: 15.25, lng: -61.35, risk: 3.4, type: 'low' },
  { lat: 15.48, lng: -61.25, risk: 4.0, type: 'low' },
  { lat: 15.40, lng: -61.22, risk: 3.7, type: 'low' }
];

export const TOURISM_FLOWS = [
  // Flight routes to Dominica
  { from: [-73.8, 40.7, 50], to: [-61.3, 15.5, 5], passengers: 15000, type: 'air' }, // New York
  { from: [-80.2, 25.8, 50], to: [-61.3, 15.5, 5], passengers: 22000, type: 'air' }, // Miami
  { from: [-63.1, 18.4, 50], to: [-61.3, 15.5, 5], passengers: 8500, type: 'air' },  // San Juan
  { from: [-59.6, 13.1, 50], to: [-61.3, 15.5, 5], passengers: 12000, type: 'air' }, // Barbados
  
  // Ferry routes
  { from: [-61.2, 16.2, 5], to: [-61.3, 15.5, 5], passengers: 18000, type: 'sea' },  // Guadeloupe
  { from: [-61.0, 14.7, 5], to: [-61.3, 15.5, 5], passengers: 25000, type: 'sea' },  // Martinique
  { from: [-60.9, 17.1, 5], to: [-61.3, 15.5, 5], passengers: 6500, type: 'sea' }    // Antigua
];

export const SEISMIC_DATA = [
  { lat: 15.42, lng: -61.35, magnitude: 4.2, depth: 12, date: '2023-08' },
  { lat: 15.38, lng: -61.41, magnitude: 3.8, depth: 8, date: '2023-07' },
  { lat: 15.30, lng: -61.39, magnitude: 3.1, depth: 15, date: '2023-06' },
  { lat: 15.52, lng: -61.30, magnitude: 2.9, depth: 5, date: '2023-05' },
  { lat: 15.45, lng: -61.28, magnitude: 3.5, depth: 10, date: '2023-04' },
  { lat: 15.35, lng: -61.33, magnitude: 4.0, depth: 18, date: '2023-03' },
  { lat: 15.40, lng: -61.25, magnitude: 2.7, depth: 7, date: '2023-02' }
];

export const RAINFALL_DATA = [
  { lat: 15.50, lng: -61.40, rainfall: 350 }, // Mountain interior (high)
  { lat: 15.48, lng: -61.38, rainfall: 320 },
  { lat: 15.45, lng: -61.42, rainfall: 380 },
  { lat: 15.42, lng: -61.35, rainfall: 290 },
  { lat: 15.30, lng: -61.39, rainfall: 180 }, // Leeward coast (lower)
  { lat: 15.28, lng: -61.38, rainfall: 165 },
  { lat: 15.52, lng: -61.30, rainfall: 220 }, // Windward coast (moderate)
  { lat: 15.48, lng: -61.25, rainfall: 240 },
  { lat: 15.40, lng: -61.22, rainfall: 280 },
  { lat: 15.35, lng: -61.28, rainfall: 310 }
];
