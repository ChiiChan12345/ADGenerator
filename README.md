# IdeogramFIRE Image Generator

A powerful AI image generation tool that combines OpenAI and Ideogram AI capabilities to create stunning images from text prompts.

![IdeogramFIRE](https://github.com/ChiiChan12345/ADGenerator/raw/main/ideogramFIRE/frontend/public/logo192.png)

## 🚀 Quick Start

### Download
1. Go to the [Releases](https://github.com/ChiiChan12345/ADGenerator/releases) page
2. Download the latest release ZIP file
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

## ✨ Features

- 🎨 Generate high-quality images using Ideogram AI
- 🤖 Process and enhance prompts with OpenAI
- 💻 Modern, responsive user interface
- 🌐 Cross-platform support (Windows & Mac)
- 🔄 Real-time image generation
- 📱 Mobile-friendly design

## 🛠️ Technical Details

- **Frontend**: React.js with modern UI components
- **Backend**: Node.js with Express
- **APIs**: OpenAI and Ideogram AI integration
- **Build Tools**: npm and webpack

## 🔧 Troubleshooting

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

## 📁 Project Structure
```
ideogramFIRE/
├── .env                    # API keys (included)
├── start.bat              # Windows startup script
├── start.sh               # Mac startup script
├── package.json           # Dependencies
├── README.md              # Documentation
├── frontend/              # Frontend code
└── backend/               # Backend server code
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **ChiiChan12345** - *Initial work* - [GitHub Profile](https://github.com/ChiiChan12345)

## 🙏 Acknowledgments

- OpenAI for their powerful API
- Ideogram AI for image generation capabilities
- The open-source community for various tools and libraries 