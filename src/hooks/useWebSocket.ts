"use client";

import { useEffect, useRef, useState } from "react";

type MessageType = string;

export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log(" Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data as MessageType]);
    };

    // socket.onerror = (error) => {
    //   console.error("WebSocket client error:", error);
    // };

    socket.onclose = () => {
      setIsConnected(false);
      // console.log(" WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (msg: MessageType) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };

  return { messages, sendMessage, isConnected };
}
