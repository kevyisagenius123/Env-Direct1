package com.environmentdirect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

/**
 * Controller for providing environmental dashboard data.
 * This endpoint serves data for the EnvDashboardPage.jsx component in the frontend.
 */
@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://wonderful-boba-48e576.netlify.app"
})
public class DashboardController {

    /**
     * Get Dominica dashboard data.
     * @return A map containing dashboard data for Dominica.
     */
    @GetMapping("/dominica")
    public ResponseEntity<Map<String, Object>> getDominicaDashboardData() {
        return ResponseEntity.ok(Collections.emptyMap());
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() {
        return ResponseEntity.ok(Collections.emptyMap());
    }
}