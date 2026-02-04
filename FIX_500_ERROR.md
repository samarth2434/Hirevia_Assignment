# Fix for 500 Error - API URL Issue

## Problem

Login was failing with 500 error because requests were going to:
```
POST https://hirevia-assignment.vercel.app/api/auth/login
```

Instead of the backend:
```
POST https://hirevia-assignment-3.onrender.com/api/auth/login
```

## Root Cause

Two issues:

1. **`mockAuth.ts` used relative URL**: `private baseUrl = '/api'`
   - This made requests go to the same domain (Vercel)
   - Should use environment variable to point to backend

2. **Next.js rewrite was interfering**: The rewrite in `next.config.js` was trying to proxy requests

## Solution Applied

### 1. Fixed `mockAuth.ts`
Changed from:
```typescript
private baseUrl = '/api';
```

To:
```typescript
private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';
```

Also added:
- `credentials: 'include'` for CORS
- Better error logging
- Console log to show which URL is being used

### 2. Removed Next.js Rewrite
Removed the `rewrites()` function from `next.config.js` to prevent interference.

## ✅ Changes Pushed

The fix has been pushed to GitHub and will trigger:
- Vercel to redeploy frontend automatically
- Frontend will now use the correct backend URL

## 🚨 STILL REQUIRED: Set Vercel Environment Variables

**You MUST set this in Vercel dashboard:**

1. Go to: https://vercel.com/dashboard
2. Select: **hirevia-assignment**
3. Go to: **Settings** → **Environment Variables**
4. Add:

```
NEXT_PUBLIC_API_URL=https://hirevia-assignment-3.onrender.com/api
```

5. **Redeploy** (or wait for automatic redeploy from git push)

## 🧪 Test After Vercel Redeploys

### 1. Check Console Logs
Open browser DevTools and you should see:
```
Login URL: https://hirevia-assignment-3.onrender.com/api/auth/login
```

### 2. Test Login
1. Visit: https://hirevia-assignment.vercel.app/mock-login
2. Login: `testuser` / `password123`
3. Should work without 500 error

### 3. Verify Network Tab
- Request should go to `hirevia-assignment-3.onrender.com`
- Status should be 200 (not 500)
- No CORS errors

## 📊 Request Flow (Fixed)

```
User enters credentials
    ↓
Frontend calls mockAuth.login()
    ↓
Uses NEXT_PUBLIC_API_URL from env
    ↓
POST https://hirevia-assignment-3.onrender.com/api/auth/login
    ↓
Backend validates credentials
    ↓
Returns 200 with token
    ↓
Frontend stores in localStorage
    ↓
Redirects to dashboard
```

## 🔍 How to Verify It's Fixed

After Vercel redeploys, check browser console:

**Before (Wrong)**:
```
POST https://hirevia-assignment.vercel.app/api/auth/login 500
```

**After (Correct)**:
```
Login URL: https://hirevia-assignment-3.onrender.com/api/auth/login
POST https://hirevia-assignment-3.onrender.com/api/auth/login 200
```

## ⏱️ Timeline

1. ✅ Code fixed and pushed (Done)
2. ⏳ Vercel auto-redeploys (~2-3 minutes)
3. ⏳ Set environment variable in Vercel
4. ⏳ Redeploy again if needed
5. ⏳ Test login

## 🎯 Quick Checklist

- [x] Fixed mockAuth.ts to use environment variable
- [x] Removed Next.js rewrite
- [x] Added credentials: 'include' for CORS
- [x] Added console logging for debugging
- [x] Pushed to GitHub
- [ ] Wait for Vercel redeploy
- [ ] Set NEXT_PUBLIC_API_URL in Vercel
- [ ] Test login

## 📞 If Still Not Working

1. **Check Vercel deployment logs** for any build errors
2. **Verify environment variable** is set correctly
3. **Clear browser cache** and reload
4. **Check browser console** for the "Login URL" log
5. **Check Network tab** to see where request goes

## 🎉 Success Indicators

- ✅ Console shows: `Login URL: https://hirevia-assignment-3.onrender.com/api/auth/login`
- ✅ Network tab shows request to Render backend
- ✅ Login returns 200 status
- ✅ Redirects to dashboard
- ✅ No 500 errors
- ✅ No CORS errors
