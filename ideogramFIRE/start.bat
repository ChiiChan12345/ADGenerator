@echo off
echo Starting IdeogramFIRE Image Generator...

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js first.
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if .env file exists and print its contents
if not exist .env (
    echo Error: .env file not found in %cd%.
    pause
    exit /b 1
) else (
    echo Found .env file. Contents:
    type .env
)

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

REM Print package.json start script
if exist package.json (
    echo Checking start script in package.json...
    findstr /C:"\"start\"" package.json
)

REM Pause to let user see the above output
pause

REM Start the application
echo Starting the server...
npm start

pause 