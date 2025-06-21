package com.environmentdirect.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuration for OpenAPI 3 documentation.
 * Provides interactive API documentation for the application.
 */
@Configuration
public class OpenApiConfig {

    /**
     * Configure OpenAPI documentation.
     *
     * @return the OpenAPI configuration
     */
    @Bean
    public OpenAPI environmentDirectOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Environment Direct API")
                        .description("API for Environment Direct - Environmental Consulting Platform")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Environment Direct Team")
                                .email("support@environmentdirect.com")
                                .url("https://www.environmentdirect.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Development Server"),
                        new Server().url("https://api.environmentdirect.com").description("Production Server")
                ));
    }
}