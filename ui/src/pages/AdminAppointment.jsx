import React, { useEffect, useState } from 'react';

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState({}); // Track uploading state per appointment

  const fetchDetails = async (selectedDate) => {
    try {
      const token = localStorage.getItem('Authtoken');
      const response = await fetch('/api/admin/appointment-print', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: selectedDate })
      });

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (appointmentId) => {
    if (!selectedFile) return;

    // Set uploading state for the specific appointment
    setUploading((prev) => ({ ...prev, [appointmentId]: true }));

    const formData = new FormData();
    formData.append('appointmentdetails', selectedFile);

    try {
      const token = localStorage.getItem('Authtoken');
      const response = await fetch(`/api/admin/single/${appointmentId}`, {
        method: 'POST',
        headers: {
          'Authorization': token
        },
        body: formData
      });

      if (response.ok) {
        alert('Invoice uploaded successfully');
        fetchDetails(date); // Refetch the appointments to show the updated state
      } else {
        alert('Failed to upload invoice');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while uploading the invoice');
    } finally {
      // Reset uploading state for the specific appointment
      setUploading((prev) => ({ ...prev, [appointmentId]: false }));
    }
  };

  useEffect(() => {
    fetchDetails(date);
  }, [date]);

  return (
    <div className="bg-gray-100 p-8 text-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8">Appointments</h2>
        <div className="mb-4">
          <label htmlFor="date" className="block text-xl font-medium text-gray-700">Select Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 p-2 rounded-md border border-gray-300 focus:border-red-500 outline-none"
          />
        </div>
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-red-600">{appointment.name}</h3>
                <p className="text-gray-600">Email: {appointment.appemail}</p>
                <p className="text-gray-600">Phone: {appointment.phone}</p>
                <p className="text-gray-600">Car Model: {appointment.carmodel}</p>
                <p className="text-gray-600">Service: {appointment.service}</p>
                <p className="text-gray-600">Date: {appointment.date}</p>
                <p className="text-gray-600">Time: {appointment.time}</p>
                <p className="mt-2">{appointment.remarks}</p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-4"
                />
                <button
                  onClick={() => handleFileUpload(appointment._id)}
                  className={`bg-red-600 w-[250px] h-[50px] rounded-full text-xl text-white mt-4 hover:bg-red-700 ${uploading[appointment._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={uploading[appointment._id]}
                >
                  {uploading[appointment._id] ? 'Uploading...' : 'Upload Invoice'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No appointments available for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAppointment;
