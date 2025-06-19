package com.environmentdirect.service;

import com.environmentdirect.model.PasswordResetToken;
import com.environmentdirect.model.User;
import com.environmentdirect.repository.PasswordResetTokenRepository;
import com.environmentdirect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Service for password reset operations.
 * Handles token creation, validation, and password reset.
 */
@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    // In a real application, you would inject an EmailService here

    @Autowired
    public PasswordResetService(
            UserRepository userRepository,
            PasswordResetTokenRepository tokenRepository,
            @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Create a password reset token for a user with the given email.
     * 
     * @param email the email of the user
     * @throws IllegalArgumentException if the email is not found
     */
    @Transactional
    public void createPasswordResetTokenForEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No user found with email: " + email));

        // Delete any existing tokens for this user
        tokenRepository.findByUser(user).forEach(tokenRepository::delete);

        // Create a new token
        PasswordResetToken token = new PasswordResetToken(user);
        tokenRepository.save(token);

        // In a real application, you would send an email with the reset link
        // For now, we'll just log the token
        System.out.println("Password reset token for " + email + ": " + token.getToken());
    }

    /**
     * Validate a password reset token.
     * 
     * @param token the token to validate
     * @throws IllegalArgumentException if the token is invalid or expired
     */
    @Transactional(readOnly = true)
    public void validatePasswordResetToken(String token) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid password reset token"));

        if (resetToken.isExpired()) {
            throw new IllegalArgumentException("Password reset token has expired");
        }
    }

    /**
     * Reset a user's password using a valid token.
     * 
     * @param token the password reset token
     * @param newPassword the new password
     * @throws IllegalArgumentException if the token is invalid or expired
     */
    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid password reset token"));

        if (resetToken.isExpired()) {
            throw new IllegalArgumentException("Password reset token has expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Delete the used token
        tokenRepository.delete(resetToken);
    }

    /**
     * Clean up expired tokens.
     * This method should be scheduled to run periodically.
     */
    @Transactional
    public void cleanupExpiredTokens() {
        tokenRepository.deleteAllExpiredTokens(LocalDateTime.now());
    }
}