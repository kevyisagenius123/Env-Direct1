package com.environmentdirect.controller;

import com.environmentdirect.model.Report;
import com.environmentdirect.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for admin operations on reports.
 * Provides endpoints for admin-specific operations on reports.
 */
@RestController
@RequestMapping("/api/admin/reports")
@PreAuthorize("hasRole('ADMIN')") // Ensure only admins can access these endpoints
public class ReportAdminController {

    private final ReportService reportService;

    @Autowired
    public ReportAdminController(ReportService reportService) {
        this.reportService = reportService;
    }

    /**
     * Get reports by status.
     * 
     * @param status The status to filter by
     * @return ResponseEntity with the filtered reports
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Report>> getReportsByStatus(@PathVariable String status) {
        try {
            // This method needs to be added to ReportService
            List<Report> reports = reportService.getReportsByStatus(status);
            if (reports.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reports, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get reports by status", e);
        }
    }

    /**
     * Get report statistics.
     * 
     * @return ResponseEntity with report statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getReportStatistics() {
        try {
            // This method needs to be added to ReportService
            Map<String, Long> statusCounts = reportService.getReportStatusCounts();
            Map<String, Long> typeCounts = reportService.getReportTypeCounts();
            
            Map<String, Object> statistics = new HashMap<>();
            statistics.put("statusCounts", statusCounts);
            statistics.put("typeCounts", typeCounts);
            statistics.put("totalReports", reportService.getAllReports().size());
            
            return new ResponseEntity<>(statistics, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get report statistics", e);
        }
    }

    /**
     * Get reports by date range.
     * 
     * @param startDate The start date in ISO format (e.g., 2023-01-01)
     * @param endDate The end date in ISO format (e.g., 2023-12-31)
     * @return ResponseEntity with the filtered reports
     */
    @GetMapping("/date-range")
    public ResponseEntity<List<Report>> getReportsByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            // This method needs to be added to ReportService
            List<Report> reports = reportService.getReportsByDateRange(startDate, endDate);
            if (reports.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reports, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get reports by date range", e);
        }
    }

    /**
     * Delete a report.
     * 
     * @param id The ID of the report to delete
     * @return ResponseEntity with success message or error
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteReport(@PathVariable Long id) {
        try {
            // This method needs to be added to ReportService
            boolean deleted = reportService.deleteReport(id);
            
            Map<String, String> response = new HashMap<>();
            if (deleted) {
                response.put("message", "Report deleted successfully");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("message", "Report not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete report", e);
        }
    }
}