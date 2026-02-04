# Deployment Guide - Frontend & Backend Connection

## Backend Deployment (Render) ✅

Your backend is deployed at: **https://hirevia-assignment-3.onrender.com**

### Backend Configuration
- **Profile**: `prod` (set via environment variable)
- **Port**: Dynamic (set by Render via `$PORT`)
- **CORS**: Configured to allow Vercel and Netlify deployments
- **Database**: H2 in-memory (for testing)

### Backend Endpoints
All endpoints are prefixed with `/api`:
- `POST /api/auth/login` - Mock login
- `POST /api/auth/register` - Mock registration
- `GET /api/user/profile` - Get user profile (requires USER role)
- `GET /api/admin/users` - Get all users (requires ADMIN role)
- `POST /api/submit-assessment` - Submit assessment (requires USER role)
- `GET /api/my-assessments` - Get user's assessments (requires USER role)
- `GET /api/assessments` - Get all assessments (requires ADMIN role)
- `GET /api/assessment-stats` - Get assessment statistics (requires ADMIN role)

### Test Credentials
- **User**: `testuser` / `password123`
- **Admin**: `admin` / `admin123`

## Frontend Deployment (Vercel/Netlify)

### Step 1: Update Environment Variables

When deploying to Vercel or Netlify, set these environment variables:

```env
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=hirevia-super-secret-production-key-2024
NEXT_PUBLIC_API_URL=https://hirevia-assignment-3.onrender.com/api
```

### Step 2: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel --prod
```

During deployment, Vercel will ask you to set environment variables. Use the values above.

### Step 3: Deploy to Netlify (Alternative)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to frontend directory
cd frontend

# Build
npm run build

# Deploy
netlify deploy --prod
```

## Testing the Connection

### 1. Test Backend Health
```bash
curl https://hirevia-assignment-3.onrender.com/health
```

### 2. Test Backend API
```bash
# Login
curl -X POST https://hirevia-assignment-3.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Get user profile (with basic auth)
curl https://hirevia-assignment-3.onrender.com/api/user/profile \
  -u testuser:password123
```

### 3. Test Frontend Connection
Once deployed, visit your frontend URL and:
1. Go to `/mock-login`
2. Login with `testuser` / `password123`
3. Navigate to `/dashboard`
4. Try submitting an assessment at `/assessment`

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
1. Check that your frontend URL matches the pattern in backend CORS config
2. Verify `withCredentials: true` is set in axios config
3. Ensure backend allows your frontend origin pattern

### 401 Unauthorized
If you get 401 errors:
1. Check that credentials are being sent correctly
2. Verify the Authorization header format: `Basic base64(username:password)`
3. Check backend logs on Render dashboard

### Connection Refused
If the frontend can't connect to backend:
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check that backend is running on Render
3. Test backend URL directly in browser

### Backend Sleeping (Render Free Tier)
Render free tier spins down after inactivity:
- First request may take 30-60 seconds
- Add a health check endpoint ping to keep it alive
- Consider upgrading to paid tier for production

## Local Development

### Backend
```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=mock
```

### Frontend
```bash
cd frontend
npm run dev
```

Make sure `.env.local` has:
```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

## Architecture Overview

```
┌─────────────────┐         ┌──────────────────┐
│                 │         │                  │
│  Frontend       │────────▶│  Backend         │
│  (Vercel)       │  HTTPS  │  (Render)        │
│  Next.js        │         │  Spring Boot     │
│                 │         │                  │
└─────────────────┘         └──────────────────┘
      │                            │
      │                            │
      ▼                            ▼
  Browser Storage            H2 Database
  (localStorage)             (In-Memory)
```

## Security Notes

1. **Mock Authentication**: Currently using Basic Auth for testing
2. **HTTPS**: Both frontend and backend use HTTPS in production
3. **CORS**: Configured to allow only specific origins
4. **Credentials**: Sent with every request via `withCredentials: true`
5. **Environment Variables**: Never commit `.env` files to git

## Next Steps

1. ✅ Backend deployed and running
2. ⏳ Deploy frontend to Vercel/Netlify
3. ⏳ Test full authentication flow
4. ⏳ Test assessment submission
5. ⏳ Verify admin dashboard functionality

## Support

If you encounter issues:
1. Check Render logs: https://dashboard.render.com
2. Check Vercel logs: https://vercel.com/dashboard
3. Use browser DevTools Network tab to inspect requests
4. Check CORS headers in response
