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
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@Profile("!mock") // Only active when 'mock' profile is NOT enabled
public class UserController {

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> getUserInfo(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("sub", jwt.getSubject());
        userInfo.put("email", jwt.getClaimAsString("email"));
        userInfo.put("name", jwt.getClaimAsString("name"));
        userInfo.put("preferred_username", jwt.getClaimAsString("preferred_username"));
        userInfo.put("roles", authentication.getAuthorities());
        userInfo.put("timestamp", Instant.now());
        userInfo.put("message", "Welcome to the user area!");
        
        return userInfo;
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> getUserProfile(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        
        Map<String, Object> profile = new HashMap<>();
        profile.put("userId", jwt.getSubject());
        profile.put("email", jwt.getClaimAsString("email"));
        profile.put("name", jwt.getClaimAsString("name"));
        profile.put("username", jwt.getClaimAsString("preferred_username"));
        profile.put("emailVerified", jwt.getClaimAsBoolean("email_verified"));
        profile.put("lastLogin", Instant.now());
        
        return profile;
    }
}