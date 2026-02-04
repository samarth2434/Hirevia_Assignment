@echo off
echo ========================================
echo   Deploying Frontend to Vercel
echo ========================================
echo.

cd frontend

echo Setting environment variables...
echo NEXT_PUBLIC_API_URL=https://hirevia-assignment-3.onrender.com/api
echo.

echo Installing dependencies...
call npm install
echo.

echo Building application...
call npm run build
echo.

echo Deploying to Vercel...
echo Make sure you have Vercel CLI installed: npm i -g vercel
echo.
call vercel --prod
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Remember to set these environment variables in Vercel dashboard:
echo   NEXTAUTH_URL=https://your-app-name.vercel.app
echo   NEXTAUTH_SECRET=hirevia-super-secret-production-key-2024
echo   NEXT_PUBLIC_API_URL=https://hirevia-assignment-3.onrender.com/api
echo.

cd ..
pause
