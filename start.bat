@echo off
echo ===================================================
echo      Starting Portfolio Project (Backend + Frontend)
echo ===================================================

echo.
echo [1/2] Starting Laravel backend on port 8001...
start "BACKEND" cmd /k "cd backend && php artisan serve --port=8001"

echo.
echo [2/2] Waiting for backend to be ready...
:wait_loop
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:8001/api/portfolio' -UseBasicParsing -TimeoutSec 2; exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% neq 0 (
    echo     Backend not ready yet, retrying in 2s...
    timeout /t 2 /nobreak >nul
    goto wait_loop
)

echo.
echo [OK] Backend is ready! Starting Next.js frontend...
echo ===================================================
echo  Website:     http://localhost:3000
echo  Admin Panel: http://127.0.0.1:8001/admin
echo  Press Ctrl+C to stop the frontend server.
echo ===================================================
echo.

npm run dev
