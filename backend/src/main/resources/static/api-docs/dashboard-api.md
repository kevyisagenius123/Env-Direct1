# Dashboard API Documentation

## Environmental Dashboard Endpoint

### Endpoint URL
```
GET /api/dashboard/dominica
```

### Description
This endpoint provides environmental dashboard data for Dominica, including summary metrics and time-series data for charts.

### Response Format
The endpoint returns a JSON object with the following structure:

```json
{
  "region": "Dominica",
  "lastUpdated": "2023-10-27T10:30:00Z",
  "summaryCards": [
    { 
      "id": "aqi", 
      "title": "Air Quality Index (AQI)", 
      "value": "45", 
      "unit": "Good", 
      "trend": "improving", 
      "details": "Roseau Area" 
    },
    { 
      "id": "waterPurity", 
      "title": "Water Purity (TDS)", 
      "value": "120", 
      "unit": "ppm", 
      "trend": "stable", 
      "details": "Layou River" 
    },
    { 
      "id": "recyclingRate", 
      "title": "Recycling Rate", 
      "value": "65", 
      "unit": "%", 
      "trend": "improving", 
      "details": "Annual Target: 75%" 
    },
    { 
      "id": "carbonFootprint", 
      "title": "Carbon Footprint", 
      "value": "5.2", 
      "unit": "tCO2e/cap", 
      "trend": "reducing", 
      "details": "Compared to 5.3 last year" 
    }
  ],
  "charts": {
    "airQualityOverTime": {
      "title": "Air Quality Over Time (UV Index)",
      "data": [
        { "name": "Mon", "uv": 400, "pv": 240, "amt": 240 },
        { "name": "Tue", "uv": 300, "pv": 139, "amt": 221 },
        { "name": "Wed", "uv": 200, "pv": 980, "amt": 229 },
        { "name": "Thu", "uv": 278, "pv": 390, "amt": 200 },
        { "name": "Fri", "uv": 189, "pv": 480, "amt": 218 },
        { "name": "Sat", "uv": 239, "pv": 380, "amt": 250 },
        { "name": "Sun", "uv": 349, "pv": 430, "amt": 210 }
      ]
    },
    "waterQualityTrends": {
      "title": "Water Quality Trends",
      "data": []
    }
  }
}
```

### Field Descriptions

#### Metadata
- `region`: The geographic region for which data is provided (e.g., "Dominica")
- `lastUpdated`: ISO 8601 timestamp indicating when the data was last updated (e.g., "2023-10-27T10:30:00Z")

#### Summary Cards
Each summary card object contains:
- `id`: Unique identifier for the metric
- `title`: Display name for the metric
- `value`: Current value of the metric
- `unit`: Unit of measurement (if applicable)
- `trend`: Current trend of the metric (e.g., "improving", "stable", "reducing", "worsening")
- `details`: Additional context or information about the metric

#### Charts
Each chart object contains:
- `title`: Display name for the chart
- `data`: Array of data points for the chart
  - For `airQualityOverTime`, each data point has:
    - `name`: Label for the data point (e.g., day of week)
    - `uv`: UV index value
    - `pv`: Additional metric (not currently used)
    - `amt`: Additional metric (not currently used)
  - For `waterQualityTrends`, the `data` array is currently empty and will be populated in future updates

### Integration with EnvDashboardPage.jsx

To integrate this API with the EnvDashboardPage.jsx component:

1. Replace the mock data in the component with data fetched from the API:

```jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnvDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [airQualityData, setAirQualityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard/dominica');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDashboardData(data.summaryCards);
        setAirQualityData(data.charts.airQualityOverTime.data);
        setIsLoading(false);
      } catch (e) {
        console.error("Failed to fetch dashboard data:", e);
        setError("Failed to load dashboard data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <p className="text-xl text-gray-600">Loading dashboard data...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <p className="text-xl text-red-600">{error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Live Environmental Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">Real-time insights into key environmental indicators.</p>
      </header>

      {/* Data Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-sm font-medium text-gray-500 truncate">{item.title}</h2>
            <p className="mt-1 text-4xl font-semibold text-gray-900">{item.value} <span className="text-xl font-medium text-gray-600">{item.unit}</span></p>
            <p className={`mt-2 text-sm font-medium ${item.trend === 'improving' ? 'text-green-600' : item.trend === 'reducing' ? 'text-green-600' : 'text-yellow-600'}`}>
              Trend: {item.trend}
            </p>
            <p className="mt-1 text-xs text-gray-500">{item.details}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Air Quality Over Time (UV Index)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={airQualityData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Water Quality Trends chart would go here when data is available */}
      </div>
    </div>
  );
};

export default EnvDashboardPage;
```

2. Ensure the frontend is configured to make requests to the correct backend URL.

3. Handle loading states and errors appropriately.
