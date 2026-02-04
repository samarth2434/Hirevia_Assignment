package com.example.authbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class WelcomeController {

    @GetMapping("/")
    public Map<String, Object> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "running");
        response.put("message", "Hirevia Backend API");
        response.put("version", "1.0.0");
        response.put("endpoints", Map.of(
            "health", "/health",
            "api", "/api",
            "auth", "/api/auth/login"
        ));
        return response;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Backend is healthy");
        return response;
    }
}
