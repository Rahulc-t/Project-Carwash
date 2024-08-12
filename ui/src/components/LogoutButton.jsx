import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data (this might be in localStorage, cookies, context, etc.)
    localStorage.removeItem('Authtoken'); // Example for localStorage
    console.log("gcajc")
    // Redirect to the login page
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white text-xl font-md p-2 w-32 rounded-full hover:bg-white hover:text-red-600">
      Logout
    </button>
  );
};

export default LogoutButton;
