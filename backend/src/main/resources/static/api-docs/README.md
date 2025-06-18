# Environment Direct API Documentation

## Overview
This directory contains documentation for the Environment Direct backend API endpoints. These endpoints provide data for the frontend React application.

## Available Endpoints

### Dashboard API
- **[Dashboard API Documentation](dashboard-api.md)**: Provides environmental dashboard data for Dominica, including summary metrics and time-series data for charts.
  - Endpoint: `GET /api/dashboard/dominica`

### Prediction API
- **[Prediction API Documentation](prediction-api.md)**: Provides predictive environmental insights for Dominica, including eco-tourism hotspot pressure and flood risk forecasting.
  - Endpoints:
    - `GET /api/predict/eco-tourism/pressure`: Get eco-tourism hotspot pressure forecast for a specific site.
    - `GET /api/predict/eco-tourism/pressure/all`: Get all eco-tourism hotspot pressure forecasts.
    - `GET /api/predict/flood-risk`: Get flood risk forecast for a specific region.
    - `GET /api/predict/flood-risk/all`: Get all flood risk forecasts.

### Other Endpoints
- **Live Data API**: Provides current environmental metrics data.
  - Endpoint: `GET /api/live-data`
- **Rankings API**: Provides regional environmental rankings data.
  - Endpoint: `GET /api/rankings`
- **Predictions API**: Provides environmental predictions and forecasts.
  - Endpoint: `GET /api/predictions`
- **Banner API**: Provides campaign banner data.
  - Endpoint: `GET /api/banner`

## Testing the API

To test the API endpoints:

1. Ensure the Spring Boot application is running.
2. Use a tool like Postman or a web browser to access the endpoints.
3. For example, to test the Dashboard API, navigate to:
   ```
   http://localhost:8080/api/dashboard/dominica
   ```
4. Verify that the response matches the expected JSON structure as documented.

## Frontend Integration

The frontend React application should be configured to fetch data from these endpoints. See the individual API documentation files for specific integration instructions.
