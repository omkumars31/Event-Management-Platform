import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post('/api/guest-login');
      const guestToken = response.data.token;
      localStorage.setItem('guestToken', guestToken);
      // Redirect to a limited-feature page
      history.push('/limited-dashboard');
    } catch (error) {
      console.error("Guest login failed", error);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      
      <button onClick={handleGuestLogin}>Guest Login</button>
      
    </div>
  );
};

export default Login;
