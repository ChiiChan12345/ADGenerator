# IdeogramFIRE Image Generator

A web application for generating AI-powered images using Ideogram and OpenAI APIs.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- OpenAI API Key
- Ideogram API Key

## Setup Instructions

1. **Clone or download this repository**

2. **Install Dependencies**
   ```bash
   cd ideogramFIRE
   npm install
   cd frontend
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with:
   ```
   OPENAI_API_KEY=your_openai_api_key
   IDEOGRAM_API_KEY=your_ideogram_api_key
   PORT=3001
   ```

4. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

## Running the Application

1. **Start the Server**
   ```bash
   cd ideogramFIRE
   npm start
   ```

2. **Access the Application**
   - Open your browser
   - Go to http://localhost:3001

## Troubleshooting

If you encounter any issues:

1. **Port Already in Use**
   - Check if port 3001 is available
   - You can change the port in the `.env` file

2. **API Keys Not Working**
   - Verify your API keys in the `.env` file
   - Make sure you have valid API keys for both OpenAI and Ideogram

3. **Build Issues**
   - Make sure you've run `npm install` in both root and frontend directories
   - Try deleting `node_modules` and running `npm install` again

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