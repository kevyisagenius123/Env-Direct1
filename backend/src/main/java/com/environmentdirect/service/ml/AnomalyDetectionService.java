package com.environmentdirect.service.ml;

import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;
import org.apache.commons.math3.stat.correlation.PearsonsCorrelation;
import org.apache.commons.math3.ml.distance.EuclideanDistance;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.time.LocalDate;

/**
 * Service for detecting anomalies in environmental data.
 * This service provides methods for identifying unusual patterns or outliers.
 */
@Service
public class AnomalyDetectionService {
    
    private static final Logger logger = LoggerFactory.getLogger(AnomalyDetectionService.class);
    
    // Threshold for Z-score based anomaly detection
    private static final double Z_SCORE_THRESHOLD = 2.5;
    
    // Threshold for IQR-based anomaly detection
    private static final double IQR_MULTIPLIER = 1.5;
    
    /**
     * Detect anomalies in a time series using Z-score method.
     * Points with Z-scores above the threshold are considered anomalies.
     * 
     * @param timeSeries Array of data points
     * @return List of indices where anomalies were detected
     */
    public List<Integer> detectAnomaliesZScore(double[] timeSeries) {
        List<Integer> anomalies = new ArrayList<>();
        
        try {
            // Calculate statistics
            DescriptiveStatistics stats = new DescriptiveStatistics(timeSeries);
            double mean = stats.getMean();
            double stdDev = stats.getStandardDeviation();
            
            // Check for anomalies
            for (int i = 0; i < timeSeries.length; i++) {
                double zScore = Math.abs((timeSeries[i] - mean) / stdDev);
                if (zScore > Z_SCORE_THRESHOLD) {
                    anomalies.add(i);
                    logger.debug("Anomaly detected at index {} with Z-score {}", i, zScore);
                }
            }
        } catch (Exception e) {
            logger.error("Error detecting anomalies using Z-score method", e);
        }
        
        return anomalies;
    }
    
    /**
     * Detect anomalies in a time series using IQR (Interquartile Range) method.
     * Points outside Q1 - IQR_MULTIPLIER*IQR and Q3 + IQR_MULTIPLIER*IQR are considered anomalies.
     * 
     * @param timeSeries Array of data points
     * @return List of indices where anomalies were detected
     */
    public List<Integer> detectAnomaliesIQR(double[] timeSeries) {
        List<Integer> anomalies = new ArrayList<>();
        
        try {
            // Sort the data for quartile calculation
            double[] sortedData = Arrays.copyOf(timeSeries, timeSeries.length);
            Arrays.sort(sortedData);
            
            // Calculate quartiles
            double q1 = sortedData[(int) (sortedData.length * 0.25)];
            double q3 = sortedData[(int) (sortedData.length * 0.75)];
            double iqr = q3 - q1;
            
            // Calculate bounds
            double lowerBound = q1 - (IQR_MULTIPLIER * iqr);
            double upperBound = q3 + (IQR_MULTIPLIER * iqr);
            
            // Check for anomalies
            for (int i = 0; i < timeSeries.length; i++) {
                if (timeSeries[i] < lowerBound || timeSeries[i] > upperBound) {
                    anomalies.add(i);
                    logger.debug("Anomaly detected at index {} with value {} outside bounds [{}, {}]", 
                                i, timeSeries[i], lowerBound, upperBound);
                }
            }
        } catch (Exception e) {
            logger.error("Error detecting anomalies using IQR method", e);
        }
        
        return anomalies;
    }
    
    /**
     * Detect anomalies in a multivariate time series using Mahalanobis distance.
     * This is a simplified implementation that uses Euclidean distance instead.
     * 
     * @param multiTimeSeries Array of multivariate data points
     * @param distanceThreshold Threshold for anomaly detection
     * @return List of indices where anomalies were detected
     */
    public List<Integer> detectMultivariateAnomalies(double[][] multiTimeSeries, double distanceThreshold) {
        List<Integer> anomalies = new ArrayList<>();
        
        try {
            // Calculate mean vector
            int dimensions = multiTimeSeries[0].length;
            double[] meanVector = new double[dimensions];
            
            for (double[] point : multiTimeSeries) {
                for (int i = 0; i < dimensions; i++) {
                    meanVector[i] += point[i];
                }
            }
            
            for (int i = 0; i < dimensions; i++) {
                meanVector[i] /= multiTimeSeries.length;
            }
            
            // Calculate distances from mean
            EuclideanDistance distance = new EuclideanDistance();
            
            for (int i = 0; i < multiTimeSeries.length; i++) {
                double dist = distance.compute(multiTimeSeries[i], meanVector);
                if (dist > distanceThreshold) {
                    anomalies.add(i);
                    logger.debug("Multivariate anomaly detected at index {} with distance {}", i, dist);
                }
            }
        } catch (Exception e) {
            logger.error("Error detecting multivariate anomalies", e);
        }
        
        return anomalies;
    }
    
