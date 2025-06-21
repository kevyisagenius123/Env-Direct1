package com.environmentdirect.config;

import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.timelimiter.TimeLimiterConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

/**
 * Configuration for Resilience4J circuit breakers and time limiters.
 * Provides fault tolerance for external API calls.
 */
@Configuration
public class ResilienceConfig {

    /**
     * Configure default circuit breaker settings.
     * These settings will be used for all circuit breakers unless overridden.
     *
     * @return the circuit breaker configuration
     */
    @Bean
    public CircuitBreakerConfig circuitBreakerConfig() {
        return CircuitBreakerConfig.custom()
                .failureRateThreshold(50)                // 50% failure rate to open circuit
                .waitDurationInOpenState(Duration.ofSeconds(60)) // Wait 60 seconds in open state before trying again
                .slidingWindowType(CircuitBreakerConfig.SlidingWindowType.COUNT_BASED)
                .slidingWindowSize(10)                   // Count last 10 calls
                .minimumNumberOfCalls(5)                 // Minimum calls before calculating failure rate
                .permittedNumberOfCallsInHalfOpenState(3) // Allow 3 calls in half-open state
                .automaticTransitionFromOpenToHalfOpenEnabled(true) // Auto transition from open to half-open
                .build();
    }

    /**
     * Configure default time limiter settings.
     * These settings will be used for all time limiters unless overridden.
     *
     * @return the time limiter configuration
     */
    @Bean
    public TimeLimiterConfig timeLimiterConfig() {
        return TimeLimiterConfig.custom()
                .timeoutDuration(Duration.ofSeconds(10)) // Timeout after 10 seconds
                .cancelRunningFuture(true)               // Cancel the running future when timeout occurs
                .build();
    }

    /**
     * Configure specific circuit breaker settings for climate API.
     *
     * @return the circuit breaker configuration for climate API
     */
    @Bean
    public CircuitBreakerConfig climateApiCircuitBreakerConfig() {
        return CircuitBreakerConfig.custom()
                .failureRateThreshold(40)                // More sensitive threshold for climate API
                .waitDurationInOpenState(Duration.ofSeconds(30)) // Shorter wait time
                .slidingWindowType(CircuitBreakerConfig.SlidingWindowType.COUNT_BASED)
                .slidingWindowSize(5)                    // Smaller window size
                .minimumNumberOfCalls(3)                 // Fewer calls before calculating failure rate
                .build();
    }

    /**
     * Configure specific time limiter settings for climate API.
     *
     * @return the time limiter configuration for climate API
     */
    @Bean
    public TimeLimiterConfig climateApiTimeLimiterConfig() {
        return TimeLimiterConfig.custom()
                .timeoutDuration(Duration.ofSeconds(5))  // Shorter timeout for climate API
                .cancelRunningFuture(true)
                .build();
    }
}