# IdeogramFIRE Setup Guide

## Quick Start

### For Windows Users:
1. Download and install Node.js from https://nodejs.org/ (Choose LTS version)
2. Extract `ideogramFIRE.zip` to any folder
3. Double-click `start.bat`
4. Open http://localhost:3001 in your browser

### For Mac Users:
1. Download and install Node.js from https://nodejs.org/ (Choose LTS version)
2. Extract `ideogramFIRE.zip` to any folder
3. Open Terminal
4. Navigate to the extracted folder:
   ```
   cd path/to/ideogramFIRE
   ```
5. Make the start script executable:
   ```
   chmod +x start.sh
   ```
6. Run the start script:
   ```
   ./start.sh
   ```
7. Open http://localhost:3001 in your browser

## Required API Keys
1. OpenAI API Key: Get from https://platform.openai.com/api-keys
2. Ideogram API Key: Get from https://ideogram.ai/api

## Troubleshooting

### If the start script doesn't work:

#### Windows:
1. Open Command Prompt
2. Navigate to the folder:
   ```
   cd path\to\ideogramFIRE
   ```
3. Run these commands:
   ```
   npm install
   cd frontend
   npm install
   npm run build
   cd ..
   npm start
   ```

#### Mac:
1. Open Terminal
2. Navigate to the folder:
   ```
   cd path/to/ideogramFIRE
   ```
3. Run these commands:
   ```
   npm install
   cd frontend
   npm install
   npm run build
   cd ..
   npm start
   ```

### Common Issues:
1. "Node.js is not installed"
   - Download and install Node.js from https://nodejs.org/
   - Restart your computer after installation

2. "Port 3001 is already in use"
   - Close other applications using port 3001
   - Or change the port in `.env` file to another number (e.g., 3002)

3. "Permission denied" (Mac)
   - Run `chmod +x start.sh` to make the script executable

4. "API keys not working"
   - Verify your API keys in the `.env` file
   - Make sure there are no spaces around the = sign

## Need Help?
If you encounter any issues:
1. Check the troubleshooting section above
2. Look for error messages in the terminal/command prompt
3. Check the `startup_log.txt` file for detailed error information
4. Contact the development team for assistance 