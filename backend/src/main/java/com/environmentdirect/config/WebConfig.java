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
        registry.addMapping("/**")
                .allowedOrigins(
                    "https://env-direct1.onrender.com",
                    "https://env-direct-frontend.onrender.com",
                    "https://environment-direct-frontend-exwhx7zhv.vercel.app",
                    "https://environment-direct-frontend-rjy7mwjt3.vercel.app",
                    "https://environment-direct-frontend-3061klhsq.vercel.app",
                    "https://environment-direct-frontend-l8fvewjh0.vercel.app",
                    "http://localhost:5173",
                    "http://localhost:3000"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
