package com.environmentdirect.config;

import io.micrometer.core.aop.TimedAspect;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration for Micrometer metrics.
 * Enables metrics collection and monitoring.
 */
@Configuration
public class MetricsConfig {

    /**
     * Configure TimedAspect for @Timed annotation support.
     * This allows methods to be timed using the @Timed annotation.
     *
     * @param registry the meter registry
     * @return the timed aspect
     */
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
}