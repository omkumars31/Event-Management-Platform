import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventCreate = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.isGuest) {
      alert("Guests cannot create events!");
      navigate("/"); // Redirect to home page
    }
    setUser(storedUser);
  }, []);

  return <div>Create Event Page</div>;
};

export default EventCreate;
