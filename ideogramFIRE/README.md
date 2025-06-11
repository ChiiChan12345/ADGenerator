# IdeogramFIRE Image Generator

A powerful image generation tool that combines OpenAI and Ideogram AI capabilities.

## Quick Start

### Download
1. Click the green "Code" button above
2. Select "Download ZIP"
3. Extract the ZIP file to any location on your computer

### For Windows Users:
1. Install Node.js from https://nodejs.org/ (Choose LTS version)
2. Double-click `start.bat`
3. Open http://localhost:3001 in your browser

### For Mac Users:
1. Install Node.js from https://nodejs.org/ (Choose LTS version)
2. Open Terminal
3. Navigate to the extracted folder:
   ```
   cd path/to/ideogramFIRE
   ```
4. Make the start script executable:
   ```
   chmod +x start.sh
   ```
5. Run the start script:
   ```
   ./start.sh
   ```
6. Open http://localhost:3001 in your browser

## Features
- Generate images using Ideogram AI
- Process prompts with OpenAI
- Modern, responsive UI
- Cross-platform support (Windows & Mac)

## Troubleshooting

### Common Issues:

1. **"Node.js is not installed"**
   - Download and install Node.js from https://nodejs.org/
   - Restart your computer after installation

2. **"Port 3001 is already in use"**
   - Close other applications using port 3001
   - Or change the port in `.env` file to another number (e.g., 3002)

3. **"Permission denied" (Mac)**
   - Run `chmod +x start.sh` to make the script executable

4. **Startup Issues**
   - Check the `startup_log.txt` file for detailed error information
   - Make sure all files were extracted properly

## Need Help?
If you encounter any issues:
1. Check the troubleshooting section above
2. Look for error messages in the terminal/command prompt
3. Check the `startup_log.txt` file for detailed error information
4. Contact the development team for assistance

## File Structure
```
ideogramFIRE/
├── .env                    # API keys (included)
├── start.bat              # Windows startup script
├── start.sh               # Mac startup script
├── package.json           # Dependencies
├── README.md              # This file
├── frontend/              # Frontend code
└── backend/               # Backend server code
```

## Project Structure

```
ideogramFIRE/
├── backend/         # Backend server code
├── frontend/        # React frontend code
├── .env            # Environment variables
└── package.json    # Project dependencies
```

## Support

For any issues or questions, please contact the development team. 