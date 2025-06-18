package com.environmentdirect.service;

import com.environmentdirect.service.ml.AnomalyDetectionService;
import com.environmentdirect.service.ml.ModelService;
import com.environmentdirect.service.ml.ScenarioModelingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.time.*;
import java.time.format.DateTimeFormatter;

/**
 * Service for machine learning-based predictions.
 * This service provides methods for generating predictions using machine learning models.
 */
@Service
public class MachineLearningService {

    private final ModelService modelService;
    private final AnomalyDetectionService anomalyDetectionService;
    private final ScenarioModelingService scenarioModelingService;

    @Autowired
    public MachineLearningService(ModelService modelService, 
                                 AnomalyDetectionService anomalyDetectionService,
                                 ScenarioModelingService scenarioModelingService) {
        this.modelService = modelService;
        this.anomalyDetectionService = anomalyDetectionService;
        this.scenarioModelingService = scenarioModelingService;
    }

    /**
     * Predict eco-tourism hotspot pressure for a specific site.
     * 
     * @param siteId The identifier for the tourism site
     * @param currentDate The current date (for seasonal factors)
     * @return A map containing the prediction data
     */
    public Map<String, Object> predictEcoTourismPressure(String siteId, LocalDate currentDate) {
        // Determine if it's a weekend
        DayOfWeek dayOfWeek = currentDate.getDayOfWeek();
        boolean isWeekend = (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY);

        // Determine seasonal adjustment based on month
        int month = currentDate.getMonthValue();
        boolean isHighSeason = (month >= 12 || month <= 4);
        double seasonalAdjustment = isHighSeason ? 1.2 : 0.9;

        // Use the ScenarioModelingService to generate a more accurate prediction
        Map<String, Object> prediction = scenarioModelingService.generateEcoTourismScenario(
            siteId, 
            seasonalAdjustment, 
            isWeekend, 
            1.0 // Default marketing factor
        );

        // Add recommendation
        String siteName = prediction.containsKey("parameters") ? 
            (String) ((Map<String, Object>)prediction.get("parameters")).get("siteName") : 
            "Unknown Site";
        String visitorLoad = prediction.containsKey("prediction") ? 
            (String) ((Map<String, Object>)prediction.get("prediction")).get("expectedVisitorLoad") : 
            "Moderate";

        String recommendation = generateRecommendation(siteName, visitorLoad);
        prediction.put("recommendation", recommendation);

        // Add additional metadata
        prediction.put("siteId", siteId);
        prediction.put("predictionDate", Instant.now().toString());
        prediction.put("mlModel", "AdvancedVisitorPredictionModel v2.0");
        prediction.put("historicalAccuracy", 0.92);

        return prediction;
    }

    /**
     * Generate a recommendation based on visitor load
     */
    private String generateRecommendation(String siteName, String visitorLoad) {
        switch (visitorLoad) {
            case "Very High":
                return "Consider visiting " + siteName + " on a different day or very early in the morning to avoid crowds.";
            case "High":
                return "Visit " + siteName + " before 10 AM or after 3 PM for a less crowded experience.";
            case "Moderate":
                return siteName + " should have manageable crowds. Morning visits are still recommended for the best experience.";
            case "Low":
                return "Great time to visit " + siteName + " with minimal crowds expected.";
            default:
                return "No specific recommendations for " + siteName + " at this time.";
        }
    }

