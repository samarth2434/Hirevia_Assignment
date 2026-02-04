package com.example.authbackend.controller;

import com.example.authbackend.model.AssessmentSubmission;
import org.springframework.context.annotation.Profile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api")
@Profile("!mock") // Only active when 'mock' profile is NOT enabled
public class AssessmentController {

    // In-memory storage for demo purposes (use database in production)
    private final Map<String, AssessmentSubmission> assessmentStorage = new ConcurrentHashMap<>();
    private final AtomicLong submissionCounter = new AtomicLong(0);

    @PostMapping("/submit-assessment")
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> submitAssessment(
            @RequestBody AssessmentSubmission submission,
            Authentication authentication) {
        
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userId = jwt.getSubject();
        String userEmail = jwt.getClaimAsString("email");
        String userName = jwt.getClaimAsString("name");

        // Set user information
        submission.setUserId(userId);
        submission.setProcessedAt(Instant.now());

        // Generate submission ID
        String submissionId = "ASSESS_" + submissionCounter.incrementAndGet() + "_" + System.currentTimeMillis();
        
        // Store submission (in production, save to database)
        assessmentStorage.put(submissionId, submission);

        // Log submission for monitoring
        System.out.println("Assessment submitted by user: " + userName + " (" + userEmail + ")");
        System.out.println("Submission ID: " + submissionId);
        System.out.println("Skills: " + submission.getSkills());
        System.out.println("Experience Level: " + submission.getExperience());

        // Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Assessment submitted successfully");
        response.put("submissionId", submissionId);
        response.put("submittedAt", Instant.now());
        response.put("status", "RECEIVED");
        
        // Assessment summary
        Map<String, Object> summary = new HashMap<>();
        summary.put("questionsAnswered", 3);
        summary.put("skillsSelected", submission.getSkills().size());
        summary.put("experienceLevel", submission.getExperience());
        summary.put("completionRate", "100%");
        response.put("summary", summary);

        // Next steps information
        Map<String, Object> nextSteps = new HashMap<>();
        nextSteps.put("reviewTime", "2-3 business days");
        nextSteps.put("contactMethod", "email");
        nextSteps.put("nextPhase", "Technical Interview");
        response.put("nextSteps", nextSteps);

        return response;
    }

    @GetMapping("/assessments")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getAllAssessments(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String adminEmail = jwt.getClaimAsString("email");

        System.out.println("Admin " + adminEmail + " requested all assessments");

        Map<String, Object> response = new HashMap<>();
        response.put("assessments", assessmentStorage.values());
        response.put("totalSubmissions", assessmentStorage.size());
        response.put("retrievedAt", Instant.now());
        response.put("retrievedBy", adminEmail);

        return response;
    }

    @GetMapping("/assessment/{submissionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getAssessmentById(
            @PathVariable String submissionId,
            Authentication authentication) {
        
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String adminEmail = jwt.getClaimAsString("email");

        AssessmentSubmission submission = assessmentStorage.get(submissionId);
        
        Map<String, Object> response = new HashMap<>();
        if (submission != null) {
            response.put("success", true);
            response.put("assessment", submission);
            response.put("retrievedAt", Instant.now());
            response.put("retrievedBy", adminEmail);
        } else {
            response.put("success", false);
            response.put("message", "Assessment not found");
            response.put("submissionId", submissionId);
        }

        return response;
    }

    @GetMapping("/my-assessments")
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> getMyAssessments(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userId = jwt.getSubject();
        String userEmail = jwt.getClaimAsString("email");

        // Filter assessments by user ID
        List<AssessmentSubmission> userAssessments = assessmentStorage.values().stream()
                .filter(assessment -> userId.equals(assessment.getUserId()))
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("assessments", userAssessments);
        response.put("totalSubmissions", userAssessments.size());
        response.put("userId", userId);
        response.put("userEmail", userEmail);
        response.put("retrievedAt", Instant.now());

        return response;
    }

    @GetMapping("/assessment-stats")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getAssessmentStats(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String adminEmail = jwt.getClaimAsString("email");

        // Calculate statistics
        long totalSubmissions = assessmentStorage.size();
        
        Map<String, Long> experienceLevels = new HashMap<>();
        Map<String, Long> topSkills = new HashMap<>();
        
        assessmentStorage.values().forEach(assessment -> {
            // Count experience levels
            String experience = assessment.getExperience();
            experienceLevels.put(experience, experienceLevels.getOrDefault(experience, 0L) + 1);
            
            // Count skills
            if (assessment.getSkills() != null) {
                assessment.getSkills().forEach(skill -> 
                    topSkills.put(skill, topSkills.getOrDefault(skill, 0L) + 1)
                );
            }
        });

        Map<String, Object> response = new HashMap<>();
        response.put("totalSubmissions", totalSubmissions);
        response.put("experienceLevels", experienceLevels);
        response.put("topSkills", topSkills);
        response.put("generatedAt", Instant.now());
        response.put("generatedBy", adminEmail);

        return response;
    }

    @DeleteMapping("/assessment/{submissionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> deleteAssessment(
            @PathVariable String submissionId,
            Authentication authentication) {
        
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String adminEmail = jwt.getClaimAsString("email");

        AssessmentSubmission removed = assessmentStorage.remove(submissionId);
        
        Map<String, Object> response = new HashMap<>();
        if (removed != null) {
            response.put("success", true);
            response.put("message", "Assessment deleted successfully");
            response.put("submissionId", submissionId);
            response.put("deletedBy", adminEmail);
            response.put("deletedAt", Instant.now());
            
            System.out.println("Assessment " + submissionId + " deleted by admin: " + adminEmail);
        } else {
            response.put("success", false);
            response.put("message", "Assessment not found");
            response.put("submissionId", submissionId);
        }

        return response;
    }
}