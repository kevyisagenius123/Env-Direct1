package com.environmentdirect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for providing environmental dashboard data.
 * This endpoint serves data for the EnvDashboardPage.jsx component in the frontend.
 */
@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://wonderful-boba-48e576.netlify.app"
})
public class DashboardController {

    /**
     * Get Dominica dashboard data.
     * @return A map containing dashboard data for Dominica.
     */
    @GetMapping("/dominica")
    public ResponseEntity<Map<String, Object>> getDominicaDashboardData() {
        Map<String, Object> response = new HashMap<>();
        
        // Add metadata
        response.put("region", "Dominica");
        response.put("lastUpdated", java.time.Instant.now().toString());
        
        // Add summary cards data
        List<Map<String, Object>> summaryCards = new ArrayList<>();
        
        // Air Quality Index card
        Map<String, Object> aqiCard = new HashMap<>();
        aqiCard.put("id", "aqi");
        aqiCard.put("title", "Air Quality Index (AQI)");
        aqiCard.put("value", "45");
        aqiCard.put("unit", "Good");
        aqiCard.put("trend", "improving");
        aqiCard.put("details", "Roseau Area");
        summaryCards.add(aqiCard);
        
        // Water Purity card
        Map<String, Object> waterCard = new HashMap<>();
        waterCard.put("id", "waterPurity");
        waterCard.put("title", "Water Purity (TDS)");
        waterCard.put("value", "120");
        waterCard.put("unit", "ppm");
        waterCard.put("trend", "stable");
        waterCard.put("details", "Layou River");
        summaryCards.add(waterCard);
        
        // Recycling Rate card
        Map<String, Object> recyclingCard = new HashMap<>();
        recyclingCard.put("id", "recyclingRate");
        recyclingCard.put("title", "Recycling Rate");
        recyclingCard.put("value", "65");
        recyclingCard.put("unit", "%");
        recyclingCard.put("trend", "improving");
        recyclingCard.put("details", "Annual Target: 75%");
        summaryCards.add(recyclingCard);
        
        // Carbon Footprint card
        Map<String, Object> carbonCard = new HashMap<>();
        carbonCard.put("id", "carbonFootprint");
        carbonCard.put("title", "Carbon Footprint");
        carbonCard.put("value", "5.2");
        carbonCard.put("unit", "tCO2e/cap");
        carbonCard.put("trend", "reducing");
        carbonCard.put("details", "Compared to 5.3 last year");
        summaryCards.add(carbonCard);
        
        response.put("summaryCards", summaryCards);
        
        // Add chart data
        Map<String, Object> charts = new HashMap<>();
        
        // Air Quality Over Time chart
        Map<String, Object> airQualityChart = new HashMap<>();
        airQualityChart.put("title", "Air Quality Over Time (UV Index)");
        
        List<Map<String, Object>> airQualityData = new ArrayList<>();
        
        Map<String, Object> day1 = new HashMap<>();
        day1.put("name", "Mon");
        day1.put("uv", 400);
        day1.put("pv", 240);
        day1.put("amt", 240);
        airQualityData.add(day1);
        
        Map<String, Object> day2 = new HashMap<>();
        day2.put("name", "Tue");
        day2.put("uv", 300);
        day2.put("pv", 139);
        day2.put("amt", 221);
        airQualityData.add(day2);
        
        Map<String, Object> day3 = new HashMap<>();
        day3.put("name", "Wed");
        day3.put("uv", 200);
        day3.put("pv", 980);
        day3.put("amt", 229);
        airQualityData.add(day3);
        
        Map<String, Object> day4 = new HashMap<>();
        day4.put("name", "Thu");
        day4.put("uv", 278);
        day4.put("pv", 390);
        day4.put("amt", 200);
        airQualityData.add(day4);
        
        Map<String, Object> day5 = new HashMap<>();
        day5.put("name", "Fri");
        day5.put("uv", 189);
        day5.put("pv", 480);
        day5.put("amt", 218);
        airQualityData.add(day5);
        
        Map<String, Object> day6 = new HashMap<>();
        day6.put("name", "Sat");
        day6.put("uv", 239);
        day6.put("pv", 380);
        day6.put("amt", 250);
        airQualityData.add(day6);
        
        Map<String, Object> day7 = new HashMap<>();
        day7.put("name", "Sun");
        day7.put("uv", 349);
        day7.put("pv", 430);
        day7.put("amt", 210);
        airQualityData.add(day7);
        
        airQualityChart.put("data", airQualityData);
        charts.put("airQualityOverTime", airQualityChart);
        
        // Add placeholder for Water Quality Trends chart
        Map<String, Object> waterQualityChart = new HashMap<>();
        waterQualityChart.put("title", "Water Quality Trends");
        
        List<Map<String, Object>> waterQualityData = new ArrayList<>();
        waterQualityData.add(createWaterDataPoint("Mon", 7.0, 5));
        waterQualityData.add(createWaterDataPoint("Tue", 7.1, 4));
        waterQualityData.add(createWaterDataPoint("Wed", 6.9, 6));
        waterQualityData.add(createWaterDataPoint("Thu", 7.2, 5));
        waterQualityData.add(createWaterDataPoint("Fri", 7.0, 7));
        waterQualityData.add(createWaterDataPoint("Sat", 7.3, 4));
        waterQualityData.add(createWaterDataPoint("Sun", 7.1, 5));

        waterQualityChart.put("data", waterQualityData);
        charts.put("waterQualityTrends", waterQualityChart);
        
        response.put("charts", charts);
        
        return ResponseEntity.ok(response);
    }

    private Map<String, Object> createWaterDataPoint(String name, double ph, int turbidity) {
        Map<String, Object> dataPoint = new HashMap<>();
        dataPoint.put("name", name);
        dataPoint.put("ph", ph);
        dataPoint.put("turbidity", turbidity);
        return dataPoint;
    }
}