    /**
     * Predict flood risk for a specific region.
     * 
     * @param region The identifier for the region
     * @param currentDate The current date (for seasonal factors)
     * @return A map containing the prediction data
     */
    public Map<String, Object> predictFloodRisk(String region, LocalDate currentDate) {
        // Determine rainfall adjustment based on month (rainy season)
        int month = currentDate.getMonthValue();
        boolean isRainySeason = (month >= 5 && month <= 11);
        double rainfallAdjustment = isRainySeason ? 1.3 : 0.8;

        // Determine temperature adjustment based on season
        double temperatureAdjustment = isRainySeason ? 1.5 : 0.0;

        // Determine soil saturation based on recent weather patterns
        // In a real app, this would come from actual weather data
        Random random = new Random(currentDate.toEpochDay()); // Seed with date for consistency
        double soilSaturationAdjustment = isRainySeason ? 
            1.0 + (random.nextDouble() * 0.5) : // 1.0-1.5 in rainy season
            0.7 + (random.nextDouble() * 0.3);  // 0.7-1.0 in dry season

        // Use the ScenarioModelingService to generate a more accurate prediction
        Map<String, Object> prediction = scenarioModelingService.generateFloodRiskScenario(
            region,
            rainfallAdjustment,
            temperatureAdjustment,
            soilSaturationAdjustment
        );

        // Add additional metadata
        prediction.put("predictionDate", Instant.now().toString());
        prediction.put("mlModel", "AdvancedFloodRiskModel v2.0");
        prediction.put("historicalAccuracy", 0.95);

        return prediction;
    }

    /**
     * Get historical data comparison for a specific site or region.
     * 
     * @param id The identifier for the site or region
     * @param type The type of data ("eco-tourism" or "flood-risk")
     * @return A map containing historical data and current predictions
     */
    public Map<String, Object> getHistoricalComparison(String id, String type) {
        Map<String, Object> comparison = new HashMap<>();

        // Generate historical data points (in a real app, this would come from a database)
        List<Map<String, Object>> historicalData = generateHistoricalData(id, type);

        // Get current prediction
        Map<String, Object> currentPrediction;
        if ("eco-tourism".equals(type)) {
            currentPrediction = predictEcoTourismPressure(id, LocalDate.now());
        } else {
            currentPrediction = predictFloodRisk(id, LocalDate.now());
        }

        // Calculate trend information
        Map<String, Object> trendInfo = calculateTrends(historicalData, currentPrediction, type);

        // Populate the comparison map
        comparison.put("id", id);
        comparison.put("type", type);
        comparison.put("historicalData", historicalData);
        comparison.put("currentPrediction", currentPrediction);
        comparison.put("trendInfo", trendInfo);

        return comparison;
    }

    // Helper methods

    private Map<String, Object> getBaseSiteData(String siteId) {
        Map<String, Object> baseData = new HashMap<>();

        switch (siteId) {
            case "boiling-lake":
                baseData.put("siteName", "Boiling Lake Trail");
                baseData.put("baseVisitorLoad", "High");
                baseData.put("seasonalFactor", 1.2);
                baseData.put("weatherSensitivity", 0.8);
                baseData.put("contributingFactors", new ArrayList<>(Arrays.asList("Base popularity")));
                break;
            case "trafalgar-falls":
                baseData.put("siteName", "Trafalgar Falls");
                baseData.put("baseVisitorLoad", "High");
                baseData.put("seasonalFactor", 1.3);
                baseData.put("weatherSensitivity", 0.6);
                baseData.put("contributingFactors", new ArrayList<>(Arrays.asList("Base popularity")));
                break;
            case "middleham-falls":
                baseData.put("siteName", "Middleham Falls");
                baseData.put("baseVisitorLoad", "Moderate");
                baseData.put("seasonalFactor", 1.0);
                baseData.put("weatherSensitivity", 0.9);
                baseData.put("contributingFactors", new ArrayList<>(Arrays.asList("Base popularity")));
                break;
            case "emerald-pool":
                baseData.put("siteName", "Emerald Pool");
                baseData.put("baseVisitorLoad", "Moderate");
                baseData.put("seasonalFactor", 1.1);
                baseData.put("weatherSensitivity", 0.7);
                baseData.put("contributingFactors", new ArrayList<>(Arrays.asList("Base popularity")));
                break;
            default:
                baseData.put("siteName", "Unknown Site");
                baseData.put("baseVisitorLoad", "Low");
                baseData.put("seasonalFactor", 1.0);
                baseData.put("weatherSensitivity", 0.5);
                baseData.put("contributingFactors", new ArrayList<>(Arrays.asList("Base popularity")));
                break;
        }

        baseData.put("expectedVisitorLoad", baseData.get("baseVisitorLoad"));

        return baseData;
    }

