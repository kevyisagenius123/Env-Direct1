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

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("https://env-direct1.onrender.com") // Trust your frontend's domain
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow standard HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (like cookies)
    }
}
