package com.environmentdirect.config;

import com.environmentdirect.model.Project;
import com.environmentdirect.model.Tag;
import com.environmentdirect.model.TrainingCourse;
import com.environmentdirect.repository.ProjectRepository;
import com.environmentdirect.repository.TagRepository;
import com.environmentdirect.repository.TrainingCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;
import java.util.HashSet;
import java.util.stream.Collectors;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TrainingCourseRepository trainingCourseRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (projectRepository.count() == 0) {
            Tag tag1 = getOrCreateTag("Water Quality");
            Tag tag2 = getOrCreateTag("Community");
            Tag tag3 = getOrCreateTag("Restoration");
            Tag tag4 = getOrCreateTag("Reforestation");
            Tag tag5 = getOrCreateTag("Air Quality");
            Tag tag6 = getOrCreateTag("Urban Planning");
            Tag tag7 = getOrCreateTag("Air Pollution");
            Tag tag8 = getOrCreateTag("Industry");
            Tag tag9 = getOrCreateTag("Technology");

            Project p1 = new Project("River Cleanup Initiative - City Central", "A multi-year project focusing on removing pollutants and restoring the ecological balance of the City Central River. Involved community volunteers and local government collaboration.", "https://via.placeholder.com/600x400.png?text=River+Cleanup");
            p1.setTags(new HashSet<>(Arrays.asList(tag1, tag2, tag3)));
            projectRepository.save(p1);

            Project p2 = new Project("Urban Reforestation Program", "Planting thousands of native trees in urban areas to improve air quality, reduce heat island effect, and enhance biodiversity.", "https://via.placeholder.com/600x400.png?text=Reforestation");
            p2.setTags(new HashSet<>(Arrays.asList(tag4, tag5, tag6)));
            projectRepository.save(p2);

            Project p3 = new Project("Industrial Emissions Reduction Study", "Worked with major industrial players to identify and implement technologies for significant reduction in harmful emissions.", "https://via.placeholder.com/600x400.png?text=Emissions+Study");
            p3.setTags(new HashSet<>(Arrays.asList(tag7, tag8, tag9)));
            projectRepository.save(p3);
        }

        if (trainingCourseRepository.count() == 0) {
            TrainingCourse c1 = new TrainingCourse("Waste Management & Recycling", "Learn best practices for waste reduction, segregation, and recycling to minimize environmental impact.");
            trainingCourseRepository.save(c1);

            TrainingCourse c2 = new TrainingCourse("Environmental Compliance & Auditing", "Understand key environmental regulations and how to conduct effective compliance audits.");
            trainingCourseRepository.save(c2);

            TrainingCourse c3 = new TrainingCourse("Sustainable Resource Management", "Strategies for efficient use of natural resources, including water and energy conservation.");
            trainingCourseRepository.save(c3);

            TrainingCourse c4 = new TrainingCourse("Climate Action & Carbon Footprint Reduction", "Practical steps for businesses and individuals to reduce their carbon footprint.");
            trainingCourseRepository.save(c4);
        }
    }

    private Tag getOrCreateTag(String name) {
        return tagRepository.findByName(name)
                .orElseGet(() -> tagRepository.save(new Tag(name)));
    }
} 