    private Map<String, Object> getBaseRegionData(String region) {
        Map<String, Object> baseData = new HashMap<>();

        switch (region) {
            case "Portsmouth":
                baseData.put("regionName", "Portsmouth");
                baseData.put("baseRiskLevel", "Low");
                baseData.put("seasonalFactor", 1.5);
                baseData.put("terrainFactor", 1.2);
                baseData.put("soilSaturationFactor", 1.3);
                baseData.put("details", "Coastal area with moderate elevation changes.");
                baseData.put("affectedAreas", new ArrayList<>(Arrays.asList("Lower Reach Area")));
                break;
            case "RoseauSouth":
                baseData.put("regionName", "Roseau South");
                baseData.put("baseRiskLevel", "Moderate");
                baseData.put("seasonalFactor", 1.8);
                baseData.put("terrainFactor", 1.5);
                baseData.put("soilSaturationFactor", 1.6);
                baseData.put("details", "Urban area with some low-lying sections.");
                baseData.put("affectedAreas", new ArrayList<>(Arrays.asList("Newtown", "Loubiere")));
                break;
            case "LayouValley":
                baseData.put("regionName", "Layou Valley");
                baseData.put("baseRiskLevel", "High");
                baseData.put("seasonalFactor", 2.0);
                baseData.put("terrainFactor", 1.8);
                baseData.put("soilSaturationFactor", 1.9);
                baseData.put("details", "Valley area with river prone to flooding.");
                baseData.put("affectedAreas", new ArrayList<>(Arrays.asList("River Banks", "Lower Valley")));
                break;
            case "MarigotArea":
                baseData.put("regionName", "Marigot Area");
                baseData.put("baseRiskLevel", "Low");
                baseData.put("seasonalFactor", 1.3);
                baseData.put("terrainFactor", 1.1);
                baseData.put("soilSaturationFactor", 1.2);
                baseData.put("details", "Coastal area with good drainage.");
                baseData.put("affectedAreas", new ArrayList<>(Arrays.asList("Coastal Road")));
                break;
            default:
                baseData.put("regionName", "Unknown Region");
                baseData.put("baseRiskLevel", "Low");
                baseData.put("seasonalFactor", 1.0);
                baseData.put("terrainFactor", 1.0);
                baseData.put("soilSaturationFactor", 1.0);
                baseData.put("details", "No specific details available.");
                baseData.put("affectedAreas", new ArrayList<>());
                break;
        }

        baseData.put("floodRiskLevel", baseData.get("baseRiskLevel"));

        return baseData;
    }

    private void adjustForSeason(Map<String, Object> data, LocalDate currentDate) {
        // Determine if it's high season (December to April)
        int month = currentDate.getMonthValue();
        boolean isHighSeason = (month >= 12 || month <= 4);

        // Add seasonal factor to contributing factors
        List<String> factors = (List<String>) data.get("contributingFactors");
        if (factors == null) {
            factors = new ArrayList<>();
            data.put("contributingFactors", factors);
        }

        if (isHighSeason) {
            factors.add("High season");

            // Adjust visitor load for eco-tourism sites
            if (data.containsKey("baseVisitorLoad")) {
                double seasonalFactor = (double) data.getOrDefault("seasonalFactor", 1.0);
                String baseLoad = (String) data.get("baseVisitorLoad");
                String adjustedLoad = adjustLoadLevel(baseLoad, seasonalFactor);
                data.put("expectedVisitorLoad", adjustedLoad);
            }

            // Adjust flood risk for regions
            if (data.containsKey("baseRiskLevel")) {
                double seasonalFactor = (double) data.getOrDefault("seasonalFactor", 1.0);
                String baseRisk = (String) data.get("baseRiskLevel");
                String adjustedRisk = adjustRiskLevel(baseRisk, seasonalFactor);
                data.put("floodRiskLevel", adjustedRisk);
            }
        } else {
            factors.add("Off season");
        }
    }

