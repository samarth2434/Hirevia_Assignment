# Frontend-Backend Connection Setup

## Overview

This document explains how the frontend connects to the backend and what changes were made to enable production deployment.

## Changes Made

### 1. Backend CORS Configuration

Updated both `SecurityConfig.java` and `MockSecurityConfig.java` to allow production frontend URLs:

```java
configuration.setAllowedOriginPatterns(List.of(
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://*.vercel.app",      // ← Added for Vercel
    "https://*.netlify.app"      // ← Added for Netlify
));
```

This allows any subdomain on Vercel or Netlify to access your backend.

### 2. Frontend API Configuration

Updated `frontend/lib/api.ts` to use environment variable:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for CORS with credentials
});
```

### 3. Environment Variables

**Production** (`frontend/.env.production`):
```env
NEXT_PUBLIC_API_URL=https://hirevia-assignment-3.onrender.com/api
```

**Local Development** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

### 4. Next.js Configuration

Updated `frontend/next.config.js` to include API rewrites for development:

```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
        : 'http://localhost:8081/api/:path*',
    },
  ];
}
```

## How It Works

### Request Flow

1. **Frontend makes API call**:
   ```typescript
   import api from '@/lib/api';
   const response = await api.get('/user/profile');
   ```

2. **Axios sends request**:
   - URL: `https://hirevia-assignment-3.onrender.com/api/user/profile`
   - Headers: `Authorization: Basic base64(username:password)`
   - Credentials: Included (`withCredentials: true`)

3. **Backend receives request**:
   - CORS middleware checks origin
   - Spring Security validates credentials
   - Returns response with CORS headers

4. **Frontend receives response**:
   - Browser validates CORS headers
   - Data is available to the application

### Authentication Flow

```
┌─────────────┐                    ┌──────────────┐
│  Frontend   │                    │   Backend    │
└──────┬──────┘                    └──────┬───────┘
       │                                  │
       │  1. POST /api/auth/login         │
       │  {username, password}            │
       ├─────────────────────────────────▶│
       │                                  │
       │  2. Validate credentials         │
       │     (Basic Auth)                 │
       │                                  │
       │  3. Return user data             │
       │◀─────────────────────────────────┤
       │                                  │
       │  4. Store in localStorage        │
       │     {mock_user, mock_token}      │
       │                                  │
       │  5. Subsequent requests          │
       │     Authorization: Basic ...     │
       ├─────────────────────────────────▶│
       │                                  │
       │  6. Validate & return data       │
       │◀─────────────────────────────────┤
       │                                  │
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user info

### User Endpoints (Requires USER role)
- `GET /api/user/profile` - Get user profile
- `POST /api/submit-assessment` - Submit assessment
- `GET /api/my-assessments` - Get user's assessments

### Admin Endpoints (Requires ADMIN role)
- `GET /api/admin/users` - Get all users
- `GET /api/assessments` - Get all assessments
- `GET /api/assessment/:id` - Get specific assessment
- `GET /api/assessment-stats` - Get statistics

## Testing the Connection

### 1. Test Backend Directly

Run the test script:
```bash
test-backend-connection.bat
```

Or manually:
```bash
# Health check
curl https://hirevia-assignment-3.onrender.com/health

# Login
curl -X POST https://hirevia-assignment-3.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Get profile
curl https://hirevia-assignment-3.onrender.com/api/user/profile \
  -u testuser:password123
```

### 2. Test Frontend Locally

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000/mock-login` and login with:
- Username: `testuser`
- Password: `password123`

### 3. Test Production Frontend

After deploying to Vercel:
1. Visit your Vercel URL
2. Go to `/mock-login`
3. Login and test functionality

## Deployment Steps

### Backend (Already Done ✅)
- Deployed to Render
- URL: https://hirevia-assignment-3.onrender.com
- Profile: `prod`
- CORS: Configured for production

### Frontend (Next Steps)

#### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: `https://hirevia-assignment-3.onrender.com/api`
   - `NEXTAUTH_URL`: Your Vercel URL
   - `NEXTAUTH_SECRET`: `hirevia-super-secret-production-key-2024`

#### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod
   ```

3. Set environment variables in Netlify dashboard

## Troubleshooting

### CORS Errors

**Symptom**: Browser console shows CORS error

**Solutions**:
1. Verify backend CORS config includes your frontend URL pattern
2. Check `withCredentials: true` in axios config
3. Ensure backend is running and accessible

### 401 Unauthorized

**Symptom**: API returns 401 status

**Solutions**:
1. Verify credentials are correct
2. Check Authorization header format
3. Ensure user exists in backend (testuser/admin)

### Network Error

**Symptom**: "Network Error" or "Failed to fetch"

**Solutions**:
1. Check `NEXT_PUBLIC_API_URL` is set correctly
2. Verify backend is running (may take 30-60s on Render free tier)
3. Test backend URL directly in browser

### Environment Variables Not Working

**Symptom**: API calls go to wrong URL

**Solutions**:
1. Restart Next.js dev server after changing `.env` files
2. Verify environment variable names start with `NEXT_PUBLIC_`
3. Check Vercel/Netlify dashboard for correct env vars

## Security Considerations

1. **Basic Auth**: Currently using Basic Auth for simplicity
   - Production should use JWT or OAuth2
   - Consider implementing Keycloak integration

2. **HTTPS**: Both frontend and backend use HTTPS in production
   - Credentials are encrypted in transit

3. **CORS**: Restricted to specific origin patterns
   - Only Vercel and Netlify subdomains allowed

4. **Credentials**: Stored in localStorage
   - Consider using httpOnly cookies for production

5. **Environment Variables**: Never commit to git
   - Use `.env.local` for local development
   - Set in platform dashboard for production

## Next Steps

1. ✅ Backend CORS configured
2. ✅ Frontend API client updated
3. ✅ Environment variables configured
4. ⏳ Deploy frontend to Vercel
5. ⏳ Test full authentication flow
6. ⏳ Test all API endpoints
7. ⏳ Monitor backend logs on Render

## Support

For issues or questions:
1. Check backend logs: https://dashboard.render.com
2. Check frontend logs: Vercel/Netlify dashboard
3. Use browser DevTools Network tab
4. Review this documentation
