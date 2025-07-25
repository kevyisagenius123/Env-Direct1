// 🔥 ENVIRONMENT DIRECT 2.0: SEAMLESS INTEGRATION
// Drop-in replacement for existing hero section with FAANG-grade enhancements

import React from 'react';
import HeroSectionV2 from './HeroSectionV2';
import { OptimizedHeroSection } from '../utils/PerformanceOptimization';

// Enhanced hero section with performance optimizations
const EnhancedHeroSection = () => {
  return (
    <div className="hero-section-container">
      {/* Use the performance-optimized version */}
      <OptimizedHeroSection />
    </div>
  );
};

// Alternative direct implementation if performance wrapper not needed
const DirectHeroImplementation = () => {
  return <HeroSectionV2 />;
};

// Export both options for flexibility
export default EnhancedHeroSection;
export { DirectHeroImplementation };
