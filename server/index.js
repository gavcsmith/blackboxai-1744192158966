const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory database (for demo - use real DB in production)
let reviews = [];

// API endpoint to submit reviews
app.post('/api/reviews', (req, res) => {
  const { businessName, reviewerName, rating, comment } = req.body;
  
  if (!businessName || !rating) {
    return res.status(400).json({ error: 'Business name and rating are required' });
  }

  const review = {
    id: Date.now(),
    businessName,
    reviewerName: reviewerName || 'Anonymous',
    rating: parseInt(rating),
    comment: comment || '',
    date: new Date().toISOString()
  };

  reviews.push(review);
  res.status(201).json(review);
});

// API endpoint to get reviews
app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
