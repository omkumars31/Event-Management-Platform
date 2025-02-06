// GuestLogin.jsx
import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const GuestLogin = () => {
  const history = useHistory();

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post('/api/auth/guest-login');
      localStorage.setItem('guestToken', response.data.token);  // Store the guest token
      history.push('/limited-dashboard');  // Redirect to a page with limited features
    } catch (error) {
      console.error('Guest login failed', error);
    }
  };

  return (
    <button onClick={handleGuestLogin}>Guest Login</button>
  );
};

export default GuestLogin;
