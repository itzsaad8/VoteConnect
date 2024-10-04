import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllPublicPolls({ onSelectPoll }) {
  const [polls, setPolls] = useState([]);
  const [selectedPollId, setSelectedPollId] = useState(null); // Track selected poll

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/poll/product/get-all"
        );
        setPolls(response.data.body);
        console.log("all", response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPolls();
  }, []);

  const handleSelectPoll = (poll) => {
    setSelectedPollId(poll._id); // Set the selected poll
    onSelectPoll(poll); // Call the parent function
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
                className={`bg-white p-5 rounded-lg shadow-sm border cursor-pointer h-48 transition-all duration-300 ease-in-out
                  ${
                    poll._id === selectedPollId
                      ? "border-blue-700 shadow-blue-950"
                      : "border-gray-300 hover:shadow-lg"
                  }`}
                onClick={() => handleSelectPoll(poll)}
              >
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Created by -{" "}
                  <span className="text-blue-700 font-semibold">
                    {poll?.admin?.name || "Anonymous"}
                  </span>
                </p>

                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  Poll Title:{" "}
                  <span className="text-gray-900">{poll.title}</span>
                </h2>

                <p className="text-sm text-gray-600 italic">
                  Category:{" "}
                  <span className="font-medium text-gray-700">
                    {poll.category}
                  </span>
                </p>

                <div className="mt-4 ">
                  <p className="text-sm text-blue-500  font-medium">
                    Click to see details
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
