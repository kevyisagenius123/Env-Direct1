package com.environmentdirect.controller;

import com.environmentdirect.service.ExternalDataService;
import io.micrometer.core.annotation.Timed;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

/**
 * Controller for fetching environmental data from external APIs.
 * Demonstrates the use of Java 11+ HttpClient with reactive streams.
 */
@RestController
@RequestMapping("/api/external-data")
@Tag(name = "External Data", description = "API for fetching environmental data from external sources")
public class ExternalDataController {

    private final ExternalDataService externalDataService;

    @Autowired
    public ExternalDataController(ExternalDataService externalDataService) {
        this.externalDataService = externalDataService;
    }

    /**
     * Fetch climate data for a specific location.
     *
     * @param location the location to fetch climate data for
     * @return a CompletableFuture containing the response
     */
    @Operation(
        summary = "Get climate data",
        description = "Fetches climate data for a specific location from external API",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved climate data",
                content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                responseCode = "500",
                description = "Internal server error or external API failure"
            )
        }
    )
    @GetMapping("/climate")
    @Timed(value = "api.climate.request", description = "Time taken to fetch climate data")
    public CompletableFuture<ResponseEntity<String>> getClimateData(
            @Parameter(description = "Location to fetch climate data for", required = true)
            @RequestParam String location) {
        return externalDataService.fetchClimateDataAsync(location)
                .thenApply(ResponseEntity::ok);
    }

    /**
     * Fetch air quality data for a specific location.
     *
     * @param location the location to fetch air quality data for
     * @return a CompletableFuture containing the response
     */
    @Operation(
        summary = "Get air quality data",
        description = "Fetches air quality data for a specific location from external API",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved air quality data",
                content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                responseCode = "500",
                description = "Internal server error or external API failure"
            )
        }
    )
    @GetMapping("/air-quality")
    @Timed(value = "api.air-quality.request", description = "Time taken to fetch air quality data")
    public CompletableFuture<ResponseEntity<String>> getAirQualityData(
            @Parameter(description = "Location to fetch air quality data for", required = true)
            @RequestParam String location) {
        return externalDataService.fetchAirQualityDataAsync(location)
                .thenApply(ResponseEntity::ok);
    }

    /**
     * Fetch combined environmental data for a specific location.
     * This endpoint demonstrates parallel API calls with CompletableFuture.
     *
     * @param location the location to fetch data for
     * @return a CompletableFuture containing the combined response
     */
    @Operation(
        summary = "Get combined environmental data",
        description = "Fetches both climate and air quality data for a specific location and combines them",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved combined environmental data",
                content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                responseCode = "500",
                description = "Internal server error or external API failure"
            )
        }
    )
    @GetMapping("/environmental")
    @Timed(value = "api.environmental.request", description = "Time taken to fetch combined environmental data")
    public CompletableFuture<ResponseEntity<String>> getEnvironmentalData(
            @Parameter(description = "Location to fetch combined environmental data for", required = true)
            @RequestParam String location) {
        return externalDataService.fetchEnvironmentalDataAsync(location)
                .thenApply(ResponseEntity::ok);
    }
}
