import React from 'react';
import HeroSection from '../components/HeroSection';
import ProfessionalServicesSection from '../components/KeyServicesSection';
import IntelligenceBriefings from '../components/EnvironmentalDigestGrid';
import CampaignBannerSection from '../components/CampaignBannerSection';
import RegionRankingSection from '../components/RegionRankingSection';
import PredictionsSection from '../components/PredictionsSection';
import TestimonialsSection from '../components/TestimonialsSection';

const HomePage = () => {
  return (
    <>
      {/* Professional Hero Section */}
      <HeroSection />
      
      {/* Professional Services Grid */}
      <ProfessionalServicesSection />
      
      {/* Intelligence Briefings */}
      <IntelligenceBriefings />
      
      {/* Enhanced existing sections */}
      <CampaignBannerSection />
      <RegionRankingSection />
      <PredictionsSection />
      <TestimonialsSection />
    </>
  );
};

export default HomePage; 