package com.example.climatebackend.controller;

import com.example.climatebackend.dto.RegionClimateData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ClimateController {

    private static final Map<String, RegionClimateData> mockClimateData = new HashMap<>();

    static {
        // Mock data for Roseau
        mockClimateData.put("Roseau", new RegionClimateData(
                "Roseau",
                Arrays.asList(1990, 2000, 2010, 2020),
                Arrays.asList(25.1, 25.3, 25.7, 26.1),
                Arrays.asList(120.0, 180.0, 200.0, 150.0),
                Arrays.asList(10.0, 12.0, 15.0, 20.0),
                82
        ));

        // Mock data for Portsmouth
        mockClimateData.put("Portsmouth", new RegionClimateData(
                "Portsmouth",
                Arrays.asList(1990, 2000, 2010, 2020),
                Arrays.asList(26.5, 26.8, 27.0, 27.3),
                Arrays.asList(150.0, 190.0, 210.0, 170.0),
                Arrays.asList(5.0, 7.0, 9.0, 12.0),
                75
        ));
        
        // Mock data for Marigot
        mockClimateData.put("Marigot", new RegionClimateData(
                "Marigot",
                Arrays.asList(1995, 2005, 2015, 2023),
                Arrays.asList(25.8, 26.2, 26.5, 26.9),
                Arrays.asList(130.0, 170.0, 190.0, 160.0),
                Arrays.asList(8.0, 10.0, 13.0, 18.0),
                78
        ));

        // Mock data for Saint Patrick
        mockClimateData.put("Saint Patrick", new RegionClimateData(
                "Saint Patrick",
                Arrays.asList(1990, 2000, 2010, 2020),
                Arrays.asList(25.3, 25.6, 26.0, 26.4),
                Arrays.asList(140.0, 185.0, 205.0, 160.0),
                Arrays.asList(12.0, 15.0, 18.0, 22.0),
                85
        ));

        // Mock data for Saint David
        mockClimateData.put("Saint David", new RegionClimateData(
                "Saint David",
                Arrays.asList(1990, 2000, 2010, 2020),
                Arrays.asList(24.9, 25.2, 25.6, 26.0),
                Arrays.asList(150.0, 190.0, 210.0, 170.0),
                Arrays.asList(8.0, 11.0, 14.0, 19.0),
                79
        ));

        // Mock data for Saint Peter
        mockClimateData.put("Saint Peter", new RegionClimateData(
                "Saint Peter",
                Arrays.asList(1990, 2000, 2010, 2020),
                Arrays.asList(26.2, 26.5, 26.8, 27.1),
                Arrays.asList(130.0, 175.0, 195.0, 155.0),
                Arrays.asList(7.0, 9.0, 12.0, 16.0),
                77
        ));

        // Mock data for Saint Joseph
        mockClimateData.put("Saint Joseph", new RegionClimateData(
                "Saint Joseph",
                Arrays.asList(1990, 2000, 2010, 2020),
                Arrays.asList(25.7, 26.0, 26.3, 26.7),
                Arrays.asList(135.0, 180.0, 200.0, 160.0),
                Arrays.asList(9.0, 12.0, 15.0, 20.0),
                80
        ));

        // Mock data for Saint Paul
        mockClimateData.put("Saint Paul", new RegionClimateData(
                "Saint Paul",
                Arrays.asList(1990, 2000, 2010, 2020),
                Arrays.asList(25.5, 25.8, 26.1, 26.5),
                Arrays.asList(145.0, 185.0, 205.0, 165.0),
                Arrays.asList(11.0, 14.0, 17.0, 21.0),
                83
        ));

        // Mock data for Saint Luke
        mockClimateData.put("Saint Luke", new RegionClimateData(
                "Saint Luke",
                Arrays.asList(1990, 2000, 2010, 2020),
                Arrays.asList(25.0, 25.3, 25.7, 26.1),
                Arrays.asList(125.0, 170.0, 190.0, 150.0),
                Arrays.asList(6.0, 8.0, 11.0, 15.0),
                76
        ));

        // Mock data for Saint Mark
        mockClimateData.put("Saint Mark", new RegionClimateData(
                "Saint Mark",
                Arrays.asList(1990, 2000, 2010, 2020),
                Arrays.asList(25.4, 25.7, 26.0, 26.4),
                Arrays.asList(130.0, 175.0, 195.0, 155.0),
                Arrays.asList(10.0, 13.0, 16.0, 21.0),
                81
        ));
    }

    @GetMapping("/region/{name}")
    public ResponseEntity<RegionClimateData> getRegionClimateData(@PathVariable String name) {
        RegionClimateData data = mockClimateData.get(name);
        if (data != null) {
            return ResponseEntity.ok(data);
        }
        return ResponseEntity.notFound().build();
    }

    // Removing the endpoint for /api/dashboard/dominica as it was for a different API
    /*
    @GetMapping("/dashboard/dominica")
    public ResponseEntity<Map<String, Object>> getDominicaDashboardData() {
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("title", "Dominica National Dashboard");
        dashboardData.put("summary", "Key climate indicators and statistics for the entire island.");
        dashboardData.put("overallRiskScore", 75); // Example data
        dashboardData.put("activeAlerts", 3); // Example data
        // Add more comprehensive data as needed
        return ResponseEntity.ok(dashboardData);
    }
    */
} 