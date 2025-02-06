import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Event Management Platform</h1>
      <p>Manage your events and stay updated with real-time attendee information.</p>
      <Link to="/events">View Events</Link>
    </div>
  );
};

export default Home;
