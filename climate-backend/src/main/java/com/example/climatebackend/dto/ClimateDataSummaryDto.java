package com.example.climatebackend.dto;

import java.util.List;
import java.util.Map;

/**
 * DTO for climate data summary.
 * Contains aggregated climate data for visualization in a dashboard.
 */
public class ClimateDataSummaryDto {
    private double averageTemperature;
    private double averageRainfall;
    private double averageDeforestation;
    private double averageRiskScore;
    private Map<String, Integer> regionRiskScores;
    private List<Integer> years;
    private Map<String, List<Double>> temperatureTrends;
    private Map<String, List<Double>> rainfallTrends;
    private Map<String, List<Double>> deforestationTrends;
    private String regionWithHighestRisk;
    private String regionWithLowestRisk;
    private double temperatureChangeRate;
    private double rainfallChangeRate;
    private double deforestationChangeRate;

    // Constructors
    public ClimateDataSummaryDto() {
    }

    // Getters and Setters
    public double getAverageTemperature() {
        return averageTemperature;
    }

    public void setAverageTemperature(double averageTemperature) {
        this.averageTemperature = averageTemperature;
    }

    public double getAverageRainfall() {
        return averageRainfall;
    }

    public void setAverageRainfall(double averageRainfall) {
        this.averageRainfall = averageRainfall;
    }

    public double getAverageDeforestation() {
        return averageDeforestation;
    }

    public void setAverageDeforestation(double averageDeforestation) {
        this.averageDeforestation = averageDeforestation;
    }

    public double getAverageRiskScore() {
        return averageRiskScore;
    }

    public void setAverageRiskScore(double averageRiskScore) {
        this.averageRiskScore = averageRiskScore;
    }

    public Map<String, Integer> getRegionRiskScores() {
        return regionRiskScores;
    }

    public void setRegionRiskScores(Map<String, Integer> regionRiskScores) {
        this.regionRiskScores = regionRiskScores;
    }

    public List<Integer> getYears() {
        return years;
    }

    public void setYears(List<Integer> years) {
        this.years = years;
    }

    public Map<String, List<Double>> getTemperatureTrends() {
        return temperatureTrends;
    }

    public void setTemperatureTrends(Map<String, List<Double>> temperatureTrends) {
        this.temperatureTrends = temperatureTrends;
    }

    public Map<String, List<Double>> getRainfallTrends() {
        return rainfallTrends;
    }

    public void setRainfallTrends(Map<String, List<Double>> rainfallTrends) {
        this.rainfallTrends = rainfallTrends;
    }

    public Map<String, List<Double>> getDeforestationTrends() {
        return deforestationTrends;
    }

    public void setDeforestationTrends(Map<String, List<Double>> deforestationTrends) {
        this.deforestationTrends = deforestationTrends;
    }

    public String getRegionWithHighestRisk() {
        return regionWithHighestRisk;
    }

    public void setRegionWithHighestRisk(String regionWithHighestRisk) {
        this.regionWithHighestRisk = regionWithHighestRisk;
    }

    public String getRegionWithLowestRisk() {
        return regionWithLowestRisk;
    }

    public void setRegionWithLowestRisk(String regionWithLowestRisk) {
        this.regionWithLowestRisk = regionWithLowestRisk;
    }

    public double getTemperatureChangeRate() {
        return temperatureChangeRate;
    }

    public void setTemperatureChangeRate(double temperatureChangeRate) {
        this.temperatureChangeRate = temperatureChangeRate;
    }

    public double getRainfallChangeRate() {
        return rainfallChangeRate;
    }

    public void setRainfallChangeRate(double rainfallChangeRate) {
        this.rainfallChangeRate = rainfallChangeRate;
    }

    public double getDeforestationChangeRate() {
        return deforestationChangeRate;
    }

    public void setDeforestationChangeRate(double deforestationChangeRate) {
        this.deforestationChangeRate = deforestationChangeRate;
    }
}