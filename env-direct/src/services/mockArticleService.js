import { sampleArticleWithInteractiveContent } from '../utils/mockInteractiveData';

/**
 * Mock Article Service
 * 
 * This service provides mock implementations of article-related API calls
 * for testing and development purposes.
 */
class MockArticleService {
  // Mock data for categories
  #categories = [
    { id: 1, name: 'Climate Change' },
    { id: 2, name: 'Conservation' },
    { id: 3, name: 'Renewable Energy' },
    { id: 4, name: 'Biodiversity' },
    { id: 5, name: 'Sustainable Living' }
  ];

  // Mock data for tags
  #tags = [
    { id: 1, name: 'Dominica' },
    { id: 2, name: 'Ecosystems' },
    { id: 3, name: 'Data Visualization' },
    { id: 4, name: 'Climate Action' },
    { id: 5, name: 'Renewable Energy' },
    { id: 6, name: 'Wildlife' },
    { id: 7, name: 'Ocean Conservation' },
    { id: 8, name: 'Sustainable Development' }
  ];

  // Array of image URLs for article covers
  // In a real application, these would be URLs to images stored on a server or CDN
  // For this mock service, we'll use placeholder images from online services
  #imagePaths = [
    "https://source.unsplash.com/random/800x600/?coral+reef",
    "https://source.unsplash.com/random/800x600/?renewable+energy",
    "https://source.unsplash.com/random/800x600/?biodiversity",
    "https://source.unsplash.com/random/800x600/?sustainable+agriculture",
    "https://source.unsplash.com/random/800x600/?ocean+conservation",
    "https://source.unsplash.com/random/800x600/?forest+conservation",
    "https://source.unsplash.com/random/800x600/?climate+change",
    "https://source.unsplash.com/random/800x600/?green+energy",
    "https://source.unsplash.com/random/800x600/?wildlife+conservation",
    "https://source.unsplash.com/random/800x600/?sustainable+development",
    "https://source.unsplash.com/random/800x600/?environmental+protection",
    "https://source.unsplash.com/random/800x600/?clean+water",
    "https://source.unsplash.com/random/800x600/?air+quality",
    "https://source.unsplash.com/random/800x600/?waste+management",
    "https://source.unsplash.com/random/800x600/?recycling",
    "https://source.unsplash.com/random/800x600/?green+technology",
    "https://source.unsplash.com/random/800x600/?eco+friendly",
    "https://source.unsplash.com/random/800x600/?carbon+footprint",
    "https://source.unsplash.com/random/800x600/?renewable+resources",
    "https://source.unsplash.com/random/800x600/?sustainable+living"
  ];

  // Mock data for articles
  #articles = Array.from({ length: 20 }, (_, i) => ({
    id: `article-${i + 1}`,
    title: `Sample Article ${i + 1}: ${['Climate Impact on Coral Reefs', 'Renewable Energy Progress', 'Biodiversity Conservation', 'Sustainable Agriculture', 'Ocean Pollution Solutions'][i % 5]}`,
    summary: `This is a summary of article ${i + 1} about environmental topics and sustainability.`,
    content: `<p>This is the content of article ${i + 1}. It would contain detailed information about the topic.</p>`,
    imageUrl: this.#imagePaths[i % this.#imagePaths.length], // Use real image paths
    author: ['Environmental Scientist', 'Climate Researcher', 'Conservation Expert', 'Sustainability Advocate'][i % 4],
    createdAt: new Date(Date.now() - (i + 1) * 3 * 24 * 60 * 60 * 1000).toISOString(), // (i+1)*3 days ago
    updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(), // i days ago
    categories: [this.#categories[i % 5], this.#categories[(i + 2) % 5]],
    tags: [this.#tags[i % 8], this.#tags[(i + 3) % 8], this.#tags[(i + 5) % 8]]
  }));

  /**
   * Get a list of all categories
   * 
   * @returns {Promise} - A promise that resolves to an array of categories
   */
  async getCategories() {
    console.log('[MockArticleService] Fetching categories');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return [...this.#categories];
  }

  /**
   * Get a list of all tags
   * 
   * @returns {Promise} - A promise that resolves to an array of tags
   */
  async getTags() {
    console.log('[MockArticleService] Fetching tags');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return [...this.#tags];
  }

  /**
   * Get a paginated list of articles with optional filtering
   * 
   * @param {number} page - The page number (0-indexed)
   * @param {number} size - The number of items per page
   * @param {string} sort - The sort field and direction (e.g., 'createdAt,desc')
   * @param {string} search - Optional search term
   * @param {string} categoryName - Optional category name filter
   * @param {string} tagName - Optional tag name filter
   * @returns {Promise} - A promise that resolves to a page of articles
   */
  async getArticles(page = 0, size = 10, sort = 'createdAt,desc', search = '', categoryName = '', tagName = '') {
    console.log(`[MockArticleService] Fetching articles - page: ${page}, size: ${size}, sort: ${sort}, search: ${search}, category: ${categoryName}, tag: ${tagName}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter articles based on search term, category, and tag
    let filteredArticles = [...this.#articles];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredArticles = filteredArticles.filter(article => 
        article.title.toLowerCase().includes(searchLower) || 
        article.summary.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower)
      );
    }

    if (categoryName) {
      filteredArticles = filteredArticles.filter(article => 
        article.categories.some(category => category.name.toLowerCase() === categoryName.toLowerCase())
      );
    }

    if (tagName) {
      filteredArticles = filteredArticles.filter(article => 
        article.tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())
      );
    }

    // Sort articles
    const [sortField, sortDirection] = sort.split(',');
    filteredArticles.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Paginate articles
    const totalElements = filteredArticles.length;
    const totalPages = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const endIndex = Math.min(startIndex + size, totalElements);
    const content = filteredArticles.slice(startIndex, endIndex);

    // Return paginated result
    return {
      content,
      pageable: {
        pageNumber: page,
        pageSize: size,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false
        }
      },
      totalPages,
      totalElements,
      last: page >= totalPages - 1,
      first: page === 0,
      size,
      number: page,
      sort: {
        sorted: true,
        unsorted: false,
        empty: false
      },
      numberOfElements: content.length,
      empty: content.length === 0
    };
  }

  /**
   * Get a single article by ID
   * 
   * @param {string|number} id - The article ID
   * @returns {Promise} - A promise that resolves to the article data
   */
  async getArticle(id) {
    // For demo purposes, return the sample article with interactive content
    // In a real implementation, this would fetch from the API
    console.log(`[MockArticleService] Fetching article with ID: ${id}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if it's one of our mock articles
    const mockArticle = this.#articles.find(article => article.id === id);
    if (mockArticle) {
      return mockArticle;
    }

    // Otherwise return the sample article with interactive content
    return {
      ...sampleArticleWithInteractiveContent,
      id: id,
      author: 'Environmental Scientist',
      imageUrl: "https://source.unsplash.com/random/800x600/?dominica+rainforest", // Use Unsplash image
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      updatedAt: new Date().toISOString(),
      categories: [
        { id: 1, name: 'Climate Change' },
        { id: 2, name: 'Conservation' }
      ],
      tags: [
        { id: 1, name: 'Dominica' },
        { id: 2, name: 'Ecosystems' },
        { id: 3, name: 'Data Visualization' }
      ]
    };
  }

  /**
   * Get comments for an article
   * 
   * @param {string|number} articleId - The article ID
   * @returns {Promise} - A promise that resolves to an array of comments
   */
  async getComments(articleId) {
    console.log(`[MockArticleService] Fetching comments for article ID: ${articleId}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Return sample comments
    return [
      {
        id: 1,
        articleId: articleId,
        authorName: 'Jane Smith',
        content: 'This is a fascinating article! The interactive visualizations really help to understand the data.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
      },
      {
        id: 2,
        articleId: articleId,
        authorName: 'John Doe',
        content: 'I appreciate the detailed maps showing conservation areas. It would be great to see more information about ongoing conservation projects in these areas.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
      },
      {
        id: 3,
        articleId: articleId,
        authorName: 'Maria Rodriguez',
        content: 'The before/after images of forest recovery are impressive. Nature is resilient when given the chance to heal.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      }
    ];
  }

  /**
   * Add a comment to an article
   * 
   * @param {string|number} articleId - The article ID
   * @param {Object} commentData - The comment data (authorName, content)
   * @returns {Promise} - A promise that resolves to the created comment
   */
  async addComment(articleId, commentData) {
    console.log(`[MockArticleService] Adding comment to article ID: ${articleId}`, commentData);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return the created comment with an ID and timestamp
    return {
      id: Date.now(), // Use timestamp as ID
      articleId: articleId,
      authorName: commentData.authorName,
      content: commentData.content,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Get related articles
   * 
   * @param {string|number} articleId - The article ID
   * @param {number} count - Number of related articles to return
   * @returns {Promise} - A promise that resolves to an array of related articles
   */
  async getRelatedArticles(articleId, count = 3) {
    console.log(`[MockArticleService] Fetching ${count} related articles for article ID: ${articleId}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));

    // Topics for related articles
    const relatedTopics = [
      { title: 'Coral Reef Conservation', category: 'Conservation', imageQuery: 'coral+reef' },
      { title: 'Renewable Energy Progress', category: 'Energy', imageQuery: 'renewable+energy' },
      { title: 'Biodiversity Monitoring', category: 'Biodiversity', imageQuery: 'biodiversity' },
      { title: 'Sustainable Farming Practices', category: 'Agriculture', imageQuery: 'sustainable+farming' },
      { title: 'Ocean Plastic Reduction', category: 'Conservation', imageQuery: 'ocean+plastic' }
    ];

    // Generate sample related articles
    const relatedArticles = [];
    for (let i = 1; i <= count; i++) {
      const topicIndex = (i - 1) % relatedTopics.length;
      const topic = relatedTopics[topicIndex];

      relatedArticles.push({
        id: `related-${i}`,
        title: `Related Article ${i}: ${topic.title}`,
        summary: `This is a summary of related article ${i} about ${topic.title.toLowerCase()} and environmental topics in Dominica.`,
        imageUrl: `https://source.unsplash.com/random/800x600/?${topic.imageQuery}`,
        createdAt: new Date(Date.now() - i * 14 * 24 * 60 * 60 * 1000).toISOString(), // i*2 weeks ago
        categories: [{ id: i, name: topic.category }]
      });
    }

    return relatedArticles;
  }

  /**
   * Get featured articles for the magazine
   * 
   * @returns {Promise} - A promise that resolves to an array of featured articles
   */
  async getFeaturedArticles() {
    console.log('[MockArticleService] Fetching featured articles');
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
      {
        id: 'featured-1',
        title: 'Environmental Intelligence for a Sustainable Future',
        summary: 'Comprehensive climate analytics, geospatial monitoring, and AI-driven insights for Dominica and the Caribbean region.',
        imageUrl: '/img/dominica-hero-landscape.jpg',
        category: 'Climate Intelligence',
        readTime: '8 min read',
        author: 'Dr. Sarah Chen',
        isFeatured: true
      },
      {
        id: 'featured-2',
        title: 'Caribbean Coral Reef Restoration: A Data-Driven Approach',
        summary: 'Leveraging satellite imagery and AI to monitor and accelerate coral reef recovery across the Caribbean basin.',
        imageUrl: '/img/coral-restoration.jpg',
        category: 'Marine Conservation',
        readTime: '12 min read',
        author: 'Prof. Marcus Williams',
        isFeatured: true
      }
    ];
  }

  /**
   * Get editor's picks for the magazine
   * 
   * @returns {Promise} - A promise that resolves to an array of editor's pick articles
   */
  async getEditorsPicks() {
    console.log('[MockArticleService] Fetching editors picks');
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
      {
        id: 'editors-1',
        title: "Dominica's Mangrove Restoration: A Model for Caribbean Resilience",
        summary: "Comprehensive analysis of mangrove ecosystem recovery following Hurricane Maria, featuring AI-driven monitoring and community-led conservation efforts.",
        author: "Dr. Sarah Chen",
        authorTitle: "Marine Ecologist",
        category: "Restoration Science",
        readTime: "12 min read",
        imageUrl: "/img/mangrove-restoration.jpg",
        isEditorsPick: true,
        tags: ["Mangroves", "Climate Resilience", "Marine Conservation"],
        publishedAt: "2024-01-15"
      },
      {
        id: 'editors-2',
        title: "AI-Powered Coral Bleaching Detection in the Eastern Caribbean",
        summary: "Revolutionary satellite imagery analysis combined with machine learning algorithms provides real-time coral health monitoring across the region.",
        author: "Prof. Marcus Williams",
        authorTitle: "Climate Data Scientist",
        category: "AI Research",
        readTime: "8 min read",
        imageUrl: "/img/coral-ai-monitoring.jpg",
        isEditorsPick: true,
        tags: ["AI", "Coral Reefs", "Satellite Monitoring"],
        publishedAt: "2024-01-12"
      }
    ];
  }

  /**
   * Get analytics data for the magazine
   * 
   * @returns {Promise} - A promise that resolves to analytics data
   */
  async getAnalytics() {
    console.log('[MockArticleService] Fetching analytics data');
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      categories: [
        { name: 'Climate Science', value: 34, color: '#22c55e' },
        { name: 'Marine Conservation', value: 28, color: '#3b82f6' },
        { name: 'Restoration', value: 18, color: '#f59e0b' },
        { name: 'AI Research', value: 12, color: '#8b5cf6' },
        { name: 'Policy Analysis', value: 8, color: '#ef4444' }
      ],
      publications: [
        { month: 'Aug', articles: 12, engagement: 85 },
        { month: 'Sep', articles: 15, engagement: 92 },
        { month: 'Oct', articles: 18, engagement: 88 },
        { month: 'Nov', articles: 22, engagement: 95 },
        { month: 'Dec', articles: 19, engagement: 91 },
        { month: 'Jan', articles: 25, engagement: 97 }
      ],
      topTags: [
        { tag: 'Climate Resilience', count: 45, growth: '+12%' },
        { tag: 'Marine Biodiversity', count: 38, growth: '+8%' },
        { tag: 'AI Monitoring', count: 32, growth: '+25%' },
        { tag: 'Carbon Sequestration', count: 28, growth: '+5%' },
        { tag: 'Sustainable Tourism', count: 24, growth: '+15%' }
      ],
      engagement: {
        totalReads: '124.5K',
        avgReadTime: '8.5min',
        shareRate: '23%',
        returnReaders: '67%'
      }
    };
  }

  /**
   * Get AI digest data
   * 
   * @returns {Promise} - A promise that resolves to AI digest data
   */
  async getAIDigest() {
    console.log('[MockArticleService] Fetching AI digest');
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      weekly: {
        title: "Green Atlas Weekly Intelligence Digest",
        lastUpdated: "2024-01-15T10:30:00Z",
        confidence: 94,
        insights: [
          {
            id: 1,
            title: "Soufrière Mangrove Recovery Acceleration",
            summary: "Mangrove zones achieve 90% replanting success rate—model for other coastal systems.",
            impact: "High",
            sources: 15,
            trend: "up",
            category: "restoration"
          },
          {
            id: 2,
            title: "Tourism Refuse Accumulation Alert",
            summary: "Boiling Lake area shows 47% increase in tourism-related refuse; remediation resources falling short.",
            impact: "Critical",
            sources: 8,
            trend: "down",
            category: "conservation"
          },
          {
            id: 3,
            title: "Eastern Reef Thermal Anomaly Detection",
            summary: "Satellite thermal monitoring detects bleaching events—critical alert for marine biodiversity.",
            impact: "High",
            sources: 12,
            trend: "warning",
            category: "monitoring"
          }
        ]
      },
      realtime: {
        title: "Real-Time Environmental Intelligence",
        lastUpdated: "2024-01-15T14:25:00Z",
        confidence: 89,
        insights: [
          {
            id: 4,
            title: "Atmospheric CO2 Monitoring Update",
            summary: "Latest readings show stabilization in regional atmospheric carbon levels.",
            impact: "Medium",
            sources: 6,
            trend: "stable",
            category: "atmosphere"
          }
        ]
      },
      predictions: {
        title: "AI Predictive Analysis",
        lastUpdated: "2024-01-15T12:00:00Z",
        confidence: 87,
        insights: [
          {
            id: 6,
            title: "Hurricane Season Preparedness Index",
            summary: "Machine learning models predict 78% readiness for upcoming hurricane season based on infrastructure and ecosystem resilience.",
            impact: "High",
            sources: 20,
            trend: "up",
            category: "prediction"
          }
        ]
      }
    };
  }

  /**
   * Get inspirational quotes for the magazine
   * 
   * @returns {Promise} - A promise that resolves to an array of quotes
   */
  async getQuotes() {
    console.log('[MockArticleService] Fetching quotes');
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
      {
        id: 1,
        text: "The environment and the economy are really both two sides of the same coin. If we cannot sustain the environment, we cannot sustain ourselves.",
        author: "Wangari Maathai",
        title: "Nobel Peace Prize Winner",
        category: "sustainability"
      },
      {
        id: 2,
        text: "Climate change is not just an environmental issue. It's a human rights issue, a justice issue, and an economic issue.",
        author: "Dr. Ayana Elizabeth Johnson",
        title: "Marine Biologist & Climate Expert",
        category: "climate"
      },
      {
        id: 3,
        text: "In the Caribbean, we are not just small island developing states—we are large ocean states with immense potential.",
        author: "Prime Minister Roosevelt Skerrit",
        title: "Commonwealth of Dominica",
        category: "regional"
      }
    ];
  }
}

// Create and export a singleton instance
const mockArticleService = new MockArticleService();
export default mockArticleService;
