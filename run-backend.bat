@echo off
echo 🚀 Starting Backend with Java Setup...

:: Set JAVA_HOME automatically
for /f "tokens=*" %%i in ('where java') do set JAVA_PATH=%%i
for %%i in ("%JAVA_PATH%") do set JAVA_DIR=%%~dpi
set JAVA_HOME=%JAVA_DIR:~0,-5%

echo [INFO] Java found at: %JAVA_HOME%
echo [INFO] Java version:
java -version

echo.
echo [INFO] Starting Spring Boot Backend...
cd backend
.\mvnw.cmd spring-boot:run

pause