    /**
     * Detect seasonal anomalies in time series data.
     * This method compares current values with historical values from the same season.
     * 
     * @param currentData Current time series data
     * @param historicalData Historical time series data for the same season
     * @param sensitivityThreshold Threshold for anomaly detection (0-1)
     * @return List of indices in currentData where anomalies were detected
     */
    public List<Integer> detectSeasonalAnomalies(double[] currentData, double[] historicalData, 
                                               double sensitivityThreshold) {
        List<Integer> anomalies = new ArrayList<>();
        
        try {
            // Calculate statistics for historical data
            DescriptiveStatistics stats = new DescriptiveStatistics(historicalData);
            double mean = stats.getMean();
            double stdDev = stats.getStandardDeviation();
            
            // Calculate adaptive threshold based on sensitivity
            double threshold = Z_SCORE_THRESHOLD * (2.0 - sensitivityThreshold);
            
            // Check for anomalies in current data compared to historical patterns
            for (int i = 0; i < currentData.length; i++) {
                double zScore = Math.abs((currentData[i] - mean) / stdDev);
                if (zScore > threshold) {
                    anomalies.add(i);
                    logger.debug("Seasonal anomaly detected at index {} with Z-score {}", i, zScore);
                }
            }
        } catch (Exception e) {
            logger.error("Error detecting seasonal anomalies", e);
        }
        
        return anomalies;
    }
    
    /**
     * Detect change points in a time series.
     * Change points are where the statistical properties of the time series change.
     * 
     * @param timeSeries Array of data points
     * @param windowSize Size of the sliding window
     * @return List of indices where change points were detected
     */
    public List<Integer> detectChangePoints(double[] timeSeries, int windowSize) {
        List<Integer> changePoints = new ArrayList<>();
        
        try {
            if (timeSeries.length < windowSize * 2) {
                logger.warn("Time series too short for change point detection with window size {}", windowSize);
                return changePoints;
            }
            
            // Sliding window approach
            for (int i = windowSize; i < timeSeries.length - windowSize; i++) {
                // Get windows before and after current point
                double[] windowBefore = Arrays.copyOfRange(timeSeries, i - windowSize, i);
                double[] windowAfter = Arrays.copyOfRange(timeSeries, i, i + windowSize);
                
                // Calculate statistics for both windows
                DescriptiveStatistics statsBefore = new DescriptiveStatistics(windowBefore);
                DescriptiveStatistics statsAfter = new DescriptiveStatistics(windowAfter);
                
                double meanBefore = statsBefore.getMean();
                double meanAfter = statsAfter.getMean();
                
                // Calculate relative change in mean
                double relativeChange = Math.abs((meanAfter - meanBefore) / meanBefore);
                
                // If relative change is significant, mark as change point
                if (relativeChange > 0.2) { // 20% change threshold
                    changePoints.add(i);
                    logger.debug("Change point detected at index {} with relative change {}", i, relativeChange);
                    
                    // Skip ahead to avoid detecting multiple change points in the same area
                    i += windowSize / 2;
                }
            }
        } catch (Exception e) {
            logger.error("Error detecting change points", e);
        }
        
        return changePoints;
    }
    
