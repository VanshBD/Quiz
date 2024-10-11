import React, { useState } from 'react';
import axios from 'axios';

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '', choices: [''], correctAnswer: '' }]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (qIndex, choiceIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].choices[choiceIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', choices: [''], correctAnswer: '' }]);
  };

  const addChoice = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices.push(''); // Add a new empty choice
    setQuestions(updatedQuestions);
  };

  const removeChoice = (qIndex, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].choices.splice(choiceIndex, 1); // Remove the specified choice
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
    if (!token) {
      console.error('No token found!');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/quizzes/add',
        {
          title,
          description,
          questions,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Add Authorization header here
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Quiz added successfully!', response.data);
      // Clear form after submission
      setTitle('');
      setDescription('');
      setQuestions([{ question: '', choices: [''], correctAnswer: '' }]); // Reset questions
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <h2 className="text-3xl mb-4">Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-md mb-4 w-full"
          required
        />
        <textarea
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-md mb-4 w-full"
          required
        />
        {questions.map((q, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Question"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-md mb-2 w-full"
              required
            />
            <h4 className="text-lg">Choices:</h4>
            {q.choices.map((choice, cIndex) => (
              <div key={cIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder={`Choice ${cIndex + 1}`}
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, cIndex, e.target.value)}
                  className="bg-gray-800 text-white p-2 rounded-md w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeChoice(index, cIndex)}
                  className="bg-red-500 text-white px-2 ml-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addChoice(index)}
              className="bg-green-500 text-white px-4 py-2 rounded-md mb-2"
            >
              Add Choice
            </button>
            <input
              type="text"
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-md mb-2 w-full"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Add Question
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
