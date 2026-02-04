package com.example.authbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "https://*.vercel.app"})
public class MockAssessmentController {

    // In-memory storage for demo purposes
    private final Map<String, AssessmentSubmission> assessmentStorage = new ConcurrentHashMap<>();
    private final AtomicLong submissionCounter = new AtomicLong(0);

    @PostMapping("/submit-assessment")
    public ResponseEntity<?> submitAssessment(
            @RequestBody Map<String, Object> submission,
            Authentication authentication) {
        
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
        }

        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .map(role -> role.replace("ROLE_", ""))
            .collect(Collectors.toList());

        // Check if user has USER role
        if (!roles.contains("USER")) {
            return ResponseEntity.status(403).body(Map.of("error", "USER role required"));
        }

        try {
            // Create assessment submission
            AssessmentSubmission assessmentSubmission = new AssessmentSubmission();
            assessmentSubmission.setId(submissionCounter.incrementAndGet());
            assessmentSubmission.setUserId(username);
            assessmentSubmission.setFullName((String) submission.get("fullName"));
            assessmentSubmission.setEmail((String) submission.get("email"));
            assessmentSubmission.setExperience((String) submission.get("experience"));
            assessmentSubmission.setCodingExperience((String) submission.get("codingExperience"));
            assessmentSubmission.setProjectDescription((String) submission.get("projectDescription"));
            
            // Handle skills array
            @SuppressWarnings("unchecked")
            List<String> skills = (List<String>) submission.get("skills");
            assessmentSubmission.setSkills(skills);
            
            assessmentSubmission.setTermsAccepted((Boolean) submission.get("termsAccepted"));
            assessmentSubmission.setSubmittedAt(Instant.now().toString());
            assessmentSubmission.setUserAgent((String) submission.get("userAgent"));

            // Handle technical questions
            Map<String, String> technicalAnswers = new HashMap<>();
            for (Map.Entry<String, Object> entry : submission.entrySet()) {
                String key = entry.getKey();
                if (key.startsWith("question") || key.startsWith("tech")) {
                    technicalAnswers.put(key, (String) entry.getValue());
                }
            }
            assessmentSubmission.setTechnicalAnswers(technicalAnswers);

            // Store assessment
            String submissionKey = username + "_" + assessmentSubmission.getId();
            assessmentStorage.put(submissionKey, assessmentSubmission);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Assessment submitted successfully");
            response.put("submissionId", assessmentSubmission.getId());
            response.put("submittedAt", assessmentSubmission.getSubmittedAt());
            response.put("status", "success");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to submit assessment: " + e.getMessage()));
        }
    }

    @GetMapping("/my-assessments")
    public ResponseEntity<?> getMyAssessments(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
        }

        String username = authentication.getName();
        
        List<AssessmentSubmission> userAssessments = assessmentStorage.values().stream()
            .filter(assessment -> username.equals(assessment.getUserId()))
            .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("assessments", userAssessments);
        response.put("count", userAssessments.size());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/assessments")
    public ResponseEntity<?> getAllAssessments(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
        }

        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .map(role -> role.replace("ROLE_", ""))
            .collect(Collectors.toList());

        if (!roles.contains("ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "ADMIN role required"));
        }

        List<AssessmentSubmission> allAssessments = new ArrayList<>(assessmentStorage.values());

        Map<String, Object> response = new HashMap<>();
        response.put("assessments", allAssessments);
        response.put("count", allAssessments.size());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/assessment-stats")
    public ResponseEntity<?> getAssessmentStats(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
        }

        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .map(role -> role.replace("ROLE_", ""))
            .collect(Collectors.toList());

        if (!roles.contains("ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "ADMIN role required"));
        }

        List<AssessmentSubmission> allAssessments = new ArrayList<>(assessmentStorage.values());

        // Calculate statistics
        Map<String, Long> experienceLevels = allAssessments.stream()
            .collect(Collectors.groupingBy(
                AssessmentSubmission::getExperience,
                Collectors.counting()
            ));

        Map<String, Long> topSkills = allAssessments.stream()
            .flatMap(assessment -> assessment.getSkills().stream())
            .collect(Collectors.groupingBy(
                skill -> skill,
                Collectors.counting()
            ));

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSubmissions", allAssessments.size());
        stats.put("experienceLevels", experienceLevels);
        stats.put("topSkills", topSkills);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getAdminData(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
        }

        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .map(role -> role.replace("ROLE_", ""))
            .collect(Collectors.toList());

        if (!roles.contains("ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "ADMIN role required"));
        }

        Map<String, Object> adminData = new HashMap<>();
        adminData.put("message", "Admin access granted");
        adminData.put("username", authentication.getName());
        adminData.put("roles", roles);
        adminData.put("totalAssessments", assessmentStorage.size());
        adminData.put("timestamp", Instant.now().toString());

        return ResponseEntity.ok(adminData);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserData(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
        }

        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .map(role -> role.replace("ROLE_", ""))
            .collect(Collectors.toList());

        Map<String, Object> userData = new HashMap<>();
        userData.put("message", "User access granted");
        userData.put("username", username);
        userData.put("roles", roles);
        userData.put("timestamp", Instant.now().toString());

        return ResponseEntity.ok(userData);
    }

    // Inner class for assessment submission
    public static class AssessmentSubmission {
        private Long id;
        private String userId;
        private String fullName;
        private String email;
        private String experience;
        private String codingExperience;
        private String projectDescription;
        private List<String> skills;
        private Boolean termsAccepted;
        private String submittedAt;
        private String userAgent;
        private Map<String, String> technicalAnswers;

        // Getters and setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getExperience() { return experience; }
        public void setExperience(String experience) { this.experience = experience; }

        public String getCodingExperience() { return codingExperience; }
        public void setCodingExperience(String codingExperience) { this.codingExperience = codingExperience; }

        public String getProjectDescription() { return projectDescription; }
        public void setProjectDescription(String projectDescription) { this.projectDescription = projectDescription; }

        public List<String> getSkills() { return skills; }
        public void setSkills(List<String> skills) { this.skills = skills; }

        public Boolean getTermsAccepted() { return termsAccepted; }
        public void setTermsAccepted(Boolean termsAccepted) { this.termsAccepted = termsAccepted; }

        public String getSubmittedAt() { return submittedAt; }
        public void setSubmittedAt(String submittedAt) { this.submittedAt = submittedAt; }

        public String getUserAgent() { return userAgent; }
        public void setUserAgent(String userAgent) { this.userAgent = userAgent; }

        public Map<String, String> getTechnicalAnswers() { return technicalAnswers; }
        public void setTechnicalAnswers(Map<String, String> technicalAnswers) { this.technicalAnswers = technicalAnswers; }
    }
}