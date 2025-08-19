import React from 'react';

export const ControlPanel = ({ currentMode, onModeChange, animationSpeed, onAnimationSpeedChange }) => {
  const visualizationModes = [
    { key: 'smartCity', label: 'Smart City 3D' },
    { key: 'volcano', label: 'Volcano & Relief DEM' },
    { key: 'hurricanes', label: 'Hurricane Tracking' },
    { key: 'seismic', label: 'Seismic Activity' },
    { key: 'tourism', label: 'Tourism Flow' },
    { key: 'parish', label: 'Parish Statistics' },
    { key: 'landslide', label: 'Landslide Risk' },
    { key: 'rainfall', label: 'Rainfall Patterns' }
  ];

  return (
    <div className="control-panel" style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      zIndex: 1000,
      minWidth: '250px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
        🏝️ Dominica Smart Island
      </h3>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
          Visualization Mode:
        </label>
        <select
          value={currentMode}
          onChange={onModeChange}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: 'none',
            background: '#333',
            color: 'white',
            fontSize: '14px'
          }}
        >
          {visualizationModes.map(mode => (
            <option key={mode.key} value={mode.key}>
              {mode.label}
            </option>
          ))}
        </select>
      </div>

      {(currentMode === 'hurricanes' || currentMode === 'tourism') && (
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            Animation Speed: {animationSpeed}x
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={animationSpeed}
            onChange={onAnimationSpeedChange}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export const StatsPanel = ({ stats, currentMode }) => {
  if (!stats || Object.keys(stats).length === 0) return null;

  return (
    <div className="stats-panel" style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      zIndex: 1000,
      minWidth: '200px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
        📊 Statistics
      </h4>
      
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} style={{ 
          marginBottom: '8px', 
          fontSize: '13px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>{key}:</span>
          <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
        </div>
      ))}
    </div>
  );
};

export const Legend = ({ currentMode }) => {
  const getLegendData = () => {
    switch (currentMode) {
      case 'smartCity':
        return {
          title: '🏙️ Smart City Elements',
          items: [
            { color: '#4CAF50', label: 'Residential Buildings' },
            { color: '#2196F3', label: 'Commercial Buildings' },
            { color: '#FF9800', label: 'Government Buildings' },
            { color: '#9C27B0', label: 'Religious Buildings' },
            { color: '#F44336', label: 'Healthcare Facilities' },
            { color: '#795548', label: 'Educational Institutions' },
            { color: '#607D8B', label: 'Industrial Buildings' },
            { color: '#FFEB3B', label: 'Tourism & Hotels' }
          ]
        };

      case 'volcano':
        return {
          title: '🌋 Elevation & Relief',
          items: [
            { color: '#8B4513', label: 'Sea Level (0m)' },
            { color: '#DAA520', label: 'Low Hills (100m)' },
            { color: '#228B22', label: 'Medium Hills (300m)' },
            { color: '#FF8C00', label: 'High Hills (600m)' },
            { color: '#DC143C', label: 'Mountains (900m)' },
            { color: '#8B0000', label: 'Peak (1447m)' }
          ]
        };

      case 'hurricanes':
        return {
          title: '🌀 Hurricane Categories',
          items: [
            { color: '#00FF00', label: 'Category 1 (119-153 km/h)' },
            { color: '#FFFF00', label: 'Category 2 (154-177 km/h)' },
            { color: '#FFA500', label: 'Category 3 (178-208 km/h)' },
            { color: '#FF0000', label: 'Category 4 (209-251 km/h)' },
            { color: '#8B0000', label: 'Category 5 (252+ km/h)' }
          ]
        };

      case 'seismic':
        return {
          title: '📊 Seismic Activity',
          items: [
            { color: '#00FF00', label: 'Magnitude 1-2 (Minor)' },
            { color: '#FFFF00', label: 'Magnitude 2-3 (Light)' },
            { color: '#FFA500', label: 'Magnitude 3-4 (Moderate)' },
            { color: '#FF0000', label: 'Magnitude 4-5 (Strong)' },
            { color: '#8B0000', label: 'Magnitude 5+ (Major)' }
          ]
        };

      case 'parish':
        return {
          title: '🏘️ Parish Population',
          items: [
            { color: '#E8F5E8', label: '< 5,000 residents' },
            { color: '#C8E6C9', label: '5,000 - 10,000' },
            { color: '#A5D6A7', label: '10,000 - 15,000' },
            { color: '#81C784', label: '15,000 - 20,000' },
            { color: '#66BB6A', label: '20,000+ residents' }
          ]
        };

      case 'landslide':
        return {
          title: '⛰️ Landslide Risk',
          items: [
            { color: '#00FF00', label: 'Very Low Risk' },
            { color: '#ADFF2F', label: 'Low Risk' },
            { color: '#FFFF00', label: 'Moderate Risk' },
            { color: '#FFA500', label: 'High Risk' },
            { color: '#FF0000', label: 'Very High Risk' }
          ]
        };

      case 'rainfall':
        return {
          title: '🌧️ Annual Rainfall',
          items: [
            { color: '#ADD8E6', label: '< 1500mm (Dry)' },
            { color: '#87CEEB', label: '1500-2000mm (Moderate)' },
            { color: '#4682B4', label: '2000-2500mm (High)' },
            { color: '#1E90FF', label: '2500-3000mm (Very High)' },
            { color: '#0000FF', label: '> 3000mm (Extreme)' }
          ]
        };

      default:
        return null;
    }
  };

  const legendData = getLegendData();
  
  if (!legendData) return null;

  return (
    <div className="legend" style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      zIndex: 1000,
      minWidth: '220px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>
        {legendData.title}
      </h4>
      
      {legendData.items.map((item, index) => (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '6px',
          fontSize: '12px'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            backgroundColor: item.color,
            marginRight: '8px',
            borderRadius: '2px',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export const LoadingIndicator = ({ isLoading, message = 'Loading...' }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-indicator" style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      zIndex: 2000,
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #333',
        borderTop: '4px solid #fff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 15px'
      }} />
      <div style={{ fontSize: '16px' }}>{message}</div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
