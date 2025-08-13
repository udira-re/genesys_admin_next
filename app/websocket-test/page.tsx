"use client";

import { useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function WebSocketTestPage() {
  const { messages, sendMessage, isConnected } = useWebSocket(
    "ws://localhost:8080",
  );
  const [input, setInput] = useState("");

  return (
    <div className="p-4">
      <h1 className="font-bold text-lg">WebSocket Custom Hook Test</h1>
      <p>Status: {isConnected ? "Connected" : " Disconnected"}</p>

      <div className="border p-2 h-40 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-1 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1"
          onClick={() => {
            sendMessage(input);
            setInput("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
