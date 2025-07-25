package com.environmentdirect.repository;

import com.environmentdirect.model.Notification;
import com.environmentdirect.model.Notification.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    // Find recent notifications (global notifications)
    @Query("SELECT n FROM Notification n WHERE n.userId IS NULL ORDER BY n.createdAt DESC")
    List<Notification> findRecentGlobalNotifications();
    
    // Find notifications for a specific user
    @Query("SELECT n FROM Notification n WHERE n.userId = :userId OR n.userId IS NULL ORDER BY n.createdAt DESC")
    List<Notification> findNotificationsForUser(@Param("userId") Long userId);
    
    // Find unread notifications for a user
    @Query("SELECT n FROM Notification n WHERE (n.userId = :userId OR n.userId IS NULL) AND n.isRead = false ORDER BY n.createdAt DESC")
    List<Notification> findUnreadNotificationsForUser(@Param("userId") Long userId);
    
    // Find notifications by type
    List<Notification> findByTypeOrderByCreatedAtDesc(NotificationType type);
    
    // Find notifications created after a specific date
    List<Notification> findByCreatedAtAfterOrderByCreatedAtDesc(LocalDateTime dateTime);
    
    // Find notifications related to a specific article
    List<Notification> findByArticleIdOrderByCreatedAtDesc(Long articleId);
    
    // Count unread notifications for a user
    @Query("SELECT COUNT(n) FROM Notification n WHERE (n.userId = :userId OR n.userId IS NULL) AND n.isRead = false")
    Long countUnreadNotificationsForUser(@Param("userId") Long userId);
    
    // Get recent notifications (last 24 hours)
    @Query("SELECT n FROM Notification n WHERE n.createdAt >= :since ORDER BY n.createdAt DESC")
    List<Notification> findRecentNotifications(@Param("since") LocalDateTime since);
    
    // Mark notifications as read for a user
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.id IN :notificationIds")
    void markNotificationsAsRead(@Param("notificationIds") List<Long> notificationIds);
}
