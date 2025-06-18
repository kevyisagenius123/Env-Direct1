package com.environmentdirect.controller;

import com.environmentdirect.service.EmailVerificationService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for email verification operations.
 * Handles email verification and resending verification emails.
 */
@RestController
@RequestMapping("/api/auth/verify-email")
public class EmailVerificationController {

    private final EmailVerificationService emailVerificationService;

    @Autowired
    public EmailVerificationController(EmailVerificationService emailVerificationService) {
        this.emailVerificationService = emailVerificationService;
    }

    /**
     * Verify an email using a token.
     * 
     * @param token the verification token
     * @return ResponseEntity with success message or error
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {
        try {
            emailVerificationService.verifyEmail(token);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email verified successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Resend verification email.
     * 
     * @param request the resend request containing the email
     * @return ResponseEntity with success message or error
     */
    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationEmail(@Valid @RequestBody ResendVerificationRequest request) {
        try {
            emailVerificationService.resendVerificationEmail(request.email);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Verification email sent successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Request body for resending verification email.
     */
    public static class ResendVerificationRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Email should be valid")
        private String email;

        // Getters and setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
}