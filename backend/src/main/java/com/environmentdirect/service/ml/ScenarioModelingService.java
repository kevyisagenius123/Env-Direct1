package com.environmentdirect.service.ml;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Service for predictive scenario modeling.
 * This service provides methods for "what-if" scenario analysis and parameter exploration.
 */
@Service
public class ScenarioModelingService {

    private static final Logger logger = LoggerFactory.getLogger(ScenarioModelingService.class);

    private final ModelService modelService;

    @Autowired
    public ScenarioModelingService(ModelService modelService) {
        this.modelService = modelService;
    }

    /**
     * Generate a flood risk scenario by adjusting parameters.
     * 
     * @param region The region to model
     * @param rainfallAdjustment Adjustment factor for rainfall (1.0 = no change)
     * @param temperatureAdjustment Adjustment in degrees Celsius (0 = no change)
     * @param soilSaturationAdjustment Adjustment factor for soil saturation (1.0 = no change)
     * @return Map containing the scenario prediction
     */
    public Map<String, Object> generateFloodRiskScenario(String region, double rainfallAdjustment, 
                                                       double temperatureAdjustment, 
                                                       double soilSaturationAdjustment) {
        Map<String, Object> scenario = new HashMap<>();
        scenario.put("region", region);
        scenario.put("scenarioType", "floodRisk");
        scenario.put("generatedAt", LocalDate.now().format(DateTimeFormatter.ISO_DATE));

        try {
            // Base parameters for the region (in a real app, these would come from a database)
            Map<String, Double> baseParams = getBaseFloodRiskParams(region);

            // Apply adjustments
            double adjustedRainfall = baseParams.get("rainfall") * rainfallAdjustment;
            double adjustedTemperature = baseParams.get("temperature") + temperatureAdjustment;
            double adjustedSoilSaturation = baseParams.get("soilSaturation") * soilSaturationAdjustment;

            // Get other parameters
            double elevation = baseParams.get("elevation");
            double historicalRisk = baseParams.get("historicalRisk");

            // Predict risk level using the model
            int riskLevel = modelService.predictFloodRisk(
                adjustedRainfall, adjustedTemperature, elevation, adjustedSoilSaturation, historicalRisk);

            // Get confidence score
            double confidence = modelService.getPredictionConfidence("floodRisk", region);

            // Convert numeric risk level to string
            String riskLevelString = convertNumericToRiskLevel(riskLevel);

            // Populate scenario results
            scenario.put("parameters", new HashMap<String, Object>() {{
                put("rainfall", adjustedRainfall);
                put("rainfallAdjustment", rainfallAdjustment);
                put("temperature", adjustedTemperature);
                put("temperatureAdjustment", temperatureAdjustment);
                put("soilSaturation", adjustedSoilSaturation);
                put("soilSaturationAdjustment", soilSaturationAdjustment);
                put("elevation", elevation);
                put("historicalRisk", historicalRisk);
            }});

            scenario.put("prediction", new HashMap<String, Object>() {{
                put("floodRiskLevel", riskLevelString);
                put("numericRiskLevel", riskLevel);
                put("confidenceScore", confidence);
            }});

            // Add impact assessment
            scenario.put("impact", generateImpactAssessment(region, riskLevel));

            // Add recommendations
            scenario.put("recommendations", generateRecommendations(region, riskLevel));

        } catch (Exception e) {
            logger.error("Error generating flood risk scenario for region: {}", region, e);
            scenario.put("error", "Error generating scenario: " + e.getMessage());
        }

        return scenario;
    }

