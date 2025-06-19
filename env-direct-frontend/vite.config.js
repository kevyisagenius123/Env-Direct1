import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import cesium from 'vite-plugin-cesium' // Removed
// import tailwindcss from '@tailwindcss/vite' // Removed Tailwind CSS v4 Vite plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // cesium(), // Removed
    // tailwindcss(), // Removed Tailwind CSS v4 Vite plugin
  ],
  define: {
    global: 'globalThis',
  },
  // Add optimizeDeps to help with dynamic imports
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'leaflet',
      'react-leaflet',
      'axios',
      'jszip',
      '@tmcw/togeojson',
      'react-responsive',
      'framer-motion'
    ],
  },
  server: {
    fs: {
      // Allow serving files from the project root and node_modules
      allow: [
        // Use a relative path instead of process.cwd()
        './',
        './node_modules/leaflet/dist/images'
      ],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    },
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion'],
          charts: ['chart.js', 'react-chartjs-2'],
          icons: ['@heroicons/react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
