package com.environmentdirect.config;

import com.environmentdirect.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Security configuration for the application.
 * Defines beans for password encoding, authentication manager, and security filter chain.
 * Enables method-level security for @PreAuthorize annotations.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
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
            "https://environment-direct.vercel.app",
            "https://env-direct.vercel.app",
            "https://environment-direct-frontend.vercel.app",
            "https://environment-direct.netlify.app",
            "https://env-direct.netlify.app",
            "https://environment-direct-frontend.netlify.app",
            "https://wonderful-boba-48e576.netlify.app",
            "https://env-direct.onrender.com",
            "https://environment-direct-backend.up.railway.app",
            "https://triumphant-expression-production.up.railway.app",
            "https://env-direct-production.up.railway.app"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
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
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/projects/**").permitAll()
                .requestMatchers("/api/service-requests/**").permitAll()
                .requestMatchers("/api/training-courses/**").permitAll()
                .requestMatchers("/api/articles/**").permitAll()
                .requestMatchers("/api/categories/**").permitAll()
                .requestMatchers("/api/tags/**").permitAll()
                .requestMatchers("/api/chat/**").permitAll()
                .requestMatchers("/api/live-data").permitAll()
                .requestMatchers("/api/rankings").permitAll()
                .requestMatchers("/api/predictions").permitAll()
                .requestMatchers("/api/banner").permitAll()
                .requestMatchers("/api/dashboard/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/reports", "/api/reports/**").permitAll()
                .requestMatchers("/api/predict/**").permitAll()
                // Protected endpoints
                .anyRequest().authenticated()
            );

        // Allow frames for H2 console
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        // Add JWT authentication filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
