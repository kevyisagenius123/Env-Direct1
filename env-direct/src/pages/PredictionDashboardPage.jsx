import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity,
  Globe,
  Calendar,
  Users,
  Download
} from 'lucide-react';

const PredictionDashboardPage = () => {
  const predictions = [
    {
      title: "Climate Forecast",
      subtitle: "Next 30 days",
      value: "26.5°C",
      change: "+2.1°C",
      confidence: "94%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Rainfall Prediction",
      subtitle: "Weekly forecast",
      value: "152mm",
      change: "+15%",
      confidence: "87%",
      icon: <Activity className="w-6 h-6" />,
      color: "bg-cyan-500"
    },
    {
      title: "Air Quality Index",
      subtitle: "Tomorrow",
      value: "Good",
      change: "Stable",
      confidence: "91%",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: "Hurricane Risk",
      subtitle: "Seasonal outlook",
      value: "Low",
      change: "-12%",
      confidence: "85%",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-orange-500"
    }
  ];

  const modelPerformance = [
    { model: "Climate ML Model", accuracy: "94.2%", lastUpdate: "2 hours ago" },
    { model: "Weather Prediction", accuracy: "91.8%", lastUpdate: "1 hour ago" },
    { model: "Air Quality Forecast", accuracy: "89.3%", lastUpdate: "3 hours ago" },
    { model: "Disaster Risk Assessment", accuracy: "96.1%", lastUpdate: "30 minutes ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Prediction Dashboard
          </h1>
          <p className="text-gray-600">
            AI-powered environmental predictions and forecasting for Dominica
          </p>
        </div>

        {/* Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${prediction.color} text-white`}>
                  {prediction.icon}
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  {prediction.confidence}
                </span>
              </div>
              <h3 className="text-gray-900 font-semibold mb-1">{prediction.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{prediction.subtitle}</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">{prediction.value}</span>
                <span className={`text-sm ml-2 ${
                  prediction.change.includes('+') ? 'text-orange-600' : 
                  prediction.change.includes('-') ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {prediction.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Prediction Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">7-Day Environmental Forecast</h2>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                    <option>Temperature</option>
                    <option>Rainfall</option>
                    <option>Air Quality</option>
                    <option>Wind Speed</option>
                  </select>
                </div>
              </div>
              
              {/* Placeholder for prediction chart */}
              <div className="h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-envGreen-600 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">AI Prediction Models</p>
                  <p className="text-sm text-gray-500 mb-4">Advanced machine learning algorithms analyze environmental patterns</p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray-600">Historical Data</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                        <Activity className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-600">Real-time Analysis</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                        <PieChart className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-xs text-gray-600">Future Predictions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Performance */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Model Performance</h2>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {modelPerformance.map((model, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{model.model}</h3>
                      <span className="text-sm font-semibold text-green-600">{model.accuracy}</span>
                    </div>
                    <p className="text-xs text-gray-500">{model.lastUpdate}</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-envGreen-600 h-2 rounded-full" 
                          style={{ width: model.accuracy }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 px-4 py-2 bg-envGreen-600 text-white text-sm font-medium rounded-lg hover:bg-envGreen-700 transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Export Predictions
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link
            to="/dashboard"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <BarChart3 className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Environmental Dashboard</h3>
            <p className="text-gray-600 text-sm">View current environmental conditions and real-time data</p>
          </Link>

          <Link
            to="/analytics"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <PieChart className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 text-sm">Deep dive into environmental trends and patterns</p>
          </Link>

          <Link
            to="/live-map"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <Globe className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Map</h3>
            <p className="text-gray-600 text-sm">Interactive map with prediction overlays and forecasts</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PredictionDashboardPage;
