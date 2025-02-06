import React, { useEffect, useState } from "react";
import api from "../utils/api";
import EventCard from "../components/EventCard";
import socket from "../utils/socket";

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from backend API
    api.get("/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));

    // Listen for real-time updates on event attendees
    socket.on("attendeeUpdate", (updatedEvent) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    });

    useEffect(() => {
        // You can listen for events from the server
        socket.on("event-updates", (data) => {
          console.log("Event updates received:", data);
        });
    
        // Cleanup the socket connection when the component is unmounted
        return () => {
          socket.off("event-updates");
        };
      }, []);
    // Cleanup on component unmount
    return () => {
      socket.off("attendeeUpdate");
    };
  }, []);

  return (
    <div>
        <h1>Event Page</h1>
      <h2>Upcoming Events</h2>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventPage;
