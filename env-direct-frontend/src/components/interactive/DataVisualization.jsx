import React, { useState, useEffect, useRef } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  RadialLinearScale,
  Filler,
  ScatterController,
  BubbleController
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, Radar, Scatter, Bubble, PolarArea } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  ScatterController,
  BubbleController,
  Title,
  Tooltip,
  Legend
);

/**
 * Interactive Data Visualization Component
 * 
 * This component renders different types of charts based on the provided data.
 * It supports a variety of chart types for visualizing different kinds of data.
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Chart type: 'line', 'bar', 'pie', 'doughnut', 'radar', 'scatter', 'bubble', 'polar-area', 'area'
 * @param {Object} props.data - Chart data
 * @param {Object} props.options - Chart options
 * @param {string} props.title - Chart title
 * @param {string} props.description - Chart description
 * @param {boolean} props.interactive - Whether the chart is interactive
 */
const DataVisualization = ({ 
  type = 'line', 
  data, 
  options = {}, 
  title, 
  description,
  interactive = true
}) => {
  const [chartData, setChartData] = useState(data);
  const chartRef = useRef(null);

  // Default options for different chart types
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: !!title,
        text: title || '',
      },
      tooltip: {
        enabled: interactive,
      }
    },
  };

  // Merge default options with provided options
  const chartOptions = { ...defaultOptions, ...options };

  // Update chart data when props change
  useEffect(() => {
    setChartData(data);
  }, [data]);

  // Render different chart types based on the type prop
  const renderChart = () => {
    // For area charts, we use Line chart with fill option
    const areaOptions = {
      ...chartOptions,
      elements: {
        ...chartOptions.elements,
        line: {
          ...chartOptions.elements?.line,
          fill: true
        }
      }
    };

    switch (type.toLowerCase()) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} ref={chartRef} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} ref={chartRef} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={chartOptions} ref={chartRef} />;
      case 'radar':
        return <Radar data={chartData} options={chartOptions} ref={chartRef} />;
      case 'scatter':
        return <Scatter data={chartData} options={chartOptions} ref={chartRef} />;
      case 'bubble':
        return <Bubble data={chartData} options={chartOptions} ref={chartRef} />;
      case 'polararea':
      case 'polar-area':
      case 'polar':
        return <PolarArea data={chartData} options={chartOptions} ref={chartRef} />;
      case 'area':
        return <Line data={chartData} options={areaOptions} ref={chartRef} />;
      case 'line':
      default:
        return <Line data={chartData} options={chartOptions} ref={chartRef} />;
    }
  };

  return (
    <div className="data-visualization-container bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      {title && <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>}
      {description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>}
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default DataVisualization;
