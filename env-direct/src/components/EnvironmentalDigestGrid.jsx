import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IntelligenceBriefings = () => {
  const [activeTab, setActiveTab] = useState('briefings');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const briefings = [
    {
      id: 1,
      priority: 'HIGH',
      title: 'FOREST COVERAGE ANALYSIS: NORTHERN REGION',
      summary: 'Satellite imagery indicates 2.3% forest coverage reduction in northern parishes over past 30 days. Deforestation patterns suggest logging activity near protected boundaries.',
      timestamp: '14:30 UTC',
      status: 'Active Monitoring',
      source: 'Satellite Intelligence',
      color: 'red'
    },
    {
      id: 2,
      priority: 'MEDIUM',
      title: 'WATER QUALITY INDEX: ROSEAU RIVER SYSTEM',
      summary: 'Water quality sensors report improved clarity levels following recent rainfall. pH levels within normal range. Recommended for continued municipal use.',
      timestamp: '12:15 UTC',
      status: 'Resolved',
      source: 'Sensor Network',
      color: 'yellow'
    },
    {
      id: 3,
      priority: 'LOW',
      title: 'COASTAL EROSION MONITORING: PORTSMOUTH BAY',
      summary: 'Monthly coastal survey shows stable shoreline conditions. No significant erosion patterns detected. Sea level measurements within expected ranges.',
      timestamp: '09:45 UTC',
      status: 'Routine',
      source: 'Field Assessment',
      color: 'green'
    },
    {
      id: 4,
      priority: 'MEDIUM',
      title: 'AIR QUALITY ASSESSMENT: ROSEAU URBAN AREA',
      summary: 'Particulate matter levels elevated due to dust from construction activities. Temporary increase expected to normalize within 48 hours.',
      timestamp: '08:20 UTC',
      status: 'Monitoring',
      source: 'Air Quality Network',
      color: 'yellow'
    }
  ];

  const parishData = [
    { name: 'Saint George', score: 87.2, change: '+2.1', trend: 'up' },
    { name: 'Saint Andrew', score: 84.6, change: '+0.8', trend: 'up' },
    { name: 'Saint David', score: 82.3, change: '-1.2', trend: 'down' },
    { name: 'Saint John', score: 79.8, change: '+1.5', trend: 'up' },
    { name: 'Saint Joseph', score: 78.4, change: '+0.3', trend: 'up' },
    { name: 'Saint Luke', score: 76.9, change: '-0.7', trend: 'down' },
    { name: 'Saint Mark', score: 75.1, change: '+2.3', trend: 'up' },
    { name: 'Saint Patrick', score: 73.8, change: '-1.8', trend: 'down' },
    { name: 'Saint Paul', score: 72.5, change: '+0.9', trend: 'up' },
    { name: 'Saint Peter', score: 71.2, change: '+1.1', trend: 'up' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'text-coralRed-700 dark:text-coralRed-200 bg-coralRed-50 dark:bg-coralRed-950 border-coralRed-200 dark:border-coralRed-800';
      case 'MEDIUM': return 'text-sandGold-700 dark:text-sandGold-200 bg-sandGold-50 dark:bg-sandGold-950 border-sandGold-200 dark:border-sandGold-800';
      case 'LOW': return 'text-envGreen-700 dark:text-envGreen-200 bg-envGreen-50 dark:bg-envGreen-950 border-envGreen-200 dark:border-envGreen-800';
      default: return 'text-lavaGrey-700 dark:text-skyAsh-200 bg-skyAsh-50 dark:bg-lavaGrey-950 border-skyAsh-200 dark:border-lavaGrey-800';
    }
  };

  return (
    <section className="py-20 bg-envGreen-700 dark:bg-envGreen-800">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 dark:bg-white/5 rounded-full border border-white/20 dark:border-white/10 mb-4">
            <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />
            <span className="text-white text-sm font-medium tracking-wide uppercase">
              Intelligence Briefings
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Environmental Intelligence Overview
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Real-time environmental monitoring briefings and parish resilience assessments. 
            Updated continuously by our sensor network and satellite intelligence systems.
          </p>
          
          {/* Last Updated */}
          <div className="mt-6 text-sm text-white/70">
            Last Updated: {currentTime.toLocaleString()} UTC | All Systems Operational
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 dark:bg-white/5 rounded-lg p-1 inline-flex border border-white/20 dark:border-white/10">
            <button
              onClick={() => setActiveTab('briefings')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                activeTab === 'briefings'
                  ? 'bg-white text-envGreen-700 dark:text-envGreen-800 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Intelligence Briefings
            </button>
            <button
              onClick={() => setActiveTab('parishes')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                activeTab === 'parishes'
                  ? 'bg-white text-envGreen-700 dark:text-envGreen-800 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Parish Rankings
            </button>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'briefings' ? (
            <div className="space-y-6">
              {briefings.map((briefing, index) => (
                <motion.div
                  key={briefing.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-6 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getPriorityColor(briefing.priority)}`}>
                        {briefing.priority}
                      </span>
                      <span className="text-sm text-white/70">{briefing.timestamp}</span>
                      <span className="text-sm text-white/70">•</span>
                      <span className="text-sm text-white/70">{briefing.source}</span>
                    </div>
                    <div className="text-sm font-medium text-envGreen-200 dark:text-envGreen-100">{briefing.status}</div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 font-serif">
                    {briefing.title}
                  </h3>
                  
                  <p className="text-white/90 leading-relaxed">
                    {briefing.summary}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
              <div className="bg-white/5 dark:bg-white/10 px-6 py-4 border-b border-white/20 dark:border-white/10">
                <h3 className="text-lg font-bold text-white">Environmental Resilience Rankings</h3>
                <p className="text-sm text-white/80 mt-1">
                  Parish-level environmental health scores based on air quality, water systems, forest coverage, and climate resilience indicators.
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid gap-4">
                  {parishData.map((parish, index) => (
                    <motion.div
                      key={parish.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-4 bg-white/5 dark:bg-white/10 rounded-lg hover:bg-white/10 dark:hover:bg-white/15 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-white/20 dark:bg-white/30 text-white rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{parish.name}</div>
                          <div className="text-sm text-white/70">Environmental Health Score</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{parish.score}</div>
                        <div className={`text-sm font-medium flex items-center ${
                          parish.trend === 'up' 
                            ? 'text-envGreen-200 dark:text-envGreen-100' 
                            : 'text-coralRed-200 dark:text-coralRed-100'
                        }`}>
                          {parish.trend === 'up' ? '↗' : '↘'} {parish.change}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Footer Note */}
              <div className="bg-white/5 dark:bg-white/10 px-6 py-4 border-t border-white/20 dark:border-white/10">
                <p className="text-xs text-white/70 text-center">
                  Rankings updated daily. Scores calculated using UN Environmental Performance Index methodology with Caribbean-specific adaptations. 
                  Data validated through multi-source verification including satellite imagery, sensor networks, and field assessments.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default IntelligenceBriefings; 