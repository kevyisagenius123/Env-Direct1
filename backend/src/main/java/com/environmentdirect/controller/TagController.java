package com.environmentdirect.controller;

import com.environmentdirect.dto.TagDto;
import com.environmentdirect.model.Tag;
import com.environmentdirect.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for providing tag data.
 * This endpoint serves data for the tag dropdown in the GreenAtlasMagazinePage.
 */
@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    /**
     * Get all tags.
     * @return A list of all tags.
     */
    @GetMapping
    public ResponseEntity<List<TagDto>> getAllTags() {
        List<Tag> tags = tagService.findAllTags();
        List<TagDto> tagDtos = tags.stream()
                .map(tag -> new TagDto(tag.getId(), tag.getName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(tagDtos);
    }
}