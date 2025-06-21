package com.environmentdirect.dto;

import java.time.LocalDateTime;

public record CommentResponseDto(
    Long id,
    String authorName,
    String content,
    LocalDateTime createdAt
    // Long articleId // Optional: if the frontend needs to know the article ID directly from comment
) {}
