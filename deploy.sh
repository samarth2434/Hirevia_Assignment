#!/bin/bash

echo "🚀 Hirevia Deployment Helper"
echo ""

echo "📋 Pre-deployment checklist:"
echo "1. Make sure you have GitHub, Vercel, and Railway accounts"
echo "2. Your code should be committed to Git"
echo "3. Follow the instructions in deploy-instructions.md"
echo ""

echo "🔧 Testing builds locally first..."
echo ""

echo "Testing Frontend build..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed! Fix errors before deploying."
    exit 1
fi
cd ..

echo "Testing Video Interview build..."
cd video-interview
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Video Interview build failed! Fix errors before deploying."
    exit 1
fi
cd ..

echo "Testing Backend build..."
cd backend
./mvnw clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed! Fix errors before deploying."
    exit 1
fi
cd ..

echo ""
echo "✅ All builds successful!"
echo "📖 Now follow the step-by-step instructions in deploy-instructions.md"
echo ""