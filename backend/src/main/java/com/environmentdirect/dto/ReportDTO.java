package com.environmentdirect.dto;

// No JSR 303 validation annotations for now, can be added later (e.g. @NotBlank, @Email)
public class ReportDTO {
    private String location;
    private String issueType;
    private String description;
    private String reportedBy; // Optional
    private String contactEmail; // Optional
    // image will be handled separately, perhaps as MultipartFile in controller

    public ReportDTO() {}

    public ReportDTO(String location, String issueType, String description, String reportedBy, String contactEmail) {
        this.location = location;
        this.issueType = issueType;
        this.description = description;
        this.reportedBy = reportedBy;
        this.contactEmail = contactEmail;
    }

    // Getters and Setters
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getIssueType() {
        return issueType;
    }

    public void setIssueType(String issueType) {
        this.issueType = issueType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getReportedBy() {
        return reportedBy;
    }

    public void setReportedBy(String reportedBy) {
        this.reportedBy = reportedBy;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }
} 