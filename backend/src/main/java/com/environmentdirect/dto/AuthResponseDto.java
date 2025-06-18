package com.environmentdirect.dto;

import java.util.Set;

/**
 * DTO for authentication response.
 * Contains the JWT token and user information returned after successful authentication.
 */
public record AuthResponseDto(
    String token,
    String username,
    Set<String> roles
) {}