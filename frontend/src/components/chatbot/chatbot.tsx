"use client";
import React, { useState, useRef, useEffect } from "react";
import { useChatbot } from "./context/ChatbotContext";
import { useAppSelector } from "@/lib/hooks";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
} from "lucide-react";
const ChatBot: React.FC = () => {
  const {
    messages,
    isOpen,
    isTyping,
    sendMessage,
    toggleChatbot,
    clearMessages,
  } = useChatbot();
  const [inputText, setInputText] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get user data from Redux store
  const user = useAppSelector((state) => state.user.user);
  const quizResults = user?.profile?.quizResults || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      // Store the message text before clearing
      const messageText = inputText.trim();

      // Clear input immediately for better UX
      setInputText("");

      // Create user profile object for the backend
      const userProfile = user
        ? {
            name: user.name,
            email: user.email,
            phone: user.profile?.phone || null,
            location: user.profile?.location || null,
            bio: user.profile?.bio || null,
            skills: user.profile?.skills || null,
            college: user.profile?.college || null,
            course: user.profile?.course || null,
            graduation_year: user.profile?.graduationYear || null,
            resume_analysis: user.profile?.resumeAnalysis
              ? {
                  score: user.profile.resumeAnalysis.score,
                  overall_feedback:
                    user.profile.resumeAnalysis.overall_feedback,
                  detailed_feedback:
                    user.profile.resumeAnalysis.detailed_feedback,
                  quiz_questions_with_answers:
                    user.profile.resumeAnalysis.quiz_questions_with_answers,
                  analyzed_at: user.profile.resumeAnalysis.analyzedAt,
                }
              : null,
            quiz_results: quizResults.map((result) => ({
              score: result.score,
              quizType: result.quizType,
              completedAt: result.completedAt,
            })),
          }
        : null;

      try {
        await sendMessage(messageText, null, userProfile);
      } catch (error) {
        console.error("Error sending message:", error);
        // If there's an error, we could optionally restore the input text
        // setInputText(messageText);
      }
    }
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  return (
    <>
      <button
        className={`fixed bottom-5 right-5 w-16 h-16 rounded-full border-none text-white cursor-pointer shadow-lg transition-all duration-300 z-[1000] flex items-center justify-center hover:scale-110 hover:shadow-xl ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-gray-900 hover:bg-gray-800"
        }`}
        onClick={toggleChatbot}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
      {/* Chatbot Window */}
      <div
        className={`fixed bottom-24 right-5 w-96 md:w-[26rem] ${
          isMinimized ? "h-16" : "h-[42rem]"
        } bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 z-[999] flex flex-col overflow-hidden ${
          isOpen
            ? "translate-y-0 opacity-100 visible scale-100"
            : "translate-y-8 opacity-0 invisible scale-95"
        }`}
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <Bot className="w-5 h-5 text-gray-900" />
            </div>
            <div>
              <h3 className="text-base font-semibold m-0">
                Internship Assistant
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="bg-white/20 border-none text-white w-8 h-8 rounded-lg cursor-pointer flex items-center justify-center transition-all hover:bg-white/30 hover:scale-105"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={toggleChatbot}
              className="bg-white/20 border-none text-white w-8 h-8 rounded-lg cursor-pointer flex items-center justify-center transition-all hover:bg-white/30 hover:scale-105"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        {!isMinimized && (
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className={`flex gap-2 mb-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar */}
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] p-3 rounded-2xl relative ${
                    message.sender === "user"
                      ? "bg-gray-900 text-white rounded-br-sm shadow-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                  }`}
                >
                  <p className="m-0 leading-relaxed text-sm">{message.text}</p>
                  <span
                    className={`text-xs block mt-1 ${
                      message.sender === "user"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>

                {/* User Avatar */}
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 mb-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-sm p-3 shadow-sm">
                  <div className="flex gap-1 items-center py-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-600 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {!isMinimized && (
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-gray-100"
          >
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me about internships..."
                className="flex-1 p-3 border border-gray-300 rounded-full outline-none text-sm transition-all focus:border-gray-900 focus:ring-2 focus:ring-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isTyping}
              />
              <button
                type="submit"
                className={`w-12 h-12 border-none rounded-full text-white cursor-pointer flex items-center justify-center transition-all hover:scale-105 disabled:cursor-not-allowed disabled:transform-none ${
                  inputText.trim() && !isTyping
                    ? "bg-gray-900 hover:bg-gray-800 shadow-lg"
                    : "bg-gray-300"
                }`}
                disabled={!inputText.trim() || isTyping}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ChatBot;
