package com.environmentdirect.controller;

import com.environmentdirect.dto.TrainingCourseDTO;
import com.environmentdirect.service.TrainingCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/training-courses")
public class TrainingCourseController {

    @Autowired
    private TrainingCourseService courseService;

    @GetMapping
    public ResponseEntity<List<TrainingCourseDTO>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainingCourseDTO> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }
} 