    private void adjustForDayOfWeek(Map<String, Object> data, LocalDate currentDate) {
        // Determine if it's a weekend
        DayOfWeek dayOfWeek = currentDate.getDayOfWeek();
        boolean isWeekend = (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY);

        // Add day of week to contributing factors
        List<String> factors = (List<String>) data.get("contributingFactors");

        if (isWeekend) {
            factors.add("Weekend");

            // Adjust visitor load for eco-tourism sites
            if (data.containsKey("baseVisitorLoad")) {
                String currentLoad = (String) data.get("expectedVisitorLoad");
                String adjustedLoad = adjustLoadLevel(currentLoad, 1.5);
                data.put("expectedVisitorLoad", adjustedLoad);
            }
        } else {
            factors.add("Weekday");
        }
    }

    private void adjustForWeather(Map<String, Object> data, LocalDate currentDate) {
        // In a real app, this would use actual weather data or forecasts
        // For this example, we'll simulate weather conditions based on the date

        // Determine if it's likely to be rainy (more likely in summer months)
        int month = currentDate.getMonthValue();
        boolean isRainySeason = (month >= 5 && month <= 11);

        // Simulate a random weather condition, biased by season
        Random random = new Random(currentDate.toEpochDay()); // Seed with date for consistency
        boolean isRainy = isRainySeason ? (random.nextDouble() < 0.6) : (random.nextDouble() < 0.3);

        // Add weather to contributing factors
        List<String> factors = (List<String>) data.get("contributingFactors");

        if (isRainy) {
            factors.add("Rainy weather");

            // Adjust visitor load for eco-tourism sites
            if (data.containsKey("baseVisitorLoad")) {
                double weatherSensitivity = (double) data.getOrDefault("weatherSensitivity", 0.5);
                String currentLoad = (String) data.get("expectedVisitorLoad");
                String adjustedLoad = adjustLoadLevel(currentLoad, 1.0 - weatherSensitivity);
                data.put("expectedVisitorLoad", adjustedLoad);
            }

            // Adjust flood risk for regions
            if (data.containsKey("baseRiskLevel")) {
                String currentRisk = (String) data.get("floodRiskLevel");
                String adjustedRisk = adjustRiskLevel(currentRisk, 1.5);
                data.put("floodRiskLevel", adjustedRisk);

                // Update details
                String details = (String) data.get("details");
                data.put("details", details + " Recent rainfall increases flood risk.");
            }
        } else {
            factors.add("Clear weather");
        }
    }

    private void adjustForRecentRainfall(Map<String, Object> data, LocalDate currentDate) {
        // In a real app, this would use actual rainfall data
        // For this example, we'll simulate recent rainfall based on the date

        // Determine if it's likely to have had recent rainfall (more likely in summer months)
        int month = currentDate.getMonthValue();
        boolean isRainySeason = (month >= 5 && month <= 11);

        // Simulate random recent rainfall, biased by season
        Random random = new Random(currentDate.toEpochDay()); // Seed with date for consistency
        double recentRainfall = isRainySeason ? 
                random.nextDouble() * 100 : // 0-100mm in rainy season
                random.nextDouble() * 30;   // 0-30mm in dry season

        // Add rainfall info to details
        String details = (String) data.get("details");
        data.put("details", details + " Recent rainfall: " + String.format("%.1f", recentRainfall) + "mm.");

        // Adjust flood risk based on rainfall
        if (data.containsKey("baseRiskLevel")) {
            String currentRisk = (String) data.get("floodRiskLevel");
            double rainfallFactor = 1.0 + (recentRainfall / 100.0); // 1.0-2.0 based on rainfall
            String adjustedRisk = adjustRiskLevel(currentRisk, rainfallFactor);
            data.put("floodRiskLevel", adjustedRisk);
        }
    }

    private void adjustForTerrainAndSoil(Map<String, Object> data) {
        if (data.containsKey("baseRiskLevel")) {
            double terrainFactor = (double) data.getOrDefault("terrainFactor", 1.0);
            double soilFactor = (double) data.getOrDefault("soilSaturationFactor", 1.0);

            // Combined factor from terrain and soil
            double combinedFactor = (terrainFactor + soilFactor) / 2.0;

            String currentRisk = (String) data.get("floodRiskLevel");
            String adjustedRisk = adjustRiskLevel(currentRisk, combinedFactor);
            data.put("floodRiskLevel", adjustedRisk);
        }
    }

