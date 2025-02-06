const express = require("express");
const router = express.Router();
const { getEvents } = require('../controllers/eventController');

// Example route: Get all events
router.get("/", (req, res) => {
  res.status(200).json({ message: "Fetching all events" });
});
router.get('/events', getEvents);
// Example route: Create a new event
router.post("/", (req, res) => {
  const { name, description, date } = req.body;
  // Logic for creating an event
  res.status(201).json({ message: "Event created", event: { name, description, date } });
});

// Add more routes as necessary, such as for updating, deleting events, etc.

module.exports = router;
