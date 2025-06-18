package com.example.climatebackend.dto;

import java.util.List;

public class RegionClimateData {
    private String name;
    private List<Integer> years;
    private List<Double> temperature;
    private List<Double> rainfall;
    private List<Double> deforestation;
    private int riskScore;

    // Constructors
    public RegionClimateData() {
    }

    public RegionClimateData(String name, List<Integer> years, List<Double> temperature, List<Double> rainfall, List<Double> deforestation, int riskScore) {
        this.name = name;
        this.years = years;
        this.temperature = temperature;
        this.rainfall = rainfall;
        this.deforestation = deforestation;
        this.riskScore = riskScore;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getYears() {
        return years;
    }

    public void setYears(List<Integer> years) {
        this.years = years;
    }

    public List<Double> getTemperature() {
        return temperature;
    }

    public void setTemperature(List<Double> temperature) {
        this.temperature = temperature;
    }

    public List<Double> getRainfall() {
        return rainfall;
    }

    public void setRainfall(List<Double> rainfall) {
        this.rainfall = rainfall;
    }

    public List<Double> getDeforestation() {
        return deforestation;
    }

    public void setDeforestation(List<Double> deforestation) {
        this.deforestation = deforestation;
    }

    public int getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(int riskScore) {
        this.riskScore = riskScore;
    }
} 