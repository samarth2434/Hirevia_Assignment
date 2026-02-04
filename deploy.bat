@echo off
echo 🚀 Hirevia Deployment Helper
echo.

echo 📋 Pre-deployment checklist:
echo 1. Make sure you have GitHub, Vercel, and Railway accounts
echo 2. Your code should be committed to Git
echo 3. Follow the instructions in deploy-instructions.md
echo.

echo 🔧 Testing builds locally first...
echo.

echo Testing Frontend build...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed! Fix errors before deploying.
    pause
    exit /b 1
)
cd ..

echo Testing Video Interview build...
cd video-interview
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Video Interview build failed! Fix errors before deploying.
    pause
    exit /b 1
)
cd ..

echo Testing Backend build...
cd backend
call mvnw.cmd clean package -DskipTests
if %errorlevel% neq 0 (
    echo ❌ Backend build failed! Fix errors before deploying.
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ All builds successful! 
echo 📖 Now follow the step-by-step instructions in deploy-instructions.md
echo.
pause