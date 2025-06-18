package com.environmentdirect.repository;

import com.environmentdirect.model.EmailVerificationToken;
import com.environmentdirect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Repository for email verification token operations.
 */
@Repository
public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Long> {
    
    /**
     * Find a token by its value.
     * 
     * @param token the token value
     * @return an Optional containing the token if found, or empty if not found
     */
    Optional<EmailVerificationToken> findByToken(String token);
    
    /**
     * Find a token by user.
     * 
     * @param user the user
     * @return an Optional containing the token if found, or empty if not found
     */
    Optional<EmailVerificationToken> findByUser(User user);
    
    /**
     * Delete all expired tokens.
     * 
     * @param now the current time
     * @return the number of tokens deleted
     */
    @Modifying
    @Query("DELETE FROM EmailVerificationToken t WHERE t.expiryDate < ?1")
    int deleteAllExpiredTokens(LocalDateTime now);
}