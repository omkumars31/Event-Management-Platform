const Event = require("../models/Event");

const createEvent = async (req, res) => {
  const { name, description, date } = req.body;

  try {
    const event = new Event({
      name,
      description,
      date,
      creator: req.user.id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("creator", "email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "You do not have permission to update this event" });
    }

    event.name = req.body.name || event.name;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "You do not have permission to delete this event" });
    }

    await event.remove();
    res.json({ message: "Event removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
