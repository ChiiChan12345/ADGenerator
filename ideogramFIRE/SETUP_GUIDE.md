# IdeogramFIRE Setup Guide

## Quick Start
1. Extract the ZIP file to any location on your computer
2. Create a `.env` file (see below)
3. Double-click `start.bat`
4. Open http://localhost:3001 in your browser

## Detailed Setup

### 1. Prerequisites
- Windows 10 or later
- Node.js (Download from https://nodejs.org/ - Choose LTS version)
- OpenAI API Key (Get from https://platform.openai.com/api-keys)
- Ideogram API Key (Get from https://ideogram.ai/api)

### 2. Installation Steps

#### A. Install Node.js
1. Download Node.js from https://nodejs.org/
2. Run the installer
3. Follow the installation wizard
4. Restart your computer after installation

#### B. Set Up the Application
1. Extract `ideogramFIRE.zip` to any folder
2. Open the extracted folder
3. Create a new file named `.env` in the main folder
4. Add your API keys to the `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   IDEOGRAM_API_KEY=your_ideogram_api_key_here
   PORT=3001
   ```

### 3. Running the Application

#### Method 1: Using start.bat (Recommended)
1. Double-click `start.bat`
2. Wait for the application to start
3. Open http://localhost:3001 in your browser

#### Method 2: Manual Start
1. Open Command Prompt
2. Navigate to the application folder:
   ```
   cd path\to\ideogramFIRE
   ```
3. Run:
   ```
   npm install
   cd frontend
   npm install
   npm run build
   cd ..
   npm start
   ```

### 4. Troubleshooting

#### Common Issues:

1. **"Node.js is not installed"**
   - Download and install Node.js from https://nodejs.org/
   - Restart your computer after installation

2. **"Port 3001 is already in use"**
   - Close other applications that might be using port 3001
   - Or change the port in `.env` file to another number (e.g., 3002)

3. **"API keys not working"**
   - Verify your API keys in the `.env` file
   - Make sure there are no spaces around the = sign
   - Ensure you have valid API keys from OpenAI and Ideogram

4. **Application won't start**
   - Make sure you're in the correct directory
   - Try running `start.bat` as administrator
   - Check if all files were extracted properly

### 5. Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Look for error messages in the command prompt window
3. Contact the development team for assistance

## File Structure
```
ideogramFIRE/
├── backend/         # Server code
├── frontend/        # Frontend code
├── .env            # Your API keys (create this)
├── start.bat       # Quick start script
├── README.md       # Project documentation
└── SETUP_GUIDE.md  # This guide
``` 