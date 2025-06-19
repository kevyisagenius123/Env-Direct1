import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  PlayIcon,
  VolumeUpIcon,
  VolumeXIcon,
  ArrowRightIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  CameraIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';

const CinematicCover = ({ coverStory, editorialTeam, magazineInfo }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  if (!coverStory) return null;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          poster={coverStory.image || "/img/caribbean-hurricane-hero.jpg"}
        >
          <source src="/videos/caribbean-storm-formation.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-lavaGrey-950/95 via-lavaGrey-900/60 to-transparent" />
      </div>

      {/* Magazine Masthead */}
      <div className="absolute top-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="font-serif text-4xl font-black text-white tracking-tight">
                Green Atlas
              </h1>
              <div className="text-envGreen-400 text-xs font-mono uppercase tracking-[0.2em] mt-1">
                Environmental Intelligence Magazine
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8 text-sm text-skyAsh-300">
              <div className="text-right">
                <div className="font-mono text-envGreen-400">{magazineInfo?.circulation}</div>
                <div className="text-xs">Global Readership</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Cover Story Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-7xl mx-auto px-8 pb-20 w-full">
          <div className="grid grid-cols-12 gap-12">
            
            {/* Main Story Column */}
            <div className="col-span-12 lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                {/* Story Classification */}
                <div className="flex items-center space-x-6 mb-8">
                  <span className="bg-coralRed-600 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm">
                    Cover Investigation
                  </span>
                  
                  <div className="flex items-center space-x-3 text-skyAsh-300">
                    <MapPinIcon className="w-5 h-5" />
                    <span className="font-mono text-sm">Expedition CARIBBEAN-2024-007</span>
                  </div>
                  
                  <button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className="flex items-center space-x-2 text-envGreen-400 hover:text-envGreen-300 transition-colors"
                  >
                    {audioEnabled ? <VolumeUpIcon className="w-5 h-5" /> : <VolumeXIcon className="w-5 h-5" />}
                    <span className="text-sm font-medium">Audio Story Available</span>
                    <div className="w-2 h-2 bg-envGreen-400 rounded-full animate-pulse"></div>
                  </button>
                </div>

                {/* Main Headline - Editorial Style */}
                <h1 className="font-serif text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tight">
                  {coverStory.title}
                </h1>

                {/* Subtitle/Deck */}
                <p className="text-2xl lg:text-3xl text-skyAsh-100 leading-relaxed mb-10 max-w-5xl font-light">
                  An unprecedented convergence of climate models reveals the Caribbean faces its most challenging hurricane season yet. Our investigation spans three nations and uncovers the human stories behind the data.
                </p>

                {/* Byline & Story Metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    {/* Author Info */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img 
                          src="/img/team/elena-vasquez.jpg" 
                          alt="Dr. Elena Vasquez"
                          className="w-20 h-20 rounded-full border-2 border-envGreen-400 object-cover"
                        />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-envGreen-400 rounded-full flex items-center justify-center">
                          <CameraIcon className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-white text-xl font-semibold leading-tight">
                          Dr. Elena Vasquez & Marcus Chen
                        </div>
                        <div className="text-envGreen-400 text-sm font-medium">
                          Editor-in-Chief & Field Correspondent
                        </div>
                        <div className="text-skyAsh-400 text-sm flex items-center space-x-2">
                          <MapPinIcon className="w-4 h-4" />
                          <span>Reporting from Dominica</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-px h-20 bg-skyAsh-600"></div>

                    {/* Story Metadata */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-skyAsh-300">
                        <ClockIcon className="w-4 h-4" />
                        <span className="text-sm">12 min read</span>
                      </div>
                      <div className="flex items-center space-x-2 text-skyAsh-300">
                        <UserGroupIcon className="w-4 h-4" />
                        <span className="text-sm">23 Scientists Interviewed</span>
                      </div>
                      <div className="flex items-center space-x-2 text-skyAsh-300">
                        <MicrophoneIcon className="w-4 h-4" />
                        <span className="text-sm">Field Audio Available</span>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <motion.button
                    className="group flex items-center space-x-4 bg-envGreen-600 hover:bg-envGreen-500 text-white px-10 py-5 rounded-2xl text-xl font-semibold transition-all duration-300 shadow-2xl"
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PlayIcon className="w-7 h-7" />
                    <span>Begin Investigation</span>
                    <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Editorial Sidebar */}
            <div className="col-span-12 lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
                className="backdrop-blur-2xl bg-lavaGrey-900/70 border border-envGreen-400/30 rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-3 h-3 bg-envGreen-400 rounded-full animate-pulse"></div>
                  <span className="text-envGreen-400 font-mono text-sm uppercase tracking-widest">This Issue</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white mb-6 leading-tight">
                  Editorial Team
                </h3>

                <div className="space-y-6 mb-8">
                  {editorialTeam?.slice(0, 3).map((member, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-14 h-14 rounded-full border border-skyAsh-600 object-cover group-hover:border-envGreen-400 transition-colors"
                      />
                      <div>
                        <div className="text-white font-semibold">{member.name}</div>
                        <div className="text-envGreen-400 text-sm">{member.role}</div>
                        <div className="text-skyAsh-400 text-xs">{member.location}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Issue Details */}
                <div className="border-t border-skyAsh-600/30 pt-6">
                  <div className="text-skyAsh-200 text-sm leading-relaxed">
                    <span className="font-semibold text-envGreen-400">Field Report:</span> Six months of embedded 
                    research across the Caribbean basin, featuring exclusive access to climate modeling centers, 
                    coral restoration sites, and indigenous knowledge keepers.
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-xs text-skyAsh-400">
                    <span>Published: Hurricane Season 2024</span>
                    <span>Research Partners: 23</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center space-y-3 text-skyAsh-300">
          <span className="font-mono text-sm uppercase tracking-widest">Continue Reading</span>
          <div className="w-px h-16 bg-gradient-to-b from-envGreen-400 via-skyAsh-400 to-transparent"></div>
          <div className="w-2 h-2 bg-envGreen-400 rounded-full animate-ping"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default CinematicCover; 