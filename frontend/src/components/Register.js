import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(''); // Reset error state
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, password, role });
      // Clear form after submission
      setUsername('');
      setPassword('');
      setRole('user');
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      setError('Registration error: ' + (error.response?.data?.message || 'Please try again.'));
      console.error('Registration error', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <form className="bg-gray-800 p-6 rounded-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-white mb-6 text-center">Register</h2>
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
            required // Make this field required
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
            required // Make this field required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="role">Role</label>
          <select
            className="p-2 w-full rounded-md bg-gray-900 text-white"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <button className={`bg-blue-500 text-white p-2 rounded-md w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Link to navigate to the login page */}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-400 hover:underline">
            Already have an account? Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
