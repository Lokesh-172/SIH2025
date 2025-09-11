from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from typing import List, Dict, Optional, Union
from dotenv import load_dotenv

# Load environment variables from .env file (for local development)
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Smart Internship Guidance Bot", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get API key from environment variable
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY environment variable is required")

genai.configure(api_key=api_key)

try:
    llm_model = genai.GenerativeModel("gemini-1.5-flash")
except Exception as e:
    raise RuntimeError(f"Failed to initialize the Generative Model: {e}")

# Resume Analysis Data Models
class ResumeAnalysisData(BaseModel):
    score: int
    overall_feedback: str
    detailed_feedback: List[Dict[str, Union[str, List[str]]]]
    quiz_questions_with_answers: Optional[List[Dict[str, Union[str, List[str]]]]] = None
    analyzed_at: str

class UserProfile(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    skills: Optional[List[str]] = None
    college: Optional[str] = None
    course: Optional[str] = None
    graduation_year: Optional[str] = None
    resume_analysis: Optional[ResumeAnalysisData] = None
    quiz_results: Optional[List[Dict[str, Union[int, str]]]] = None

# API Request/Response Models
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default_session"
    user_profile: Optional[UserProfile] = None

class ChatResponse(BaseModel):
    response: str

def get_chat_prompt(user_message: str, user_profile: Optional[UserProfile] = None) -> str:
    """Create an improved prompt for the DISHA internship guidance chatbot assistant."""
    
    user_context = ""
    personalization_note = ""
    
    # Build context from user profile if available
    if user_profile:
        user_context = f"""
User Context:
- Name: {user_profile.name}
- Education: {user_profile.course or 'Not specified'} at {user_profile.college or 'Not specified'}
- Skills: {', '.join(user_profile.skills) if user_profile.skills else 'Not specified'}
- Location: {user_profile.location or 'Not specified'}"""
        
        # Add resume analysis if available
        if user_profile.resume_analysis:
            score = user_profile.resume_analysis.score
            user_context += f"\n- Resume Score: {score}/100"
            
            # Add subtle personalization hints
            if score < 70:
                personalization_note = "Focus on resume improvement tips. "
            elif score >= 85:
                personalization_note = "User has strong profile, provide advanced strategies. "
        
        # Add quiz results if available
        if user_profile.quiz_results:
            latest_quiz = user_profile.quiz_results[-1]
            quiz_score = latest_quiz.get('score', 'N/A')
            user_context += f"\n- Latest Quiz Score: {quiz_score}%"
            
            if isinstance(quiz_score, (int, float)) and quiz_score < 75:
                personalization_note += "May need foundational guidance. "
    
    prompt = f"""You are DISHA's friendly internship guidance assistant. Help users with practical internship advice in a conversational, supportive manner.

{user_context}

User Message: {user_message}

Guidelines:
- Be conversational, helpful, and encouraging
- {personalization_note}Give specific, actionable internship advice
- Reference user's background when available for personalized tips
- Keep responses focused and concise (1-2 short paragraphs)
- Include practical next steps they can take
- Mention relevant DISHA platform features when appropriate
- Stay positive and solution-oriented

Respond naturally as a knowledgeable mentor would in a brief conversation."""
    
    return prompt

@app.post("/chat", response_model=ChatResponse)
async def chat_with_bot(request: ChatRequest):
    """Main chat endpoint for internship guidance."""
    try:
        # Process message directly without session storage
        user_profile = request.user_profile
        
        # Generate response using AI with user profile data
        prompt = get_chat_prompt(request.message, user_profile)
        
        try:
            ai_response = llm_model.generate_content(prompt)
            response_text = ai_response.text
        except Exception as e:
            response_text = f"I apologize, but I'm having trouble generating a response right now. However, I can still provide some general internship guidance based on your query."
        
        # Create response
        chat_response = ChatResponse(response=response_text)
        
        # Return response directly
        return chat_response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    # Get port from environment variable (Render provides this) or default to 8001
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=False)
