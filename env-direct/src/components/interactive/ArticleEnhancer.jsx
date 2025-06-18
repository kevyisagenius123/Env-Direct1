import React from 'react';
import DataVisualization from './DataVisualization';
import ImageComparison from './ImageComparison';
import InteractiveMap from './InteractiveMap';

/**
 * ArticleEnhancer Component
 * 
 * This component enhances article content by replacing special placeholders with
 * interactive components like data visualizations, image comparisons, and maps.
 * 
 * Placeholder format:
 * - Data Visualization: {{CHART:type=line,title=Chart Title,data=chartDataId}}
 * - Image Comparison: {{IMAGE_COMPARE:before=url1,after=url2,title=Comparison Title}}
 * - Interactive Map: {{MAP:center=lat|lng,zoom=9,markers=markersDataId,title=Map Title}}
 * 
 * @param {Object} props - Component props
 * @param {string} props.content - The article content with placeholders
 * @param {Object} props.interactiveData - Object containing data for interactive components
 */
const ArticleEnhancer = ({ content, interactiveData = {} }) => {
  if (!content) return null;

  // Function to parse parameters from placeholder string
  const parseParams = (paramsString) => {
    const params = {};
    if (!paramsString) return params;

    // Split by commas, but not commas inside quotes
    const paramPairs = paramsString.match(/([^,]+="[^"]*"|[^,]+=[^,]*)/g) || [];
    
    paramPairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value !== undefined) {
        // Remove quotes if present
        params[key.trim()] = value.trim().replace(/^"(.*)"$/, '$1');
      }
    });
    
    return params;
  };

  // Function to render a chart component
  const renderChart = (params) => {
    const { type, title, description, data: dataId } = params;
    const chartData = interactiveData[dataId];
    
    if (!chartData) {
      console.error(`Chart data not found for ID: ${dataId}`);
      return <div className="error-message">Chart data not found</div>;
    }
    
    return (
      <DataVisualization
        type={type || 'line'}
        data={chartData}
        title={title}
        description={description}
      />
    );
  };

  // Function to render an image comparison component
  const renderImageComparison = (params) => {
    const { before, after, title, description, beforeLabel, afterLabel } = params;
    
    if (!before || !after) {
      console.error('Before and after images are required for image comparison');
      return <div className="error-message">Image comparison requires before and after images</div>;
    }
    
    return (
      <ImageComparison
        beforeImage={before}
        afterImage={after}
        beforeLabel={beforeLabel || 'Before'}
        afterLabel={afterLabel || 'After'}
        title={title}
        description={description}
      />
    );
  };

  // Function to render a map component
  const renderMap = (params) => {
    const { center, zoom, markers: markersId, geoJSON: geoJSONId, title, description, height } = params;
    
    // Parse center coordinates
    let centerCoords = [15.4150, -61.3710]; // Default to Dominica
    if (center) {
      const [lat, lng] = center.split('|').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        centerCoords = [lat, lng];
      }
    }
    
    // Get markers and geoJSON data from interactiveData
    const markers = interactiveData[markersId] || [];
    const geoJSON = interactiveData[geoJSONId] || null;
    
    return (
      <InteractiveMap
        center={centerCoords}
        zoom={parseInt(zoom) || 9}
        markers={markers}
        geoJSON={geoJSON}
        title={title}
        description={description}
        height={parseInt(height) || 400}
      />
    );
  };

  // Process content to replace placeholders with interactive components
  const processContent = () => {
    if (!content) return null;

    // Split content by placeholders
    const parts = content.split(/(\{\{CHART:[^}]*\}\}|\{\{IMAGE_COMPARE:[^}]*\}\}|\{\{MAP:[^}]*\}\})/g);
    
    return parts.map((part, index) => {
      // Check if this part is a placeholder
      if (part.startsWith('{{CHART:')) {
        const paramsString = part.substring(8, part.length - 2);
        const params = parseParams(paramsString);
        return <React.Fragment key={index}>{renderChart(params)}</React.Fragment>;
      } else if (part.startsWith('{{IMAGE_COMPARE:')) {
        const paramsString = part.substring(16, part.length - 2);
        const params = parseParams(paramsString);
        return <React.Fragment key={index}>{renderImageComparison(params)}</React.Fragment>;
      } else if (part.startsWith('{{MAP:')) {
        const paramsString = part.substring(6, part.length - 2);
        const params = parseParams(paramsString);
        return <React.Fragment key={index}>{renderMap(params)}</React.Fragment>;
      } else {
        // Regular content, render as HTML
        return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      }
    });
  };

  return (
    <div className="article-content">
      {processContent()}
    </div>
  );
};

export default ArticleEnhancer;