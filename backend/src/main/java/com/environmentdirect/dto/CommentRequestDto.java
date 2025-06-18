package com.environmentdirect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CommentRequestDto {

    @NotBlank(message = "Author name cannot be blank")
    @Size(max = 100, message = "Author name cannot exceed 100 characters")
    private String authorName;

    @NotBlank(message = "Comment content cannot be blank")
    @Size(max = 5000, message = "Comment content cannot exceed 5000 characters") // Adjust max size as needed
    private String content;

    // Getters and Setters
    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}