import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
import ChatHistory from "./component/ChatHistory";
import Loading from "./component/Loading";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI('YOUR GOOGLE GEMINI API');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => setUserInput(e.target.value);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;
    setIsLoading(true);

    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => setChatHistory([]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#EDF4F2",
        color: "#1f2937",
        padding: "2rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-[#66A5AD] drop-shadow-lg">
          AURA – Artificial Understanding and Response Assistant
        </h1>

        {/* Chat History with margin below */}
        <div
          className="rounded-xl shadow-xl p-5 space-y-5 h-[73vh] overflow-y-auto mb-6"
          style={{
            backgroundColor: "#FFFFFF",
            scrollbarWidth: "none",
          }}
        >
          <ChatHistory chatHistory={chatHistory} />
          <Loading isLoading={isLoading} />
        </div>

        {/* Textbox above the buttons */}
        <input
          type="text"
          className="w-full sm:flex-grow px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AAAE5] mb-4"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            backgroundColor: "#EDF4F2",
            fontFamily: "'Inter', sans-serif",
          }}
        />

        {/* Buttons centered horizontally */}
        <div className="flex justify-center gap-4">
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-white text-lg font-semibold transition-colors"
            onClick={sendMessage}
            disabled={isLoading}
            style={{
              backgroundColor: "#8AAAE5",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Send
          </button>

          <button
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-white text-lg font-semibold transition-colors"
            onClick={clearChat}
            style={{
              backgroundColor: "#66A5AD",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
