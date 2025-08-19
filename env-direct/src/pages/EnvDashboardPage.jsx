import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Globe, 
  Thermometer, 
  Droplets,
  Wind,
  Leaf,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const EnvDashboardPage = () => {
  const dashboardStats = [
    {
      title: "Air Quality Index",
      value: "42",
      unit: "AQI",
      trend: "+2%",
      icon: <Wind className="w-6 h-6" />,
      color: "bg-green-500",
      status: "Good"
    },
    {
      title: "Temperature",
      value: "26.8",
      unit: "°C",
      trend: "+0.5°C",
      icon: <Thermometer className="w-6 h-6" />,
      color: "bg-orange-500",
      status: "Normal"
    },
    {
      title: "Water Quality",
      value: "8.2",
      unit: "pH",
      trend: "Stable",
      icon: <Droplets className="w-6 h-6" />,
      color: "bg-blue-500",
      status: "Excellent"
    },
    {
      title: "Forest Coverage",
      value: "65.4",
      unit: "%",
      trend: "+0.3%",
      icon: <Leaf className="w-6 h-6" />,
      color: "bg-green-600",
      status: "Protected"
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "Heavy rainfall expected in Northern regions",
      time: "2 hours ago",
      priority: "medium"
    },
    {
      id: 2,
      type: "info",
      message: "Monthly environmental report available",
      time: "1 day ago",
      priority: "low"
    },
    {
      id: 3,
      type: "alert",
      message: "Sea level monitoring alert in coastal areas",
      time: "3 hours ago",
      priority: "high"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Environmental Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time environmental monitoring and analytics for Dominica
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.status === 'Good' || stat.status === 'Excellent' || stat.status === 'Protected' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {stat.status}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-gray-500 ml-1">{stat.unit}</span>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Environmental Trends</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-envGreen-600 text-white text-sm rounded-md">
                    7D
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md">
                    30D
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md">
                    90D
                  </button>
                </div>
              </div>
              
              {/* Placeholder for chart */}
              <div className="h-64 bg-gradient-to-br from-envGreen-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-envGreen-600 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive charts will be displayed here</p>
                  <p className="text-sm text-gray-500">Connect to data sources to view real-time trends</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Alerts</h2>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.priority === 'high' ? 'border-red-500 bg-red-50' :
                    alert.priority === 'medium' ? 'border-orange-500 bg-orange-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 px-4 py-2 bg-envGreen-600 text-white text-sm font-medium rounded-lg hover:bg-envGreen-700 transition-colors">
                View All Alerts
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link
            to="/live-map"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <Globe className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
            <p className="text-gray-600 text-sm">Explore real-time environmental data on our interactive map</p>
          </Link>

          <Link
            to="/reports"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <BarChart3 className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Report</h3>
            <p className="text-gray-600 text-sm">Create detailed environmental reports and analysis</p>
          </Link>

          <Link
            to="/training"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <Leaf className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Training Programs</h3>
            <p className="text-gray-600 text-sm">Access environmental training and certification programs</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnvDashboardPage;
