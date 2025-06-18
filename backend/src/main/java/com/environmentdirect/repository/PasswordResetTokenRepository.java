package com.environmentdirect.repository;

import com.environmentdirect.model.PasswordResetToken;
import com.environmentdirect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Repository for password reset token operations.
 */
@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    
    /**
     * Find a token by its value.
     * 
     * @param token the token value
     * @return an Optional containing the token if found, or empty if not found
     */
    Optional<PasswordResetToken> findByToken(String token);
    
    /**
     * Find all tokens for a specific user.
     * 
     * @param user the user
     * @return a list of tokens for the user
     */
    Iterable<PasswordResetToken> findByUser(User user);
    
    /**
     * Delete all expired tokens.
     * 
     * @param now the current time
     * @return the number of tokens deleted
     */
    @Modifying
    @Query("DELETE FROM PasswordResetToken t WHERE t.expiryDate < ?1")
    int deleteAllExpiredTokens(LocalDateTime now);
}