    /**
     * Generate an eco-tourism scenario by adjusting parameters.
     * 
     * @param siteId The site to model
     * @param seasonalAdjustment Adjustment factor for seasonal effects (1.0 = no change)
     * @param isWeekend Whether the scenario is for a weekend
     * @param marketingFactor Additional factor for marketing campaigns (1.0 = no change)
     * @return Map containing the scenario prediction
     */
    public Map<String, Object> generateEcoTourismScenario(String siteId, double seasonalAdjustment, 
                                                        boolean isWeekend, double marketingFactor) {
        Map<String, Object> scenario = new HashMap<>();
        scenario.put("siteId", siteId);
        scenario.put("scenarioType", "ecoTourism");
        scenario.put("generatedAt", LocalDate.now().format(DateTimeFormatter.ISO_DATE));

        try {
            // Base parameters for the site (in a real app, these would come from a database)
            Map<String, Object> baseParams = getBaseEcoTourismParams(siteId);

            // Apply adjustments
            final double seasonFactor = ((Number) baseParams.get("seasonFactor")).doubleValue();
            final double adjustedSeasonFactor = seasonFactor * seasonalAdjustment * marketingFactor;

            // Predict visitor load using the model
            int loadLevel = modelService.predictVisitorLoad(siteId, adjustedSeasonFactor, isWeekend);

            // Get confidence score
            double confidence = modelService.getPredictionConfidence("ecoTourism", siteId);

            // Convert numeric load level to string
            String loadLevelString = convertNumericToLoadLevel(loadLevel);

            // Populate scenario results
            scenario.put("parameters", new HashMap<String, Object>() {{
                put("seasonFactor", adjustedSeasonFactor);
                put("seasonalAdjustment", seasonalAdjustment);
                put("isWeekend", isWeekend);
                put("marketingFactor", marketingFactor);
                put("siteName", baseParams.get("siteName"));
            }});

            scenario.put("prediction", new HashMap<String, Object>() {{
                put("expectedVisitorLoad", loadLevelString);
                put("numericLoadLevel", loadLevel);
                put("confidenceScore", confidence);
            }});

            // Add capacity analysis
            scenario.put("capacityAnalysis", generateCapacityAnalysis(siteId, loadLevel));

            // Add recommendations
            scenario.put("recommendations", generateVisitorRecommendations(siteId, loadLevel));

        } catch (Exception e) {
            logger.error("Error generating eco-tourism scenario for site: {}", siteId, e);
            scenario.put("error", "Error generating scenario: " + e.getMessage());
        }

        return scenario;
    }

