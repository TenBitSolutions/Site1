@echo off
title TrioInfraHub Launcher
color 0B
cls

echo =================================================================
echo               TRIOINFRAHUB AUTOMATED SYSTEM LAUNCHER             
echo =================================================================
echo.

:: Step 1: Check Node.js installation
echo [1/4] Checking Node.js runtime...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Node.js is NOT installed!
    echo Please install Node.js (v18+ or v20+) from: https://nodejs.org/
    echo.
    pause
    exit /b
)
echo Node.js is installed successfully!
echo.

:: Step 2: Check or install PNPM package manager
echo [2/4] Checking PNPM package manager...
pnpm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo PNPM not found. Installing PNPM globally via NPM...
    call npm install -g pnpm
    if %errorlevel% neq 0 (
        color 0C
        echo ERROR: Failed to install PNPM!
        pause
        exit /b
    )
)
echo PNPM is active and ready!
echo.

:: Step 3: Check and install project dependencies
echo [3/4] Checking project dependencies...
if not exist "node_modules\" (
    echo Directory 'node_modules' is missing. Installing packages now...
    call pnpm install
    if %errorlevel% neq 0 (
        color 0C
        echo ERROR: Failed to install project packages!
        pause
        exit /b
    )
) else (
    echo Dependencies are already installed!
)
echo.

:: Step 4: Open web browser and launch Dev Server
echo [4/4] Starting local web server...
echo.
echo -----------------------------------------------------------------
echo   TRIOINFRAHUB IS RUNNING!
echo   Opening browser at: http://localhost:5173
echo   (Press Ctrl+C inside this window to stop the server)
echo -----------------------------------------------------------------
echo.

:: Wait 1.5 seconds then open the local URL in default browser
timeout /t 2 /nobreak >nul
start http://localhost:5173

:: Start the development server
call pnpm run dev

pause
