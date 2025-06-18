# Prediction API Documentation

## Overview
This document provides information about the Prediction API endpoints for the Environment Direct application. These endpoints provide predictive environmental insights for Dominica, including eco-tourism hotspot pressure and flood risk forecasting.

## Endpoints

### 1. Eco-Tourism Hotspot Pressure Forecast API

#### Endpoint URL
```
GET /api/predict/eco-tourism/pressure
```

#### Request Parameters
- `siteId` (String, required): An identifier for the tourism site (e.g., `boiling-lake`, `trafalgar-falls`, `middleham-falls`, `emerald-pool`).

#### Response Format
The endpoint returns a JSON object with the following structure:

```json
{
  "siteId": "boiling-lake",
  "siteName": "Boiling Lake Trail",
  "predictionDate": "2023-10-28T12:00:00Z",
  "expectedVisitorLoad": "High",
  "confidenceScore": 0.85,
  "contributingFactors": ["Weekend", "Cruise ship in port"],
  "recommendation": "Visit before 10 AM or after 3 PM for a less crowded experience."
}
```

#### Field Descriptions
- `siteId`: The identifier for the tourism site
- `siteName`: Human-readable name of the site
- `predictionDate`: ISO 8601 timestamp of when the forecast is valid or generated
- `expectedVisitorLoad`: Enum-like value: "Low", "Moderate", "High"
- `confidenceScore`: A value between 0.0 and 1.0 indicating the confidence level of the prediction
- `contributingFactors`: Array of strings indicating factors that contribute to the prediction
- `recommendation`: String with a recommendation for visitors

#### Example Request
```
GET /api/predict/eco-tourism/pressure?siteId=boiling-lake
```

### 2. All Eco-Tourism Hotspot Pressure Forecasts API

#### Endpoint URL
```
GET /api/predict/eco-tourism/pressure/all
```

#### Response Format
The endpoint returns an array of eco-tourism hotspot pressure forecast objects, each with the same structure as the single site response.

#### Example Request
```
GET /api/predict/eco-tourism/pressure/all
```

### 3. Flood Risk Forecasting API

#### Endpoint URL
```
GET /api/predict/flood-risk
```

#### Request Parameters
- `region` (String, required): An identifier for the region (e.g., `Portsmouth`, `RoseauSouth`, `LayouValley`, `MarigotArea`).

#### Response Format
The endpoint returns a JSON object with the following structure:

```json
{
  "regionName": "Portsmouth",
  "predictionDate": "2023-10-28T12:00:00Z",
  "floodRiskLevel": "Moderate",
  "confidenceScore": 0.78,
  "details": "River levels are elevated. Minor localized flooding possible in coastal areas if heavy showers persist.",
  "affectedAreas": ["Lower Reach Area", "Near Purple Turtle Beach"]
}
```

#### Field Descriptions
- `regionName`: Human-readable name of the region
- `predictionDate`: ISO 8601 timestamp of when the forecast is valid or generated
- `floodRiskLevel`: Enum-like value: "Low", "Moderate", "High"
- `confidenceScore`: A value between 0.0 and 1.0 indicating the confidence level of the prediction
- `details`: String with more context about the flood risk
- `affectedAreas`: Array of strings indicating areas that may be affected by flooding

#### Example Request
```
GET /api/predict/flood-risk?region=Portsmouth
```

### 4. All Flood Risk Forecasts API

#### Endpoint URL
```
GET /api/predict/flood-risk/all
```

#### Response Format
The endpoint returns an array of flood risk forecast objects, each with the same structure as the single region response.

#### Example Request
```
GET /api/predict/flood-risk/all
```

## Error Handling

If a required parameter is missing, the API will return a 400 Bad Request response with an error message:

```json
{
  "error": "Missing required parameter: siteId",
  "message": "Please provide a valid siteId parameter (e.g., boiling-lake, trafalgar-falls, middleham-falls)"
}
```

## Integration with Frontend

To integrate these APIs with the frontend React application:

1. Use the `fetch` API or a library like Axios to make requests to the endpoints.
2. Handle loading states and errors appropriately.
3. Display the data in the UI.

Example:

```javascript
// Fetch eco-tourism hotspot pressure forecast
fetch('/api/predict/eco-tourism/pressure?siteId=boiling-lake')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Eco-tourism hotspot pressure forecast:', data);
    // Update UI with the data
  })
  .catch(error => {
    console.error('Error fetching eco-tourism hotspot pressure forecast:', error);
    // Handle error in UI
  });
```