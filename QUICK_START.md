# Quick Start - Frontend & Backend Connection

## ✅ What's Done

1. **Backend Deployed**: https://hirevia-assignment-3.onrender.com
2. **CORS Configured**: Backend allows Vercel/Netlify origins
3. **Frontend API Updated**: Points to production backend
4. **Environment Variables**: Configured for production

## 🚀 Deploy Frontend Now

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

**Set these environment variables in Vercel dashboard:**
- `NEXT_PUBLIC_API_URL` = `https://hirevia-assignment-3.onrender.com/api`
- `NEXTAUTH_URL` = Your Vercel URL (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET` = `hirevia-super-secret-production-key-2024`

### Option 2: Use Deploy Script

```bash
deploy-frontend-production.bat
```

## 🧪 Test Backend Connection

```bash
test-backend-connection.bat
```

Or manually test:
```bash
curl https://hirevia-assignment-3.onrender.com/health
```

## 📝 Test Credentials

- **User**: `testuser` / `password123`
- **Admin**: `admin` / `admin123`

## 📚 Documentation

- **Full Deployment Guide**: `DEPLOYMENT_GUIDE.md`
- **Connection Details**: `FRONTEND_BACKEND_CONNECTION.md`

## 🔍 Quick Test After Deployment

1. Visit your frontend URL
2. Go to `/mock-login`
3. Login with `testuser` / `password123`
4. Navigate to `/dashboard`
5. Try `/assessment` to submit an assessment
6. Login as `admin` / `admin123` to see admin features

## ⚠️ Important Notes

1. **Render Free Tier**: Backend may sleep after inactivity (30-60s to wake up)
2. **CORS**: Already configured for `*.vercel.app` and `*.netlify.app`
3. **HTTPS**: Both frontend and backend use HTTPS in production
4. **Environment Variables**: Must be set in Vercel/Netlify dashboard

## 🆘 Troubleshooting

### Backend not responding?
- Check Render dashboard: https://dashboard.render.com
- Wait 30-60 seconds for free tier to wake up

### CORS errors?
- Verify your frontend URL matches `*.vercel.app` or `*.netlify.app`
- Check browser console for exact error

### 401 Unauthorized?
- Verify credentials: `testuser` / `password123`
- Check that you're logged in via `/mock-login`

## 📞 Support

Check these files for detailed help:
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `FRONTEND_BACKEND_CONNECTION.md` - Technical connection details
- `SETUP.md` - Local development setup
