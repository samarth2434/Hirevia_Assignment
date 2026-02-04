@echo off
setlocal enabledelayedexpansion

echo 🚀 Installing All Dependencies for Complete Authentication ^& Assessment System
echo =============================================================================

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm.
    pause
    exit /b 1
)

:: Check if Java is installed
java -version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java is not installed. Please install Java 17+ from https://adoptium.net/
    pause
    exit /b 1
)

:: Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not installed. Please install Docker from https://docker.com/
    pause
    exit /b 1
)

echo [INFO] All prerequisites are installed!
echo.

:: Install Frontend Dependencies
echo [INFO] Installing Frontend Dependencies (Main App)...
if exist "frontend" (
    cd frontend
    
    echo [INFO] Cleaning previous installations...
    if exist "node_modules" rmdir /s /q node_modules
    if exist "package-lock.json" del package-lock.json
    if exist ".next" rmdir /s /q .next
    
    echo [INFO] Installing npm packages...
    npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
    
    echo [SUCCESS] Frontend dependencies installed successfully!
    cd ..
) else (
    echo [ERROR] Frontend directory not found!
    pause
    exit /b 1
)

echo.

:: Install Video Interview Dependencies
echo [INFO] Installing Video Interview Dependencies...
if exist "video-interview" (
    cd video-interview
    
    echo [INFO] Cleaning previous installations...
    if exist "node_modules" rmdir /s /q node_modules
    if exist "package-lock.json" del package-lock.json
    if exist ".next" rmdir /s /q .next
    
    echo [INFO] Installing npm packages...
    npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install video interview dependencies
        pause
        exit /b 1
    )
    
    echo [SUCCESS] Video Interview dependencies installed successfully!
    cd ..
) else (
    echo [ERROR] Video Interview directory not found!
    pause
    exit /b 1
)

echo.

:: Install Backend Dependencies
echo [INFO] Installing Backend Dependencies (Spring Boot)...
if exist "backend" (
    cd backend
    
    echo [INFO] Cleaning previous builds...
    mvnw.cmd clean
    
    echo [INFO] Downloading Maven dependencies and compiling...
    mvnw.cmd compile
    if errorlevel 1 (
        echo [ERROR] Failed to install backend dependencies
        pause
        exit /b 1
    )
    
    echo [SUCCESS] Backend dependencies installed successfully!
    cd ..
) else (
    echo [ERROR] Backend directory not found!
    pause
    exit /b 1
)

echo.

:: Setup Keycloak
echo [INFO] Setting up Keycloak...
echo [INFO] Pulling Keycloak Docker image...
docker pull quay.io/keycloak/keycloak:23.0.0
if errorlevel 1 (
    echo [ERROR] Failed to pull Keycloak Docker image
    pause
    exit /b 1
)

echo [SUCCESS] Keycloak Docker image pulled successfully!
echo.

:: Create startup scripts
echo [INFO] Creating startup scripts...

:: Create start-all.bat
(
echo @echo off
echo echo 🚀 Starting Complete Authentication ^& Assessment System
echo echo ======================================================
echo.
echo echo [INFO] Starting Keycloak...
echo docker-compose up -d keycloak
echo.
echo echo [INFO] Waiting for Keycloak to start ^(this may take a minute^)...
echo timeout /t 30 /nobreak ^> nul
echo.
echo echo [INFO] Starting Spring Boot Backend...
echo start "Backend" cmd /k "cd backend && mvnw.cmd spring-boot:run"
echo.
echo echo [INFO] Waiting for backend to start...
echo timeout /t 15 /nobreak ^> nul
echo.
echo echo [INFO] Starting Next.js Frontend...
echo start "Frontend" cmd /k "cd frontend && npm run dev"
echo.
echo echo [INFO] Starting Video Interview App...
echo start "Video Interview" cmd /k "cd video-interview && npm run dev -- -p 3001"
echo.
echo echo [SUCCESS] All services started!
echo echo.
echo echo 🌐 Access URLs:
echo echo    • Main App: http://localhost:3000
echo echo    • Video Interview: http://localhost:3001
echo echo    • Keycloak Admin: http://localhost:8080/admin ^(admin/admin^)
echo echo    • Backend API: http://localhost:8081
echo echo.
echo echo 📋 Next Steps:
echo echo    1. Configure Keycloak realm ^(see keycloak/README.md^)
echo echo    2. Login with test users:
echo echo       - User: testuser / password123
echo echo       - Admin: admin / admin123
echo echo.
echo echo 🛑 To stop all services, run: stop-all.bat
echo pause
) > start-all.bat

:: Create stop-all.bat
(
echo @echo off
echo echo 🛑 Stopping All Services...
echo.
echo echo Stopping Docker containers...
echo docker-compose down
echo.
echo echo Stopping Node.js and Spring Boot processes...
echo taskkill /f /im node.exe 2^>nul
echo taskkill /f /im java.exe 2^>nul
echo.
echo echo ✅ All services stopped!
echo pause
) > stop-all.bat

echo [SUCCESS] Startup scripts created!
echo.

:: Create environment template
echo [INFO] Creating environment template...
if not exist "frontend\.env.local" (
    (
    echo NEXTAUTH_URL=http://localhost:3000
    echo NEXTAUTH_SECRET=your-secret-key-change-this-in-production
    echo.
    echo KEYCLOAK_ID=nextjs-client
    echo KEYCLOAK_SECRET=your-client-secret-from-keycloak
    echo KEYCLOAK_ISSUER=http://localhost:8080/realms/demo-realm
    echo.
    echo NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
    echo NEXT_PUBLIC_KEYCLOAK_REALM=demo-realm
    echo NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=nextjs-client
    echo.
    echo NEXT_PUBLIC_API_URL=http://localhost:8081/api
    ) > frontend\.env.local
    
    echo [SUCCESS] Environment template created at frontend\.env.local
    echo [WARNING] Remember to update KEYCLOAK_SECRET after configuring Keycloak!
)

echo.
echo [SUCCESS] 🎉 Installation completed successfully!
echo.
echo 📋 Next Steps:
echo    1. Configure Keycloak: Follow keycloak/README.md
echo    2. Update frontend\.env.local with Keycloak client secret
echo    3. Start all services: start-all.bat
echo    4. Access the application at http://localhost:3000
echo.
echo 📚 Documentation:
echo    • Setup Guide: SETUP.md
echo    • Assessment System: ASSESSMENT_SYSTEM.md
echo    • Video Interview: video-interview\WEBRTC_FLOW.md
echo    • Keycloak Config: keycloak\README.md
echo.
echo [SUCCESS] Happy coding! 🚀
echo.
pause