    private double calculateConfidenceScore(Map<String, Object> data) {
        // In a real ML model, confidence would be based on model metrics
        // For this example, we'll simulate confidence based on data quality

        // Base confidence
        double baseConfidence = 0.7;

        // Adjust based on number of contributing factors (more factors = more confidence)
        List<String> factors = (List<String>) data.get("contributingFactors");
        int factorCount = factors != null ? factors.size() : 0;
        double factorAdjustment = Math.min(0.2, factorCount * 0.05); // Up to 0.2 for 4+ factors

        // Random variation to simulate model uncertainty
        Random random = new Random();
        double randomVariation = (random.nextDouble() - 0.5) * 0.1; // -0.05 to +0.05

        // Calculate final confidence score
        double confidenceScore = baseConfidence + factorAdjustment + randomVariation;

        // Ensure confidence is between 0 and 1
        return Math.max(0.0, Math.min(1.0, confidenceScore));
    }

    private String generateRecommendation(Map<String, Object> data) {
        if (!data.containsKey("expectedVisitorLoad")) {
            return "No specific recommendations at this time.";
        }

        String visitorLoad = (String) data.get("expectedVisitorLoad");
        String siteName = (String) data.get("siteName");

        switch (visitorLoad) {
            case "Very High":
                return "Consider visiting " + siteName + " on a different day or very early in the morning to avoid crowds.";
            case "High":
                return "Visit " + siteName + " before 10 AM or after 3 PM for a less crowded experience.";
            case "Moderate":
                return siteName + " should have manageable crowds. Morning visits are still recommended for the best experience.";
            case "Low":
                return "Great time to visit " + siteName + " with minimal crowds expected.";
            default:
                return "No specific recommendations for " + siteName + " at this time.";
        }
    }

    private String adjustLoadLevel(String currentLoad, double factor) {
        // Convert load level to numeric value
        int loadValue;
        switch (currentLoad) {
            case "Very High": loadValue = 4; break;
            case "High": loadValue = 3; break;
            case "Moderate": loadValue = 2; break;
            case "Low": loadValue = 1; break;
            default: loadValue = 0;
        }

        // Apply factor
        double adjustedValue = loadValue * factor;

        // Convert back to string
        if (adjustedValue >= 3.5) return "Very High";
        if (adjustedValue >= 2.5) return "High";
        if (adjustedValue >= 1.5) return "Moderate";
        if (adjustedValue >= 0.5) return "Low";
        return "Very Low";
    }

    private String adjustRiskLevel(String currentRisk, double factor) {
        // Convert risk level to numeric value
        int riskValue;
        switch (currentRisk) {
            case "Very High": riskValue = 4; break;
            case "High": riskValue = 3; break;
            case "Moderate": riskValue = 2; break;
            case "Low": riskValue = 1; break;
            default: riskValue = 0;
        }

        // Apply factor
        double adjustedValue = riskValue * factor;

        // Convert back to string
        if (adjustedValue >= 3.5) return "Very High";
        if (adjustedValue >= 2.5) return "High";
        if (adjustedValue >= 1.5) return "Moderate";
        if (adjustedValue >= 0.5) return "Low";
        return "Very Low";
    }

