"use client"
import React, { useState, useRef, useEffect } from "react";
import { useChatbot } from "./context/ChatbotContext";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      await sendMessage(inputText);
      setInputText("");
    }
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  return (
    <>
      <button
        className={`fixed bottom-5 right-5 w-16 h-16 rounded-full border-none text-white text-2xl cursor-pointer shadow-lg transition-all duration-300 z-[1000] flex items-center justify-center hover:scale-110 hover:shadow-xl ${
          isOpen
            ? "bg-melon hover:bg-melon/90"
            : "bg-charcoal hover:bg-charcoal/90"
        }`}
        onClick={toggleChatbot}
        aria-label="Toggle chatbot"
      >
        {isOpen ? "✕" : "💬"}
      </button>
      {/* Chatbot Window */}
      <div
        className={`fixed bottom-24 right-5 w-96 h-[700px] bg-white rounded-xl shadow-2xl transition-all duration-300 z-[999] flex flex-col overflow-hidden ${
          isOpen
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        }`}
      >
        {/* Header */}
        <div className="bg-charcoal text-white p-4 flex justify-between items-center rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-peach flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h3 className="text-base font-semibold m-0">Job Assistant</h3>
              <span className="text-xs opacity-80">Online</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearMessages}
              className="bg-white bg-opacity-20 border-none text-white w-8 h-8 rounded-md cursor-pointer flex items-center justify-center transition-colors hover:bg-peach hover:text-charcoal"
              title="Clear chat"
            >
              🗑️
            </button>
            <button
              onClick={toggleChatbot}
              className="bg-white bg-opacity-20 border-none text-white w-8 h-8 rounded-md cursor-pointer flex items-center justify-center transition-colors hover:bg-peach hover:text-charcoal"
              title="Close chat"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-peach/10">
          {messages.map((message: any) => (
            <div
              key={message.id}
              className={`flex mb-2 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl relative ${
                  message.sender === "user"
                    ? "bg-charcoal text-white rounded-br-sm"
                    : "bg-white text-charcoal border border-gray-200 rounded-bl-sm shadow-sm"
                }`}
              >
                <p className="m-0 leading-relaxed text-sm">{message.text}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start mb-2">
              <div className="bg-white text-charcoal border border-gray-200 rounded-2xl rounded-bl-sm p-3 shadow-sm">
                <div className="flex gap-1 items-center py-2">
                  <span className="w-2 h-2 rounded-full bg-melon animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 rounded-full bg-melon animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-melon animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t border-gray-200"
        >
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-200 rounded-full outline-none text-sm transition-colors focus:border-charcoal disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="w-10 h-10 border-none rounded-full bg-charcoal text-white cursor-pointer flex items-center justify-center transition-all hover:bg-charcoal/90 hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!inputText.trim() || isTyping}
            >
              📤
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
