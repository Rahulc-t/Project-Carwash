import React from 'react';
import { Link } from 'react-router-dom';

const AdminProfile = () => {
  return (
    <div className="bg-gray-100 text-black">
      {/* Main Content */}
      <div className="container mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-red-600">AutoCarServices</h2>
            <p className="text-gray-600">admin2001</p>
          </div>
        </div>
        <Link to="/change-password">
          <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 mt-8">Change Password</button>
        </Link>
      </div>

      {/* Admin Options */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-red-600 ml-32 mb-16">Admin Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Link to="/reviews">
            <div className="bg-red-600 text-white p-4 rounded-lg text-center hover:bg-red-700 cursor-pointer w-[300px] ml-32">
              <h4 className="text-xl font-semibold">View Reviews</h4>
            </div>
          </Link>
          <Link to="/admin-limit">
            <div className="bg-red-600 text-white p-4 rounded-lg text-center hover:bg-red-700 cursor-pointer w-[300px] ml-32">
              <h4 className="text-xl font-semibold">Limit Customers</h4>
            </div>
          </Link>
          <Link to="/add-admin">
            <div className="bg-red-600 text-white p-4 rounded-lg text-center hover:bg-red-700 cursor-pointer w-[300px] ml-32">
              <h4 className="text-xl font-semibold">Add Admin</h4>
            </div>
          </Link>
          <Link to="/admin-appointment">
            <div className="bg-red-600 text-white p-4 rounded-lg text-center hover:bg-red-700 cursor-pointer w-[300px] ml-32">
              <h4 className="text-xl font-semibold">View Appointments</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
