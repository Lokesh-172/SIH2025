import os
import fitz  
import requests
import uvicorn
from fastapi import FastAPI, UploadFile, File, HTTPException, status
from dotenv import load_dotenv
import logging
import json
import re

# --- Initial Setup & Configuration ---
load_dotenv()
app = FastAPI(
    title="ATS Resume Checker API",
    description="An API that analyzes a resume PDF using the Gemini API and returns an ATS-friendly score and feedback.",
    version="1.0.0"
)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Environment & API Configuration ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set. Please provide it in the deployment environment.")

GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key={GEMINI_API_KEY}"
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

# --- System Prompt for Gemini ---
SYSTEM_PROMPT = """
Act as an expert-level Applicant Tracking System (ATS), simulating the evaluation process used by a top company participating in the official "Prime Minister Internship Scheme".
Your function is to analyze the candidate's submission against a specific internship opportunity. The scheme's selection process is objective and tech-driven, where companies shortlist candidates based on their specific requirements. Your analysis must be rigorous, fair, and based only on the information provided below.

Overall ATS Score: A score out of 100, representing the candidate's alignment with the specified internship profile.
Summary Verdict: A 2-3 line summary of the candidate's fit, stating whether they are likely to be shortlisted by the company for the next round.

Detailed Breakdown & Analysis:
Direct Match to Profile (40% Weight): How strongly do the candidate's qualifications, skills, and experience align with his Target Sector, Field?
Demonstrated Skills & Experience (30% Weight): Evaluate the quality of the candidate's experience, projects, and skills. Is there evidence of quantifiable achievements and relevant practical knowledge?
Academic Foundation (20% Weight): Assess the relevance and strength of the candidate's educational background for this specific role.
Qualitative Assessment (10% Weight): (Only if answers are provided) Evaluate the originality, motivation, and clarity demonstrated in the answers to the three application questions.

Dynamically generate mcq quiz containing 10 questions with 4 options each relevant to the skills in the resume and in the sector, the question set should consist of 3 easy, 5 medium and 2 hard.

Your response MUST be a valid JSON object with the following structure:
{
  "score": <number>,
  "overall_feedback": "<string>",
  "detailed_feedback": [
    {
      "section": "<string>",
      "feedback": "<string>",
      "suggestions": [
        "<string>"
      ]
    }
  ],
  "quiz_questions_with_answers": [
    {
      "question": "<string>",
      "options": [
        "<string>",
        "<string>",
        "<string>",
        "<string>"
      ],
      "correct_answer": "<string>"
    }
  ]
}

Analyze the following sections: Contact Information, Summary/Objective, Work Experience, Skills, and Education. 
For each section, provide specific feedback and actionable suggestions for improvement.
"""

def extract_text_from_pdf(pdf_content: bytes):
    """Extracts text from PDF content in memory using PyMuPDF."""
    try:
        pdf_document = fitz.open(stream=pdf_content, filetype="pdf")
        full_text = "".join(page.get_text() for page in pdf_document)
        pdf_document.close()
        return full_text
    except Exception as e:
        logger.error(f"Error processing PDF with PyMuPDF: {e}")
        return None

@app.post("/analyze-resume/")
async def analyze_resume(resume: UploadFile = File(...)):
    """
    Analyzes a resume PDF to provide an ATS score and feedback.
    
    - **resume**: The PDF file of the resume to be analyzed.
    """
    # 1. Validate the uploaded file
    if not resume.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only PDF files are accepted."
        )

    pdf_content = await resume.read()
    if len(pdf_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds the limit of {MAX_FILE_SIZE / 1024 / 1024}MB."
        )

    # 2. Extract text from the PDF
    resume_text = extract_text_from_pdf(pdf_content)
    if not resume_text or not resume_text.strip():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Could not extract text from the PDF. It might be empty or image-based."
        )

    # 3. Call the Gemini API
    try:
        payload = {
            "contents": [{
                "parts": [{ "text": f"Here is the resume to analyze:\n\n{resume_text}" }]
            }],
            "systemInstruction": {
                "parts": [{ "text": SYSTEM_PROMPT }]
            },
            "generationConfig": {
                "responseMimeType": "application/json",
            }
        }
        
        response = requests.post(GEMINI_API_URL, json=payload)
        response.raise_for_status()
        
        gemini_response = response.json()
        
        analysis_json_string = gemini_response.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        if not analysis_json_string:
            raise ValueError("Received an empty response from Gemini API.")
            
        analysis_result = json.loads(analysis_json_string)
        return analysis_result

    except requests.exceptions.RequestException as e:
        logger.error(f"Error calling Gemini API: {e}")
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Failed to communicate with the analysis service.")
    except (ValueError, KeyError, IndexError, json.JSONDecodeError) as e:
        logger.error(f"Error parsing Gemini API response: {e}\nRaw response: {gemini_response}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Received an invalid response from the analysis service.")
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected server error occurred.")

# --- Main entry point for running the server ---
if __name__ == '__main__':
    # This block is for local development. Render will use the Start Command instead.
    # The host is set to "0.0.0.0" to be accessible within a container.
    uvicorn.run(app, host="0.0.0.0", port=5001)

