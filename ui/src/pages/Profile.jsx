import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [details, setDetails] = useState({});

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
                setDetails(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchDetails();
    }, []);

    return (
        <div className="bg-gray-100 text-black min-h-screen">
            {/* Main Content */}
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">Profile</h1>
                <div className="bg-white p-8 rounded-lg shadow-2xl mt-16 transform transition duration-500 hover:scale-105">
                    {/* Profile Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-red-600">{details.name}</h2>
                            <p className="text-gray-600">{details.email}</p>
                        </div>
                        <Link to="/edit-profile">
                            <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Edit Profile</button>
                        </Link>
                    </div>

                    {/* Profile Details */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-xl font-semibold">Full Name</h4>
                            <p>{details.name}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-xl font-semibold">Email Address</h4>
                            <p>{details.email}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-xl font-semibold">Phone Number</h4>
                            <p>{details.phone}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-xl font-semibold">Address</h4>
                            <p>{details.address}</p>
                        </div>
                    </div>

                    {/* Buttons for Service History and Make Appointment */}
                    <div className="mt-12 flex justify-around">
                        <Link to="/appointment-history">
                            <button className="bg-red-600 text-white py-4 px-8 rounded-md text-xl hover:bg-red-700">Service History</button>
                        </Link>
                        <Link to="/appointment">
                            <button className="bg-red-600 text-white py-4 px-8 rounded-md text-xl hover:bg-red-700">Make Appointment</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
