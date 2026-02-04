package com.example.authbackend.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
@Profile("mock") // Only active when 'mock' profile is enabled
public class MockAuthController {

    // In-memory user storage for demo (in production, use database)
    private static final Map<String, RegisteredUser> registeredUsers = new HashMap<>();
    
    static {
        // Initialize with default users
        registeredUsers.put("testuser", new RegisteredUser("testuser", "password123", "testuser@example.com", "Test User", List.of("USER")));
        registeredUsers.put("admin", new RegisteredUser("admin", "admin123", "admin@example.com", "Admin User", List.of("USER", "ADMIN")));
    }
    
    // Inner class for registered users
    public static class RegisteredUser {
        private String username;
        private String password;
        private String email;
        private String fullName;
        private List<String> roles;
        
        public RegisteredUser(String username, String password, String email, String fullName, List<String> roles) {
            this.username = username;
            this.password = password;
            this.email = email;
            this.fullName = fullName;
            this.roles = roles;
        }
        
        // Getters
        public String getUsername() { return username; }
        public String getPassword() { return password; }
        public String getEmail() { return email; }
        public String getFullName() { return fullName; }
        public List<String> getRoles() { return roles; }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        // Mock registration - store in memory
        String username = registerRequest.getUsername();
        String password = registerRequest.getPassword();
        String email = registerRequest.getEmail();
        String fullName = registerRequest.getFullName();
        
        // Basic validation
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.status(400).body(Map.of("error", "Username is required"));
        }
        if (password == null || password.length() < 6) {
            return ResponseEntity.status(400).body(Map.of("error", "Password must be at least 6 characters"));
        }
        if (email == null || !email.contains("@")) {
            return ResponseEntity.status(400).body(Map.of("error", "Valid email is required"));
        }
        
        // Check if user already exists
        if (registeredUsers.containsKey(username)) {
            return ResponseEntity.status(409).body(Map.of("error", "Username already exists"));
        }
        
        // Store new user
        RegisteredUser newUser = new RegisteredUser(username, password, email, fullName, List.of("USER"));
        registeredUsers.put(username, newUser);
        
        // Mock successful registration
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration successful");
        response.put("username", username);
        response.put("email", email);
        response.put("fullName", fullName);
        response.put("role", "USER"); // New users get USER role by default
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Mock login - validate against registered users
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        
        // Check if user exists and password matches
        RegisteredUser user = registeredUsers.get(username);
        if (user != null && user.getPassword().equals(password)) {
            
            // Create mock JWT token (just a simple string for demo)
            String mockToken = "mock-jwt-token-" + username;
            
            Map<String, Object> response = new HashMap<>();
            response.put("access_token", mockToken);
            response.put("token_type", "Bearer");
            response.put("expires_in", 3600);
            response.put("username", username);
            response.put("roles", user.getRoles());
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        
        String username = authentication.getName();
        RegisteredUser user = registeredUsers.get(username);
        
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("username", user.getUsername());
        userResponse.put("roles", user.getRoles());
        userResponse.put("email", user.getEmail());
        userResponse.put("firstName", user.getFullName().split(" ")[0]);
        userResponse.put("lastName", user.getFullName().contains(" ") ? 
            user.getFullName().substring(user.getFullName().indexOf(" ") + 1) : "");
        
        return ResponseEntity.ok(userResponse);
    }
    
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Mock auth controller is working");
        response.put("timestamp", System.currentTimeMillis());
        response.put("profile", "mock");
        response.put("registeredUsers", registeredUsers.keySet());
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
    
    // DTO for register request
    public static class RegisterRequest {
        private String username;
        private String password;
        private String email;
        private String fullName;
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
    }
    
    // DTO for login request
    public static class LoginRequest {
        private String username;
        private String password;
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}