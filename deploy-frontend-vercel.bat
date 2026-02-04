@echo off
echo 🚀 Deploying Frontend to Vercel (Fixed Version)...

echo.
echo Step 1: Installing Vercel CLI...
npm install -g vercel

echo.
echo Step 2: Going to frontend directory...
cd frontend

echo.
echo Step 3: Deploying to Vercel...
echo IMPORTANT: When prompted, make sure to:
echo - Set framework to Next.js
echo - Keep root directory as current (./)
echo - Use default build settings
echo.
vercel --prod

echo.
echo ✅ Frontend deployment complete!
echo.
echo Next steps:
echo 1. Copy the Vercel URL you receive
echo 2. Test the homepage
echo 3. If it works, we'll deploy the backend next
echo.
pause