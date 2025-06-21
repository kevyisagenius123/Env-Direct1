package com.environmentdirect.dto;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ArticleRequestDto(
    @NotBlank String title,
    @NotBlank @Size(min = 10) String content,
    String summary,
    String author,
    String imageUrl,
    String interactiveData,
    Set<String> categoryNames, // Names of categories (plural)
    String categoryName,       // Name of category (singular) - for frontend compatibility
    Set<String> tagNames       // Names of tags
) {
    // Constructor that handles both categoryNames and categoryName
    public ArticleRequestDto {
        // If categoryNames is null but categoryName is provided, create a Set with the single categoryName
        if (categoryNames == null && categoryName != null && !categoryName.isEmpty()) {
            categoryNames = Set.of(categoryName);
        }
    }
}
