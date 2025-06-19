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
        // Return an empty list to test the endpoint
        return ResponseEntity.ok(new ArrayList<>());
    }
}