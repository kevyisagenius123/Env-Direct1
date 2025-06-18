package com.example.climatebackend.controller;

import com.example.climatebackend.dto.ClimateDataSummaryDto;
import com.example.climatebackend.dto.RegionClimateData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Controller for climate data dashboard.
 * Provides aggregated climate data for visualization.
 */
@RestController
@RequestMapping("/api/dashboard")
public class ClimateDataDashboardController {

    private final ClimateController climateController;

    @Autowired
    public ClimateDataDashboardController(ClimateController climateController) {
        this.climateController = climateController;
    }

    /**
     * Get aggregated climate data for all regions.
     * 
     * @return ResponseEntity with climate data summary
     */
    @GetMapping("/summary")
    public ResponseEntity<ClimateDataSummaryDto> getClimateSummary() {
        // Get all region names from the ClimateController
        Map<String, RegionClimateData> allRegionData = getAllRegionData();
        
        if (allRegionData.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        ClimateDataSummaryDto summary = new ClimateDataSummaryDto();
        
        // Calculate average values
        calculateAverages(allRegionData, summary);
        
        // Set region risk scores
        Map<String, Integer> regionRiskScores = allRegionData.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().getRiskScore()));
        summary.setRegionRiskScores(regionRiskScores);
        
        // Find regions with highest and lowest risk
        findHighestAndLowestRiskRegions(regionRiskScores, summary);
        
        // Set years (assuming all regions have the same years)
        RegionClimateData firstRegion = allRegionData.values().iterator().next();
        summary.setYears(firstRegion.getYears());
        
        // Set trends for temperature, rainfall, and deforestation
        setTemperatureTrends(allRegionData, summary);
        setRainfallTrends(allRegionData, summary);
        setDeforestationTrends(allRegionData, summary);
        
        // Calculate change rates
        calculateChangeRates(allRegionData, summary);
        
