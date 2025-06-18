package com.environmentdirect.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for user login.
 * Contains the credentials needed for user authentication.
 */
public record LoginRequestDto(
    @NotBlank(message = "Username is required")
    String username,
    
    @NotBlank(message = "Password is required")
    String password
) {}