package com.environmentdirect.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * Configuration for caching using Caffeine.
 * Enables caching and configures cache settings.
 */
@Configuration
@EnableCaching
public class CacheConfig {

    /**
     * Configure the cache manager with Caffeine.
     *
     * @return the cache manager
     */
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(caffeineCacheBuilder());
        
        // Register known cache names
        cacheManager.setCacheNames(java.util.Arrays.asList(
            "climateData",
            "airQualityData",
            "environmentalData",
            "articles",
            "categories",
            "reports"
        ));
        
        return cacheManager;
    }

    /**
     * Configure Caffeine cache settings.
     *
     * @return the Caffeine builder
     */
    private Caffeine<Object, Object> caffeineCacheBuilder() {
        return Caffeine.newBuilder()
                .expireAfterWrite(10, TimeUnit.MINUTES)  // Cache entries expire after 10 minutes
                .initialCapacity(100)                    // Initial capacity of 100 entries
                .maximumSize(1000)                       // Maximum size of 1000 entries
                .recordStats();                          // Record statistics for monitoring
    }
}