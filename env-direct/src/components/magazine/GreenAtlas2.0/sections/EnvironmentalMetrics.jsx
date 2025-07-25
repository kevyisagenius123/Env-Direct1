// 📈 ENVIRONMENTAL METRICS DASHBOARD - Live Climate Data Monitoring
// Enterprise-grade environmental data visualization and analytics

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import {
  Thermometer,
  Wind,
  Droplets,
  Trees,
  Globe,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin
} from 'lucide-react';

// 🌡️ METRIC TILE COMPONENT
const MetricTile = ({ 
  icon: Icon, 
  title, 
  value, 
  unit, 
  change, 
  changePercent, 
  status, 
  target, 
  description 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'warning': return 'border-orange-500 bg-orange-500/10';
      case 'good': return 'border-green-500 bg-green-500/10';
      default: return 'border-slate-500 bg-slate-500/10';
    }
  };
  
  const getChangeColor = (change) => {
    if (change > 0) return 'text-red-400';
    if (change < 0) return 'text-green-400';
    return 'text-slate-400';
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl border ${getStatusColor(status)} backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${
          status === 'critical' ? 'text-red-400' :
          status === 'warning' ? 'text-orange-400' :
          status === 'good' ? 'text-green-400' : 'text-slate-400'
        }`} />
        
        <div className="flex items-center gap-1">
          {change !== undefined && (
            <>
              {change > 0 ? (
                <TrendingUp className="w-4 h-4 text-red-400" />
              ) : change < 0 ? (
                <TrendingDown className="w-4 h-4 text-green-400" />
              ) : null}
              <span className={`text-sm font-mono ${getChangeColor(change)}`}>
                {change > 0 ? '+' : ''}{changePercent}%
              </span>
            </>
          )}
        </div>
      </div>
      
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-slate-400">{unit}</span>
      </div>
      
      {target && (
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400">Target: {target}</span>
            <span className="text-slate-400">
              {((value / target) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                status === 'good' ? 'bg-green-500' :
                status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(100, (value / target) * 100)}%` }}
            />
          </div>
        </div>
      )}
      
      <p className="text-slate-300 text-sm">{description}</p>
    </motion.div>
  );
};

// 📊 ENVIRONMENTAL CHART WITH ECHARTS
const EnvironmentalChart = ({ title, data, type, height = 300 }) => {
  const chartOptions = useMemo(() => {
    const baseOptions = {
      title: {
        text: title,
        textStyle: {
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 'bold'
        },
        left: 'center'
      },
      backgroundColor: 'transparent',
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#374151',
        textStyle: {
          color: '#e2e8f0'
        }
      }
    };

    switch (type) {
      case 'line':
        return {
          ...baseOptions,
          xAxis: {
            type: 'category',
            data: data.labels,
            axisLine: { lineStyle: { color: '#374151' } },
            axisLabel: { color: '#94a3b8' }
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#374151' } },
            axisLabel: { color: '#94a3b8' },
            splitLine: { lineStyle: { color: '#374151' } }
          },
          series: data.datasets.map(dataset => ({
            name: dataset.label,
            type: 'line',
            data: dataset.data,
            smooth: true,
            lineStyle: { color: dataset.borderColor },
            areaStyle: { 
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: dataset.borderColor + '40' },
                  { offset: 1, color: dataset.borderColor + '10' }
                ]
              }
            }
          }))
        };

      case 'bar':
        return {
          ...baseOptions,
          xAxis: {
            type: 'category',
            data: data.labels,
            axisLine: { lineStyle: { color: '#374151' } },
            axisLabel: { color: '#94a3b8' }
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#374151' } },
            axisLabel: { color: '#94a3b8' },
            splitLine: { lineStyle: { color: '#374151' } }
          },
          series: data.datasets.map(dataset => ({
            name: dataset.label,
            type: 'bar',
            data: dataset.data,
            itemStyle: { 
              color: dataset.backgroundColor,
              borderColor: dataset.borderColor,
              borderWidth: dataset.borderWidth || 0
            }
          }))
        };

      case 'doughnut':
      case 'pie':
        return {
          ...baseOptions,
          legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: { color: '#e2e8f0' }
          },
          series: [{
            name: title,
            type: 'pie',
            radius: type === 'doughnut' ? ['40%', '70%'] : '70%',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
                color: '#ffffff'
              }
            },
            labelLine: { show: false },
            data: data.labels.map((label, index) => ({
              value: data.datasets[0].data[index],
              name: label,
              itemStyle: { color: data.datasets[0].backgroundColor[index] }
            }))
          }]
        };

      case 'radar':
        return {
          ...baseOptions,
          radar: {
            indicator: data.labels.map(label => ({ name: label, max: 100 })),
            axisName: { color: '#94a3b8' },
            splitLine: { lineStyle: { color: '#374151' } },
            splitArea: { show: false }
          },
          series: data.datasets.map(dataset => ({
            name: dataset.label,
            type: 'radar',
            data: [{
              value: dataset.data,
              name: dataset.label,
              lineStyle: { color: dataset.borderColor },
              areaStyle: { color: dataset.backgroundColor }
            }]
          }))
        };

      default:
        return baseOptions;
    }
  }, [title, data, type]);
  
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700" style={{ height }}>
      <ReactECharts 
        option={chartOptions}
        style={{ height: '100%', width: '100%' }}
        theme="dark"
      />
    </div>
  );
};

