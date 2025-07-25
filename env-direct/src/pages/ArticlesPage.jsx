import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Search, 
  Filter,
  ArrowRight,
  BookOpen,
  Heart,
  MessageCircle,
  Share2,
  Eye
} from 'lucide-react';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Sample articles data - in production this would come from an API
  const sampleArticles = [
    {
      id: 1,
      title: "Climate Change Adaptation Strategies for Caribbean Small Island States",
      excerpt: "Exploring innovative adaptation measures for climate resilience in the Caribbean region, focusing on sustainable infrastructure and community-based solutions.",
      content: "Climate change poses unprecedented challenges to Caribbean Small Island Developing States (SIDS). This comprehensive analysis examines successful adaptation strategies being implemented across the region...",
      author: "Dr. Sarah Johnson",
      authorBio: "Climate Adaptation Specialist",
      publishDate: "2024-07-20",
      readTime: "8 min read",
      category: "Climate Change",
      tags: ["adaptation", "caribbean", "resilience", "sustainability"],
      featuredImage: "/api/placeholder/800/400",
      likes: 45,
      comments: 12,
      views: 1250,
      status: "published"
    },
    {
      id: 2,
      title: "Sustainable Tourism Development in Dominica: Balancing Growth and Conservation",
      excerpt: "An analysis of sustainable tourism practices in Dominica and their impact on biodiversity conservation and local economic development.",
      content: "Dominica's unique position as the 'Nature Island of the Caribbean' presents both opportunities and challenges for sustainable tourism development...",
      author: "Michael Chen",
      authorBio: "Sustainable Tourism Consultant",
      publishDate: "2024-07-18",
      readTime: "6 min read",
      category: "Sustainable Development",
      tags: ["tourism", "conservation", "dominica", "biodiversity"],
      featuredImage: "/api/placeholder/800/400",
      likes: 32,
      comments: 8,
      views: 890,
      status: "published"
    },
    {
      id: 3,
      title: "Marine Protected Areas: Success Stories from the Eastern Caribbean",
      excerpt: "Examining effective marine conservation strategies and their socio-economic benefits across Eastern Caribbean nations.",
      content: "Marine Protected Areas (MPAs) have emerged as crucial tools for marine biodiversity conservation in the Eastern Caribbean...",
      author: "Dr. Emily Rodriguez",
      authorBio: "Marine Conservation Biologist",
      publishDate: "2024-07-15",
      readTime: "10 min read",
      category: "Marine Conservation",
      tags: ["marine", "conservation", "caribbean", "biodiversity"],
      featuredImage: "/api/placeholder/800/400",
      likes: 67,
      comments: 15,
      views: 1580,
      status: "published"
    },
    {
      id: 4,
      title: "Renewable Energy Transition in Small Island States: Lessons from Dominica",
      excerpt: "Analyzing Dominica's journey toward renewable energy independence and the challenges faced by small island developing states.",
      content: "Dominica's commitment to becoming the world's first climate-resilient nation includes an ambitious transition to renewable energy...",
      author: "James Williams",
      authorBio: "Renewable Energy Policy Analyst",
      publishDate: "2024-07-12",
      readTime: "7 min read",
      category: "Renewable Energy",
      tags: ["renewable", "energy", "policy", "dominica"],
      featuredImage: "/api/placeholder/800/400",
      likes: 28,
      comments: 6,
      views: 720,
      status: "published"
    },
    {
      id: 5,
      title: "Community-Based Forest Management: Indigenous Practices and Modern Conservation",
      excerpt: "Exploring the integration of indigenous knowledge with contemporary forest management practices in Caribbean communities.",
      content: "Indigenous communities in the Caribbean have practiced sustainable forest management for centuries...",
      author: "Maria Santos",
      authorBio: "Community Conservation Specialist",
      publishDate: "2024-07-10",
      readTime: "9 min read",
      category: "Conservation",
      tags: ["forest", "indigenous", "community", "conservation"],
      featuredImage: "/api/placeholder/800/400",
      likes: 41,
      comments: 9,
      views: 1100,
      status: "published"
    },
    {
      id: 6,
      title: "Green Building Standards for Tropical Climates: A Caribbean Perspective",
      excerpt: "Examining sustainable building practices adapted for tropical environments and their role in climate adaptation.",
      content: "Sustainable building design in tropical climates requires unique considerations for climate, materials, and local conditions...",
      author: "Robert Taylor",
      authorBio: "Sustainable Architecture Consultant",
      publishDate: "2024-07-08",
      readTime: "5 min read",
      category: "Green Building",
      tags: ["architecture", "sustainability", "tropical", "green building"],
      featuredImage: "/api/placeholder/800/400",
      likes: 23,
      comments: 4,
      views: 650,
      status: "published"
    }
  ];

  const categories = [
    'all',
    'Climate Change',
    'Sustainable Development', 
    'Marine Conservation',
    'Renewable Energy',
    'Conservation',
    'Green Building'
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setArticles(sampleArticles);
      setFilteredArticles(sampleArticles);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchTerm]);

  const ArticleCard = ({ article }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Featured Image */}
      <div className="relative h-48 bg-gradient-to-br from-envGreen-100 to-envGreen-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-envGreen-600 opacity-50" />
        </div>
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-envGreen-100 text-envGreen-800">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="mr-4">{new Date(article.publishDate).toLocaleDateString()}</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>{article.readTime}</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Author and Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-envGreen-100 rounded-full flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-envGreen-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{article.author}</p>
              <p className="text-xs text-gray-500">{article.authorBio}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{article.views}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              <span>{article.likes}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span>{article.comments}</span>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <div className="mt-4">
          <Link
            to={`/articles/${article.id}`}
            className="inline-flex items-center text-envGreen-600 hover:text-envGreen-700 font-medium text-sm"
          >
            Read Full Article
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );

  const LoadingCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="flex space-x-2 mb-4">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-envGreen-50 to-envGreen-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-envGreen-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ED</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">Environment Direct</span>
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link to="/green-atlas-magazine" className="text-gray-600 hover:text-envGreen-600 font-medium">
                Green Atlas Magazine
              </Link>
              <Link to="/user/login" className="text-gray-600 hover:text-envGreen-600 font-medium">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-envGreen-600 to-envGreen-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Environmental Articles & Insights
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Explore the latest research, case studies, and expert analysis on environmental 
              consulting, sustainability, and conservation in the Caribbean and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/green-atlas-magazine"
                className="px-6 py-3 bg-white text-envGreen-600 font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                Submit an Article
              </Link>
              <Link
                to="/user/login"
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                Join Our Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-envGreen-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-envGreen-500 focus:border-envGreen-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {isLoading ? 'Loading...' : `${filteredArticles.length} articles found`}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          ) : filteredArticles.length > 0 ? (
            // Articles
            filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            // No results
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {!isLoading && filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-envGreen-600 text-white font-semibold rounded-lg hover:bg-envGreen-700 transition-colors">
              Load More Articles
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-envGreen-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ED</span>
                </div>
                <span className="text-lg font-semibold">Environment Direct</span>
              </div>
              <p className="text-gray-400">
                Leading environmental consulting services in the Caribbean, 
                promoting sustainable development and conservation.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/services" className="block text-gray-400 hover:text-white transition-colors">
                  Our Services
                </Link>
                <Link to="/green-atlas-magazine" className="block text-gray-400 hover:text-white transition-colors">
                  Green Atlas Magazine
                </Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <p className="text-gray-400">
                Email: info@environmentdir.com
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Environment Direct Consulting Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticlesPage;