        return ResponseEntity.ok(summary);
    }

    /**
     * Get all region data from the ClimateController.
     * 
     * @return Map of region names to RegionClimateData
     */
    private Map<String, RegionClimateData> getAllRegionData() {
        Map<String, RegionClimateData> allRegionData = new HashMap<>();
        
        // Get data for each region
        for (String regionName : getRegionNames()) {
            ResponseEntity<RegionClimateData> response = climateController.getRegionClimateData(regionName);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                allRegionData.put(regionName, response.getBody());
            }
        }
        
        return allRegionData;
    }

    /**
     * Get all region names.
     * 
     * @return List of region names
     */
    private List<String> getRegionNames() {
        return Arrays.asList(
            "Roseau", "Portsmouth", "Marigot", "Saint Patrick", 
            "Saint David", "Saint Peter", "Saint Joseph", 
            "Saint Paul", "Saint Luke", "Saint Mark"
        );
    }

    /**
     * Calculate average values for temperature, rainfall, deforestation, and risk score.
     * 
     * @param allRegionData Map of region names to RegionClimateData
     * @param summary ClimateDataSummaryDto to update
     */
    private void calculateAverages(Map<String, RegionClimateData> allRegionData, ClimateDataSummaryDto summary) {
        double totalTemperature = 0;
        double totalRainfall = 0;
        double totalDeforestation = 0;
        double totalRiskScore = 0;
        
        for (RegionClimateData data : allRegionData.values()) {
            // Get the most recent values for each metric
            List<Double> temperatures = data.getTemperature();
            List<Double> rainfalls = data.getRainfall();
            List<Double> deforestations = data.getDeforestation();
            
            if (!temperatures.isEmpty()) {
                totalTemperature += temperatures.get(temperatures.size() - 1);
            }
            
            if (!rainfalls.isEmpty()) {
                totalRainfall += rainfalls.get(rainfalls.size() - 1);
            }
            
            if (!deforestations.isEmpty()) {
                totalDeforestation += deforestations.get(deforestations.size() - 1);
            }
            
            totalRiskScore += data.getRiskScore();
        }
        
        int regionCount = allRegionData.size();
        summary.setAverageTemperature(totalTemperature / regionCount);
        summary.setAverageRainfall(totalRainfall / regionCount);
        summary.setAverageDeforestation(totalDeforestation / regionCount);
        summary.setAverageRiskScore(totalRiskScore / regionCount);
    }

    /**
     * Find regions with highest and lowest risk scores.
     * 
     * @param regionRiskScores Map of region names to risk scores
     * @param summary ClimateDataSummaryDto to update
     */
    private void findHighestAndLowestRiskRegions(Map<String, Integer> regionRiskScores, ClimateDataSummaryDto summary) {
        if (regionRiskScores.isEmpty()) {
            return;
        }
        
        String highestRiskRegion = null;
        String lowestRiskRegion = null;
        int highestRisk = Integer.MIN_VALUE;
        int lowestRisk = Integer.MAX_VALUE;
        
        for (Map.Entry<String, Integer> entry : regionRiskScores.entrySet()) {
            if (entry.getValue() > highestRisk) {
                highestRisk = entry.getValue();
                highestRiskRegion = entry.getKey();
            }
            
            if (entry.getValue() < lowestRisk) {
                lowestRisk = entry.getValue();
                lowestRiskRegion = entry.getKey();
            }
        }
        
        summary.setRegionWithHighestRisk(highestRiskRegion);
        summary.setRegionWithLowestRisk(lowestRiskRegion);
    }

    /**
     * Set temperature trends for all regions.
     * 
     * @param allRegionData Map of region names to RegionClimateData
     * @param summary ClimateDataSummaryDto to update
     */
    private void setTemperatureTrends(Map<String, RegionClimateData> allRegionData, ClimateDataSummaryDto summary) {
        Map<String, List<Double>> temperatureTrends = new HashMap<>();
        
        for (Map.Entry<String, RegionClimateData> entry : allRegionData.entrySet()) {
            temperatureTrends.put(entry.getKey(), entry.getValue().getTemperature());
        }
        
        summary.setTemperatureTrends(temperatureTrends);
    }

    /**
     * Set rainfall trends for all regions.
     * 
     * @param allRegionData Map of region names to RegionClimateData
     * @param summary ClimateDataSummaryDto to update
     */
    private void setRainfallTrends(Map<String, RegionClimateData> allRegionData, ClimateDataSummaryDto summary) {
        Map<String, List<Double>> rainfallTrends = new HashMap<>();
        
        for (Map.Entry<String, RegionClimateData> entry : allRegionData.entrySet()) {
            rainfallTrends.put(entry.getKey(), entry.getValue().getRainfall());
        }
        
        summary.setRainfallTrends(rainfallTrends);
    }

    /**
     * Set deforestation trends for all regions.
     * 
     * @param allRegionData Map of region names to RegionClimateData
     * @param summary ClimateDataSummaryDto to update
     */
    private void setDeforestationTrends(Map<String, RegionClimateData> allRegionData, ClimateDataSummaryDto summary) {
        Map<String, List<Double>> deforestationTrends = new HashMap<>();
        
        for (Map.Entry<String, RegionClimateData> entry : allRegionData.entrySet()) {
            deforestationTrends.put(entry.getKey(), entry.getValue().getDeforestation());
        }
        
        summary.setDeforestationTrends(deforestationTrends);
    }

    /**
     * Calculate change rates for temperature, rainfall, and deforestation.
     * 
     * @param allRegionData Map of region names to RegionClimateData
     * @param summary ClimateDataSummaryDto to update
     */
    private void calculateChangeRates(Map<String, RegionClimateData> allRegionData, ClimateDataSummaryDto summary) {
        double totalTemperatureChangeRate = 0;
        double totalRainfallChangeRate = 0;
        double totalDeforestationChangeRate = 0;
        int regionCount = 0;
        
        for (RegionClimateData data : allRegionData.values()) {
            List<Double> temperatures = data.getTemperature();
            List<Double> rainfalls = data.getRainfall();
            List<Double> deforestations = data.getDeforestation();
            
            if (temperatures.size() >= 2) {
                double firstTemperature = temperatures.get(0);
                double lastTemperature = temperatures.get(temperatures.size() - 1);
                totalTemperatureChangeRate += (lastTemperature - firstTemperature) / firstTemperature * 100;
            }
            
            if (rainfalls.size() >= 2) {
                double firstRainfall = rainfalls.get(0);
                double lastRainfall = rainfalls.get(rainfalls.size() - 1);
                totalRainfallChangeRate += (lastRainfall - firstRainfall) / firstRainfall * 100;
            }
            
            if (deforestations.size() >= 2) {
                double firstDeforestation = deforestations.get(0);
                double lastDeforestation = deforestations.get(deforestations.size() - 1);
                totalDeforestationChangeRate += (lastDeforestation - firstDeforestation) / firstDeforestation * 100;
            }
            
            regionCount++;
        }
        
        if (regionCount > 0) {
            summary.setTemperatureChangeRate(totalTemperatureChangeRate / regionCount);
            summary.setRainfallChangeRate(totalRainfallChangeRate / regionCount);
            summary.setDeforestationChangeRate(totalDeforestationChangeRate / regionCount);
        }
    }

    /**
     * Get climate data for a specific metric across all regions.
     * 
     * @param metric The metric to get data for (temperature, rainfall, deforestation)
     * @return ResponseEntity with metric data
     */
    @GetMapping("/metric")
    public ResponseEntity<Map<String, Object>> getMetricData(String metric) {
        Map<String, RegionClimateData> allRegionData = getAllRegionData();
        
        if (allRegionData.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        Map<String, Object> response = new HashMap<>();
        Map<String, List<Double>> metricData = new HashMap<>();
        List<Integer> years = null;
        
        for (Map.Entry<String, RegionClimateData> entry : allRegionData.entrySet()) {
            RegionClimateData data = entry.getValue();
            
            if (years == null) {
                years = data.getYears();
            }
            
            switch (metric.toLowerCase()) {
                case "temperature":
                    metricData.put(entry.getKey(), data.getTemperature());
                    break;
                case "rainfall":
                    metricData.put(entry.getKey(), data.getRainfall());
                    break;
                case "deforestation":
                    metricData.put(entry.getKey(), data.getDeforestation());
                    break;
                default:
                    return ResponseEntity.badRequest().build();
            }
        }
        
        response.put("metric", metric);
        response.put("years", years);
        response.put("data", metricData);
        
        return ResponseEntity.ok(response);
    }
}