    /**
     * Generate a climate change impact scenario.
     * 
     * @param region The region to model
     * @param yearsFuture Number of years in the future to model
     * @param emissionsScenario Emissions scenario (low, medium, high)
     * @return Map containing the scenario prediction
     */
    public Map<String, Object> generateClimateChangeScenario(String region, int yearsFuture, 
                                                           String emissionsScenario) {
        Map<String, Object> scenario = new HashMap<>();
        scenario.put("region", region);
        scenario.put("scenarioType", "climateChange");
        scenario.put("generatedAt", LocalDate.now().format(DateTimeFormatter.ISO_DATE));

        try {
            // Base parameters for the region (in a real app, these would come from a database)
            Map<String, Double> baseParams = getBaseClimateParams(region);

            // Calculate emissions factor based on scenario
            double emissionsFactor;
            switch (emissionsScenario.toLowerCase()) {
                case "low":
                    emissionsFactor = 0.5;
                    break;
                case "medium":
                    emissionsFactor = 1.0;
                    break;
                case "high":
                    emissionsFactor = 1.5;
                    break;
                default:
                    emissionsFactor = 1.0;
            }

            // Calculate projected changes
            double baseTemperature = baseParams.get("temperature");
            double baseRainfall = baseParams.get("rainfall");
            double baseSeaLevel = baseParams.get("seaLevel");

            // Simple linear projections (in a real app, these would use more sophisticated models)
            double temperatureIncrease = 0.03 * yearsFuture * emissionsFactor;
            double rainfallChange = baseRainfall * (1 + (0.005 * yearsFuture * emissionsFactor));
            double seaLevelRise = 0.01 * yearsFuture * emissionsFactor;

            // Calculate projected values
            double projectedTemperature = baseTemperature + temperatureIncrease;
            double projectedRainfall = rainfallChange;
            double projectedSeaLevel = baseSeaLevel + seaLevelRise;

            // Calculate impact scores (0-10 scale)
            int temperatureImpact = (int) Math.min(10, Math.round(temperatureIncrease * 3));
            int rainfallImpact = (int) Math.min(10, Math.round(Math.abs(rainfallChange - baseRainfall) / baseRainfall * 10));
            int seaLevelImpact = (int) Math.min(10, Math.round(seaLevelRise * 10));

            // Calculate overall impact score
            int overallImpact = (int) Math.round((temperatureImpact + rainfallImpact + seaLevelImpact) / 3.0);

            // Populate scenario results
            scenario.put("parameters", new HashMap<String, Object>() {{
                put("yearsFuture", yearsFuture);
                put("targetYear", LocalDate.now().getYear() + yearsFuture);
                put("emissionsScenario", emissionsScenario);
                put("emissionsFactor", emissionsFactor);
                put("baseTemperature", baseTemperature);
                put("baseRainfall", baseRainfall);
                put("baseSeaLevel", baseSeaLevel);
            }});

            scenario.put("projection", new HashMap<String, Object>() {{
                put("projectedTemperature", projectedTemperature);
                put("temperatureIncrease", temperatureIncrease);
                put("projectedRainfall", projectedRainfall);
                put("rainfallChange", projectedRainfall - baseRainfall);
                put("projectedSeaLevel", projectedSeaLevel);
                put("seaLevelRise", seaLevelRise);
            }});

            scenario.put("impact", new HashMap<String, Object>() {{
                put("temperatureImpact", temperatureImpact);
                put("rainfallImpact", rainfallImpact);
                put("seaLevelImpact", seaLevelImpact);
                put("overallImpact", overallImpact);
                put("impactDescription", getImpactDescription(overallImpact));
            }});

            // Add adaptation strategies
            scenario.put("adaptationStrategies", generateAdaptationStrategies(region, overallImpact));

        } catch (Exception e) {
            logger.error("Error generating climate change scenario for region: {}", region, e);
            scenario.put("error", "Error generating scenario: " + e.getMessage());
        }

        return scenario;
    }

    /**
     * Compare multiple scenarios for a region.
     * 
     * @param region The region to model
     * @param scenarios List of scenario parameters to compare
     * @return Map containing the comparison results
     */
    public Map<String, Object> compareScenarios(String region, List<Map<String, Object>> scenarios) {
        Map<String, Object> comparison = new HashMap<>();
        comparison.put("region", region);
        comparison.put("comparisonType", "multiScenario");
        comparison.put("generatedAt", LocalDate.now().format(DateTimeFormatter.ISO_DATE));

        try {
            List<Map<String, Object>> results = new ArrayList<>();

            for (Map<String, Object> scenarioParams : scenarios) {
                String scenarioType = (String) scenarioParams.get("scenarioType");
                Map<String, Object> result;

                switch (scenarioType) {
                    case "floodRisk":
                        result = generateFloodRiskScenario(
                            region,
                            (double) scenarioParams.getOrDefault("rainfallAdjustment", 1.0),
                            (double) scenarioParams.getOrDefault("temperatureAdjustment", 0.0),
                            (double) scenarioParams.getOrDefault("soilSaturationAdjustment", 1.0)
                        );
                        break;
                    case "climateChange":
                        result = generateClimateChangeScenario(
                            region,
                            (int) scenarioParams.getOrDefault("yearsFuture", 10),
                            (String) scenarioParams.getOrDefault("emissionsScenario", "medium")
                        );
                        break;
                    default:
                        result = new HashMap<>();
                        result.put("error", "Unknown scenario type: " + scenarioType);
                }

                result.put("scenarioName", scenarioParams.getOrDefault("name", "Unnamed Scenario"));
                results.add(result);
            }

            comparison.put("scenarios", results);

            // Add comparative analysis
            comparison.put("analysis", generateComparativeAnalysis(results));

        } catch (Exception e) {
            logger.error("Error comparing scenarios for region: {}", region, e);
            comparison.put("error", "Error comparing scenarios: " + e.getMessage());
        }

        return comparison;
    }

