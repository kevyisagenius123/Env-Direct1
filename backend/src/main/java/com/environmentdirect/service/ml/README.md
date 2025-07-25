# Machine Learning Services Documentation

## Overview
This package contains the machine learning services used by the Environment Direct application. These services provide advanced ML capabilities for environmental data analysis, prediction, and scenario modeling.

## Services

### ModelService
The `ModelService` class provides methods for training, loading, and using ML models for predictions.

#### Key Methods:
- `predictFloodRisk(rainfall, temperature, elevation, soilSaturation, historicalRisk)`: Predicts flood risk level for a specific region.
- `predictVisitorLoad(siteId, seasonFactor, isWeekend)`: Predicts visitor load for a specific eco-tourism site.
- `getPredictionConfidence(modelType, id)`: Gets the confidence score for a prediction.

### AnomalyDetectionService
The `AnomalyDetectionService` class provides methods for detecting anomalies in environmental data.

#### Key Methods:
- `detectAnomaliesZScore(timeSeries)`: Detects anomalies using Z-score method.
- `detectAnomaliesIQR(timeSeries)`: Detects anomalies using IQR method.
- `detectMultivariateAnomalies(multiTimeSeries, distanceThreshold)`: Detects anomalies in multivariate time series.
- `analyzeFloodRiskAnomalies(region, historicalData)`: Analyzes flood risk data for anomalies.
- `analyzeEcoTourismAnomalies(siteId, historicalData)`: Analyzes eco-tourism data for anomalies.

### ScenarioModelingService
The `ScenarioModelingService` class provides methods for "what-if" scenario analysis and parameter exploration.

#### Key Methods:
- `generateFloodRiskScenario(region, rainfallAdjustment, temperatureAdjustment, soilSaturationAdjustment)`: Generates a flood risk scenario by adjusting parameters.
- `generateEcoTourismScenario(siteId, seasonalAdjustment, isWeekend, marketingFactor)`: Generates an eco-tourism scenario by adjusting parameters.
- `generateClimateChangeScenario(region, yearsFuture, emissionsScenario)`: Generates a climate change impact scenario.
- `compareScenarios(region, scenarios)`: Compares multiple scenarios for a region.

## Usage Examples

### Predicting Flood Risk
```java
// Get flood risk prediction for a region
Map<String, Object> prediction = machineLearningService.predictFloodRisk("Portsmouth", LocalDate.now());
String riskLevel = (String) prediction.get("floodRiskLevel");
```

### Generating Climate Change Scenarios
```java
// Generate a climate change scenario for 50 years in the future with high emissions
Map<String, Object> scenario = machineLearningService.generateClimateChangeScenario("RoseauSouth", 50, "high");
```

### Detecting Anomalies
```java
// Analyze flood risk data for anomalies
List<Map<String, Object>> historicalData = getHistoricalFloodData("LayouValley");
Map<String, Object> anomalyAnalysis = machineLearningService.analyzeFloodRiskAnomalies("LayouValley", historicalData);
```

## Recent Changes
- Fixed compilation error with `adjustedSeasonFactor` in `ScenarioModelingService` by properly casting the season factor to a double.
- Updated `MachineLearningService` to use the new ML components for more accurate predictions.
- Added methods for anomaly detection and scenario modeling to `MachineLearningService`.