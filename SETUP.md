# Setup Instructions

## Prerequisites

- Node.js 18+ and npm
- Java 17+
- Docker and Docker Compose
- Maven (or use ./mvnw)

## 1. Start Keycloak

```bash
docker-compose up keycloak
```

Wait for Keycloak to start, then access: http://localhost:8080

## 2. Configure Keycloak

Follow the detailed guide in `keycloak/README.md` to:
- Create the demo-realm
- Configure the nextjs-client
- Create USER and ADMIN roles
- Create test users

## 3. Update Environment Variables

Copy the client secret from Keycloak and update `frontend/.env.local`:

```bash
cd frontend
cp .env.local .env.local.backup
# Edit .env.local and replace 'your-client-secret' with actual secret
```

## 4. Install Dependencies

### Frontend:
```bash
cd frontend
npm install
```

### Backend:
```bash
cd backend
./mvnw clean install
```

## 5. Start Applications

### Backend (Terminal 1):
```bash
cd backend
./mvnw spring-boot:run
```

Backend will start on: http://localhost:8081

### Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```

Frontend will start on: http://localhost:3000

## 6. Test the Application

1. Visit: http://localhost:3000
2. Click "Get Started" or "Login"
3. Login with test credentials:
   - User: `testuser` / `password123`
   - Admin: `admin` / `admin123`

## 7. Test API Endpoints

### User Endpoint (requires USER role):
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8081/api/user
```

### Admin Endpoint (requires ADMIN role):
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8081/api/admin
```

## Token Flow Explanation

1. **Login**: User clicks login → redirected to Keycloak
2. **Authentication**: User enters credentials in Keycloak
3. **Authorization Code**: Keycloak redirects back with auth code
4. **Token Exchange**: Next.js exchanges code for tokens
5. **API Calls**: Frontend sends JWT token to backend
6. **Token Validation**: Spring Boot validates JWT with Keycloak
7. **Role Check**: Spring Boot checks user roles for authorization
8. **Response**: API returns data if authorized

## Architecture Overview

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Next.js   │    │ Spring Boot │    │  Keycloak   │
│  Frontend   │    │   Backend   │    │   Server    │
│             │    │             │    │             │
│ Port: 3000  │    │ Port: 8081  │    │ Port: 8080  │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │ 1. Login Request  │                   │
       │──────────────────────────────────────▶│
       │                   │                   │
       │ 2. Auth Code      │                   │
       │◀──────────────────────────────────────│
       │                   │                   │
       │ 3. API Call + JWT │                   │
       │──────────────────▶│                   │
       │                   │ 4. Validate JWT   │
       │                   │──────────────────▶│
       │                   │ 5. JWT Valid      │
       │                   │◀──────────────────│
       │ 6. Response       │                   │
       │◀──────────────────│                   │
```

## Troubleshooting

### Common Issues:

1. **Port conflicts**: Ensure ports 3000, 8080, 8081 are available
2. **CORS errors**: Check Keycloak client configuration
3. **JWT validation errors**: Verify issuer URI matches
4. **Role access denied**: Check user role assignments in Keycloak

### Logs to check:
- Keycloak: `docker-compose logs keycloak`
- Spring Boot: Check console output
- Next.js: Check browser console and network tab