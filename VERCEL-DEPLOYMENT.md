# 🚀 Environment Direct - Git + Vercel Deployment

## Overview
Deploy your environmental intelligence platform using Git version control and Vercel hosting for maximum performance and reliability.

---

## 📋 **Prerequisites**
- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free tier available)
- Railway account for backend (or alternative)

---

## 🔄 **Step 1: Git Repository Setup**

### Option A: Create New Repository
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "🚀 Initial commit: Environment Direct platform with autonomous AI"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/environment-direct.git

# Push to repository
git push -u origin main
```

### Option B: Update Existing Repository
```bash
# Add new changes
git add .

# Commit deployment configurations
git commit -m "🔧 Add Vercel deployment configuration and production optimizations"

# Push changes
git push origin main
```

---

## 🌐 **Step 2: Backend Deployment (Railway)**

We'll use Railway for the backend as it has excellent Spring Boot support:

### 2.1 Deploy Backend
1. Go to **[Railway](https://railway.app)**
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Choose **`backend`** folder as root directory
5. Railway auto-detects Dockerfile ✅

### 2.2 Configure Environment Variables
Set these in Railway dashboard:
```env
PORT=8080
SPRING_PROFILES_ACTIVE=prod
JAVA_OPTS=-Xmx512m -Xms256m
```

### 2.3 Get Backend URL
- After deployment, Railway provides URL like: `https://environment-direct-backend.up.railway.app`
- Note this URL for frontend configuration

---

## 🚀 **Step 3: Frontend Deployment (Vercel)**

