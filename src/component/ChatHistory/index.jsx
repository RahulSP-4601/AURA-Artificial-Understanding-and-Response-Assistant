import React from "react";
import ReactMarkdown from "react-markdown";
import AURALogo from "./../../AURA.png";

const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="relative h-full flex flex-col">

      {/* Scrollable Content: Header + Chat */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Header Section */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md py-4 px-4 rounded-xl shadow-sm">
          {/* Logo and Intro in a flex row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            {/* Logo on Left */}
            <div className="flex-shrink-0">
              <img
                src={AURALogo}
                alt="AURA Logo"
                className="w-36 sm:w-64 h-auto opacity-90"
              />
            </div>

            {/* Intro Text on Right */}
            <div className="text-gray-700 space-y-1 text-base sm:text-lg font-medium max-w-xl">
              <p>AURA is your smart virtual assistant.</p>
              <p>It learns from you and understands your needs.</p>
              <p>Ask questions, explore ideas, get instant help.</p>
              <p>Boost productivity, creativity, and problem-solving with ease.</p>
            </div>
          </div>

          {/* Always-visible Welcome Message */}
          <div className="mt-12">
            <p className="text-4xl text-gray-700 font-semibold text-center">
              Welcome to <span className="text-[#66A5AD]">AURA</span> – Ask anything!
            </p>
          </div>
        </div>

        {/* Chat History Section */}
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className="py-3 px-5 rounded-lg mb-3 max-w-[90%] text-base sm:text-lg"
            style={{
              backgroundColor: message.type === "user" ? "#8AAAE5" : "#66A5AD",
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              alignSelf: message.type === "user" ? "flex-end" : "flex-start",
              marginLeft: message.type === "user" ? "auto" : "0",
              marginRight: message.type === "bot" ? "auto" : "0",
            }}
          >
            {message.type === "user" && (
              <span className="mr-2 font-bold text-white">You:</span>
            )}
            <div>
              <ReactMarkdown>{message.message}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
