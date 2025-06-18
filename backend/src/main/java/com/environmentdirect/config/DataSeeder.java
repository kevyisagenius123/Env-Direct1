package com.environmentdirect.config;

import com.environmentdirect.model.Article;
import com.environmentdirect.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ArticleService articleService;

    @Autowired
    public DataSeeder(ArticleService articleService) {
        this.articleService = articleService;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Seeding sample articles with local images...");

        // Sample Article 1
        Article article1 = new Article(
                "Dominica's Boiling Lake: A Natural Wonder",
                "The Boiling Lake is a fumarole located in Morne Trois Pitons National Park, a UNESCO World Heritage site in Dominica. It is the second-largest hot lake in the world. The lake is approximately 200 to 250 feet (60 to 75 m) across and is filled with bubbling greyish-blue water that is usually enveloped in a cloud of vapor. The water temperature along the edges can range from 180 to 197 °F (82–92 °C). This article explores its geology, history, and ecological significance.",
                "Discover the geology and mystery behind Dominica's famed Boiling Lake, the world's second-largest hot spring.",
                "Dr. Eco Warrior",
                "/img/soufriere.webp" // Local image path
        );
        Set<String> categories1 = Set.of("Geothermal Wonders", "National Parks");
        Set<String> tags1 = Set.of("Dominica", "Boiling Lake", "Volcanism", "Tourism", "Morne Trois Pitons");
        articleService.createArticle(article1, categories1, tags1);

        // Sample Article 2
        Article article2 = new Article(
                "Protecting Dominica's Endemic Sisserou Parrot",
                "The Sisserou Parrot (Amazona imperialis), Dominica's national bird, is a critically endangered species found only on the island. Conservation efforts are crucial for its survival, focusing on habitat protection, anti-poaching measures, and public awareness. This article delves into the challenges and successes of these conservation programs.",
                "An in-depth look at the conservation efforts for the Sisserou Parrot, Dominica's unique and endangered national bird.",
                "Jane Birdlover",
                "/img/ssmr.jpg" // Local image path
        );
        Set<String> categories2 = Set.of("Wildlife Conservation", "Endangered Species");
        Set<String> tags2 = Set.of("Sisserou Parrot", "Dominica", "Conservation", "Biodiversity", "Birds");
        articleService.createArticle(article2, categories2, tags2);

        // Sample Article 3
        Article article3 = new Article(
                "Sustainable Agriculture Practices in Dominica",
                "Dominica's lush environment supports a variety of agricultural activities. This article explores how local farmers are adopting sustainable practices to enhance food security, protect the soil, and minimize environmental impact. Topics include organic farming, agroforestry, and water conservation techniques.",
                "Exploring how Dominican farmers are embracing sustainable methods for a greener agricultural future.",
                "Agro Expert",
                "/img/Dominic_fOREST.jpg" // Local image path
        );
        Set<String> categories3 = Set.of("Sustainable Agriculture", "Food Security", "Environmental Practices");
        Set<String> tags3 = Set.of("Farming", "Organic", "Dominica", "Sustainability", "Agroforestry");
        articleService.createArticle(article3, categories3, tags3);

        // Sample Article 4
        Article article4 = new Article(
                "The Impact of Climate Change on Dominica's Coral Reefs",
                "Dominica's marine ecosystems, particularly its vibrant coral reefs, are facing increasing threats from climate change, including rising sea temperatures and ocean acidification. This piece examines the current state of these reefs and the ongoing efforts to monitor and protect them.",
                "An analysis of the threats to Dominica's coral reefs due to climate change and conservation initiatives.",
                "Dr. Marine Bio",
                "/img/coral.jpg" // Local image path
        );
        Set<String> categories4 = Set.of("Marine Biology", "Climate Change", "Ocean Conservation");
        Set<String> tags4 = Set.of("Coral Reefs", "Dominica", "Climate Action", "Marine Ecosystems");
        articleService.createArticle(article4, categories4, tags4);

        System.out.println(articleService.findAllArticles(org.springframework.data.domain.PageRequest.of(0, 10)).getTotalElements() + " articles seeded.");
    }
}
