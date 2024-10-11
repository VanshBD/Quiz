import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white mb-4">Welcome to Quiz App</h1>
      <p className="text-white mb-6">Join us to test your knowledge and learn new things!</p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
