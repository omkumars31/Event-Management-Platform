import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import Auth from "./components/Auth";
import EventCreate from "./pages/EventCreate";
import EventDashboard from "./pages/EventDashboard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/Guest Login" element={<Auth mode="generateGuestToken" />} />
        <Route path="/create-event" element={<EventCreate />} />
        <Route path="/dashboard" element={<EventDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
