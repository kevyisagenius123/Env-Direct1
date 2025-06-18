# 🚀 Environment Direct - Production Deployment Guide

## Overview
This guide covers deploying Environment Direct to production hosting services with full autonomous AI capabilities.

## 🎯 **Deployment Architecture**
- **Frontend**: Netlify (React + Vite)
- **Backend**: Railway/Render (Spring Boot JAR)
- **Database**: H2 (embedded) - upgradeable to PostgreSQL
- **Features**: Autonomous AI, Web Search, Climate Intelligence

## 📋 **Prerequisites**
- Git repository with latest code
- Netlify account (free tier available)
- Railway account OR Render account (free tier available)
- Domain name (optional)

---

## 🖥️ **Frontend Deployment (Netlify)**

### Option 1: Direct Git Integration
1. **Connect Repository**:
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository
   - Select the `env-direct` folder as build directory

2. **Build Settings**:
   ```
   Build Command: npm run build
   Publish Directory: dist
   Base Directory: env-direct
   ```

3. **Environment Variables**:
   ```
   VITE_API_URL=https://environment-direct-backend.up.railway.app
   ```

### Option 2: Manual Deploy
```bash
cd env-direct
npm install
npm run build
# Upload dist/ folder to Netlify
```

### Custom Domain (Optional)
- Add your domain in Netlify Dashboard
- Configure DNS to point to Netlify

---

## 🔧 **Backend Deployment**

### Option A: Railway (Recommended)

1. **Setup**:
   - Go to [Railway](https://railway.app)
   - Create new project
   - Connect GitHub repository
   - Select `backend` folder

2. **Configuration**:
   - Railway will auto-detect Dockerfile
   - Set environment variables:
     ```
     PORT=8080
     SPRING_PROFILES_ACTIVE=prod
     JAVA_OPTS=-Xmx512m -Xms256m
     ```

3. **Domain**:
   - Railway provides: `https://[app-name].up.railway.app`
   - Custom domain available

### Option B: Render.com

1. **Setup**:
   - Go to [Render](https://render.com)
   - Create new Web Service
   - Connect repository, select `backend` folder

2. **Build Settings**:
   ```
   Build Command: mvn clean package -DskipTests
   Start Command: java -jar target/backend-0.0.1-SNAPSHOT.jar
   ```

3. **Environment Variables**:
   ```
   PORT=8080
   SPRING_PROFILES_ACTIVE=prod
   JAVA_OPTS=-Xmx512m -Xms256m
   ```

---

## 🔗 **CORS Configuration**

The backend is pre-configured with these production URLs:
- `https://environment-direct.netlify.app`
- `https://env-direct.netlify.app`
- `https://environment-direct-frontend.netlify.app`

Update `SecurityConfig.java` if using different URLs.

---

## 🛠️ **Database Configuration**

### Current: H2 Embedded
- ✅ Works out of the box
- ✅ No additional setup required
- ✅ Sample data pre-seeded
- ⚠️ Data resets on restart

### Upgrade to PostgreSQL (Optional)
```yaml
# Add to application-prod.properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

---

## 🌐 **Expected URLs**

### Production URLs:
- **Frontend**: `https://environment-direct.netlify.app`
- **Backend**: `https://environment-direct-backend.up.railway.app`

### API Endpoints:
- Articles: `https://environment-direct-backend.up.railway.app/api/articles`
- Live Data: `https://environment-direct-backend.up.railway.app/api/live-data`
- Chat AI: `https://environment-direct-backend.up.railway.app/api/chat`

---

## 🧪 **Testing Deployment**

1. **Frontend Health Check**:
   - Visit your Netlify URL
   - Verify all pages load
   - Test autonomous AI assistant
   - Check magazine and intelligence features

2. **Backend Health Check**:
   - Test: `https://your-backend-url/api/live-data`
   - Verify: Returns environmental data JSON
   - Check: All endpoints respond correctly

3. **Integration Test**:
   - Submit an article through frontend
   - Verify it appears in backend
   - Test AI chat functionality
   - Confirm real-time data updates

---

## ⚡ **Features Available in Production**

### 🤖 Autonomous AI Assistant
- Independent web search simulation
- Environmental trend monitoring
- Real-time intelligence gathering
- Cross-reference capabilities

### 🌍 Environmental Intelligence Platform
- Live climate data dashboard
- Planetary intelligence system
- Global operations mapping
- Predictive analytics

### 📰 Green Atlas Magazine
- Article submission workflow
- Editorial approval system
- Real-time content management
- Author verification system

### 📊 Interactive Components
- Climate data visualization
- Regional rankings
- Prediction algorithms
- Multi-modal reporting

---

## 🔧 **Troubleshooting**

### CORS Issues
- Verify frontend URL is added to `SecurityConfig.java`
- Rebuild and redeploy backend

### Build Failures
- Check Node.js version (recommend 18+)
- Clear npm cache: `npm cache clean --force`
- Verify all dependencies are installed

### API Connection Issues
- Confirm `VITE_API_URL` environment variable
- Test backend endpoint directly
- Check browser console for errors

---

## 📈 **Performance Optimization**

### Frontend
- Automatic code splitting enabled
- Vendor chunk optimization
- Asset compression via Netlify
- CDN distribution

### Backend
- JVM memory optimization: `-Xmx512m -Xms256m`
- Connection pooling enabled
- Gzip compression active
- Health check endpoints configured

---

## 🚀 **Deployment Commands Summary**

### Quick Deploy Frontend:
```bash
cd env-direct
echo "VITE_API_URL=https://environment-direct-backend.up.railway.app" > .env.production
npm install
npm run build
# Deploy dist/ to Netlify
```

### Quick Deploy Backend:
```bash
cd backend
# Push to Railway/Render git integration
# Or build JAR locally and upload
mvn clean package -DskipTests
```

---

## 📞 **Support & Monitoring**

- **Health Endpoints**: `/api/live-data` for backend monitoring
- **Error Logging**: Check hosting service logs
- **Performance**: Monitor through Netlify/Railway dashboards
- **Uptime**: Configure status page monitoring

The entire Environment Direct platform with autonomous AI capabilities is now ready for production deployment! 🌍✨ 