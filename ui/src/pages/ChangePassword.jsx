import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's role to determine if they are an admin
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('Authtoken');
        const response = await fetch('/api/user/role', { // Assuming you have an API route for getting user role
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        console.log(data.role)
        setIsAdmin(data.role === 'user'); // Assuming the response includes a role field
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRole();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try {
      const token = localStorage.getItem('Authtoken');
      const response = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

        if (isAdmin) {
          navigate("/profile"); // Navigate to the admin dashboard if the user is an admin
        } else {
          navigate("/admin"); // Navigate to the profile page if the user is not an admin
        }
      } else {
        setError(data.error || 'Failed to change password.');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-red-600 mb-8">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-6">
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-2">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
