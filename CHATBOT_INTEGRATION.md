# Job Recommendation Chatbot Integration

This document explains how to set up and use the chatbot integration between the Next.js frontend and your existing FastAPI backend.

## Setup Instructions

### 1. Backend Setup (FastAPI Chatbot)

Navigate to the chatbot directory:

```bash
cd chatbot
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Make sure your API_KEY environment variable is set:

```bash
set API_KEY=your_google_ai_api_key_here
```

Start your existing FastAPI server:

```bash
python run_internship_bot.py
```

Or use the batch file (Windows):

```bash
start_chatbot.bat
```

The FastAPI server will run on `http://localhost:8001`

- API Documentation: `http://localhost:8001/docs`
- Health Check: `http://localhost:8001/health`

### 2. Frontend Setup (Next.js)

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

### Chatbot UI Components

- **Floating Chat Button**: Fixed position button in bottom-right corner
- **Chat Window**: Expandable chat interface with messages
- **Message History**: Persistent conversation history
- **Typing Indicators**: Shows when bot is processing
- **Responsive Design**: Works on desktop and mobile
- **Tailwind CSS**: Fully styled with Tailwind v4 classes

### Chatbot Context

- **ChatbotProvider**: React context provider for state management
- **Message Management**: Add, clear, and manage chat messages
- **API Integration**: Connects to Python backend via HTTP requests
- **Fallback Responses**: Works offline with predefined responses

### API Integration

- **RESTful API**: `/api/chatbot` endpoint for message processing
- **FastAPI Backend**: Direct integration with your existing internship bot
- **Rich Responses**: Supports recommendations, educational suggestions, skill gaps, and next steps
- **Cross-Origin Support**: CORS enabled for frontend-backend communication
- **Error Handling**: Graceful fallback when backend is unavailable

## File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/chatbot/route.ts          # API endpoint (connects to FastAPI)
│   │   └── layout.tsx                    # Root layout with chatbot
│   └── components/chatbot/
│       ├── chatbot.tsx                   # Main chatbot component (Tailwind CSS)
│       └── context/
│           └── ChatbotContext.tsx        # React context with FastAPI integration

chatbot/
├── internship_bot.py                     # Your existing FastAPI chatbot
├── run_internship_bot.py                 # FastAPI server runner
├── requirements.txt                      # Python dependencies
└── start_chatbot.bat                     # Windows startup script
```

## Usage

1. **Start the Backend**: Run your FastAPI server first
2. **Start the Frontend**: Run the Next.js development server
3. **Open the App**: Navigate to `http://localhost:3000`
4. **Use the Chatbot**: Click the chat button (💬) in the bottom-right corner

## Features

The chatbot now integrates directly with your FastAPI backend and supports:

- **💬 Natural Conversations**: Powered by your Gemini AI integration
- **📋 Internship Recommendations**: Company matches with percentages
- **📚 Educational Suggestions**: Learning paths and courses
- **🎯 Skill Gap Analysis**: Identifies areas for improvement
- **🚀 Next Steps**: Actionable career guidance
- **📱 Responsive Design**: Works on all devices

## Customization

### Adding New Response Types

Edit the `getBotResponse` function in `ChatbotContext.tsx` or update your `internship_bot.py` file.

### Styling

The chatbot is fully styled with Tailwind CSS v4. Modify the className attributes in `chatbot.tsx` to change the appearance.

### API Integration

Update the API endpoint in `ChatbotContext.tsx` to match your backend configuration.

## Troubleshooting

### Common Issues

1. **Backend Not Starting**

   - Check if all dependencies are installed: `pip install -r requirements.txt`
   - Ensure API_KEY environment variable is set
   - Ensure no other service is using port 8001

2. **Frontend Not Connecting to Backend**

   - Verify the FastAPI server is running on `http://localhost:8001`
   - Check browser console for CORS errors
   - Visit `http://localhost:8001/docs` to verify API is accessible

3. **Chatbot Not Responding**
   - Check if the FastAPI server is running
   - Verify the `/chat` endpoint is accessible at `http://localhost:8001/chat`
   - Check your API_KEY is valid for Google Generative AI

### Testing the API

Test your FastAPI backend directly:

```bash
curl -X POST http://localhost:8001/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "session_id": "test_session"}'
```

Or visit the interactive docs at `http://localhost:8001/docs`

## Integration with Your FastAPI Bot

The system now works directly with your existing `internship_bot.py` FastAPI application. The frontend:

1. Sends messages to `/api/chatbot` (Next.js API route)
2. Forwards requests to your FastAPI `/chat` endpoint
3. Receives rich responses with recommendations and suggestions
4. Formats and displays the complete response in the chat UI

No additional server setup required - just use your existing FastAPI bot!
