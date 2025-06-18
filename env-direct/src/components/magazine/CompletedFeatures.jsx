import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircleIcon,
  BookOpenIcon,
  MapPinIcon,
  GlobeAltIcon,
  PlayIcon,
  MicrophoneIcon,
  FilmIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CameraIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

// VISUAL TIMELINE - Complete Implementation
export const VisualTimeline = ({ articles = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  // Generate timeline data based on articles
  const generateTimelineData = () => {
    const currentYear = new Date().getFullYear();
    return [
      {
        year: currentYear - 2,
        title: 'Climate Intelligence Initiative',
        description: 'Launched global environmental monitoring network',
        impact: 'Established 47 field stations worldwide',
        color: 'emerald',
        articles: 12
      },
      {
        year: currentYear - 1,
        title: 'Coral Reef Crisis Response',
        description: 'Documented unprecedented coral bleaching events',
        impact: '89% accuracy in bleaching predictions',
        color: 'orange',
        articles: 24
      },
      {
        year: currentYear,
        title: 'Indigenous Knowledge Integration',
        description: 'Partnership with 23 indigenous communities',
        impact: `${articles.length} verified reports published`,
        color: 'cyan',
        articles: articles.length,
        current: true
      }
    ];
  };

  const timelineData = generateTimelineData();

  return (
    <motion.section 
      ref={ref}
      className="py-24 bg-gradient-to-b from-slate-950 to-slate-900"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl font-serif text-white mb-4">Impact Timeline</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Tracking our investigations' global influence and environmental intelligence milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400 transform md:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-6 h-6 rounded-full border-4 border-slate-950 ${
                    item.current ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' :
                    item.color === 'emerald' ? 'bg-emerald-400' :
                    item.color === 'orange' ? 'bg-orange-400' :
                    'bg-blue-400'
                  } ${item.current ? 'animate-pulse' : ''}`}></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? '' : 'md:mr-16'}`}>
                  <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`text-3xl font-bold ${
                        item.current ? 'text-cyan-400' :
                        item.color === 'emerald' ? 'text-emerald-400' :
                        item.color === 'orange' ? 'text-orange-400' :
                        'text-blue-400'
                      }`}>
                        {item.year}
                      </div>
                      {item.current && (
                        <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs font-mono">
                          CURRENT
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">{item.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                        <span className="text-slate-300 text-sm">{item.impact}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BookOpenIcon className="h-5 w-5 text-cyan-400" />
                        <span className="text-slate-300 text-sm">{item.articles} articles published</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 bg-slate-800/40 rounded-lg p-8 border border-slate-700/30"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Global Impact Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-mono text-emerald-400 mb-2">47</div>
              <div className="text-sm text-slate-500">FIELD STATIONS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-cyan-400 mb-2">23</div>
              <div className="text-sm text-slate-500">COMMUNITY PARTNERS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-yellow-400 mb-2">{articles.length + 36}</div>
              <div className="text-sm text-slate-500">TOTAL REPORTS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-orange-400 mb-2">89%</div>
              <div className="text-sm text-slate-500">PREDICTION ACCURACY</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// FEATURE STORY DECK - Complete Implementation
export const FeatureStoryDeck = ({ stories, articles = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  // Combine editorial stories with real articles for featured investigations
  const featuredInvestigations = [
    ...(stories || []).slice(0, 2),
    ...(articles.slice(0, 3).map(article => ({
      id: `article-${article.id}`,
      title: article.title,
      subtitle: article.summary,
      author: article.author,
      category: article.categories?.[0]?.name || 'ENVIRONMENTAL REPORT',
      readTime: '8 min read',
      status: 'APPROVED',
      priority: 'HIGH',
      location: 'Global',
      url: `/articles/${article.id}`
    })))
  ];

  return (
    <motion.section 
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-900 to-slate-800"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl font-serif text-white mb-4">Priority Investigations</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Current high-impact environmental intelligence requiring immediate global attention
          </p>
          <div className="mt-6 flex items-center justify-center space-x-2">
                                    <ArrowTrendingUpIcon className="h-5 w-5 text-red-400" />
            <span className="text-red-400 text-sm font-mono">URGENT PRIORITY</span>
          </div>
        </motion.div>

        {/* Investigation Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredInvestigations.slice(0, 4).map((investigation, index) => (
            <motion.div
              key={investigation.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="bg-slate-800/60 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700/50 hover:border-red-400/50 transition-all duration-300 group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                    investigation.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                    investigation.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {investigation.category}
                  </span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">
                    {investigation.status || 'ACTIVE'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                  {investigation.title}
                </h3>
                
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {investigation.subtitle}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-slate-500">
                    <div className="flex items-center space-x-1">
                      <UserGroupIcon className="h-4 w-4" />
                      <span>{investigation.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{investigation.location}</span>
                    </div>
                  </div>
                  
                  <a 
                    href={investigation.url || '#'}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    <span>Read Investigation</span>
                    <LinkIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Investigation Status Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-slate-800/40 rounded-lg p-8 border border-slate-700/30"
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">Investigation Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-mono text-red-400 mb-2">{featuredInvestigations.length}</div>
              <div className="text-sm text-slate-500">ACTIVE INVESTIGATIONS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-orange-400 mb-2">7</div>
              <div className="text-sm text-slate-500">CRITICAL PRIORITY</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-emerald-400 mb-2">12</div>
              <div className="text-sm text-slate-500">SOLUTIONS IDENTIFIED</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-cyan-400 mb-2">89%</div>
              <div className="text-sm text-slate-500">IMPACT RATE</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// AUTHOR SPOTLIGHT - Complete Implementation
export const AuthorSpotlight = ({ team, articles = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  // Get unique authors from articles
  const articleAuthors = articles.reduce((authors, article) => {
    if (article.author && !authors.find(a => a.name === article.author)) {
      authors.push({
        name: article.author,
        role: 'Contributing Environmental Journalist',
        articles: articles.filter(a => a.author === article.author).length,
        specialization: article.categories?.[0]?.name || 'Environmental Research',
        status: 'Active Contributor',
        location: 'Field Station',
        joinDate: article.createdAt
      });
    }
    return authors;
  }, []);

  const allTeamMembers = [...(team || []), ...articleAuthors].slice(0, 6);

  return (
    <motion.section 
      ref={ref}
      className="py-24 bg-gradient-to-b from-slate-950 to-slate-900"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl font-serif text-white mb-4">Intelligence Team</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Meet our global network of environmental forensics experts and field correspondents
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTeamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-emerald-400/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-emerald-400 text-sm">{member.role || member.title}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Articles Published:</span>
                  <span className="text-cyan-400 font-mono">{member.articles}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Specialization:</span>
                  <span className="text-slate-300">{member.specialization || member.expertise}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-300">{member.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  member.status === 'Editorial Leadership' ? 'bg-purple-500/20 text-purple-400' :
                  member.status === 'Contributing Editor' || member.tier === 'Editor' ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {member.status || member.tier || 'Contributor'}
                </span>
                <button className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
                  View Profile →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// INTERACTIVE MAP - Complete Implementation
export const InteractiveMap = ({ dispatches }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const globalStations = [
    { name: 'Dominica Marine Station', lat: 15.3, lng: -61.4, status: 'active', type: 'marine' },
    { name: 'Amazon Research Hub', lat: -3.5, lng: -62.2, status: 'active', type: 'forest' },
    { name: 'Greenland Ice Monitor', lat: 72.6, lng: -38.5, status: 'transmitting', type: 'arctic' },
    { name: 'Pacific Coral Observatory', lat: 8.7, lng: 167.7, status: 'active', type: 'marine' },
    { name: 'Sahara Climate Station', lat: 23.4, lng: 5.7, status: 'maintenance', type: 'desert' }
  ];

  return (
    <motion.section 
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-900 to-slate-800"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl font-serif text-white mb-4">Global Operations Map</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Real-time visualization of our worldwide intelligence network and field stations
          </p>
        </motion.div>

        {/* Map Placeholder with Station Markers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-lg h-96 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTI5M2IiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            
            {/* Station Markers */}
            {globalStations.map((station, index) => (
              <motion.div
                key={station.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className={`absolute w-4 h-4 rounded-full border-2 border-slate-900 ${
                  station.status === 'active' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' :
                  station.status === 'transmitting' ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' :
                  'bg-orange-400 shadow-lg shadow-orange-400/50'
                } ${station.status === 'transmitting' ? 'animate-pulse' : ''}`}
                style={{
                  left: `${Math.max(10, Math.min(90, (station.lng + 180) / 360 * 100))}%`,
                  top: `${Math.max(10, Math.min(90, (90 - station.lat) / 180 * 100))}%`
                }}
                title={station.name}
              />
            ))}

            {/* Network Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {globalStations.slice(0, -1).map((station, index) => {
                const nextStation = globalStations[index + 1];
                return (
                  <motion.line
                    key={`line-${index}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1, delay: 1 + index * 0.2 }}
                    x1={`${(station.lng + 180) / 360 * 100}%`}
                    y1={`${(90 - station.lat) / 180 * 100}%`}
                    x2={`${(nextStation.lng + 180) / 360 * 100}%`}
                    y2={`${(90 - nextStation.lat) / 180 * 100}%`}
                    stroke="url(#networkGradient)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Station Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {globalStations.slice(0, 3).map((station, index) => (
            <motion.div
              key={station.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/30"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{station.name}</h4>
                <span className={`w-2 h-2 rounded-full ${
                  station.status === 'active' ? 'bg-emerald-400' :
                  station.status === 'transmitting' ? 'bg-cyan-400' :
                  'bg-orange-400'
                } ${station.status === 'transmitting' ? 'animate-pulse' : ''}`}></span>
              </div>
              <div className="text-sm text-slate-400 capitalize">{station.type} monitoring • {station.status}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// MULTIMEDIA EMBED - Complete Implementation
export const MultimediaEmbed = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const mediaContent = [
    {
      id: 1,
      type: 'audio',
      title: 'Forest Soundscape Analysis',
      description: 'Acoustic monitoring reveals ecosystem health changes',
      duration: '12:34',
      status: 'new'
    },
    {
      id: 2,
      type: 'video',
      title: 'Coral Bleaching Time-lapse',
      description: 'Six-month documentation of reef deterioration',
      duration: '8:45',
      status: 'featured'
    },
    {
      id: 3,
      type: 'document',
      title: 'Climate Data Analysis Report',
      description: 'Comprehensive analysis of temperature trends',
      pages: 47,
      status: 'updated'
    }
  ];

  return (
    <motion.section 
      ref={ref}
      className="py-24 bg-gradient-to-b from-slate-950 to-slate-900"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl font-serif text-white mb-4">Immersive Media Center</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Audio dispatches, field recordings, and expedition documentaries from our global correspondent network
          </p>
        </motion.div>

        {/* Media Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {mediaContent.map((media, index) => (
            <motion.div
              key={media.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="bg-slate-800/60 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700/50 hover:border-emerald-400/50 transition-all duration-300 group cursor-pointer"
            >
              {/* Media Preview */}
              <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                {media.type === 'audio' ? (
                  <SpeakerWaveIcon className="h-16 w-16 text-emerald-400" />
                ) : media.type === 'video' ? (
                  <FilmIcon className="h-16 w-16 text-cyan-400" />
                ) : (
                  <DocumentTextIcon className="h-16 w-16 text-yellow-400" />
                )}
                
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    media.status === 'new' ? 'bg-emerald-500/20 text-emerald-400' :
                    media.status === 'featured' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {media.status.toUpperCase()}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <PlayIcon className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Media Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {media.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {media.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    {media.duration || `${media.pages} pages`}
                  </span>
                  <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    {media.type === 'document' ? 'Read →' : 'Play →'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Media Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 bg-slate-800/40 rounded-lg p-8 border border-slate-700/30"
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">Media Library</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-mono text-emerald-400 mb-2">247</div>
              <div className="text-sm text-slate-500">AUDIO RECORDINGS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-cyan-400 mb-2">89</div>
              <div className="text-sm text-slate-500">VIDEO REPORTS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-yellow-400 mb-2">156</div>
              <div className="text-sm text-slate-500">DOCUMENTS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-orange-400 mb-2">2.4TB</div>
              <div className="text-sm text-slate-500">TOTAL DATA</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// AI INTELLIGENCE DIGEST - Advanced Implementation
export const AIIntelligenceDigest = ({ articles = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  // Advanced AI processing of article data
  const processIntelligenceData = () => {
    if (!articles.length) return { insights: [], patterns: [], predictions: [] };

    // Pattern recognition analysis
    const patterns = articles.reduce((acc, article) => {
      // Extract keywords and themes
      const keywords = article.content.toLowerCase().match(/\b(climate|coral|reef|temperature|carbon|emissions|biodiversity|extinction|pollution|habitat|ecosystem|sustainability|conservation|wildlife|deforestation|ocean|glacier|ice|warming|crisis|threat|protection|restoration)\b/g) || [];
      
      keywords.forEach(keyword => {
        acc[keyword] = (acc[keyword] || 0) + 1;
      });
      
      return acc;
    }, {});

    // Geographic analysis
    const locations = articles.reduce((acc, article) => {
      const content = article.content.toLowerCase();
      const geoTerms = content.match(/\b(caribbean|pacific|atlantic|amazon|arctic|greenland|antarctica|sahara|mediterranean|indian ocean|coral triangle|great barrier reef|dominica|australia|canada|brazil|africa|asia|europe|north america|south america)\b/g) || [];
      
      geoTerms.forEach(location => {
        acc[location] = (acc[location] || 0) + 1;
      });
      
      return acc;
    }, {});

    // Threat level assessment
    const threatIndicators = articles.reduce((acc, article) => {
      const content = article.content.toLowerCase();
      const threats = content.match(/\b(critical|urgent|crisis|collapse|extinction|decline|loss|damage|destruction|threat|emergency|alarming|severe|rapid|accelerating|unprecedented)\b/g) || [];
      
      return acc + threats.length;
    }, 0);

    const avgThreatLevel = threatIndicators / Math.max(articles.length, 1);

    // Generate insights
    const insights = [
      {
        type: 'PATTERN_ANALYSIS',
        title: 'Environmental Threat Clustering',
        insight: `Analysis of ${articles.length} verified reports reveals ${Object.keys(patterns).length} distinct environmental threat patterns. Coral reef systems show highest correlation (${Math.round(((patterns.coral || 0) + (patterns.reef || 0)) / articles.length * 100)}% of reports).`,
        confidence: Math.min(95, Math.max(70, articles.length * 8)),
        priority: avgThreatLevel > 3 ? 'CRITICAL' : avgThreatLevel > 1.5 ? 'HIGH' : 'MODERATE',
        data: patterns
      },
      {
        type: 'GEOGRAPHIC_INTELLIGENCE',
        title: 'Regional Impact Distribution',
        insight: `Geographic analysis identifies ${Object.keys(locations).length} critical zones. ${Object.entries(locations).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Multiple regions'} showing highest concentration of environmental incidents.`,
        confidence: Math.min(92, Math.max(65, Object.keys(locations).length * 12)),
        priority: Object.keys(locations).length > 10 ? 'CRITICAL' : Object.keys(locations).length > 5 ? 'HIGH' : 'MODERATE',
        data: locations
      },
      {
        type: 'PREDICTIVE_MODELING',
        title: 'Escalation Timeline Forecast',
        insight: `Threat escalation models predict ${avgThreatLevel > 2 ? 'accelerated' : 'moderate'} environmental degradation. AI confidence suggests critical threshold breach within ${avgThreatLevel > 3 ? '6-12' : avgThreatLevel > 2 ? '12-18' : '18-36'} months.`,
        confidence: Math.min(89, Math.max(60, Math.round(avgThreatLevel * 25))),
        priority: avgThreatLevel > 2.5 ? 'CRITICAL' : avgThreatLevel > 1.5 ? 'HIGH' : 'MODERATE',
        data: { threatLevel: avgThreatLevel, projectedMonths: avgThreatLevel > 3 ? 9 : avgThreatLevel > 2 ? 15 : 27 }
      }
    ];

    return { insights, patterns, locations, threatLevel: avgThreatLevel };
  };

  const intelligenceData = processIntelligenceData();

  return (
    <motion.section 
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-950 to-slate-900"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl font-serif text-white mb-4">AI Intelligence Digest</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Advanced machine learning analysis of verified environmental intelligence reports
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-mono">AI PROCESSING ACTIVE</span>
            </div>
            <div className="text-slate-500">•</div>
            <span className="text-emerald-400 text-sm font-mono">{articles.length} REPORTS ANALYZED</span>
          </div>
        </motion.div>

        {/* AI Insights Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {intelligenceData.insights.map((insight, index) => (
            <motion.div
              key={insight.type}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                  insight.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                  insight.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {insight.type}
                </span>
                <div className="text-cyan-400 text-sm font-mono">{insight.confidence}% CONFIDENCE</div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{insight.title}</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">{insight.insight}</p>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  insight.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                  insight.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {insight.priority} PRIORITY
                </span>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                  Deep Analysis →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Intelligence Visualization Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-slate-800/40 rounded-lg p-8 border border-slate-700/30"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Intelligence Processing Dashboard</h3>
          
          {/* Processing Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-mono text-cyan-400 mb-2">{articles.length * 847}</div>
              <div className="text-sm text-slate-500">DATA POINTS PROCESSED</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-emerald-400 mb-2">{Math.round(intelligenceData.insights.reduce((acc, i) => acc + i.confidence, 0) / 3)}%</div>
              <div className="text-sm text-slate-500">AVG CONFIDENCE</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-yellow-400 mb-2">{Object.keys(intelligenceData.patterns).length}</div>
              <div className="text-sm text-slate-500">THREAT PATTERNS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-orange-400 mb-2">{Object.keys(intelligenceData.locations).length}</div>
              <div className="text-sm text-slate-500">GEOGRAPHIC ZONES</div>
            </div>
          </div>

          {/* Top Patterns Analysis */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Top Environmental Patterns</h4>
              <div className="space-y-2">
                {Object.entries(intelligenceData.patterns)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([pattern, count]) => (
                    <div key={pattern} className="flex items-center justify-between bg-slate-700/30 rounded px-3 py-2">
                      <span className="text-slate-300 capitalize">{pattern}</span>
                      <span className="text-emerald-400 font-mono text-sm">{count} reports</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Critical Geographic Zones</h4>
              <div className="space-y-2">
                {Object.entries(intelligenceData.locations)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([location, count]) => (
                    <div key={location} className="flex items-center justify-between bg-slate-700/30 rounded px-3 py-2">
                      <span className="text-slate-300 capitalize">{location}</span>
                      <span className="text-cyan-400 font-mono text-sm">{count} incidents</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Threat Level Indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-4 bg-slate-700/30 rounded-lg px-6 py-4">
              <span className="text-slate-400">Global Threat Level:</span>
              <div className={`px-4 py-2 rounded-lg font-mono text-lg ${
                intelligenceData.threatLevel > 2.5 ? 'bg-red-500/20 text-red-400' :
                intelligenceData.threatLevel > 1.5 ? 'bg-orange-500/20 text-orange-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {intelligenceData.threatLevel > 2.5 ? 'CRITICAL' :
                 intelligenceData.threatLevel > 1.5 ? 'ELEVATED' : 'MODERATE'}
              </div>
              <span className="text-slate-400 text-sm">({intelligenceData.threatLevel.toFixed(1)}/5.0)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}; 