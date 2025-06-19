package com.environmentdirect.repository;

import com.environmentdirect.model.ApprovalStatus;
import com.environmentdirect.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Set;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    // Example: Find articles by category name
    List<Article> findByCategories_Name(String categoryName);
    Page<Article> findByCategories_Name(String categoryName, Pageable pageable);

    // Example: Find articles by tag name
    List<Article> findByTags_Name(String tagName);
    Page<Article> findByTags_Name(String tagName, Pageable pageable);

    // Example: Find articles containing a keyword in title or summary (case-insensitive)
    Page<Article> findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCase(String titleKeyword, String summaryKeyword, Pageable pageable);

    // Find articles by approval status
    List<Article> findByApprovalStatus(ApprovalStatus approvalStatus);
    Page<Article> findByApprovalStatus(ApprovalStatus approvalStatus, Pageable pageable);

    /**
     * Find articles with combined filtering by category name, tag name, and search term.
     * All parameters are optional and will only be applied if non-null.
     * 
     * @param searchTerm Optional search term to filter by title or summary
     * @param categoryName Optional category name to filter by
     * @param tagName Optional tag name to filter by
     * @param pageable Pagination information
     * @return Page of articles matching the criteria
     */
    @Query("SELECT DISTINCT a FROM Article a " +
           "LEFT JOIN a.categories c " +
           "LEFT JOIN a.tags t " +
           "WHERE (:searchTerm IS NULL OR " +
           "      a.title LIKE CONCAT('%', :searchTerm, '%') OR " +
           "      a.summary LIKE CONCAT('%', :searchTerm, '%')) " +
           "AND (:categoryName IS NULL OR c.name = :categoryName) " +
           "AND (:tagName IS NULL OR t.name = :tagName) " +
           "AND (:approvalStatus IS NULL OR a.approvalStatus = :approvalStatus)")
    Page<Article> findArticlesWithFilters(
        @Param("searchTerm") String searchTerm,
        @Param("categoryName") String categoryName,
        @Param("tagName") String tagName,
        @Param("approvalStatus") ApprovalStatus approvalStatus,
        Pageable pageable
    );

    /**
     * Find articles related to the given article based on shared categories and tags.
     * Articles are considered related if they share at least one category or tag with the given article.
     * The current article is excluded from the results.
     * Results are ordered by creation date (newest first).
     *
     * @param articleId ID of the current article
     * @param categoryIds Set of category IDs from the current article
     * @param tagIds Set of tag IDs from the current article
     * @param pageable Pagination information
     * @return List of related articles
     */
    @Query("SELECT DISTINCT a FROM Article a " +
           "LEFT JOIN a.categories c " +
           "LEFT JOIN a.tags t " +
           "WHERE a.id != :articleId " +
           "AND (c.id IN :categoryIds OR t.id IN :tagIds) " +
           "AND a.approvalStatus = com.environmentdirect.model.ApprovalStatus.APPROVED " +
           "ORDER BY a.createdAt DESC")
    List<Article> findRelatedArticles(
        @Param("articleId") Long articleId,
        @Param("categoryIds") Set<Long> categoryIds,
        @Param("tagIds") Set<Long> tagIds,
        Pageable pageable
    );
}
