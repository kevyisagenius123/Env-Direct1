package com.environmentdirect.service;

import com.environmentdirect.dto.ProjectDTO;
import com.environmentdirect.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(ProjectDTO::from)
                .collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Long id) {
        return projectRepository.findById(id)
                .map(ProjectDTO::from)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));
    }
} 