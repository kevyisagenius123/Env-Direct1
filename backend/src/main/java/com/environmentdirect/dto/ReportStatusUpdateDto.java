package com.environmentdirect.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for updating the status of a report.
 * Contains the new status for the report.
 */
public record ReportStatusUpdateDto(
    @NotBlank(message = "Status is required")
    String status,

    String comment // Optional comment about the status change
) {}
