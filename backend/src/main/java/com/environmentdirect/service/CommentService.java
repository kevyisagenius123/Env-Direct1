package com.environmentdirect.service;

import com.environmentdirect.dto.CommentRequestDto;
import com.environmentdirect.dto.CommentResponseDto;
import com.environmentdirect.model.Article;
import com.environmentdirect.model.Comment;
import com.environmentdirect.repository.ArticleRepository;
import com.environmentdirect.repository.CommentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository; // To fetch the article

    @Autowired
    public CommentService(CommentRepository commentRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
    }

    @Transactional
    public CommentResponseDto addComment(Long articleId, CommentRequestDto commentRequestDto) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with ID: " + articleId));

        Comment comment = new Comment();
        comment.setAuthorName(commentRequestDto.authorName());
        comment.setContent(commentRequestDto.content());
        comment.setArticle(article);
        // article.addComment(comment); // This would also work if Article manages the bidirectional relationship

        Comment savedComment = commentRepository.save(comment);
        return convertToDto(savedComment);
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByArticleId(Long articleId) {
        if (!articleRepository.existsById(articleId)) {
            throw new EntityNotFoundException("Article not found with ID: " + articleId + ". Cannot fetch comments.");
        }
        List<Comment> comments = commentRepository.findByArticleIdOrderByCreatedAtDesc(articleId);
        return comments.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CommentResponseDto convertToDto(Comment comment) {
        return new CommentResponseDto(
                comment.getId(),
                comment.getAuthorName(),
                comment.getContent(),
                comment.getCreatedAt()
        );
    }
}