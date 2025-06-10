@echo off
setlocal enabledelayedexpansion

echo ===================================
echo Starting IdeogramFIRE Image Generator
echo ===================================

REM Create a log file
set "LOGFILE=startup_log.txt"
echo Startup Log - %date% %time% > %LOGFILE%

REM Check if Node.js is installed
echo Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js first.
    echo Error: Node.js not found >> %LOGFILE%
    echo Please download and install Node.js from https://nodejs.org/
    echo Choose the LTS (Long Term Support) version.
    pause
    exit /b 1
)

REM Get Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Found Node.js version: !NODE_VERSION!
echo Node.js version: !NODE_VERSION! >> %LOGFILE%

REM Check if .env file exists
echo Checking .env file...
if not exist .env (
    echo Error: .env file not found.
    echo Error: .env file missing >> %LOGFILE%
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing main dependencies...
    echo Installing main dependencies... >> %LOGFILE%
    call npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install main dependencies
        echo Error: npm install failed >> %LOGFILE%
        pause
        exit /b 1
    )
)

REM Install frontend dependencies if needed
if not exist frontend\node_modules (
    echo Installing frontend dependencies...
    echo Installing frontend dependencies... >> %LOGFILE%
    cd frontend
    call npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install frontend dependencies
        echo Error: frontend npm install failed >> %LOGFILE%
        cd ..
        pause
        exit /b 1
    )
    cd ..
)

REM Build frontend if build directory doesn't exist
if not exist frontend\build (
    echo Building frontend...
    echo Building frontend... >> %LOGFILE%
    cd frontend
    call npm run build
    if %errorlevel% neq 0 (
        echo Error: Failed to build frontend
        echo Error: frontend build failed >> %LOGFILE%
        cd ..
        pause
        exit /b 1
    )
    cd ..
)

REM Check if port 3001 is available
echo Checking if port 3001 is available...
netstat -ano | find "3001" > nul
if %errorlevel% equ 0 (
    echo Warning: Port 3001 is already in use
    echo Warning: Port 3001 in use >> %LOGFILE%
    echo Please close any applications using port 3001
    echo or change the port in .env file
    pause
    exit /b 1
)

REM Start the application
echo Starting the server...
echo Starting server... >> %LOGFILE%
echo.
echo If you see any errors, please check %LOGFILE% for details
echo.
npm start

pause 