# 🚀 Step-by-Step Deployment Instructions

Follow these exact steps to deploy your Hirevia app:

## Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free)

## Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Hirevia Interview Platform"
   ```

2. **Create GitHub Repository**:
   - Go to GitHub.com
   - Click "New Repository"
   - Name it "hirevia-interview-platform"
   - Don't initialize with README (you already have one)
   - Click "Create Repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/hirevia-interview-platform.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy Backend to Railway

1. **Go to Railway.app**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Select the backend folder** or create a new service
7. **Configure the service**:
   - **Root Directory**: `backend`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -Dspring.profiles.active=prod -jar target/auth-backend-0.0.1-SNAPSHOT.jar`
8. **Add Environment Variables**:
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `PORT` = `8080`
9. **Deploy** and wait for it to finish
10. **Copy the Railway URL** (something like: `https://your-app-name.railway.app`)

## Step 3: Deploy Frontend to Vercel

1. **Go to Vercel.com**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. **Add Environment Variables**:
   - `NEXTAUTH_URL` = `https://your-vercel-app.vercel.app` (you'll get this after deployment)
   - `NEXTAUTH_SECRET` = `hirevia-super-secret-production-key-2024`
   - `NEXT_PUBLIC_API_URL` = `https://your-railway-backend-url.railway.app/api`
7. **Deploy** and wait for it to finish
8. **Copy the Vercel URL**

## Step 4: Deploy Video Interview to Vercel

1. **In Vercel Dashboard**, click "New Project" again
2. **Import the same GitHub repository**
3. **Configure the project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `video-interview`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. **Deploy** and get the video interview URL

## Step 5: Update Environment Variables

1. **Go back to your Frontend project in Vercel**
2. **Settings → Environment Variables**
3. **Update** `NEXTAUTH_URL` with your actual Vercel URL
4. **Add** `NEXT_PUBLIC_VIDEO_INTERVIEW_URL` with your video interview URL
5. **Redeploy** the frontend

## Step 6: Test Your Deployment

1. **Visit your frontend URL**
2. **Test login** with:
   - Username: `testuser`, Password: `password123`
   - Username: `admin`, Password: `admin123`
3. **Test all features**:
   - Dashboard
   - Assessment form
   - Video interview (click the video interview button)
   - Admin panel (if logged in as admin)

## 🎉 Your App is Live!

Your URLs will be:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-backend-name.railway.app`
- **Video Interview**: `https://your-video-name.vercel.app`

## 🔧 If Something Goes Wrong

### Backend Issues:
1. Check Railway logs in the dashboard
2. Make sure Java 17 is being used
3. Verify environment variables are set

### Frontend Issues:
1. Check Vercel function logs
2. Verify all environment variables are set
3. Make sure API URL points to your Railway backend

### CORS Issues:
If you get CORS errors, update your backend CORS configuration to include your Vercel domains.

## 📱 Share Your App

Once deployed, you can:
- Add the URLs to your resume
- Share with potential employers
- Include in your portfolio
- Use for technical interviews

**Congratulations! Your Hirevia Interview Platform is now live! 🚀**