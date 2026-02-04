@echo off
echo 🚀 Deploying Backend to Heroku...

echo.
echo Step 1: Login to Heroku
heroku login

echo.
echo Step 2: Create Heroku app
cd backend
heroku create hirevia-backend-%RANDOM%

echo.
echo Step 3: Set environment variables
heroku config:set SPRING_PROFILES_ACTIVE=prod

echo.
echo Step 4: Initialize git and deploy
git init
git add .
git commit -m "Deploy Hirevia backend to Heroku"
git push heroku main

echo.
echo ✅ Backend deployment complete!
echo Check your Heroku dashboard for the live URL
pause