package com.environmentdirect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO for user profile data.
 * Contains user profile information for display and updates.
 */
public record UserProfileDto(
    @NotNull(message = "User ID is required")
    Long id,
    
    @NotBlank(message = "Username is required")
    String username,
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    String email,
    
    boolean emailVerified
) {}