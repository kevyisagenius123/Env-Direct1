package com.environmentdirect.repository;

import com.environmentdirect.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArticleIdOrderByCreatedAtDesc(Long articleId);
    // Consider findByArticleIdOrderByCreatedAtAsc if you want oldest comments first
}