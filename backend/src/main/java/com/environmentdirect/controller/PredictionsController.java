package com.environmentdirect.controller;

import com.environmentdirect.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for providing environmental predictions and forecasts.
 * This endpoint serves data for the PredictionsSection component in the frontend.
 */
@RestController
@RequestMapping("/api/predictions")
public class PredictionsController {

    private final PredictionService predictionService;

    @Autowired
    public PredictionsController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    /**
     * Get environmental predictions data.
     * @return A list of prediction objects with various environmental forecasts.
     */
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getPredictions() {
        // In a real application, this data would come from prediction models, external APIs, or a database
        List<Map<String, Object>> predictions = new ArrayList<>();

        // AQI Prediction
        Map<String, Object> aqiPrediction = new HashMap<>();
        aqiPrediction.put("id", 1);
        aqiPrediction.put("type", "AQI Forecast");
        aqiPrediction.put("iconName", "alert");
        aqiPrediction.put("location", "Roseau");
        aqiPrediction.put("timeframe", "Next 24 hours");
        aqiPrediction.put("prediction", "Good (45-55)");
        aqiPrediction.put("details", "Air quality is expected to remain in the good range. No special precautions needed for outdoor activities.");
        aqiPrediction.put("confidence", "High (85%)");

        Map<String, String> aqiColorTheme = new HashMap<>();
        aqiColorTheme.put("bg", "bg-green-500/10");
        aqiColorTheme.put("text", "text-green-600 dark:text-green-400");
        aqiColorTheme.put("border", "border-green-500/30");
        aqiPrediction.put("colorTheme", aqiColorTheme);

        predictions.add(aqiPrediction);

        // Sargassum Prediction
        Map<String, Object> sargassumPrediction = new HashMap<>();
        sargassumPrediction.put("id", 2);
        sargassumPrediction.put("type", "Sargassum Seaweed Alert");
        sargassumPrediction.put("iconName", "alert");
        sargassumPrediction.put("location", "East Coast");
        sargassumPrediction.put("timeframe", "Next 7 days");
        sargassumPrediction.put("prediction", "Moderate Influx");
        sargassumPrediction.put("details", "Moderate amounts of sargassum seaweed expected to reach eastern beaches. Beach cleanup operations are being coordinated.");
        sargassumPrediction.put("confidence", "Medium (70%)");

        Map<String, String> sargassumColorTheme = new HashMap<>();
        sargassumColorTheme.put("bg", "bg-yellow-500/10");
        sargassumColorTheme.put("text", "text-yellow-600 dark:text-yellow-400");
        sargassumColorTheme.put("border", "border-yellow-500/30");
        sargassumPrediction.put("colorTheme", sargassumColorTheme);

        predictions.add(sargassumPrediction);

        // Rainfall Prediction
        Map<String, Object> rainfallPrediction = new HashMap<>();
        rainfallPrediction.put("id", 3);
        rainfallPrediction.put("type", "Rainfall Forecast");
        rainfallPrediction.put("iconName", "chart");
        rainfallPrediction.put("location", "Island-wide");
        rainfallPrediction.put("timeframe", "Next 5 days");
        rainfallPrediction.put("prediction", "Above Average");
        rainfallPrediction.put("details", "Higher than normal rainfall expected across the island. Potential for localized flooding in low-lying areas. Stay informed about weather updates.");
        rainfallPrediction.put("confidence", "Medium-High (75%)");

        Map<String, String> rainfallColorTheme = new HashMap<>();
        rainfallColorTheme.put("bg", "bg-blue-500/10");
        rainfallColorTheme.put("text", "text-blue-600 dark:text-blue-400");
        rainfallColorTheme.put("border", "border-blue-500/30");
        rainfallPrediction.put("colorTheme", rainfallColorTheme);

        predictions.add(rainfallPrediction);

        return ResponseEntity.ok(predictions);
    }

}
