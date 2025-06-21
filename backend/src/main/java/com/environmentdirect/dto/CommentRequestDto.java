package com.environmentdirect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CommentRequestDto(
    @NotBlank(message = "Author name cannot be blank")
    @Size(max = 100, message = "Author name cannot exceed 100 characters")
    String authorName,

    @NotBlank(message = "Comment content cannot be blank")
    @Size(max = 5000, message = "Comment content cannot exceed 5000 characters") // Adjust max size as needed
    String content
) {}
