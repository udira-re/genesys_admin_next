// server.ts
import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  ws.send("Welcome to WebSocket server!");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());
    ws.send(`Echo: ${message}`);
  });

  ws.on("error", (err) => {
    console.error("WebSocket server error:", err);
  });

  ws.on("close", (code, reason) => {
    console.log(
      ` Client disconnected: code=${code}, reason=${reason.toString()}`,
    );
  });
});

console.log(` WebSocket server running on ws://localhost:${PORT}`);
