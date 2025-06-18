package com.environmentdirect.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob; // For potentially large text fields like description
import java.time.LocalDateTime;

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String location; // e.g., "Lat: 40.7128, Long: -74.0060" or "123 Main St, Anytown"
    private String issueType; // e.g., "air_pollution", "water_pollution", "waste_dumping"
    
    @Lob // Good for longer text
    private String description;
    
    private String imageUrl; // Store path or URL to the image
    
    private String reportedBy; // Optional: Name of the reporter
    private String contactEmail; // Optional: Email of the reporter
    
    private LocalDateTime dateReported;
    private String status; // e.g., "PENDING_REVIEW", "INVESTIGATING", "RESOLVED", "REJECTED"

    // Constructors
    public Report() {
        this.dateReported = LocalDateTime.now();
        this.status = "PENDING_REVIEW"; // Default status
    }

    public Report(String location, String issueType, String description, String imageUrl, String reportedBy, String contactEmail) {
        this.location = location;
        this.issueType = issueType;
        this.description = description;
        this.imageUrl = imageUrl; // Handle actual image upload/storage separately
        this.reportedBy = reportedBy;
        this.contactEmail = contactEmail;
        this.dateReported = LocalDateTime.now();
        this.status = "PENDING_REVIEW";
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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

    public LocalDateTime getDateReported() {
        return dateReported;
    }

    public void setDateReported(LocalDateTime dateReported) {
        this.dateReported = dateReported;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Report{" +
                "id=" + id +
                ", location='" + location + "'" +
                ", issueType='" + issueType + "'" +
                ", description='" + description + "'" +
                ", imageUrl='" + imageUrl + "'" +
                ", reportedBy='" + reportedBy + "'" +
                ", contactEmail='" + contactEmail + "'" +
                ", dateReported=" + dateReported +
                ", status='" + status + "'" +
                '}';
    }
} 