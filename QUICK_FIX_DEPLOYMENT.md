# 🚨 Quick Fix for 404 Error

## The Problem
Vercel is trying to deploy from the root directory instead of the `frontend` directory, causing a 404 error.

## ✅ Quick Solution

### Option 1: Redeploy with Correct Settings

1. **Go to your Vercel Dashboard**
2. **Delete the current deployment** (if it exists)
3. **Create New Project**
4. **Import your GitHub repository**
5. **IMPORTANT: Configure these settings:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` ← THIS IS CRUCIAL
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

6. **Add Environment Variables:**
   - `NEXTAUTH_URL` = `https://your-vercel-url.vercel.app` (you'll get this after deploy)
   - `NEXTAUTH_SECRET` = `hirevia-super-secret-production-key-2024`
   - `NEXT_PUBLIC_API_URL` = `http://localhost:8081/api` (temporary - we'll fix this)

7. **Deploy**

### Option 2: Use Vercel CLI (Faster)

```bash
# Install Vercel CLI
npm install -g vercel

# Go to frontend directory
cd frontend

# Deploy
vercel --prod

# Follow the prompts:
# - Link to existing project? No
# - Project name: hirevia-frontend
# - Directory: ./
# - Override settings? No
```

## 🎯 What I Fixed

1. **Fixed all API routes** to use environment variables instead of hardcoded localhost
2. **Added proper Vercel configuration**
3. **Updated environment variables**

## 🚀 After Frontend Deploys Successfully

1. **Copy your Vercel URL**
2. **Deploy backend to Heroku**: Run `deploy-backend-heroku.bat`
3. **Update environment variables** in Vercel with your Heroku backend URL
4. **Deploy video interview**: Run `deploy-video-vercel.bat`

## 🔧 If Still Getting 404

The issue is that Vercel is trying to deploy the wrong directory. Make sure:
- **Root Directory** is set to `frontend` in Vercel settings
- **Framework** is set to Next.js
- **Build Command** is `npm run build`

## 📱 Test URLs After Deployment

- **Homepage**: `https://your-app.vercel.app`
- **Login**: `https://your-app.vercel.app/simple-login`
- **Register**: `https://your-app.vercel.app/register`
- **Dashboard**: `https://your-app.vercel.app/dashboard`

The 404 error should be completely resolved once you deploy from the correct `frontend` directory! 🎉