import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Marker, Popup, CircleMarker, Tooltip, useMap, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import JSZip from 'jszip';
import { kml } from '@tmcw/togeojson';
import L from 'leaflet';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { loadAllShapefiles, shapefileConfig, getShapefileStyle } from '../utils/shapefileLoader';

const API_URL = import.meta.env.VITE_API_URL || 'https://env-backend-a73f7074660a.herokuapp.com';

console.log('🚀 [LiveMapPage] API_URL environment variable:', API_URL);
console.log('🚀 [LiveMapPage] All environment variables:', import.meta.env);
console.log('🚀 [LiveMapPage] Deployment timestamp:', new Date().toISOString());

// Force fresh deployment - Updated at 2025-06-20T04:11:00Z

// Fix for default marker icons in Leaflet with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Create custom icons
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Use the default icon for all marker types until custom icons are available
let TourismIcon = DefaultIcon;
let FloodIcon = DefaultIcon;
let ClimateIcon = DefaultIcon;

L.Marker.prototype.options.icon = DefaultIcon;

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Map resize handler component (Re-enabling)
const MapResizeHandler = () => {
  const map = useMap();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    const mapContainerEl = map.getContainer();
    resizeObserver.observe(mapContainerEl);
    // No need for an immediate invalidateSize() here as other mechanisms handle it
    return () => {
      if (mapContainerEl) {
        resizeObserver.unobserve(mapContainerEl);
      } else {
        resizeObserver.disconnect();
      }
    };
  }, [map]);
  return null;
};

// Component to set and maintain map view on Dominica
const SetMapView = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    // Set the view to Dominica coordinates
    map.setView(center, zoom, {
      animate: true,
      duration: 1
    });

    // Prevent scrolling away by handling dragend event
    const onDragEnd = () => {
      // If the map is dragged too far from Dominica, reset the view
      const currentCenter = map.getCenter();
      const distance = map.distance(currentCenter, center);

      // If dragged more than ~100km away, reset view
      if (distance > 100000) {
        map.setView(center, zoom, {
          animate: true,
          duration: 1
        });
      }
    };

    map.on('dragend', onDragEnd);

    return () => {
      map.off('dragend', onDragEnd);
    };
  }, [map, center, zoom]);

  return null;
};

// Map layer configuration - Using actual Dominica shapefiles
const kmzFiles = shapefileConfig;

