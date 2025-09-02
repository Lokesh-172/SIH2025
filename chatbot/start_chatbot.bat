@echo off
echo Starting Job Recommendation Chatbot System...
echo.

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo Starting FastAPI server...
echo This will start your existing internship bot on port 8001
echo The frontend will connect to this server automatically
echo.

python run_internship_bot.py
