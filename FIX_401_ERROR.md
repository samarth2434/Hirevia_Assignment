# Fix for 401 Unauthorized Error

## Problem

When accessing `https://hirevia-assignment-3.onrender.com/`, you got:
```
GET https://hirevia-assignment-3.onrender.com/ net::ERR_HTTP_RESPONSE_CODE_FAILURE 401 (Unauthorized)
```

## Root Cause

The backend's Spring Security configuration was requiring authentication for **all** requests, including the root path `/`. 

In the security config, this line was the issue:
```java
.anyRequest().authenticated()  // ← This requires auth for everything not explicitly allowed
```

The root path `/` wasn't in the `permitAll()` list, so Spring Security blocked it.

## Solution

### 1. Created Welcome Controller

Added `WelcomeController.java` with public endpoints:
- `GET /` - Welcome message with API info
- `GET /health` - Health check endpoint

```java
@GetMapping("/")
public Map<String, Object> welcome() {
    return Map.of(
        "status", "running",
        "message", "Hirevia Backend API",
        "version", "1.0.0"
    );
}
```

### 2. Updated Security Configuration

Added root path to `permitAll()` in both configs:

**MockSecurityConfig.java** (for mock profile):
```java
.authorizeHttpRequests(authz -> authz
    .requestMatchers("/").permitAll()  // ← Added this
    .requestMatchers("/actuator/**").permitAll()
    .requestMatchers("/health").permitAll()
    .requestMatchers("/api/auth/**").permitAll()
    // ... rest of config
)
```

**SecurityConfig.java** (for prod profile):
```java
.authorizeHttpRequests(authz -> authz
    .requestMatchers("/").permitAll()  // ← Added this
    .requestMatchers("/actuator/**").permitAll()
    .requestMatchers("/health").permitAll()
    // ... rest of config
)
```

## What's Now Public (No Auth Required)

- `GET /` - Welcome/info page
- `GET /health` - Health check
- `GET /actuator/**` - Spring actuator endpoints
- `POST /api/auth/login` - Login endpoint
- `POST /api/auth/register` - Registration endpoint

## What Still Requires Auth

- `GET /api/user/**` - User endpoints (requires USER role)
- `GET /api/admin/**` - Admin endpoints (requires ADMIN role)
- `POST /api/submit-assessment` - Submit assessment (requires USER role)
- All other `/api/**` endpoints

## Testing

After the backend redeploys on Render, you should be able to:

### 1. Access Root Path
```bash
curl https://hirevia-assignment-3.onrender.com/
```

Expected response:
```json
{
  "status": "running",
  "message": "Hirevia Backend API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "api": "/api",
    "auth": "/api/auth/login"
  }
}
```

### 2. Check Health
```bash
curl https://hirevia-assignment-3.onrender.com/health
```

Expected response:
```json
{
  "status": "UP",
  "message": "Backend is healthy"
}
```

### 3. Login (Still Works)
```bash
curl -X POST https://hirevia-assignment-3.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### 4. Protected Endpoints (Still Require Auth)
```bash
# This should return 401 without auth
curl https://hirevia-assignment-3.onrender.com/api/user/profile

# This should work with auth
curl https://hirevia-assignment-3.onrender.com/api/user/profile \
  -u testuser:password123
```

## Why This Matters

1. **Health Checks**: Monitoring tools can check if your backend is alive
2. **API Discovery**: Developers can see what endpoints are available
3. **Debugging**: Easy to verify backend is running without authentication
4. **Frontend**: Can check backend status before attempting login

## Security Note

This change is **safe** because:
- Only informational endpoints are public
- All sensitive data endpoints still require authentication
- No user data is exposed on public endpoints
- Login/registration endpoints were already public

## Next Steps

1. ✅ Changes committed to git
2. ⏳ Push to GitHub (triggers Render redeploy)
3. ⏳ Wait for Render to rebuild (~2-3 minutes)
4. ⏳ Test the root path again
5. ⏳ Deploy frontend to Vercel

## Push Changes to Trigger Redeploy

```bash
git push origin main
```

This will trigger Render to automatically rebuild and redeploy your backend with the fix.