### 3.1 Connect Repository to Vercel
1. Go to **[Vercel](https://vercel.com)**
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect the project structure

### 3.2 Configure Project Settings
**Framework Preset**: Vite
**Root Directory**: `env-direct`
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

### 3.3 Environment Variables
Add in Vercel dashboard:
```env
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

### 3.4 Deploy
- Click "Deploy"
- Vercel will build and deploy automatically
- Get your live URL: `https://environment-direct.vercel.app`

---

## 🔧 **Step 4: Update Backend CORS**

After getting your Vercel URL, update the backend CORS configuration:

1. Edit `backend/src/main/java/com/environmentdirect/config/SecurityConfig.java`
2. Add your Vercel URL to allowed origins:
```java
configuration.setAllowedOrigins(Arrays.asList(
    "https://your-project.vercel.app",  // ← Add your actual Vercel URL
    // ... other URLs
));
```
3. Commit and push:
```bash
git add backend/src/main/java/com/environmentdirect/config/SecurityConfig.java
git commit -m "🔧 Update CORS for Vercel deployment"
git push origin main
```
4. Railway will auto-redeploy the backend

---

## 🧪 **Step 5: Testing & Verification**

### 5.1 Backend Health Check
Test your Railway backend URL:
```bash
curl https://your-backend.up.railway.app/api/live-data
```

Should return environmental data JSON.

### 5.2 Frontend Verification
Visit your Vercel URL and test:
- ✅ Homepage loads correctly
- ✅ Autonomous AI Assistant appears (feather icon)
- ✅ AI chat responds and shows web search
- ✅ Green Atlas Magazine accessible
- ✅ Planetary Intelligence System functional
- ✅ Article submission works
- ✅ Real-time data dashboard updates

### 5.3 Integration Test
- Submit an article through frontend
- Verify it saves to backend
- Test AI chat functionality
- Check console for CORS errors (should be none)

---

## 🔄 **Step 6: Continuous Deployment**

Now set up for automatic deployments:

### Git Workflow
```bash
# Make changes to your code
# ... edit files ...

# Stage changes
git add .

# Commit with descriptive message
git commit -m "✨ Add new environmental intelligence feature"

# Push to main branch
git push origin main
```

### Automatic Deployments
- **Vercel**: Automatically rebuilds frontend on every git push
- **Railway**: Automatically rebuilds backend on every git push
- **Zero downtime**: Both platforms handle deployments seamlessly

---

## 🌍 **Production URLs**

After deployment, you'll have:

```
Frontend:  https://environment-direct.vercel.app
Backend:   https://environment-direct-backend.up.railway.app

API Endpoints:
- Articles: /api/articles
- Live Data: /api/live-data
- AI Chat: /api/chat
- Submit: /api/articles/submit
```

---

## 🚀 **Quick Deploy Commands**

### Complete Deployment Script
```bash
#!/bin/bash

echo "🚀 Deploying Environment Direct to Git + Vercel"

# 1. Commit all changes
git add .
git commit -m "🚀 Deploy: Environment Direct v$(date +%Y%m%d-%H%M%S)"
git push origin main

echo "✅ Code pushed to Git repository"
echo "🔄 Vercel will auto-deploy frontend"
echo "🔄 Railway will auto-deploy backend"
echo ""
echo "🌍 Check deployment status:"
echo "Frontend: https://vercel.com/dashboard"
echo "Backend:  https://railway.app/dashboard"
echo ""
echo "✨ Environment Direct will be live in 2-3 minutes!"
```

---

## 📊 **Deployment Status Dashboard**

### Vercel Dashboard Features
- ✅ Real-time build logs
- ✅ Performance analytics
- ✅ Custom domain support
- ✅ Preview deployments
- ✅ Edge caching globally

### Railway Dashboard Features
- ✅ Application metrics
- ✅ Log streaming
- ✅ Auto-scaling
- ✅ Database connections
- ✅ Custom domains

---

## 🔧 **Advanced Configuration**

### Custom Domain (Optional)
1. **Vercel**: Add custom domain in project settings
2. **Railway**: Add custom domain in service settings
3. Update CORS configuration with new domains

### Environment Management
- **Development**: Local environment with `npm run dev`
- **Preview**: Vercel preview deployments for branches
- **Production**: Main branch auto-deploys to production

### Performance Optimization
- **Frontend**: Vercel Edge Network (global CDN)
- **Backend**: Railway auto-scaling
- **Database**: H2 embedded (upgrade to PostgreSQL if needed)

---

## 📞 **Support & Monitoring**

### Health Monitoring
- **Vercel**: Built-in uptime monitoring
- **Railway**: Application health checks
- **Custom**: Set up status page monitoring

### Troubleshooting
1. **Build failures**: Check Vercel build logs
2. **API errors**: Check Railway application logs
3. **CORS issues**: Verify SecurityConfig.java origins
4. **Environment variables**: Double-check Vercel settings

---

## ✨ **Features Live in Production**

Your deployed platform includes:

### 🤖 **Autonomous AI Assistant**
- Independent web search simulation
- Real-time environmental monitoring
- Natural language processing
- Intelligence gathering capabilities

### 🌍 **Planetary Intelligence System**
- Global environmental command center
- Mission intelligence operations
- Real-time climate analytics
- Interactive global mapping

### 📰 **Green Atlas Magazine**
- Professional editorial platform
- Article submission workflow
- Author verification system
- Content management system

### 📊 **Interactive Dashboards**
- Live climate data visualization
- Regional environmental rankings
- Predictive analytics
- Multi-modal reporting

---

## 🎯 **Expected Production Performance**

- **Load Time**: < 2 seconds globally (Vercel Edge Network)
- **API Response**: < 500ms (Railway optimized JVM)
- **Uptime**: 99.9% (Both platforms SLA)
- **Scalability**: Auto-scaling based on traffic

---

## 🚀 **Ready to Deploy!**

With Git + Vercel deployment, you get:
- ✅ **Version Control**: Full Git history and collaboration
- ✅ **Automatic Deployments**: Push to deploy instantly
- ✅ **Global Performance**: Vercel Edge Network
- ✅ **Zero Downtime**: Seamless deployments
- ✅ **Professional URLs**: Custom domains supported
- ✅ **Monitoring**: Built-in analytics and logs

**Your environmental intelligence platform is ready to change the world!** 🌍✨

Deploy now and start monitoring our planet with cutting-edge AI technology! 