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
              Coming Soon — {featuredStory?.publishDate || 'October 2025'}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight"
            >
              {featuredStory?.title || 'Green Atlas Magazine'}
              <span className="block text-3xl md:text-4xl lg:text-5xl text-[#66BB6A] mt-2">
                Coming October 2025
              </span>
            </motion.h1>

            {/* Dek */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl"
            >
              {featuredStory?.excerpt || 'A bold new Caribbean-rooted platform for sustainability, innovation, and environmental action. Be part of the inaugural issue.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://forms.gle/ieEfek6hZ4CiWFpd7"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#1B5E20] hover:bg-[#388E3C] text-white font-semibold rounded-full transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Submit Your Work</span>
                <ArrowRightIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@environmentdir.com"
                className="px-8 py-4 border-2 border-white hover:bg-white hover:text-[#1B5E20] text-white font-semibold rounded-full transition-all duration-300"
              >
                Get Updates
              </a>
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

{/* PROMO ROW COMPONENT - Coming Soon Features */}
const PromoRow = ({ promoCards }) => {
  const defaultPromos = [
    {
      id: 1,
      tag: "Feature Stories",
      image: '/img/Dominic_fOREST.jpg',
      title: 'Caribbean Environmental Leadership',
      subtitle: 'Coming October 2025',
      url: '#'
    },
    {
      id: 2, 
      tag: "Research",
      image: '/img/coral.jpg',
      title: 'Cutting-Edge Environmental Science',
      subtitle: 'Submit by May 31',
      url: '#'
    },
    {
      id: 3,
      tag: "Community",
      image: '/img/Picture1.jpg', 
      title: 'Grassroots Conservation Stories',
      subtitle: 'Now Accepting Submissions',
      url: '#'
    },
    {
      id: 4,
      tag: "Technical",
      image: '/img/Picture2.jpg',
      title: 'Tools & Resources',
      subtitle: 'Contributors Welcome',
      url: '#'
    }
  ];

  const cards = promoCards || defaultPromos;

  return (
    <section className="py-12 bg-[#F1F8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-[#1E1E1E] mb-2">What to Expect</h2>
          <p className="text-[#6A6A6A]">Planned content for our inaugural issue</p>
        </div>
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
                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-semibold">{card.subtitle}</span>
                  </div>
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

// 🚀 COMING SOON CONTENT - Replace mock articles with launch messaging
const comingSoonFeatures = [
  {
    id: 1,
    title: "Caribbean Environmental Leadership",
    subtitle: "Spotlighting innovative solutions from across the region",
    category: "Feature Stories",
    description: "In-depth profiles of environmental champions driving change across the Caribbean",
    icon: GlobeAltIcon,
    status: "Coming October 2025"
  },
  {
    id: 2,
    title: "Cutting-Edge Research & Analysis",
    subtitle: "Latest findings in tropical environmental science",
    category: "Research Articles",
    description: "Peer-reviewed research and analysis from leading Caribbean environmental scientists",
    icon: BeakerIcon,
    status: "Submit by May 31"
  },
  {
    id: 3,
    title: "Community Conservation Stories",
    subtitle: "Grassroots initiatives making real impact",
    category: "Community Spotlights",
    description: "Local projects and initiatives protecting Caribbean ecosystems",
    icon: UserIcon,
    status: "Now Accepting Submissions"
  },
  {
    id: 4,
    title: "Technical Tools & Resources",
    subtitle: "GIS, monitoring, and assessment methodologies",
    category: "Technical Guides",
    description: "Practical tools and tutorials for environmental professionals",
    icon: BeakerIcon,
    status: "Contributors Welcome"
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
            src={article.image || '/img/Picture6.jpg'}
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

// COMING SOON SECTION COMPONENT (replaces CurrentIssueSection)
const ComingSoonSection = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
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
              {comingSoonFeatures.map((feature, index) => {
                const isEven = index % 2 === 0;
                const Icon = feature.icon;
                
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                  >
                    {/* Icon/Visual */}
                    <div className="lg:w-1/2">
                      <div className="aspect-[4/3] bg-gradient-to-br from-[#F1F8F3] to-[#E8F5E8] rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <Icon className="w-16 h-16 text-[#1B5E20] mx-auto mb-4" />
                          <span className="text-sm font-medium text-[#1B5E20] px-3 py-1 bg-white rounded-full">
                            {feature.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-1/2 space-y-4">
                      {/* Kicker */}
                      <div className="text-[#1B5E20] text-sm font-semibold uppercase tracking-wider">
                        {feature.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#1E1E1E] leading-tight">
                        {feature.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-lg font-medium text-[#388E3C]">
                        {feature.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-[#6A6A6A] text-lg leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Status */}
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#F1F8F3] rounded-lg">
                        <ClockIcon className="w-4 h-4 text-[#1B5E20]" />
                        <span className="text-[#1B5E20] font-medium">{feature.status}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-[#1B5E20] to-[#388E3C] rounded-xl p-8 text-white text-center"
              >
                <h3 className="text-2xl font-serif font-bold mb-4">Ready to Contribute?</h3>
                <p className="text-xl mb-6 text-white/90">
                  Join us in shaping the future of Caribbean environmental storytelling
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://forms.gle/ieEfek6hZ4CiWFpd7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-[#1B5E20] font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Submit Your Work</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://bit.ly/3GKf3fu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#1B5E20] transition-all duration-300"
                  >
                    Download Guidelines
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 mt-12 lg:mt-0" aria-label="Sidebar">
            {/* Launch Newsletter */}
            <SidebarCard title="Launch Updates" gradient>
              <p className="text-white mb-4">
                Be the first to know when Green Atlas Magazine launches
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC845] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-white text-[#1B5E20] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Get Notified
                </button>
              </form>
            </SidebarCard>

            {/* Timeline */}
            <SidebarCard title="Launch Timeline">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#FFC845] rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-[#1E1E1E]">Submissions Open</div>
                    <div className="text-sm text-[#6A6A6A]">Now through May 31, 2025</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#388E3C] rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-[#1E1E1E]">Editorial Review</div>
                    <div className="text-sm text-[#6A6A6A]">June 1-15, 2025</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#1B5E20] rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-[#1E1E1E]">Magazine Launch</div>
                    <div className="text-sm text-[#6A6A6A]">October 1, 2025</div>
                  </div>
                </div>
              </div>
            </SidebarCard>

            {/* Contribution Info */}
            <SidebarCard title="How to Contribute">
              <div className="space-y-3">
                <a 
                  href="https://forms.gle/ieEfek6hZ4CiWFpd7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#1B5E20] hover:text-[#388E3C] transition-colors"
                >
                  <DocumentTextIcon className="w-4 h-4 mr-3" />
                  <span>Submit Content</span>
                </a>
                <a 
                  href="https://bit.ly/3GKf3fu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#1B5E20] hover:text-[#388E3C] transition-colors"
                >
                  <BookOpenIcon className="w-4 h-4 mr-3" />
                  <span>Guidelines & Info Pack</span>
                </a>
                <a 
                  href="mailto:info@environmentdir.com"
                  className="flex items-center text-[#1B5E20] hover:text-[#388E3C] transition-colors"
                >
                  <UserIcon className="w-4 h-4 mr-3" />
                  <span>Contact Editorial Team</span>
                </a>
              </div>
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
        <div className="inline-flex items-center px-4 py-2 bg-[#FFC845] rounded-full mb-6">
          <ClockIcon className="w-4 h-4 mr-2 text-[#1E1E1E]" />
          <span className="text-[#1E1E1E] font-semibold text-sm">Launching October 2025</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#1E1E1E] mb-6">About Green Atlas</h2>
        <p className="text-lg text-[#6A6A6A] leading-relaxed mb-6">
          Green Atlas Magazine is Environment Direct's flagship publication, launching to spotlight 
          fearless Caribbean voices on climate, conservation, community, and creative expression. 
          Our inaugural issue, "Towards a Sustainable Future," aims to showcase the Caribbean's 
          brilliance, boldness, and resilience in environmental stewardship.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://forms.gle/ieEfek6hZ4CiWFpd7"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#1B5E20] hover:bg-[#388E3C] text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Contribute to Issue #1
          </a>
          <a
            href="mailto:info@environmentdir.com"
            className="px-6 py-3 border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-semibold rounded-lg transition-all duration-300"
          >
            Stay Updated
          </a>
        </div>
      </div>
    </div>
  </section>
);

// SUBMISSION SECTION COMPONENT (replaces Our Favourites)
const SubmissionSection = () => {
  const [email, setEmail] = useState('');
  
  const submissionTypes = [
    {
      icon: DocumentTextIcon,
      title: "Articles & Features",
      description: "Environmental research, case studies, and analytical pieces",
      requirement: "Abstract only (150-300 words) required at this stage"
    },
    {
      icon: DocumentTextIcon,
      title: "Photos, Poems & Art",
      description: "Nature-inspired creative pieces and visual storytelling",
      requirement: "High-resolution images or digital artwork"
    },
    {
      icon: BeakerIcon,
      title: "GIS & Tech",
      description: "Tools, tutorials, and technical case studies",
      requirement: "Technical documentation and visual examples"
    },
    {
      icon: UserIcon,
      title: "Community Spotlights",
      description: "Grassroots, youth, and school projects",
      requirement: "Project overview and impact documentation"
    },
    {
      icon: AcademicCapIcon,
      title: "Profiles & Interviews",
      description: "Eco-leaders and changemakers",
      requirement: "Interview proposal or completed piece"
    },
    {
      icon: BookOpenIcon,
      title: "Educational Content",
      description: "Lesson plans and student campaigns",
      requirement: "Structured educational materials"
    }
  ];

  const keyDates = [
    { date: "May 31, 2025", event: "Submission Deadline", status: "upcoming" },
    { date: "June 15, 2025", event: "Editorial Review Complete", status: "upcoming" },
    { date: "October 1, 2025", event: "Launch Day", status: "target" }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submission:', email);
    setEmail('');
  };

  return (
    <section className="py-16 bg-white">
      <SectionBar title="Submit Your Work" subtitle="Theme: Towards a Sustainable Future" />
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Submission Types */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-bold text-[#1E1E1E] mb-4">What We're Looking For</h3>
              <p className="text-[#6A6A6A] text-lg leading-relaxed mb-6">
                Our inaugural issue focuses on innovative solutions, community-driven initiatives, 
                and forward-thinking approaches to environmental challenges in the Caribbean and beyond.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {submissionTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:border-[#1B5E20] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#F1F8F3] rounded-lg flex items-center justify-center mr-3">
                        <Icon className="w-5 h-5 text-[#1B5E20]" />
                      </div>
                      <h4 className="text-lg font-semibold text-[#1E1E1E]">{type.title}</h4>
                    </div>
                    <p className="text-[#6A6A6A] mb-3">{type.description}</p>
                    <p className="text-sm text-[#1B5E20] font-medium">{type.requirement}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* How to Submit */}
            <div className="bg-[#F1F8F3] rounded-xl p-8">
              <h3 className="text-xl font-serif font-bold text-[#1E1E1E] mb-6">How to Submit</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-[#1E1E1E] mb-2">Online Form</h4>
                  <p className="text-sm text-[#6A6A6A] mb-3">Complete our submission form</p>
                  <a 
                    href="https://forms.gle/ieEfek6hZ4CiWFpd7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1B5E20] hover:text-[#388E3C] text-sm font-medium transition-colors"
                  >
                    Submit Form <ArrowRightIcon className="w-3 h-3 ml-1" />
                  </a>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-[#1E1E1E] mb-2">Email Submission</h4>
                  <p className="text-sm text-[#6A6A6A] mb-3">Send directly to our editorial team</p>
                  <a 
                    href="mailto:info@environmentdir.com?subject=Submission - GreenAtlas Issue 1"
                    className="inline-flex items-center text-[#1B5E20] hover:text-[#388E3C] text-sm font-medium transition-colors"
                  >
                    Send Email <ArrowRightIcon className="w-3 h-3 ml-1" />
                  </a>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-[#1E1E1E] mb-2">Get Guidelines</h4>
                  <p className="text-sm text-[#6A6A6A] mb-3">Download our contributor pack</p>
                  <a 
                    href="https://bit.ly/3GKf3fu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1B5E20] hover:text-[#388E3C] text-sm font-medium transition-colors"
                  >
                    Download <ArrowRightIcon className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Dates */}
            <SidebarCard title="Important Dates" gradient>
              <div className="space-y-3">
                {keyDates.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 text-[#66BB6A] mr-3" />
                      <span className="text-white text-sm">{item.event}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.status === 'target' 
                        ? 'bg-[#66BB6A] text-white'
                        : 'bg-white/20 text-white'
                    }`}>
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </SidebarCard>

            {/* Guidelines Quick Links */}
            <SidebarCard title="Quick Links">
              <div className="space-y-3">
                <a 
                  href="https://forms.gle/ieEfek6hZ4CiWFpd7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#1B5E20] hover:text-[#388E3C] transition-colors"
                >
                  <DocumentTextIcon className="w-4 h-4 mr-3" />
                  <span>Submission Form</span>
                </a>
                <a 
                  href="https://bit.ly/3GKf3fu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#1B5E20] hover:text-[#388E3C] transition-colors"
                >
                  <BookOpenIcon className="w-4 h-4 mr-3" />
                  <span>Contributor Pack</span>
                </a>
                <a 
                  href="mailto:info@environmentdir.com"
                  className="flex items-center text-[#1B5E20] hover:text-[#388E3C] transition-colors"
                >
                  <UserIcon className="w-4 h-4 mr-3" />
                  <span>Contact Editorial Team</span>
                </a>
              </div>
            </SidebarCard>

            {/* Newsletter for Contributors */}
            <SidebarCard title="Contributor Updates">
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Get notified about submission deadlines and publication updates
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC845] focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-[#1B5E20] hover:bg-[#388E3C] text-white font-semibold rounded-lg transition-colors duration-300 text-sm"
                >
                  Stay Updated
                </button>
              </form>
            </SidebarCard>
          </div>
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
  // State for launch information
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Featured launch story data
  const defaultFeaturedStory = {
    id: 1,
    title: 'Green Atlas Magazine',
    subtitle: 'A bold new Caribbean platform for environmental storytelling',
    excerpt: 'A bold new Caribbean-rooted platform for sustainability, innovation, and environmental action. Be part of the inaugural issue.',
    author: 'Environment Direct Team',
    publishDate: 'October 2025',
    readTime: 'Coming Soon',
    backgroundImage: '/img/soufriere.webp'
  };

  // Set featured story on component mount
  useEffect(() => {
    setIsLoading(false);
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
        <HeroFeature featuredStory={defaultFeaturedStory} />

        {/* Promo Row */}
        <PromoRow />

        {/* Coming Soon Section */}
        <SectionBar title="Issue #1 — October 2025" />
        <ComingSoonSection />

        {/* Magazine Blurb */}
        <MagazineBlurb />

        {/* Submission Section */}
        <SubmissionSection />
      </main>

      {/* Footer */}
      <GreenAtlasFooter />
    </div>
  );
};

export default GreenAtlasMagazinePage;
