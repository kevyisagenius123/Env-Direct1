package com.environmentdirect.controller;

import com.environmentdirect.model.Notification;
import com.environmentdirect.model.Notification.NotificationType;
import com.environmentdirect.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;
    
    // Get recent notifications (public endpoint)
    @GetMapping("/recent")
    public ResponseEntity<List<Notification>> getRecentNotifications() {
        List<Notification> notifications = notificationService.getRecentNotifications();
        return ResponseEntity.ok(notifications);
    }
    
    // Get notifications for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsForUser(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getNotificationsForUser(userId);
        return ResponseEntity.ok(notifications);
    }
    
    // Get unread notifications for a user
    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getUnreadNotificationsForUser(userId);
        return ResponseEntity.ok(notifications);
    }
    
    // Get global notifications (no user ID required)
    @GetMapping("/global")
    public ResponseEntity<List<Notification>> getGlobalNotifications() {
        List<Notification> notifications = notificationService.getRecentGlobalNotifications();
        return ResponseEntity.ok(notifications);
    }
    
    // Count unread notifications for a user
    @GetMapping("/user/{userId}/unread/count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(@PathVariable Long userId) {
        Long count = notificationService.countUnreadNotifications(userId);
        return ResponseEntity.ok(Map.of("unreadCount", count));
    }
    
    // Mark notification as read
    @PutMapping("/{notificationId}/read")
    public ResponseEntity<String> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok("Notification marked as read");
    }
    
    // Mark multiple notifications as read
    @PutMapping("/read")
    public ResponseEntity<String> markMultipleAsRead(@RequestBody List<Long> notificationIds) {
        notificationService.markNotificationsAsRead(notificationIds);
        return ResponseEntity.ok("Notifications marked as read");
    }
    
    // Get notifications by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Notification>> getNotificationsByType(@PathVariable String type) {
        try {
            NotificationType notificationType = NotificationType.valueOf(type.toUpperCase());
            List<Notification> notifications = notificationService.getNotificationsByType(notificationType);
            return ResponseEntity.ok(notifications);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Create a new notification (admin only)
    @PostMapping("/admin/create")
    public ResponseEntity<Notification> createNotification(@RequestBody Map<String, Object> request) {
        try {
            String title = (String) request.get("title");
            String message = (String) request.get("message");
            String typeStr = (String) request.get("type");
            NotificationType type = NotificationType.valueOf(typeStr.toUpperCase());
            
            Notification notification = notificationService.createNotification(title, message, type);
            return ResponseEntity.ok(notification);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Create article published notification (used by article service)
    @PostMapping("/article-published")
    public ResponseEntity<Notification> createArticlePublishedNotification(@RequestBody Map<String, Object> request) {
        try {
            String articleTitle = (String) request.get("articleTitle");
            Long articleId = Long.valueOf(request.get("articleId").toString());
            
            Notification notification = notificationService.createArticlePublishedNotification(articleTitle, articleId);
            return ResponseEntity.ok(notification);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Create magazine released notification
    @PostMapping("/magazine-released")
    public ResponseEntity<Notification> createMagazineReleasedNotification(@RequestBody Map<String, String> request) {
        try {
            String magazineTitle = request.get("magazineTitle");
            Notification notification = notificationService.createMagazineReleasedNotification(magazineTitle);
            return ResponseEntity.ok(notification);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Get notification by ID
    @GetMapping("/{notificationId}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long notificationId) {
        Optional<Notification> notification = notificationService.getNotificationById(notificationId);
        return notification.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete notification (admin only)
    @DeleteMapping("/admin/{notificationId}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok("Notification deleted");
    }
    
    // Get all notifications (admin only)
    @GetMapping("/admin/all")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }
    
    // Health check endpoint
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "healthy",
            "service", "notification-service",
            "timestamp", java.time.LocalDateTime.now().toString()
        ));
    }
}