// Custom Legend Component
const MapLegend = () => {
  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control leaflet-bar p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-90 ml-2 mb-2">
        <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Dominica Map Layers</h4>
        <div className="space-y-2">
          {/* Shapefile Layers */}
          <div className="mb-3">
            <h5 className="font-semibold text-sm mb-1 text-gray-700 dark:text-gray-300">Geographic Layers</h5>
          {kmzFiles.map((layer) => (
              <div key={layer.name} className="flex items-center mb-1">
              <div 
                className="w-6 h-6 mr-2" 
                style={{ 
                  backgroundColor: layer.fillColor, 
                  border: `2px solid ${layer.color}`,
                  opacity: layer.fillOpacity
                }}
              ></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{layer.name}</span>
            </div>
          ))}
          </div>

          {/* Risk Markers */}
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <h5 className="font-semibold text-sm mb-1 text-gray-700 dark:text-gray-300">Risk Assessment</h5>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">High Flood Risk</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Moderate Flood Risk</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Low Flood Risk</span>
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <h5 className="font-semibold text-sm mb-1 text-gray-700 dark:text-gray-300">Heatmap Overlays</h5>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-purple-500 opacity-70"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Population Density</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-red-500 opacity-70"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Pollution Levels</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-orange-500 opacity-70"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Climate Change Impact</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for coordinates
const getRegionCoordinates = (regionName) => {
  // Mapping of region names to coordinates (latitude, longitude)
  const regionCoordinates = {
    'Portsmouth': [15.5833, -61.4667],
    'Roseau South': [15.2833, -61.3833],
    'Layou Valley': [15.3833, -61.4167],
    'Marigot Area': [15.5333, -61.2833],
    // Add more regions as needed
  };

  return regionCoordinates[regionName] || [15.4150, -61.3710]; // Default to center of Dominica if not found
};

const getTourismCoordinates = (siteId) => {
  // Mapping of site IDs to coordinates (latitude, longitude)
  const siteCoordinates = {
    'boiling-lake': [15.3167, -61.2833],
    'trafalgar-falls': [15.3167, -61.3333],
    'middleham-falls': [15.3500, -61.3667],
    'emerald-pool': [15.4000, -61.3000],
    // Add more sites as needed
  };

  return siteCoordinates[siteId] || [15.4150, -61.3710]; // Default to center of Dominica if not found
};

// Helper functions for styling
const getRiskLevelClass = (riskLevel) => {
  if (riskLevel === 'High' || riskLevel === 'Very High') {
    return 'font-bold text-red-500';
  } else if (riskLevel === 'Moderate') {
    return 'font-bold text-yellow-500';
  } else {
    return 'font-bold text-green-500';
  }
};

const getVisitorLoadClass = (visitorLoad) => {
  if (visitorLoad === 'High' || visitorLoad === 'Very High') {
    return 'font-bold text-red-500';
  } else if (visitorLoad === 'Moderate') {
    return 'font-bold text-yellow-500';
  } else {
    return 'font-bold text-green-500';
  }
};

// Main component implementation
const LiveMapPageImpl = () => {
  // Define Dominica's coordinates explicitly for clarity
  const dominicaCenter = [15.4150, -61.3710]; // Latitude, Longitude of Dominica

  const mapRef = useRef(null);
  const [geojsonData, setGeojsonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [floodRiskData, setFloodRiskData] = useState([]);
  const [ecoTourismData, setEcoTourismData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [renderError, setRenderError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('current'); // 'current', 'historical', 'future'
  const [showHeatmaps, setShowHeatmaps] = useState(false);
  const [activeHeatmap, setActiveHeatmap] = useState('population'); // 'population', 'pollution', 'climate'
  const isMobile = useMediaQuery({ maxWidth: 768 });
  console.log('[LiveMapPage] isMobile:', isMobile); // Log isMobile status
  const [mapInstance, setMapInstance] = useState(null);

  // Refs for height calculation
  const pageWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const controlsContainerRef = useRef(null);
  const mapDisplayContainerRef = useRef(null);

  // Filter data based on search term - memoize for performance
  const filteredFloodRiskData = React.useMemo(() => {
    console.log('🔍 Filtering floodRiskData:', { 
      totalItems: floodRiskData.length, 
      searchTerm: searchTerm,
      searchTermLength: searchTerm?.length 
    });
    
    // If no search term, return all data
    if (!searchTerm || searchTerm.trim() === '') {
      console.log('🔍 No search term, returning all flood risk data');
      return floodRiskData;
    }
    
    const filtered = floodRiskData.filter(risk => {
      const matches = risk?.regionName?.toLowerCase().includes(searchTerm.toLowerCase());
      console.log(`🔍 ${risk?.regionName} matches "${searchTerm}": ${matches}`);
      return matches;
    });
    
    console.log('🔍 Filtered flood risk data:', filtered.length, 'items');
    return filtered;
  }, [floodRiskData, searchTerm]);

  const filteredEcoTourismData = React.useMemo(() => {
    console.log('🔍 Filtering ecoTourismData:', { 
      totalItems: ecoTourismData.length, 
      searchTerm: searchTerm,
      searchTermLength: searchTerm?.length 
    });
    
    // If no search term, return all data
    if (!searchTerm || searchTerm.trim() === '') {
      console.log('🔍 No search term, returning all eco-tourism data');
      return ecoTourismData;
    }
    
    const filtered = ecoTourismData.filter(site => {
      const matches = site?.siteName?.toLowerCase().includes(searchTerm.toLowerCase());
      console.log(`🔍 ${site?.siteName} matches "${searchTerm}": ${matches}`);
      return matches;
    });
    
    console.log('🔍 Filtered eco-tourism data:', filtered.length, 'items');
    return filtered;
  }, [ecoTourismData, searchTerm]);

  // Handle search input change - memoize for performance
  const handleSearchChange = React.useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handle time filter change - memoize for performance
  const handleTimeFilterChange = React.useCallback((filter) => {
    setTimeFilter(filter);
  }, []);

  // Handle heatmap toggle
  const handleHeatmapToggle = () => {
    setShowHeatmaps(!showHeatmaps);
  };

  // Handle active heatmap change
  const handleHeatmapChange = (heatmapType) => {
    setActiveHeatmap(heatmapType);
  };

  // Generate sample heatmap data
  const generateHeatmapData = (type, center, radius) => {
    const data = [];
    const [centerLat, centerLng] = center;
    const numPoints = 50;

    for (let i = 0; i < numPoints; i++) {
      // Generate random points within the radius of the center
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius;
      const lat = centerLat + (distance * Math.cos(angle) / 111); // 1 degree lat ≈ 111 km
      const lng = centerLng + (distance * Math.sin(angle) / (111 * Math.cos(centerLat * Math.PI / 180))); // Adjust for longitude

      // Generate intensity based on type and distance from center
      let intensity;
      if (type === 'population') {
        // Higher population density closer to center
        intensity = 1 - (distance / radius) + Math.random() * 0.3;
      } else if (type === 'pollution') {
        // Pollution hotspots
        intensity = 0.3 + Math.random() * 0.7 * (1 - (distance / radius));
      } else if (type === 'climate') {
        // Climate change impact (temperature anomaly)
        intensity = 0.2 + Math.random() * 0.8 * (1 - (distance / radius));
      }

      data.push({
        position: [lat, lng],
        intensity: Math.min(1, Math.max(0, intensity)) // Ensure intensity is between 0 and 1
      });
    }

    return data;
  };

  // Generate heatmap data for different regions
  const populationData = useMemo(() => {
    return [
      ...generateHeatmapData('population', [15.3, -61.38], 0.1), // Roseau area
      ...generateHeatmapData('population', [15.58, -61.46], 0.08), // Portsmouth area
      ...generateHeatmapData('population', [15.45, -61.35], 0.05) // Central area
    ];
  }, []);

  const pollutionData = useMemo(() => {
    return [
      ...generateHeatmapData('pollution', [15.3, -61.38], 0.12), // Roseau area
      ...generateHeatmapData('pollution', [15.58, -61.46], 0.1), // Portsmouth area
      ...generateHeatmapData('pollution', [15.35, -61.4], 0.08) // Industrial area
    ];
  }, []);

  const climateData = useMemo(() => {
    return [
      ...generateHeatmapData('climate', [15.4, -61.37], 0.15), // Central area
      ...generateHeatmapData('climate', [15.3, -61.3], 0.12), // Eastern coast
      ...generateHeatmapData('climate', [15.5, -61.45], 0.1) // Northwestern area
    ];
  }, []);

  // Memoized GeoJSON layers to prevent infinite re-renders
  const memoizedGeoJSONLayers = useMemo(() => {
    console.log(`🗺️ Rendering ${geojsonData.length} GeoJSON layers with memoization`);
    if (geojsonData.length === 0) {
      console.log('🗺️ No GeoJSON data available for rendering');
      return [];
    }
        const layers = geojsonData.map((layer, index) => {
      if (!layer.data || !layer.data.features || layer.data.features.length === 0) {
        console.warn(`⚠️ Skipping layer ${layer.name} - no valid data`);
        return null;
      }
      
      console.log(`🗺️ Creating layer ${layer.name} with ${layer.data.features.length} features, checked: ${index === 0}`);

      // Create stable style function with better visibility
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'];
      const layerColor = colors[index % colors.length];
      const layerStyle = {
        color: layerColor,
        fillColor: layerColor,
        weight: 3, // Increased weight for better visibility
        opacity: 1.0, // Full opacity for borders
        fillOpacity: 0.3, // Increased fill opacity for better visibility
        interactive: true // Ensure they can still be clicked for popups
      };
      
      return (
        <LayersControl.Overlay key={`${layer.name}-${index}`} name={layer.name} checked={index === 0}>
          <GeoJSON 
            key={`geojson-${layer.name}-${layer.data.features.length}`}
            data={layer.data} 
            style={() => layerStyle}
            onEachFeature={(feature, leafletLayer) => {
              // Set lower z-index for GeoJSON layers
              if (leafletLayer.setZIndexOffset) {
                leafletLayer.setZIndexOffset(-1000);
              }
              
              // Add popup if feature has properties
              if (feature.properties) {
                const popupContent = Object.entries(feature.properties)
                  .filter(([key, value]) => value != null && value !== '')
                  .slice(0, 5) // Limit to first 5 properties to avoid huge popups
                  .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                  .join('<br>');
                
                if (popupContent) {
                  leafletLayer.bindPopup(`<div><strong>${layer.name}</strong><br>${popupContent}</div>`);
                }
              }
            }}
          />
        </LayersControl.Overlay>
      );
    }).filter(layer => layer !== null);
    
    console.log(`🗺️ Memoized layers created: ${layers.length} valid layers`);
    return layers;
  }, [geojsonData]);

  // Mock data for flood risk when API fails
  const mockFloodRiskData = [
    {
      regionName: "Portsmouth",
      floodRiskLevel: "Low",
      details: "Coastal area with moderate elevation changes.",
      affectedAreas: ["Lower Reach Area"]
    },
    {
      regionName: "Roseau South",
      floodRiskLevel: "Moderate",
      details: "Urban area with some low-lying sections.",
      affectedAreas: ["Newtown", "Loubiere"]
    },
    {
      regionName: "Layou Valley",
      floodRiskLevel: "High",
      details: "Valley area with river prone to flooding.",
      affectedAreas: ["River Banks", "Lower Valley"]
    },
    {
      regionName: "Marigot Area",
      floodRiskLevel: "Low",
      details: "Coastal area with good drainage.",
      affectedAreas: ["Coastal Road"]
    }
  ];

  // Function to fetch flood risk data from the API
  const fetchFloodRiskData = async () => {
    try {
      setDataLoading(true);
      console.log('🚀 [fetchFloodRiskData] API_URL:', API_URL);
      console.log('🚀 [fetchFloodRiskData] Full URL:', `${API_URL}/api/predict/flood-risk/all`);
      const response = await axios.get(`${API_URL}/api/predict/flood-risk/all`);
      if (response.data) {
        setFloodRiskData(response.data);
      }
    } catch (err) {
      console.error('Error fetching flood risk data:', err);
      // Use mock data when API fails
      console.log('Using mock flood risk data due to API failure');
      setFloodRiskData(mockFloodRiskData);
      setError(prevError => prevError ? `${prevError}; Using mock flood risk data` : 'Using mock flood risk data');
    } finally {
      setDataLoading(false);
    }
  };

  // Mock data for eco-tourism when API fails
  const mockEcoTourismData = [
    {
      siteId: "boiling-lake",
      siteName: "Boiling Lake Trail",
      expectedVisitorLoad: "High",
      recommendation: "Visit Boiling Lake Trail before 10 AM or after 3 PM for a less crowded experience.",
      contributingFactors: ["Base popularity", "High season", "Weekend"]
    },
    {
      siteId: "trafalgar-falls",
      siteName: "Trafalgar Falls",
      expectedVisitorLoad: "High",
      recommendation: "Visit Trafalgar Falls before 10 AM or after 3 PM for a less crowded experience.",
      contributingFactors: ["Base popularity", "High season", "Weekend"]
    },
    {
      siteId: "middleham-falls",
      siteName: "Middleham Falls",
      expectedVisitorLoad: "Moderate",
      recommendation: "Middleham Falls should have manageable crowds. Morning visits are still recommended for the best experience.",
      contributingFactors: ["Base popularity", "Off season", "Weekday"]
    },
    {
      siteId: "emerald-pool",
      siteName: "Emerald Pool",
      expectedVisitorLoad: "Moderate",
      recommendation: "Emerald Pool should have manageable crowds. Morning visits are still recommended for the best experience.",
      contributingFactors: ["Base popularity", "Off season", "Weekday"]
    }
  ];

  // Function to fetch eco-tourism data from the API
  const fetchEcoTourismData = async () => {
    try {
      setDataLoading(true);
      console.log('🚀 [fetchEcoTourismData] API_URL:', API_URL);
      console.log('🚀 [fetchEcoTourismData] Full URL:', `${API_URL}/api/predict/eco-tourism/pressure/all`);
      const response = await axios.get(`${API_URL}/api/predict/eco-tourism/pressure/all`);
      if (response.data) {
        setEcoTourismData(response.data);
      }
    } catch (err) {
      console.error('Error fetching eco-tourism data:', err);
      // Use mock data when API fails
      console.log('Using mock eco-tourism data due to API failure');
      setEcoTourismData(mockEcoTourismData);
      setError(prevError => prevError ? `${prevError}; Using mock eco-tourism data` : 'Using mock eco-tourism data');
    } finally {
      setDataLoading(false);
    }
  };

  // Mock data for historical comparison when API fails
  const getMockHistoricalComparison = (id, type) => {
    if (type === 'flood-risk') {
      return {
        id: id,
        type: 'flood-risk',
        floodRiskLevel: mockFloodRiskData.find(risk => risk.regionName === id)?.floodRiskLevel || "Moderate",
        details: `Historical comparison for ${id} region`,
        affectedAreas: ["Sample Area 1", "Sample Area 2"],
        historicalData: [
          { date: "2023-05-01", floodRiskLevel: "Low", confidenceScore: 0.85 },
          { date: "2023-05-15", floodRiskLevel: "Moderate", confidenceScore: 0.82 },
          { date: "2023-06-01", floodRiskLevel: "Moderate", confidenceScore: 0.88 }
        ],
        trendInfo: {
          direction: "stable",
          magnitude: 0.5,
          description: "Flood risk is relatively stable with moderate fluctuation."
        }
      };
    } else {
      return {
        id: id,
        type: 'eco-tourism',
        siteName: mockEcoTourismData.find(site => site.siteId === id)?.siteName || "Unknown Site",
        expectedVisitorLoad: mockEcoTourismData.find(site => site.siteId === id)?.expectedVisitorLoad || "Moderate",
        recommendation: `Visit ${id} during off-peak hours for the best experience.`,
        contributingFactors: ["Seasonal trends", "Weather conditions", "Local events"],
        historicalData: [
          { date: "2023-05-01", expectedVisitorLoad: "Low", confidenceScore: 0.80 },
          { date: "2023-05-15", expectedVisitorLoad: "Moderate", confidenceScore: 0.85 },
          { date: "2023-06-01", expectedVisitorLoad: "High", confidenceScore: 0.90 }
        ],
        trendInfo: {
          direction: "increasing",
          magnitude: 0.7,
          description: "Visitor numbers are trending upward with moderate fluctuation."
        }
      };
    }
  };

  // Function to fetch historical climate data comparison
  const fetchHistoricalComparison = async (id, type) => {
    try {
      setDataLoading(true);
      const response = await axios.get(`${API_URL}/api/predict/historical-comparison?id=${id}&type=${type}`);
      if (response.data) {
        setSelectedFeature({ id, type, data: response.data });
      }
    } catch (err) {
      console.error('Error fetching historical comparison:', err);
      // Use mock data when API fails
      console.log(`Using mock historical comparison data for ${id} (${type}) due to API failure`);
      const mockData = getMockHistoricalComparison(id, type);
      setSelectedFeature({ id, type, data: mockData });
    } finally {
      setDataLoading(false);
    }
  };

  // Custom styling function for GeoJSON layers
  const getLayerStyle = (feature, layerConfig) => {
    // Use provided layer configuration first
    if (layerConfig) {
      return getShapefileStyle(layerConfig);
    }

    // Fallback to finding config by layer name
    const layerName = feature.properties?.layerName;
    const foundConfig = kmzFiles.find(layer => layer.name === layerName);

    if (foundConfig) {
      return {
        color: foundConfig.color,
        weight: foundConfig.weight,
        opacity: 1,
        fillColor: foundConfig.fillColor,
        fillOpacity: foundConfig.fillOpacity,
      };
    }

    // Default style if no matching layer config
    return {
      color: '#3388ff',
      weight: 2,
      opacity: 1,
      fillColor: '#3388ff',
      fillOpacity: 0.2,
    };
  };

  // Function to handle feature click events
  const onFeatureClick = (feature, layer) => {
    layer.on({
      click: () => {
        const props = feature.properties;
        if (props) {
          setSelectedFeature({
            type: 'layer',
            name: props.name || props.layerName,
            properties: props
          });

          // If it's a region with flood risk data, fetch historical comparison
          if (props.layerName === 'Regions' && props.name) {
            fetchHistoricalComparison(props.name, 'flood-risk');
          }
        }
      }
    });

    // Add popup with basic information
    if (feature.properties) {
      const props = feature.properties;
      const title = props.name || props.layerName || 'Feature';
      const description = props.description ? '<p>' + props.description + '</p>' : '';
      // Simplify the popupContent construction to avoid potential parsing issues
      const popupContent = '<div class="map-popup"><h3>' + title + '</h3>' + description + '</div>';
      layer.bindPopup(popupContent);
    }
  };

  // Add an effect to catch any errors during component lifecycle
  useEffect(() => {
    const handleError = (event) => {
       // Check if the error is the ResizeObserver loop warning or other scroll-related warnings
       if (
         (event.message && event.message.includes('ResizeObserver loop')) ||
         (event.message && event.message.includes('scroll')) ||
         (event.message && event.message.includes('layout'))
       ) {
         console.warn('Ignored non-critical warning:', event.error || event.message);
         // Prevent these warnings from causing re-renders or state updates
         if (event.preventDefault) event.preventDefault(); // Check if preventDefault exists
         if (event.stopPropagation) event.stopPropagation(); // Check if stopPropagation exists
         return;
       }

       console.error("LiveMapPage error:", event.error || event.message, event);
       setRenderError(event.error || new Error(event.message || 'Unknown error'));
    };

    // Named function for the unhandledrejection listener
    const handleUnhandledRejection = (event) => {
      handleError({ 
        message: event.reason instanceof Error ? event.reason.message : String(event.reason),
        error: event.reason 
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection); // Correctly remove the named function
    };
  }, []); // renderError should not be a dependency here to avoid re-registering listeners unnecessarily

  useEffect(() => {
    const loadShapefileData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Loading Dominica shapefiles...');
        const loadedLayers = await loadAllShapefiles();
        console.log('Raw loaded layers:', loadedLayers);
        
        // Convert to the format expected by the map
        const allGeojson = loadedLayers
          .filter(layer => layer.loaded && layer.data)
          .map(layer => ({
            name: layer.name,
            data: layer.data,
            config: layer
          }));

        console.log(`Successfully loaded ${allGeojson.length} shapefile layers:`, allGeojson);
        console.log('GeoJSON data details:', allGeojson.map(layer => ({
          name: layer.name,
          featureCount: layer.data?.features?.length,
          dataType: layer.data?.type,
          hasGeometry: layer.data?.features?.[0]?.geometry ? true : false
        })));
        
        setGeojsonData(allGeojson);
        console.log('✅ GeoJSON data set in state:', allGeojson.length, 'layers');
        
        // Fit map bounds to show all loaded layers
        if (mapInstance && allGeojson.length > 0) {
          try {
            // Calculate bounds from all features
            let bounds = null;
            allGeojson.forEach(layer => {
              if (layer.data && layer.data.features) {
                layer.data.features.forEach(feature => {
                  if (feature.geometry) {
                    const featureBounds = L.geoJSON(feature).getBounds();
                    if (bounds) {
                      bounds.extend(featureBounds);
                    } else {
                      bounds = featureBounds;
                    }
                  }
                });
              }
            });
            
            if (bounds && bounds.isValid()) {
              console.log('📍 Fitting map to layer bounds:', bounds);
              mapInstance.fitBounds(bounds, { padding: [20, 20] });
            } else {
              console.log('📍 No valid bounds found, using default Dominica center');
              mapInstance.setView(dominicaCenter, isMobile ? 9 : 10);
            }
          } catch (error) {
            console.error('Error fitting bounds:', error);
            mapInstance.setView(dominicaCenter, isMobile ? 9 : 10);
          }
        }
        
        // Show errors for failed layers
        const failedLayers = loadedLayers.filter(layer => !layer.loaded);
        if (failedLayers.length > 0) {
          const errorMessage = `Failed to load: ${failedLayers.map(l => l.name).join(', ')}`;
          console.warn('Failed layers:', failedLayers);
          setError(errorMessage);
        }

        } catch (err) {
        console.error('Error loading shapefiles:', err);
        setError(`Failed to load shapefile data: ${err.message}`);
        }
      
      setLoading(false);
    };

    loadShapefileData();

    // Fetch environmental data
    fetchFloodRiskData();
    fetchEcoTourismData();
    
    // Debug: Log initial data state
    console.log('🔍 Initial data state check:');
    console.log('- floodRiskData:', floodRiskData);
    console.log('- ecoTourismData:', ecoTourismData);
    console.log('- geojsonData:', geojsonData);
  }, []);

  // Effect for dynamic height calculation - improved to prevent display issues
  useEffect(() => {
    const setMapHeight = () => {
      if (mapDisplayContainerRef.current) {
        // Calculate height based on viewport size
        const viewportHeight = window.innerHeight;
        const headerHeight = isMobile ? 80 : 100; // Approximate header height
        const calculatedHeight = viewportHeight - headerHeight - 40; // 40px for padding/margins

        // Ensure minimum height and set a reasonable maximum
        const finalHeight = Math.max(Math.min(calculatedHeight, 800), 400);
        mapDisplayContainerRef.current.style.height = `${finalHeight}px`;

        // Invalidate map size after setting height
        if (mapInstance) {
          // Use requestAnimationFrame to ensure the height change has been applied
          requestAnimationFrame(() => {
            if (mapInstance) {
              mapInstance.invalidateSize();
              // Force center on Dominica after resize
              mapInstance.setView(dominicaCenter, isMobile ? 8 : 9, {
                animate: false
              });
            }
          });
        }
      }
    };

    // Set height immediately on mount and when dependencies change
    setMapHeight();

    // Add resize listener with debounce
    const handleResize = debounce(() => {
      setMapHeight();
    }, 250);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, mapInstance]);

  // Effect to ensure map is properly initialized on mount
  useEffect(() => {
    if (mapInstance && mapDisplayContainerRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        mapInstance.invalidateSize();
        mapInstance.setView(dominicaCenter, isMobile ? 8 : 9, {
          animate: false
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [mapInstance, isMobile]);

  // Loading and error states - Only block if still loading, not if GeoJSON failed
  if (loading && geojsonData.length === 0) return <p className="text-center p-8">Loading map data...</p>;
  // Don't block rendering if GeoJSON failed - markers and heatmaps can still work

  // Show error as a notification instead of replacing the entire page
  const ErrorNotification = () => {
    if (!error) return null;

    return (
      <div className="fixed top-4 right-4 max-w-md bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border-l-4 border-yellow-500 z-50">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3 w-0 flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">API Connection Issue</h3>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              <p>{error}</p>
              <p className="mt-1">The map is displaying mock data for demonstration purposes.</p>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setError(null)}
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Display render error if any
  if (renderError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 mb-4">Error rendering map</h2>
        <p className="mb-4">{renderError.message}</p>
        <details className="bg-white p-4 rounded-lg shadow">
          <summary className="font-semibold cursor-pointer">View error details</summary>
          <pre className="mt-2 text-sm overflow-auto p-2 bg-gray-100 rounded">
            {renderError.stack}
          </pre>
        </details>
      </div>
    );
  }

  // Define map zoom level based on device
  const mapZoom = isMobile ? 8 : 9;

  // Feature detail panel
  const FeatureDetailPanel = () => {
    if (!selectedFeature) return null;

    return (
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-[1000] max-h-[40vh] overflow-y-auto">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => setSelectedFeature(null)}
        >
          ×
        </button>
        <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{selectedFeature.name}</h3>

        {selectedFeature.type === 'layer' && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {Object.entries(selectedFeature.properties)
              .filter(([key]) => !['layerName', 'name'].includes(key))
              .map(([key, value]) => (
                <div key={key} className="mb-1">
                  <span className="font-semibold">{key}: </span>
                  <span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                </div>
              ))
            }
          </div>
        )}

        {selectedFeature.type === 'flood-risk' && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <div className="mb-2">
              <span className="font-semibold">Risk Level: </span>
              <span className={getRiskLevelClass(selectedFeature.data.floodRiskLevel)}>
                {selectedFeature.data.floodRiskLevel}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Details: </span>
              <span>{selectedFeature.data.details}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Affected Areas: </span>
              <span>{selectedFeature.data.affectedAreas.join(', ')}</span>
            </div>
          </div>
        )}

        {selectedFeature.type === 'eco-tourism' && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <div className="mb-2">
              <span className="font-semibold">Visitor Load: </span>
              <span className={getVisitorLoadClass(selectedFeature.data.expectedVisitorLoad)}>
                {selectedFeature.data.expectedVisitorLoad}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Recommendation: </span>
              <span>{selectedFeature.data.recommendation}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Contributing Factors: </span>
              <span>{selectedFeature.data.contributingFactors.join(', ')}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Debug: Log data state before rendering
  console.log('🗺️ Rendering map with data:');
  console.log('- floodRiskData length:', floodRiskData.length);
  console.log('- ecoTourismData length:', ecoTourismData.length);
  console.log('- filteredFloodRiskData length:', filteredFloodRiskData.length);
  console.log('- filteredEcoTourismData length:', filteredEcoTourismData.length);
  console.log('- geojsonData length:', geojsonData.length);
  console.log('- showHeatmaps:', showHeatmaps);
  console.log('- loading:', loading);
  console.log('- dataLoading:', dataLoading);

  // Wrap the render in a try-catch block to catch any rendering errors
  try {
    return (
      <div className="p-1 md:p-4 flex flex-col h-full" ref={pageWrapperRef}>
        {/* Display error notification if there's an error */}
        <ErrorNotification />

        <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-gray-800 dark:text-white" ref={titleRef}>
          Live Environmental Data Map
        </h1>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Filter */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Locations
              </label>
            <input
              type="text"
                id="search"
              value={searchTerm}
              onChange={handleSearchChange}
                placeholder="Search regions, tourism sites..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
          </div>

            {/* Time Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Period
              </label>
          <div className="flex gap-2">
                {['current', 'historical', 'future'].map((filter) => (
            <button
                    key={filter}
                    onClick={() => handleTimeFilterChange(filter)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      timeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
                ))}
              </div>
          </div>

            {/* Heatmap Controls */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Heatmap Overlays
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showHeatmaps}
                    onChange={handleHeatmapToggle}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Show Heatmaps</span>
                </label>
            {showHeatmaps && (
                  <select
                    value={activeHeatmap}
                    onChange={(e) => handleHeatmapChange(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="population">Population Density</option>
                    <option value="pollution">Pollution Levels</option>
                    <option value="climate">Climate Impact</option>
                  </select>
                )}
              </div>
            </div>

            {/* Layer Status */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Map Layers
              </label>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {loading ? (
                  <span className="text-blue-600">Loading layers...</span>
                ) : (
                  <span className="text-green-600">
                    {geojsonData.length} layers loaded
                    {geojsonData.length > 0 && (
                      <div className="text-xs mt-1">
                        {geojsonData.map(layer => 
                          `${layer.name} (${layer.data?.features?.length || 0})`
                        ).join(', ')}
              </div>
                    )}
                  </span>
                )}
                {error && (
                  <div className="text-red-600 text-xs mt-1">{error}</div>
            )}
              </div>
            </div>
          </div>
        </div>

        <div 
          className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-2xl"
          ref={mapDisplayContainerRef}
          style={{ height: '600px', minHeight: '400px' }}
        >
          <MapContainer 
            center={dominicaCenter} 
            zoom={mapZoom} 
            style={{ height: '100%', width: '100%' }} 
            className="rounded-lg"
            ref={mapRef}
            whenCreated={(map) => {
              console.log('[LiveMapPage] MapContainer whenCreated fired. Map instance:', map);
              setMapInstance(map);
            }}
          >
            <MapResizeHandler />
            <SetMapView center={dominicaCenter} zoom={mapZoom} />

            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                />
              </LayersControl.BaseLayer>



              {/* Marker Overlays - MOVED TO TOP for better visibility */}
              {/* Flood Risk Markers */}
              <LayersControl.Overlay name="Flood Risk Areas" checked>
                <LayerGroup>
                  {filteredFloodRiskData.map((risk, index) => (
                    <Marker 
                      key={`flood-${index}`}
                      position={getRegionCoordinates(risk.regionName)}
                      icon={FloodIcon}
                      zIndexOffset={1000} // Ensure markers appear on top
                      eventHandlers={{
                        click: () => {
                          setSelectedFeature({
                            type: 'flood-risk',
                            name: risk.regionName,
                            data: risk
                          });
                          if (timeFilter === 'historical' || timeFilter === 'future') {
                            fetchHistoricalComparison(risk.regionName, 'flood-risk');
                          }
                        }
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -32]} opacity={0.9}>
                        <div>
                          <strong>{risk.regionName}</strong>
                          <div>Risk Level: <span className={getRiskLevelClass(risk.floodRiskLevel)}>{risk.floodRiskLevel}</span></div>
                          {timeFilter !== 'current' && <div className="text-xs italic">Click for {timeFilter} data</div>}
                        </div>
                      </Tooltip>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>

              {/* Eco-Tourism Markers */}
              <LayersControl.Overlay name="Eco-Tourism Sites" checked>
                <LayerGroup>
                  {filteredEcoTourismData.map((site, index) => (
                    <Marker 
                      key={`tourism-${index}`}
                      position={getTourismCoordinates(site.siteId)}
                      icon={TourismIcon}
                      zIndexOffset={1000} // Ensure markers appear on top
                      eventHandlers={{
                        click: () => {
                          setSelectedFeature({
                            type: 'eco-tourism',
                            name: site.siteName,
                            data: site
                          });
                          fetchHistoricalComparison(site.siteId, 'eco-tourism');
                        }
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -32]} opacity={0.9}>
                        <div>
                          <strong>{site.siteName}</strong>
                          <div>Visitor Load: <span className={getVisitorLoadClass(site.expectedVisitorLoad)}>{site.expectedVisitorLoad}</span></div>
                          {timeFilter !== 'current' && <div className="text-xs italic">Click for {timeFilter} data</div>}
                        </div>
                      </Tooltip>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>

              {/* GeoJSON Layers - MOVED BELOW markers and made unchecked by default */}
              {memoizedGeoJSONLayers}
            </LayersControl>

            {/* Heatmap Layers - Rendered on top with high z-index */}
            {showHeatmaps && (
              <LayerGroup>
                {activeHeatmap === 'population' && populationData.map((point, index) => (
                  <CircleMarker
                    key={`population-${index}`}
                    center={point.position}
                    radius={15 * point.intensity + 5}
                    pathOptions={{
                      fillColor: '#8b5cf6', // Purple
                      fillOpacity: 0.6 * point.intensity, // Increased opacity for better visibility
                      stroke: true,
                      color: '#7c3aed',
                      weight: 1
                    }}
                    zIndexOffset={2000} // High z-index to appear on top
                  >
                    <Tooltip>
                      <div>
                        <strong>Population Density</strong>
                        <div>Intensity: {Math.round(point.intensity * 100)}%</div>
                      </div>
                    </Tooltip>
                  </CircleMarker>
                ))}

                {activeHeatmap === 'pollution' && pollutionData.map((point, index) => (
                  <CircleMarker
                    key={`pollution-${index}`}
                    center={point.position}
                    radius={15 * point.intensity + 5}
                    pathOptions={{
                      fillColor: '#ef4444', // Red
                      fillOpacity: 0.6 * point.intensity, // Increased opacity for better visibility
                      stroke: true,
                      color: '#dc2626',
                      weight: 1
                    }}
                    zIndexOffset={2000} // High z-index to appear on top
                  >
                    <Tooltip>
                      <div>
                        <strong>Pollution Level</strong>
                        <div>Intensity: {Math.round(point.intensity * 100)}%</div>
                      </div>
                    </Tooltip>
                  </CircleMarker>
                ))}

                {activeHeatmap === 'climate' && climateData.map((point, index) => (
                  <CircleMarker
                    key={`climate-${index}`}
                    center={point.position}
                    radius={15 * point.intensity + 5}
                    pathOptions={{
                      fillColor: '#f97316', // Orange
                      fillOpacity: 0.6 * point.intensity, // Increased opacity for better visibility
                      stroke: true,
                      color: '#ea580c',
                      weight: 1
                    }}
                    zIndexOffset={2000} // High z-index to appear on top
                  >
                    <Tooltip>
                      <div>
                        <strong>Climate Change Impact</strong>
                        <div>Intensity: {Math.round(point.intensity * 100)}%</div>
                      </div>
                    </Tooltip>
                  </CircleMarker>
                ))}
              </LayerGroup>
            )}

            {/* MapLegend - RE-ENABLING */}
            <MapLegend />

          </MapContainer>
          {/* FeatureDetailPanel - RE-ENABLING */}
          {selectedFeature && <FeatureDetailPanel />}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering LiveMapPage:", error);
    setRenderError(error);
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 mb-4">Error rendering map</h2>
        <p className="mb-4">An unexpected error occurred while rendering the map.</p>
      </div>
    );
  }
};

// Create a wrapper component that renders the main component and handles initialization errors
const LiveMapPageWrapper = () => {
  // State to track initialization errors
  const [initError, setInitError] = useState(null);

  // Use useEffect to catch any errors during initialization
  useEffect(() => {
    try {
      // This is just a test to see if basic initialization works
      console.log("LiveMapPage wrapper initialized");
    } catch (error) {
      console.error("Error initializing LiveMapPage wrapper:", error);
      setInitError(error);
    }
  }, []);

  // If there was an initialization error, show an error message
  if (initError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 mb-4">Error initializing map component</h2>
        <p className="mb-4">{initError.message}</p>
      </div>
    );
  }

  // Render the main component - rendering errors will be caught by the ErrorBoundary in App.jsx
  return <LiveMapPageImpl />;
};

// Export the wrapper component - Now correctly at the top level
export default LiveMapPageWrapper;
