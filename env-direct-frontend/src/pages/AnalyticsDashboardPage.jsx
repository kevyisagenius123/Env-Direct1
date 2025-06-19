import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Spinner from '../components/Spinner';
import axios from 'axios';

const AnalyticsDashboardPage = () => {
  const [historicalData, setHistoricalData] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('Portsmouth');
  const [selectedSite, setSelectedSite] = useState('boiling-lake');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('floodRisk'); // 'floodRisk' or 'ecoTourism'

  // Fetch historical data for the selected region and site
  useEffect(() => {
    const fetchHistoricalData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch flood risk historical data for the selected region
        const floodRiskResponse = await axios.get(`/api/predict/historical-comparison?id=${selectedRegion}&type=flood-risk`);

        // Fetch eco-tourism historical data for the selected site
        const ecoTourismResponse = await axios.get(`/api/predict/historical-comparison?id=${selectedSite}&type=eco-tourism`);

        setHistoricalData({
          floodRisk: floodRiskResponse.data,
          ecoTourism: ecoTourismResponse.data
        });
      } catch (err) {
        console.error('Error fetching historical data:', err);
        setError('Failed to load historical data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [selectedRegion, selectedSite]);

  // Handle region selection change
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  // Handle site selection change
  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-env-gray-darker p-4">
        <Spinner color="border-mygreen" />
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-env-gray-darker p-4">
        <p className="text-2xl text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  // Prepare data for time-series visualization
  const prepareTimeSeriesData = (data, type) => {
    if (!data || !data.historicalData || !Array.isArray(data.historicalData)) return [];

    return data.historicalData.map(item => {
      if (type === 'floodRisk') {
        return {
          date: item.date,
          riskLevel: getRiskLevelValue(item.floodRiskLevel),
          riskLevelLabel: item.floodRiskLevel,
          confidence: item.confidenceScore
        };
      } else {
        return {
          date: item.date,
          visitorLoad: getLoadLevelValue(item.expectedVisitorLoad),
          visitorLoadLabel: item.expectedVisitorLoad,
          confidence: item.confidenceScore
        };
      }
    });
  };

  // Helper function to convert risk level to numeric value
  const getRiskLevelValue = (level) => {
    switch (level) {
      case 'Very High': return 4;
      case 'High': return 3;
      case 'Moderate': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  };

  // Helper function to convert visitor load to numeric value
  const getLoadLevelValue = (load) => {
    switch (load) {
      case 'Very High': return 4;
      case 'High': return 3;
      case 'Moderate': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  };

  // Prepare data for time-series charts
  const floodRiskTimeSeriesData = prepareTimeSeriesData(historicalData.floodRisk, 'floodRisk');
  const ecoTourismTimeSeriesData = prepareTimeSeriesData(historicalData.ecoTourism, 'ecoTourism');

  return (
    <div className="bg-gray-100 dark:bg-env-gray-darker p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
          Advanced Analytics Dashboard
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Comprehensive data analysis and visualization for environmental insights
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'floodRisk'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('floodRisk')}
          >
            Flood Risk Analysis
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'ecoTourism'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('ecoTourism')}
          >
            Eco-Tourism Analysis
          </button>
        </div>
      </div>

      {/* Flood Risk Analysis Tab */}
      {activeTab === 'floodRisk' && (
        <div>
          <div className="mb-6">
            <label htmlFor="region-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Region:
            </label>
            <select
              id="region-select"
              value={selectedRegion}
              onChange={handleRegionChange}
              className="block w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Portsmouth">Portsmouth</option>
              <option value="RoseauSouth">Roseau South</option>
              <option value="LayouValley">Layou Valley</option>
              <option value="MarigotArea">Marigot Area</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Time-Series Chart */}
            <div className="bg-white dark:bg-env-gray-dark p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Flood Risk Time-Series Analysis
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={floodRiskTimeSeriesData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#E5E7EB' }}
                    formatter={(value, name) => {
                      if (name === 'riskLevel') {
                        const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
                        return [labels[value], 'Risk Level'];
                      }
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="riskLevel"
                    stroke="#EF4444"
                    activeDot={{ r: 8 }}
                    name="Risk Level"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="confidence"
                    stroke="#8884d8"
                    name="Confidence Score"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Area Chart for Risk Distribution */}
            <div className="bg-white dark:bg-env-gray-dark p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Risk Level Distribution Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={floodRiskTimeSeriesData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#E5E7EB' }}
                    formatter={(value, name) => {
                      if (name === 'riskLevel') {
                        const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
                        return [labels[value], 'Risk Level'];
                      }
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="riskLevel"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.3}
                    name="Risk Level"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend Information */}
          {historicalData.floodRisk && historicalData.floodRisk.trendInfo && 
           historicalData.floodRisk.trendInfo.direction && 
           historicalData.floodRisk.trendInfo.magnitude !== undefined && 
           historicalData.floodRisk.trendInfo.description && (
            <div className="bg-white dark:bg-env-gray-dark p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Trend Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Trend Direction</h4>
                  <p className={`text-2xl font-bold ${
                    historicalData.floodRisk.trendInfo.direction === 'improving'
                      ? 'text-green-600 dark:text-green-400'
                      : historicalData.floodRisk.trendInfo.direction === 'stable'
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {historicalData.floodRisk.trendInfo.direction.charAt(0).toUpperCase() + 
                     historicalData.floodRisk.trendInfo.direction.slice(1)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Trend Magnitude</h4>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {historicalData.floodRisk.trendInfo.magnitude.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {historicalData.floodRisk.trendInfo.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Eco-Tourism Analysis Tab */}
      {activeTab === 'ecoTourism' && (
        <div>
          <div className="mb-6">
            <label htmlFor="site-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Tourism Site:
            </label>
            <select
              id="site-select"
              value={selectedSite}
              onChange={handleSiteChange}
              className="block w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="boiling-lake">Boiling Lake Trail</option>
              <option value="trafalgar-falls">Trafalgar Falls</option>
              <option value="middleham-falls">Middleham Falls</option>
              <option value="emerald-pool">Emerald Pool</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Time-Series Chart */}
            <div className="bg-white dark:bg-env-gray-dark p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Visitor Load Time-Series Analysis
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ecoTourismTimeSeriesData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#E5E7EB' }}
                    formatter={(value, name) => {
                      if (name === 'visitorLoad') {
                        const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
                        return [labels[value], 'Visitor Load'];
                      }
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visitorLoad"
                    stroke="#3B82F6"
                    activeDot={{ r: 8 }}
                    name="Visitor Load"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="confidence"
                    stroke="#8884d8"
                    name="Confidence Score"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart for Visitor Load Distribution */}
            <div className="bg-white dark:bg-env-gray-dark p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Visitor Load Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ecoTourismTimeSeriesData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#E5E7EB' }}
                    formatter={(value, name) => {
                      if (name === 'visitorLoad') {
                        const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
                        return [labels[value], 'Visitor Load'];
                      }
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="visitorLoad" fill="#3B82F6" name="Visitor Load" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend Information */}
          {historicalData.ecoTourism && historicalData.ecoTourism.trendInfo && 
           historicalData.ecoTourism.trendInfo.direction && 
           historicalData.ecoTourism.trendInfo.magnitude !== undefined && 
           historicalData.ecoTourism.trendInfo.description && (
            <div className="bg-white dark:bg-env-gray-dark p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Trend Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Trend Direction</h4>
                  <p className={`text-2xl font-bold ${
                    historicalData.ecoTourism.trendInfo.direction === 'decreasing'
                      ? 'text-green-600 dark:text-green-400'
                      : historicalData.ecoTourism.trendInfo.direction === 'stable'
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {historicalData.ecoTourism.trendInfo.direction.charAt(0).toUpperCase() + 
                     historicalData.ecoTourism.trendInfo.direction.slice(1)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Trend Magnitude</h4>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {historicalData.ecoTourism.trendInfo.magnitude.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {historicalData.ecoTourism.trendInfo.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Current Prediction */}
          {historicalData.ecoTourism && historicalData.ecoTourism.currentPrediction && 
           historicalData.ecoTourism.currentPrediction.siteName && 
           historicalData.ecoTourism.currentPrediction.predictionDate && 
           historicalData.ecoTourism.currentPrediction.expectedVisitorLoad && (
            <div className="bg-white dark:bg-env-gray-dark p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Current Prediction
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Site Information</h4>
                  <p className="mb-1"><span className="font-medium">Site Name:</span> {historicalData.ecoTourism.currentPrediction.siteName}</p>
                  <p className="mb-1"><span className="font-medium">Prediction Date:</span> {new Date(historicalData.ecoTourism.currentPrediction.predictionDate).toLocaleDateString()}</p>
                  <p className="mb-1">
                    <span className="font-medium">Expected Visitor Load:</span> 
                    <span className={`ml-2 font-bold ${
                      historicalData.ecoTourism.currentPrediction.expectedVisitorLoad === 'High' || 
                      historicalData.ecoTourism.currentPrediction.expectedVisitorLoad === 'Very High'
                        ? 'text-red-600 dark:text-red-400'
                        : historicalData.ecoTourism.currentPrediction.expectedVisitorLoad === 'Moderate'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {historicalData.ecoTourism.currentPrediction.expectedVisitorLoad}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendation</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {historicalData.ecoTourism.currentPrediction.recommendation || 'No recommendation available'}
                  </p>
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">Contributing Factors</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    {historicalData.ecoTourism.currentPrediction.contributingFactors && 
                     Array.isArray(historicalData.ecoTourism.currentPrediction.contributingFactors) ? 
                      historicalData.ecoTourism.currentPrediction.contributingFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      )) : 
                      <li>No contributing factors available</li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboardPage;
