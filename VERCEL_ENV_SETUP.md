# Vercel Environment Variables Setup

## 🚨 CRITICAL: Set These in Vercel Dashboard

Your frontend needs these environment variables to connect to the backend.

## Step-by-Step Instructions

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### 2. Select Your Project
Click on: **hirevia-assignment**

### 3. Go to Settings
Click: **Settings** tab → **Environment Variables**

### 4. Add These Variables

#### Variable 1: API URL
```
Name: NEXT_PUBLIC_API_URL
Value: https://hirevia-assignment-3.onrender.com/api
Environment: Production, Preview, Development
```

#### Variable 2: NextAuth URL
```
Name: NEXTAUTH_URL
Value: https://hirevia-assignment.vercel.app
Environment: Production
```

#### Variable 3: NextAuth Secret
```
Name: NEXTAUTH_SECRET
Value: hirevia-super-secret-production-key-2024
Environment: Production, Preview, Development
```

### 5. Redeploy Frontend

After adding variables, you MUST redeploy:

**Option A: Via Vercel Dashboard**
1. Go to **Deployments** tab
2. Click the three dots (...) on latest deployment
3. Click **Redeploy**

**Option B: Via Git Push**
```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

**Option C: Via Vercel CLI**
```bash
cd frontend
vercel --prod
```

## 📋 Copy-Paste Values

For easy copy-paste:

```
NEXT_PUBLIC_API_URL=https://hirevia-assignment-3.onrender.com/api
NEXTAUTH_URL=https://hirevia-assignment.vercel.app
NEXTAUTH_SECRET=hirevia-super-secret-production-key-2024
```

## ✅ Verify Variables Are Set

After setting and redeploying:

1. Go to your frontend: https://hirevia-assignment.vercel.app/
2. Open browser DevTools (F12)
3. Go to Console tab
4. Type: `console.log(process.env.NEXT_PUBLIC_API_URL)`
5. Should show: `https://hirevia-assignment-3.onrender.com/api`

## 🎯 What Each Variable Does

### NEXT_PUBLIC_API_URL
- **Purpose**: Tells frontend where backend API is located
- **Used by**: `frontend/lib/api.ts`
- **Must start with**: `NEXT_PUBLIC_` (to be accessible in browser)

### NEXTAUTH_URL
- **Purpose**: Base URL for NextAuth authentication
- **Used by**: NextAuth library
- **Should match**: Your Vercel deployment URL

### NEXTAUTH_SECRET
- **Purpose**: Secret key for encrypting session tokens
- **Used by**: NextAuth library
- **Security**: Keep this secret, don't commit to git

## 🔍 Troubleshooting

### Variables Not Working?

1. **Check spelling**: Variable names are case-sensitive
2. **Redeploy**: Variables only apply after redeployment
3. **Clear cache**: Clear browser cache and reload
4. **Check environment**: Make sure variables are set for "Production"

### Still Using Localhost?

If API calls go to `localhost:8081`:
1. Variables aren't set correctly
2. Frontend hasn't been redeployed
3. Browser is caching old code

### CORS Errors?

If you see CORS errors:
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check backend is running on Render
3. Backend CORS already allows `*.vercel.app`

## 📸 Screenshot Guide

### Where to Add Variables

```
Vercel Dashboard
  └── Your Project (hirevia-assignment)
      └── Settings
          └── Environment Variables
              └── [Add New] button
                  ├── Name: NEXT_PUBLIC_API_URL
                  ├── Value: https://hirevia-assignment-3.onrender.com/api
                  └── Environment: ☑ Production ☑ Preview ☑ Development
```

## ⚡ Quick Test After Setup

1. Visit: https://hirevia-assignment.vercel.app/mock-login
2. Login with: `testuser` / `password123`
3. Should redirect to dashboard
4. Check browser Network tab - API calls should go to Render backend

## 🎉 Success!

You'll know it's working when:
- No CORS errors
- Login works
- Dashboard loads
- API calls go to `hirevia-assignment-3.onrender.com`