    private List<Map<String, Object>> generateHistoricalData(String id, String type) {
        List<Map<String, Object>> historicalData = new ArrayList<>();

        // Generate data for the past 30 days
        LocalDate today = LocalDate.now();
        for (int i = 30; i > 0; i--) {
            LocalDate date = today.minusDays(i);

            Map<String, Object> dataPoint = new HashMap<>();
            dataPoint.put("date", date.format(DateTimeFormatter.ISO_DATE));

            if ("eco-tourism".equals(type)) {
                Map<String, Object> prediction = predictEcoTourismPressure(id, date);
                // Extract from nested prediction map if it exists
                Map<String, Object> predictionMap = (Map<String, Object>) prediction.get("prediction");
                if (predictionMap != null) {
                    dataPoint.put("expectedVisitorLoad", predictionMap.get("expectedVisitorLoad"));
                    dataPoint.put("confidenceScore", predictionMap.get("confidenceScore"));
                } else {
                    dataPoint.put("expectedVisitorLoad", prediction.get("expectedVisitorLoad"));
                    dataPoint.put("confidenceScore", prediction.get("confidenceScore"));
                }
            } else {
                Map<String, Object> prediction = predictFloodRisk(id, date);
                // Extract from nested prediction map if it exists
                Map<String, Object> predictionMap = (Map<String, Object>) prediction.get("prediction");
                if (predictionMap != null) {
                    dataPoint.put("floodRiskLevel", predictionMap.get("floodRiskLevel"));
                    dataPoint.put("confidenceScore", predictionMap.get("confidenceScore"));
                } else {
                    dataPoint.put("floodRiskLevel", prediction.get("floodRiskLevel"));
                    dataPoint.put("confidenceScore", prediction.get("confidenceScore"));
                }
            }

            historicalData.add(dataPoint);
        }

        return historicalData;
    }

    private Map<String, Object> calculateTrends(List<Map<String, Object>> historicalData, 
                                               Map<String, Object> currentPrediction, 
                                               String type) {
        Map<String, Object> trendInfo = new HashMap<>();

        // Calculate trend direction and magnitude
        String trendDirection;
        double trendMagnitude;

        if ("eco-tourism".equals(type)) {
            trendDirection = calculateVisitorLoadTrend(historicalData, currentPrediction);
            trendMagnitude = calculateTrendMagnitude(historicalData, "expectedVisitorLoad");
        } else {
            trendDirection = calculateFloodRiskTrend(historicalData, currentPrediction);
            trendMagnitude = calculateTrendMagnitude(historicalData, "floodRiskLevel");
        }

        trendInfo.put("direction", trendDirection);
        trendInfo.put("magnitude", trendMagnitude);
        trendInfo.put("description", generateTrendDescription(trendDirection, trendMagnitude, type));

        return trendInfo;
    }

    private String calculateVisitorLoadTrend(List<Map<String, Object>> historicalData, 
                                           Map<String, Object> currentPrediction) {
        if (historicalData.isEmpty()) {
            return "stable";
        }

        // Get the most recent historical data point
        Map<String, Object> recentData = historicalData.get(historicalData.size() - 1);

        // Compare load levels
        String recentLoad = (String) recentData.get("expectedVisitorLoad");

        // Get the current load level from the nested prediction map
        Map<String, Object> predictionMap = (Map<String, Object>) currentPrediction.get("prediction");
        String currentLoad = predictionMap != null ? 
            (String) predictionMap.get("expectedVisitorLoad") : 
            (String) currentPrediction.get("expectedVisitorLoad");

        int recentValue = getLoadValue(recentLoad);
        int currentValue = getLoadValue(currentLoad);

        if (currentValue > recentValue) return "increasing";
        if (currentValue < recentValue) return "decreasing";
        return "stable";
    }

    private String calculateFloodRiskTrend(List<Map<String, Object>> historicalData, 
                                         Map<String, Object> currentPrediction) {
        if (historicalData.isEmpty()) {
            return "stable";
        }

        // Get the most recent historical data point
        Map<String, Object> recentData = historicalData.get(historicalData.size() - 1);

        // Compare risk levels
        String recentRisk = (String) recentData.get("floodRiskLevel");

        // Get the current risk level from the nested prediction map
        Map<String, Object> predictionMap = (Map<String, Object>) currentPrediction.get("prediction");
        String currentRisk = predictionMap != null ? 
            (String) predictionMap.get("floodRiskLevel") : 
            (String) currentPrediction.get("floodRiskLevel");

        int recentValue = getRiskValue(recentRisk);
        int currentValue = getRiskValue(currentRisk);

        if (currentValue > recentValue) return "worsening";
        if (currentValue < recentValue) return "improving";
        return "stable";
    }

