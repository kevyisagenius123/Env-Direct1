import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon as SearchIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  BookOpenIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  PlayIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  CloudIcon,
  GlobeAltIcon,
  BeakerIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

// Social media icons (you may need to install react-social-icons or create custom SVGs)
const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C8.396 0 7.929.01 7.102.048 6.273.088 5.718.222 5.238.42a5.893 5.893 0 00-2.133 1.388A5.893 5.893 0 00.42 5.238C.222 5.718.087 6.273.048 7.102.01 7.929 0 8.396 0 12.017c0 3.624.01 4.09.048 4.918.039.827.174 1.382.372 1.861.204.777.478 1.34.895 1.756a5.894 5.894 0 001.8.872c.48.198 1.034.333 1.861.372.829.038 1.295.048 4.918.048 3.624 0 4.09-.01 4.918-.048.827-.039 1.382-.174 1.861-.372a5.893 5.893 0 002.133-1.388 5.893 5.893 0 001.388-2.133c.198-.48.333-1.034.372-1.861.038-.829.048-1.295.048-4.918 0-3.624-.01-4.09-.048-4.918-.039-.827-.174-1.382-.372-1.861a5.893 5.893 0 00-1.388-2.133A5.893 5.893 0 0018.982.42C18.502.222 17.947.087 17.12.048 16.291.01 15.824 0 12.017 0zm0 2.16c3.561 0 3.983.012 5.39.05.845.038 1.3.177 1.604.294.403.157.691.344.993.646.302.302.489.59.646.993.117.303.256.759.294 1.604.038 1.407.05 1.829.05 5.39s-.012 3.983-.05 5.39c-.038.845-.177 1.3-.294 1.604-.157.403-.344.691-.646.993-.302.302-.59.489-.993.646-.303.117-.759.256-1.604.294-1.407.038-1.829.05-5.39.05s-3.983-.012-5.39-.05c-.845-.038-1.3-.177-1.604-.294a2.669 2.669 0 01-.993-.646 2.669 2.669 0 01-.646-.993c-.117-.303-.256-.759-.294-1.604-.038-1.407-.05-1.829-.05-5.39s.012-3.983.05-5.39c.038-.845.177-1.3.294-1.604.157-.403.344-.691.646-.993.302-.302.59-.489.993-.646.303-.117.759-.256 1.604-.294 1.407-.038 1.829-.05 5.39-.05z"/>
    <circle cx="12.017" cy="12.017" r="3.708"/>
    <path d="m17.969 6.143c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z"/>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Define the new brand color system
const brandColors = {
  forest: '#1B5E20',
  canopy: '#2E7D32', 
  leaf: '#388E3C',
  mint: '#66BB6A',
  evergreen: '#0B3D2E',
  mossMist: '#F1F8F3',
  paper: '#FFFFFF',
  ink: '#1E1E1E',
  slate: '#6A6A6A',
  pine: '#0B6E4F',
  amber: '#FFC845'
};

// UTILITY STRIP COMPONENT
const UtilityStrip = () => (
  <div className="bg-[#0B3D2E] text-[#66BB6A] text-sm py-2 px-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <span>Field notes, wild places & conservation stories</span>
      <div className="flex space-x-3">
        <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
          <FacebookIcon className="w-4 h-4" />
        </a>
        <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
          <TwitterIcon className="w-4 h-4" />
        </a>
        <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
          <InstagramIcon className="w-4 h-4" />
        </a>
        <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
          <LinkedInIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

// STICKY HEADER COMPONENT
const StickyHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1B5E20] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GA</span>
            </div>
            <h1 className="text-xl font-serif font-bold text-[#1E1E1E]">Green Atlas</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-[#F1F8F3] transition-colors">
                <span>About</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] transition-colors">Mission</a>
                <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] transition-colors">Contributors</a>
                <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-[#F1F8F3] transition-colors">
                <span>Magazine</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] transition-colors">Current Issue</a>
                <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] transition-colors">Features</a>
                <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] transition-colors">Our Favourites</a>
              </div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-[#F1F8F3] transition-colors">
                <span>Nature Guides</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] transition-colors">Wildlife</a>
                <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] transition-colors">Trails</a>
                <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] transition-colors">Parks</a>
              </div>
            </div>
            
            <Link to="/subscribe" className="px-4 py-2 rounded-lg hover:bg-[#F1F8F3] transition-colors">
              Subscribe
            </Link>
          </nav>

          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFC845] focus:border-transparent"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 py-4 space-y-2"
            >
              <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] rounded-lg transition-colors">About</a>
              <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] rounded-lg transition-colors">Magazine</a>
              <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] rounded-lg transition-colors">Nature Guides</a>
              <a href="#" className="block px-4 py-2 hover:bg-[#F1F8F3] rounded-lg transition-colors">Subscribe</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

