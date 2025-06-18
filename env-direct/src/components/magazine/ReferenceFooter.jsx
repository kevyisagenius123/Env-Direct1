import React from 'react';
import { DocumentTextIcon, GlobeAltIcon, LinkIcon } from '@heroicons/react/24/outline';

const ReferenceFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-lavaGrey-900 to-lavaGrey-950 border-t border-envGreen-800/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="font-display text-xl font-semibold text-white mb-2">Sources & Attribution</h3>
          <p className="text-skyAsh-300 text-sm">Green Atlas Magazine maintains the highest standards of environmental journalism</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <DocumentTextIcon className="w-8 h-8 text-envGreen-400 mx-auto mb-4" />
            <h4 className="font-semibold text-white mb-3">Data Sources</h4>
            <div className="space-y-2 text-sm text-skyAsh-300">
              <div>NASA Earth Observatory</div>
              <div>Caribbean Meteorological Organisation</div>
              <div>UNEP Caribbean Environment Programme</div>
            </div>
          </div>

          <div className="text-center">
            <GlobeAltIcon className="w-8 h-8 text-seaBlue-400 mx-auto mb-4" />
            <h4 className="font-semibold text-white mb-3">Research Partners</h4>
            <div className="space-y-2 text-sm text-skyAsh-300">
              <div>University of the West Indies</div>
              <div>Caribbean Research Institute</div>
              <div>Marine Conservation Alliance</div>
            </div>
          </div>

          <div className="text-center">
            <LinkIcon className="w-8 h-8 text-sandGold-400 mx-auto mb-4" />
            <h4 className="font-semibold text-white mb-3">Technology</h4>
            <div className="space-y-2 text-sm text-skyAsh-300">
              <div>AI-Powered Content Analysis</div>
              <div>Satellite Imagery Processing</div>
              <div>Real-time Environmental Monitoring</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-envGreen-800/20 text-center">
          <p className="text-skyAsh-500 text-xs">© 2024 Environment Direct 2.0 | Green Atlas Magazine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ReferenceFooter; 