import { io } from "socket.io-client";

// Create a WebSocket connection to the backend
const socket = io("http://localhost:5000");  // Ensure the URL matches your backend

// Example of handling events from the server
socket.on("connect", () => {
  console.log("Connected to the WebSocket server");
});

// Example of listening to an event from the server
socket.on("event-updates", (data) => {
  console.log("Received event updates:", data);
});

export default socket;