// 🌍 GLOBAL IMPACT SUMMARY
const GlobalImpactSummary = ({ impacts }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Globe className="w-6 h-6 text-envGreen-400" />
        Global Environmental Impact
      </h3>
      
      <div className="space-y-4">
        {impacts.map((impact, index) => (
          <motion.div
            key={impact.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-slate-700/30 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold">{impact.category}</h4>
              <span className={`px-2 py-1 rounded text-xs font-mono ${
                impact.severity === 'high' ? 'bg-red-500/20 text-red-300' :
                impact.severity === 'medium' ? 'bg-orange-500/20 text-orange-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {impact.severity.toUpperCase()}
              </span>
            </div>
            
            <p className="text-slate-300 text-sm mb-3">{impact.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Affected Area:</span>
                <div className="text-white font-mono">{impact.affectedArea}</div>
              </div>
              <div>
                <span className="text-slate-400">Timeline:</span>
                <div className="text-white font-mono">{impact.timeline}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 🎯 SUSTAINABILITY GOALS TRACKER
const SustainabilityGoals = ({ goals }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">
        SDG Progress Tracker
      </h3>
      
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div key={goal.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{goal.title}</span>
              <span className="text-envGreen-400 font-mono">
                {goal.progress}%
              </span>
            </div>
            
            <div className="w-full bg-slate-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-3 rounded-full ${
                  goal.progress >= 75 ? 'bg-green-500' :
                  goal.progress >= 50 ? 'bg-yellow-500' :
                  goal.progress >= 25 ? 'bg-orange-500' : 'bg-red-500'
                }`}
              />
            </div>
            
            <div className="flex justify-between text-xs text-slate-400">
              <span>Target: {goal.target}</span>
              <span>Deadline: {goal.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🚨 CRITICAL ALERTS PANEL
const CriticalAlerts = ({ alerts }) => {
  return (
    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
      <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6" />
        Critical Environmental Alerts
      </h3>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-red-300 font-semibold mb-1">{alert.title}</h4>
                <p className="text-red-200 text-sm mb-2">{alert.description}</p>
                <div className="flex items-center gap-3 text-xs text-red-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {alert.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.timestamp}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 🚀 MAIN ENVIRONMENTAL METRICS COMPONENT
const EnvironmentalMetrics = () => {
  const [timeRange, setTimeRange] = useState('7d'); // '24h', '7d', '30d', '1y'
  const [liveData, setLiveData] = useState({
    globalTemp: 1.23,
    co2Level: 421.78,
    seaLevel: 3.2,
    deforestation: 10.3,
    renewableEnergy: 31.4
  });
  
  // Mock live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        globalTemp: prev.globalTemp + (Math.random() - 0.5) * 0.02,
        co2Level: prev.co2Level + (Math.random() - 0.5) * 0.1,
        seaLevel: prev.seaLevel + (Math.random() - 0.5) * 0.05,
        deforestation: prev.deforestation + (Math.random() - 0.5) * 0.2,
        renewableEnergy: prev.renewableEnergy + (Math.random() - 0.5) * 0.3
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const temperatureData = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Temperature Anomaly (°C)',
      data: [1.1, 1.2, 1.3, 1.4, 1.2, 1.5, 1.6, 1.7, 1.4, 1.3, 1.2, 1.3],
      borderColor: '#ef4444',
      backgroundColor: '#ef444410'
    }]
  }), []);
  
  const carbonData = useMemo(() => ({
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'CO₂ Emissions (Gt)',
      data: [34.8, 36.2, 37.1, 37.4, 37.8],
      backgroundColor: '#f59e0b',
      borderColor: '#f59e0b',
      borderWidth: 2
    }]
  }), []);
  
  const renewableData = useMemo(() => ({
    labels: ['Solar', 'Wind', 'Hydro', 'Nuclear', 'Other'],
    datasets: [{
      data: [28, 26, 22, 18, 6],
      backgroundColor: [
        '#fbbf24',
        '#06b6d4',
        '#3b82f6',
        '#8b5cf6',
        '#ef4444'
      ]
    }]
  }), []);
  
  const sustainabilityGoals = [
    {
      id: 'sdg7',
      title: 'Clean Energy (SDG 7)',
      progress: 68,
      target: '100% renewable by 2050',
      deadline: '2050'
    },
    {
      id: 'sdg13',
      title: 'Climate Action (SDG 13)',
      progress: 42,
      target: 'Net zero emissions',
      deadline: '2050'
    },
    {
      id: 'sdg14',
      title: 'Life Below Water (SDG 14)',
      progress: 35,
      target: 'Restore ocean health',
      deadline: '2030'
    },
    {
      id: 'sdg15',
      title: 'Life on Land (SDG 15)',
      progress: 51,
      target: 'Halt biodiversity loss',
      deadline: '2030'
    }
  ];
  
  const globalImpacts = [
    {
      category: 'Arctic Ice Loss',
      description: 'Greenland ice sheet melting at accelerated rate',
      severity: 'high',
      affectedArea: '1.7M km²',
      timeline: '2000-2024'
    },
    {
      category: 'Coral Bleaching',
      description: 'Great Barrier Reef experiencing widespread bleaching',
      severity: 'high',
      affectedArea: '2,300 km',
      timeline: 'Ongoing'
    },
    {
      category: 'Deforestation',
      description: 'Amazon rainforest clearing continues despite pledges',
      severity: 'medium',
      affectedArea: '11,568 km²/year',
      timeline: '2023-2024'
    }
  ];
  
  const criticalAlerts = [
    {
      id: 1,
      title: 'Antarctic Ice Shelf Collapse',
      description: 'Larsen C ice shelf showing signs of imminent collapse',
      location: 'Antarctica',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Marine Heatwave',
      description: 'Unprecedented water temperatures in Pacific Northwest',
      location: 'Pacific Ocean',
      timestamp: '6 hours ago'
    },
    {
      id: 3,
      title: 'Wildfire Emergency',
      description: 'Multiple large fires threatening Canadian boreal forest',
      location: 'British Columbia',
      timestamp: '12 hours ago'
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Global Environmental Metrics
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-time monitoring of critical environmental indicators and climate data
          </p>
        </motion.div>
        
        {/* Time Range Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800 rounded-lg p-1 border border-slate-700">
            {['24h', '7d', '30d', '1y'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded text-sm transition-colors ${
                  timeRange === range 
                    ? 'bg-envGreen-600 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        {/* Key Metrics Grid */}
        <div className="grid lg:grid-cols-5 gap-6 mb-12">
          <MetricTile
            icon={Thermometer}
            title="Global Temperature"
            value={liveData.globalTemp.toFixed(2)}
            unit="°C above baseline"
            change={0.12}
            changePercent={"+2.3"} 
            status="warning"
            target={1.5}
            description="Temperature anomaly vs 1850-1900 average"
          />
          
          <MetricTile
            icon={Wind}
            title="CO₂ Concentration"
            value={liveData.co2Level.toFixed(0)}
            unit="ppm"
            change={2.4}
            changePercent="+0.6"
            status="critical"
            target={350}
            description="Atmospheric carbon dioxide levels"
          />
          
          <MetricTile
            icon={Droplets}
            title="Sea Level Rise"
            value={liveData.seaLevel.toFixed(1)}
            unit="mm/year"
            change={0.2}
            changePercent="+6.7"
            status="warning"
            description="Global mean sea level change rate"
          />
          
          <MetricTile
            icon={Trees}
            title="Forest Loss"
            value={liveData.deforestation.toFixed(1)}
            unit="M ha/year"
            change={-0.8}
            changePercent="-7.2"
            status="good"
            description="Annual global deforestation rate"
          />
          
          <MetricTile
            icon={Globe}
            title="Renewable Energy"
            value={liveData.renewableEnergy.toFixed(1)}
            unit="% of grid"
            change={2.1}
            changePercent="+7.2"
            status="good"
            target={100}
            description="Share of renewable electricity"
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <EnvironmentalChart
            title="Global Temperature Anomaly"
            data={temperatureData}
            type="line"
          />
          
          <EnvironmentalChart
            title="Global CO₂ Emissions"
            data={carbonData}
            type="bar"
          />
          
          <EnvironmentalChart
            title="Renewable Energy Mix"
            data={renewableData}
            type="doughnut"
          />
        </div>
        
        {/* Bottom Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          <CriticalAlerts alerts={criticalAlerts} />
          <GlobalImpactSummary impacts={globalImpacts} />
          <SustainabilityGoals goals={sustainabilityGoals} />
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalMetrics;
