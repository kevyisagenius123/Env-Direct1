package com.environmentdirect.service;

import com.environmentdirect.model.EmailVerificationToken;
import com.environmentdirect.model.User;
import com.environmentdirect.repository.EmailVerificationTokenRepository;
import com.environmentdirect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Service for email verification operations.
 * Handles token creation, validation, and email verification.
 */
@Service
public class EmailVerificationService {

    private final UserRepository userRepository;
    private final EmailVerificationTokenRepository tokenRepository;
    // In a real application, you would inject an EmailService here

    @Autowired
    public EmailVerificationService(
            UserRepository userRepository,
            EmailVerificationTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    /**
     * Create an email verification token for a user.
     * 
     * @param user the user
     * @return the created token
     */
    @Transactional
    public EmailVerificationToken createVerificationToken(User user) {
        // Delete any existing tokens for this user
        tokenRepository.findByUser(user).ifPresent(tokenRepository::delete);

        // Create a new token
        EmailVerificationToken token = new EmailVerificationToken(user);
        tokenRepository.save(token);

        // In a real application, you would send an email with the verification link
        // For now, we'll just log the token
        System.out.println("Email verification token for " + user.getEmail() + ": " + token.getToken());

        return token;
    }

    /**
     * Verify a user's email using a token.
     * 
     * @param token the token value
     * @return the verified user
     * @throws IllegalArgumentException if the token is invalid or expired
     */
    @Transactional
    public User verifyEmail(String token) {
        EmailVerificationToken verificationToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email verification token"));

        if (verificationToken.isExpired()) {
            throw new IllegalArgumentException("Email verification token has expired");
        }

        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);

        // Delete the used token
        tokenRepository.delete(verificationToken);

        return user;
    }

    /**
     * Resend verification email for a user.
     * 
     * @param email the email of the user
     * @throws IllegalArgumentException if the email is not found or already verified
     */
    @Transactional
    public void resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No user found with email: " + email));

        if (user.isEmailVerified()) {
            throw new IllegalArgumentException("Email is already verified");
        }

        createVerificationToken(user);
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