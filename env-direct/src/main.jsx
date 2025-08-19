import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import * as Cesium from 'cesium'; // Removed
// import 'cesium/Build/Cesium/Widgets/widgets.css'; // Already removed

// --- REMOVED CESIUM BASE URL --- 
// window.CESIUM_BASE_URL = '/Cesium/';
// --- END REMOVED CESIUM BASE URL ---

// --- REMOVED CESIUM ION ACCESS TOKEN --- 
// Cesium.Ion.defaultAccessToken = 'your_cesium_ion_access_token_here';
// --- END REMOVED CESIUM ION ACCESS TOKEN ---

// Remove initial loader when React app starts
const RootApp = () => {
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 500);
    }
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<RootApp />);
