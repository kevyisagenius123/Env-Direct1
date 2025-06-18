package com.environmentdirect.controller;

import com.environmentdirect.dto.ArticleRequestDto;
import com.environmentdirect.dto.ArticleResponseDto;
import com.environmentdirect.dto.CategoryDto;
import com.environmentdirect.dto.CommentRequestDto;
import com.environmentdirect.dto.CommentResponseDto;
import com.environmentdirect.dto.TagDto;
import com.environmentdirect.model.ApprovalStatus;
import com.environmentdirect.model.Article;
import com.environmentdirect.model.Category;
import com.environmentdirect.model.Tag;
import com.environmentdirect.model.User;
import com.environmentdirect.service.ArticleService;
import com.environmentdirect.service.CommentService;
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

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;
    private final CommentService commentService; // Inject CommentService
    private final UserService userService; // Inject UserService

    @Autowired
    public ArticleController(ArticleService articleService, CommentService commentService, UserService userService) {
        this.articleService = articleService;
        this.commentService = commentService;
        this.userService = userService;
    }

    /**
     * Get the currently authenticated user.
     * 
     * @return The authenticated user, or null if not authenticated
     */
    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        String username = authentication.getName();
        return userService.findByUsername(username).orElse(null);
    }

    // Helper method to convert Article entity to ArticleResponseDto
    private ArticleResponseDto convertToDto(Article article) {
        if (article == null) return null;
        Set<CategoryDto> categoryDtos = article.getCategories().stream()
            .map(cat -> new CategoryDto(cat.getId(), cat.getName(), cat.getDescription()))
            .collect(Collectors.toSet());
        Set<TagDto> tagDtos = article.getTags().stream()
            .map(tag -> new TagDto(tag.getId(), tag.getName()))
            .collect(Collectors.toSet());

        return new ArticleResponseDto(
            article.getId(),
            article.getTitle(),
            article.getContent(),
            article.getSummary(),
            article.getAuthor(),
            article.getCreatedAt(),
            article.getUpdatedAt(),
            article.getImageUrl(),
            article.getInteractiveData(),
            categoryDtos,
            tagDtos
        );
    }

    @PostMapping
    public ResponseEntity<ArticleResponseDto> createArticle(@Valid @RequestBody ArticleRequestDto articleRequestDto) {
        Article article = new Article(
            articleRequestDto.title(),
            articleRequestDto.content(),
            articleRequestDto.summary(),
            articleRequestDto.author(),
            articleRequestDto.imageUrl(),
            articleRequestDto.interactiveData()
        );
        Article createdArticle = articleService.createArticle(article, articleRequestDto.categoryNames(), articleRequestDto.tagNames());
        return new ResponseEntity<>(convertToDto(createdArticle), HttpStatus.CREATED);
    }

    /**
     * Submit an article for approval.
     * This endpoint requires authentication.
     * The submitted article will have PENDING_APPROVAL status and be associated with the authenticated user.
     * 
     * @param articleRequestDto The article data to submit
     * @return The created article with PENDING_APPROVAL status
     */
    @PostMapping("/submit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ArticleResponseDto> submitArticle(@Valid @RequestBody ArticleRequestDto articleRequestDto) {
        // Get the authenticated user
        User user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Create the article with the authenticated user's username as author if not provided
        String author = articleRequestDto.author();
        if (author == null || author.isEmpty()) {
            author = user.getUsername();
        }

        Article article = new Article(
            articleRequestDto.title(),
            articleRequestDto.content(),
            articleRequestDto.summary(),
            author,
            articleRequestDto.imageUrl(),
            articleRequestDto.interactiveData()
        );

        // Submit the article with PENDING_APPROVAL status
        Article submittedArticle = articleService.submitArticle(article, articleRequestDto.categoryNames(), articleRequestDto.tagNames(), user);
        return new ResponseEntity<>(convertToDto(submittedArticle), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponseDto> getArticleById(@PathVariable Long id) {
        return articleService.findArticleById(id)
            .map(this::convertToDto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get all articles with optional filtering by category name, tag name, and search term.
     * All filter parameters are optional and can be used in combination.
     * 
     * @param pageable Pagination information
     * @param categoryName Optional category name to filter by
     * @param tagName Optional tag name to filter by
     * @param search Optional search term to filter by title or summary
     * @return Page of articles matching the criteria
     */
    @GetMapping
    public ResponseEntity<Page<ArticleResponseDto>> getAllArticles(
        @PageableDefault(size = 10, sort = "createdAt") Pageable pageable,
        @RequestParam(required = false) String categoryName,
        @RequestParam(required = false) String tagName,
        @RequestParam(required = false) String search) {

        // Use the combined filtering method that handles all parameters together
        Page<Article> articlePage = articleService.findArticlesWithFilters(search, categoryName, tagName, pageable);
        Page<ArticleResponseDto> dtoPage = articlePage.map(this::convertToDto);
        return ResponseEntity.ok(dtoPage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponseDto> updateArticle(@PathVariable Long id, /*@Valid*/ @RequestBody ArticleRequestDto articleRequestDto) {
        Article articleData = new Article( // Create a temporary Article object to pass data
            articleRequestDto.title(),
            articleRequestDto.content(),
            articleRequestDto.summary(),
            articleRequestDto.author(),
            articleRequestDto.imageUrl(),
            articleRequestDto.interactiveData()
        );
        return articleService.updateArticle(id, articleData, articleRequestDto.categoryNames(), articleRequestDto.tagNames())
            .map(this::convertToDto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        if (articleService.deleteArticle(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- Comment Endpoints ---

    @PostMapping("/{articleId}/comments")
    public ResponseEntity<CommentResponseDto> addCommentToArticle(
            @PathVariable Long articleId,
            @Valid @RequestBody CommentRequestDto commentRequestDto) {
        CommentResponseDto newComment = commentService.addComment(articleId, commentRequestDto);
        return new ResponseEntity<>(newComment, HttpStatus.CREATED);
    }

    @GetMapping("/{articleId}/comments")
    public ResponseEntity<List<CommentResponseDto>> getCommentsForArticle(@PathVariable Long articleId) {
        List<CommentResponseDto> comments = commentService.getCommentsByArticleId(articleId);
        return ResponseEntity.ok(comments);
    }

    /**
     * Get articles related to the specified article based on shared categories and tags.
     * 
     * @param articleId ID of the article to find related articles for
     * @param count Optional parameter specifying the maximum number of related articles to return (default: 3)
     * @return List of related articles
     */
    @GetMapping("/{articleId}/related")
    public ResponseEntity<List<ArticleResponseDto>> getRelatedArticles(
            @PathVariable Long articleId,
            @RequestParam(required = false, defaultValue = "3") int count) {

        List<Article> relatedArticles = articleService.findRelatedArticles(articleId, count);
        List<ArticleResponseDto> relatedArticleDtos = relatedArticles.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(relatedArticleDtos);
    }
}
