package com.environmentdirect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO for password reset token verification.
 * Contains the token and the new password for resetting a user's password.
 */
public record PasswordResetTokenVerificationDto(
    @NotBlank(message = "Token is required")
    String token,
    
    @NotBlank(message = "New password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    String newPassword
) {}