    // Helper methods

    private Map<String, Double> getBaseFloodRiskParams(String region) {
        // In a real app, these would come from a database
        Map<String, Double> params = new HashMap<>();

        switch (region) {
            case "Portsmouth":
                params.put("rainfall", 80.0);
                params.put("temperature", 27.0);
                params.put("elevation", 50.0);
                params.put("soilSaturation", 0.6);
                params.put("historicalRisk", 2.0);
                break;
            case "RoseauSouth":
                params.put("rainfall", 90.0);
                params.put("temperature", 28.0);
                params.put("elevation", 30.0);
                params.put("soilSaturation", 0.7);
                params.put("historicalRisk", 3.0);
                break;
            case "LayouValley":
                params.put("rainfall", 100.0);
                params.put("temperature", 26.0);
                params.put("elevation", 150.0);
                params.put("soilSaturation", 0.8);
                params.put("historicalRisk", 3.0);
                break;
            case "MarigotArea":
                params.put("rainfall", 70.0);
                params.put("temperature", 27.0);
                params.put("elevation", 100.0);
                params.put("soilSaturation", 0.5);
                params.put("historicalRisk", 1.0);
                break;
            default:
                params.put("rainfall", 80.0);
                params.put("temperature", 27.0);
                params.put("elevation", 100.0);
                params.put("soilSaturation", 0.6);
                params.put("historicalRisk", 2.0);
        }

        return params;
    }

    private Map<String, Object> getBaseEcoTourismParams(String siteId) {
        // In a real app, these would come from a database
        Map<String, Object> params = new HashMap<>();

        switch (siteId) {
            case "boiling-lake":
                params.put("siteName", "Boiling Lake Trail");
                params.put("seasonFactor", 1.2);
                params.put("capacity", 100);
                break;
            case "trafalgar-falls":
                params.put("siteName", "Trafalgar Falls");
                params.put("seasonFactor", 1.3);
                params.put("capacity", 150);
                break;
            case "middleham-falls":
                params.put("siteName", "Middleham Falls");
                params.put("seasonFactor", 1.0);
                params.put("capacity", 80);
                break;
            case "emerald-pool":
                params.put("siteName", "Emerald Pool");
                params.put("seasonFactor", 1.1);
                params.put("capacity", 120);
                break;
            default:
                params.put("siteName", "Unknown Site");
                params.put("seasonFactor", 1.0);
                params.put("capacity", 100);
        }

        return params;
    }

    private Map<String, Double> getBaseClimateParams(String region) {
        // In a real app, these would come from a database
        Map<String, Double> params = new HashMap<>();

        switch (region) {
            case "Portsmouth":
                params.put("temperature", 27.5);
                params.put("rainfall", 2000.0);
                params.put("seaLevel", 0.0);
                break;
            case "RoseauSouth":
                params.put("temperature", 28.0);
                params.put("rainfall", 1800.0);
                params.put("seaLevel", 0.0);
                break;
            case "LayouValley":
                params.put("temperature", 26.5);
                params.put("rainfall", 2200.0);
                params.put("seaLevel", 0.1);
                break;
            case "MarigotArea":
                params.put("temperature", 27.0);
                params.put("rainfall", 1900.0);
                params.put("seaLevel", 0.0);
                break;
            default:
                params.put("temperature", 27.0);
                params.put("rainfall", 2000.0);
                params.put("seaLevel", 0.0);
        }

        return params;
    }

