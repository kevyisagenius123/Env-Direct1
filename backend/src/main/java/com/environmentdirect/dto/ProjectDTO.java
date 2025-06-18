package com.environmentdirect.dto;

import java.util.Set;
import java.util.stream.Collectors;
import com.environmentdirect.model.Project;

public record ProjectDTO(
    Long id,
    String title,
    String description,
    String imageUrl,
    Set<String> tags
) {
    public static ProjectDTO from(Project project) {
        return new ProjectDTO(
            project.getId(),
            project.getTitle(),
            project.getDescription(),
            project.getImageUrl(),
            project.getTags().stream()
                .map(tag -> tag.getName())
                .collect(Collectors.toSet())
        );
    }
} 