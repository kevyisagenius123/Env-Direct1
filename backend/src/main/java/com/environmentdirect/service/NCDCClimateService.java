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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.CompletableFuture;

/**
 * Service for fetching real climate data from NOAA NCDC API.
 * Uses official NCDC web services with authenticated token.
 */
@Service
public class NCDCClimateService {

    private static final String NCDC_TOKEN = "FjyPFiDCxGCZHRpweDqhaeQWCSkmQAad";
    private static final String BASE_URL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/";
    
    // Dominica location identifiers
    private static final String DOMINICA_FIPS = "FIPS:DM";
    private static final String CARIBBEAN_REGION = "FIPS:VI"; // Virgin Islands as Caribbean proxy
    
    private final HttpClient httpClient;

    public NCDCClimateService() {
        this.httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .connectTimeout(Duration.ofSeconds(15))
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();
    }

    /**
     * Get available datasets from NCDC API
     */
    @Cacheable(value = "ncdcDatasets")
    @CircuitBreaker(name = "ncdcApi", fallbackMethod = "getDatasetsFallback")
    @TimeLimiter(name = "ncdcApi")
    public CompletableFuture<String> getAvailableDatasets() {
        String url = BASE_URL + "datasets?limit=50";
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("token", NCDC_TOKEN)
                .header("Accept", "application/json")
                .GET()
                .timeout(Duration.ofSeconds(30))
                .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .exceptionally(ex -> {
                    System.err.println("Error fetching NCDC datasets: " + ex.getMessage());
                    return "{\"error\": \"Failed to fetch NCDC datasets\", \"message\": \"" + ex.getMessage() + "\"}";
                });
    }

    /**
     * Get weather stations in Caribbean/Dominica region
     */
    @Cacheable(value = "ncdcStations", key = "#locationId")
    @CircuitBreaker(name = "ncdcApi", fallbackMethod = "getStationsFallback")
    @TimeLimiter(name = "ncdcApi")
    public CompletableFuture<String> getWeatherStations(String locationId) {
        String location = locationId != null ? locationId : CARIBBEAN_REGION;
        String url = BASE_URL + "stations?locationid=" + location + "&limit=100";
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("token", NCDC_TOKEN)
                .header("Accept", "application/json")
                .GET()
                .timeout(Duration.ofSeconds(30))
                .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .exceptionally(ex -> {
                    System.err.println("Error fetching NCDC stations: " + ex.getMessage());
                    return "{\"error\": \"Failed to fetch weather stations\", \"location\": \"" + location + "\"}";
                });
    }

    /**
     * Get current year climate data for Dominica/Caribbean
     */
    @Cacheable(value = "ncdcClimateData", key = "#datasetId + '_' + #locationId")
    @CircuitBreaker(name = "ncdcApi", fallbackMethod = "getClimateDataFallback")
    @TimeLimiter(name = "ncdcApi")
    public CompletableFuture<String> getCurrentYearClimateData(String datasetId, String locationId) {
        String dataset = datasetId != null ? datasetId : "GHCND"; // Global Historical Climatology Network Daily
        String location = locationId != null ? locationId : CARIBBEAN_REGION;
        
        // Get current year data
        LocalDate now = LocalDate.now();
        String startDate = now.withDayOfYear(1).format(DateTimeFormatter.ISO_LOCAL_DATE);
        String endDate = now.format(DateTimeFormatter.ISO_LOCAL_DATE);
        
        String url = BASE_URL + "data?datasetid=" + dataset + 
                    "&locationid=" + location + 
                    "&startdate=" + startDate + 
                    "&enddate=" + endDate + 
                    "&limit=1000&units=metric";
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("token", NCDC_TOKEN)
                .header("Accept", "application/json")
                .GET()
                .timeout(Duration.ofSeconds(30))
                .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .exceptionally(ex -> {
                    System.err.println("Error fetching NCDC climate data: " + ex.getMessage());
                    return "{\"error\": \"Failed to fetch climate data\", \"dataset\": \"" + dataset + "\", \"location\": \"" + location + "\"}";
                });
    }

    /**
     * Get historical climate data for specific date range
     */
    @Cacheable(value = "ncdcHistoricalData", key = "#startDate + '_' + #endDate + '_' + #locationId")
    @CircuitBreaker(name = "ncdcApi", fallbackMethod = "getHistoricalDataFallback")
    @TimeLimiter(name = "ncdcApi")
    public CompletableFuture<String> getHistoricalClimateData(String startDate, String endDate, String locationId) {
        String location = locationId != null ? locationId : CARIBBEAN_REGION;
        
        String url = BASE_URL + "data?datasetid=GHCND" + 
                    "&locationid=" + location + 
                    "&startdate=" + startDate + 
                    "&enddate=" + endDate + 
                    "&datatypeid=TMAX,TMIN,PRCP,AWND" + // Max temp, min temp, precipitation, wind
                    "&limit=1000&units=metric";
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("token", NCDC_TOKEN)
                .header("Accept", "application/json")
                .GET()
                .timeout(Duration.ofSeconds(30))
                .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .exceptionally(ex -> {
                    System.err.println("Error fetching NCDC historical data: " + ex.getMessage());
                    return "{\"error\": \"Failed to fetch historical climate data\", \"period\": \"" + startDate + " to " + endDate + "\"}";
                });
    }

