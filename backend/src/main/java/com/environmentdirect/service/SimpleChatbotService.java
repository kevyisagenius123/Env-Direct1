package com.environmentdirect.service;

import org.springframework.stereotype.Service;

@Service
public class SimpleChatbotService {

    public String getResponse(String userInput) {
        String lowerInput = userInput.toLowerCase().trim();

        // Simple keyword-based rules
        if (lowerInput.contains("hello") || lowerInput.contains("hi")) {
            return "Hello there! How can I assist you with Dominica's environment today?";
        }
        if (lowerInput.contains("how are you")) {
            return "I'm doing well, thank you for asking! Ready to help.";
        }
        if (lowerInput.contains("dominica")) {
            return "Dominica is a beautiful island nation in the Caribbean, known as the 'Nature Isle.' What would you like to know about its environment?";
        }
        if (lowerInput.contains("environment")) {
            return "I can provide information about environmental topics related to Dominica. Ask me about forests, rivers, pollution, etc.";
        }
        if (lowerInput.contains("forests")) {
            return "Dominica has extensive rainforest coverage, vital for its biodiversity and ecosystem health.";
        }
        if (lowerInput.contains("rivers") || lowerInput.contains("water")) {
            return "Dominica is known as the 'Land of 365 Rivers', with numerous freshwater sources that support its lush ecosystem.";
        }
        if (lowerInput.contains("wildlife") || lowerInput.contains("animals")) {
            return "Dominica is home to diverse wildlife, including the Sisserou parrot (the national bird), iguanas, and various marine species like whales and dolphins.";
        }
        if (lowerInput.contains("climate") || lowerInput.contains("weather")) {
            return "Dominica has a tropical climate with heavy rainfall, especially in the mountainous interior. The hurricane season typically runs from June to November.";
        }
        if (lowerInput.contains("conservation") || lowerInput.contains("protect")) {
            return "Dominica has several conservation initiatives to protect its natural resources, including marine reserves and forest conservation programs.";
        }
        if (lowerInput.contains("pollution") || lowerInput.contains("waste")) {
            return "Dominica faces challenges with waste management and pollution, but has implemented programs to reduce plastic use and improve waste disposal.";
        }
        if (lowerInput.contains("bye") || lowerInput.contains("goodbye")) {
            return "Goodbye! Have a great day.";
        }

        // Add more rules here based on expected user queries

        // Default response if no keywords match
        return "I'm sorry, I didn't quite understand that. Could you please rephrase? You can ask me about Dominica's environment.";
    }
} 
