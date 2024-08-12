import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const [newName, setName] = useState('');
  const [newAddress, setAddress] = useState('');
  const [newPhone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('Authtoken');
        const response = await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        setName(data.name);
        setAddress(data.address);
        setPhone(data.phone);
        setEmail(data.email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const editprofile = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('Authtoken');
    const res = await fetch('/api/user/edit-profile', {
      method: 'PUT',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newName, newAddress, newPhone })
    });
    
    if (res.ok) {
      navigate("/profile");
    } else {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-red-600 mb-8">Edit Profile</h2>

          <form onSubmit={editprofile}>
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={newName}
                className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                readOnly
                className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex justify-between items-center space-x-4">
              <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none">Save Changes</button>
              <a href="/change-password" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none">Change Password</a>
              <a href="/profile" className="text-white bg-red-600 py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none">Cancel</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
