# Railway Deployment Guide

This branch is configured for Railway deployment.

## Quick Deploy to Railway

1. **Fork/Clone this repository**
2. **Go to [Railway.app](https://railway.app)**
3. **Sign up with GitHub**
4. **Click "New Project" → "Deploy from GitHub repo"**
5. **Select this repository and the `RailWay` branch**
6. **Set Environment Variables:**
   - `OPENAI_API_KEY` = your OpenAI API key
   - `IDEOGRAM_API_KEY` = your Ideogram API key
7. **Deploy!**

## Environment Variables Required

```
OPENAI_API_KEY=your_openai_api_key_here
IDEOGRAM_API_KEY=your_ideogram_api_key_here
PORT=3001
```

## Railway Configuration

- **Start Command**: `npm start`
- **Build Command**: Automatic (detects Node.js)
- **Port**: 3001 (configured in server.js)

## Features

✅ Full-stack Node.js + React application  
✅ Express.js backend with API endpoints  
✅ React frontend with image generation  
✅ File upload and processing  
✅ ZIP export functionality  
✅ CORS properly configured  
✅ Environment variables support  

## Local Development

```bash
cd ideogramFIRE
npm install
npm start
```

Visit: http://localhost:3001

## Railway Benefits

- 🆓 **Free tier**: 500 hours/month + $5 credits
- 🚀 **Automatic deployments** from GitHub
- 🔧 **Easy environment variable management**
- 📊 **Built-in monitoring and logs**
- 🌐 **Custom domains** (optional) 