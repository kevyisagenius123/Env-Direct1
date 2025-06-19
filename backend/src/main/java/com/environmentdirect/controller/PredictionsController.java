package com.environmentdirect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Controller for providing environmental predictions and forecasts.
 * This endpoint serves data for the PredictionsSection component in the frontend.
 */
@RestController
@RequestMapping("/api/predictions")
public class PredictionsController {

    @GetMapping("/eco-tourism")
    public ResponseEntity<List<Map<String, Object>>> getAllEcoTourismPredictions() {
        return ResponseEntity.ok(Collections.emptyList());
    }

    @GetMapping("/flood-risk")
    public ResponseEntity<List<Map<String, Object>>> getAllFloodRiskPredictions() {
        return ResponseEntity.ok(Collections.emptyList());
    }
}
