#!/bin/bash

echo "🚀 Environment Direct - Production Deployment Script"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "DEPLOYMENT.md" ]; then
    print_error "Please run this script from the root project directory"
    exit 1
fi

print_status "Starting deployment process..."

# 1. Backend preparation
print_status "Preparing backend for deployment..."
cd backend

# Check if JAR exists
if [ ! -f "target/app.jar" ]; then
    print_warning "JAR file not found. Building backend..."
    if command -v mvn &> /dev/null; then
        mvn clean package -DskipTests
        if [ $? -eq 0 ]; then
            print_success "Backend built successfully"
        else
            print_error "Backend build failed"
            exit 1
        fi
    else
        print_error "Maven not found. Please build backend manually or install Maven"
        exit 1
    fi
else
    print_success "Backend JAR found: target/app.jar"
fi

cd ..

# 2. Frontend preparation
print_status "Preparing frontend for deployment..."
cd env-direct

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
fi

# Set production environment
print_status "Setting production environment..."
echo "VITE_API_URL=https://environment-direct-backend.up.railway.app" > .env.production

# Build frontend
print_status "Building frontend for production..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Frontend built successfully"
    print_success "Build output in: env-direct/dist/"
else
    print_error "Frontend build failed"
    exit 1
fi

cd ..

# 3. Display deployment information
echo ""
echo "🎯 DEPLOYMENT READY!"
echo "==================="
echo ""
print_success "Frontend: env-direct/dist/ ready for Netlify"
print_success "Backend: backend/target/app.jar ready for Railway/Render"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy backend to Railway/Render:"
echo "   - Go to https://railway.app or https://render.com"
echo "   - Connect your repository"
echo "   - Select 'backend' folder"
echo "   - Set environment variables:"
echo "     PORT=8080"
echo "     SPRING_PROFILES_ACTIVE=prod"
echo "     JAVA_OPTS=-Xmx512m -Xms256m"
echo ""
echo "2. Deploy frontend to Netlify:"
echo "   - Go to https://app.netlify.com"
echo "   - Drag and drop the 'env-direct/dist' folder"
echo "   - Or connect Git repository with these settings:"
echo "     Base directory: env-direct"
echo "     Build command: npm run build"
echo "     Publish directory: dist"
echo ""
echo "3. Update API URL:"
echo "   - Get your backend URL from Railway/Render"
echo "   - Update VITE_API_URL in Netlify environment variables"
echo "   - Redeploy frontend"
echo ""
print_success "All files ready for production deployment!"
echo ""
echo "🌍 Features ready for production:"
echo "- Autonomous AI Assistant with web search"
echo "- Planetary Intelligence System"
echo "- Green Atlas Magazine"
echo "- Real-time climate data dashboard"
echo "- Article submission and approval workflow"
echo "- Interactive maps and visualizations"
echo ""
print_warning "Remember to update CORS origins in SecurityConfig.java with your production URLs" 