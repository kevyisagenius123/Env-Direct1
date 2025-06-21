package com.environmentdirect.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web configuration for the application.
 * CORS configuration has been moved to SecurityConfig to avoid conflicts.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // CORS configuration has been moved to SecurityConfig to avoid conflicts
    // @Override
    // public void addCorsMappings(CorsRegistry registry) {
    //     // CORS is now handled in SecurityConfig.corsConfigurationSource()
    // }
}
