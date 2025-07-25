import React from 'react';
import Map3D from '../components/Map3D';

const Map3DPage = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-envGreen-800/90 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">3D Environmental Map</h1>
            <p className="text-white/80">Interactive 3D visualization of Dominica's environmental data</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 text-sm">Real-time Data</span>
          </div>
        </div>
      </div>

      {/* 3D Map Component */}
      <Map3D />
      
      {/* Instructions Overlay */}
      <div className="absolute bottom-4 right-4 z-10 bg-black/70 backdrop-blur-sm rounded-lg p-4 max-w-sm">
        <h4 className="font-bold text-white mb-2">Map Controls</h4>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• <strong>Pan:</strong> Click and drag</li>
          <li>• <strong>Zoom:</strong> Mouse wheel or pinch</li>
          <li>• <strong>Rotate:</strong> Right-click and drag</li>
          <li>• <strong>Tilt:</strong> Control/Cmd + drag</li>
          <li>• <strong>Layers:</strong> Toggle in left panel</li>
        </ul>
      </div>
    </div>
  );
};

export default Map3DPage;
