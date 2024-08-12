import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('Authtoken');
        const response = await fetch('/api/user/appointment-history', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const downloadInvoice = async (id) => {
    try {
      const token = localStorage.getItem('Authtoken');
      const response = await fetch(`/api/user/download-invoice/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });

      if (response.ok) {
        // const data=await response
       const blob = await response.blob();
       const url = window.URL.createObjectURL(blob);
       const a = document.createElement('a');
       a.href = url;
        a.download = `Invoice-${id}.pdf`; // Set the filename for download
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Failed to download invoice');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while downloading the invoice');
    }
  };

  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem('Authtoken');
      await fetch(`/api/user/appointment/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const rescheduleItem = (id) => {
    // Implement rescheduling logic here
    // console.log(`Rescheduling appointment with id ${id}`);
    Navigate
  };

  const editItem = (id) => {
    // Implement editing logic here
    navigate(`/edit-appointment/${id}`)
  };

  return (
    <div className="bg-gray-100 p-8 text-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8">Appointment History</h2>
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => {
              const appointmentDate = new Date(appointment.date);
              const currentDate = new Date();

              return (
                <div key={appointment._id} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-xl font-semibold text-red-600">{appointment.service}</p>
                  <p className="text-gray-600">Name: {appointment.name}</p>
                  <p className="text-gray-600">Email: {appointment.appemail}</p>
                  <p className="text-gray-600">Phone: {appointment.phone}</p>
                  <p className="text-gray-600">Car Model: {appointment.carmodel}</p>
                  <p className="text-gray-600">Date: {appointment.date}</p>
                  <p className="text-gray-600">Time: {appointment.time}</p>
                  <p className="mt-2">{appointment.remarks}</p>
                  {appointmentDate < currentDate ? (
                    appointment.status === "completed" ? (
                      <button
                        onClick={() => downloadInvoice(appointment._id)}
                        className='bg-red-600 w-[150px] h-[40px] m-4 rounded-full text-white hover:bg-red-700'
                      >
                        Download Invoice
                      </button>
                    ) : (
                      <button
                        onClick={() => editItem(appointment._id)}
                        className='bg-red-600 w-[100px] h-[40px] m-4 rounded-full text-white hover:bg-red-700'
                      >
                        Reschedule
                      </button>
                    )
                  ) : (
                    <>
                      <button
                        onClick={() => deleteItem(appointment._id)}
                        className='bg-red-600 w-[100px] h-[40px] m-4 rounded-full text-white hover:bg-red-700'
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => editItem(appointment._id)}
                        className='bg-red-600 w-[100px] h-[40px] m-4 rounded-full text-white hover:bg-red-700'
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600">No appointments available.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
