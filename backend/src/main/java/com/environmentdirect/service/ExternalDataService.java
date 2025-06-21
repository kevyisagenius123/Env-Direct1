package com.environmentdirect.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;

/**
 * Service for fetching environmental data from external APIs.
 * Uses Java 11+ HttpClient with reactive streams for non-blocking API calls.
 */
@Service
public class ExternalDataService {

    private final HttpClient httpClient;

    public ExternalDataService() {
        // Create a reusable HttpClient with configuration
        this.httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)  // Use HTTP/2
                .connectTimeout(Duration.ofSeconds(10))  // Set connection timeout
                .followRedirects(HttpClient.Redirect.NORMAL)  // Follow redirects
                .build();
    }

    /**
     * Fetch climate data asynchronously from an external API.
     * Uses reactive programming model with CompletableFuture.
     * Results are cached to improve performance.
     *
     * @param location the location to fetch climate data for
     * @return a CompletableFuture containing the response body as a String
     */
    @Cacheable(value = "climateData", key = "#location")
    @CircuitBreaker(name = "climateApi", fallbackMethod = "getClimateDataFallback")
    @TimeLimiter(name = "climateApi")
    public CompletableFuture<String> fetchClimateDataAsync(String location) {
        // In a real application, this would be a real API endpoint
        String apiUrl = "https://api.example.com/climate?location=" + location;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Accept", "application/json")
                .GET()
                .timeout(Duration.ofSeconds(30))  // Request timeout
                .build();

        // Send the request asynchronously and handle the response
        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .exceptionally(ex -> {
                    // Log the exception
                    System.err.println("Error fetching climate data: " + ex.getMessage());
                    // Return a fallback response
                    return "{\"error\": \"Failed to fetch climate data\", \"location\": \"" + location + "\"}";
                });
    }

    /**
     * Fetch air quality data asynchronously from an external API.
     * Uses reactive programming model with CompletableFuture.
     * Results are cached to improve performance.
     *
     * @param location the location to fetch air quality data for
     * @return a CompletableFuture containing the response body as a String
     */
    @Cacheable(value = "airQualityData", key = "#location")
    @CircuitBreaker(name = "airQualityApi", fallbackMethod = "getAirQualityDataFallback")
    @TimeLimiter(name = "airQualityApi")
    public CompletableFuture<String> fetchAirQualityDataAsync(String location) {
        // In a real application, this would be a real API endpoint
        String apiUrl = "https://api.example.com/air-quality?location=" + location;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Accept", "application/json")
                .GET()
                .timeout(Duration.ofSeconds(30))  // Request timeout
                .build();

        // Send the request asynchronously and handle the response
        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .exceptionally(ex -> {
                    // Log the exception
                    System.err.println("Error fetching air quality data: " + ex.getMessage());
                    // Return a fallback response
                    return "{\"error\": \"Failed to fetch air quality data\", \"location\": \"" + location + "\"}";
                });
    }

    /**
     * Fetch both climate and air quality data asynchronously and combine the results.
     * Demonstrates parallel API calls with CompletableFuture.
     * Results are cached to improve performance.
     *
     * @param location the location to fetch data for
     * @return a CompletableFuture containing the combined response as a String
     */
    @Cacheable(value = "environmentalData", key = "#location")
    @CircuitBreaker(name = "environmentalApi", fallbackMethod = "getEnvironmentalDataFallback")
    @TimeLimiter(name = "environmentalApi")
    public CompletableFuture<String> fetchEnvironmentalDataAsync(String location) {
        CompletableFuture<String> climateFuture = fetchClimateDataAsync(location);
        CompletableFuture<String> airQualityFuture = fetchAirQualityDataAsync(location);

        // Combine the results of both futures when they complete
        return CompletableFuture.allOf(climateFuture, airQualityFuture)
                .thenApply(v -> {
                    String climateData = climateFuture.join();
                    String airQualityData = airQualityFuture.join();

                    // In a real application, you would parse the JSON and combine the data properly
                    return "{\"location\": \"" + location + "\", " +
                           "\"climate\": " + climateData + ", " +
                           "\"airQuality\": " + airQualityData + "}";
                });
    }

    /**
     * Fallback method for climate data API when circuit breaker is triggered.
     * 
     * @param location the location for which data was requested
     * @param ex the exception that triggered the fallback
     * @return a CompletableFuture containing a fallback response
     */
    public CompletableFuture<String> getClimateDataFallback(String location, Exception ex) {
        System.err.println("Circuit breaker triggered for climate data API: " + ex.getMessage());
        return CompletableFuture.completedFuture(
            "{\"error\": \"Climate data temporarily unavailable\", \"location\": \"" + location + "\"}"
        );
    }

    /**
     * Fallback method for air quality data API when circuit breaker is triggered.
     * 
     * @param location the location for which data was requested
     * @param ex the exception that triggered the fallback
     * @return a CompletableFuture containing a fallback response
     */
    public CompletableFuture<String> getAirQualityDataFallback(String location, Exception ex) {
        System.err.println("Circuit breaker triggered for air quality data API: " + ex.getMessage());
        return CompletableFuture.completedFuture(
            "{\"error\": \"Air quality data temporarily unavailable\", \"location\": \"" + location + "\"}"
        );
    }

    /**
     * Fallback method for environmental data API when circuit breaker is triggered.
     * 
     * @param location the location for which data was requested
     * @param ex the exception that triggered the fallback
     * @return a CompletableFuture containing a fallback response
     */
    public CompletableFuture<String> getEnvironmentalDataFallback(String location, Exception ex) {
        System.err.println("Circuit breaker triggered for environmental data API: " + ex.getMessage());
        return CompletableFuture.completedFuture(
            "{\"error\": \"Environmental data temporarily unavailable\", \"location\": \"" + location + "\"}"
        );
    }
}
