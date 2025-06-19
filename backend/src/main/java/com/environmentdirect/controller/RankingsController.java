package com.environmentdirect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for providing regional environmental rankings data.
 * This endpoint serves data for the RegionRankingSection component in the frontend.
 */
@RestController
@RequestMapping("/api/rankings")
public class RankingsController {

    /**
     * Get regional environmental rankings data.
     * @return A list of regional rankings with scores and trends.
     */
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getRankings() {
        // In a real application, this data would come from a database or calculation service
        List<Map<String, Object>> rankings = new ArrayList<>();
        
        // Saint George Parish
        Map<String, Object> region1 = new HashMap<>();
        region1.put("id", 1);
        region1.put("rank", 1);
        region1.put("name", "Saint George Parish");
        region1.put("score", 94);
        region1.put("trend", "up");
        region1.put("details", "High marks for urban green spaces & waste management in Roseau.");
        rankings.add(region1);
        
        // Saint John Parish
        Map<String, Object> region2 = new HashMap<>();
        region2.put("id", 2);
        region2.put("rank", 2);
        region2.put("name", "Saint John Parish (Portsmouth)");
        region2.put("score", 91);
        region2.put("trend", "stable");
        region2.put("details", "Excellent coastal water quality, active reef protection.");
        rankings.add(region2);
        
        // Saint Joseph Parish
        Map<String, Object> region3 = new HashMap<>();
        region3.put("id", 3);
        region3.put("rank", 3);
        region3.put("name", "Saint Joseph Parish");
        region3.put("score", 87);
        region3.put("trend", "up");
        region3.put("details", "Strong community recycling initiatives, protected forest areas.");
        rankings.add(region3);
        
        // Saint Paul Parish
        Map<String, Object> region4 = new HashMap<>();
        region4.put("id", 4);
        region4.put("rank", 4);
        region4.put("name", "Saint Paul Parish (Mahaut)");
        region4.put("score", 83);
        region4.put("trend", "stable");
        region4.put("details", "Good progress in agricultural sustainability practices.");
        rankings.add(region4);
        
        // Saint David Parish
        Map<String, Object> region5 = new HashMap<>();
        region5.put("id", 5);
        region5.put("rank", 5);
        region5.put("name", "Saint David Parish (Castle Bruce)");
        region5.put("score", 80);
        region5.put("trend", "down");
        region5.put("details", "Focus on developing eco-tourism infrastructure responsibly.");
        rankings.add(region5);
        
        return ResponseEntity.ok(rankings);
    }
}