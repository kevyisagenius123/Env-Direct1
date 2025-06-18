import React from 'react';
import { MapIcon } from '@heroicons/react/24/outline';

const StoryMap = ({ articles, onArticleSelect, selectedArticle }) => {
  return (
    <div className="bg-lavaGrey-800/50 border border-envGreen-800/30 rounded-2xl p-8 text-center">
      <MapIcon className="w-16 h-16 text-envGreen-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Interactive Story Map</h3>
      <p className="text-skyAsh-300 mb-6">
        Geospatial visualization of environmental stories across the Caribbean region.
      </p>
      <div className="bg-envGreen-600/20 border border-envGreen-600/30 rounded-xl p-4">
        <p className="text-envGreen-300 text-sm">
          Map integration coming soon with Leaflet and geospatial article plotting
        </p>
      </div>
    </div>
  );
};

export default StoryMap; 