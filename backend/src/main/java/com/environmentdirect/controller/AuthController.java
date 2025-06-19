package com.environmentdirect.controller;

import com.environmentdirect.dto.AuthResponseDto;
import com.environmentdirect.dto.LoginRequestDto;
import com.environmentdirect.dto.UserRegistrationDto;
import com.environmentdirect.model.User;
import com.environmentdirect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for authentication operations.
 * Handles user registration and login.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    /**
     * Register a new user.
     * 
     * @param registrationDto the user registration data
     * @return ResponseEntity with success message or error
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto registrationDto) {
        try {
            User user = userService.registerUser(registrationDto);

            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("username", user.getUsername());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "An error occurred during registration");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Authenticate a user and generate a JWT token.
     * 
     * @param loginRequest the login credentials
     * @return ResponseEntity with JWT token and user information or error
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.username(), loginRequestDto.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Get user details from authentication
        org.springframework.security.core.userdetails.User userDetails = 
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        
        // Fetch the actual user entity from database
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Since we've removed JWT, we'll just return a dummy token and user info.
        return ResponseEntity.ok(new AuthResponseDto("dummy-token", user.getUsername(), user.getRoles()));
    }
}
