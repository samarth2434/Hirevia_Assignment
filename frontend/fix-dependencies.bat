@echo off
echo 🔧 Fixing Next.js dependencies and TypeScript issues...

REM Remove existing node_modules and lock file
echo 📦 Cleaning existing dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

REM Install dependencies
echo 📥 Installing dependencies...
npm install

REM Generate Next.js types
echo 🔄 Generating Next.js types...
npx next build --dry-run

echo ✅ Dependencies fixed!
echo.
echo Next steps:
echo 1. Restart your IDE/VS Code
echo 2. Or restart TypeScript server: Ctrl+Shift+P -^> 'TypeScript: Restart TS Server'
echo 3. Run: npm run dev

pause