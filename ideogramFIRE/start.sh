#!/bin/bash

echo "Starting IdeogramFIRE Image Generator..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    echo "Please download and install Node.js from https://nodejs.org/"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the application
echo "Starting the server..."
npm start 