package com.environmentdirect.controller;

import com.environmentdirect.dto.PasswordResetRequestDto;
import com.environmentdirect.dto.PasswordResetTokenVerificationDto;
import com.environmentdirect.service.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for password reset operations.
 * Handles password reset requests and token verification.
 */
@RestController
@RequestMapping("/api/auth/password-reset")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    @Autowired
    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    /**
     * Request a password reset.
     * Generates a token and sends an email with reset instructions.
     * 
     * @param requestDto the password reset request data
     * @return ResponseEntity with success message or error
     */
    @PostMapping("/request")
    public ResponseEntity<?> requestPasswordReset(@Valid @RequestBody PasswordResetRequestDto requestDto) {
        try {
            passwordResetService.createPasswordResetTokenForEmail(requestDto.email());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset email sent successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Verify a password reset token and set a new password.
     * 
     * @param verificationDto the token verification data
     * @return ResponseEntity with success message or error
     */
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPasswordResetToken(@Valid @RequestBody PasswordResetTokenVerificationDto verificationDto) {
        try {
            passwordResetService.validatePasswordResetToken(verificationDto.token());
            passwordResetService.resetPassword(verificationDto.token(), verificationDto.newPassword());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset successful");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
