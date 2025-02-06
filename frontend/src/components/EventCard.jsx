import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>Attendees: {event.attendees.length}</p>
    </div>
  );
};

export default EventCard;
