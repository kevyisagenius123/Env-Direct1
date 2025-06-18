package com.environmentdirect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for providing campaign banner data.
 * This endpoint serves data for the CampaignBannerSection component in the frontend.
 */
@RestController
@RequestMapping("/api/banner")
public class BannerController {

    /**
     * Get campaign banner data.
     * @return A map containing banner content, including headline, description, CTA text, and styling.
     */
    @GetMapping
    public ResponseEntity<Map<String, String>> getBannerData() {
        // In a real application, this data would come from a CMS or database
        Map<String, String> bannerData = new HashMap<>();
        
        bannerData.put("headline", "Join Our Coastal Cleanup Campaign!");
        bannerData.put("description", "Help keep Dominica's beaches pristine. Join volunteers across the island for our monthly coastal cleanup initiative.");
        bannerData.put("ctaText", "Register Now");
        bannerData.put("ctaLink", "/campaigns/coastal-cleanup");
        bannerData.put("textColor", "text-white");
        // You could also include imageUrl and altText if needed
        
        return ResponseEntity.ok(bannerData);
    }
}