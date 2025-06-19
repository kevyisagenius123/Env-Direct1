package com.environmentdirect.controller;

import org.springframework.http.ResponseEntity;
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
public class DashboardController {

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() {
        return ResponseEntity.ok(Collections.emptyMap());
    }
}