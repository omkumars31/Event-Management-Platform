import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../utils/api"; // Ensure this is correctly set up to fetch data from backend

const socket = io("http://localhost:5000");

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events"); // Fetch events from backend
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    socket.on("eventUpdated", (updatedEvent) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
      );
    });

    return () => {
      socket.off("eventUpdated");
    };
  }, []);

  const handleCreateEvent = async () => {
    if (!newEvent.name || !newEvent.description || !newEvent.date) {
      alert("All fields are required!");
      return;
    }

    const eventToCreate = {
      ...newEvent,
      attendees: [],
    };

    try {
      const response = await api.post("/events", eventToCreate);
      setEvents((prevEvents) => [...prevEvents, response.data]);
      setNewEvent({ name: "", description: "", date: "" });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "past") return new Date(event.date) < new Date();
    if (filter === "upcoming") return new Date(event.date) >= new Date();
    return true;
  });

  return (
    <div>
      <h2>Event Dashboard</h2>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("upcoming")}>Upcoming</button>
        <button onClick={() => setFilter("past")}>Past</button>
      </div>
      <div>
        <h3>Create New Event</h3>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>
      <ul>
        {filteredEvents.map((event) => (
          <li key={event._id} onClick={() => navigate(`/event/${event._id}`)}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>Attendees: {event.attendees.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDashboard;
