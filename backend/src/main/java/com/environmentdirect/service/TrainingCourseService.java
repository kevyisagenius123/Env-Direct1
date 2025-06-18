package com.environmentdirect.service;

import com.environmentdirect.dto.TrainingCourseDTO;
import com.environmentdirect.repository.TrainingCourseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingCourseService {

    @Autowired
    private TrainingCourseRepository courseRepository;

    public List<TrainingCourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(TrainingCourseDTO::from)
                .collect(Collectors.toList());
    }

    public TrainingCourseDTO getCourseById(Long id) {
        return courseRepository.findById(id)
                .map(TrainingCourseDTO::from)
                .orElseThrow(() -> new EntityNotFoundException("Training course not found with id: " + id));
    }
} 