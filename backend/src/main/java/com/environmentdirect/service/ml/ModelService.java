package com.environmentdirect.service.ml;

import org.apache.commons.math3.stat.regression.SimpleRegression;
import org.apache.commons.math3.stat.regression.OLSMultipleLinearRegression;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDate;

/**
 * Service for managing and using machine learning models.
 * This service provides methods for training, loading, and using ML models for predictions.
 */
@Service
public class ModelService {
    
    private static final Logger logger = LoggerFactory.getLogger(ModelService.class);
    
    // Store trained models in memory
    private final Map<String, Object> trainedModels = new HashMap<>();
    
    /**
     * Initialize the service and load pre-trained models.
     */
    public ModelService() {
        initializeModels();
    }
    
    /**
     * Initialize and train models.
     * In a production environment, these would be loaded from saved model files.
     */
    private void initializeModels() {
        try {
            // Train flood risk prediction model
            trainFloodRiskModel();
            
            // Train eco-tourism prediction model
            trainEcoTourismModel();
            
            logger.info("ML models initialized successfully");
        } catch (Exception e) {
            logger.error("Error initializing ML models", e);
        }
    }
    
    /**
     * Train a model for flood risk prediction.
     */
    private void trainFloodRiskModel() {
        // Create a multiple linear regression model for flood risk
        OLSMultipleLinearRegression model = new OLSMultipleLinearRegression();
        
        // Sample training data (in a real app, this would come from a database)
        // Format: [rainfall, temperature, elevation, soil_saturation, historical_risk]
        double[][] features = new double[][] {
            {120, 28, 50, 0.8, 3},   // High risk
            {100, 27, 60, 0.7, 3},   // High risk
            {80, 26, 100, 0.6, 2},   // Moderate risk
            {60, 25, 150, 0.5, 2},   // Moderate risk
            {40, 24, 200, 0.4, 1},   // Low risk
            {20, 23, 250, 0.3, 1},   // Low risk
            {10, 22, 300, 0.2, 1},   // Low risk
            {150, 30, 30, 0.9, 4},   // Very high risk
            {5, 20, 350, 0.1, 0}     // Very low risk
        };
        
        // Target values (risk level: 0-4)
        double[] targets = new double[] {3, 3, 2, 2, 1, 1, 1, 4, 0};
        
        // Train the model
        model.newSampleData(targets, features);
        
        // Store the trained model
        trainedModels.put("floodRiskModel", model);
        logger.info("Flood risk prediction model trained successfully");
    }
    
    /**
     * Train a model for eco-tourism visitor load prediction.
     */
    private void trainEcoTourismModel() {
        // Create a simple regression model for each site
        Map<String, SimpleRegression> siteModels = new HashMap<>();
        
        // Sample training data for Boiling Lake
        SimpleRegression boilingLakeModel = new SimpleRegression();
        // Format: [season_factor, day_of_week_factor] -> visitor_load
        boilingLakeModel.addData(1.5, 3); // High season, weekend -> high load
        boilingLakeModel.addData(1.3, 2); // High season, weekday -> moderate load
        boilingLakeModel.addData(1.0, 2); // Regular season, weekend -> moderate load
        boilingLakeModel.addData(0.8, 1); // Regular season, weekday -> low load
        siteModels.put("boiling-lake", boilingLakeModel);
        
        // Sample training data for Trafalgar Falls
        SimpleRegression trafalgarFallsModel = new SimpleRegression();
        trafalgarFallsModel.addData(1.5, 4); // High season, weekend -> very high load
        trafalgarFallsModel.addData(1.3, 3); // High season, weekday -> high load
        trafalgarFallsModel.addData(1.0, 3); // Regular season, weekend -> high load
        trafalgarFallsModel.addData(0.8, 2); // Regular season, weekday -> moderate load
        siteModels.put("trafalgar-falls", trafalgarFallsModel);
        
        // Add more site models as needed
        
        // Store the trained models
        trainedModels.put("ecoTourismModels", siteModels);
        logger.info("Eco-tourism prediction models trained successfully");
    }
    
    /**
     * Predict flood risk level for a specific region.
     * 
     * @param rainfall Recent rainfall in mm
     * @param temperature Current temperature in Celsius
     * @param elevation Elevation in meters
     * @param soilSaturation Soil saturation factor (0-1)
     * @param historicalRisk Historical risk level (0-4)
     * @return Predicted risk level (0-4)
     */
    public int predictFloodRisk(double rainfall, double temperature, double elevation, 
                               double soilSaturation, double historicalRisk) {
        try {
            OLSMultipleLinearRegression model = (OLSMultipleLinearRegression) trainedModels.get("floodRiskModel");
            
            if (model == null) {
                logger.error("Flood risk model not found");
                return -1;
            }
            
            // Create feature vector
            double[] features = new double[] {rainfall, temperature, elevation, soilSaturation, historicalRisk};
            
            // Get model parameters
            double[] params = model.estimateRegressionParameters();
            
            // Calculate prediction (intercept + sum of feature*coefficient)
            double prediction = params[0]; // Intercept
            for (int i = 0; i < features.length; i++) {
                prediction += features[i] * params[i + 1];
            }
            
            // Round to nearest integer and ensure it's in the range 0-4
            int riskLevel = (int) Math.round(prediction);
            return Math.max(0, Math.min(4, riskLevel));
            
        } catch (Exception e) {
            logger.error("Error predicting flood risk", e);
            return -1;
        }
    }
    
    /**
     * Predict visitor load for a specific eco-tourism site.
     * 
     * @param siteId The identifier for the tourism site
     * @param seasonFactor Season factor (higher in peak tourist season)
     * @param isWeekend Whether the prediction is for a weekend
     * @return Predicted visitor load level (0-4)
     */
    public int predictVisitorLoad(String siteId, double seasonFactor, boolean isWeekend) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, SimpleRegression> siteModels = 
                (Map<String, SimpleRegression>) trainedModels.get("ecoTourismModels");
            
            if (siteModels == null || !siteModels.containsKey(siteId)) {
                logger.error("Eco-tourism model not found for site: {}", siteId);
                return -1;
            }
            
            SimpleRegression model = siteModels.get(siteId);
            
            // Use season factor and weekend factor (1 for weekday, 1.5 for weekend)
            double dayFactor = isWeekend ? 1.5 : 1.0;
            double combinedFactor = seasonFactor * dayFactor;
            
            // Predict visitor load
            double prediction = model.predict(combinedFactor);
            
            // Round to nearest integer and ensure it's in the range 0-4
            int loadLevel = (int) Math.round(prediction);
            return Math.max(0, Math.min(4, loadLevel));
            
        } catch (Exception e) {
            logger.error("Error predicting visitor load for site: {}", siteId, e);
            return -1;
        }
    }
    
    /**
     * Get the confidence score for a prediction.
     * 
     * @param modelType The type of model ("floodRisk" or "ecoTourism")
     * @param id The identifier (region or site id)
     * @return Confidence score between 0 and 1
     */
    public double getPredictionConfidence(String modelType, String id) {
        // In a real application, this would be based on model metrics
        // For this example, we'll return a fixed confidence score
        if ("floodRisk".equals(modelType)) {
            return 0.85; // 85% confidence for flood risk predictions
        } else if ("ecoTourism".equals(modelType)) {
            return 0.80; // 80% confidence for eco-tourism predictions
        } else {
            return 0.70; // Default confidence
        }
    }
}