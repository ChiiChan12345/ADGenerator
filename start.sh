#!/bin/bash

echo "==================================="
echo "Starting IdeogramFIRE Image Generator"
echo "==================================="

# Create a log file
LOGFILE="startup_log.txt"
echo "Startup Log - $(date)" > "$LOGFILE"

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    echo "Error: Node.js not found" >> "$LOGFILE"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Choose the LTS (Long Term Support) version."
    exit 1
fi

# Get Node.js version
NODE_VERSION=$(node --version)
echo "Found Node.js version: $NODE_VERSION"
echo "Node.js version: $NODE_VERSION" >> "$LOGFILE"

# Check if .env file exists
echo "Checking .env file..."
if [ ! -f .env ]; then
    echo "Error: .env file not found."
    echo "Error: .env file missing" >> "$LOGFILE"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing main dependencies..."
    echo "Installing main dependencies..." >> "$LOGFILE"
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install main dependencies"
        echo "Error: npm install failed" >> "$LOGFILE"
        exit 1
    fi
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    echo "Installing frontend dependencies..." >> "$LOGFILE"
    cd frontend
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install frontend dependencies"
        echo "Error: frontend npm install failed" >> "$LOGFILE"
        cd ..
        exit 1
    fi
    cd ..
fi

# Build frontend if build directory doesn't exist
if [ ! -d "frontend/build" ]; then
    echo "Building frontend..."
    echo "Building frontend..." >> "$LOGFILE"
    cd frontend
    npm run build
    if [ $? -ne 0 ]; then
        echo "Error: Failed to build frontend"
        echo "Error: frontend build failed" >> "$LOGFILE"
        cd ..
        exit 1
    fi
    cd ..
fi

# Check if port 3001 is available
echo "Checking if port 3001 is available..."
if lsof -i :3001 > /dev/null; then
    echo "Warning: Port 3001 is already in use"
    echo "Warning: Port 3001 in use" >> "$LOGFILE"
    echo "Please close any applications using port 3001"
    echo "or change the port in .env file"
    exit 1
fi

# Start the application
echo "Starting the server..."
echo "Starting server..." >> "$LOGFILE"
echo ""
echo "If you see any errors, please check $LOGFILE for details"
echo ""
npm start 