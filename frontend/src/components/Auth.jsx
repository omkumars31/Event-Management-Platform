import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Auth = ({ mode }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = mode === "register" ? "/auth/register" : "/auth/login";
    const data = { email, password };

    try {
      const response = await api.post(url, data);
      localStorage.setItem("token", response.data.token);  // Store JWT in localStorage
      navigate("/events");  // Redirect to events page on successful login/registration
    } catch (err) {
      setError("Authentication failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>{mode === "register" ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit">{mode === "register" ? "Register" : "Login"}</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Auth;
