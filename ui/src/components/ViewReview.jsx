import React, { useEffect, useState } from 'react';

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/admin/review-admin'); // Update this URL to your API endpoint
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    
    fetchReviews();
  }, []);

  return (
    <div className="bg-gray-100 p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-red-600">{review.name}</h3>
                <p className="text-gray-600">{review.email}</p>
                <p className="mt-2">{review.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No reviews available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewReviews;