    private String convertNumericToRiskLevel(int level) {
        switch (level) {
            case 4: return "Very High";
            case 3: return "High";
            case 2: return "Moderate";
            case 1: return "Low";
            case 0: return "Very Low";
            default: return "Unknown";
        }
    }

    private String convertNumericToLoadLevel(int level) {
        switch (level) {
            case 4: return "Very High";
            case 3: return "High";
            case 2: return "Moderate";
            case 1: return "Low";
            case 0: return "Very Low";
            default: return "Unknown";
        }
    }

    private Map<String, Object> generateImpactAssessment(String region, int riskLevel) {
        Map<String, Object> impact = new HashMap<>();

        // Generate impact assessment based on risk level
        switch (riskLevel) {
            case 4: // Very High
                impact.put("economicImpact", "Severe economic damage expected");
                impact.put("infrastructureImpact", "Major infrastructure damage likely");
                impact.put("populationImpact", "Significant population displacement possible");
                impact.put("severityScore", 9);
                break;
            case 3: // High
                impact.put("economicImpact", "Substantial economic damage expected");
                impact.put("infrastructureImpact", "Moderate infrastructure damage likely");
                impact.put("populationImpact", "Some population displacement possible");
                impact.put("severityScore", 7);
                break;
            case 2: // Moderate
                impact.put("economicImpact", "Moderate economic damage possible");
                impact.put("infrastructureImpact", "Minor infrastructure damage possible");
                impact.put("populationImpact", "Limited population displacement");
                impact.put("severityScore", 5);
                break;
            case 1: // Low
                impact.put("economicImpact", "Minor economic damage possible");
                impact.put("infrastructureImpact", "Minimal infrastructure damage expected");
                impact.put("populationImpact", "No significant population displacement");
                impact.put("severityScore", 3);
                break;
            default: // Very Low or Unknown
                impact.put("economicImpact", "Negligible economic damage expected");
                impact.put("infrastructureImpact", "No significant infrastructure damage expected");
                impact.put("populationImpact", "No population displacement expected");
                impact.put("severityScore", 1);
        }

        return impact;
    }

    private List<String> generateRecommendations(String region, int riskLevel) {
        List<String> recommendations = new ArrayList<>();

        // Generate recommendations based on risk level
        if (riskLevel >= 3) { // High or Very High
            recommendations.add("Implement immediate flood prevention measures");
            recommendations.add("Consider evacuation plans for high-risk areas");
            recommendations.add("Reinforce critical infrastructure");
            recommendations.add("Establish emergency response protocols");
        } else if (riskLevel == 2) { // Moderate
            recommendations.add("Monitor water levels closely");
            recommendations.add("Prepare flood prevention measures");
            recommendations.add("Review emergency response plans");
            recommendations.add("Inform residents in flood-prone areas");
        } else { // Low or Very Low
            recommendations.add("Maintain regular monitoring");
            recommendations.add("Ensure drainage systems are clear");
            recommendations.add("Review flood prevention infrastructure");
        }

        return recommendations;
    }

