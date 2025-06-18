package com.environmentdirect.service;

import com.environmentdirect.model.Tag;
import com.environmentdirect.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    private final TagRepository tagRepository;

    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Transactional(readOnly = true)
    public List<Tag> findAllTags() {
        return tagRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Tag> findTagById(Long id) {
        return tagRepository.findById(id);
    }
    
    @Transactional(readOnly = true)
    public Optional<Tag> findTagByName(String name) {
        return tagRepository.findByName(name);
    }

    @Transactional
    public Tag createOrGetTag(String name) {
        return tagRepository.findByName(name)
            .orElseGet(() -> tagRepository.save(new Tag(name)));
    }
    
    @Transactional
    public Tag saveTag(Tag tag) {
        return tagRepository.save(tag);
    }

    @Transactional
    public void deleteTag(Long id) {
        // Similar to categories, consider article relationships.
        tagRepository.deleteById(id);
    }
}