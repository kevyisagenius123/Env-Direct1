package com.environmentdirect.controller;

import com.environmentdirect.dto.ReportDTO;
import com.environmentdirect.dto.ReportStatusUpdateDto;
import com.environmentdirect.model.Report;
import com.environmentdirect.service.ReportService;
import com.environmentdirect.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Valid;
// import org.springframework.web.multipart.MultipartFile; // For file upload later

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;
    private final FileStorageService fileStorageService; // Inject FileStorageService for serving images

    @Autowired
    public ReportController(ReportService reportService, FileStorageService fileStorageService) {
        this.reportService = reportService;
        this.fileStorageService = fileStorageService;
    }

    // POST endpoint to create a new report with an optional image
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Report> createReport(
            @RequestPart("report") ReportDTO reportDTO, // Changed from @RequestBody
            @RequestPart(name = "imageFile", required = false) MultipartFile imageFile) {
        try {
            Report report = new Report();
            report.setLocation(reportDTO.location());
            report.setIssueType(reportDTO.issueType());
            report.setDescription(reportDTO.description());
            report.setReportedBy(reportDTO.reportedBy());
            report.setContactEmail(reportDTO.contactEmail());
            report.setDateReported(LocalDateTime.now());
            report.setStatus("Pending Review"); // Default status

            Report createdReport = reportService.createReport(report, imageFile);
            return new ResponseEntity<>(createdReport, HttpStatus.CREATED);
        } catch (Exception e) {
            // Log the exception details for debugging
            System.err.println("Error creating report: " + e.getMessage());
            e.printStackTrace();
            // Consider a more specific error response based on the exception type
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create report", e);
        }
    }

    /*
    // Example for handling file upload along with form data:
    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<Report> createReportWithImage(
            @RequestPart("report") ReportDTO reportDTO, // "report" should match the key in FormData
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {

        Report report = new Report();
        report.setLocation(reportDTO.location());
        report.setIssueType(reportDTO.issueType());
        report.setDescription(reportDTO.description());
        report.setReportedBy(reportDTO.reportedBy());
        report.setContactEmail(reportDTO.contactEmail());

        Report createdReport = reportService.createReport(report, imageFile); // Service method needs to handle imageFile
        return new ResponseEntity<>(createdReport, HttpStatus.CREATED);
    }
    */

    // GET endpoint to retrieve all reports
    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportService.getAllReports();
        if (reports.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // GET endpoint to retrieve a single report by ID
    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable Long id) {
        Optional<Report> reportData = reportService.getReportById(id);
        return reportData.map(report -> new ResponseEntity<>(report, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // GET endpoint to serve an image file
    @GetMapping("/images/{filename:.+}")
    @ResponseBody // Indicates the return value should be bound to the web response body
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Resource file = fileStorageService.loadAsResource(filename);
            // Try to determine content type
            String contentType = null;
            try {
                contentType = Files.probeContentType(file.getFile().toPath());
            } catch (IOException ex) {
                System.err.println("Could not determine file type for: " + filename);
            }
            // Fallback to octet-stream if type not determined
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (Exception e) {
            System.err.println("Error serving file: " + filename + " Error: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update the status of a report.
     * 
     * @param id The ID of the report to update
     * @param statusUpdateDto The DTO containing the new status and optional comment
     * @return ResponseEntity with the updated report or an error
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<Report> updateReportStatus(
            @PathVariable Long id,
            @Valid @RequestBody ReportStatusUpdateDto statusUpdateDto) {
        try {
            Optional<Report> updatedReport = reportService.updateReportStatus(id, statusUpdateDto);
            return updatedReport
                    .map(report -> new ResponseEntity<>(report, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            System.err.println("Error updating report status: " + e.getMessage());
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update report status", e);
        }
    }

    // We can add more endpoints for updates and DELETE for removal later
}
