import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate for back button
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the JWT token
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Attach token to request headers
          }
        });
        setQuiz(response.data);
      } catch (error) {
        setError('Failed to load quiz. Please try again later.');
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionIndex, choice) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: choice,
    }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  };

  const handleBack = () => {
    navigate('/user'); // Navigate back to the user dashboard
  };

  if (loading) return <div className="text-white">Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-3xl mb-4 border-b border-gray-600 pb-2">{quiz.title}</h2>
        <p className="mb-4 text-gray-300">{quiz.description}</p>
        
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl mb-2">{question.question}</h3>
            {question.choices.map((choice) => (
              <label key={choice} className="block text-gray-400 mb-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={choice}
                  checked={selectedAnswers[index] === choice}
                  onChange={() => handleAnswerChange(index, choice)}
                  className="mr-2 accent-white" // Change radio button color to white
                />
                {choice}
              </label>
            ))}
          </div>
        ))}
        
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md transition-colors shadow-md"
          >
            Submit
          </button>
          <button
            onClick={handleBack}
            className="bg-gray-700 text-white hover:bg-gray-600 px-4 py-2 rounded-md transition-colors shadow-md"
          >
            Back to Dashboard
          </button>
        </div>

        {score !== null && (
          <div className="mt-6 bg-gray-700 p-4 rounded-md shadow-md">
            <h4 className="text-xl">Your Score: {score}/{quiz.questions.length}</h4>
            <h4 className="mt-2 text-gray-400">Answers:</h4>
            <ul className="list-disc pl-5">
              {quiz.questions.map((question, index) => (
                <li key={index} className="text-gray-300">
                  {question.question} - Your Answer: {selectedAnswers[index] || 'No answer'} - Correct Answer: {question.correctAnswer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizDetail;
