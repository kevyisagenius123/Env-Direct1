package com.environmentdirect.service;

import com.environmentdirect.model.Notification;
import com.environmentdirect.model.Notification.NotificationType;
import com.environmentdirect.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    // Create a new notification
    public Notification createNotification(String title, String message, NotificationType type) {
        Notification notification = new Notification(title, message, type);
        return notificationRepository.save(notification);
    }
    
    // Create notification for article publication
    public Notification createArticlePublishedNotification(String articleTitle, Long articleId) {
        String title = "New Article Published";
        String message = String.format("New article available: %s", articleTitle);
        Notification notification = new Notification(title, message, NotificationType.ARTICLE_PUBLISHED, articleId);
        return notificationRepository.save(notification);
    }
    
    // Create notification for magazine release
    public Notification createMagazineReleasedNotification(String magazineTitle) {
        String title = "New Magazine Issue";
        String message = String.format("New magazine issue available: %s", magazineTitle);
        Notification notification = new Notification(title, message, NotificationType.MAGAZINE_RELEASED);
        return notificationRepository.save(notification);
    }
    
    // Create targeted notification for specific user
    public Notification createUserNotification(String title, String message, NotificationType type, Long userId) {
        Notification notification = new Notification(title, message, type);
        notification.setUserId(userId);
        return notificationRepository.save(notification);
    }
    
    // Get recent global notifications
    public List<Notification> getRecentGlobalNotifications() {
        return notificationRepository.findRecentGlobalNotifications();
    }
    
    // Get notifications for a specific user
    public List<Notification> getNotificationsForUser(Long userId) {
        if (userId == null) {
            return notificationRepository.findRecentGlobalNotifications();
        }
        return notificationRepository.findNotificationsForUser(userId);
    }
    
    // Get unread notifications for a user
    public List<Notification> getUnreadNotificationsForUser(Long userId) {
        if (userId == null) {
            return notificationRepository.findRecentGlobalNotifications();
        }
        return notificationRepository.findUnreadNotificationsForUser(userId);
    }
    
    // Get notifications from last 24 hours
    public List<Notification> getRecentNotifications() {
        LocalDateTime since = LocalDateTime.now().minusHours(24);
        return notificationRepository.findRecentNotifications(since);
    }
    
    // Mark notification as read
    public void markAsRead(Long notificationId) {
        Optional<Notification> notification = notificationRepository.findById(notificationId);
        if (notification.isPresent()) {
            notification.get().setIsRead(true);
            notificationRepository.save(notification.get());
        }
    }
    
    // Mark multiple notifications as read
    public void markNotificationsAsRead(List<Long> notificationIds) {
        notificationIds.forEach(this::markAsRead);
    }
    
    // Count unread notifications for user
    public Long countUnreadNotifications(Long userId) {
        if (userId == null) {
            return 0L;
        }
        return notificationRepository.countUnreadNotificationsForUser(userId);
    }
    
    // Get notifications by type
    public List<Notification> getNotificationsByType(NotificationType type) {
        return notificationRepository.findByTypeOrderByCreatedAtDesc(type);
    }
    
    // Delete old notifications (cleanup)
    public void deleteOldNotifications(int daysOld) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(daysOld);
        List<Notification> oldNotifications = notificationRepository.findByCreatedAtAfterOrderByCreatedAtDesc(cutoffDate);
        
        // Remove notifications older than cutoff date
        oldNotifications.stream()
            .filter(n -> n.getCreatedAt().isBefore(cutoffDate))
            .forEach(notificationRepository::delete);
    }
    
    // Get notification by ID
    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }
    
    // Delete notification
    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
    
    // Get all notifications
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }
}
