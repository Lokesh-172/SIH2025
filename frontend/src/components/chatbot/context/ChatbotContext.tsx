"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotContextType {
  messages: Message[];
  isOpen: boolean;
  isTyping: boolean;
  sendMessage: (text: string, resumeData?: any) => Promise<void>;
  toggleChatbot: () => void;
  clearMessages: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your job recommendation assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string, resumeData?: any) => {
    console.log("🚀 [ChatbotContext] Sending message:", {
      message: text,
      hasResumeData: !!resumeData,
      resumeData: resumeData,
      timestamp: new Date().toISOString(),
    });

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const requestPayload = {
        message: text,
        resume_data: resumeData || null,
      };

      console.log("📤 [ChatbotContext] Request payload:", requestPayload);

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      console.log("📡 [ChatbotContext] Response status:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
      });

      let botResponseText: string;
      if (response.ok || response) {
        const data = await response.json();

        console.log("📥 [ChatbotContext] Raw API response:", {
          fullData: data,
          dataKeys: Object.keys(data),
          dataTypes: Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, typeof value])
          ),
          responseLength: data.response?.length || 0,
          recommendationsCount: data.recommendations?.length || 0,
          educationalSuggestionsCount:
            data.educational_suggestions?.length || 0,
          skillGapsCount: data.skill_gaps?.length || 0,
          nextStepsCount: data.next_steps?.length || 0,
        });

        botResponseText = data.response;

        // Debug each section as it's being processed
        if (data.recommendations && data.recommendations.length > 0) {
          console.log("📋 [ChatbotContext] Processing recommendations:", {
            count: data.recommendations.length,
            recommendations: data.recommendations,
          });

          botResponseText += "\n\n📋 **Internship Recommendations:**\n";
          data.recommendations.forEach((rec: any, index: number) => {
            console.log(
              `📋 [ChatbotContext] Recommendation ${index + 1}:`,
              rec
            );
            botResponseText += `\n${index + 1}. **${rec.position}** at ${
              rec.company
            }\n`;
            botResponseText += `   📍 ${rec.location} | Match: ${rec.match_percentage}%\n`;
            botResponseText += `   ${rec.why_recommended}\n`;
          });
        }

        // Add educational suggestions if available
        if (
          data.educational_suggestions &&
          data.educational_suggestions.length > 0
        ) {
          console.log(
            "📚 [ChatbotContext] Processing educational suggestions:",
            {
              count: data.educational_suggestions.length,
              suggestions: data.educational_suggestions,
            }
          );

          botResponseText += "\n\n📚 **Educational Suggestions:**\n";
          data.educational_suggestions.forEach(
            (suggestion: string, index: number) => {
              botResponseText += `${index + 1}. ${suggestion}\n`;
            }
          );
        }

        // Add skill gaps if identified
        if (data.skill_gaps && data.skill_gaps.length > 0) {
          console.log("🎯 [ChatbotContext] Processing skill gaps:", {
            count: data.skill_gaps.length,
            skillGaps: data.skill_gaps,
          });

          botResponseText += "\n\n🎯 **Skills to Develop:**\n";
          data.skill_gaps.forEach((skill: string, index: number) => {
            botResponseText += `${index + 1}. ${skill}\n`;
          });
        }

        // Add next steps if provided
        if (data.next_steps && data.next_steps.length > 0) {
          console.log("🚀 [ChatbotContext] Processing next steps:", {
            count: data.next_steps.length,
            nextSteps: data.next_steps,
          });

          botResponseText += "\n\n🚀 **Next Steps:**\n";
          data.next_steps.forEach((step: string, index: number) => {
            botResponseText += `${index + 1}. ${step}\n`;
          });
        }

        console.log("✅ [ChatbotContext] Final formatted response:", {
          originalResponse: data.response,
          finalBotText: botResponseText,
          textLength: botResponseText.length,
          hasRecommendations: !!(
            data.recommendations && data.recommendations.length > 0
          ),
          hasEducationalSuggestions: !!(
            data.educational_suggestions &&
            data.educational_suggestions.length > 0
          ),
          hasSkillGaps: !!(data.skill_gaps && data.skill_gaps.length > 0),
          hasNextSteps: !!(data.next_steps && data.next_steps.length > 0),
        });
      } else {
        console.log(
          "⚠️ [ChatbotContext] API response not OK, using fallback:",
          {
            responseExists: !!response,
            fallbackMessage: getBotResponse(text),
          }
        );

        // Fallback response if API is not available
        botResponseText = getBotResponse(text);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      console.log("💬 [ChatbotContext] Creating bot message:", {
        messageId: botMessage.id,
        textPreview: botMessage.text.substring(0, 100) + "...",
        fullTextLength: botMessage.text.length,
        timestamp: botMessage.timestamp,
      });

      setMessages((prev) => [...prev, botMessage]);

      console.log("✨ [ChatbotContext] Message successfully added to state:", {
        totalMessages: messages.length + 1,
        lastMessagePreview: botMessage.text.substring(0, 50) + "...",
        processingTime: Date.now() - parseInt(botMessage.id) + "ms",
      });
    } catch (error) {
      console.error("❌ [ChatbotContext] Error in sendMessage:", {
        error: error,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        userMessage: text,
        timestamp: new Date().toISOString(),
      });

      // Fallback response for offline mode
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: "bot",
        timestamp: new Date(),
      };

      console.log("🔄 [ChatbotContext] Using fallback response:", {
        fallbackText: botMessage.text,
        reason: "API error or network issue",
      });
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      console.log("🏁 [ChatbotContext] sendMessage completed:", {
        isTyping: false,
        timestamp: new Date().toISOString(),
        userMessage: text,
      });
      setIsTyping(false);
    }
  };

  const getBotResponse = (userText: string): string => {
    console.log(
      "🔄 [ChatbotContext] Using local fallback response for:",
      userText
    );

    const lowerText = userText.toLowerCase();

    if (lowerText.includes("job") || lowerText.includes("career")) {
      return "I can help you find job recommendations! What type of role are you looking for? Please specify your skills and experience level.";
    }
    if (lowerText.includes("skill") || lowerText.includes("experience")) {
      return "Tell me about your skills and experience, and I'll suggest relevant opportunities. What technologies or domains are you interested in?";
    }
    if (lowerText.includes("salary") || lowerText.includes("pay")) {
      return "I can help you understand salary ranges for different positions. What role and location interests you?";
    }
    if (lowerText.includes("internship")) {
      return "Great! I can help you find internship opportunities. What field are you studying or interested in?";
    }
    if (lowerText.includes("resume") || lowerText.includes("cv")) {
      return "I can provide tips for improving your resume. What specific area would you like help with?";
    }
    if (lowerText.includes("interview")) {
      return "I can help you prepare for interviews! What type of role are you interviewing for?";
    }
    if (
      lowerText.includes("hello") ||
      lowerText.includes("hi") ||
      lowerText.includes("hey")
    ) {
      return "Hello! I'm here to help you with job recommendations and career guidance. What can I assist you with today?";
    }

    return "I'm here to help you with job recommendations, career guidance, resume tips, and interview preparation. Could you please be more specific about what you'd like to know?";
  };

  const toggleChatbot = () => {
    console.log("🔄 [ChatbotContext] Toggling chatbot:", {
      currentState: isOpen,
      newState: !isOpen,
      timestamp: new Date().toISOString(),
    });
    setIsOpen((prev) => !prev);
  };

  const clearMessages = () => {
    console.log("🧹 [ChatbotContext] Clearing messages:", {
      currentMessageCount: messages.length,
      timestamp: new Date().toISOString(),
    });

    setMessages([
      {
        id: "1",
        text: "Hello! I'm your job recommendation assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);

    console.log("✅ [ChatbotContext] Messages cleared and reset to default");
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        isTyping,
        sendMessage,
        toggleChatbot,
        clearMessages,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
