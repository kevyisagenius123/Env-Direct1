package com.environmentdirect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "articles")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob // For longer text content
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    // Optional: A short summary or excerpt
    @Column(length = 500)
    private String summary;

    // Optional: Author name (could be a relationship to a User entity later)
    private String author;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Optional: URL for a featured image
    private String imageUrl;

    // Optional: JSON data for interactive visualizations
    @Column(columnDefinition = "TEXT")
    private String interactiveData;

    // Approval status of the article
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApprovalStatus approvalStatus = ApprovalStatus.APPROVED; // Default to APPROVED for backward compatibility

    // User who submitted the article
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
        name = "article_categories",
        joinColumns = @JoinColumn(name = "article_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
        name = "article_tags",
        joinColumns = @JoinColumn(name = "article_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Comment> comments = new HashSet<>();

    // Constructors
    public Article() {
    }

    public Article(String title, String content, String summary, String author, String imageUrl) {
        this.title = title;
        this.content = content;
        this.summary = summary;
        this.author = author;
        this.imageUrl = imageUrl;
        this.approvalStatus = ApprovalStatus.APPROVED; // Default to APPROVED for backward compatibility
    }

    public Article(String title, String content, String summary, String author, String imageUrl, String interactiveData) {
        this.title = title;
        this.content = content;
        this.summary = summary;
        this.author = author;
        this.imageUrl = imageUrl;
        this.interactiveData = interactiveData;
        this.approvalStatus = ApprovalStatus.APPROVED; // Default to APPROVED for backward compatibility
    }

    public Article(String title, String content, String summary, String author, String imageUrl, ApprovalStatus approvalStatus, User user) {
        this.title = title;
        this.content = content;
        this.summary = summary;
        this.author = author;
        this.imageUrl = imageUrl;
        this.approvalStatus = approvalStatus;
        this.user = user;
    }

    public Article(String title, String content, String summary, String author, String imageUrl, String interactiveData, ApprovalStatus approvalStatus, User user) {
        this.title = title;
        this.content = content;
        this.summary = summary;
        this.author = author;
        this.imageUrl = imageUrl;
        this.interactiveData = interactiveData;
        this.approvalStatus = approvalStatus;
        this.user = user;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters (Lombok @Data can also be used, but be mindful of collections and E&H)
    // Basic Getters/Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
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
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getInteractiveData() { return interactiveData; }
    public void setInteractiveData(String interactiveData) { this.interactiveData = interactiveData; }
    public ApprovalStatus getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(ApprovalStatus approvalStatus) { this.approvalStatus = approvalStatus; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    // Getters/Setters for relationships
    public Set<Category> getCategories() { return categories; }
    public void setCategories(Set<Category> categories) { this.categories = categories; }
    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }
    public Set<Comment> getComments() { return comments; }
    public void setComments(Set<Comment> comments) { this.comments = comments; }

    // Helper methods for adding/removing categories and tags (optional but good practice)
    public void addCategory(Category category) {
        this.categories.add(category);
        category.getArticles().add(this);
    }
    public void removeCategory(Category category) {
        this.categories.remove(category);
        category.getArticles().remove(this);
    }
    public void addTag(Tag tag) {
        this.tags.add(tag);
        tag.getArticles().add(this);
    }
    public void removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getArticles().remove(this);
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
        comment.setArticle(this);
    }

    public void removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setArticle(null);
    }
     // equals and hashCode (important if adding Articles to Sets or using them in Maps)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Article article = (Article) o;
        return id != null ? id.equals(article.id) : article.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
