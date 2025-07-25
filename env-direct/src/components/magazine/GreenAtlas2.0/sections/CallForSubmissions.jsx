// 📢 CALL FOR SUBMISSIONS SECTION - Green Atlas Magazine
// Professional submission portal with Caribbean focus

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  Camera, 
  MapPin, 
  Users, 
  Heart, 
  BookOpen, 
  Award, 
  Calendar,
  ExternalLink,
  CheckCircle,
  FileText,
  Send
} from 'lucide-react';

const CallForSubmissions = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to submission deadline (May 31, 2025)
  useEffect(() => {
    const targetDate = new Date('2025-05-31T23:59:59').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const submissionCategories = [
    {
      icon: PenTool,
      title: "Articles & Features",
      description: "Abstract only (150–300 words) required at this stage",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Camera,
      title: "Photos, Poems, & Art",
      description: "Nature-inspired creative pieces",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "GIS & Tech",
      description: "Tools, tutorials, and case studies",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      title: "Community Spotlights",
      description: "Grassroots, youth, and school projects",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Heart,
      title: "Profiles & Interviews",
      description: "Eco-leaders and changemakers",
      color: "from-red-500 to-red-600"
    },
    {
      icon: BookOpen,
      title: "Educational Content",
      description: "Lesson plans, student campaigns",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const CountdownBox = ({ value, label }) => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-black/30 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
    >
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/70 uppercase">{label}</div>
    </motion.div>
  );

  return (
    <section className="relative py-20 bg-gradient-to-br from-envGreen-900 via-envGreen-800 to-envGreen-700 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-envGreen-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-envGreen-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-400/30 mb-6">
            <Award className="w-5 h-5 mr-2 text-yellow-300" />
            <span className="text-yellow-200 font-semibold">CALL FOR SUBMISSIONS</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-envGreen-400 to-envGreen-300 bg-clip-text text-transparent">
              GreenAtlas Magazine
            </span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Are you ready to amplify your voice for the planet? Join us in launching GreenAtlas Magazine—a bold new 
            <span className="text-envGreen-300 font-semibold"> Caribbean-rooted platform</span> for sustainability, 
            innovation, and environmental action.
          </p>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 max-w-4xl mx-auto border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-envGreen-400" />
              <span className="text-white font-semibold">Submission Deadline: May 31, 2025</span>
            </div>
            
            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              <CountdownBox value={countdown.days} label="Days" />
              <CountdownBox value={countdown.hours} label="Hours" />
              <CountdownBox value={countdown.minutes} label="Minutes" />
              <CountdownBox value={countdown.seconds} label="Seconds" />
            </div>
          </div>
        </motion.div>

        {/* Theme & Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">🌱 Theme: Towards a Sustainable Future</h3>
            <p className="text-white/70 mb-4">
              GreenAtlas Magazine, by Environment Direct Consulting Inc., is now accepting content for its debut issue.
            </p>
            <p className="text-envGreen-300 font-semibold">
              We're spotlighting fearless Caribbean voices on climate, conservation, community, and creative expression.
            </p>
            <div className="mt-6 text-white/60">
              <p>📅 <strong>Launch Day:</strong> July 1, 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Submission Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">We're Looking For:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissionCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-envGreen-400/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{category.title}</h4>
                  <p className="text-white/70">{category.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* How to Submit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">How to Submit</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-envGreen-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Google Form</h4>
              <a 
                href="https://forms.gle/ieEfek6hZ4CiWFpd7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-envGreen-300 hover:text-envGreen-200 transition-colors text-sm break-all"
              >
                forms.gle/ieEfek6hZ4CiWFpd7
              </a>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-envGreen-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Email</h4>
              <p className="text-white/70 text-sm mb-2">info@environmentdir.com</p>
              <p className="text-envGreen-300 text-sm">Subject: Submission – GreenAtlas Issue 1</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-envGreen-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Info Pack</h4>
              <a 
                href="https://bit.ly/3GKf3fu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-envGreen-300 hover:text-envGreen-200 transition-colors text-sm"
              >
                bit.ly/3GKf3fu
              </a>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-r from-envGreen-600 to-envGreen-500 rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <h4 className="text-2xl font-bold text-white mb-4">
              Let's showcase the Caribbean's brilliance, boldness, and resilience—together.
            </h4>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              {['#GreenAtlas', '#CallForSubmissions', '#Sustainability', '#CaribbeanCreatives', '#EcoArt', '#ClimateVoices', '#EnvironmentalStorytelling'].map((tag) => (
                <span key={tag} className="bg-white/20 px-3 py-1 rounded-full text-white">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallForSubmissions;
