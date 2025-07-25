import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  BarChart3, 
  Globe,
  Activity,
  Shield,
  AlertTriangle,
  Wrench
} from 'lucide-react';
import {
  AIClimatePredictionEngine,
  CarbonFootprintTracker,
  EnterpriseReportingSystem
} from '../components/FANGFeatures';

// 🔥 ENVIRONMENT DIRECT 2.0: ENTERPRISE FEATURES SHOWCASE
// Demonstrate FAANG-grade capabilities to clients and stakeholders

const EnterpriseFeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState('ai-prediction');

  const features = {
    'ai-prediction': {
      title: 'AI Climate Prediction Engine',
      description: 'Advanced machine learning environmental forecasting',
      icon: Brain,
      component: AIClimatePredictionEngine,
      color: 'from-purple-600 to-blue-500'
    },
    'carbon-tracking': {
      title: 'Real-Time Carbon Footprint Tracker',
      description: 'Live monitoring of carbon emissions and reduction progress',
      icon: Target,
      component: CarbonFootprintTracker,
      color: 'from-green-600 to-emerald-500'
    },
    'enterprise-reports': {
      title: 'Enterprise Reporting System',
      description: 'AI-powered environmental reports for all stakeholders',
      icon: BarChart3,
      component: EnterpriseReportingSystem,
      color: 'from-blue-600 to-cyan-500'
    }
  };

  const FeatureTab = ({ featureKey, feature, isActive, onClick }) => (
    <motion.button
      onClick={() => onClick(featureKey)}
      className={`
        flex items-center gap-4 p-6 rounded-xl border-2 transition-all duration-300 text-left w-full
        ${isActive 
          ? 'border-white/30 bg-white/10 backdrop-blur-sm' 
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
        <feature.icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-white text-lg font-semibold">{feature.title}</h3>
        <p className="text-white/70 text-sm">{feature.description}</p>
      </div>
    </motion.button>
  );

  const ActiveComponent = features[activeFeature].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      {/* Under Construction Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Wrench className="w-6 h-6" />
            </motion.div>
            <div className="text-center">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Enterprise Features Under Construction
              </h2>
              <p className="text-amber-100 text-sm">
                These advanced features are currently being enhanced. Contact us for enterprise access.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Globe className="w-10 h-10 text-emerald-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Enterprise Features</h1>
              <p className="text-slate-400">FAANG-grade environmental intelligence capabilities</p>
            </div>
          </div>
          
          {/* Feature Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(features).map(([key, feature]) => (
              <FeatureTab
                key={key}
                featureKey={key}
                feature={feature}
                isActive={activeFeature === key}
                onClick={setActiveFeature}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Active Feature Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ActiveComponent />
        </motion.div>
      </div>

      {/* Enterprise Credentials Footer */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-emerald-400" />
              <span className="text-white text-lg font-semibold">Enterprise Grade Security & Compliance</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400 text-sm">
              <div>• ISO 27001 Certified</div>
              <div>• SOC 2 Type II Compliant</div>
              <div>• GDPR Compliant</div>
              <div>• 99.9% Uptime SLA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseFeaturesPage;
