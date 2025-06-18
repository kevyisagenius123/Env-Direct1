package com.environmentdirect.dto;

import java.time.LocalDateTime;

public class CommentResponseDto {
    private Long id;
    private String authorName;
    private String content;
    private LocalDateTime createdAt;
    // private Long articleId; // Optional: if the frontend needs to know the article ID directly from comment

    public CommentResponseDto(Long id, String authorName, String content, LocalDateTime createdAt) {
        this.id = id;
        this.authorName = authorName;
        this.content = content;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}