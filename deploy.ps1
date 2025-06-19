# Green Atlas Magazine - Automated Deployment Script
# Environment Direct - Trillion-Dollar Environmental Editorial Institution

Write-Host "🌍 Green Atlas Magazine - Production Deployment" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed!" -ForegroundColor Red
    exit 1
}

Write-Host "🔨 Building production version..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Production build: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin main

Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to render.com and create a new Static Site" -ForegroundColor White
Write-Host "2. Connect your GitHub repo: kevyisagenius123/Env-Direct1" -ForegroundColor White
Write-Host "3. Use these settings:" -ForegroundColor White
Write-Host "   - Branch: main" -ForegroundColor Gray
Write-Host "   - Build Command: npm install && npm run build" -ForegroundColor Gray
Write-Host "   - Publish Directory: dist" -ForegroundColor Gray
Write-Host "4. Add environment variable: VITE_API_URL=https://environment-direct-backend.up.railway.app" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Alternative platforms:" -ForegroundColor Cyan
Write-Host "• Vercel: vercel.com (auto-detects Vite)" -ForegroundColor White
Write-Host "• Netlify: netlify.com (drag & drop dist folder)" -ForegroundColor White
Write-Host ""
Write-Host "🌟 Green Atlas Magazine will be live shortly!" -ForegroundColor Green 