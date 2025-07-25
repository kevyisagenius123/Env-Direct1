import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Globe, 
  BookOpen, 
  Calendar, 
  Users, 
  Zap
} from 'lucide-react';
import ProfessionalServicesSection from '../components/KeyServicesSection';
// Import commented out due to empty file
// import ConsultingBannerSection from '../components/CampaignBannerSection';

// Clean Hero Section Component
const CleanHeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-envGreen-800 to-envGreen-600 flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Environment Direct
          </h1>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            Environmental Consulting Services for Dominica
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            A platform dedicated to monitoring and protecting Dominica's natural environment 
            through data collection, analysis, and community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-white text-envGreen-800 font-semibold rounded-lg hover:bg-envGreen-50 transition-colors"
            >
              View Dashboard
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-envGreen-800 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Map Routes Section
const MapRoutesSection = () => {
  const mapRoutes = [
    {
      id: 1,
      title: "Interactive Dominica Map",
      description: "Explore Dominica's environmental features with our 3D WebGL interactive map",
      icon: <Globe className="w-8 h-8 text-envGreen-600" />,
      route: "/3d-map",
      features: ["3D WebGL Terrain", "Environmental Layers", "Real-time Data"]
    },
    {
      id: 2,
      title: "Environmental Consulting",
      description: "Professional environmental consulting services and expertise",
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      route: "/services",
      features: ["Expert Advisory", "Environmental Solutions", "Strategic Guidance"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🗺️ Interactive Map Routes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Dominica's environment through our advanced mapping technologies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mapRoutes.map((route) => (
            <Link
              key={route.id}
              to={route.route}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {route.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-envGreen-600 transition-colors">
                  {route.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {route.description}
                </p>
                <div className="space-y-2">
                  {route.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center text-sm text-gray-500">
                      <span className="w-2 h-2 bg-envGreen-400 rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center text-envGreen-600 font-semibold group-hover:text-envGreen-700">
                  Explore Map
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Magazine Preview Section
const MagazinePreviewSection = () => {
  const magazineFeatures = [
    {
      title: "Caribbean Environmental Voices",
      description: "Stories from local communities and environmental experts",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Quarterly Publications",
      description: "In-depth articles on sustainability and conservation",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "Expert Contributions",
      description: "Research and insights from leading environmentalists",
      icon: <BookOpen className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-20 bg-envGreen-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Magazine Info */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-envGreen-700 rounded-full mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Digital Publication</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Green Atlas
              <span className="block text-envGreen-300">Magazine</span>
            </h2>
            
            <p className="text-xl text-envGreen-100 mb-8 leading-relaxed">
              Discover stories of environmental innovation, conservation efforts, 
              and sustainable practices across the Caribbean region.
            </p>

            <div className="space-y-4 mb-8">
              {magazineFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-envGreen-700 rounded-lg flex items-center justify-center text-envGreen-200 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-envGreen-200 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/magazine"
                className="px-8 py-4 bg-envGreen-600 hover:bg-envGreen-500 text-white font-semibold rounded-xl transition-all duration-300 text-center"
              >
                Read Magazine
              </Link>
              <Link
                to="/articles"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 text-center"
              >
                Browse Articles
              </Link>
            </div>
          </div>

          {/* Right Column - Magazine Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-envGreen-600 rounded-lg p-6 mb-6">
                <h3 className="text-white font-bold text-xl mb-2">Green Atlas</h3>
                <p className="text-envGreen-100 text-sm">July 2025 Edition</p>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-envGreen-600 pl-4">
                  <h4 className="font-semibold text-gray-800">Featured Article</h4>
                  <p className="text-gray-600 text-sm">Climate Change Adaptation in Small Island States</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800">Conservation Focus</h4>
                  <p className="text-gray-600 text-sm">Marine Protected Areas in the Caribbean</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-gray-800">Community Spotlight</h4>
                  <p className="text-gray-600 text-sm">Sustainable Tourism in Dominica</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>📖 24 Articles</span>
                  <span>👥 12 Contributors</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
// Simple About Section
const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            About Environment Direct
          </h2>
          <div className="text-lg text-gray-600 space-y-6">
            <p>
              Environment Direct is an environmental consulting platform designed to support 
              the protection and preservation of Dominica's unique natural environment.
            </p>
            <p>
              Our platform focuses on expert advisory services, environmental consulting, community guidance, 
              and promoting sustainable practices throughout the Commonwealth of Dominica.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-envGreen-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-envGreen-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Consulting</h3>
                <p className="text-gray-600">Environmental consulting and advisory services across Dominica</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-envGreen-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-envGreen-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
                <p className="text-gray-600">Community education and environmental awareness programs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-envGreen-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-envGreen-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
                <p className="text-gray-600">Engaging local communities in environmental protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      {/* Clean Hero Section */}
      <CleanHeroSection />
      
      {/* Map Routes Section */}
      <MapRoutesSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Magazine Preview Section */}
      <MagazinePreviewSection />
      
      {/* Professional Services Grid */}
      <ProfessionalServicesSection />
      
      {/* Campaign Banner - Commented out due to missing component */}
      {/* <ConsultingBannerSection /> */}
    </>
  );
};

export default HomePage; 