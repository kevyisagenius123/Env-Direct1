package com.environmentdirect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import com.environmentdirect.dto.LiveDataDto;

/**
 * Controller for providing live environmental data.
 * This endpoint serves data for the LiveDataDashboardSection component in the frontend.
 */
@RestController
@RequestMapping("/api/live-data")
public class LiveDataController {

    /**
     * Get current environmental metrics data.
     * @return A map containing metrics data for air quality, water quality, and temperature.
     */
    @GetMapping
    public ResponseEntity<Map<String, LiveDataDto>> getLiveData() {
        // In a real application, this data would come from sensors, external APIs, or a database
        Map<String, LiveDataDto> metricsData = new HashMap<>();
        
        // Air Quality Index data
        metricsData.put("aqi", new LiveDataDto("42", "Good", "Roseau Capital Average"));
        
        // Water Quality data
        metricsData.put("waterQuality", new LiveDataDto("87", "Excellent", "Layou River Monitoring Point"));
        
        // Temperature data
        metricsData.put("temperature", new LiveDataDto("27.5", "°C", "Canefield Airport Vicinity"));
        
        return ResponseEntity.ok(metricsData);
    }
}