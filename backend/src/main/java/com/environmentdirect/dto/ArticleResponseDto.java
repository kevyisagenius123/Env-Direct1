package com.environmentdirect.dto;

import java.time.LocalDateTime;
import java.util.Set;

public record ArticleResponseDto(
    Long id,
    String title,
    String content,
    String summary,
    String author,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    String imageUrl,
    String interactiveData,
    Set<CategoryDto> categories,
    Set<TagDto> tags
) {}
