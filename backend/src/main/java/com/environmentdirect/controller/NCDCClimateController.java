package com.environmentdirect.controller;

import com.environmentdirect.service.NCDCClimateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

/**
 * Controller for NCDC Climate Intelligence API endpoints.
 * Provides real climate data from NOAA NCDC for Intelligence pages.
 */
@RestController
@RequestMapping("/api/ncdc")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://environment-direct-frontend-dbbdpyoeo.vercel.app", "https://environment-direct-frontend-jsepw3wlu.vercel.app"})
public class NCDCClimateController {

    @Autowired
    private NCDCClimateService ncdcClimateService;

    /**
     * Get available NCDC datasets
     */
    @GetMapping("/datasets")
    public CompletableFuture<ResponseEntity<String>> getAvailableDatasets() {
        return ncdcClimateService.getAvailableDatasets()
                .thenApply(data -> ResponseEntity.ok()
                        .header("Content-Type", "application/json")
                        .body(data));
    }

    /**
     * Get weather stations in Caribbean/Dominica region
     */
    @GetMapping("/stations")
    public CompletableFuture<ResponseEntity<String>> getWeatherStations(
            @RequestParam(required = false) String locationId) {
        return ncdcClimateService.getWeatherStations(locationId)
                .thenApply(data -> ResponseEntity.ok()
                        .header("Content-Type", "application/json")
                        .body(data));
    }

    /**
     * Get current year climate data
     */
    @GetMapping("/climate-data/current")
    public CompletableFuture<ResponseEntity<String>> getCurrentYearClimateData(
            @RequestParam(required = false) String datasetId,
            @RequestParam(required = false) String locationId) {
        return ncdcClimateService.getCurrentYearClimateData(datasetId, locationId)
                .thenApply(data -> ResponseEntity.ok()
                        .header("Content-Type", "application/json")
                        .body(data));
    }

    /**
     * Get historical climate data for date range
     */
    @GetMapping("/climate-data/historical")
    public CompletableFuture<ResponseEntity<String>> getHistoricalClimateData(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam(required = false) String locationId) {
        return ncdcClimateService.getHistoricalClimateData(startDate, endDate, locationId)
                .thenApply(data -> ResponseEntity.ok()
                        .header("Content-Type", "application/json")
                        .body(data));
    }

    /**
     * Get climate extremes and records
     */
    @GetMapping("/climate-extremes")
    public CompletableFuture<ResponseEntity<String>> getClimateExtremes(
            @RequestParam(required = false) String locationId) {
        return ncdcClimateService.getClimateExtremes(locationId)
                .thenApply(data -> ResponseEntity.ok()
                        .header("Content-Type", "application/json")
                        .body(data));
    }

    /**
     * Get comprehensive Caribbean climate summary
     */
    @GetMapping("/caribbean-summary")
    public CompletableFuture<ResponseEntity<String>> getCaribbeanClimateSummary() {
        return ncdcClimateService.getCaribbeanClimateSummary()
                .thenApply(data -> ResponseEntity.ok()
                        .header("Content-Type", "application/json")
                        .body(data));
    }

    /**
     * Get intelligence dashboard data (combines multiple sources)
     */
    @GetMapping("/intelligence-dashboard")
    public CompletableFuture<ResponseEntity<String>> getIntelligenceDashboardData() {
        // Combine current data with extremes for dashboard
        return ncdcClimateService.getCurrentYearClimateData("GHCND", null)
                .thenCombine(ncdcClimateService.getClimateExtremes(null), (currentData, extremes) -> {
                    String combinedData = "{\"intelligence_dashboard\": {" +
                            "\"current_climate\": " + currentData + ", " +
                            "\"climate_extremes\": " + extremes + ", " +
                            "\"data_source\": \"NOAA NCDC\", " +
                            "\"region\": \"Caribbean/Dominica\", " +
                            "\"last_updated\": \"" + java.time.LocalDateTime.now() + "\"" +
                            "}}";
                    return ResponseEntity.ok()
                            .header("Content-Type", "application/json")
                            .body(combinedData);
                });
    }

    /**
     * Health check endpoint for NCDC API
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body("{\"status\": \"UP\", \"service\": \"NCDC Climate Intelligence\", \"token\": \"active\"}");
    }
} 