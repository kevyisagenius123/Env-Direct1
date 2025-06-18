package com.environmentdirect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO for password reset requests.
 * Contains the email address of the user requesting a password reset.
 */
public record PasswordResetRequestDto(
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    String email
) {}