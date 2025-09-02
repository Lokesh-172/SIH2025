import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, resume_data } = await request.json();
    console.log("Received request:", { message, has_resume: !!resume_data });

    // Generate dynamic session ID if not provided
    const sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Connect to your existing FastAPI backend
    const response = await fetch("http://localhost:8001/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
        resume_data: resume_data || null,
      }),
    }).catch((error) => {
      console.log("FastAPI request failed:", error.message);

      // Fallback if FastAPI backend is not available
      return null;
    });

    if (response && response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("FastAPI response received:", Object.keys(data));

      return NextResponse.json({
        response: data.response || "No response from server",
        recommendations: data.recommendations || [],
        educational_suggestions: data.educational_suggestions || [],
        skill_gaps: data.skill_gaps || [],
        next_steps: data.next_steps || [],
      });
    } else {
      // Fallback response when FastAPI backend is not available
      const fallbackResponse = getFallbackResponse(message);
      return NextResponse.json({ response: fallbackResponse });
    }
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("job") || lowerMessage.includes("career")) {
    return "I can help you find job recommendations! What type of role are you looking for? Please specify your skills and experience level.";
  }

  if (lowerMessage.includes("skill") || lowerMessage.includes("experience")) {
    return "Tell me about your skills and experience, and I'll suggest relevant opportunities. What technologies or domains are you interested in?";
  }

  if (lowerMessage.includes("internship")) {
    return "Great! I can help you find internship opportunities. What field are you studying or interested in?";
  }

  if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
    return "I can provide tips for improving your resume. What specific area would you like help with?";
  }

  if (lowerMessage.includes("interview")) {
    return "I can help you prepare for interviews! What type of role are you interviewing for?";
  }

  if (lowerMessage.includes("salary") || lowerMessage.includes("pay")) {
    return "I can help you understand salary ranges for different positions. What role and location interests you?";
  }

  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey")
  ) {
    return "Hello! I'm here to help you with job recommendations and career guidance. What can I assist you with today?";
  }

  return "I'm here to help you with job recommendations, career guidance, resume tips, and interview preparation. Could you please be more specific about what you'd like to know?";
}
