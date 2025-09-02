#!/usr/bin/env python3
"""
Simple script to run the Smart Internship Guidance Bot server
"""
import uvicorn
import os
import sys
from dotenv import load_dotenv

def main():
    # Load environment variables from .env file
    load_dotenv()
    
    # Check if API_KEY environment variable is set
    if not os.getenv("API_KEY"):
        print("Error: API_KEY environment variable is required")
        print("Please set your Google Generative AI API key:")
        print("  Windows: set API_KEY=your_api_key_here")
        print("  Linux/Mac: export API_KEY=your_api_key_here")
        sys.exit(1)
    print("Starting Smart Internship Guidance Bot...")
    print("Server will be available at: http://localhost:8001")
    print("Interactive API Documentation: http://localhost:8001/docs")
    print("Press Ctrl+C to stop the server")
    
    # Run the FastAPI server
    uvicorn.run(
        "internship_bot:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    main()
