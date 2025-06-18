package com.environmentdirect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Arrays;

/**
 * Service for generating prediction data for various environmental forecasts.
 * This service provides methods for eco-tourism hotspot pressure and flood risk forecasting.
 */
@Service
public class PredictionService {

    private final MachineLearningService mlService;

    @Autowired
    public PredictionService(MachineLearningService mlService) {
        this.mlService = mlService;
    }

    /**
     * Get eco-tourism hotspot pressure forecast for a specific site.
     * 
     * @param siteId The identifier for the tourism site.
     * @return A map containing the forecast data.
     */
    public Map<String, Object> getEcoTourismPressure(String siteId) {
        // Use the machine learning service for more accurate predictions
        return mlService.predictEcoTourismPressure(siteId, LocalDate.now());
    }

    /**
     * Get flood risk forecast for a specific region.
     * 
     * @param region The identifier for the region.
     * @return A map containing the forecast data.
     */
    public Map<String, Object> getFloodRisk(String region) {
        // Use the machine learning service for more accurate predictions
        return mlService.predictFloodRisk(region, LocalDate.now());
    }

    /**
     * Get all eco-tourism hotspot pressure forecasts.
     * 
     * @return A list of forecasts for all known sites.
     */
    public List<Map<String, Object>> getAllEcoTourismPressures() {
        List<Map<String, Object>> forecasts = new ArrayList<>();

        // Add forecasts for all known sites
        forecasts.add(getEcoTourismPressure("boiling-lake"));
        forecasts.add(getEcoTourismPressure("trafalgar-falls"));
        forecasts.add(getEcoTourismPressure("middleham-falls"));
        forecasts.add(getEcoTourismPressure("emerald-pool"));

        return forecasts;
    }

    /**
     * Get all flood risk forecasts.
     * 
     * @return A list of forecasts for all known regions.
     */
    public List<Map<String, Object>> getAllFloodRisks() {
        List<Map<String, Object>> forecasts = new ArrayList<>();

        // Add forecasts for all known regions
        forecasts.add(getFloodRisk("Portsmouth"));
        forecasts.add(getFloodRisk("RoseauSouth"));
        forecasts.add(getFloodRisk("LayouValley"));
        forecasts.add(getFloodRisk("MarigotArea"));

        return forecasts;
    }

    /**
     * Get historical data comparison for a specific site or region.
     * 
     * @param id The identifier for the site or region
     * @param type The type of data ("eco-tourism" or "flood-risk")
     * @return A map containing historical data and current predictions
     */
    public Map<String, Object> getHistoricalComparison(String id, String type) {
        // Validate type parameter
        if (!type.equals("eco-tourism") && !type.equals("flood-risk")) {
            throw new IllegalArgumentException("Type must be either 'eco-tourism' or 'flood-risk'");
        }

        // Use the machine learning service for historical data comparison
        return mlService.getHistoricalComparison(id, type);
    }
}
