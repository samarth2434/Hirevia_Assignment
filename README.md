# Hirevia - Complete Interview Platform

A comprehensive interview platform featuring secure authentication, dynamic assessment forms, and real-time video interviews. Built with Next.js, Spring Boot, and WebRTC for a complete hiring solution.

## 🚀 Project Overview

This platform provides end-to-end interview management with three core modules:
- **Authentication System** - Secure user management with role-based access
- **Assessment Platform** - Dynamic questionnaires with real-time validation  
- **Video Interview System** - WebRTC-powered live interview interface

## 📁 Project Structure

```
├── frontend/                 # Next.js Frontend (Port 3002)
│   ├── app/                 # App Router pages & API routes
│   │   ├── api/             # Next.js API endpoints
│   │   ├── assessment/      # Assessment pages
│   │   ├── dashboard/       # User dashboard
│   │   ├── admin/           # Admin panel
│   │   └── auth/            # Login/Register pages
│   ├── components/          # Reusable UI components
│   ├── contexts/            # React contexts (Auth)
│   ├── lib/                 # Utilities & API clients
│   └── types/               # TypeScript definitions
├── backend/                  # Spring Boot Backend (Port 8081)
│   └── src/main/java/       # Java source code
│       ├── controller/      # REST API controllers
│       ├── config/          # Security & CORS config
│       └── model/           # Data models
├── video-interview/          # Video Interview App (Port 3001)
│   ├── components/          # Video UI components
│   ├── hooks/               # WebRTC custom hooks
│   └── app/                 # Interview pages
├── keycloak/                # Keycloak configuration (Optional)
└── scripts/                 # Installation & startup scripts
```

## ⚡ Quick Start

### Recommended: Mock Authentication (No Docker Required)

```bash
# 1. Install all dependencies
./install-all.bat          # Windows
./install-all.sh           # Linux/Mac

# 2. Start all services
./start-mock.bat           # Windows
./start-mock.sh            # Linux/Mac

# 3. Access applications
# Frontend: http://localhost:3002
# Backend API: http://localhost:8081  
# Video Interview: http://localhost:3001
```

### Alternative: Full Keycloak Setup
```bash
# 1. Start Keycloak
docker-compose up keycloak

# 2. Configure realm (see keycloak/README.md)

# 3. Start services
cd backend && ./mvnw spring-boot:run
cd frontend && npm run dev
cd video-interview && npm run dev
```

## 🎯 Core Features

### 🔐 Authentication & Authorization
- **Mock Authentication** - Development-ready auth without Docker
- **Keycloak Integration** - Production OAuth2/OIDC support
- **Role-Based Access** - USER and ADMIN role management
- **JWT Security** - Token-based API protection
- **Session Management** - Persistent login with auto-refresh
- **User Registration** - Self-service account creation

### �  Dynamic Assessment Platform
- **Smart Forms** - React Hook Form with Zod validation
- **Multiple Question Types** - Radio buttons, text inputs, checkboxes
- **Real-time Validation** - Instant feedback on form errors
- **Progress Tracking** - Visual completion indicators
- **Result Management** - Comprehensive answer review
- **Admin Analytics** - Assessment statistics and insights

### 🎥 Real-Time Video Interview System
A complete video interview system built with Next.js, WebRTC, and Tailwind CSS.

#### Video Features
- 🎥 **WebRTC Video Streaming** - Native browser video capture
- ⏱️ **Interview Timer** - Countdown with visual warnings
- 🔄 **Camera Controls** - Toggle video/audio on/off
- 📱 **Responsive Layout** - Main video + floating self-preview
- 🎛️ **Interview Controls** - Start/Stop session management
- 🧹 **Clean Cleanup** - Proper media track disposal

#### Video Components
- `VideoInterview` - Main interview interface
- `Timer` - Countdown timer with warnings  
- `VideoPlayer` - WebRTC video stream handler
- `CameraControls` - Camera toggle controls

#### WebRTC Flow
1. **getUserMedia()** - Request camera/microphone access
2. **Stream Display** - Show local video feed
3. **Remote Simulation** - Placeholder for candidate stream
4. **Cleanup** - Properly dispose media tracks on unmount

