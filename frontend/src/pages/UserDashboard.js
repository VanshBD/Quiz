import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate(); // Use navigate for logout
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage or any other method you use
        const response = await axios.get('http://localhost:5000/api/quizzes', {
          headers: {
            Authorization: `Bearer ${token}` // Attach token to request header
          }
        });
        console.log(response);
        setQuizzes(response.data);
      } catch (error) {
        setError('Error fetching quizzes: ' + (error.response?.data?.message || 'Please try again.'));
      } finally {
        setLoading(false); // Reset loading state
      }
    };
    fetchQuizzes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the JWT token
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="flex justify-between">
        <h1 className="text-white text-3xl mb-4">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white hover:bg-red-500 px-4 py-2 rounded-md mb-4 transition-colors shadow-md"
        >
          Logout
        </button>
      </div>
      <h2 className="text-white text-2xl mb-4">Available Quizzes</h2>
      {loading ? (
        <p className="text-white">Loading quizzes...</p> // Loading state
      ) : error ? (
        <p className="text-red-500">{error}</p> // Error message
      ) : quizzes.length > 0 ? (
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="bg-gray-800 p-4 rounded-md">
              <Link to={`/quizzes/${quiz._id}`} className="text-blue-500 hover:underline">
                <h3 className="text-xl">{quiz.title}</h3>
                <p className="text-gray-400">{quiz.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No quizzes available at the moment.</p>
      )}
    </div>
  );
};

export default UserDashboard;
