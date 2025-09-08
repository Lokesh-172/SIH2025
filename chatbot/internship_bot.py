from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import json
import re
import os
from typing import List, Dict, Optional, Union
from datetime import datetime
from dotenv import dotenv_values
config = dotenv_values(".env") 

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
api_key = config.get("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("API_KEY environment variable is required")

genai.configure(api_key=api_key)

try:
    llm_model = genai.GenerativeModel("gemini-1.5-flash")
except Exception as e:
    raise RuntimeError(f"Failed to initialize the Generative Model: {e}")

# Resume Schema Models
class Location(BaseModel):
    city: str
    country: str

class PersonalData(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    linkedin: Optional[str] = None
    portfolio: Optional[str] = None
    location: Location

class Experience(BaseModel):
    jobTitle: str
    company: str
    location: str
    startDate: str  # YYYY-MM-DD
    endDate: str    # YYYY-MM-DD or Present
    description: List[str]
    technologiesUsed: List[str]

class Project(BaseModel):
    projectName: str
    description: str
    technologiesUsed: List[str]
    link: Optional[str] = None
    startDate: str  # YYYY-MM-DD
    endDate: str    # YYYY-MM-DD

class Skill(BaseModel):
    category: str
    skillName: str

class ResearchWork(BaseModel):
    title: Optional[str] = None
    publication: Optional[str] = None
    date: Optional[str] = None  # YYYY-MM-DD
    link: Optional[str] = None
    description: Optional[str] = None

class Education(BaseModel):
    institution: str
    degree: str
    fieldOfStudy: Optional[str] = None
    startDate: str  # YYYY-MM-DD
    endDate: str    # YYYY-MM-DD
    grade: str
    description: str

class ResumeSchema(BaseModel):
    UUID: str
    personalData: PersonalData
    experiences: List[Experience]
    projects: List[Project]
    skills: List[Skill]
    researchWork: List[ResearchWork]
    achievements: List[str]
    education: List[Education]
    extractedKeywords: List[str]

# API Request/Response Models
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default_session"
    resume_data: Optional[ResumeSchema] = None

class InternshipRecommendation(BaseModel):
    company: str
    position: str
    location: str
    match_percentage: int
    why_recommended: str
    requirements: List[str]
    application_link: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    recommendations: Optional[List[InternshipRecommendation]] = None
    educational_suggestions: Optional[List[str]] = None
    skill_gaps: Optional[List[str]] = None
    next_steps: Optional[List[str]] = None

# In-memory storage for chat sessions
chat_sessions: Dict[str, List[Dict[str, str]]] = {}

# Sample Resume Data for Demo
SAMPLE_RESUME = ResumeSchema(
    UUID="sample-user-123",
    personalData=PersonalData(
        firstName="Priya",
        lastName="Sharma",
        email="priya.sharma@email.com",
        phone="+91-9876543210",
        linkedin="https://linkedin.com/in/priyasharma",
        portfolio="https://priyasharma.dev",
        location=Location(city="Bangalore", country="India")
    ),
    experiences=[
        Experience(
            jobTitle="Software Development Intern",
            company="TechCorp Solutions",
            location="Bangalore, India",
            startDate="2024-06-01",
            endDate="2024-08-31",
            description=[
                "Developed responsive web applications using React and Node.js",
                "Collaborated with cross-functional teams to deliver features",
                "Participated in code reviews and agile development processes"
            ],
            technologiesUsed=["React", "Node.js", "JavaScript", "MongoDB", "Git"]
        )
    ],
    projects=[
        Project(
            projectName="E-Commerce Platform",
            description="Built a full-stack e-commerce website with user authentication, product catalog, and payment integration",
            technologiesUsed=["React", "Node.js", "Express", "MongoDB", "Stripe API"],
            link="https://github.com/priya/ecommerce-platform",
            startDate="2024-03-01",
            endDate="2024-05-31"
        ),
        Project(
            projectName="Weather Forecast App",
            description="Mobile-responsive weather application with location-based forecasting",
            technologiesUsed=["JavaScript", "HTML5", "CSS3", "OpenWeather API"],
            link="https://github.com/priya/weather-app",
            startDate="2024-01-15",
            endDate="2024-02-28"
        )
    ],
    skills=[
        Skill(category="Programming Languages", skillName="JavaScript"),
        Skill(category="Programming Languages", skillName="Python"),
        Skill(category="Frontend", skillName="React"),
        Skill(category="Frontend", skillName="HTML5"),
        Skill(category="Frontend", skillName="CSS3"),
        Skill(category="Backend", skillName="Node.js"),
        Skill(category="Backend", skillName="Express"),
        Skill(category="Database", skillName="MongoDB"),
        Skill(category="Database", skillName="MySQL"),
        Skill(category="Tools", skillName="Git"),
        Skill(category="Tools", skillName="VS Code")
    ],
    researchWork=[],
    achievements=[
        "Winner of College Hackathon 2024",
        "Google Developer Student Club Member",
        "Completed 100 Days of Code Challenge"
    ],
    education=[
        Education(
            institution="Indian Institute of Technology, Bangalore",
            degree="Bachelor of Technology",
            fieldOfStudy="Computer Science and Engineering",
            startDate="2022-08-01",
            endDate="2026-05-31",
            grade="8.5 CGPA",
            description="Specializing in Software Engineering and Data Structures"
        )
    ],
    extractedKeywords=[
        "JavaScript", "React", "Node.js", "Full-stack", "Web Development",
        "MongoDB", "Git", "Agile", "Frontend", "Backend", "API Integration"
    ]
)

def get_internship_guidance_prompt(user_message: str, resume_data: Optional[ResumeSchema] = None) -> str:
    """Create a comprehensive prompt for internship guidance."""
    
    resume_context = ""
    if resume_data:
        skills_list = [skill.skillName for skill in resume_data.skills]
        projects_list = [proj.projectName for proj in resume_data.projects]
        education_info = resume_data.education[0] if resume_data.education else None
        
        resume_context = f"""
        User's Profile:
        - Name: {resume_data.personalData.firstName} {resume_data.personalData.lastName}
        - Education: {education_info.degree if education_info else 'Not specified'} in {education_info.fieldOfStudy if education_info else 'Not specified'}
        - Location: {resume_data.personalData.location.city}, {resume_data.personalData.location.country}
        - Skills: {', '.join(skills_list)}
        - Projects: {', '.join(projects_list)}
        - Experience Level: {len(resume_data.experiences)} previous internship(s)
        """
    
    prompt = f"""
    You are a helpful career guidance assistant for the Smart Internship Guidance Bot.

    When answering, do NOT restate or repeat the user's question.
    Start directly with the answer or advice.
    Keep the tone natural and conversational (like a person, not a list).
    Be clear and concise — focus on the key information and actionable tips.
    Avoid filler phrases like “Hi there” or “It's great you're asking this”.
    Write answers in one or two short paragraphs, maximum.
    Do NOT recommend external websites or portals (LinkedIn, Glassdoor, etc.).
    Always direct the user to explore internship opportunities through the PMIS (PM Internship Scheme) website only, and mention that they can also check the “most recommended jobs” tailored to their profile on PMIS.


    {resume_context}

    User Query: {user_message}

    Your Response Guidelines:
    1. GENERAL INTERNSHIP KNOWLEDGE: Provide practical advice on:
       - How to search for internships effectively
       - Application strategies and timeline planning
       - Interview preparation tips
       - Networking and professional relationship building
       - Resume and cover letter optimization

    2. EDUCATIONAL RECOMMENDATIONS: Suggest:
       - Relevant courses, certifications, or skills to develop
       - Learning platforms and resources (Coursera, edX, Udemy, YouTube)
       - Industry-specific knowledge areas to focus on
       - Projects that would strengthen their profile

    3. PERSONALIZED GUIDANCE: Based on their profile:
       - Identify skill gaps and areas for improvement
       - Suggest specific internship opportunities that match their background
       - Provide sector-specific advice (tech, finance, marketing, etc.)
       - Consider their location and accessibility constraints

    4. SPECIAL CONSIDERATIONS for First-Generation/Rural Learners:
       - Use simple, clear language
       - Provide step-by-step actionable advice
       - Consider digital literacy and resource constraints
       - Suggest free or low-cost learning resources
       - Address confidence-building and soft skills

    5. STRUCTURED RESPONSE: Organize your answer with:
       - Direct answer to their question
       - 3-5 specific action items they can take
       - Educational resources or skills to develop
       - Timeline suggestions for their goals

    Be encouraging, practical, and specific. Focus on actionable advice that can be implemented immediately.
    """
    
    return prompt

def generate_sample_recommendations(skills: List[str], field_of_study: str) -> List[InternshipRecommendation]:
    """Generate sample internship recommendations based on user profile."""
    
    recommendations = []
    
    if "JavaScript" in skills or "React" in skills or field_of_study.lower() in ["computer science", "software engineering"]:
        recommendations.extend([
            InternshipRecommendation(
                company="Microsoft",
                position="Software Development Intern",
                location="Bangalore, India",
                match_percentage=92,
                why_recommended="Strong match with your JavaScript and React skills. Great learning opportunity in a global tech company.",
                requirements=["JavaScript", "React", "Problem-solving skills", "CS fundamentals"],
                application_link="https://careers.microsoft.com/internships"
            ),
            InternshipRecommendation(
                company="Flipkart",
                position="Frontend Development Intern",
                location="Bangalore, India",
                match_percentage=88,
                why_recommended="Perfect for your web development skills. Exposure to large-scale e-commerce systems.",
                requirements=["HTML5", "CSS3", "JavaScript", "React", "Git"],
                application_link="https://www.flipkartcareers.com/internships"
            ),
            InternshipRecommendation(
                company="Zomato",
                position="Full Stack Developer Intern",
                location="Gurgaon, India",
                match_percentage=85,
                why_recommended="Great opportunity to work on both frontend and backend technologies.",
                requirements=["JavaScript", "Node.js", "MongoDB", "React", "API development"],
                application_link="https://www.zomato.com/careers/internships"
            )
        ])
    
    if "Python" in skills or "Data" in field_of_study:
        recommendations.append(
            InternshipRecommendation(
                company="Razorpay",
                position="Data Science Intern",
                location="Bangalore, India",
                match_percentage=80,
                why_recommended="Good opportunity to apply Python skills in fintech and data analysis.",
                requirements=["Python", "Data Analysis", "SQL", "Statistics", "Machine Learning basics"],
                application_link="https://razorpay.com/careers/internships"
            )
        )
    
    return recommendations[:3]  # Return top 3 recommendations

@app.post("/chat", response_model=ChatResponse)
async def chat_with_bot(request: ChatRequest):
    """Main chat endpoint for internship guidance."""
    try:
        # Use sample resume if none provided
        resume_data = request.resume_data or SAMPLE_RESUME
        
        # Initialize session if it doesn't exist
        if request.session_id not in chat_sessions:
            chat_sessions[request.session_id] = []
        
        # Add user message to session
        chat_sessions[request.session_id].append({
            "role": "user",
            "content": request.message,
            "timestamp": datetime.now().isoformat()
        })
        
        # Generate response using AI
        prompt = get_internship_guidance_prompt(request.message, resume_data)
        
        try:
            ai_response = llm_model.generate_content(prompt)
            response_text = ai_response.text
        except Exception as e:
            response_text = f"I apologize, but I'm having trouble generating a response right now. However, I can still provide some general internship guidance based on your query."
        
        # Generate recommendations if the query is about internship suggestions
        recommendations = None
        if any(keyword in request.message.lower() for keyword in ['recommend', 'suggest', 'internship', 'opportunities', 'apply']):
            skills = [skill.skillName for skill in resume_data.skills]
            field_of_study = resume_data.education[0].fieldOfStudy if resume_data.education else ""
            recommendations = generate_sample_recommendations(skills, field_of_study)
        
        # Generate educational suggestions
        educational_suggestions = [
            "Complete relevant online courses on Coursera or edX",
            "Build portfolio projects showcasing your skills",
            "Participate in hackathons and coding competitions",
            "Join professional communities and networking groups",
            "Practice technical interview questions regularly"
        ]
        
        # Identify skill gaps (basic example)
        skill_gaps = []
        current_skills = [skill.skillName.lower() for skill in resume_data.skills]
        if 'react' in current_skills and 'typescript' not in current_skills:
            skill_gaps.append("TypeScript - Enhance your React development skills")
        if 'javascript' in current_skills and 'testing' not in ' '.join(current_skills):
            skill_gaps.append("Testing frameworks (Jest, Cypress) - Essential for professional development")
        if 'node.js' in current_skills and 'docker' not in current_skills:
            skill_gaps.append("Docker - Important for deployment and DevOps")
        
        # Generate next steps
        next_steps = [
            "Update your resume with latest projects and skills",
            "Create or optimize your LinkedIn profile",
            "Research companies that align with your interests",
            "Prepare for technical interviews",
            "Network with professionals in your field"
        ]
        
        # Create response
        chat_response = ChatResponse(
            response=response_text,
            recommendations=recommendations,
            educational_suggestions=educational_suggestions[:3],
            skill_gaps=skill_gaps[:3],
            next_steps=next_steps[:3]
        )
        
        # Add bot response to session
        chat_sessions[request.session_id].append({
            "role": "assistant",
            "content": response_text,
            "timestamp": datetime.now().isoformat()
        })
        
        return chat_response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.get("/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session."""
    if session_id not in chat_sessions:
        return {"history": []}
    return {"history": chat_sessions[session_id]}

@app.delete("/history/{session_id}")
async def clear_chat_history(session_id: str):
    """Clear chat history for a session."""
    if session_id in chat_sessions:
        del chat_sessions[session_id]
    return {"message": "Chat history cleared successfully"}

@app.post("/analyze-resume")
async def analyze_resume(resume: ResumeSchema):
    """Analyze a resume and provide career guidance."""
    try:
        skills = [skill.skillName for skill in resume.skills]
        field_of_study = resume.education[0].fieldOfStudy if resume.education else ""
        
        # Generate analysis prompt
        analysis_prompt = f"""
        Analyze this resume and provide career guidance:
        
        Skills: {', '.join(skills)}
        Field of Study: {field_of_study}
        Experience: {len(resume.experiences)} internship(s)
        Projects: {len(resume.projects)} project(s)
        
        Provide:
        1. Strengths in the profile
        2. Areas for improvement
        3. Recommended career paths
        4. Skill development suggestions
        5. Industry alignment assessment
        """
        
        try:
            analysis_response = llm_model.generate_content(analysis_prompt)
            analysis_text = analysis_response.text
        except Exception as e:
            analysis_text = "Resume analysis is temporarily unavailable. Please try again later."
        
        return {
            "analysis": analysis_text,
            "recommendations": generate_sample_recommendations(skills, field_of_study),
            "profile_strength": "Strong" if len(skills) > 5 and len(resume.projects) > 1 else "Developing",
            "career_readiness": "Ready for internships" if len(resume.projects) > 0 else "Build more projects first"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing resume: {str(e)}")

@app.get("/internship-tips")
async def get_internship_tips():
    """Get general internship search and application tips."""
    tips = {
        "search_strategies": [
            "Use multiple job boards: LinkedIn, Indeed, Glassdoor, Naukri",
            "Check company websites directly for internship programs",
            "Leverage college career services and placement cells",
            "Attend virtual job fairs and networking events",
            "Follow companies on social media for announcements"
        ],
        "application_tips": [
            "Tailor your resume for each application",
            "Write compelling cover letters highlighting relevant experiences",
            "Apply early when internship postings open",
            "Follow up politely after applications",
            "Prepare a portfolio showcasing your best work"
        ],
        "interview_preparation": [
            "Research the company and role thoroughly",
            "Practice common interview questions",
            "Prepare examples using the STAR method",
            "Have questions ready to ask the interviewer",
            "Test your technology for virtual interviews"
        ],
        "skill_development": [
            "Focus on in-demand skills in your field",
            "Complete relevant online certifications",
            "Build practical projects for your portfolio",
            "Contribute to open-source projects",
            "Practice coding problems on platforms like LeetCode"
        ]
    }
    return tips

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)
