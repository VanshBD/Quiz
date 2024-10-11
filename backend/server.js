const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Adjust according to your React app's origin
}));

// Routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
const uri = process.env.MONGO_URI;
console.log("MongoDB URI:", uri); // Log the MongoDB URI for debugging

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    // Start the server after successful connection
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error("MongoDB connection error:", err));
