@echo off
echo Testing Backend Connection...
echo.

echo 1. Testing Health Endpoint...
curl -s https://hirevia-assignment-3.onrender.com/health
echo.
echo.

echo 2. Testing Login Endpoint...
curl -X POST https://hirevia-assignment-3.onrender.com/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
echo.
echo.

echo 3. Testing User Profile (with auth)...
curl https://hirevia-assignment-3.onrender.com/api/user/profile ^
  -u testuser:password123
echo.
echo.

echo Done!
pause
