package com.environmentdirect.service;

import com.environmentdirect.model.Report;
import com.environmentdirect.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
// import java.nio.file.Path; // For file handling later
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final FileStorageService fileStorageService; // Inject FileStorageService

    @Autowired
    public ReportService(ReportRepository reportRepository, FileStorageService fileStorageService) { // Add FileStorageService
        this.reportRepository = reportRepository;
        this.fileStorageService = fileStorageService;
    }

    public Report createReport(Report report, MultipartFile imageFile) {
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String filename = fileStorageService.store(imageFile);
                // For now, store just the filename. We'll construct full URLs when serving.
                report.setImageUrl(filename); 
            } catch (Exception e) {
                // Handle file storage exception, e.g., log it or throw a custom exception
                // For simplicity, we're not throwing a fatal error here, report can be saved without image
                System.err.println("Could not store image file: " + e.getMessage());
                report.setImageUrl(null); // Ensure imageUrl is null if storage failed
            }
        }
        return reportRepository.save(report);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }

    /**
     * Update the status of a report.
     * 
     * @param id The ID of the report to update
     * @param statusUpdateDto The DTO containing the new status and optional comment
     * @return Optional containing the updated report, or empty if the report was not found
     */
    public Optional<Report> updateReportStatus(Long id, com.environmentdirect.dto.ReportStatusUpdateDto statusUpdateDto) {
        Optional<Report> reportOptional = reportRepository.findById(id);
        if (reportOptional.isPresent()) {
            Report report = reportOptional.get();
            report.setStatus(statusUpdateDto.status());
            // We could add a comment field to the Report entity and set it here
            // report.setComment(statusUpdateDto.comment());
            return Optional.of(reportRepository.save(report));
        }
        return Optional.empty();
    }

    /**
     * Get reports by status.
     * 
     * @param status The status to filter by
     * @return List of reports with the specified status
     */
    public List<Report> getReportsByStatus(String status) {
        return reportRepository.findByStatus(status);
    }

    /**
     * Get reports by issue type.
     * 
     * @param issueType The issue type to filter by
     * @return List of reports with the specified issue type
     */
    public List<Report> getReportsByIssueType(String issueType) {
        return reportRepository.findByIssueType(issueType);
    }

    /**
     * Get reports by date range.
     * 
     * @param startDateStr The start date in ISO format (e.g., 2023-01-01)
     * @param endDateStr The end date in ISO format (e.g., 2023-12-31)
     * @return List of reports within the specified date range
     */
    public List<Report> getReportsByDateRange(String startDateStr, String endDateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;

        // Parse the date strings to LocalDateTime
        LocalDateTime startDate = LocalDateTime.parse(startDateStr + "T00:00:00");
        LocalDateTime endDate = LocalDateTime.parse(endDateStr + "T23:59:59");

        return reportRepository.findByDateReportedBetween(startDate, endDate);
    }

    /**
     * Get report status counts.
     * 
     * @return Map of status to count
     */
    public Map<String, Long> getReportStatusCounts() {
        List<Object[]> results = reportRepository.countByStatus();
        Map<String, Long> statusCounts = new HashMap<>();

        for (Object[] result : results) {
            String status = (String) result[0];
            Long count = (Long) result[1];
            statusCounts.put(status, count);
        }

        return statusCounts;
    }

    /**
     * Get report type counts.
     * 
     * @return Map of issue type to count
     */
    public Map<String, Long> getReportTypeCounts() {
        List<Object[]> results = reportRepository.countByIssueType();
        Map<String, Long> typeCounts = new HashMap<>();

        for (Object[] result : results) {
            String issueType = (String) result[0];
            Long count = (Long) result[1];
            typeCounts.put(issueType, count);
        }

        return typeCounts;
    }

    /**
     * Delete a report.
     * 
     * @param id The ID of the report to delete
     * @return true if the report was deleted, false if it was not found
     */
    public boolean deleteReport(Long id) {
        if (reportRepository.existsById(id)) {
            reportRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
