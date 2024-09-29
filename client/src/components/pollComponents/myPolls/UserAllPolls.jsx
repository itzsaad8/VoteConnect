import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserAllPolls() {
  const navigate = useNavigate();
  const [mcqsPolls, setMcqsPolls] = useState([]);
  const [yonPolls, setYonPolls] = useState([]);
  const [showMcqsPolls, setShowMcqsPolls] = useState(true); // To toggle between MCQs and YON Polls
  const token = localStorage.getItem("token");

  const handleNavigateToPoll = (pollId) => {
    navigate(`/single-poll`, { state: { pollId } });
  };
  const handleNavigateToYonPoll = (pollId) => {
    navigate(`/single-yon-poll`, { state: { pollId } });
  };

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/poll/get-my-all-polls",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setMcqsPolls(response.data.body.mcqs);
        setYonPolls(response.data.body.yon);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);

  // Handle toggle between MCQs and YON polls
  const handleToggle = (type) => {
    if (type === "mcqs") {
      setShowMcqsPolls(true);
    } else if (type === "yon") {
      setShowMcqsPolls(false);
    }
  };

  return (
    <>
      {/* Buttons to toggle between different types of polls */}
      <div className="mt-6 flex justify-center space-x-0 ">
        <div className="rounded-full bg-indigo-100 p-1">
          <button
            onClick={() => handleToggle("mcqs")}
            className={`px-4 py-2 font-semibold rounded-full ${
              showMcqsPolls ? "bg-blue-950 text-white" : " text-blue-950"
            }`}
          >
            Mcqs Polls ({mcqsPolls.length})
          </button>
          <button
            onClick={() => handleToggle("yon")}
            className={`px-4 py-2 font-semibold rounded-full ${
              !showMcqsPolls ? "bg-blue-950 text-white" : " text-blue-950"
            }`}
          >
            Yon Polls ({yonPolls.length})
          </button>
        </div>
      </div>

      {/* Display MCQs polls or YON polls based on toggle state */}
      {showMcqsPolls ? (
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {mcqsPolls && mcqsPolls.length > 0 ? (
            mcqsPolls.map((poll) => (
              <div
                key={poll._id}
                className="w-1/3 bg-white p-6 rounded-lg shadow-md border border-indigo-200 cursor-pointer"
                onClick={() => handleNavigateToPoll(poll._id)}
              >
                <h2 className="text-xl font-bold text-blue-950 mb-4">
                  {poll.desc}
                </h2>
                <ul>
                  <li className="mb-2">
                    <button
                      className="w-full text-left py-2 px-4 bg-indigo-50 text-blue-950 rounded-lg"
                      disabled
                    >
                      {poll.option_2}
                    </button>
                  </li>
                  <li className="mb-2">
                    <button
                      className="w-full text-left py-2 px-4 bg-indigo-50 text-blue-950 rounded-lg"
                      disabled
                    >
                      {poll.option_3}
                    </button>
                  </li>
                  <li className="mb-2">
                    <button
                      className="w-full text-left py-2 px-4 bg-indigo-50 text-blue-950 rounded-lg"
                      disabled
                    >
                      {poll.option_1}
                    </button>
                  </li>
                  <li className="mb-2">
                    <button
                      className="w-full text-left py-2 px-4 bg-indigo-50 text-blue-950 rounded-lg"
                      disabled
                    >
                      {poll.option_4}
                    </button>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>No MCQs polls available</p>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {yonPolls && yonPolls.length > 0 ? (
            yonPolls.map((poll) => (
              <div
                key={poll._id}
                className="w-1/3  bg-white p-6 rounded-lg shadow-md border border-indigo-200"
                onClick={() => handleNavigateToYonPoll(poll._id)}
              >
                <h2 className="text-xl font-bold text-blue-950 mb-4">
                  {poll.title}
                </h2>
                <div className="flex justify-around">
                  <button className="w-1/3 py-2 px-4 text-center rounded-lg cursor-pointer text-blue-950 bg-indigo-100">
                    Yes
                  </button>
                  <button className="w-1/3 py-2 px-4 text-center rounded-lg cursor-pointer text-blue-950 bg-indigo-100">
                    No
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No YON polls available</p>
          )}
        </div>
      )}
    </>
  );
}
