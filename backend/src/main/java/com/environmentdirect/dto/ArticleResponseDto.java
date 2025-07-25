package com.environmentdirect.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class ArticleResponseDto {
    private Long id;
    private String title;
    private String subtitle;
    private String content;
    private String summary;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String imageUrl;
    private String featuredImage;
    private String interactiveData;
    private Set<CategoryDto> categories;
    private Set<TagDto> tags;
    private List<String> keyPoints;
    private String status; // "draft" or "published"
    private Integer readingTime;
    private Long viewCount;

    // Default constructor
    public ArticleResponseDto() {}

    // Constructor for backward compatibility
    public ArticleResponseDto(Long id, String title, String content, String summary, String author,
                            LocalDateTime createdAt, LocalDateTime updatedAt, String imageUrl,
                            String interactiveData, Set<CategoryDto> categories, Set<TagDto> tags) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.summary = summary;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.imageUrl = imageUrl;
        this.featuredImage = imageUrl;
        this.interactiveData = interactiveData;
        this.categories = categories;
        this.tags = tags;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { 
        this.imageUrl = imageUrl;
        if (this.featuredImage == null) {
            this.featuredImage = imageUrl;
        }
    }

    public String getFeaturedImage() { return featuredImage != null ? featuredImage : imageUrl; }
    public void setFeaturedImage(String featuredImage) { this.featuredImage = featuredImage; }

    public String getInteractiveData() { return interactiveData; }
    public void setInteractiveData(String interactiveData) { this.interactiveData = interactiveData; }

    public Set<CategoryDto> getCategories() { return categories; }
    public void setCategories(Set<CategoryDto> categories) { this.categories = categories; }

    public Set<TagDto> getTags() { return tags; }
    public void setTags(Set<TagDto> tags) { this.tags = tags; }

    public List<String> getKeyPoints() { return keyPoints; }
    public void setKeyPoints(List<String> keyPoints) { this.keyPoints = keyPoints; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getReadingTime() { return readingTime; }
    public void setReadingTime(Integer readingTime) { this.readingTime = readingTime; }

    public Long getViewCount() { return viewCount; }
    public void setViewCount(Long viewCount) { this.viewCount = viewCount; }
}
