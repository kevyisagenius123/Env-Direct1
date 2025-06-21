package com.environmentdirect.repository;

import com.environmentdirect.config.PostgresTestContainer;
import com.environmentdirect.model.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration test for UserRepository.
 * Uses TestContainers to run tests against a real PostgreSQL database.
 */
@DataJpaTest
@Testcontainers
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryIntegrationTest {

    @Container
    private static final PostgreSQLContainer<?> postgresContainer = new PostgreSQLContainer<>("postgres:14-alpine")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void registerPgProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgresContainer::getJdbcUrl);
        registry.add("spring.datasource.username", postgresContainer::getUsername);
        registry.add("spring.datasource.password", postgresContainer::getPassword);
        registry.add("spring.datasource.driver-class-name", () -> "org.postgresql.Driver");
        registry.add("spring.jpa.database-platform", () -> "org.hibernate.dialect.PostgreSQLDialect");
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveAndFindUser() {
        // Create a test user
        User user = new User("testuser", "password123", "test@example.com");

        // Save the user
        User savedUser = userRepository.save(user);

        // Verify the user was saved with an ID
        assertNotNull(savedUser.getId());

        // Find the user by ID
        Optional<User> foundUser = userRepository.findById(savedUser.getId());

        // Verify the user was found
        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUsername());
        assertEquals("test@example.com", foundUser.get().getEmail());
    }

    @Test
    public void testFindByUsername() {
        // Create a test user
        User user = new User("findme", "password123", "findme@example.com");

        // Save the user
        userRepository.save(user);

        // Find the user by username
        Optional<User> foundUser = userRepository.findByUsername("findme");

        // Verify the user was found
        assertTrue(foundUser.isPresent());
        assertEquals("findme", foundUser.get().getUsername());
    }

    @Test
    public void testFindByEmail() {
        // Create a test user
        User user = new User("emailtest", "password123", "unique@example.com");

        // Save the user
        userRepository.save(user);

        // Find the user by email
        Optional<User> foundUser = userRepository.findByEmail("unique@example.com");

        // Verify the user was found
        assertTrue(foundUser.isPresent());
        assertEquals("emailtest", foundUser.get().getUsername());
    }
}
