# Environment Direct - Production Deployment Script (PowerShell)
# =============================================================

Write-Host "🚀 Environment Direct - Production Deployment Script" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

function Write-Status {
    param($Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param($Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if we're in the right directory
if (-not (Test-Path "DEPLOYMENT.md")) {
    Write-Error "Please run this script from the root project directory"
    exit 1
}

Write-Status "Starting deployment process..."

# 1. Backend preparation
Write-Status "Preparing backend for deployment..."
Set-Location backend

# Check if JAR exists
if (-not (Test-Path "target/app.jar")) {
    Write-Warning "JAR file not found. Checking if already built..."
    if (Test-Path "target/backend-0.0.1-SNAPSHOT.jar") {
        Write-Success "Backend JAR found: target/backend-0.0.1-SNAPSHOT.jar"
    } else {
        Write-Warning "No JAR files found. Please build backend manually with Maven"
        Write-Host "Run: mvn clean package -DskipTests" -ForegroundColor Magenta
    }
} else {
    Write-Success "Backend JAR found: target/app.jar"
}

Set-Location ..

# 2. Frontend preparation
Write-Status "Preparing frontend for deployment..."
Set-Location env-direct

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Status "Installing frontend dependencies..."
    npm install
}

# Set production environment
Write-Status "Setting production environment..."
"VITE_API_URL=https://environment-direct-backend.up.railway.app" | Out-File -FilePath ".env.production" -Encoding UTF8

# Build frontend
Write-Status "Building frontend for production..."
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Success "Frontend built successfully"
    Write-Success "Build output in: env-direct/dist/"
} else {
    Write-Error "Frontend build failed"
    Set-Location ..
    exit 1
}

Set-Location ..

# 3. Display deployment information
Write-Host ""
Write-Host "🎯 DEPLOYMENT READY!" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host ""
Write-Success "Frontend: env-direct/dist/ ready for Netlify"
Write-Success "Backend: backend/target/ ready for Railway/Render"
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Deploy backend to Railway/Render:" -ForegroundColor White
Write-Host "   - Go to https://railway.app or https://render.com" -ForegroundColor Gray
Write-Host "   - Connect your repository" -ForegroundColor Gray
Write-Host "   - Select 'backend' folder" -ForegroundColor Gray
Write-Host "   - Set environment variables:" -ForegroundColor Gray
Write-Host "     PORT=8080" -ForegroundColor Gray
Write-Host "     SPRING_PROFILES_ACTIVE=prod" -ForegroundColor Gray
Write-Host "     JAVA_OPTS=-Xmx512m -Xms256m" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Deploy frontend to Netlify:" -ForegroundColor White
Write-Host "   - Go to https://app.netlify.com" -ForegroundColor Gray
Write-Host "   - Drag and drop the 'env-direct/dist' folder" -ForegroundColor Gray
Write-Host "   - Or connect Git repository with these settings:" -ForegroundColor Gray
Write-Host "     Base directory: env-direct" -ForegroundColor Gray
Write-Host "     Build command: npm run build" -ForegroundColor Gray
Write-Host "     Publish directory: dist" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Update API URL:" -ForegroundColor White
Write-Host "   - Get your backend URL from Railway/Render" -ForegroundColor Gray
Write-Host "   - Update VITE_API_URL in Netlify environment variables" -ForegroundColor Gray
Write-Host "   - Redeploy frontend" -ForegroundColor Gray
Write-Host ""
Write-Success "All files ready for production deployment!"
Write-Host ""
Write-Host "🌍 Features ready for production:" -ForegroundColor Cyan
Write-Host "- Autonomous AI Assistant with web search" -ForegroundColor White
Write-Host "- Planetary Intelligence System" -ForegroundColor White
Write-Host "- Green Atlas Magazine" -ForegroundColor White
Write-Host "- Real-time climate data dashboard" -ForegroundColor White
Write-Host "- Article submission and approval workflow" -ForegroundColor White
Write-Host "- Interactive maps and visualizations" -ForegroundColor White
Write-Host ""
Write-Warning "Remember to update CORS origins in SecurityConfig.java with your production URLs"

Write-Host ""
Write-Host "🔗 Quick Links:" -ForegroundColor Magenta
Write-Host "- Railway: https://railway.app" -ForegroundColor Blue
Write-Host "- Render: https://render.com" -ForegroundColor Blue
Write-Host "- Netlify: https://app.netlify.com" -ForegroundColor Blue
Write-Host ""
Write-Host "✨ Ready to deploy Environment Direct to the world! ✨" -ForegroundColor Green 