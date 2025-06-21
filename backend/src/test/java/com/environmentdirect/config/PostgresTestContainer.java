package com.environmentdirect.config;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

import java.util.HashMap;
import java.util.Map;

/**
 * Singleton PostgreSQL container for integration tests.
 * This container is started once and shared across all tests.
 * Implements ApplicationContextInitializer to configure the Spring context with container properties.
 */
public class PostgresTestContainer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    private static final String POSTGRES_IMAGE = "postgres:14-alpine";
    private static final String DATABASE_NAME = "testdb";
    private static final String USERNAME = "test";
    private static final String PASSWORD = "test";

    // Static singleton container instance
    private static final PostgreSQLContainer<?> POSTGRES_CONTAINER;

    // Initialize the container
    static {
        POSTGRES_CONTAINER = new PostgreSQLContainer<>(DockerImageName.parse(POSTGRES_IMAGE))
                .withDatabaseName(DATABASE_NAME)
                .withUsername(USERNAME)
                .withPassword(PASSWORD);

        // Start the container
        POSTGRES_CONTAINER.start();
    }

    /**
     * Initialize the application context with container properties.
     *
     * @param applicationContext the application context to configure
     */
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment environment = applicationContext.getEnvironment();

        // Create a map of properties to add to the environment
        Map<String, Object> testProperties = new HashMap<>();
        testProperties.put("spring.datasource.url", POSTGRES_CONTAINER.getJdbcUrl());
        testProperties.put("spring.datasource.username", POSTGRES_CONTAINER.getUsername());
        testProperties.put("spring.datasource.password", POSTGRES_CONTAINER.getPassword());
        testProperties.put("spring.datasource.driver-class-name", "org.postgresql.Driver");
        testProperties.put("spring.jpa.database-platform", "org.hibernate.dialect.PostgreSQLDialect");

        // Add the properties to the environment
        MapPropertySource propertySource = new MapPropertySource("testcontainers", testProperties);
        environment.getPropertySources().addFirst(propertySource);
    }

    /**
     * Get the running PostgreSQL container instance.
     *
     * @return the PostgreSQL container
     */
    public static PostgreSQLContainer<?> getContainer() {
        return POSTGRES_CONTAINER;
    }
}
