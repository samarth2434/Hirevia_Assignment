package com.example.authbackend.model;

import java.time.Instant;
import java.util.List;

public class AssessmentSubmission {
    private String fullName;
    private String email;
    private String experience;
    private String question1;
    private String question2;
    private String question3;
    private String codingExperience;
    private String projectDescription;
    private List<String> skills;
    private boolean termsAccepted;
    private String submittedAt;
    private String userAgent;
    private String userId;
    private Instant processedAt;

    // Default constructor
    public AssessmentSubmission() {
        this.processedAt = Instant.now();
    }

    // Getters and Setters
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getQuestion1() {
        return question1;
    }

    public void setQuestion1(String question1) {
        this.question1 = question1;
    }

    public String getQuestion2() {
        return question2;
    }

    public void setQuestion2(String question2) {
        this.question2 = question2;
    }

    public String getQuestion3() {
        return question3;
    }

    public void setQuestion3(String question3) {
        this.question3 = question3;
    }

    public String getCodingExperience() {
        return codingExperience;
    }

    public void setCodingExperience(String codingExperience) {
        this.codingExperience = codingExperience;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public boolean isTermsAccepted() {
        return termsAccepted;
    }

    public void setTermsAccepted(boolean termsAccepted) {
        this.termsAccepted = termsAccepted;
    }

    public String getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(String submittedAt) {
        this.submittedAt = submittedAt;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Instant getProcessedAt() {
        return processedAt;
    }

    public void setProcessedAt(Instant processedAt) {
        this.processedAt = processedAt;
    }

    @Override
    public String toString() {
        return "AssessmentSubmission{" +
                "fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", experience='" + experience + '\'' +
                ", skills=" + skills +
                ", submittedAt='" + submittedAt + '\'' +
                ", userId='" + userId + '\'' +
                ", processedAt=" + processedAt +
                '}';
    }
}