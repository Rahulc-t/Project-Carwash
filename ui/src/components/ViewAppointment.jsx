import React, { useEffect, useState } from 'react';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('Authtoken');
        const response = await fetch('/api/user/appointments', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="bg-gray-100 text-black">
      <div className="container mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-8">View Appointments</h2>
          
          {/* Action Buttons */}
          <div className="flex justify-between mb-8">
            <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Button 1</button>
            <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Button 2</button>
            <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Button 3</button>
          </div>
          
          {/* Appointments List */}
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-red-600">{appointment.name}</h3>
                  <p className="text-gray-600">Email: {appointment.email}</p>
                  <p className="text-gray-600">Phone: {appointment.phone}</p>
                  <p className="text-gray-600">Address: {appointment.address}</p>
                  <p className="text-gray-600">Car Model: {appointment.carmodel}</p>
                  <p className="text-gray-600">Service: {appointment.service}</p>
                  <p className="text-gray-600">Date: {appointment.date}</p>
                  <p className="text-gray-600">Time Slot: {appointment.time}</p>
                  <p className="text-gray-600">Remarks: {appointment.remarks}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No appointments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAppointments;
