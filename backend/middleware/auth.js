const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    // Check if the Authorization header exists
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Not authenticated. Authorization header missing.' });
    }

    // Extract token from the header
    const token = authHeader.replace('Bearer ', '');
    
    // Check if token is provided
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated. Token missing.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated. User not found.' });
    }

    req.user = user; // Attach user to the request
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error); // Log the error for debugging

    if (error instanceof jwt.JsonWebTokenError) {
      // Specific JWT error handling
      return res.status(401).json({ message: 'Not authenticated. Invalid token.' });
    }

    // Generic error handling
    res.status(500).json({ message: 'Server error during authentication.' });
  }
};

module.exports = authenticate;
