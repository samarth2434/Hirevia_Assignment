# Complete Interview Platform

A comprehensive interview platform with authentication, assessment forms, and real-time video interviews using Next.js, Spring Boot, and WebRTC.

## Project Structure

```
├── frontend/                 # Next.js application (Port 3002)
│   ├── app/                 # App router pages
│   ├── components/          # Reusable components
│   ├── contexts/            # Auth contexts
│   └── lib/                 # Utilities and API
├── backend/                  # Spring Boot application (Port 8081)
│   └── src/main/java/       # Java source code
├── video-interview/          # Video interview system (Port 3001)
│   ├── components/          # Video components
│   ├── hooks/               # WebRTC hooks
│   └── app/                 # Interview pages
├── keycloak/                # Keycloak configuration
└── docker-compose.yml       # Development setup
```

## Quick Start

### Option 1: With Docker (Full Keycloak)
1. Start Keycloak: `docker-compose up keycloak`
2. Configure Keycloak realm (see keycloak/README.md)
3. Start backend: `cd backend && ./mvnw spring-boot:run`
4. Start frontend: `cd frontend && npm run dev`

### Option 2: Mock Authentication (No Docker)
1. Install dependencies: `./install-all.bat` (Windows) or `./install-all.sh` (Linux/Mac)
2. Start mock system: `./start-mock.bat`
3. Access applications:
   - Frontend: http://localhost:3002
   - Backend: http://localhost:8081
   - Video Interview: http://localhost:3001

## System Features

### 🔐 Authentication System
- ✅ Keycloak OAuth2/OIDC integration
- ✅ Mock authentication (no Docker required)
- ✅ JWT token handling with auto-refresh
- ✅ Role-based access control (USER/ADMIN)
- ✅ Protected routes and secure API endpoints
- ✅ Session persistence and user registration

### 📝 Assessment Platform
- ✅ Dynamic questionnaire forms with validation
- ✅ Multiple question types (radio, text, checkbox)
- ✅ Real-time form validation using Zod
- ✅ Assessment submission and storage
- ✅ Admin dashboard with statistics
- ✅ User assessment history and results

### 🎥 Real-Time Video Interview System
A complete video interview system built with Next.js, WebRTC, and Tailwind CSS.

#### Features
- 🎥 **WebRTC Video Streaming**: Native browser video capture
- ⏱️ **Interview Timer**: Countdown with warnings
- 🔄 **Camera Controls**: Toggle on/off functionality
- 📱 **Responsive Layout**: Main video + floating self-preview
- 🎛️ **Interview Controls**: Start/Stop session management
- 🧹 **Clean Cleanup**: Proper media track disposal

#### Components
- `VideoInterview` - Main interview interface
- `Timer` - Countdown timer with warnings
- `VideoPlayer` - WebRTC video stream handler
- `CameraControls` - Camera toggle controls

#### WebRTC Flow
1. **getUserMedia()** - Request camera/microphone access
2. **Stream Display** - Show local video feed
3. **Remote Simulation** - Placeholder for candidate stream
4. **Cleanup** - Properly dispose media tracks on unmount

#### Quick Start
```bash
cd video-interview
npm install
npm run dev
```
Open: http://localhost:3001/interview

### 👨‍💼 Admin Dashboard
- ✅ Assessment statistics and analytics
- ✅ User management and role assignment
- ✅ Submission tracking and review
- ✅ System monitoring and health checks

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hook Form + Zod** - Form validation
- **NextAuth.js** - Authentication integration

### Backend
- **Spring Boot 3** - Java web framework
- **Spring Security** - Authentication and authorization
- **Maven** - Dependency management
- **JWT** - Token-based authentication

### Video System
- **WebRTC** - Real-time video communication
- **getUserMedia API** - Camera and microphone access
- **Canvas API** - Video processing and effects

### Authentication
- **Keycloak** - Identity and access management
- **OAuth2/OIDC** - Standard authentication protocols
- **Mock Auth** - Development without Docker

## Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3002 | Main application |
| Backend API | http://localhost:8081 | REST API endpoints |
| Video Interview | http://localhost:3001 | Video interview interface |
| Keycloak | http://localhost:8080 | Identity provider (if using Docker) |

## User Roles & Access

### USER Role
- ✅ Login/Register
- ✅ Access dashboard
- ✅ Take assessments
- ✅ View own results
- ✅ Participate in video interviews

### ADMIN Role
- ✅ All USER permissions
- ✅ Admin dashboard access
- ✅ View all assessments
- ✅ User management
- ✅ System statistics

## Default Test Users (Mock Auth)

| Username | Password | Role | Description |
|----------|----------|------|-------------|
| testuser | password123 | USER | Regular user access |
| admin | admin123 | USER, ADMIN | Full admin access |

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Assessment
- `POST /api/submit-assessment` - Submit assessment
- `GET /api/my-assessments` - Get user assessments
- `GET /api/assessments` - Get all assessments (Admin)
- `GET /api/assessment-stats` - Get statistics (Admin)

### Admin
- `GET /api/admin` - Admin dashboard data
- `GET /api/user` - User dashboard data

## Development Scripts

### Windows
- `install-all.bat` - Install all dependencies
- `start-mock.bat` - Start mock authentication system
- `run-frontend.bat` - Start frontend only
- `run-backend.bat` - Start backend only
- `run-video.bat` - Start video interview only

### Linux/Mac
- `install-all.sh` - Install all dependencies
- `./mvnw spring-boot:run` - Start backend
- `npm run dev` - Start frontend/video

## Project Highlights

### Security Features
- JWT token validation
- CORS configuration
- Role-based route protection
- Secure API endpoints
- Input validation and sanitization

### User Experience
- Dark theme with proper contrast
- Responsive design for all devices
- Real-time form validation
- Loading states and error handling
- Professional interview interface

### Technical Excellence
- TypeScript for type safety
- Modular component architecture
- Custom React hooks for WebRTC
- Clean separation of concerns
- Comprehensive error handling

## Troubleshooting

### Common Issues
1. **Camera not working**: Check browser permissions and see `CAMERA_TROUBLESHOOTING.md`
2. **Network errors**: Ensure backend is running on port 8081
3. **Login failures**: Verify mock authentication is enabled
4. **Port conflicts**: Check if ports 3001, 3002, 8081 are available

### Debug Pages
- `/debug-login` - Test login functionality
- `/test-assessment` - Test assessment submission
- `/test-full-flow` - Test complete user flow

## Documentation

- `SETUP.md` - Detailed setup instructions
- `INSTALLATION_GUIDE.md` - Installation troubleshooting
- `MOCK_SETUP_GUIDE.md` - Mock authentication setup
- `CAMERA_TROUBLESHOOTING.md` - Video interview issues
- `video-interview/COMPONENTS.md` - Video component documentation
- `video-interview/WEBRTC_FLOW.md` - WebRTC implementation details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes.