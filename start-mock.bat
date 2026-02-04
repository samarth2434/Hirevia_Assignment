@echo off
echo 🚀 Starting Mock Authentication System (No Docker Required)
echo ================================================================

echo [INFO] Starting Spring Boot Backend with Mock Authentication...
start "Backend" cmd /k "cd backend && .\mvnw.cmd spring-boot:run"

echo [INFO] Waiting for backend to start...
timeout /t 15 /nobreak > nul

echo [INFO] Starting Next.js Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo [INFO] Starting Video Interview App...
start "Video Interview" cmd /k "cd video-interview && npm run dev -- -p 3001"

echo.
echo [SUCCESS] All services started with Mock Authentication!
echo.
echo 🌐 Access URLs:
echo    • Main App: http://localhost:3000
echo    • Mock Login: http://localhost:3000/mock-login
echo    • Video Interview: http://localhost:3001
echo    • Backend API: http://localhost:8081
echo    • H2 Database Console: http://localhost:8081/h2-console
echo.
echo 👤 Test Users:
echo    • Username: testuser / Password: password123 (USER role)
echo    • Username: admin / Password: admin123 (USER + ADMIN roles)
echo.
echo 📋 Features Available:
echo    ✅ Authentication (Mock - no Keycloak needed)
echo    ✅ Dashboard with role-based access
echo    ✅ Assessment form with validation
echo    ✅ Admin panel with assessment statistics
echo    ✅ Video interview interface
echo.
echo 🛑 To stop all services: Ctrl+C in each terminal window
echo.
pause