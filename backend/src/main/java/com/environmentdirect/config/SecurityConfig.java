package com.environmentdirect.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;

/**
 * Security configuration for the application.
 * Defines beans for password encoding, authentication manager, and security filter chain.
 * Enables method-level security for @PreAuthorize annotations.
 */
@Configuration
@EnableWebSecurity
// @EnableMethodSecurity  // Temporarily disabled
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * Security filter chain bean for configuring security.
     * 
     * @param http the HttpSecurity to configure
     * @return SecurityFilterChain instance
     * @throws Exception if an error occurs
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/health").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/articles", "/api/articles/**").permitAll()
                .requestMatchers("/api/categories/**").permitAll()
                .requestMatchers("/api/tags/**").permitAll()
                .requestMatchers("/api/comments/**").permitAll()
                .requestMatchers("/api/rankings/**").permitAll()
                .requestMatchers("/api/projects/**").permitAll()
                .requestMatchers("/api/training-courses/**").permitAll()
                .requestMatchers("/api/reports/submit").permitAll()
                .requestMatchers("/api/service-requests/submit").permitAll()
                .requestMatchers("/api/email/**").permitAll()
                .requestMatchers("/api/password/**").permitAll()
                .requestMatchers("/api/live-data/**").permitAll()
                .requestMatchers("/api/banner/**").permitAll()
                .requestMatchers("/api/predictions/**").permitAll()
                .requestMatchers("/api/predict/**").permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }

    /**
     * Authentication manager bean for authenticating users.
     * 
     * @param authenticationConfiguration the authentication configuration
     * @return AuthenticationManager instance
     * @throws Exception if an error occurs
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Password encoder bean for hashing passwords.
     * 
     * @return BCryptPasswordEncoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * CORS configuration source bean for configuring CORS.
     * 
     * @return CorsConfigurationSource instance
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173", 
            "http://localhost:3000",
            "https://env-direct1.onrender.com",
            "https://env-direct-frontend.onrender.com"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
