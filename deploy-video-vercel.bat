@echo off
echo 🎥 Deploying Video Interview to Vercel...

echo.
echo Installing Vercel CLI (if not installed)
npm install -g vercel

echo.
echo Deploying video interview app
cd video-interview
vercel --prod

echo.
echo ✅ Video interview deployment complete!
pause