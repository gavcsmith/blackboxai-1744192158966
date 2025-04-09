import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    businessName: '',
    reviewerName: '',
    rating: 0,
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star filled' : 'star'}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="container">
        <h1>Thank You!</h1>
        <p>Your review has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Submit a Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Business Name*</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="reviewerName"
            value={formData.reviewerName}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Rating*</label>
          <StarRating 
            rating={parseInt(formData.rating)}
            setRating={(rating) => setFormData({...formData, rating})}
          />
          <input
            type="hidden"
            name="rating"
            value={formData.rating}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Comments</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default App;
