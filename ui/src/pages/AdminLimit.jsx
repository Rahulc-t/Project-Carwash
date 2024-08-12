import React, { useEffect, useState } from 'react';

const LimitSetting = () => {
  const [date, setDate] = useState('');
  const [morningLimit, setMorningLimit] = useState('');
  const [afternoonLimit, setAfternoonLimit] = useState('');
  const [overnightLimit, setOvernightLimit] = useState('');
  const [limits, setLimits] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchLimits = async () => {
      try {
        const token = localStorage.getItem('Authtoken');
        const response = await fetch('/api/admin/get-limit', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        setLimits(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLimits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('Authtoken');
    const endpoint = '/api/admin/set-limit';
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date,
          morning: morningLimit,
          afternoon: afternoonLimit,
          overnight: overnightLimit,
          id: editId,
        })
      });

      if (response.ok) {
        console.log(editId ? 'Limits updated successfully.' : 'Limits set successfully.');
        setEditId(null);
        setDate('');
        setMorningLimit('');
        setAfternoonLimit('');
        setOvernightLimit('');
        window.location.reload(); // Reload the page after successful submission
      } else {
        console.log('Failed to set or update limits.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (limit) => {
    setEditId(limit._id);
    setDate(limit.date);
    setMorningLimit(limit.morning);
    setAfternoonLimit(limit.afternoon);
    setOvernightLimit(limit.overnight);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('Authtoken');
    const endpoint = `/api/admin/delete-limit/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Limit deleted successfully.');
        setLimits(limits.filter(limit => limit._id !== id));
      } else {
        console.log('Failed to delete limit.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 p-8 text-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8">Set Daily Limits</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="morningLimit" className="block text-gray-700 font-medium mb-2">Morning Limit</label>
            <input
              type="number"
              id="morningLimit"
              value={morningLimit}
              onChange={(e) => setMorningLimit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="afternoonLimit" className="block text-gray-700 font-medium mb-2">Afternoon Limit</label>
            <input
              type="number"
              id="afternoonLimit"
              value={afternoonLimit}
              onChange={(e) => setAfternoonLimit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="overnightLimit" className="block text-gray-700 font-medium mb-2">Overnight Limit</label>
            <input
              type="number"
              id="overnightLimit"
              value={overnightLimit}
              onChange={(e) => setOvernightLimit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
          >
            {editId ? 'Update' : 'Submit'}
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-red-600 mb-4">Existing Limits</h3>
          {limits.length > 0 ? (
            <div className="space-y-4">
              {limits.map((limit) => (
                <div key={limit._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 font-medium">Date: {new Date(limit.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">Morning Limit: {limit.morning}</p>
                    <p className="text-gray-600">Afternoon Limit: {limit.afternoon}</p>
                    <p className="text-gray-600">Overnight Limit: {limit.overnight}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(limit)}
                      className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(limit._id)}
                      className="bg-gray-500 text-white px-3 py-1 rounded-full hover:bg-gray-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No limits available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LimitSetting;
