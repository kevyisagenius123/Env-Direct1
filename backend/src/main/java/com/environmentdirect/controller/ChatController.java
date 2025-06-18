package com.environmentdirect.controller;

import com.environmentdirect.service.SimpleChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final SimpleChatbotService chatbotService;

    @Autowired
    public ChatController(SimpleChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> body) {
        String userMessage = body.get("message");

        if (userMessage == null || userMessage.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Message cannot be empty"));
        }
        
        String botReply = chatbotService.getResponse(userMessage);
        
        // Return a simple JSON like { "reply": "bot's answer" }
        return ResponseEntity.ok(Collections.singletonMap("reply", botReply));
    }
} 