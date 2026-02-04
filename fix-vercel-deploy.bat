@echo off
echo 🚀 Fixing Vercel Deployment...

echo.
echo Installing Vercel CLI...
npm install -g vercel

echo.
echo Deploying from correct frontend directory...
cd frontend
vercel --prod

echo.
echo ✅ Deployment should work now!
echo Make sure to set environment variables in Vercel dashboard
pause