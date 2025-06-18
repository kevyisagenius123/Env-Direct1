package com.environmentdirect.dto;

// Using a record for concise DTOs (Java 16+)
// Or use a class with getters/setters and Lombok if preferred
public record CategoryDto(Long id, String name, String description) {
}