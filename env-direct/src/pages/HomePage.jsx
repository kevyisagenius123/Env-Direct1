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
import ProjectGallery from '../components/ProjectGallery';
import UnderConstructionPage from './UnderConstructionPage';

// Under Construction Banner Component
const UnderConstructionBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-envGreen-50 to-envGreen-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-envGreen-600 rounded-full mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Projects in Action
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We're currently building an exciting showcase of our environmental projects and case studies.
          </p>
          
          <div className="bg-envGreen-100 border border-envGreen-200 rounded-lg p-4 mb-6">
            <p className="text-envGreen-800 font-medium">
              Coming Soon: Interactive project gallery with detailed case studies and impact metrics
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 bg-envGreen-600 text-white font-medium rounded-lg hover:bg-envGreen-700 transition-colors"
            >
              Discuss Your Project
            </Link>
            <Link
              to="/services"
              className="px-6 py-3 border border-envGreen-600 text-envGreen-600 font-medium rounded-lg hover:bg-envGreen-50 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Clean Hero Section Component
const CleanHeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-envGreen-800 to-envGreen-600 flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/img/Dominic_fOREST.jpg" 
          alt="Dominica Rainforest" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Welcome to Environment Direct Consulting Inc.
          </h1>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            Caribbean Environmental & Geospatial Solutions
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-3xl mx-auto">
            We are a Caribbean-rooted environmental and geospatial consultancy dedicated to 
            helping communities, governments, NGOs, and development partners address today's 
            environmental challenges with insight and innovation. Based in Dominica, we 
            specialize in climate resilience, environmental impact assessments, GIS solutions, 
            stakeholder engagement, and capacity-building initiatives. We believe in putting 
            people and data at the center of sustainable development, and we're here to guide the way.
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
      features: ["3D WebGL Terrain", "Environmental Layers", "Real-time Data"],
      image: "/img/4fdf2169-2594-4993-8278-156e6f5764a2.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Interactive Map Routes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Dominica's environment through our advanced mapping technologies
          </p>
        </div>

        <div className="flex justify-center max-w-6xl mx-auto">
          {mapRoutes.map((route) => (
            <Link
              key={route.id}
              to={route.route}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 max-w-md w-full"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={route.image} 
                  alt={route.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 bg-white/90 rounded-xl">
                  {route.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 text-center">
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
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="/img/soufriere.webp" 
          alt="Soufriere, Dominica" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            GreenAtlas Magazine
          </h2>
          <p className="text-xl text-envGreen-100 max-w-4xl mx-auto">
            GreenAtlas is Environment Direct's quarterly digital publication spotlighting 
            environmental stories, innovation, and action from across the Caribbean. Rooted in 
            our commitment to education, awareness, and advocacy, GreenAtlas features original 
            articles, expert interviews, visual storytelling, and youth voices that explore 
            the intersection of climate, conservation, culture, and community. It's where 
            science meets storytelling, amplifying Caribbean perspectives and solutions for 
            a sustainable future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Features */}
          <div className="space-y-8">
            <div className="grid gap-6">
              {magazineFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 bg-envGreen-800/50 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-envGreen-600 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-envGreen-100">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6">
              <Link
                to="/green-atlas-magazine"
                className="inline-flex items-center px-8 py-4 bg-white text-envGreen-800 font-semibold rounded-lg hover:bg-envGreen-50 transition-colors"
              >
                Coming Soon
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column - Magazine Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Magazine Cover Image */}
              <div className="relative h-48">
                <img 
                  src="/img/c22b6a25-ba03-4c50-8bbe-1af7c1ca7cce.jpg" 
                  alt="GreenAtlas Magazine Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-envGreen-800/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-2">Green Atlas</h3>
                  <p className="text-envGreen-100 text-sm">August 2025 Edition</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
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
              
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>12 Articles</span>
                    <span>8 Contributors</span>
                  </div>
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

// About Section with comprehensive company information
const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              About Environment Direct Consulting Inc.
            </h2>
          </div>
          
          {/* Who We Are */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-envGreen-800 mb-6">Who We Are</h3>
            <div className="text-lg text-gray-600 space-y-4">
              <p>
                Environment Direct Consulting Inc. is an environmental and geospatial consulting 
                company based in the Commonwealth of Dominica and serving the wider Caribbean 
                region. With deep roots in the region and a strong commitment to sustainable 
                development, our team brings over 20 years of expertise in environmental science, 
                Geographic Information Systems (GIS), project management, stakeholder engagement, 
                Disaster Risk management, and technical training.
              </p>
              <p>
                We specialize in delivering practical, innovative, and community-informed solutions 
                that strengthen climate resilience, improve planning outcomes, and promote 
                environmental justice across Small Island Developing States.
              </p>
            </div>
          </div>

          {/* Our Approach */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-envGreen-800 mb-6">Our Approach</h3>
            <p className="text-lg text-gray-600">
              We operate at the intersection of science, policy, and community action, bridging 
              local knowledge and global best practices. Whether it's conducting an environmental 
              impact assessment, designing a GIS dashboard, or facilitating a reforestation 
              program, our work is driven by integrity, inclusiveness, and a passion for 
              environmental stewardship.
            </p>
          </div>

          {/* Mission and Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-envGreen-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-envGreen-800 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700">
                To empower Caribbean communities and institutions to make informed, sustainable, 
                and climate-smart decisions through tailored environmental and geospatial solutions.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-700">
                A thriving Caribbean region where people and ecosystems are resilient, empowered, 
                and supported by strong data, inclusive planning, and environmental leadership.
              </p>
            </div>
          </div>

          {/* Core Services Icons */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-envGreen-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-envGreen-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Environmental Consulting</h3>
              <p className="text-gray-600">Comprehensive environmental assessments and sustainable development solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-envGreen-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-envGreen-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3l6-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">GIS & Spatial Analysis</h3>
              <p className="text-gray-600">Advanced geospatial solutions and data-driven decision support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-envGreen-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-envGreen-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Training & Capacity Building</h3>
              <p className="text-gray-600">Building expertise through education and professional development</p>
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
      
      {/* Services Section */}
      <ProfessionalServicesSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Under Construction Banner */}
      <UnderConstructionBanner />
      
      {/* Magazine Preview Section */}
      <MagazinePreviewSection />
    </>
  );
};

export default HomePage;