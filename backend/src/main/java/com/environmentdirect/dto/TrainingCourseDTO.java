package com.environmentdirect.dto;

import com.environmentdirect.model.TrainingCourse;

public record TrainingCourseDTO(
    Long id,
    String title,
    String description
) {
    public static TrainingCourseDTO from(TrainingCourse course) {
        return new TrainingCourseDTO(
            course.getId(),
            course.getTitle(),
            course.getDescription()
        );
    }
} 