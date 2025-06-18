package com.environmentdirect.repository;

import com.environmentdirect.model.TrainingCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingCourseRepository extends JpaRepository<TrainingCourse, Long> {
} 