import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Marker, Popup, CircleMarker, Tooltip, useMap, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import JSZip from 'jszip';
import { kml } from '@tmcw/togeojson';
import L from 'leaflet';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

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

// Map layer configuration
const kmzFiles = [
  { name: 'Coast', path: '/Coast.kmz', color: '#0077be', fillColor: '#0077be', weight: 2, fillOpacity: 0.2 },
  { name: 'Soils', path: '/Soils.kmz', color: '#8B4513', fillColor: '#CD853F', weight: 1, fillOpacity: 0.3 },
  { name: 'Rivers', path: '/Rivers.kmz', color: '#00BFFF', fillColor: '#00BFFF', weight: 2, fillOpacity: 0.5 },
  { name: 'Roads', path: '/Roads.kmz', color: '#696969', fillColor: '#A9A9A9', weight: 3, fillOpacity: 0.7 },
];

// Custom Legend Component
const MapLegend = () => {
  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control leaflet-bar p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-90">
        <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Map Legend</h4>
        <div className="space-y-2">
          {kmzFiles.map((layer) => (
            <div key={layer.name} className="flex items-center">
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
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
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
  const filteredFloodRiskData = React.useMemo(() =>
    floodRiskData.filter(risk =>
      risk?.regionName?.toLowerCase().includes(searchTerm?.toLowerCase() || '') || false
    ),
    [floodRiskData, searchTerm]
  );

  const filteredEcoTourismData = React.useMemo(() =>
    ecoTourismData.filter(site =>
      site?.siteName?.toLowerCase().includes(searchTerm?.toLowerCase() || '') || false
    ),
    [ecoTourismData, searchTerm]
  );

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
      const response = await axios.get('/api/predict/flood-risk/all');
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
      const response = await axios.get('/api/predict/eco-tourism/pressure/all');
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
      const response = await axios.get(`/api/predict/historical-comparison?id=${id}&type=${type}`);
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
  const getLayerStyle = (feature) => {
    const layerName = feature.properties?.layerName;
    const layerConfig = kmzFiles.find(layer => layer.name === layerName);

    if (layerConfig) {
      return {
        color: layerConfig.color,
        weight: layerConfig.weight,
        opacity: 1,
        fillColor: layerConfig.fillColor,
        fillOpacity: layerConfig.fillOpacity,
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
    const loadKMZData = async () => {
      setLoading(true);
      setError(null);
      const allGeojson = [];

      for (const fileInfo of kmzFiles) {
        try {
          const response = await fetch(fileInfo.path);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${fileInfo.name}: ${response.statusText}`);
          }
          const blob = await response.blob();
          const zip = await JSZip.loadAsync(blob);

          // Find the .kml file within the .kmz
          const kmlFile = Object.keys(zip.files).find(filename => filename.toLowerCase().endsWith('.kml'));

          if (!kmlFile) {
            console.warn(`No .kml file found in ${fileInfo.name}`);
            continue;
          }

          const kmlContent = await zip.files[kmlFile].async('text');
          const dom = new DOMParser().parseFromString(kmlContent, 'text/xml');
          const geojson = kml(dom);

          // Add a property to distinguish layers if needed, e.g., for styling or toggling
          if (geojson.features) {
            geojson.features.forEach(feature => {
              feature.properties = { ...feature.properties, layerName: fileInfo.name };
            });
          }

          allGeojson.push({ name: fileInfo.name, data: geojson });

        } catch (err) {
          console.error(`Error processing ${fileInfo.name}:`, err);
          // Optionally, accumulate errors to display them
          setError(prevError => prevError ? `${prevError}; ${err.message}` : err.message);
        }
      }
      setGeojsonData(allGeojson);
      setLoading(false);
    };

    loadKMZData();

    // Fetch environmental data
    fetchFloodRiskData();
    fetchEcoTourismData();
  }, []);

  // Effect for dynamic height calculation - simplified to prevent infinite scrolling issues
  useEffect(() => {
    // Use a fixed height approach instead of dynamic calculation to prevent layout shifts
    const setFixedMapHeight = () => {
      if (mapDisplayContainerRef.current) {
        // Set a fixed height based on viewport size
        // This prevents continuous recalculation that might cause infinite scrolling
        const viewportHeight = window.innerHeight;
        const headerHeight = isMobile ? 80 : 100; // Approximate header height
        const fixedHeight = viewportHeight - headerHeight - 40; // 40px for padding/margins

        // Ensure minimum height
        const finalHeight = Math.max(fixedHeight, 400);
        mapDisplayContainerRef.current.style.height = `${finalHeight}px`;

        // Invalidate map size once after setting height
        if (mapInstance) {
          // Use setTimeout to ensure the height change has been applied
          setTimeout(() => {
            if (mapInstance) {
              mapInstance.invalidateSize();

              // Force center on Dominica after resize
              mapInstance.setView(dominicaCenter, isMobile ? 8 : 9, {
                animate: false
              });
            }
          }, 100);
        }
      }
    };

    // Set height immediately
    setFixedMapHeight();

    // Add resize listener with debounce
    const handleResize = debounce(() => {
      setFixedMapHeight();
    }, 250);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, mapInstance]);

  // Loading and error states
  if (loading || dataLoading) return <p className="text-center p-8">Loading map data...</p>;
  if (!geojsonData.length) return <p className="text-center p-8">No map data to display.</p>;

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

  // Wrap the render in a try-catch block to catch any rendering errors
  try {
    return (
      <div className="p-1 md:p-4 flex flex-col h-full" ref={pageWrapperRef}>
        {/* Display error notification if there's an error */}
        <ErrorNotification />

        <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-gray-800 dark:text-white" ref={titleRef}>
          Live Environmental Data Map
        </h1>

        <div className="mb-1 flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center" ref={controlsContainerRef}>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search regions or sites..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              aria-label="Search regions or sites"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleTimeFilterChange('current')}
              className={`px-3 py-1 rounded-lg ${
                timeFilter === 'current' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={timeFilter === 'current'}
            >
              Current
            </button>
            <button
              onClick={() => handleTimeFilterChange('historical')}
              className={`px-3 py-1 rounded-lg ${
                timeFilter === 'historical' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={timeFilter === 'historical'}
            >
              Historical
            </button>
            <button
              onClick={() => handleTimeFilterChange('future')}
              className={`px-3 py-1 rounded-lg ${
                timeFilter === 'future' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={timeFilter === 'future'}
            >
              Future Predictions
            </button>
          </div>

          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={handleHeatmapToggle}
              className={`px-3 py-1 rounded-lg ${
                showHeatmaps
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={showHeatmaps}
            >
              {showHeatmaps ? 'Hide Heatmaps' : 'Show Heatmaps'}
            </button>

            {showHeatmaps && (
              <div className="flex gap-1">
                <button
                  onClick={() => handleHeatmapChange('population')}
                  className={`px-2 py-1 text-xs rounded-lg ${
                    activeHeatmap === 'population' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  aria-pressed={activeHeatmap === 'population'}
                >
                  Population
                </button>
                <button
                  onClick={() => handleHeatmapChange('pollution')}
                  className={`px-2 py-1 text-xs rounded-lg ${
                    activeHeatmap === 'pollution' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  aria-pressed={activeHeatmap === 'pollution'}
                >
                  Pollution
                </button>
                <button
                  onClick={() => handleHeatmapChange('climate')}
                  className={`px-2 py-1 text-xs rounded-lg ${
                    activeHeatmap === 'climate' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  aria-pressed={activeHeatmap === 'climate'}
                >
                  Climate Impact
                </button>
              </div>
            )}
          </div>
        </div>

        <div 
          className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-2xl"
          ref={mapDisplayContainerRef}
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

              {/* GeoJSON Layers - RE-ENABLING */}
              {geojsonData.map((layer, index) => (
                layer.data && (
                  <LayersControl.Overlay key={`${layer.name}-${index}`} name={layer.name} checked>
                    <GeoJSON 
                      data={layer.data} 
                      style={getLayerStyle}
                      onEachFeature={onFeatureClick}
                    />
                  </LayersControl.Overlay>
                )
              ))}

              {/* Marker Overlays - RE-ENABLING Flood Risk and Eco-Tourism */}
              {/* Flood Risk Markers */}
              <LayersControl.Overlay name="Flood Risk Areas" checked>
                <LayerGroup>
                  {filteredFloodRiskData.map((risk, index) => (
                    <Marker 
                      key={`flood-${index}`}
                      position={getRegionCoordinates(risk.regionName)}
                      icon={FloodIcon}
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
            </LayersControl>

            {/* Heatmap Layers */}
            {showHeatmaps && (
              <LayerGroup>
                {activeHeatmap === 'population' && populationData.map((point, index) => (
                  <CircleMarker
                    key={`population-${index}`}
                    center={point.position}
                    radius={15 * point.intensity + 5}
                    pathOptions={{
                      fillColor: '#8b5cf6', // Purple
                      fillOpacity: 0.5 * point.intensity,
                      stroke: false
                    }}
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
                      fillOpacity: 0.5 * point.intensity,
                      stroke: false
                    }}
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
                      fillOpacity: 0.5 * point.intensity,
                      stroke: false
                    }}
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
