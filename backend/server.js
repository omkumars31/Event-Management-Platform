const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const auth = require('./routes/auth');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  // Allow only your frontend domain to make requests
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));


// Create a server using the HTTP module
const server = http.createServer(app);

// Set up Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",  // Allow frontend URL for WebSocket connection
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle events here
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


// backend/server.js
const eventRoutes = require('./routes/events');
app.use('/api', eventRoutes); // Ensure this is added to use the event routes

// Use Express to handle normal HTTP requests
app.get("/", (req, res) => {
  res.send("Backend is working!");
});
app.use(express.json());  // Middleware to parse JSON requests
app.use('/api', auth);  // Use the auth routes for API requests
// Start the server on the desired port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
