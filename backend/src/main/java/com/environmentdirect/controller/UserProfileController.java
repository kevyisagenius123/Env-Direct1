package com.environmentdirect.controller;

import com.environmentdirect.dto.ChangePasswordDto;
import com.environmentdirect.dto.UserProfileDto;
import com.environmentdirect.model.User;
import com.environmentdirect.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for user profile operations.
 * Handles user profile retrieval, updates, and password changes.
 */
@RestController
@RequestMapping("/api/user/profile")
public class UserProfileController {

    private final UserService userService;

    @Autowired
    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get the current user's profile.
     * 
     * @return ResponseEntity with user profile or error
     */
    @GetMapping
    public ResponseEntity<?> getCurrentUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new IllegalStateException("User not found after authentication"));
            
            UserProfileDto profileDto = new UserProfileDto(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.isEmailVerified()
            );
            
            return ResponseEntity.ok(profileDto);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Update the current user's profile.
     * 
     * @param profileDto the updated profile data
     * @return ResponseEntity with success message or error
     */
    @PutMapping
    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody UserProfileDto profileDto) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new IllegalStateException("User not found after authentication"));
            
            // Ensure the user can only update their own profile
            if (!user.getId().equals(profileDto.id())) {
                throw new IllegalArgumentException("You can only update your own profile");
            }
            
            userService.updateUserProfile(user, profileDto);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Profile updated successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Change the current user's password.
     * 
     * @param changePasswordDto the password change data
     * @return ResponseEntity with success message or error
     */
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordDto changePasswordDto) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            
            userService.changePassword(username, changePasswordDto.currentPassword(), changePasswordDto.newPassword());
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password changed successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}