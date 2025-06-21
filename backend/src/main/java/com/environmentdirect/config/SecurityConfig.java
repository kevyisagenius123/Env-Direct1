package com.environmentdirect.config;

import com.environmentdirect.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
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
@EnableMethodSecurity
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(UserDetailsService userDetailsService, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
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
            // Use stateless session management
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/", "/health").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll() // OpenAPI endpoints

                // Public read-only endpoints
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/articles/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/categories/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/tags/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/comments/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/rankings/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/projects/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/training-courses/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/reports/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/live-data/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/banner/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/predictions/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/predict/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/ncdc/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/external-data/**").permitAll()

                // Endpoints that require authentication but no specific role
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/comments/**").authenticated()
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/service-requests/submit").authenticated()

                // Admin-only endpoints
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/articles/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/articles/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/articles/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/categories/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/categories/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/categories/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/tags/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/tags/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/tags/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/reports/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/reports/**").hasRole("ADMIN")

                // Consultant-only endpoints
                .requestMatchers("/api/external-data/**").hasRole("CONSULTANT")

                // Any other request requires authentication
                .anyRequest().authenticated()
            );

        // Add JWT filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

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
            "http://localhost:5174",
            "http://localhost:5175",
            "http://localhost:3000",
            "http://192.168.68.119:5174",
            "http://192.168.68.119:5175",
            "https://environment-direct-frontend.vercel.app",
            "https://environment-direct-frontend-5oz7nwxmk.vercel.app",
            "https://environment-direct-frontend-dbbdpyoeo.vercel.app",
            "https://environment-direct-frontend-jsepw3wlu.vercel.app",
            "https://env-direct1.onrender.com",
            "https://env-direct-frontend.onrender.com",
            "https://environment-direct-frontend-exwhx7zhv.vercel.app",
            "https://environment-direct-frontend-rjy7mwjt3.vercel.app",
            "https://environment-direct-frontend-3061klhsq.vercel.app",
            "https://environment-direct-frontend-l8fvewjh0.vercel.app"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
