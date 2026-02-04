# Verify Frontend-Backend Connection

## Your Deployment URLs

- **Frontend**: https://hirevia-assignment.vercel.app/
- **Backend**: https://hirevia-assignment-3.onrender.com/

## ✅ Configuration Status

### Backend CORS
- ✅ Configured to allow `*.vercel.app`
- ✅ Allows credentials
- ✅ Allows all HTTP methods

### Frontend API
- ✅ Points to `https://hirevia-assignment-3.onrender.com/api`
- ✅ Sends credentials with requests
- ✅ Handles authentication

## 🔧 Vercel Environment Variables

**IMPORTANT**: You must set these in your Vercel dashboard:

1. Go to: https://vercel.com/dashboard
2. Select your project: `hirevia-assignment`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
NEXT_PUBLIC_API_URL=https://hirevia-assignment-3.onrender.com/api
NEXTAUTH_URL=https://hirevia-assignment.vercel.app
NEXTAUTH_SECRET=hirevia-super-secret-production-key-2024
```

5. **Redeploy** your frontend after adding variables

## 🧪 Test the Connection

### Step 1: Test Backend Directly

```bash
# Test backend is running
curl https://hirevia-assignment-3.onrender.com/

# Test health endpoint
curl https://hirevia-assignment-3.onrender.com/health

# Test login endpoint
curl -X POST https://hirevia-assignment-3.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Step 2: Test Frontend Pages

Visit these URLs in your browser:

1. **Home Page**: https://hirevia-assignment.vercel.app/
   - Should load without errors

2. **Mock Login**: https://hirevia-assignment.vercel.app/mock-login
   - Login with: `testuser` / `password123`
   - Should redirect to dashboard

3. **Dashboard**: https://hirevia-assignment.vercel.app/dashboard
   - Should show user info after login

4. **Assessment**: https://hirevia-assignment.vercel.app/assessment
   - Should allow submitting assessments

5. **Admin** (login as admin): https://hirevia-assignment.vercel.app/admin
   - Login with: `admin` / `admin123`
   - Should show admin features

### Step 3: Check Browser Console

Open browser DevTools (F12) and check:

1. **Network Tab**:
   - API calls should go to `hirevia-assignment-3.onrender.com`
   - Status should be 200 (not 401 or CORS errors)
   - Response headers should include CORS headers

2. **Console Tab**:
   - No CORS errors
   - No 401 errors (unless not logged in)

## 🐛 Troubleshooting

### Issue: CORS Error

**Symptom**: 
```
Access to XMLHttpRequest at 'https://hirevia-assignment-3.onrender.com/api/...' 
from origin 'https://hirevia-assignment.vercel.app' has been blocked by CORS policy
```

**Solution**:
1. Backend CORS is already configured for `*.vercel.app`
2. Check that backend is running (may take 30-60s to wake up)
3. Verify the request includes credentials

### Issue: 401 Unauthorized

**Symptom**: API returns 401 status

**Solution**:
1. Make sure you're logged in via `/mock-login`
2. Check localStorage has `mock_user` and `mock_token`
3. Verify credentials: `testuser`/`password123` or `admin`/`admin123`

### Issue: Environment Variables Not Working

**Symptom**: API calls go to wrong URL or localhost

**Solution**:
1. Set environment variables in Vercel dashboard
2. Redeploy frontend after setting variables
3. Clear browser cache and reload

### Issue: Backend Not Responding

**Symptom**: Network timeout or connection refused

**Solution**:
1. Render free tier sleeps after inactivity
2. First request takes 30-60 seconds to wake up
3. Check Render dashboard for backend status

## 📋 Quick Verification Checklist

- [ ] Backend is live at https://hirevia-assignment-3.onrender.com/
- [ ] Frontend is live at https://hirevia-assignment.vercel.app/
- [ ] Vercel environment variables are set
- [ ] Frontend has been redeployed after setting env vars
- [ ] Can access backend root endpoint
- [ ] Can access backend health endpoint
- [ ] Can login via frontend `/mock-login`
- [ ] Dashboard loads after login
- [ ] Can submit assessment
- [ ] Admin features work with admin login

## 🎯 Test Credentials

### Regular User
- Username: `testuser`
- Password: `password123`
- Role: USER

### Admin User
- Username: `admin`
- Password: `admin123`
- Roles: USER, ADMIN

## 🔍 Verify CORS Headers

Test CORS with curl:

```bash
curl -X OPTIONS https://hirevia-assignment-3.onrender.com/api/auth/login \
  -H "Origin: https://hirevia-assignment.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Should see these headers in response:
```
Access-Control-Allow-Origin: https://hirevia-assignment.vercel.app
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

## 📊 Expected API Flow

```
User visits frontend
    ↓
Goes to /mock-login
    ↓
Enters credentials
    ↓
Frontend sends POST to backend/api/auth/login
    ↓
Backend validates credentials
    ↓
Returns user data
    ↓
Frontend stores in localStorage
    ↓
Subsequent requests include Authorization header
    ↓
Backend validates and returns data
```

## 🚀 Next Steps After Verification

1. ✅ Verify connection works
2. Test all features (login, dashboard, assessment, admin)
3. Check error handling
4. Test with both user and admin accounts
5. Monitor backend logs on Render
6. Monitor frontend logs on Vercel

## 📞 Support

If issues persist:
1. Check Render logs: https://dashboard.render.com
2. Check Vercel logs: https://vercel.com/dashboard
3. Use browser DevTools Network tab
4. Check this documentation

## 🎉 Success Indicators

You'll know it's working when:
- ✅ No CORS errors in browser console
- ✅ Login redirects to dashboard
- ✅ User info displays correctly
- ✅ Assessments can be submitted
- ✅ Admin features accessible with admin account
- ✅ API calls return 200 status
- ✅ No 401 errors when logged in
