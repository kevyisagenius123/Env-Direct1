package com.environmentdirect.service;

import com.environmentdirect.model.ApprovalStatus;
import com.environmentdirect.model.Article;
import com.environmentdirect.model.Category;
import com.environmentdirect.model.Tag;
import com.environmentdirect.model.User;
import com.environmentdirect.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryService categoryService; // To create/get categories
    private final TagService tagService;           // To create/get tags
    private final NotificationService notificationService; // For article notifications

    @Autowired
    public ArticleService(ArticleRepository articleRepository, 
                         CategoryService categoryService, 
                         TagService tagService,
                         NotificationService notificationService) {
        this.articleRepository = articleRepository;
        this.categoryService = categoryService;
        this.tagService = tagService;
        this.notificationService = notificationService;
    }

    @Transactional(readOnly = true)
    public Page<Article> findAllArticles(Pageable pageable) {
        // By default, only return APPROVED articles
        return articleRepository.findByApprovalStatus(ApprovalStatus.APPROVED, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Article> findAllArticlesByStatus(ApprovalStatus approvalStatus, Pageable pageable) {
        return articleRepository.findByApprovalStatus(approvalStatus, pageable);
    }

    @Transactional(readOnly = true)
    public Optional<Article> findArticleById(Long id) {
        return articleRepository.findById(id);
    }

    @Transactional
    public Article createArticle(Article article, Set<String> categoryNames, Set<String> tagNames) {
        // By default, articles created through this method are APPROVED (for backward compatibility)
        article.setApprovalStatus(ApprovalStatus.APPROVED);
        return createArticleWithStatus(article, categoryNames, tagNames, null);
    }

    @Transactional
    public Article submitArticle(Article article, Set<String> categoryNames, Set<String> tagNames, User user) {
        // Articles submitted through this method are PENDING_APPROVAL
        article.setApprovalStatus(ApprovalStatus.PENDING_APPROVAL);
        article.setUser(user);
        return createArticleWithStatus(article, categoryNames, tagNames, user);
    }

    @Transactional
    protected Article createArticleWithStatus(Article article, Set<String> categoryNames, Set<String> tagNames, User user) {
        // Resolve categories
        Set<Category> categories = new HashSet<>();
        if (categoryNames != null) {
            categories = categoryNames.stream()
                .map(name -> categoryService.createOrGetCategory(name, null /* description can be null or handled differently */))
                .collect(Collectors.toSet());
        }
        article.setCategories(categories);

        // Resolve tags
        Set<Tag> tags = new HashSet<>();
        if (tagNames != null) {
            tags = tagNames.stream()
                .map(tagService::createOrGetTag)
                .collect(Collectors.toSet());
        }
        article.setTags(tags);

        // Set user if provided
        if (user != null) {
            article.setUser(user);
        }

        return articleRepository.save(article);
    }

    @Transactional
    public Optional<Article> updateArticle(Long id, Article updatedArticleData, Set<String> categoryNames, Set<String> tagNames) {
        return articleRepository.findById(id)
            .map(existingArticle -> {
                existingArticle.setTitle(updatedArticleData.getTitle());
                existingArticle.setContent(updatedArticleData.getContent());
                existingArticle.setSummary(updatedArticleData.getSummary());
                existingArticle.setAuthor(updatedArticleData.getAuthor());
                existingArticle.setImageUrl(updatedArticleData.getImageUrl());
                existingArticle.setInteractiveData(updatedArticleData.getInteractiveData());

                Set<Category> categories = categoryNames.stream()
                    .map(name -> categoryService.createOrGetCategory(name, null))
                    .collect(Collectors.toSet());
                existingArticle.setCategories(categories);

                Set<Tag> tags = tagNames.stream()
                    .map(tagService::createOrGetTag)
                    .collect(Collectors.toSet());
                existingArticle.setTags(tags);

                return articleRepository.save(existingArticle);
            });
    }

    @Transactional
    public boolean deleteArticle(Long id) {
        if (articleRepository.existsById(id)) {
            articleRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public Page<Article> findArticlesByCategoryName(String categoryName, Pageable pageable) {
        // Use the combined filtering method to ensure only APPROVED articles are returned
        return findArticlesWithFilters(null, categoryName, null, ApprovalStatus.APPROVED, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Article> findArticlesByTagName(String tagName, Pageable pageable) {
        // Use the combined filtering method to ensure only APPROVED articles are returned
        return findArticlesWithFilters(null, null, tagName, ApprovalStatus.APPROVED, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Article> searchArticles(String keyword, Pageable pageable) {
        // Use the combined filtering method to ensure only APPROVED articles are returned
        return findArticlesWithFilters(keyword, null, null, ApprovalStatus.APPROVED, pageable);
    }

    /**
     * Find articles with combined filtering by category name, tag name, and search term.
     * All parameters are optional and will only be applied if non-null or non-empty.
     * 
     * @param searchTerm Optional search term to filter by title or summary
     * @param categoryName Optional category name to filter by
     * @param tagName Optional tag name to filter by
     * @param pageable Pagination information
     * @return Page of articles matching all the provided criteria
     */
    @Transactional(readOnly = true)
    public Page<Article> findArticlesWithFilters(String searchTerm, String categoryName, String tagName, Pageable pageable) {
        // By default, only return APPROVED articles
        return findArticlesWithFilters(searchTerm, categoryName, tagName, ApprovalStatus.APPROVED, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Article> findArticlesWithFilters(String searchTerm, String categoryName, String tagName, 
                                                ApprovalStatus approvalStatus, Pageable pageable) {
        // Convert empty strings to null for the repository query
        String searchTermParam = (searchTerm != null && !searchTerm.isEmpty()) ? searchTerm : null;
        String categoryNameParam = (categoryName != null && !categoryName.isEmpty()) ? categoryName : null;
        String tagNameParam = (tagName != null && !tagName.isEmpty()) ? tagName : null;

        return articleRepository.findArticlesWithFilters(searchTermParam, categoryNameParam, tagNameParam, approvalStatus, pageable);
    }

    /**
     * Find articles related to the given article based on shared categories and tags.
     * Articles are considered related if they share at least one category or tag with the given article.
     * The current article is excluded from the results.
     * Results are ordered by creation date (newest first).
     *
     * @param currentArticleId ID of the current article
     * @param count Maximum number of related articles to return
     * @return List of related articles, or empty list if the current article doesn't exist
     */
    @Transactional(readOnly = true)
    public List<Article> findRelatedArticles(Long currentArticleId, int count) {
        // Find the current article
        Optional<Article> currentArticleOpt = findArticleById(currentArticleId);

        if (currentArticleOpt.isEmpty()) {
            return new ArrayList<>(); // Return empty list if article doesn't exist
        }

        Article currentArticle = currentArticleOpt.get();

        // Extract category IDs from the current article
        Set<Long> categoryIds = currentArticle.getCategories().stream()
            .map(Category::getId)
            .collect(Collectors.toSet());

        // Extract tag IDs from the current article
        Set<Long> tagIds = currentArticle.getTags().stream()
            .map(Tag::getId)
            .collect(Collectors.toSet());

        // If the article has no categories or tags, return an empty list
        if (categoryIds.isEmpty() && tagIds.isEmpty()) {
            return new ArrayList<>();
        }

        // Find related articles
        return articleRepository.findRelatedArticles(
            currentArticleId,
            categoryIds,
            tagIds,
            PageRequest.of(0, count)
        );
    }

    /**
     * Find all articles without pagination (for admin)
     */
    @Transactional(readOnly = true)
    public List<Article> findAllArticles() {
        return articleRepository.findAll();
    }

    /**
     * Find article by ID
     */
    @Transactional(readOnly = true)
    public Optional<Article> findById(Long id) {
        return articleRepository.findById(id);
    }

    /**
     * Delete article by ID
     */
    @Transactional
    public void deleteById(Long id) {
        articleRepository.deleteById(id);
    }

    /**
     * Approve article and trigger notification
     */
    @Transactional
    public Article approveArticle(Long articleId) {
        Optional<Article> articleOpt = articleRepository.findById(articleId);
        if (articleOpt.isPresent()) {
            Article article = articleOpt.get();
            ApprovalStatus previousStatus = article.getApprovalStatus();
            
            // Update approval status
            article.setApprovalStatus(ApprovalStatus.APPROVED);
            Article savedArticle = articleRepository.save(article);
            
            // Trigger notification if status changed from pending to approved
            if (previousStatus == ApprovalStatus.PENDING_APPROVAL) {
                try {
                    notificationService.createArticlePublishedNotification(
                        article.getTitle(), 
                        article.getId()
                    );
                } catch (Exception e) {
                    // Log error but don't fail the approval
                    System.err.println("Failed to create notification for article: " + articleId);
                    e.printStackTrace();
                }
            }
            
            return savedArticle;
        }
        throw new RuntimeException("Article not found with id: " + articleId);
    }

    /**
     * Reject article
     */
    @Transactional
    public Article rejectArticle(Long articleId) {
        Optional<Article> articleOpt = articleRepository.findById(articleId);
        if (articleOpt.isPresent()) {
            Article article = articleOpt.get();
            article.setApprovalStatus(ApprovalStatus.REJECTED);
            return articleRepository.save(article);
        }
        throw new RuntimeException("Article not found with id: " + articleId);
    }

    /**
     * Publish article directly (sets to approved and triggers notification)
     */
    @Transactional
    public Article publishArticle(Long articleId) {
        return approveArticle(articleId);
    }

    /**
     * Set article status to pending approval
     */
    @Transactional
    public Article setArticlePending(Long articleId) {
        Optional<Article> articleOpt = articleRepository.findById(articleId);
        if (articleOpt.isPresent()) {
            Article article = articleOpt.get();
            article.setApprovalStatus(ApprovalStatus.PENDING_APPROVAL);
            return articleRepository.save(article);
        }
        throw new RuntimeException("Article not found with id: " + articleId);
    }

    /**
     * Get articles by approval status
     */
    @Transactional(readOnly = true)
    public List<Article> getArticlesByStatus(ApprovalStatus status) {
        return articleRepository.findByApprovalStatus(status, PageRequest.of(0, Integer.MAX_VALUE)).getContent();
    }

    /**
     * Get pending articles for admin review
     */
    @Transactional(readOnly = true)
    public List<Article> getPendingArticles() {
        return getArticlesByStatus(ApprovalStatus.PENDING_APPROVAL);
    }

    /**
     * Create article and trigger notification if immediately approved
     */
    @Transactional
    public Article createArticleWithNotification(Article article, Set<String> categoryNames, Set<String> tagNames) {
        // By default, articles created through this method are APPROVED (for backward compatibility)
        article.setApprovalStatus(ApprovalStatus.APPROVED);
        Article savedArticle = createArticleWithStatus(article, categoryNames, tagNames, null);
        
        // Trigger notification for newly created and approved article
        try {
            notificationService.createArticlePublishedNotification(
                savedArticle.getTitle(), 
                savedArticle.getId()
            );
        } catch (Exception e) {
            // Log error but don't fail the creation
            System.err.println("Failed to create notification for new article: " + savedArticle.getId());
            e.printStackTrace();
        }
        
        return savedArticle;
    }
}
