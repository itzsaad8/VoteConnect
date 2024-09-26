import React from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

export default function UserAllPolls() {
  const navigate = useNavigate();

  // Example poll data
  const pollData = [
    {
      id: 1,
      question: "What is your favorite programming language?",
      options: ["JavaScript", "Python", "Java", "C++"],
    },
    {
      id: 2,
      question: "Which front-end framework do you prefer?",
      options: ["React", "Vue", "Angular", "Svelte"],
    },
    {
      id: 3,
      question: "Which back-end framework do you use?",
      options: ["Node.js", "Django", "Spring", "Flask"],
    },
    {
      id: 4,
      question: "Which database do you prefer?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    },
    {
      id: 5,
      question: "Which cloud platform do you use?",
      options: ["AWS", "Azure", "Google Cloud", "DigitalOcean"],
    },
  ];

  const handleNavigateToPoll = (pollId) => {
    navigate(`/poll/${pollId}`); // Navigate to the single poll page with the poll ID
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-10">
      {/* Map over pollData to generate cards */}
      {pollData.map((poll) => (
        <div
          key={poll.id}
          className="w-1/3 bg-white p-6 rounded-lg shadow-md border border-indigo-200 cursor-pointer"
          onClick={() => handleNavigateToPoll(poll.id)} // Navigate to the poll details page when clicked
        >
          {/* Poll Question */}
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            {poll.question}
          </h2>

          {/* Poll Options */}
          <ul>
            {poll.options.map((option, index) => (
              <li key={index} className="mb-2">
                <button
                  className="w-full text-left py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg"
                  disabled
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
