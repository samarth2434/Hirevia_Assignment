# Authentication & Navigation System

A secure authentication system using Next.js (frontend), Spring Boot (backend), and Keycloak (OAuth2/OIDC).

## Project Structure

```
├── frontend/                 # Next.js application
├── backend/                  # Spring Boot application
├── keycloak/                # Keycloak configuration
└── docker-compose.yml       # Development setup
```

## Quick Start

1. Start Keycloak: `docker-compose up keycloak`
2. Configure Keycloak realm (see keycloak/README.md)
3. Start backend: `cd backend && ./mvnw spring-boot:run`
4. Start frontend: `cd frontend && npm run dev`

## Features

- ✅ Keycloak OAuth2/OIDC integration
- ✅ JWT token handling with auto-refresh
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Session persistence
- ✅ Secure API endpoints