    private Map<String, Object> generateCapacityAnalysis(String siteId, int loadLevel) {
        Map<String, Object> analysis = new HashMap<>();

        // Get base capacity from parameters
        int capacity = (int) getBaseEcoTourismParams(siteId).get("capacity");

        // Calculate expected visitors based on load level
        int expectedVisitors;
        switch (loadLevel) {
            case 4: // Very High
                expectedVisitors = (int) (capacity * 1.5);
                break;
            case 3: // High
                expectedVisitors = (int) (capacity * 1.2);
                break;
            case 2: // Moderate
                expectedVisitors = (int) (capacity * 0.8);
                break;
            case 1: // Low
                expectedVisitors = (int) (capacity * 0.5);
                break;
            default: // Very Low or Unknown
                expectedVisitors = (int) (capacity * 0.3);
        }

        // Calculate capacity utilization
        double utilization = (double) expectedVisitors / capacity;

        // Determine if over capacity
        boolean overCapacity = utilization > 1.0;

        // Populate analysis
        analysis.put("siteCapacity", capacity);
        analysis.put("expectedVisitors", expectedVisitors);
        analysis.put("utilizationRate", utilization);
        analysis.put("overCapacity", overCapacity);

        // Add impact assessment
        if (overCapacity) {
            analysis.put("environmentalImpact", "High - Site resources may be strained");
            analysis.put("visitorExperience", "Degraded - Overcrowding likely");
            analysis.put("sustainabilityRisk", "Significant - Consider visitor management strategies");
        } else if (utilization > 0.8) {
            analysis.put("environmentalImpact", "Moderate - Some strain on site resources");
            analysis.put("visitorExperience", "Acceptable - Some crowding possible");
            analysis.put("sustainabilityRisk", "Moderate - Monitor visitor numbers");
        } else {
            analysis.put("environmentalImpact", "Low - Minimal strain on site resources");
            analysis.put("visitorExperience", "Optimal - No crowding expected");
            analysis.put("sustainabilityRisk", "Low - Sustainable visitor levels");
        }

        return analysis;
    }

    private List<String> generateVisitorRecommendations(String siteId, int loadLevel) {
        List<String> recommendations = new ArrayList<>();

        // Get site name
        String siteName = (String) getBaseEcoTourismParams(siteId).get("siteName");

        // Generate recommendations based on load level
        if (loadLevel >= 3) { // High or Very High
            recommendations.add("Implement visitor number restrictions at " + siteName);
            recommendations.add("Consider timed entry system to manage crowds");
            recommendations.add("Increase staff presence to manage visitor flow");
            recommendations.add("Monitor environmental impact closely");
        } else if (loadLevel == 2) { // Moderate
            recommendations.add("Monitor visitor numbers at " + siteName);
            recommendations.add("Ensure adequate staff presence");
            recommendations.add("Provide clear guidance on sustainable practices");
        } else { // Low or Very Low
            recommendations.add("Promote " + siteName + " to increase visitor numbers");
            recommendations.add("Maintain regular monitoring of visitor impact");
            recommendations.add("Use as opportunity for site maintenance");
        }

        return recommendations;
    }

    private String getImpactDescription(int impactScore) {
        if (impactScore >= 8) {
            return "Severe impact expected with significant changes to local climate patterns";
        } else if (impactScore >= 6) {
            return "High impact expected with notable changes to local climate patterns";
        } else if (impactScore >= 4) {
            return "Moderate impact expected with some changes to local climate patterns";
        } else if (impactScore >= 2) {
            return "Low impact expected with minor changes to local climate patterns";
        } else {
            return "Minimal impact expected with negligible changes to local climate patterns";
        }
    }

    private List<String> generateAdaptationStrategies(String region, int impactScore) {
        List<String> strategies = new ArrayList<>();

        // Generate adaptation strategies based on impact score
        if (impactScore >= 8) { // Severe
            strategies.add("Develop comprehensive climate adaptation plan");
            strategies.add("Invest in robust flood defense infrastructure");
            strategies.add("Consider relocation of vulnerable communities");
            strategies.add("Implement strict building codes for climate resilience");
            strategies.add("Establish early warning systems for extreme weather events");
        } else if (impactScore >= 6) { // High
            strategies.add("Develop targeted climate adaptation measures");
            strategies.add("Upgrade existing flood defense infrastructure");
            strategies.add("Protect vulnerable ecosystems");
            strategies.add("Update building codes for climate resilience");
            strategies.add("Improve emergency response capabilities");
        } else if (impactScore >= 4) { // Moderate
            strategies.add("Implement key climate adaptation measures");
            strategies.add("Maintain and improve drainage systems");
            strategies.add("Promote climate-resilient agriculture");
            strategies.add("Educate communities about climate risks");
        } else { // Low or Minimal
            strategies.add("Monitor climate indicators");
            strategies.add("Incorporate climate considerations in long-term planning");
            strategies.add("Raise awareness about climate change impacts");
        }

        return strategies;
    }

