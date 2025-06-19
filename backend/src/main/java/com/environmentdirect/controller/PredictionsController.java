package com.environmentdirect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * Controller for providing environmental predictions and forecasts.
 * This endpoint serves data for the PredictionsSection component in the frontend.
 */
@RestController
@RequestMapping("/api/predictions")
public class PredictionsController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllPredictions() {
        List<Map<String, Object>> predictions = new ArrayList<>();
        
        // Sample prediction data
        Map<String, Object> prediction1 = new HashMap<>();
        prediction1.put("id", 1);
        prediction1.put("type", "Flood Risk Alert");
        prediction1.put("location", "Roseau Valley");
        prediction1.put("timeframe", "Next 48 hours");
        prediction1.put("prediction", "Moderate Risk");
        prediction1.put("details", "Heavy rainfall expected. Monitor water levels in low-lying areas.");
        prediction1.put("confidence", "85%");
        prediction1.put("iconName", "alert");
        
        Map<String, Object> colorTheme1 = new HashMap<>();
        colorTheme1.put("bg", "bg-orange-100 dark:bg-orange-900/30");
        colorTheme1.put("text", "text-orange-800 dark:text-orange-200");
        colorTheme1.put("border", "border-orange-300 dark:border-orange-600");
        prediction1.put("colorTheme", colorTheme1);
        
        Map<String, Object> prediction2 = new HashMap<>();
        prediction2.put("id", 2);
        prediction2.put("type", "Eco-Tourism Forecast");
        prediction2.put("location", "Morne Trois Pitons");
        prediction2.put("timeframe", "This Week");
        prediction2.put("prediction", "Excellent Conditions");
        prediction2.put("details", "Clear skies and optimal temperatures for hiking and wildlife viewing.");
        prediction2.put("confidence", "92%");
        prediction2.put("iconName", "chart");
        
        Map<String, Object> colorTheme2 = new HashMap<>();
        colorTheme2.put("bg", "bg-green-100 dark:bg-green-900/30");
        colorTheme2.put("text", "text-green-800 dark:text-green-200");
        colorTheme2.put("border", "border-green-300 dark:border-green-600");
        prediction2.put("colorTheme", colorTheme2);
        
        Map<String, Object> prediction3 = new HashMap<>();
        prediction3.put("id", 3);
        prediction3.put("type", "Marine Conditions");
        prediction3.put("location", "Portsmouth Bay");
        prediction3.put("timeframe", "Today");
        prediction3.put("prediction", "Calm Waters");
        prediction3.put("details", "Perfect conditions for whale watching and diving activities.");
        prediction3.put("confidence", "88%");
        prediction3.put("iconName", "chart");
        
        Map<String, Object> colorTheme3 = new HashMap<>();
        colorTheme3.put("bg", "bg-blue-100 dark:bg-blue-900/30");
        colorTheme3.put("text", "text-blue-800 dark:text-blue-200");
        colorTheme3.put("border", "border-blue-300 dark:border-blue-600");
        prediction3.put("colorTheme", colorTheme3);
        
        predictions.add(prediction1);
        predictions.add(prediction2);
        predictions.add(prediction3);
        
        return ResponseEntity.ok(predictions);
    }

    @GetMapping("/eco-tourism")
    public ResponseEntity<List<Map<String, Object>>> getAllEcoTourismPredictions() {
        return ResponseEntity.ok(Collections.emptyList());
    }

    @GetMapping("/flood-risk")
    public ResponseEntity<List<Map<String, Object>>> getAllFloodRiskPredictions() {
        return ResponseEntity.ok(Collections.emptyList());
    }
}
