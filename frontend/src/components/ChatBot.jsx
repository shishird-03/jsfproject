import React, { useState } from "react";
import { ask } from "../services/chatService";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋, I’m FloraBot! How can I help you with your plants today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
  if (!input.trim()) return;

  const newMessage = { sender: "user", text: input };
  setMessages((prev) => [...prev, newMessage]);

  try {
    // Call backend AI
    const res = await ask(input);

    const response = {
      sender: "bot",
      text: res.answer || "No response from AI",
    };

    setMessages((prev) => [...prev, response]);
  } catch (err) {
    console.error("ERROR FROM AI:", err);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "AI error occurred ❌" },
    ]);
  }

  setInput("");
};


  return (
    <>
      {/* Floating chat button */}
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
        title="Chat with FloraBot"
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>🌿 FloraBot</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-body">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`chat-msg ${m.sender === "user" ? "user" : "bot"}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}