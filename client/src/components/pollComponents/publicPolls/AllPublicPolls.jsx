import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

export default function AllPublicPolls({ onSelectPoll }) {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/poll/product/get-all"
        );
        setPolls(response.data.body);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPolls();
  }, []);

  // Function to render star rating based on rating value
  const renderStarRating = (rating) => {
    const totalStars = 5; // Maximum number of stars
    return (
      <div className="flex space-x-1">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={index}
              className={
                starValue <= rating ? "text-yellow-500" : "text-gray-300"
              }
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto mt-6">
        <h1 className="text-3xl font-bold text-blue-950 mb-6">Public Polls</h1>
        <div className="grid grid-cols-1 gap-8">
          {polls &&
            polls.map((poll) => (
              <div
                key={poll._id}
                className="bg-white p-6 rounded-lg shadow-md border border-indigo-200"
                onClick={() => onSelectPoll(poll)} // Pass the entire poll object to the parent
              >
                {/* Poll Creator's Name */}
                <h2 className="text-lg font-bold text-blue-950">
                  Created by: {poll.creatorName || "Unknown"}{" "}
                  {/* Example creator */}
                </h2>

                {/* Poll Description and Question */}
                <p className="mt-4 text-gray-700">{poll.category}</p>
                <p className="mt-2 text-blue-950 font-semibold">{poll.title}</p>

                {/* Star Rating */}
                <div className="mt-4">
                  <h3 className="text-sm text-gray-500">Rating:</h3>
                  {renderStarRating(poll.rating)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
