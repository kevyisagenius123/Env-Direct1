package com.environmentdirect.dto;

import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ArticleRequestDto(
    @NotBlank String title,
    String subtitle,
    @NotBlank @Size(min = 10) String content,
    String summary,
    String author,
    String imageUrl,
    String featuredImage, // Alternative name for imageUrl
    String interactiveData,
    Set<String> categoryNames, // Names of categories (plural)
    String categoryName,       // Name of category (singular) - for frontend compatibility
    Set<String> tagNames,      // Names of tags
    List<String> keyPoints,    // Key points for the article
    List<String> tags,         // Alternative for tagNames
    String status,             // "draft" or "published"
    Integer readingTime        // Estimated reading time in minutes
) {
    // Constructor that handles both categoryNames and categoryName
    public ArticleRequestDto {
        // If categoryNames is null but categoryName is provided, create a Set with the single categoryName
        if (categoryNames == null && categoryName != null && !categoryName.isEmpty()) {
            categoryNames = Set.of(categoryName);
        }
        
        // Handle featuredImage as alternative to imageUrl
        if (imageUrl == null && featuredImage != null) {
            imageUrl = featuredImage;
        }
    }
    
    // Convenience method to get featured image
    public String getFeaturedImage() {
        return featuredImage != null ? featuredImage : imageUrl;
    }
}
