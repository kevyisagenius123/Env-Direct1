package com.environmentdirect.controller;

import com.environmentdirect.service.NCDCClimateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import com.environmentdirect.dto.LiveDataDto;

/**
 * Controller for providing live environmental data.
 * Enhanced with real NCDC climate data integration.
 * This endpoint serves data for the LiveDataDashboardSection component in the frontend.
 */
@RestController
@RequestMapping("/api/live-data")
public class LiveDataController {

    @Autowired
    private NCDCClimateService ncdcClimateService;

    /**
     * Get current environmental metrics data (mock data for quick response).
     * @return A map containing metrics data for air quality, water quality, and temperature.
     */
    @GetMapping
    public ResponseEntity<Map<String, LiveDataDto>> getLiveData() {
        // Mock data for immediate response
        Map<String, LiveDataDto> metricsData = new HashMap<>();
        
        // Air Quality Index data
        metricsData.put("aqi", new LiveDataDto("42", "Good", "Roseau Capital Average"));
        
        // Water Quality data
        metricsData.put("waterQuality", new LiveDataDto("87", "Excellent", "Layou River Monitoring Point"));
        
        // Temperature data
        metricsData.put("temperature", new LiveDataDto("27.5", "°C", "Canefield Airport Vicinity"));
        
        return ResponseEntity.ok(metricsData);
    }

    /**
     * Get enhanced live data with real NCDC climate integration.
     * @return Combined environmental data from NCDC and local sources.
     */
    @GetMapping("/enhanced")
    public CompletableFuture<ResponseEntity<String>> getEnhancedLiveData() {
        // Get real NCDC data and combine with local metrics
        return ncdcClimateService.getCurrentYearClimateData("GHCND", null)
                .thenApply(ncdcData -> {
                    // Create enhanced response combining NCDC and local data
                    String enhancedData = "{\"enhanced_live_data\": {" +
                            "\"ncdc_climate_data\": " + ncdcData + ", " +
                            "\"local_metrics\": {" +
                                "\"aqi\": {\"value\": \"42\", \"status\": \"Good\", \"location\": \"Roseau Capital\"}," +
                                "\"water_quality\": {\"value\": \"87\", \"status\": \"Excellent\", \"location\": \"Layou River\"}," +
                                "\"temperature\": {\"value\": \"27.5\", \"unit\": \"°C\", \"location\": \"Canefield Airport\"}" +
                            "}," +
                            "\"data_sources\": [\"NOAA NCDC\", \"Local Sensors\"]," +
                            "\"last_updated\": \"" + java.time.LocalDateTime.now() + "\"" +
                            "}}";
                    
                    return ResponseEntity.ok()
                            .header("Content-Type", "application/json")
                            .body(enhancedData);
                })
                .exceptionally(ex -> {
                    // Fallback to local data if NCDC fails
                    String fallbackData = "{\"enhanced_live_data\": {" +
                            "\"error\": \"NCDC data temporarily unavailable\"," +
                            "\"local_metrics\": {" +
                                "\"aqi\": {\"value\": \"42\", \"status\": \"Good\", \"location\": \"Roseau Capital\"}," +
                                "\"water_quality\": {\"value\": \"87\", \"status\": \"Excellent\", \"location\": \"Layou River\"}," +
                                "\"temperature\": {\"value\": \"27.5\", \"unit\": \"°C\", \"location\": \"Canefield Airport\"}" +
                            "}," +
                            "\"fallback\": true" +
                            "}}";
                    
                    return ResponseEntity.ok()
                            .header("Content-Type", "application/json")
                            .body(fallbackData);
                });
    }
}