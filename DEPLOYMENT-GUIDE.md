# Green Atlas Magazine - Frontend Deployment Guide

## 🌍 Deploying Green Atlas Magazine to Production

This guide covers deploying the **trillion-dollar environmental editorial institution** Green Atlas Magazine frontend to various hosting platforms.

### Repository Information
- **GitHub Repo**: [Env-Direct1](https://github.com/kevyisagenius123/Env-Direct1.git)
- **Main Branch**: `main`
- **Frontend Branch**: `frontend-only`

---

## 🚀 Render Deployment (Recommended)

### Step 1: Prepare Local Build
```bash
git clone https://github.com/kevyisagenius123/Env-Direct1.git
cd Env-Direct1
npm install
npm run build
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and sign in
2. Click **"New"** → **"Static Site"**
3. Connect GitHub account and select `Env-Direct1` repository
4. Configure deployment:
   - **Branch**: `main`
   - **Root Directory**: `/` (leave empty)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Step 3: Environment Variables
Add these environment variables in Render dashboard:
```
NODE_VERSION=18
VITE_API_URL=https://environment-direct-backend.up.railway.app
```

### Step 4: Deploy
Click **"Create Static Site"** and Render will automatically deploy.

---

## ⚡ Vercel Deployment (Alternative)

### Step 1: Using Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Step 2: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and import project
2. Select `Env-Direct1` repository
3. Vercel will automatically detect Vite configuration
4. Set environment variable:
   ```
   VITE_API_URL=https://environment-direct-backend.up.railway.app
   ```

---

## 🌐 Netlify Deployment

### Step 1: Using Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Step 2: Using Netlify Dashboard
1. Drag and drop the `dist` folder to Netlify
2. Or connect GitHub repository at [netlify.com](https://netlify.com)
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

---

## 🔧 Backend Integration

### CORS Configuration
Ensure your Spring Boot backend has proper CORS configuration:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins(
                        "https://green-atlas-frontend.onrender.com",
                        "https://env-direct1.vercel.app",
                        "https://greenatlas.netlify.app",
                        "http://localhost:5173"
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### Environment Variables
Your backend is already deployed at Railway. The frontend is configured to use:
- **Production API URL**: `https://environment-direct-backend.up.railway.app`
- **Development API URL**: `http://localhost:8080` (for local development)

If you deploy a new backend, update the `VITE_API_URL` environment variable.

---

## 📦 Production Build Features

The Green Atlas Magazine includes:

### Core Features
- ✅ **Planetary Intelligence System** - Global environmental consulting
- ✅ **Climate Intelligence Hub** - Premium editorial content
- ✅ **AI Assistant Concierge** - Intelligent content discovery
- ✅ **Interactive Data Visualizations** - Real-time environmental metrics
- ✅ **Responsive Design** - Mobile-first, luxury aesthetics
- ✅ **Performance Optimized** - Code splitting and lazy loading

### Technical Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Charts**: Chart.js
- **Maps**: Leaflet + Cesium
- **Build Tool**: Vite (optimized for production)

### Performance Optimizations
- Tree shaking for smaller bundle sizes
- Code splitting for faster load times
- Image optimization
- CSS purging
- Gzip compression
- CDN distribution

---

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   npm install --legacy-peer-deps
   npm run build
   ```

2. **API Connection Issues**
   - Verify `VITE_API_URL` environment variable
   - Check CORS configuration on backend
   - Ensure backend is deployed and accessible

3. **Routing Issues**
   - Verify redirect rules in deployment platform
   - Check `vercel.json`, `netlify.toml`, or platform-specific config

### Performance Monitoring
After deployment, monitor:
- Core Web Vitals
- Bundle size
- API response times
- Error rates

---

## 🎯 Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend API connected
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] All features working (AI Assistant, maps, visualizations)
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)

---

## 🌟 Going Live

Once deployed, your Green Atlas Magazine will be live at:
- **Render**: `https://your-app-name.onrender.com`
- **Vercel**: `https://your-app-name.vercel.app`
- **Netlify**: `https://your-app-name.netlify.app`

The platform is now ready to serve as a **global, trillion-dollar environmental editorial institution** with luxury aesthetics, intelligent content discovery, and world-class environmental journalism.

---

*Green Atlas Magazine - Where Environmental Intelligence Meets Editorial Excellence* 