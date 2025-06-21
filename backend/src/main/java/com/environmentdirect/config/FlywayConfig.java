package com.environmentdirect.config;

import org.flywaydb.core.Flyway;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Configuration for Flyway database migrations.
 * Provides custom migration strategies for different environments.
 */
@Configuration
public class FlywayConfig {

    /**
     * Custom migration strategy for development environment.
     * Cleans the database before migration to ensure a fresh start.
     * This is useful during development but should never be used in production.
     *
     * @return the migration strategy
     */
    @Bean
    @Profile("dev")
    public FlywayMigrationStrategy cleanMigrateStrategy() {
        return flyway -> {
            // Clean the database before migration (only in dev profile)
            flyway.clean();
            // Then migrate
            flyway.migrate();
        };
    }

    /**
     * Custom migration strategy for test environment.
     * Repairs the metadata table before migration to handle potential inconsistencies.
     *
     * @return the migration strategy
     */
    @Bean
    @Profile("test")
    public FlywayMigrationStrategy repairMigrateStrategy() {
        return flyway -> {
            // Repair the metadata table before migration
            flyway.repair();
            // Then migrate
            flyway.migrate();
        };
    }

    /**
     * Default migration strategy for all other environments.
     * Simply performs migration without cleaning or repairing.
     *
     * @return the migration strategy
     */
    @Bean
    @Profile("!dev & !test")
    public FlywayMigrationStrategy defaultMigrateStrategy() {
        return Flyway::migrate;
    }
}