    /**
     * Analyze flood risk data for anomalies.
     * 
     * @param region The region to analyze
     * @param historicalData Historical flood risk data
     * @return Map containing anomaly information
     */
    public Map<String, Object> analyzeFloodRiskAnomalies(String region, List<Map<String, Object>> historicalData) {
        Map<String, Object> result = new HashMap<>();
        result.put("region", region);
        result.put("anomalyDetected", false);
        
        try {
            // Extract risk levels from historical data
            double[] riskLevels = new double[historicalData.size()];
            for (int i = 0; i < historicalData.size(); i++) {
                String riskLevel = (String) historicalData.get(i).get("floodRiskLevel");
                riskLevels[i] = convertRiskLevelToNumeric(riskLevel);
            }
            
            // Detect anomalies using Z-score method
            List<Integer> anomalies = detectAnomaliesZScore(riskLevels);
            
            if (!anomalies.isEmpty()) {
                result.put("anomalyDetected", true);
                result.put("anomalyIndices", anomalies);
                result.put("anomalyDates", getAnomalyDates(historicalData, anomalies));
                result.put("anomalyType", "Unusual flood risk pattern");
                result.put("description", "Detected unusual patterns in flood risk levels for " + region);
            }
            
            // Detect change points
            List<Integer> changePoints = detectChangePoints(riskLevels, 3);
            if (!changePoints.isEmpty()) {
                result.put("changePointsDetected", true);
                result.put("changePointIndices", changePoints);
                result.put("changePointDates", getAnomalyDates(historicalData, changePoints));
                result.put("changePointDescription", "Detected significant changes in flood risk pattern");
            }
            
        } catch (Exception e) {
            logger.error("Error analyzing flood risk anomalies for region: {}", region, e);
            result.put("error", "Error analyzing anomalies: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Analyze eco-tourism data for anomalies.
     * 
     * @param siteId The site to analyze
     * @param historicalData Historical visitor load data
     * @return Map containing anomaly information
     */
    public Map<String, Object> analyzeEcoTourismAnomalies(String siteId, List<Map<String, Object>> historicalData) {
        Map<String, Object> result = new HashMap<>();
        result.put("siteId", siteId);
        result.put("anomalyDetected", false);
        
        try {
            // Extract visitor loads from historical data
            double[] visitorLoads = new double[historicalData.size()];
            for (int i = 0; i < historicalData.size(); i++) {
                String loadLevel = (String) historicalData.get(i).get("expectedVisitorLoad");
                visitorLoads[i] = convertLoadLevelToNumeric(loadLevel);
            }
            
            // Detect anomalies using IQR method
            List<Integer> anomalies = detectAnomaliesIQR(visitorLoads);
            
            if (!anomalies.isEmpty()) {
                result.put("anomalyDetected", true);
                result.put("anomalyIndices", anomalies);
                result.put("anomalyDates", getAnomalyDates(historicalData, anomalies));
                result.put("anomalyType", "Unusual visitor load pattern");
                result.put("description", "Detected unusual patterns in visitor loads for " + siteId);
            }
            
            // Detect change points
            List<Integer> changePoints = detectChangePoints(visitorLoads, 3);
            if (!changePoints.isEmpty()) {
                result.put("changePointsDetected", true);
                result.put("changePointIndices", changePoints);
                result.put("changePointDates", getAnomalyDates(historicalData, changePoints));
                result.put("changePointDescription", "Detected significant changes in visitor load pattern");
            }
            
        } catch (Exception e) {
            logger.error("Error analyzing eco-tourism anomalies for site: {}", siteId, e);
            result.put("error", "Error analyzing anomalies: " + e.getMessage());
        }
        
        return result;
    }
    
    // Helper methods
    
    private double convertRiskLevelToNumeric(String riskLevel) {
        switch (riskLevel) {
            case "Very High": return 4.0;
            case "High": return 3.0;
            case "Moderate": return 2.0;
            case "Low": return 1.0;
            case "Very Low": return 0.0;
            default: return -1.0;
        }
    }
    
    private double convertLoadLevelToNumeric(String loadLevel) {
        switch (loadLevel) {
            case "Very High": return 4.0;
            case "High": return 3.0;
            case "Moderate": return 2.0;
            case "Low": return 1.0;
            case "Very Low": return 0.0;
            default: return -1.0;
        }
    }
    
    private List<String> getAnomalyDates(List<Map<String, Object>> historicalData, List<Integer> indices) {
        List<String> dates = new ArrayList<>();
        for (int index : indices) {
            if (index >= 0 && index < historicalData.size()) {
                dates.add((String) historicalData.get(index).get("date"));
            }
        }
        return dates;
    }
}