// HERO FEATURE COMPONENT
const HeroFeature = ({ featuredStory }) => {
  return (
    <section className="relative h-[56vw] max-h-[520px] min-h-[400px] overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src={featuredStory?.backgroundImage || '/img/soufriere.webp'}
          alt={featuredStory?.title || 'Featured Story'}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
          <div className="max-w-3xl">
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#66BB6A] text-sm font-semibold uppercase tracking-wider mb-4"
            >
              Current Issue — {featuredStory?.publishDate || 'January 2025'}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight"
            >
              {featuredStory?.title || 'Transforming Dominica\'s Tourism Sector'}
            </motion.h1>

            {/* Dek */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl"
            >
              {featuredStory?.excerpt || 'How strategic EIA processes enabled sustainable tourism development while protecting World Heritage Sites'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="px-8 py-4 bg-[#1B5E20] hover:bg-[#388E3C] text-white font-semibold rounded-full transition-colors duration-300 flex items-center justify-center space-x-2">
                <span>Read Feature</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-white hover:bg-white hover:text-[#1B5E20] text-white font-semibold rounded-full transition-all duration-300">
                See Current Issue
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Photo Credit */}
      <div className="absolute bottom-4 right-4 text-xs text-white/60">
        Photo: Environment Direct Archives
      </div>
    </section>
  );
};

// PROMO ROW COMPONENT (4 cards)
const PromoRow = ({ promoCards }) => {
  const defaultPromos = [
    {
      id: 1,
      tag: "Editor's Pick",
      image: '/img/Pictures (1).jpg',
      title: 'Marine Conservation Success',
      url: '#'
    },
    {
      id: 2, 
      tag: "Field Guide",
      image: '/img/Pictures (2).jpg',
      title: 'Caribbean Wildlife Protection',
      url: '#'
    },
    {
      id: 3,
      tag: "Support",
      image: '/img/Pictures (3).jpg', 
      title: 'Climate Resilience Planning',
      url: '#'
    },
    {
      id: 4,
      tag: "Featured",
      image: '/img/Pictures (4).jpg',
      title: 'Sustainable Tourism Development',
      url: '#'
    }
  ];

  const cards = promoCards || defaultPromos;

  return (
    <section className="py-12 bg-[#F1F8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 bg-[#1B5E20] text-white text-xs font-semibold rounded-full">
                    {card.tag}
                  </span>
                </div>

                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-[#1E1E1E] group-hover:text-[#1B5E20] transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Import services - now use real API instead of mock
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// 🏢 ENVIRONMENT DIRECT CONSULTING KNOWLEDGE BASE
const consultingArticles = [
  {
    id: 1,
    title: "Environmental Impact Assessment Excellence",
    subtitle: "Streamlining EIA processes for development projects in the Caribbean",
    category: "EIA Services",
    readTime: "12 min read",
    author: "Environment Direct Team",
    date: "2025-01-15",
    featured: true,
    tags: ["EIA", "Caribbean", "Development", "Best Practices"],
    image: "/img/Pictures (1).jpg",
    excerpt: "Master the complexities of Environmental Impact Assessment with our proven methodologies and local expertise.",
    content: "Environmental Impact Assessment in the Caribbean requires deep understanding of both regulatory frameworks and unique ecosystem dynamics..."
  },
  {
    id: 2,
    title: "Sustainable Tourism Development: Balancing Growth and Conservation",
    subtitle: "Strategic approaches to eco-tourism development in Small Island Developing States",
    category: "Sustainable Development",
    readTime: "15 min read",
    author: "Dr. Marcus Thompson",
    date: "2025-01-10",
    featured: true,
    tags: ["Tourism", "SIDS", "Conservation", "Economic Development"],
    image: "/img/Pictures (2).jpg",
    excerpt: "Explore how Caribbean nations can develop tourism while preserving their natural heritage through strategic environmental planning.",
    content: "Sustainable tourism development requires careful balance between economic opportunities and environmental protection..."
  },
  {
    id: 3,
    title: "Climate Resilience Planning for Caribbean Communities",
    subtitle: "Building adaptive capacity in the face of climate change",
    category: "Climate Adaptation",
    readTime: "10 min read",
    author: "Dr. Sophia Martinez",
    date: "2025-01-08",
    featured: true,
    tags: ["Climate Change", "Resilience", "Community Planning", "Adaptation"],
    image: "/img/Pictures (3).jpg",
    excerpt: "Comprehensive strategies for building climate-resilient communities across the Caribbean region.",
    content: "Climate resilience planning must integrate traditional knowledge with modern climate science..."
  },
  {
    id: 4,
    title: "Marine Protected Area Design and Management",
    subtitle: "Evidence-based approaches to marine conservation in tropical waters",
    category: "Marine Conservation",
    readTime: "14 min read",
    author: "Dr. Elena Rodriguez",
    date: "2025-01-05",
    featured: true,
    tags: ["Marine Protection", "Biodiversity", "Conservation Management"],
    image: "/img/Pictures (4).jpg",
    excerpt: "Learn how effective marine protected area design can restore biodiversity while supporting local communities.",
    content: "Marine protected areas represent one of the most effective tools for ocean conservation..."
  },
  {
    id: 5,
    title: "Renewable Energy Integration in Island Systems",
    subtitle: "Transitioning Caribbean islands to sustainable energy systems",
    category: "Renewable Energy",
    readTime: "13 min read",
    author: "Dr. James Chen",
    date: "2025-01-03",
    featured: false,
    tags: ["Renewable Energy", "Island Systems", "Energy Transition"],
    image: "/img/Pictures (5).jpg",
    excerpt: "Explore innovative approaches to renewable energy integration in small island developing states.",
    content: "Small island developing states face unique energy challenges that require innovative solutions..."
  },
  {
    id: 6,
    title: "Community-Based Conservation: Success Stories from Dominica",
    subtitle: "Empowering local communities through conservation partnerships",
    category: "Community Conservation",
    readTime: "11 min read",
    author: "Maria Santos",
    date: "2025-01-01",
    featured: false,
    tags: ["Community Conservation", "Dominica", "Partnerships"],
    image: "/img/Pictures (6).jpg",
    excerpt: "Discover how community-based conservation initiatives are transforming environmental protection in the Caribbean.",
    content: "Community-based conservation represents a paradigm shift in environmental protection..."
  }
];

// SECTION BAR COMPONENT
const SectionBar = ({ title, subtitle }) => (
  <div className="bg-[#1B5E20] py-4">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-white font-semibold text-lg">{title}</h2>
      {subtitle && <p className="text-[#66BB6A] text-sm mt-1">{subtitle}</p>}
    </div>
  </div>
);

// ALTERNATING ARTICLE COMPONENT
const AlternatingArticle = ({ article, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center mb-12 last:mb-0`}
    >
      {/* Image */}
      <div className="lg:w-1/2">
        <div className="aspect-[4/3] overflow-hidden rounded-xl">
          <img
            src={article.image || '/img/Pictures (1).jpg'}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="lg:w-1/2 space-y-4">
        {/* Kicker */}
        <div className="text-[#1B5E20] text-sm font-semibold uppercase tracking-wider">
          {article.category}
        </div>

        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#1E1E1E] leading-tight">
          {article.title}
        </h3>

        {/* Dek */}
        <p className="text-[#6A6A6A] text-lg leading-relaxed">
          {article.excerpt}
        </p>

        {/* Byline */}
        <div className="flex items-center space-x-4 text-sm text-[#6A6A6A]">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        {/* Read More Button */}
        <button className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1B5E20] hover:bg-[#388E3C] text-white font-semibold rounded-full transition-colors duration-300">
          <span>Read More</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// SIDEBAR CARD COMPONENT
const SidebarCard = ({ title, children, gradient = false }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
    {gradient && (
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#388E3C] p-4">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>
    )}
    {!gradient && (
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-[#1E1E1E] font-semibold text-lg">{title}</h3>
      </div>
    )}
    <div className="p-4">
      {children}
    </div>
  </div>
);

// CURRENT ISSUE SECTION COMPONENT
const CurrentIssueSection = ({ articles }) => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="lg:flex lg:gap-12">
          {/* Main Column */}
          <div className="lg:w-2/3">
            <div className="space-y-12">
              {articles.slice(0, 6).map((article, index) => (
                <AlternatingArticle key={article.id} article={article} index={index} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 mt-12 lg:mt-0" aria-label="Sidebar">
            {/* Newsletter Signup */}
            <SidebarCard title="Digital Magazine" gradient>
              <p className="text-[#6A6A6A] mb-4">
                Get the latest environmental insights delivered to your inbox
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC845] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-[#1B5E20] hover:bg-[#388E3C] text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </SidebarCard>

            {/* Membership */}
            <SidebarCard title="Become a Member">
              <p className="text-[#6A6A6A] mb-4">
                Join our community of environmental professionals and get exclusive access to research and reports
              </p>
              <button className="w-full px-4 py-3 bg-[#1B5E20] hover:bg-[#388E3C] text-white font-semibold rounded-lg transition-colors duration-300">
                Learn More
              </button>
            </SidebarCard>

            {/* Advertise */}
            <SidebarCard title="Advertise with Us">
              <p className="text-[#6A6A6A] mb-4">
                Reach environmental professionals and decision-makers across the Caribbean
              </p>
              <button className="w-full px-4 py-3 border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-semibold rounded-lg transition-all duration-300">
                Media Kit
              </button>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </section>
  );
};

// MAGAZINE BLURB COMPONENT
const MagazineBlurb = () => (
  <section className="py-16 bg-[#F1F8F3]">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-serif font-bold text-[#1E1E1E] mb-6">About Green Atlas</h2>
        <p className="text-lg text-[#6A6A6A] leading-relaxed">
          Green Atlas is Environment Direct's flagship publication, bringing together cutting-edge environmental research, 
          conservation success stories, and practical solutions for sustainable development across the Caribbean. 
          Our mission is to bridge the gap between scientific knowledge and environmental action, empowering communities 
          and decision-makers with the insights they need to protect our shared natural heritage.
        </p>
      </div>
    </div>
  </section>
);

// OUR FAVOURITES COMPONENT
const OurFavourites = ({ articles }) => {
  const favouriteArticles = articles?.slice(0, 6) || consultingArticles.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <SectionBar title="Our Favourites" />
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favouriteArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={article.image || '/img/Pictures (1).jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl font-serif font-bold text-[#1E1E1E] mb-3 group-hover:text-[#1B5E20] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-[#6A6A6A] mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <button className="text-[#1B5E20] font-semibold hover:text-[#388E3C] transition-colors flex items-center space-x-2">
                    <span>Read More</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// PROMO TRIO COMPONENT
const PromoTrio = () => {
  const promos = [
    {
      id: 1,
      image: '/img/Pictures (5).jpg',
      title: 'Media Kit',
      copy: 'Download our comprehensive media kit and advertising opportunities',
      url: '#'
    },
    {
      id: 2,
      image: '/img/Pictures (6).jpg', 
      title: 'Become an Advocate',
      copy: 'Join our network of environmental advocates and make a difference',
      url: '#'
    },
    {
      id: 3,
      image: '/img/Pictures (7).jpg',
      title: 'Advertise with GA',
      copy: 'Reach environmental professionals across the Caribbean region',
      url: '#'
    }
  ];

  return (
    <section className="py-16 bg-[#F1F8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-[#1E1E1E] mb-3 group-hover:text-[#1B5E20] transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-[#6A6A6A] mb-4">
                    {promo.copy}
                  </p>
                  <button className="text-[#1B5E20] font-semibold hover:text-[#388E3C] transition-colors flex items-center space-x-2">
                    <span>Learn More</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FOOTER COMPONENT
const GreenAtlasFooter = () => (
  <footer className="bg-[#0B3D2E] text-white py-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center space-y-4">
        <p className="text-lg font-serif">
          Environment Direct — Leading environmental solutions in the Caribbean
        </p>
        <div className="flex justify-center space-x-8 text-sm">
          <a href="#" className="hover:text-[#66BB6A] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#66BB6A] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#66BB6A] transition-colors">Contact</a>
        </div>
        <p className="text-sm text-[#66BB6A]">
          © {new Date().getFullYear()} Environment Direct Consulting Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const GreenAtlasMagazinePage = () => {
  // State for articles and featured content
  const [articles, setArticles] = useState(consultingArticles);
  const [categories, setCategories] = useState([]);
  const [featuredStory, setFeaturedStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Featured story data
  const defaultFeaturedStory = {
    id: 1,
    title: 'Transforming Dominica\'s Tourism Sector',
    subtitle: 'How strategic EIA processes enabled sustainable tourism development while protecting World Heritage Sites',
    excerpt: 'Discover how Environment Direct guided Dominica through a complex EIA process that balanced tourism development with the protection of its UNESCO World Heritage sites, resulting in a 40% increase in eco-tourism revenue.',
    author: 'Environment Direct Team',
    publishDate: 'January 2025',
    readTime: '15 min read',
    backgroundImage: '/img/soufriere.webp'
  };

  // Load articles on component mount
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        // Try to fetch from API, fall back to consulting articles
        const response = await fetch(`${API_URL}/api/articles`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          // Use consulting articles as fallback
          setArticles(consultingArticles);
        }
        setFeaturedStory(defaultFeaturedStory);
      } catch (err) {
        console.log('Using consulting articles as fallback');
        setArticles(consultingArticles);
        setFeaturedStory(defaultFeaturedStory);
        setError(null); // Don't show error for fallback
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F1F8F3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B5E20] mx-auto"></div>
          <p className="mt-4 text-[#6A6A6A]">Loading Green Atlas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F8F3]">
      {/* Skip Link for Accessibility */}
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[#FFC845] text-[#1E1E1E] px-4 py-2 z-50 rounded-br-lg"
      >
        Skip to main content
      </a>

      {/* Utility Strip */}
      <UtilityStrip />

      {/* Sticky Header */}
      <StickyHeader />

      {/* Main Content */}
      <main id="main">
        {/* Hero Feature */}
        <HeroFeature featuredStory={featuredStory} />

        {/* Promo Row */}
        <PromoRow />

        {/* Current Issue Section */}
        <SectionBar title="Current Issue — January 2025" />
        <CurrentIssueSection articles={articles} />

        {/* Magazine Blurb */}
        <MagazineBlurb />

        {/* Our Favourites */}
        <OurFavourites articles={articles} />

        {/* Promo Trio */}
        <PromoTrio />
      </main>

      {/* Footer */}
      <GreenAtlasFooter />
    </div>
  );
};

export default GreenAtlasMagazinePage;
