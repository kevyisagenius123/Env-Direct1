# Advanced Java Features in Environment Direct

This document outlines the advanced Java 21 and Spring Boot 3.2.5 features implemented in the Environment Direct application.

## 1. Virtual Threads (Project Loom)
Virtual threads provide lightweight concurrency without the overhead of traditional threads, making them ideal for I/O-bound operations.

**Implementation:**
- Used in `PredictService` for handling high-concurrency tasks like environmental predictions
- Implemented with `Executors.newVirtualThreadPerTaskExecutor()` for efficient handling of potentially heavy AI model inference

```java
// Example from PredictService.java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<Map<String, Object>> future = executor.submit(() -> {
        // Simulate heavy AI model inference or data processing
        Thread.sleep(500); // Simulating work
        
        Map<String, Object> prediction = new HashMap<>();
        // ... populate prediction data
        
        return prediction;
    });
    
    return future.get();
}
```

## 2. Record Classes for Data Transfer Objects
Records provide a concise way to declare classes that are transparent holders for shallowly immutable data.

**Implementation:**
- Converted all DTOs to record classes for immutability and reduced boilerplate
- Examples: `ArticleRequestDto`, `CommentRequestDto`, `CommentResponseDto`, `LiveDataDto`, `ReportDTO`, `ReportStatusUpdateDto`

```java
// Example from CommentRequestDto.java
public record CommentRequestDto(
    @NotBlank(message = "Author name cannot be blank")
    @Size(max = 100, message = "Author name cannot exceed 100 characters")
    String authorName,

    @NotBlank(message = "Comment content cannot be blank")
    @Size(max = 5000, message = "Comment content cannot exceed 5000 characters")
    String content
) {}
```

## 3. HTTP Client with Reactive Streams
Java's modern HTTP client provides non-blocking I/O and reactive streams support for efficient handling of HTTP requests.

**Implementation:**
- Implemented in `ExternalDataService` for non-blocking API calls
- Used Java 11+ HttpClient with reactive streams for efficient handling of external API calls
- Implemented parallel API calls with CompletableFuture

```java
// Example from ExternalDataService.java
public CompletableFuture<String> fetchClimateDataAsync(String location) {
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(apiUrl))
            .header("Accept", "application/json")
            .GET()
            .timeout(Duration.ofSeconds(30))
            .build();

    return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .exceptionally(ex -> {
                // Handle exception
                return fallbackResponse;
            });
}
```

## 4. Caffeine Cache
Caffeine is a high-performance, near-optimal caching library that significantly improves application performance.

**Implementation:**
- Configured in `CacheConfig` for high-performance caching
- Used for caching climate data, air quality data, and environmental data

```java
// Example from CacheConfig.java
@Bean
public CacheManager cacheManager() {
    CaffeineCacheManager cacheManager = new CaffeineCacheManager();
    cacheManager.setCaffeine(Caffeine.newBuilder()
            .expireAfterWrite(10, TimeUnit.MINUTES)
            .initialCapacity(100)
            .maximumSize(1000)
            .recordStats());
    return cacheManager;
}
```

## 5. Micrometer + Prometheus for Observability
Micrometer provides a simple facade over the instrumentation clients for various monitoring systems.

**Implementation:**
- Configured in `MetricsConfig` for monitoring application performance
- Added `@Timed` annotations to endpoints in `ExternalDataController`

```java
// Example from MetricsConfig.java
@Bean
public TimedAspect timedAspect(MeterRegistry registry) {
    return new TimedAspect(registry);
}

// Example usage in controller
@GetMapping("/climate")
@Timed(value = "api.climate.request", description = "Time taken to fetch climate data")
public CompletableFuture<ResponseEntity<String>> getClimateData(@RequestParam String location) {
    // Method implementation
}
```

## 6. OpenAPI 3 (Springdoc)
OpenAPI 3 provides a standardized way to document RESTful APIs.

**Implementation:**
- Configured in `OpenApiConfig` for API documentation
- Added OpenAPI annotations to endpoints in `ExternalDataController`

```java
// Example from OpenApiConfig.java
@Bean
public OpenAPI environmentDirectOpenAPI() {
    return new OpenAPI()
            .info(new Info()
                    .title("Environment Direct API")
                    .description("API for Environment Direct - Environmental Consulting Platform")
                    .version("1.0.0"));
}

// Example usage in controller
@Operation(
    summary = "Get climate data",
    description = "Fetches climate data for a specific location from external API"
)
@ApiResponse(responseCode = "200", description = "Successfully retrieved climate data")
@GetMapping("/climate")
public CompletableFuture<ResponseEntity<String>> getClimateData(@RequestParam String location) {
    // Method implementation
}
```

## 7. Resilience4J Circuit Breaking
Resilience4J is a lightweight fault tolerance library inspired by Netflix Hystrix.

**Implementation:**
- Configured in `ResilienceConfig` for fault tolerance
- Implemented circuit breakers in `ExternalDataService` for external API calls
- Added fallback methods for graceful degradation

```java
// Example from ExternalDataService.java
@CircuitBreaker(name = "climateApi", fallbackMethod = "getClimateDataFallback")
@TimeLimiter(name = "climateApi")
public CompletableFuture<String> fetchClimateDataAsync(String location) {
    // Method implementation
}

public CompletableFuture<String> getClimateDataFallback(String location, Exception ex) {
    return CompletableFuture.completedFuture(
        "{\"error\": \"Climate data temporarily unavailable\", \"location\": \"" + location + "\"}"
    );
}
```

## 8. Flyway for Database Migration
Flyway is a database migration tool that strongly favors simplicity and convention over configuration.

**Implementation:**
- Configured in `FlywayConfig` for database schema versioning
- Created initial migration script in `V1__Initial_Schema.sql`
- Implemented different migration strategies for different environments

```java
// Example from FlywayConfig.java
@Bean
@Profile("dev")
public FlywayMigrationStrategy cleanMigrateStrategy() {
    return flyway -> {
        flyway.clean();
        flyway.migrate();
    };
}
```

## 9. JWT + Role-Based Authorization
JWT (JSON Web Token) provides a secure way to transmit information between parties as a JSON object.

**Implementation:**
- Enhanced security configuration in `SecurityConfig`
- Implemented JWT authentication filter in `JwtAuthenticationFilter`
- Configured role-based authorization for different endpoints

```java
// Example from SecurityConfig.java
@EnableMethodSecurity
public class SecurityConfig {
    // Configuration
    
    // Example of role-based authorization
    .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/articles/**").hasRole("ADMIN")
    .requestMatchers("/api/external-data/**").hasRole("CONSULTANT")
}
```

## 10. TestContainers for Integration Testing
TestContainers is a Java library that supports JUnit tests, providing lightweight, throwaway instances of common databases, Selenium web browsers, or anything else that can run in a Docker container.

**Implementation:**
- Configured in `PostgresTestContainer` for integration testing with real PostgreSQL database
- Implemented integration test for `UserRepository` in `UserRepositoryIntegrationTest`

```java
// Example from UserRepositoryIntegrationTest.java
@DataJpaTest
@Testcontainers
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryIntegrationTest {

    @Container
    private static final PostgreSQLContainer<?> postgresContainer = new PostgreSQLContainer<>("postgres:14-alpine")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void registerPgProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgresContainer::getJdbcUrl);
        // Additional properties
    }
    
    // Test methods
}
```