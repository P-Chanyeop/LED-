@echo off
chcp 65001 >nul
cls

REM LED Estimate System - Start Script for Windows
REM Spring Boot + React Vite

echo ========================================
echo   LED Estimate System - Start Script
echo ========================================
echo.

set "PROJECT_ROOT=%~dp0"
set "BACKEND_DIR=%PROJECT_ROOT%backend"
set "FRONTEND_DIR=%PROJECT_ROOT%frontend-web"

REM ============================================
REM Check Requirements
REM ============================================

echo [0/2] Checking requirements...

java -version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java is not installed or not in PATH
    pause
    exit /b 1
)

node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo [OK] Java and Node.js are available
echo.

REM ============================================
REM Install Dependencies
REM ============================================

echo [1/2] Installing Backend Dependencies...
cd /d "%BACKEND_DIR%"
call mvnw.cmd clean compile -q
if errorlevel 1 (
    echo [WARNING] Maven wrapper failed, trying with mvn...
    call mvn clean compile -q
)
echo [OK] Backend dependencies ready
echo.

echo [2/2] Installing Frontend Dependencies...
cd /d "%FRONTEND_DIR%"
if not exist "node_modules" (
    call npm install
) else (
    echo node_modules already exists, skipping npm install
)
echo [OK] Frontend dependencies ready
echo.

REM ============================================
REM Start Services
REM ============================================

echo ========================================
echo   Starting Services...
echo ========================================
echo.

echo Starting Spring Boot Backend on port 8080...
cd /d "%BACKEND_DIR%"
start "Backend" cmd /c "call mvnw.cmd spring-boot:run -q"
echo [OK] Backend started
echo.

echo Waiting for backend to start...
timeout /t 15 /nobreak >nul
echo [OK] Backend should be ready
echo.

echo Starting Frontend on port 5173...
cd /d "%FRONTEND_DIR%"
start "Frontend" cmd /c "npm run dev"
echo [OK] Frontend started
echo.

REM ============================================
REM Summary
REM ============================================

echo ========================================
echo   All Services Started Successfully!
echo ========================================
echo.
echo Access URLs:
echo   * Frontend (견적 작성): http://localhost:5173
echo   * Admin (관리자):      http://localhost:5173/admin
echo   * Backend API:         http://localhost:8080
echo.
echo API Endpoints:
echo   * GET  /api/estimates
echo   * POST /api/estimates
echo   * GET  /api/products
echo   * POST /api/calculate
echo.
pause
