import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Set loading state

    if (!username || !password) {
      setError('Please enter both username and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      const { token, role } = response.data;

      // Save token to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect user based on role
      if (role === 'admin') {
        window.location.href = '/admin'; // Redirect to admin dashboard
      } else {
        window.location.href = '/user'; // Redirect to user dashboard
      }
    } catch (error) {
      console.error('Login error', error);
      setError('Invalid username or password. Please try again.'); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <form className="bg-gray-800 p-6 rounded-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-white mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>} {/* Display error message */}
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="username">Username</label>
          <input
            className="p-2 w-full rounded-md bg-gray-900 text-white"
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="password">Password</label>
          <input
            className="p-2 w-full rounded-md bg-gray-900 text-white"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className="bg-blue-500 text-white p-2 rounded-md w-full" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'} {/* Change button text during loading */}
        </button>

        {/* Register button to navigate to the registration page */}
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-400 hover:underline">
            Don't have an account? Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
