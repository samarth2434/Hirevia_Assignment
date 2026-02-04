package com.example.authbackend.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Profile("!mock") // Only active when 'mock' profile is NOT enabled
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getAdminInfo(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        
        Map<String, Object> adminInfo = new HashMap<>();
        adminInfo.put("adminId", jwt.getSubject());
        adminInfo.put("email", jwt.getClaimAsString("email"));
        adminInfo.put("name", jwt.getClaimAsString("name"));
        adminInfo.put("roles", authentication.getAuthorities());
        adminInfo.put("timestamp", Instant.now());
        adminInfo.put("message", "Welcome to the admin panel!");
        adminInfo.put("permissions", List.of("READ_USERS", "WRITE_USERS", "DELETE_USERS", "MANAGE_SYSTEM"));
        
        return adminInfo;
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        response.put("users", List.of(
            Map.of("id", "1", "name", "John Doe", "email", "john@example.com", "role", "USER"),
            Map.of("id", "2", "name", "Jane Smith", "email", "jane@example.com", "role", "ADMIN"),
            Map.of("id", "3", "name", "Bob Johnson", "email", "bob@example.com", "role", "USER")
        ));
        response.put("total", 3);
        response.put("timestamp", Instant.now());
        
        return response;
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getSystemStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", 150);
        stats.put("activeUsers", 45);
        stats.put("adminUsers", 5);
        stats.put("systemUptime", "15 days, 3 hours");
        stats.put("lastBackup", "2024-01-15T10:30:00Z");
        stats.put("timestamp", Instant.now());
        
        return stats;
    }
}