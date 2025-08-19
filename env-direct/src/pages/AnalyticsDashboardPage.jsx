import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  PieChart, 
  LineChart,
  Activity,
  TrendingUp,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

const AnalyticsDashboardPage = () => {
  const analyticsData = [
    {
      title: "Total Data Points",
      value: "2.4M",
      change: "+12.3%",
      icon: <Activity className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Active Monitoring Sites",
      value: "47",
      change: "+3 sites",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: "Analysis Reports",
      value: "156",
      change: "+28 this month",
      icon: <PieChart className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Trend Accuracy",
      value: "94.7%",
      change: "+2.1%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-orange-500"
    }
  ];

  const analyticsCategories = [
    {
      title: "Climate Analysis",
      description: "Temperature, humidity, and weather pattern analytics",
      reports: 42,
      lastUpdate: "2 hours ago",
      trend: "rising"
    },
    {
      title: "Water Quality",
      description: "pH levels, pollution indicators, and water safety metrics",
      reports: 38,
      lastUpdate: "4 hours ago",
      trend: "stable"
    },
    {
      title: "Air Quality",
      description: "Pollution levels, air composition, and breathing safety index",
      reports: 31,
      lastUpdate: "1 hour ago",
      trend: "improving"
    },
    {
      title: "Biodiversity",
      description: "Species tracking, habitat analysis, and ecosystem health",
      reports: 25,
      lastUpdate: "6 hours ago",
      trend: "stable"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Advanced environmental data analysis and insights for Dominica
          </p>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  Live
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Environmental Trends Analysis</h2>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md hover:bg-gray-200">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter
                  </button>
                  <button className="flex items-center px-3 py-1 bg-envGreen-600 text-white text-sm rounded-md hover:bg-envGreen-700">
                    <Calendar className="w-4 h-4 mr-1" />
                    Range
                  </button>
                </div>
              </div>
              
              {/* Placeholder for analytics chart */}
              <div className="h-80 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="w-16 h-16 text-envGreen-600 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">Advanced Analytics Engine</p>
                  <p className="text-sm text-gray-500 mb-4">Multi-dimensional analysis of environmental data patterns</p>
                  <div className="grid grid-cols-3 gap-4 max-w-md">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                        <BarChart3 className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-xs text-gray-600">Correlation Analysis</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                        <PieChart className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray-600">Statistical Modeling</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-600">Predictive Insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Analysis Categories</h2>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {analyticsCategories.map((category, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{category.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        category.trend === 'rising' ? 'bg-orange-100 text-orange-600' :
                        category.trend === 'improving' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {category.trend}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{category.reports} reports</span>
                      <span>{category.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 px-4 py-2 bg-envGreen-600 text-white text-sm font-medium rounded-lg hover:bg-envGreen-700 transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Export Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Quick Analytics Actions */}
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <Link
            to="/dashboard"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <Activity className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Dashboard</h3>
            <p className="text-gray-600 text-sm">Real-time environmental monitoring</p>
          </Link>

          <Link
            to="/predictions"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <TrendingUp className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Predictions</h3>
            <p className="text-gray-600 text-sm">AI-powered forecasting models</p>
          </Link>

          <Link
            to="/reports"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <BarChart3 className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports</h3>
            <p className="text-gray-600 text-sm">Detailed analysis reports</p>
          </Link>

          <Link
            to="/live-map"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <PieChart className="w-8 h-8 text-envGreen-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Visualization</h3>
            <p className="text-gray-600 text-sm">Interactive data visualization</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboardPage;
