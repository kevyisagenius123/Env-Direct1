package com.environmentdirect.controller;

import com.environmentdirect.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for providing predictive environmental insights.
 * This controller handles endpoints for eco-tourism hotspot pressure and flood risk forecasting.
 */
@RestController
@RequestMapping("/api/predict")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://wonderful-boba-48e576.netlify.app"
})
public class PredictController {

    private final PredictionService predictionService;

    @Autowired
    public PredictController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    /**
     * Get eco-tourism hotspot pressure forecast for a specific site.
     * 
     * @param siteId The identifier for the tourism site (e.g., "boiling-lake", "trafalgar-falls").
     * @return A map containing the forecast data.
     */
    @GetMapping("/eco-tourism/pressure")
    public ResponseEntity<Map<String, Object>> getEcoTourismPressure(@RequestParam(required = false) String siteId) {
        if (siteId != null && !siteId.isEmpty()) {
            // Return forecast for a specific site
            return ResponseEntity.ok(predictionService.getEcoTourismPressure(siteId));
        } else {
            // If no siteId is provided, return a message indicating that a siteId is required
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Missing required parameter: siteId");
            errorResponse.put("message", "Please provide a valid siteId parameter (e.g., boiling-lake, trafalgar-falls, middleham-falls)");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Get all eco-tourism hotspot pressure forecasts.
     * 
     * @return A list of forecasts for all known sites.
     */
    @GetMapping("/eco-tourism/pressure/all")
    public ResponseEntity<List<Map<String, Object>>> getAllEcoTourismPressures() {
        return ResponseEntity.ok(predictionService.getAllEcoTourismPressures());
    }

    /**
     * Get flood risk forecast for a specific region.
     * 
     * @param region The identifier for the region (e.g., "Portsmouth", "RoseauSouth").
     * @return A map containing the forecast data.
     */
    @GetMapping("/flood-risk")
    public ResponseEntity<Map<String, Object>> getFloodRisk(@RequestParam(required = false) String region) {
        if (region != null && !region.isEmpty()) {
            // Return forecast for a specific region
            return ResponseEntity.ok(predictionService.getFloodRisk(region));
        } else {
            // If no region is provided, return a message indicating that a region is required
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Missing required parameter: region");
            errorResponse.put("message", "Please provide a valid region parameter (e.g., Portsmouth, RoseauSouth, LayouValley)");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Get all flood risk forecasts.
     * 
     * @return A list of forecasts for all known regions.
     */
    @GetMapping("/flood-risk/all")
    public ResponseEntity<List<Map<String, Object>>> getAllFloodRisks() {
        return ResponseEntity.ok(predictionService.getAllFloodRisks());
    }

    /**
     * Get historical data comparison for a specific site or region.
     * 
     * @param id The identifier for the site or region
     * @param type The type of data ("eco-tourism" or "flood-risk")
     * @return A map containing historical data and current predictions
     */
    @GetMapping("/historical-comparison")
    public ResponseEntity<?> getHistoricalComparison(
            @RequestParam String id,
            @RequestParam String type) {
        try {
            Map<String, Object> comparison = predictionService.getHistoricalComparison(id, type);
            return ResponseEntity.ok(comparison);
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "An error occurred while retrieving historical comparison data");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}
