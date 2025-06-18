package com.environmentdirect.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for updating the status of a report.
 * Contains the new status for the report.
 */
public class ReportStatusUpdateDto {
    @NotBlank(message = "Status is required")
    private String status;
    
    private String comment; // Optional comment about the status change

    // Constructors
    public ReportStatusUpdateDto() {
    }

    public ReportStatusUpdateDto(String status, String comment) {
        this.status = status;
        this.comment = comment;
    }

    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}