# Smart Internship Guidance Bot API

This is a FastAPI-based REST API for an intelligent internship guidance chatbot. It provides personalized career guidance, internship recommendations, and skill development advice using Google's Generative AI (Gemini 1.5 Flash) to analyze user profiles and provide tailored career assistance.

## Features

- **Pure REST API:** Clean API endpoints for integration with any frontend or client application.
- **AI-Powered Career Guidance:** Utilizes Google's Gemini model to provide:
  - Personalized internship recommendations based on skills and experience
  - Career path suggestions aligned with user's background
  - Skill gap analysis and development recommendations
  - Educational resource suggestions
  - Interview preparation tips and industry insights
- **Resume Analysis:** Comprehensive resume evaluation featuring:
  - Strengths and areas for improvement identification
  - Career readiness assessment
  - Profile strength evaluation
  - Industry alignment analysis
- **Smart Recommendations:** Generates personalized internship opportunities from top companies like:
  - Microsoft, Flipkart, Zomato, and other leading organizations
  - Match percentage calculation based on user skills
  - Detailed requirements and application links
- **Structured Data Output:** Returns recommendations, skill gaps, and next steps in JSON format.
- **Session Management:** Maintains chat history per session for continuous guidance.
- **RESTful API:** Full API endpoints for chat, resume analysis, tips, and history management.

## Technology Stack

- **Python 3.8 or later**
- **FastAPI:** For the REST API framework.
- **Uvicorn:** ASGI server for running the FastAPI application.
- **Google Generative AI (genai):** For language understanding and generation (Gemini 1.5 Flash model).
- **Pydantic:** For data validation and serialization.

## Setup and Installation

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/dheeraj2309/mentalhealth-chatbot
    cd mentalhealth-chatbot
    ```

2.  **Create a Virtual Environment (Recommended):**

    ```bash
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```

3.  **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **API Key Configuration (Crucial!):**
    You need to set your Google Generative AI API key as an environment variable:

    - **Windows:**

      ```cmd
      set API_KEY=your_google_ai_api_key_here
      ```

    - **Linux/macOS:**

      ```bash
      export API_KEY=your_google_ai_api_key_here
      ```

    - **For Permanent Setup (Recommended):**
      Create a `.env` file in the project root and add:
      ```
      API_KEY=your_google_ai_api_key_here
      ```
      Then install python-dotenv and load it:
      ```bash
      pip install python-dotenv
      ```

5.  **Run the Application:**

    **Option 1: Using the run script (Recommended):**

    ```bash
    python run_internship_bot.py
    ```

    **Option 2: Using uvicorn directly:**

    ```bash
    uvicorn internship_bot:app --host 0.0.0.0 --port 8001 --reload
    ```

6.  **Start the API Server:**
    The API will be available at `http://localhost:8001`

## API Endpoints

The FastAPI application provides the following endpoints:

- **GET /health** - Health check endpoint
- **POST /chat** - Send a message and receive career guidance with recommendations
- **GET /history/{session_id}** - Get chat history for a session
- **DELETE /history/{session_id}** - Clear chat history for a session
- **POST /analyze-resume** - Upload and analyze resume for career guidance
- **GET /internship-tips** - Get general internship search and application tips
- **GET /docs** - Interactive API documentation (Swagger UI)
- **GET /redoc** - Alternative API documentation

## API Usage Examples

### Check API Health

```bash
curl -X GET "http://localhost:8001/health"
```

### Send a Career Guidance Message

```bash
curl -X POST "http://localhost:8001/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "I am looking for internships in web development", "session_id": "user123"}'
```

### Analyze Resume

```bash
curl -X POST "http://localhost:8001/analyze-resume" \
     -H "Content-Type: application/json" \
     -d @resume_data.json
```

### Get Internship Tips

```bash
curl -X GET "http://localhost:8001/internship-tips"
```

### Get Chat History

```bash
curl -X GET "http://localhost:8001/history/user123"
```

