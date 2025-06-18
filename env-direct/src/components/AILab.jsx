import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Upload, 
  Camera, 
  Mic, 
  FileImage, 
  Volume2,
  Thermometer,
  Droplets,
  TreePine,
  Fish,
  Activity,
  Target,
  Zap,
  Eye,
  Cpu,
  BarChart3,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const AILab = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const labTools = [
    {
      id: 'image',
      name: 'Image Analyzer',
      icon: Camera,
      description: 'AI-powered environmental image forensics',
      color: 'blue'
    },
    {
      id: 'audio',
      name: 'Audio Analyzer', 
      icon: Mic,
      description: 'Biodiversity species identification',
      color: 'green'
    },
    {
      id: 'soil',
      name: 'Soil Mapper',
      icon: Target,
      description: 'Soil composition and fertility analysis',
      color: 'orange'
    },
    {
      id: 'thermal',
      name: 'Thermal Analysis',
      icon: Thermometer,
      description: 'Temperature anomaly detection',
      color: 'red'
    }
  ];

  const mockAnalysisResults = {
    image: {
      confidence: 94.7,
      findings: [
        { type: 'Pollution Source', severity: 'high', description: 'Plastic debris concentration detected in marine environment' },
        { type: 'Water Quality', severity: 'medium', description: 'Turbidity levels elevated - potential sediment disturbance' },
        { type: 'Ecosystem Health', severity: 'low', description: 'Coral bleaching indicators - 12% affected area' }
      ],
      coordinates: { lat: 15.2876, lng: -61.3912 },
      recommendations: [
        'Deploy marine cleanup team within 24 hours',
        'Implement water quality monitoring sensors',
        'Alert coastal authorities of pollution event'
      ]
    },
    audio: {
      confidence: 87.3,
      findings: [
        { type: 'Species Count', severity: 'low', description: '23 unique bird species identified' },
        { type: 'Biodiversity Index', severity: 'medium', description: 'Shannon index: 2.8 (Good ecosystem health)' },
        { type: 'Threat Detection', severity: 'high', description: 'Construction noise impact detected' }
      ],
      species: ['Rufous-throated Solitaire', 'Broad-winged Hawk', 'Lesser Antillean Bullfinch'],
      recommendations: [
        'Continue monitoring for habitat disruption',
        'Evaluate noise pollution mitigation',
        'Establish protective buffer zones'
      ]
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult(mockAnalysisResults[activeTab]);
      }, 3000);
    }
  };

  const colorClasses = {
    blue: {
      bg: 'bg-blue-900/20',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    green: {
      bg: 'bg-green-900/20',
      border: 'border-green-500/30',
      text: 'text-green-400',
      button: 'bg-green-600 hover:bg-green-700'
    },
    orange: {
      bg: 'bg-orange-900/20',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      button: 'bg-orange-600 hover:bg-orange-700'
    },
    red: {
      bg: 'bg-red-900/20',
      border: 'border-red-500/30',
      text: 'text-red-400',
      button: 'bg-red-600 hover:bg-red-700'
    }
  };

  const severityColors = {
    low: 'text-green-400 bg-green-900/20',
    medium: 'text-yellow-400 bg-yellow-900/20',
    high: 'text-red-400 bg-red-900/20'
  };

  const activeTool = labTools.find(tool => tool.id === activeTab);
  const colors = colorClasses[activeTool?.color || 'blue'];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Brain className="w-10 h-10 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">ENVIRONMENTAL AI LAB</h1>
            <p className="text-purple-400 text-lg">Advanced Intelligence & Forensic Analysis</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-400">GPU Cluster: </span>
            <span className="text-cyan-400 font-mono">8x V100 Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-gray-400">Processing: </span>
            <span className="text-green-400 font-mono">Real-time</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400">Models: </span>
            <span className="text-blue-400 font-mono">47 Active</span>
          </div>
        </div>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {labTools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTab === tool.id;
          const toolColors = colorClasses[tool.color];
          
          return (
            <motion.button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`p-6 rounded-lg border transition-all ${
                isActive 
                  ? `${toolColors.bg} ${toolColors.border} ${toolColors.text}` 
                  : 'bg-slate-900 border-gray-700 text-gray-400 hover:bg-slate-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-bold mb-2">{tool.name}</h3>
              <p className="text-xs opacity-80">{tool.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Main Analysis Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className={`${colors.bg} rounded-lg border ${colors.border} p-6`}>
          <div className="flex items-center gap-3 mb-6">
            <Upload className={`w-6 h-6 ${colors.text}`} />
            <h2 className="text-xl font-bold text-white">Data Input</h2>
          </div>

          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept={activeTab === 'audio' ? 'audio/*' : 'image/*'}
              className="hidden"
            />
            
            <div className="mb-4">
              {activeTab === 'audio' ? (
                <Volume2 className="w-16 h-16 text-gray-400 mx-auto" />
              ) : (
                <FileImage className="w-16 h-16 text-gray-400 mx-auto" />
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">
              {activeTab === 'audio' ? 'Upload Audio Sample' : 'Upload Environmental Image'}
            </h3>
            <p className="text-gray-400 mb-4">
              {activeTab === 'audio' 
                ? 'Drag & drop audio files or click to browse (MP3, WAV, M4A)'
                : 'Drag & drop images or click to browse (JPG, PNG, TIFF)'
              }
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-6 py-3 ${colors.button} text-white rounded-lg font-semibold transition-colors`}
            >
              Choose File
            </button>
          </div>

          {isAnalyzing && (
            <div className="mt-6 p-4 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white font-semibold">AI Analysis in Progress...</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-cyan-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3 }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Running {activeTool?.name} neural network models...
              </p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-slate-900 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Analysis Results</h2>
          </div>

          <AnimatePresence mode="wait">
            {analysisResult ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Confidence Score */}
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Confidence Score</span>
                    <span className="text-2xl font-bold text-green-400">
                      {analysisResult.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analysisResult.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Findings */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Key Findings</h3>
                  <div className="space-y-3">
                    {analysisResult.findings.map((finding, index) => (
                      <div key={index} className="bg-slate-800 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-semibold text-white">{finding.type}</span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${severityColors[finding.severity]}`}>
                            {finding.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{finding.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Species (for audio analysis) */}
                {analysisResult.species && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Identified Species</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.species.map((species, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm border border-green-500/30"
                        >
                          {species}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">AI Recommendations</h3>
                  <div className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Generate Report
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Deploy Response
                  </button>
                  <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                    Export Data
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  Ready for Analysis
                </h3>
                <p className="text-gray-500">
                  Upload {activeTab === 'audio' ? 'audio data' : 'environmental imagery'} to begin AI-powered analysis
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AILab;