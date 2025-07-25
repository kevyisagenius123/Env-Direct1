// ⚡ AI-POWERED CLIMATE SOLUTIONS HUB - Machine Learning Environmental Innovation
// FAANG-grade ML/AI solutions platform for climate tech and environmental innovation

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import ReactECharts from 'echarts-for-react';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Lightbulb, 
  TrendingUp, 
  Database,
  Network,
  Bot,
  Rocket,
  Target,
  Eye,
  Layers,
  GitBranch,
  BarChart3,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Download,
  Share2
} from 'lucide-react';

// 🧠 ML MODEL CARD COMPONENT
const MLModelCard = ({ model, isActive, onClick }) => {
  const getModelStatusColor = (status) => {
    switch (status) {
      case 'production': return 'bg-green-500';
      case 'testing': return 'bg-yellow-500';
      case 'training': return 'bg-blue-500';
      case 'research': return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 0.95) return 'text-green-400';
    if (accuracy >= 0.85) return 'text-yellow-400';
    if (accuracy >= 0.75) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(model)}
      className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 ${
        isActive 
          ? 'border-envGreen-500 bg-envGreen-500/10 shadow-envGreen-500/20 shadow-lg' 
          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getModelStatusColor(model.status)} animate-pulse`} />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
            {model.type}
          </span>
        </div>
        
        <div className={`px-2 py-1 rounded text-xs font-mono ${getAccuracyColor(model.accuracy)}`}>
          {(model.accuracy * 100).toFixed(1)}%
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2">{model.name}</h3>
      <p className="text-slate-300 text-sm mb-4 line-clamp-2">{model.description}</p>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-slate-400">Training Data:</span>
          <div className="text-white font-mono">{model.trainingSize}</div>
        </div>
        <div>
          <span className="text-slate-400">Inference:</span>
          <div className="text-white font-mono">{model.inferenceTime}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex flex-wrap gap-2">
          {model.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
              {tag}
            </span>
          ))}
          {model.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-slate-400">
              +{model.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// 📊 AI INSIGHTS DASHBOARD
const AIInsightsDashboard = ({ activeModel, insights }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-envGreen-400" />
          AI Insights: {activeModel?.name}
        </h3>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-envGreen-600 rounded-lg text-white hover:bg-envGreen-700 transition-colors"
          >
            <Download className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-slate-600 rounded-lg text-white hover:bg-slate-500 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {activeModel ? (
        <div className="space-y-6">
          {/* Model Performance */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {(activeModel.accuracy * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-slate-400">Accuracy</div>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {activeModel.inferenceTime}
              </div>
              <div className="text-xs text-slate-400">Inference Time</div>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {activeModel.carbonFootprint}
              </div>
              <div className="text-xs text-slate-400">Carbon Footprint</div>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {activeModel.deployments}
              </div>
              <div className="text-xs text-slate-400">Deployments</div>
            </div>
          </div>

          {/* Live Predictions */}
          <div>
            <h4 className="text-white font-semibold mb-3">Recent Predictions</h4>
            <div className="space-y-3">
              {insights.predictions.map((prediction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-700/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{prediction.title}</span>
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      prediction.confidence >= 0.9 ? 'bg-green-500/20 text-green-300' :
                      prediction.confidence >= 0.7 ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {(prediction.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{prediction.description}</p>
                  <div className="text-xs text-slate-400">
                    Generated {prediction.timestamp}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Bot className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">Select a model to view AI insights</p>
        </div>
      )}
    </div>
  );
};

// 🚀 SOLUTION SHOWCASE
const SolutionShowcase = ({ solutions }) => {
  const [activeSolution, setActiveSolution] = useState(0);

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Rocket className="w-5 h-5 text-envGreen-400" />
        Featured Climate Solutions
      </h3>

      <div className="flex gap-4 mb-6">
        {solutions.map((solution, index) => (
          <button
            key={index}
            onClick={() => setActiveSolution(index)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeSolution === index
                ? 'bg-envGreen-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {solution.category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSolution}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {solutions[activeSolution] && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-envGreen-600/20 rounded-lg">
                  {React.createElement(solutions[activeSolution].icon, { className: "w-8 h-8 text-envGreen-400" })}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {solutions[activeSolution].title}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {solutions[activeSolution].description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-envGreen-400 mb-1">
                    {solutions[activeSolution].impact}
                  </div>
                  <div className="text-xs text-slate-400">CO₂ Reduction</div>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {solutions[activeSolution].efficiency}
                  </div>
                  <div className="text-xs text-slate-400">Efficiency Gain</div>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {solutions[activeSolution].cost}
                  </div>
                  <div className="text-xs text-slate-400">Cost Savings</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex gap-2">
                  {solutions[activeSolution].tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-700 rounded text-sm text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-envGreen-600 rounded-lg text-white hover:bg-envGreen-700 transition-colors"
                >
                  Learn More
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// 🔬 RESEARCH PIPELINE
const ResearchPipeline = ({ research }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-envGreen-400" />
        Research Pipeline
      </h3>

      <div className="space-y-4">
        {research.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-slate-700/30 rounded-lg"
          >
            <div className="flex items-start gap-4">
              <div className={`w-4 h-4 rounded-full mt-1 ${
                project.stage === 'complete' ? 'bg-green-500' :
                project.stage === 'active' ? 'bg-blue-500 animate-pulse' :
                project.stage === 'planning' ? 'bg-yellow-500' :
                'bg-slate-500'
              }`} />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{project.title}</h4>
                  <span className="text-xs text-slate-400 font-mono">
                    {project.completion}% complete
                  </span>
                </div>
                
                <p className="text-slate-300 text-sm mb-3">{project.description}</p>
                
                <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      project.stage === 'complete' ? 'bg-green-500' :
                      project.stage === 'active' ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${project.completion}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex gap-3">
                    <span className="text-slate-400">
                      Team: <span className="text-white">{project.team}</span>
                    </span>
                    <span className="text-slate-400">
                      Timeline: <span className="text-white">{project.timeline}</span>
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded font-mono ${
                    project.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                    project.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {project.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 🚀 MAIN AI CLIMATE SOLUTIONS COMPONENT
const AISolutionsHub = () => {
  const [activeModel, setActiveModel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock ML Models Data
  const mlModels = useMemo(() => [
    {
      id: 'carbon-predictor',
      name: 'Carbon Emission Predictor',
      type: 'REGRESSION',
      description: 'Predicts carbon emissions from industrial processes using real-time sensor data and historical patterns.',
      accuracy: 0.94,
      status: 'production',
      trainingSize: '2.3M samples',
      inferenceTime: '12ms',
      carbonFootprint: '0.2kg CO₂',
      deployments: 47,
      tags: ['carbon', 'industry', 'real-time', 'sensors']
    },
    {
      id: 'deforestation-detector',
      name: 'Deforestation Detection',
      type: 'COMPUTER VISION',
      description: 'Satellite image analysis for real-time deforestation monitoring using advanced CNN architectures.',
      accuracy: 0.97,
      status: 'production',
      trainingSize: '50K images',
      inferenceTime: '850ms',
      carbonFootprint: '1.4kg CO₂',
      deployments: 23,
      tags: ['satellite', 'forest', 'cnn', 'monitoring']
    },
    {
      id: 'renewable-optimizer',
      name: 'Renewable Energy Optimizer',
      type: 'REINFORCEMENT',
      description: 'Optimizes renewable energy grid distribution using deep Q-learning and weather prediction models.',
      accuracy: 0.89,
      status: 'testing',
      trainingSize: '1.8M episodes',
      inferenceTime: '45ms',
      carbonFootprint: '0.8kg CO₂',
      deployments: 12,
      tags: ['energy', 'grid', 'optimization', 'weather']
    },
    {
      id: 'climate-forecaster',
      name: 'Climate Impact Forecaster',
      type: 'TIME SERIES',
      description: 'Long-term climate impact forecasting using transformer architectures and multi-modal data fusion.',
      accuracy: 0.86,
      status: 'research',
      trainingSize: '100M points',
      inferenceTime: '1.2s',
      carbonFootprint: '5.2kg CO₂',
      deployments: 3,
      tags: ['forecast', 'climate', 'transformer', 'multimodal']
    },
    {
      id: 'biodiversity-tracker',
      name: 'Biodiversity Loss Tracker',
      type: 'MULTIMODAL',
      description: 'Combines acoustic, visual, and environmental data to track biodiversity changes in real-time.',
      accuracy: 0.91,
      status: 'training',
      trainingSize: '500K samples',
      inferenceTime: '200ms',
      carbonFootprint: '2.1kg CO₂',
      deployments: 8,
      tags: ['biodiversity', 'acoustic', 'multimodal', 'ecosystem']
    }
  ], []);

  // Mock AI Insights Data
  const aiInsights = useMemo(() => ({
    predictions: [
      {
        title: 'Emission Spike Alert',
        description: 'Industrial facility #247 showing 23% increase in carbon output',
        confidence: 0.94,
        timestamp: '2 minutes ago'
      },
      {
        title: 'Deforestation Risk',
        description: 'High probability of illegal logging in Amazon sector 7B-4',
        confidence: 0.87,
        timestamp: '15 minutes ago'
      },
      {
        title: 'Energy Optimization',
        description: 'Recommended 18% increase in solar distribution for Grid-NW',
        confidence: 0.92,
        timestamp: '1 hour ago'
      }
    ]
  }), []);

  // Climate Solutions Data
  const climateSolutions = useMemo(() => [
    {
      category: 'Energy',
      title: 'Smart Grid AI Controller',
      description: 'Advanced neural networks that optimize renewable energy distribution in real-time, reducing waste by up to 40%.',
      icon: Zap,
      impact: '2.3M tons',
      efficiency: '+40%',
      cost: '$8.2M saved',
      tags: ['Grid AI', 'Real-time', 'Neural Networks']
    },
    {
      category: 'Carbon',
      title: 'Carbon Capture Optimizer',
      description: 'ML-driven carbon capture systems that automatically adjust based on atmospheric conditions and industrial output.',
      icon: Database,
      impact: '5.7M tons',
      efficiency: '+65%',
      cost: '$15M saved',
      tags: ['Carbon Capture', 'Industrial AI', 'Atmospheric']
    },
    {
      category: 'Forest',
      title: 'Reforestation Planner',
      description: 'AI-powered ecosystem modeling for optimal reforestation strategies based on climate, soil, and biodiversity data.',
      icon: Target,
      impact: '890K tons',
      efficiency: '+75%',
      cost: '$4.1M saved',
      tags: ['Ecosystem AI', 'Biodiversity', 'Climate Modeling']
    }
  ], []);

  // Research Pipeline Data
  const researchPipeline = useMemo(() => [
    {
      id: 'quantum-carbon',
      title: 'Quantum Carbon Modeling',
      description: 'Developing quantum computing algorithms for molecular-level carbon capture optimization.',
      stage: 'active',
      completion: 68,
      team: 'Quantum AI Lab',
      timeline: '18 months',
      priority: 'high'
    },
    {
      id: 'ocean-ai',
      title: 'Ocean Acidification AI',
      description: 'Marine ecosystem health monitoring using autonomous underwater AI agents.',
      stage: 'planning',
      completion: 23,
      team: 'Marine AI Division',
      timeline: '24 months',
      priority: 'medium'
    },
    {
      id: 'climate-gpt',
      title: 'ClimateGPT Foundation Model',
      description: 'Large language model specialized for climate science research and policy recommendations.',
      stage: 'active',
      completion: 45,
      team: 'Foundation Models',
      timeline: '12 months',
      priority: 'high'
    },
    {
      id: 'atmospheric-ai',
      title: 'Atmospheric Chemistry AI',
      description: 'Deep learning models for predicting atmospheric chemical reactions and pollution patterns.',
      stage: 'complete',
      completion: 100,
      team: 'Atmospheric Science',
      timeline: 'Completed',
      priority: 'low'
    }
  ], []);

  const filteredModels = useMemo(() => {
    return mlModels.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterCategory === 'all' || model.type.toLowerCase() === filterCategory.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [mlModels, searchQuery, filterCategory]);

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-envGreen-600 to-blue-600 rounded-xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4">
            AI-Powered Climate Solutions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Cutting-edge machine learning models and AI solutions driving the fight against climate change
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search AI models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-envGreen-500"
              />
              <Sparkles className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-envGreen-500"
            >
              <option value="all">All Types</option>
              <option value="regression">Regression</option>
              <option value="computer vision">Computer Vision</option>
              <option value="reinforcement">Reinforcement Learning</option>
              <option value="time series">Time Series</option>
              <option value="multimodal">Multimodal</option>
            </select>
          </div>
        </motion.div>

        {/* ML Models Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {filteredModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MLModelCard
                model={model}
                isActive={activeModel?.id === model.id}
                onClick={setActiveModel}
              />
            </motion.div>
          ))}
        </div>

        {/* AI Insights Dashboard */}
        <div className="mb-12">
          <AIInsightsDashboard activeModel={activeModel} insights={aiInsights} />
        </div>

        {/* Solutions and Research */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <SolutionShowcase solutions={climateSolutions} />
          <ResearchPipeline research={researchPipeline} />
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-envGreen-600/20 to-blue-600/20 rounded-xl p-8 border border-envGreen-500/30"
        >
          <Rocket className="w-16 h-16 text-envGreen-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">
            Join the AI Climate Revolution
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Contribute to our open-source climate AI models, collaborate with researchers worldwide, 
            and help deploy solutions that can scale globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-envGreen-600 rounded-lg text-white font-semibold hover:bg-envGreen-700 transition-colors flex items-center gap-2 justify-center"
            >
              Access API Documentation
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-slate-700 rounded-lg text-white font-semibold hover:bg-slate-600 transition-colors flex items-center gap-2 justify-center"
            >
              View Research Papers
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AISolutionsHub;