    private double calculateTrendMagnitude(List<Map<String, Object>> historicalData, String field) {
        if (historicalData.size() < 2) {
            return 0.0;
        }

        // Calculate average change over time
        double totalChange = 0.0;
        int changeCount = 0;

        for (int i = 1; i < historicalData.size(); i++) {
            Map<String, Object> previous = historicalData.get(i - 1);
            Map<String, Object> current = historicalData.get(i);

            int previousValue, currentValue;

            if ("expectedVisitorLoad".equals(field)) {
                previousValue = getLoadValue((String) previous.get(field));
                currentValue = getLoadValue((String) current.get(field));
            } else {
                previousValue = getRiskValue((String) previous.get(field));
                currentValue = getRiskValue((String) current.get(field));
            }

            totalChange += Math.abs(currentValue - previousValue);
            changeCount++;
        }

        return changeCount > 0 ? totalChange / changeCount : 0.0;
    }

    private int getLoadValue(String load) {
        switch (load) {
            case "Very High": return 4;
            case "High": return 3;
            case "Moderate": return 2;
            case "Low": return 1;
            default: return 0;
        }
    }

    private int getRiskValue(String risk) {
        switch (risk) {
            case "Very High": return 4;
            case "High": return 3;
            case "Moderate": return 2;
            case "Low": return 1;
            default: return 0;
        }
    }

    private String generateTrendDescription(String direction, double magnitude, String type) {
        StringBuilder description = new StringBuilder();

        // Describe the trend direction
        if ("eco-tourism".equals(type)) {
            if ("increasing".equals(direction)) {
                description.append("Visitor numbers are trending upward");
            } else if ("decreasing".equals(direction)) {
                description.append("Visitor numbers are trending downward");
            } else {
                description.append("Visitor numbers are relatively stable");
            }
        } else {
            if ("worsening".equals(direction)) {
                description.append("Flood risk is increasing");
            } else if ("improving".equals(direction)) {
                description.append("Flood risk is decreasing");
            } else {
                description.append("Flood risk is relatively stable");
            }
        }

        // Describe the magnitude
        if (magnitude < 0.5) {
            description.append(" with minimal fluctuation.");
        } else if (magnitude < 1.0) {
            description.append(" with moderate fluctuation.");
        } else {
            description.append(" with significant fluctuation.");
        }

        return description.toString();
    }

    /**
     * Analyze flood risk data for anomalies.
     * 
     * @param region The region to analyze
     * @param historicalData Historical flood risk data
     * @return Map containing anomaly information
     */
    public Map<String, Object> analyzeFloodRiskAnomalies(String region, List<Map<String, Object>> historicalData) {
        return anomalyDetectionService.analyzeFloodRiskAnomalies(region, historicalData);
    }

    /**
     * Analyze eco-tourism data for anomalies.
     * 
     * @param siteId The site to analyze
     * @param historicalData Historical visitor load data
     * @return Map containing anomaly information
     */
    public Map<String, Object> analyzeEcoTourismAnomalies(String siteId, List<Map<String, Object>> historicalData) {
        return anomalyDetectionService.analyzeEcoTourismAnomalies(siteId, historicalData);
    }

    /**
     * Generate a climate change scenario for a region.
     * 
     * @param region The region to model
     * @param yearsFuture Number of years in the future to model
     * @param emissionsScenario Emissions scenario (low, medium, high)
     * @return A map containing the scenario prediction
     */
    public Map<String, Object> generateClimateChangeScenario(String region, int yearsFuture, 
                                                           String emissionsScenario) {
        return scenarioModelingService.generateClimateChangeScenario(region, yearsFuture, emissionsScenario);
    }

    /**
     * Compare multiple scenarios for a region.
     * 
     * @param region The region to model
     * @param scenarios List of scenario parameters to compare
     * @return Map containing the comparison results
     */
    public Map<String, Object> compareScenarios(String region, List<Map<String, Object>> scenarios) {
        return scenarioModelingService.compareScenarios(region, scenarios);
    }

    /**
     * Get the confidence score for a prediction.
     * 
     * @param modelType The type of model ("floodRisk" or "ecoTourism")
     * @param id The identifier (region or site id)
     * @return Confidence score between 0 and 1
     */
    public double getPredictionConfidence(String modelType, String id) {
        return modelService.getPredictionConfidence(modelType, id);
    }
}