#### Video Quick Start
```bash
cd video-interview
npm install
npm run dev
```
Open: http://localhost:3001/interview

### 👨‍💼 Admin Dashboard
- **User Management** - View and manage all users
- **Assessment Analytics** - Detailed submission statistics
- **System Monitoring** - Health checks and performance metrics
- **Role Assignment** - Manage user permissions

## 🛠️ Technology Stack

### Frontend Technologies
- **Next.js 14** - React framework with App Router & API routes
- **TypeScript** - Type-safe development environment
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **NextAuth.js** - Authentication integration

### Backend Technologies  
- **Spring Boot 3** - Enterprise Java framework
- **Spring Security** - Authentication & authorization
- **Maven** - Dependency management & build tool
- **JWT** - Stateless token authentication
- **CORS** - Cross-origin resource sharing

### Video & Media
- **WebRTC** - Real-time peer-to-peer communication
- **getUserMedia API** - Camera and microphone access
- **MediaStream API** - Audio/video stream handling
- **Canvas API** - Video processing capabilities

### Authentication Options
- **Keycloak** - Enterprise identity management
- **OAuth2/OIDC** - Industry standard protocols
- **Mock Authentication** - Development without external dependencies

## 🌐 Application Access

| Service | URL | Port | Description |
|---------|-----|------|-------------|
| **Frontend** | http://localhost:3002 | 3002 | Main application interface |
| **Backend API** | http://localhost:8081 | 8081 | REST API endpoints |
| **Video Interview** | http://localhost:3001 | 3001 | Video interview system |
| **Keycloak** | http://localhost:8080 | 8080 | Identity provider (optional) |

## 👥 User Roles & Permissions

### 🟢 USER Role
- ✅ Account registration and login
- ✅ Personal dashboard access
- ✅ Assessment form completion
- ✅ View personal results and history
- ✅ Participate in video interviews
- ✅ Profile management

### 🔴 ADMIN Role (Includes all USER permissions)
- ✅ Admin dashboard access
- ✅ View all user assessments
- ✅ System analytics and statistics
- ✅ User management capabilities
- ✅ Assessment result review

## 🔑 Default Test Accounts

| Username | Password | Roles | Access Level |
|----------|----------|-------|--------------|
| `testuser` | `password123` | USER | Standard user access |
| `admin` | `admin123` | USER, ADMIN | Full administrative access |

*Note: These are mock accounts for development. In production, use proper user management.*

## 🔌 API Documentation

### Authentication Endpoints
```http
POST /api/auth/login          # User authentication
POST /api/auth/register       # New user registration  
GET  /api/auth/me            # Current user profile
POST /api/auth/logout        # Session termination
GET  /api/auth/test          # API health check
```

### Assessment Endpoints
```http
POST /api/submit-assessment   # Submit completed assessment
GET  /api/my-assessments     # User's assessment history
GET  /api/assessments        # All assessments (Admin only)
GET  /api/assessment-stats   # Analytics data (Admin only)
```

### Admin & User Endpoints
```http
GET  /api/admin              # Admin dashboard data
GET  /api/user               # User dashboard data
```

## 🚀 Development Scripts

### Windows Commands
```batch
install-all.bat              # Install all project dependencies
start-mock.bat               # Start complete mock system
run-frontend.bat             # Start frontend application only
run-backend.bat              # Start backend API only  
run-video.bat                # Start video interview only
```

### Linux/Mac Commands
```bash
./install-all.sh             # Install all project dependencies
cd backend && ./mvnw spring-boot:run    # Start backend
cd frontend && npm run dev               # Start frontend
cd video-interview && npm run dev       # Start video system
```

## 🎯 Key Project Highlights

### 🔒 Security Implementation
- **JWT Token Validation** - Secure API access control
- **CORS Configuration** - Cross-origin request handling
- **Role-Based Protection** - Route-level access control
- **Input Validation** - Comprehensive data sanitization
- **Secure Headers** - XSS and CSRF protection