    private Map<String, Object> generateComparativeAnalysis(List<Map<String, Object>> scenarios) {
        Map<String, Object> analysis = new HashMap<>();

        // Extract key metrics for comparison
        List<String> scenarioNames = new ArrayList<>();
        List<Object> keyMetrics = new ArrayList<>();

        for (Map<String, Object> scenario : scenarios) {
            scenarioNames.add((String) scenario.get("scenarioName"));

            String scenarioType = (String) scenario.get("scenarioType");
            Map<String, Object> metrics = new HashMap<>();

            if ("floodRisk".equals(scenarioType)) {
                @SuppressWarnings("unchecked")
                Map<String, Object> prediction = (Map<String, Object>) scenario.get("prediction");
                @SuppressWarnings("unchecked")
                Map<String, Object> impact = (Map<String, Object>) scenario.get("impact");

                metrics.put("riskLevel", prediction.get("floodRiskLevel"));
                metrics.put("confidenceScore", prediction.get("confidenceScore"));
                metrics.put("severityScore", impact.get("severityScore"));
            } else if ("climateChange".equals(scenarioType)) {
                @SuppressWarnings("unchecked")
                Map<String, Object> projection = (Map<String, Object>) scenario.get("projection");
                @SuppressWarnings("unchecked")
                Map<String, Object> impact = (Map<String, Object>) scenario.get("impact");

                metrics.put("temperatureIncrease", projection.get("temperatureIncrease"));
                metrics.put("rainfallChange", projection.get("rainfallChange"));
                metrics.put("overallImpact", impact.get("overallImpact"));
            }

            keyMetrics.add(metrics);
        }

        analysis.put("scenarioNames", scenarioNames);
        analysis.put("keyMetrics", keyMetrics);

        // Determine best and worst case scenarios
        if (!scenarios.isEmpty()) {
            String scenarioType = (String) scenarios.get(0).get("scenarioType");

            if ("floodRisk".equals(scenarioType)) {
                int bestIndex = 0;
                int worstIndex = 0;
                int lowestRisk = Integer.MAX_VALUE;
                int highestRisk = Integer.MIN_VALUE;

                for (int i = 0; i < scenarios.size(); i++) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> prediction = (Map<String, Object>) scenarios.get(i).get("prediction");
                    int riskLevel = (int) prediction.get("numericRiskLevel");

                    if (riskLevel < lowestRisk) {
                        lowestRisk = riskLevel;
                        bestIndex = i;
                    }

                    if (riskLevel > highestRisk) {
                        highestRisk = riskLevel;
                        worstIndex = i;
                    }
                }

                analysis.put("bestCaseScenario", scenarios.get(bestIndex).get("scenarioName"));
                analysis.put("worstCaseScenario", scenarios.get(worstIndex).get("scenarioName"));
            } else if ("climateChange".equals(scenarioType)) {
                int bestIndex = 0;
                int worstIndex = 0;
                int lowestImpact = Integer.MAX_VALUE;
                int highestImpact = Integer.MIN_VALUE;

                for (int i = 0; i < scenarios.size(); i++) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> impact = (Map<String, Object>) scenarios.get(i).get("impact");
                    int impactScore = (int) impact.get("overallImpact");

                    if (impactScore < lowestImpact) {
                        lowestImpact = impactScore;
                        bestIndex = i;
                    }

                    if (impactScore > highestImpact) {
                        highestImpact = impactScore;
                        worstIndex = i;
                    }
                }

                analysis.put("bestCaseScenario", scenarios.get(bestIndex).get("scenarioName"));
                analysis.put("worstCaseScenario", scenarios.get(worstIndex).get("scenarioName"));
            }
        }

        return analysis;
    }
}
