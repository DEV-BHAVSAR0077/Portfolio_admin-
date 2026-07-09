@echo off
echo ===================================================
echo      Starting Portfolio Project (Backend + Frontend)
echo ===================================================

echo.
echo [1/2] Starting Laravel Backend API on http://127.0.0.1:8001 ...
start "Laravel Backend" cmd /k "cd backend && php artisan serve --port=8001"

echo.
echo [2/2] Starting Next.js Frontend on http://localhost:3000 ...
start "Next.js Frontend" cmd /k "npm run dev"

echo.
echo ===================================================
echo Project is now starting up!
echo - Two new windows have opened (one for Backend, one for Frontend).
echo - You can access your website at: http://localhost:3000
echo - You can access the Admin Panel at: http://127.0.0.1:8001/admin
echo ===================================================
pause
