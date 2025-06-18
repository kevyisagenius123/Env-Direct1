package com.environmentdirect.service;

import com.environmentdirect.model.Category;
import com.environmentdirect.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Category> findCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Category> findCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Transactional
    public Category createOrGetCategory(String name, String description) {
        return categoryRepository.findByName(name)
            .orElseGet(() -> categoryRepository.save(new Category(name, description)));
    }
    
    @Transactional
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(Long id) {
        // Consider what happens to articles in this category.
        // For now, we'll just delete the category.
        // Relationships might need to be handled (e.g., remove category from articles first).
        categoryRepository.deleteById(id);
    }
}