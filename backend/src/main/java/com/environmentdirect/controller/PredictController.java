package com.environmentdirect.controller;

import com.environmentdirect.service.PredictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Controller for providing predictive environmental insights.
 * This controller handles endpoints for eco-tourism hotspot pressure and flood risk forecasting.
 * Uses Virtual Threads via the PredictService for efficient handling of prediction requests.
 */
@RestController
@RequestMapping("/api/predict")
public class PredictController {

    private final PredictService predictService;

    @Autowired
    public PredictController(PredictService predictService) {
        this.predictService = predictService;
    }

    @GetMapping("/eco-tourism/{siteId}")
    public ResponseEntity<Map<String, Object>> getEcoTourismPrediction(@PathVariable String siteId) {
        return ResponseEntity.ok(predictService.getEcoTourismPrediction(siteId));
    }

    @GetMapping("/flood-risk/{region}")
    public ResponseEntity<Map<String, Object>> getFloodRiskPrediction(@PathVariable String region) {
        return ResponseEntity.ok(predictService.getFloodRiskPrediction(region));
    }

    @GetMapping("/eco-tourism")
    public ResponseEntity<List<Map<String, Object>>> getAllEcoTourismPredictions() {
        return ResponseEntity.ok(predictService.getAllEcoTourismPressureData());
    }

    @GetMapping("/flood-risk")
    public ResponseEntity<List<Map<String, Object>>> getAllFloodRiskPredictions() {
        return ResponseEntity.ok(predictService.getAllFloodRiskData());
    }

    // New endpoints to match frontend expectations
    @GetMapping("/flood-risk/all")
    public ResponseEntity<List<Map<String, Object>>> getAllFloodRiskData() {
        return ResponseEntity.ok(predictService.getAllFloodRiskData());
    }

    @GetMapping("/eco-tourism/pressure/all")
    public ResponseEntity<List<Map<String, Object>>> getAllEcoTourismPressureData() {
        return ResponseEntity.ok(predictService.getAllEcoTourismPressureData());
    }

    @GetMapping("/historical-comparison")
    public ResponseEntity<Map<String, Object>> getHistoricalComparisonWithParams(
            @RequestParam String id,
            @RequestParam String type) {
        return ResponseEntity.ok(predictService.getHistoricalComparison(id, type));
    }

    @GetMapping("/historical-comparison/{type}/{id}")
    public ResponseEntity<Map<String, Object>> getHistoricalComparison(@PathVariable String type, @PathVariable String id) {
        return ResponseEntity.ok(predictService.getHistoricalComparison(id, type));
    }
}
