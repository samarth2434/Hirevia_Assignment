# 🚀 Quick Heroku Deployment (Most Reliable)

Since Railway and Render are having issues, let's use Heroku which works great with Java:

## Step 1: Install Heroku CLI
Download from: https://devcenter.heroku.com/articles/heroku-cli

## Step 2: Deploy Backend to Heroku

```bash
# Login to Heroku
heroku login

# Create Heroku app for backend
cd backend
heroku create your-hirevia-backend

# Set environment variables
heroku config:set SPRING_PROFILES_ACTIVE=prod

# Deploy
git init
git add .
git commit -m "Deploy backend to Heroku"
heroku git:remote -a your-hirevia-backend
git push heroku main
```

## Step 3: Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd ../frontend
vercel --prod
```

## Step 4: Deploy Video Interview to Vercel

```bash
cd ../video-interview
vercel --prod
```

## Step 5: Update Environment Variables

In Vercel dashboard, update your frontend environment variables:
- `NEXT_PUBLIC_API_URL` = `https://your-hirevia-backend.herokuapp.com/api`

## ✅ Done!

Your app will be live at:
- Frontend: https://your-frontend.vercel.app
- Backend: https://your-hirevia-backend.herokuapp.com
- Video: https://your-video.vercel.app