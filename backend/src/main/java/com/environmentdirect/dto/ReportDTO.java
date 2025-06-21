package com.environmentdirect.dto;

// No JSR 303 validation annotations for now, can be added later (e.g. @NotBlank, @Email)
public record ReportDTO(
    String location,
    String issueType,
    String description,
    String reportedBy, // Optional
    String contactEmail // Optional
    // image will be handled separately, perhaps as MultipartFile in controller
) {} 
