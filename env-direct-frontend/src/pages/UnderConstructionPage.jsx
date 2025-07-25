import React from 'react';
import { motion } from 'framer-motion';
import { Construction, AlertTriangle, Wrench, Clock, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnderConstructionPage = ({ 
  title = "Under Construction", 
  subtitle = "This feature is currently being developed",
  estimatedCompletion = "Coming Soon",
  showContactOption = true
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Construction Icon Animation */}
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
