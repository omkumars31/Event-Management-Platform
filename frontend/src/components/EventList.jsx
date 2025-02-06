// In a React component, e.g., EventList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);  // Empty array means it runs only once when the component mounts

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div>
      <h1>Event List</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
