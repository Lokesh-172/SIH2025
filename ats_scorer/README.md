FastAPI Resume Analysis API
This is a FastAPI-based backend service that provides an API to analyze resumes. It accepts a PDF file, extracts the text, sends it to the Google Gemini API for analysis, and returns a structured JSON object with an ATS score and detailed feedback.

Key Advantages of FastAPI
High Performance: FastAPI is one of the fastest Python web frameworks available.

Automatic Docs: Navigate to /docs on your running server to see interactive API documentation (via Swagger UI).

Modern Python: Uses modern Python features like type hints and asynchronous programming (async/await).

Setup Instructions
1. Prerequisites
Python 3.9+

pip (Python package installer)

2. Set Up a Virtual Environment
It's highly recommended to use a virtual environment to manage project dependencies.

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

3. Install Dependencies
Install all the required Python packages from the updated requirements.txt.

pip install --upgrade pip
pip install -r requirements.txt

4. Configure Your API Key
Rename the .env.example file to .env if you haven't already.

Open the .env file and add your Google Gemini API key.

5. Run the API Server
FastAPI uses an ASGI server called Uvicorn.

uvicorn app:app --host 127.0.0.1 --port 5001 --reload

The --reload flag is great for development, as it automatically restarts the server when you make changes to the code.

The API will now be running at http://127.0.0.1:5001.

How to Use the API
You can now send POST requests to the /analyze-resume/ endpoint.

Interactive Documentation (Recommended)
One of the best features of FastAPI is the automatic documentation. While the server is running, open your web browser and go to:

http://127.0.0.1:5001/docs

You will see an interactive Swagger UI where you can test the file upload directly from your browser.

Example curl Command
curl -X POST -F "resume=@resume.pdf" http://127.0.0.1:5001/analyze-resume/