    /**
     * Get climate extremes and records
     */
    @Cacheable(value = "ncdcExtremes", key = "#locationId")
    @CircuitBreaker(name = "ncdcApi", fallbackMethod = "getExtremesFallback")
    @TimeLimiter(name = "ncdcApi")
    public CompletableFuture<String> getClimateExtremes(String locationId) {
        String location = locationId != null ? locationId : CARIBBEAN_REGION;
        
        // Get last 5 years of data to find recent extremes
        LocalDate now = LocalDate.now();
        String startDate = now.minusYears(5).format(DateTimeFormatter.ISO_LOCAL_DATE);
        String endDate = now.format(DateTimeFormatter.ISO_LOCAL_DATE);
        
        String url = BASE_URL + "data?datasetid=GHCND" + 
                    "&locationid=" + location + 
                    "&startdate=" + startDate + 
                    "&enddate=" + endDate + 
                    "&datatypeid=TMAX,TMIN,PRCP" + 
                    "&limit=1000&units=metric";
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("token", NCDC_TOKEN)
                .header("Accept", "application/json")
                .GET()
                .timeout(Duration.ofSeconds(30))
                .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .exceptionally(ex -> {
                    System.err.println("Error fetching NCDC extremes: " + ex.getMessage());
                    return "{\"error\": \"Failed to fetch climate extremes\", \"location\": \"" + location + "\"}";
                });
    }

    /**
     * Get comprehensive Caribbean climate summary
     */
    @Cacheable(value = "ncdcCaribbeanSummary")
    @CircuitBreaker(name = "ncdcApi", fallbackMethod = "getCaribbeanSummaryFallback")
    @TimeLimiter(name = "ncdcApi")
    public CompletableFuture<String> getCaribbeanClimateSummary() {
        // Combine multiple data sources for comprehensive view
        CompletableFuture<String> stationsFuture = getWeatherStations(CARIBBEAN_REGION);
        CompletableFuture<String> currentDataFuture = getCurrentYearClimateData("GHCND", CARIBBEAN_REGION);
        CompletableFuture<String> extremesFuture = getClimateExtremes(CARIBBEAN_REGION);

        return CompletableFuture.allOf(stationsFuture, currentDataFuture, extremesFuture)
                .thenApply(v -> {
                    String stations = stationsFuture.join();
                    String currentData = currentDataFuture.join();
                    String extremes = extremesFuture.join();

                    return "{\"caribbean_climate_summary\": {" +
                           "\"stations\": " + stations + ", " +
                           "\"current_year_data\": " + currentData + ", " +
                           "\"recent_extremes\": " + extremes + ", " +
                           "\"data_source\": \"NOAA NCDC\", " +
                           "\"region\": \"Caribbean\"" +
                           "}}";
                });
    }

    // Fallback methods
    public CompletableFuture<String> getDatasetsFallback(Exception ex) {
        return CompletableFuture.completedFuture(
            "{\"error\": \"NCDC datasets temporarily unavailable\", \"fallback\": true}"
        );
    }

    public CompletableFuture<String> getStationsFallback(String locationId, Exception ex) {
        return CompletableFuture.completedFuture(
            "{\"error\": \"NCDC stations data temporarily unavailable\", \"location\": \"" + locationId + "\", \"fallback\": true}"
        );
    }

    public CompletableFuture<String> getClimateDataFallback(String datasetId, String locationId, Exception ex) {
        return CompletableFuture.completedFuture(
            "{\"error\": \"NCDC climate data temporarily unavailable\", \"fallback\": true}"
        );
    }

    public CompletableFuture<String> getHistoricalDataFallback(String startDate, String endDate, String locationId, Exception ex) {
        return CompletableFuture.completedFuture(
            "{\"error\": \"NCDC historical data temporarily unavailable\", \"period\": \"" + startDate + " to " + endDate + "\", \"fallback\": true}"
        );
    }

    public CompletableFuture<String> getExtremesFallback(String locationId, Exception ex) {
        return CompletableFuture.completedFuture(
            "{\"error\": \"NCDC extremes data temporarily unavailable\", \"fallback\": true}"
        );
    }

    public CompletableFuture<String> getCaribbeanSummaryFallback(Exception ex) {
        return CompletableFuture.completedFuture(
            "{\"error\": \"Caribbean climate summary temporarily unavailable\", \"fallback\": true}"
        );
    }
}
