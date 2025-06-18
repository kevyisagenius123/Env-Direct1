import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Create default icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to set and maintain map view
const SetMapView = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1
    });
  }, [map, center, zoom]);

  return null;
};

/**
 * Interactive Map Component
 * 
 * This component renders an interactive map that can display markers, GeoJSON data,
 * and other geographic information.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.center - Center coordinates [latitude, longitude]
 * @param {number} props.zoom - Zoom level
 * @param {Array} props.markers - Array of marker objects with lat, lng, title, and description
 * @param {Object} props.geoJSON - GeoJSON data to display on the map
 * @param {string} props.title - Map title
 * @param {string} props.description - Map description
 * @param {number} props.height - Map height in pixels
 */
const InteractiveMap = ({
  center = [15.4150, -61.3710], // Default to Dominica
  zoom = 9,
  markers = [],
  geoJSON = null,
  title,
  description,
  height = 400
}) => {
  const mapRef = useRef(null);
  // Store map instance for potential future use (e.g., programmatic control)
  const [_mapInstance, setMapInstance] = useState(null);

  // Style function for GeoJSON
  const geoJSONStyle = (feature) => {
    return {
      color: feature.properties?.color || '#3388ff',
      weight: feature.properties?.weight || 2,
      opacity: 1,
      fillColor: feature.properties?.fillColor || '#3388ff',
      fillOpacity: feature.properties?.fillOpacity || 0.2,
    };
  };

  // Function to handle feature click events
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(`<div class="font-semibold">${feature.properties.name}</div>${feature.properties.description || ''}`);
    }
  };

  return (
    <div className="interactive-map-container mb-6">
      {title && <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>}
      {description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>}

      <div 
        className="relative rounded-lg shadow-md overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          ref={(map) => {
            mapRef.current = map;
            if (map) setMapInstance(map);
          }}
        >
          <SetMapView center={center} zoom={zoom} />

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

            {geoJSON && (
              <LayersControl.Overlay checked name="Geographic Data">
                <GeoJSON 
                  data={geoJSON} 
                  style={geoJSONStyle}
                  onEachFeature={onEachFeature}
                />
              </LayersControl.Overlay>
            )}
          </LayersControl>

          {markers.map((marker, index) => (
            <Marker 
              key={`marker-${index}`}
              position={[marker.lat, marker.lng]}
              icon={marker.icon || DefaultIcon}
            >
              {(marker.title || marker.description) && (
                <Popup>
                  {marker.title && <div className="font-semibold">{marker.title}</div>}
                  {marker.description && <div>{marker.description}</div>}
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>

      {markers.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Click on markers to view details
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
