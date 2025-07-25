package com.environmentdirect.controller;

import com.environmentdirect.dto.ArticleRequestDto;
import com.environmentdirect.dto.ArticleResponseDto;
import com.environmentdirect.model.ApprovalStatus;
import com.environmentdirect.model.Article;
import com.environmentdirect.model.User;
import com.environmentdirect.service.ArticleService;
import com.environmentdirect.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
public class AdminArticleController {

    private final ArticleService articleService;
    private final UserService userService;

    @Autowired
    public AdminArticleController(ArticleService articleService, UserService userService) {
        this.articleService = articleService;
        this.userService = userService;
    }

    /**
     * Get all articles for admin dashboard (including drafts)
     */
    @GetMapping("/articles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ArticleResponseDto>> getAllArticlesForAdmin() {
        try {
            List<Article> articles = articleService.findAllArticles(); // This should return all articles regardless of status
            List<ArticleResponseDto> articleDtos = articles.stream()
                .map(this::convertToResponseDto)
                .collect(java.util.stream.Collectors.toList());
            return ResponseEntity.ok(articleDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get dashboard statistics
     */
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        try {
            List<Article> allArticles = articleService.findAllArticles();
            
            long totalArticles = allArticles.size();
            long publishedArticles = allArticles.stream()
                .filter(article -> article.getApprovalStatus() == ApprovalStatus.APPROVED)
                .count();
            long draftArticles = allArticles.stream()
                .filter(article -> article.getApprovalStatus() == ApprovalStatus.PENDING_APPROVAL)
                .count();
            
            // For now, we'll use a placeholder for total views
            long totalViews = allArticles.stream()
                .mapToLong(article -> 0L) // Placeholder - you might want to add a view count field
                .sum();

            Map<String, Object> stats = new HashMap<>();
            stats.put("totalArticles", totalArticles);
            stats.put("publishedArticles", publishedArticles);
            stats.put("draftArticles", draftArticles);
            stats.put("totalViews", totalViews);

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get a specific article by ID for editing
     */
    @GetMapping("/articles/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponseDto> getArticleById(@PathVariable Long id) {
        try {
            Optional<Article> articleOpt = articleService.findById(id);
            if (articleOpt.isPresent()) {
                return ResponseEntity.ok(convertToResponseDto(articleOpt.get()));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new article
     */
    @PostMapping("/articles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponseDto> createArticle(@Valid @RequestBody ArticleRequestDto articleRequest) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User currentUser = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            Article article = new Article();
            article.setTitle(articleRequest.title());
            article.setContent(articleRequest.content());
            article.setSummary(articleRequest.summary());
            article.setAuthor(articleRequest.author());
            article.setImageUrl(articleRequest.getFeaturedImage());
            article.setUser(currentUser);
            
            // Set approval status based on the status in request
            if ("published".equals(articleRequest.status())) {
                article.setApprovalStatus(ApprovalStatus.APPROVED);
            } else {
                article.setApprovalStatus(ApprovalStatus.PENDING_APPROVAL);
            }

            // Create article with categories and tags
            Set<String> categoryNames = articleRequest.categoryNames() != null ? 
                articleRequest.categoryNames() : new HashSet<>();
            Set<String> tagNames = articleRequest.tagNames() != null ? 
                articleRequest.tagNames() : new HashSet<>();
                
            Article savedArticle = articleService.createArticle(article, categoryNames, tagNames);
            return ResponseEntity.status(HttpStatus.CREATED).body(convertToResponseDto(savedArticle));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Update an existing article
     */
    @PutMapping("/articles/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponseDto> updateArticle(
            @PathVariable Long id, 
            @Valid @RequestBody ArticleRequestDto articleRequest) {
        try {
            Optional<Article> articleOpt = articleService.findById(id);
            if (!articleOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Article article = articleOpt.get();
            article.setTitle(articleRequest.title());
            article.setContent(articleRequest.content());
            article.setSummary(articleRequest.summary());
            article.setAuthor(articleRequest.author());
            article.setImageUrl(articleRequest.getFeaturedImage());
            
            // Set approval status based on the status in request
            if ("published".equals(articleRequest.status())) {
                article.setApprovalStatus(ApprovalStatus.APPROVED);
            } else {
                article.setApprovalStatus(ApprovalStatus.PENDING_APPROVAL);
            }

            // Update article with categories and tags
            Set<String> categoryNames = articleRequest.categoryNames() != null ? 
                articleRequest.categoryNames() : new HashSet<>();
            Set<String> tagNames = articleRequest.tagNames() != null ? 
                articleRequest.tagNames() : new HashSet<>();
                
            Optional<Article> updatedArticleOpt = articleService.updateArticle(id, article, categoryNames, tagNames);
            Article updatedArticle = updatedArticleOpt.orElseThrow(() -> new RuntimeException("Failed to update article"));
            return ResponseEntity.ok(convertToResponseDto(updatedArticle));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Update article publish status
     */
    @PatchMapping("/articles/{id}/publish")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponseDto> updateArticleStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusUpdate) {
        try {
            Optional<Article> articleOpt = articleService.findById(id);
            if (!articleOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Article article = articleOpt.get();
            String status = statusUpdate.get("status");
            
            if ("published".equals(status)) {
                article.setApprovalStatus(ApprovalStatus.APPROVED);
            } else {
                article.setApprovalStatus(ApprovalStatus.PENDING_APPROVAL);
            }

            // Update the article, preserving existing categories and tags
            Optional<Article> updatedArticleOpt = articleService.updateArticle(id, article, null, null);
            Article updatedArticle = updatedArticleOpt.orElseThrow(() -> new RuntimeException("Failed to update article status"));
            return ResponseEntity.ok(convertToResponseDto(updatedArticle));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Delete an article
     */
    @DeleteMapping("/articles/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        try {
            Optional<Article> articleOpt = articleService.findById(id);
            if (!articleOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            articleService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Convert Article to ArticleResponseDto
     */
    private ArticleResponseDto convertToResponseDto(Article article) {
        ArticleResponseDto dto = new ArticleResponseDto();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setContent(article.getContent());
        dto.setSummary(article.getSummary());
        dto.setAuthor(article.getAuthor());
        dto.setImageUrl(article.getImageUrl());
        dto.setCreatedAt(article.getCreatedAt());
        dto.setUpdatedAt(article.getUpdatedAt());
        
        // Map approval status to simple status string
        if (article.getApprovalStatus() == ApprovalStatus.APPROVED) {
            dto.setStatus("published");
        } else {
            dto.setStatus("draft");
        }
        
        return dto;
    }
}
