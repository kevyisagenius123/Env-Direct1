import React from 'react';
import { motion } from 'framer-motion';
import { Construction, AlertTriangle, Wrench, Clock, ArrowLeft, Mail, BarChart3, Building, Leaf, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnderConstructionPage = ({ 
  title = "Dashboard Under Construction", 
  subtitle = "We're building something amazing for our consulting clients",
  estimatedCompletion = "Coming Q3 2025",
  showContactOption = true
}) => {

  const upcomingFeatures = [
    {
      icon: BarChart3,
      title: 'Project Analytics',
      description: 'Real-time tracking of your consulting projects',
      eta: 'Q3 2025'
    },
    {
      icon: Building,
      title: 'Client Portal',
      description: 'Dedicated space for project documents and communication',
      eta: 'Q4 2025'
    },
    {
      icon: Leaf,
      title: 'Impact Reports',
      description: 'Automated environmental impact assessments',
      eta: 'Q1 2026'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Compliance alerts and project updates',
      eta: 'Q2 2026'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-envGreen-50 to-envGreen-100 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Construction Icon Animation */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center justify-center w-32 h-32 bg-envGreen-600 rounded-full mb-8"
          >
            <Construction className="w-16 h-16 text-white" />
          </motion.div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">{subtitle}</p>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Development Progress</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="bg-gradient-to-r from-envGreen-500 to-envGreen-600 h-3 rounded-full"
                />
              </div>
            </div>
            
            <div className="text-envGreen-600 font-semibold">
              Expected Launch: {estimatedCompletion}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-envGreen-600 text-white font-medium rounded-lg hover:bg-envGreen-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <Link
              to="/user/login"
              className="inline-flex items-center px-6 py-3 border border-envGreen-600 text-envGreen-600 font-medium rounded-lg hover:bg-envGreen-50 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Access Client Portal
            </Link>
          </div>
        </motion.div>

        {/* Upcoming Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We're Building</h2>
            <p className="text-lg text-gray-600">Advanced features for environmental consulting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-envGreen-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-envGreen-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {feature.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-envGreen-100 text-envGreen-800 text-sm font-medium rounded-full">
                      {feature.eta}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get Early Access
          </h2>
          <p className="text-gray-600 mb-6">
            Be the first to experience our comprehensive consulting dashboard
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-envGreen-500"
              />
              <button className="px-6 py-3 bg-envGreen-600 text-white font-medium rounded-lg hover:bg-envGreen-700 transition-colors">
                Notify Me
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Stay updated on development progress and get exclusive early access.
            </p>
          </div>
        </motion.div>

        {/* Contact Support */}
        {showContactOption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="bg-envGreen-100 border border-envGreen-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-envGreen-800 mb-2">
                Need Consulting Services Now?
              </h3>
              <p className="text-envGreen-700 mb-4">
                While we build the dashboard, our full consulting services are available
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-2 bg-envGreen-600 text-white font-medium rounded-lg hover:bg-envGreen-700 transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>

    {/* Loading Animation */}
    <motion.div
      className="flex justify-center mb-8"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
    >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-24 h-24 border-4 border-dashed border-amber-300 rounded-full"
            />
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
              <Construction className="w-12 h-12 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200"
        >
          {/* Warning Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800 font-medium">Page Under Development</span>
            <Wrench className="w-5 h-5 text-amber-600" />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {subtitle}
          </p>

          {/* Features Coming Soon */}
          <div className="bg-envGreen-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-envGreen-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              What's Coming
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-envGreen-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-envGreen-500 rounded-full"></div>
                <span>Modern, intuitive interface</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-envGreen-500 rounded-full"></div>
                <span>Real-time data integration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-envGreen-500 rounded-full"></div>
                <span>Advanced analytics & insights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-envGreen-500 rounded-full"></div>
                <span>Mobile-responsive design</span>
              </div>
            </div>
          </div>

          {/* Estimated Completion */}
          <div className="bg-slate-50 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-slate-700">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Estimated Completion:</span>
              <span className="text-envGreen-600 font-semibold">{estimatedCompletion}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-envGreen-600 hover:bg-envGreen-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {showContactOption && (
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
            )}
          </div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 1.2, duration: 2 }}
            className="mt-8 mx-auto"
          >
            <div className="text-sm text-slate-600 mb-2 text-center">Development Progress</div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-envGreen-400 to-envGreen-600 h-2 rounded-full w-3/5"></div>
            </div>
            <div className="text-xs text-slate-500 mt-1 text-center">60% Complete</div>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-slate-500 text-sm mt-6"
        >
          We're working hard to bring you the best environmental intelligence platform. 
          Thank you for your patience!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default UnderConstructionPage;