### Clear Chat History

```bash
curl -X DELETE "http://localhost:8001/history/user123"
```

## API Response Format

### Chat Response Example

```json
{
  "response": "Based on your interest in web development and your skills, I'd recommend focusing on full-stack development opportunities. Here are some suggestions...",
  "recommendations": [
    {
      "company": "Microsoft",
      "position": "Software Development Intern",
      "location": "Bangalore, India",
      "match_percentage": 92,
      "why_recommended": "Strong match with your JavaScript and React skills. Great learning opportunity in a global tech company.",
      "requirements": ["JavaScript", "React", "Problem-solving skills", "CS fundamentals"],
      "application_link": "https://careers.microsoft.com/internships"
    }
  ],
  "educational_suggestions": [
    "Complete relevant online courses on Coursera or edX",
    "Build portfolio projects showcasing your skills",
    "Participate in hackathons and coding competitions"
  ],
  "skill_gaps": [
    "TypeScript - Enhance your React development skills",
    "Testing frameworks (Jest, Cypress) - Essential for professional development"
  ],
  "next_steps": [
    "Update your resume with latest projects and skills",
    "Create or optimize your LinkedIn profile",
    "Research companies that align with your interests"
  ]
}
```

### Resume Analysis Response Example

```json
{
  "analysis": "Your profile shows strong technical skills in web development with practical project experience...",
  "recommendations": [
    {
      "company": "Flipkart",
      "position": "Frontend Development Intern",
      "location": "Bangalore, India",
      "match_percentage": 88,
      "why_recommended": "Perfect for your web development skills...",
      "requirements": ["HTML5", "CSS3", "JavaScript", "React", "Git"]
    }
  ],
  "profile_strength": "Strong",
  "career_readiness": "Ready for internships"
}
```

## How it Works

1.  **API Request:** A client sends a POST request to `/chat` with a message and session ID.
2.  **Profile Analysis:** The system uses the provided resume data or sample profile to understand the user's background.
3.  **AI-Powered Guidance:** The input is processed by Google's Gemini model which:
    - Analyzes the user's career query in context of their skills and experience
    - Generates personalized career advice and guidance
    - Provides actionable recommendations based on current industry trends
4.  **Smart Recommendations:** Based on the user's skills and field of study:
    - Generates relevant internship opportunities from top companies
    - Calculates match percentages based on skill alignment
    - Provides specific requirements and application links
5.  **Skill Gap Analysis:** Identifies areas for improvement and suggests:
    - Missing technical skills that would enhance career prospects
    - Educational resources and learning paths
    - Timeline suggestions for skill development
6.  **Structured Response:** Returns comprehensive guidance including:
    - Personalized career advice
    - Internship recommendations with match scores
    - Educational suggestions and next steps
    - Skill development roadmap

## Deployment

### Local Development

Follow the setup instructions above.

### Production Deployment

1. Set the `API_KEY` environment variable on your server
2. Install dependencies: `pip install -r requirements.txt`
3. Run with a production server: `uvicorn internship_bot:app --host 0.0.0.0 --port 8001`

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8001

CMD ["uvicorn", "internship_bot:app", "--host", "0.0.0.0", "--port", "8001"]
```

Build and run:

```bash
docker build -t smart-internship-bot .
docker run -p 8001:8001 -e API_KEY=your_api_key_here smart-internship-bot
```

## File Structure

```
mentalhealth-chatbot/
├── internship_bot.py          # Main FastAPI application
├── run_internship_bot.py      # Startup script
├── requirements.txt           # Python dependencies
├── README.md                  # This file
└── .env                       # Environment variables (create this)
```

## Disclaimer

This internship guidance bot is for informational and educational purposes only. It provides general career advice and suggestions based on available data and AI analysis. The recommendations should not be considered as guaranteed job placements or professional career counseling. Users should conduct their own research and due diligence when applying for internships. Always verify company information and job requirements independently before applying.

---
