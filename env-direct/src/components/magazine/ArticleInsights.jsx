import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  EyeIcon, 
  ClockIcon, 
  ShareIcon, 
  ArrowPathIcon,
  GlobeAltIcon,
  UsersIcon,
  FireIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const ArticleInsights = ({ analytics, isLoading }) => {
  const [activeMetric, setActiveMetric] = useState(null);
  const [liveData, setLiveData] = useState({});

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        activeReaders: Math.floor(Math.random() * 200) + 800,
        globalReach: Math.floor(Math.random() * 50) + 175,
        impactScore: (Math.random() * 0.2 + 8.3).toFixed(1)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const defaultAnalytics = {
    totalReads: '124.5K',
    avgReadTime: '8.5min',
    shareRate: '23%',
    returnReaders: '67%',
    ...analytics
  };

  const metrics = [
    {
      id: 'reads',
      title: 'Global Reach',
      value: defaultAnalytics.totalReads,
      trend: '+12%',
      trendDirection: 'up',
      icon: EyeIcon,
      description: 'Environmental advocates engaged',
      sparklineData: [45, 52, 48, 61, 55, 67, 71, 69, 78, 85, 92, 89],
      color: 'envGreen',
      story: 'Climate stories reaching 30% more decision-makers this quarter'
    },
    {
      id: 'time',
      title: 'Deep Engagement',
      value: defaultAnalytics.avgReadTime,
      trend: '+2.3min',
      trendDirection: 'up',
      icon: ClockIcon,
      description: 'Average analysis time',
      sparklineData: [6.2, 6.8, 7.1, 7.5, 7.8, 8.1, 8.3, 8.5, 8.2, 8.7, 8.9, 8.5],
      color: 'seaBlue',
      story: 'Readers spending 40% more time with scientific reports'
    },
    {
      id: 'share',
      title: 'Action Catalyst',
      value: defaultAnalytics.shareRate,
      trend: '+5.2%',
      trendDirection: 'up',
      icon: ShareIcon,
      description: 'Policy makers sharing insights',
      sparklineData: [18, 19, 22, 21, 24, 26, 23, 25, 27, 24, 26, 23],
      color: 'sandGold',
      story: 'Intelligence driving 23% more ministerial discussions'
    },
    {
      id: 'return',
      title: 'Trust Network',
      value: defaultAnalytics.returnReaders,
      trend: '+8.1%',
      trendDirection: 'up',
      icon: ArrowPathIcon,
      description: 'Recurring strategic readers',
      sparklineData: [59, 61, 63, 65, 62, 67, 69, 66, 68, 65, 67, 67],
      color: 'coralRed',
      story: 'Building lasting relationships with 2.3K+ global leaders'
    }
  ];

  const liveMetrics = [
    {
      label: 'Active Readers',
      value: liveData.activeReaders || 847,
      unit: 'now',
      icon: UsersIcon,
      pulse: true
    },
    {
      label: 'Global Reach',
      value: liveData.globalReach || 193,
      unit: 'nations',
      icon: GlobeAltIcon,
      pulse: false
    },
    {
      label: 'Impact Score',
      value: liveData.impactScore || '8.7',
      unit: '/10',
      icon: BoltIcon,
      pulse: true
    }
  ];

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-skyAsh-700 rounded-lg w-80 mb-12"></div>
            <div className="grid grid-cols-4 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-48 bg-skyAsh-700 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Sparkline = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <svg className="w-full h-16" viewBox="0 0 120 40">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={`text-${color}-400`} stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" className={`text-${color}-400`} stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        <path
          d={`M ${data.map((point, index) => {
            const x = (index / (data.length - 1)) * 120;
            const y = 40 - ((point - min) / range) * 30;
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')}`}
          className={`text-${color}-400`}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        
        <path
          d={`M ${data.map((point, index) => {
            const x = (index / (data.length - 1)) * 120;
            const y = 40 - ((point - min) / range) * 30;
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')} L 120 40 L 0 40 Z`}
          fill={`url(#gradient-${color})`}
        />
      </svg>
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-lavaGrey-950 to-lavaGrey-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-6 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-envGreen-400/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <ChartBarIcon className="w-8 h-8 text-envGreen-400" />
                <span className="text-envGreen-400 font-mono text-sm uppercase tracking-widest">Intelligence Analytics</span>
              </div>
              <h2 className="font-display text-5xl font-black text-white">
                Global Impact Metrics
                <span className="block text-2xl text-skyAsh-400 font-light mt-2">
                  Real-time environmental intelligence reach
                </span>
              </h2>
            </div>

            {/* Live Status Dashboard */}
            <div className="hidden lg:block">
              <div className="backdrop-blur-xl bg-lavaGrey-900/70 border border-envGreen-400/30 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FireIcon className="w-5 h-5 text-sandGold-400 animate-pulse" />
                  <span className="text-skyAsh-300 font-mono text-sm uppercase">Live Intelligence</span>
                </div>
                <div className="space-y-3">
                  {liveMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <metric.icon className={`w-4 h-4 text-skyAsh-400 ${metric.pulse ? 'animate-pulse' : ''}`} />
                        <span className="text-skyAsh-400 text-sm">{metric.label}</span>
                      </div>
                      <span className="text-white font-mono font-semibold">
                        {metric.value}<span className="text-skyAsh-500 text-xs ml-1">{metric.unit}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveMetric(metric.id)}
              onMouseLeave={() => setActiveMetric(null)}
            >
              <div className={`relative backdrop-blur-xl bg-lavaGrey-900/60 border rounded-3xl p-8 transition-all duration-500 hover:scale-105 ${
                activeMetric === metric.id 
                  ? `border-${metric.color}-400/50 shadow-glow-green` 
                  : 'border-skyAsh-600/30 hover:border-skyAsh-500/50'
              }`}>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-${metric.color}-500/20 border border-${metric.color}-400/30 flex items-center justify-center`}>
                    <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
                  </div>
                  
                  <div className={`flex items-center space-x-1 text-sm font-mono ${
                    metric.trendDirection === 'up' ? 'text-envGreen-400' : 'text-coralRed-400'
                  }`}>
                    {metric.trendDirection === 'up' ? (
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-4 h-4" />
                    )}
                    <span>{metric.trend}</span>
                  </div>
                </div>

                {/* Value */}
                <div className="mb-4">
                  <div className="font-display text-4xl font-black text-white mb-2">
                    {metric.value}
                  </div>
                  <div className="text-skyAsh-400 text-sm font-medium">
                    {metric.description}
                  </div>
                </div>

                {/* Sparkline */}
                <div className="mb-6">
                  <Sparkline data={metric.sparklineData} color={metric.color} />
                </div>

                {/* Story Context */}
                <div className={`transition-all duration-300 ${
                  activeMetric === metric.id ? 'opacity-100' : 'opacity-70'
                }`}>
                  <h4 className="font-display text-lg font-semibold text-white mb-2">
                    {metric.title}
                  </h4>
                  <p className="text-skyAsh-300 text-sm leading-relaxed">
                    {metric.story}
                  </p>
                </div>

                {/* Hover Indicator */}
                {activeMetric === metric.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-2 -right-2 w-4 h-4 bg-${metric.color}-400 rounded-full animate-ping`}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          
          {/* Key Insight */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-envGreen-900/20 border border-envGreen-400/30 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-4">
              <BoltIcon className="w-6 h-6 text-envGreen-400" />
              <span className="text-envGreen-400 font-mono text-sm uppercase tracking-wider">Strategic Insight</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Environmental Intelligence Drives 67% Policy Engagement
            </h3>
            <p className="text-skyAsh-300 leading-relaxed">
              Our data-driven environmental reporting is catalyzing unprecedented policy discussions across 
              193 nations. Climate ministers cite Green Atlas Intelligence in 4 out of 5 major decisions, 
              with engagement rates climbing 23% quarterly.
            </p>
          </div>

          {/* Performance Summary */}
          <div className="backdrop-blur-xl bg-lavaGrey-900/60 border border-skyAsh-600/30 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FireIcon className="w-6 h-6 text-sandGold-400" />
              <span className="text-sandGold-400 font-mono text-sm uppercase tracking-wider">This Quarter</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-skyAsh-400">Ministers Reached</span>
                <span className="text-white font-mono font-semibold">847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-skyAsh-400">Policy Citations</span>
                <span className="text-white font-mono font-semibold">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-skyAsh-400">Research Impact</span>
                <span className="text-envGreen-400 font-mono font-semibold">+156%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-skyAsh-400">Global Influence</span>
                <span className="text-sandGold-400 font-mono font-semibold">Tier 1</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticleInsights; 