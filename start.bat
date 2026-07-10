@echo off
echo ===================================================
echo      Starting Portfolio Project (Backend + Frontend)
echo ===================================================

echo.
echo ===================================================
echo Project is now starting up!
echo - Both servers will run in this terminal window.
echo - You can access your website at: http://localhost:3000
echo - You can access the Admin Panel at: http://127.0.0.1:8001/admin
echo - Press Ctrl+C to stop both servers.
echo ===================================================
echo.

npx concurrently -c "cyan,magenta" -n "BACKEND,FRONTEND" "cd backend && php artisan serve --port=8001" "npm run dev"
