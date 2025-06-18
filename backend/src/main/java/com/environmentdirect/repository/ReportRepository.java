package com.environmentdirect.repository;

import com.environmentdirect.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    // Custom query methods for reports
    List<Report> findByStatus(String status);
    List<Report> findByIssueType(String issueType);

    // Find reports by date range
    List<Report> findByDateReportedBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Count reports by status
    @Query("SELECT r.status, COUNT(r) FROM Report r GROUP BY r.status")
    List<Object[]> countByStatus();

    // Count reports by issue type
    @Query("SELECT r.issueType, COUNT(r) FROM Report r GROUP BY r.issueType")
    List<Object[]> countByIssueType();
}
