@echo off
echo 🔧 Fixing Frontend Issues...

cd frontend

echo [INFO] Clearing Next.js cache...
if exist ".next" rmdir /s /q .next
if exist "node_modules\.cache" rmdir /s /q node_modules\.cache

echo [INFO] Checking TypeScript...
npx tsc --noEmit

echo [INFO] Checking ESLint...
npm run lint

echo [INFO] Starting development server...
npm run dev

pause