### 🎨 User Experience Design
- **Dark Theme** - Professional, eye-friendly interface
- **Responsive Design** - Mobile-first approach
- **Real-time Validation** - Instant user feedback
- **Loading States** - Clear progress indicators
- **Error Handling** - Graceful failure management

### ⚡ Technical Excellence
- **TypeScript Integration** - Full type safety
- **Modular Architecture** - Clean separation of concerns
- **Custom React Hooks** - Reusable WebRTC logic
- **API Route Optimization** - Next.js API middleware
- **Memory Management** - Proper resource cleanup

## 🔧 Troubleshooting Guide

### Common Issues & Solutions

#### 🎥 Video Interview Problems
```bash
# Camera not working
- Check browser permissions (Chrome: Settings > Privacy > Camera)
- Ensure no other applications are using the camera
- Try refreshing the page or restarting browser
- See CAMERA_TROUBLESHOOTING.md for detailed steps
```

#### 🌐 Network Connection Issues  
```bash
# Backend connection failed
- Verify backend is running on port 8081
- Check Windows Firewall settings
- Ensure no other services are using port 8081
- Try: netstat -an | findstr :8081
```

#### 🔐 Authentication Problems
```bash
# Login failures
- Verify mock authentication is enabled in backend
- Check browser console for detailed error messages
- Clear browser cache and localStorage
- Restart backend service
```

#### ⚠️ Port Conflicts
```bash
# Port already in use
- Frontend (3002): netstat -ano | findstr :3002
- Backend (8081): netstat -ano | findstr :8081  
- Video (3001): netstat -ano | findstr :3001
- Kill process: taskkill /PID <process_id> /F
```

### 🧪 Debug & Testing Pages

Access these URLs for troubleshooting:

| Debug Page | URL | Purpose |
|------------|-----|---------|
| **Login Test** | http://localhost:3002/debug-login | Test authentication flow |
| **Assessment Test** | http://localhost:3002/test-assessment | Test form submission |
| **Full Flow Test** | http://localhost:3002/test-full-flow | End-to-end user journey |
| **API Debug** | http://localhost:3002/debug-api | Backend connectivity test |
| **Video Test** | http://localhost:3001/test | Camera and WebRTC testing |

## 📚 Documentation Resources

### Setup & Installation
- **`SETUP.md`** - Detailed setup instructions
- **`INSTALLATION_GUIDE.md`** - Installation troubleshooting
- **`MOCK_SETUP_GUIDE.md`** - Mock authentication configuration
- **`NO_DOCKER_SETUP.md`** - Docker-free setup guide

### Technical Documentation  
- **`CAMERA_TROUBLESHOOTING.md`** - Video interview issue resolution
- **`video-interview/COMPONENTS.md`** - Video component architecture
- **`video-interview/WEBRTC_FLOW.md`** - WebRTC implementation details
- **`keycloak/README.md`** - Keycloak configuration guide

## 🤝 Contributing Guidelines

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Test** thoroughly using debug pages
5. **Push** to branch (`git push origin feature/amazing-feature`)
6. **Submit** a Pull Request

### Code Standards
- **TypeScript** - Use strict type checking
- **ESLint** - Follow configured linting rules
- **Component Structure** - Maintain modular architecture
- **Error Handling** - Implement comprehensive error boundaries
- **Documentation** - Update relevant README sections

## 📄 License & Usage

This project is developed for **educational and demonstration purposes**. 

### Usage Rights
- ✅ Learning and educational use
- ✅ Portfolio demonstration
- ✅ Technical interview showcase
- ✅ Open source contribution

### Restrictions
- ❌ Commercial use without permission
- ❌ Redistribution without attribution
- ❌ Removal of original credits

---

## 🎉 Project Showcase

**Hirevia** demonstrates modern full-stack development with:
- **Secure Authentication** - Enterprise-grade user management
- **Dynamic Forms** - Real-time validation and submission
- **WebRTC Integration** - Live video communication
- **Responsive Design** - Mobile-first user experience
- **API Architecture** - RESTful backend services

Perfect for showcasing technical skills in **React**, **Spring Boot**, **WebRTC**, and **modern web development practices**.

---

*Built with ❤️ using Next.js, Spring Boot, and WebRTC*