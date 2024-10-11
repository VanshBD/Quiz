import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddQuiz from '../components/AddQuiz';

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
        const response = await axios.get('http://localhost:5000/api/quizzes', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request header
          },
        });
        setQuizzes(response.data);
      } catch (error) {
        setError('Error fetching quizzes: ' + (error.response?.data?.message || 'Please try again.'));
      } finally {
        setLoading(false); // Reset loading state
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
    if (!confirmDelete) return; // Exit if not confirmed
  
    try {
      const token = localStorage.getItem('token'); // Ensure the token is being retrieved correctly
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });
      setQuizzes(quizzes.filter(quiz => quiz._id !== id)); // Remove quiz from state
    } catch (error) {
      setError('Error deleting quiz: ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/login'; // Redirect to login page
  };

  if (loading) return <div className="text-white">Loading quizzes...</div>; // Loading message

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-3xl">Admin Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <AddQuiz />
      <h2 className="text-white text-2xl mb-4">Available Quizzes</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message */}
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz._id} className="flex justify-between mb-2">
            <span className="text-white">{quiz.title}</span>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleDelete(quiz._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
