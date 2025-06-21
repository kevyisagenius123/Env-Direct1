package com.environmentdirect.controller;

import com.environmentdirect.dto.CategoryDto;
import com.environmentdirect.model.Category;
import com.environmentdirect.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for providing category data.
 * This endpoint serves data for the category dropdown in the GreenAtlasMagazinePage.
 */
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://environment-direct-frontend.vercel.app",
    "https://environment-direct-frontend-5oz7nwxmk.vercel.app",
    "https://wonderful-boba-48e576.netlify.app"
})
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Get all categories.
     * @return A list of all categories.
     */
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<Category> categories = categoryService.findAllCategories();
        List<CategoryDto> categoryDtos = categories.stream()
                .map(category -> new CategoryDto(category.getId(), category.getName(), category.getDescription()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(categoryDtos);
    }
}