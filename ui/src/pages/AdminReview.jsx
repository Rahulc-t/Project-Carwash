import React, { useEffect, useState } from 'react';

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('Authtoken');
        const response = await fetch('/api/admin/review-admin', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const deleteReview = async (id) => {
    try {
      const token = localStorage.getItem('Authtoken');
      const response = await fetch(`/api/admin/remove-review/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setReviews(reviews.filter(review => review._id !== id));
        console.log(`Review with id ${id} deleted successfully.`);
      } else {
        console.log('Failed to delete the review.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 p-8 text-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8">Admin Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.slice().reverse().map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-red-600">{review.name}</h3>
                  <p className="text-gray-600">Email: {review.reviewemail}</p>
                  <p className="mt-2">{review.content}</p>
                </div>
                <button
                  onClick={() => deleteReview(review._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminReview;
