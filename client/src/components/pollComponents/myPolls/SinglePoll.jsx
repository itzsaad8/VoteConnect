import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function SinglePoll() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleNavigateToResult = (pollId) => {
    navigate(`/single-poll-result`, { state: { pollId } });
  };

  const [poll, setPoll] = useState();

  const location = useLocation();
  const { pollId } = location.state;
  //   console.log("pollidp", pollId);
  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/poll/get/${pollId}`
        );
        setPoll(response.data.body);
        // console.log(response.data.body.desc);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle option click
  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option state
  };
  console.log(selectedOption);

  const handleSubmitVote = async () => {
    const payload = {
      pollId: pollId,
      selectedCandidate: selectedOption,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/poll/addmcqs",
        payload,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      console.log(response.data.body);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[70vh]">
        {poll && (
          <div className="w-1/3 mx-auto  bg-white p-6 rounded-lg shadow-md border border-indigo-200 ">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">
              {poll.desc}
            </h2>

            <ul>
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOption === poll.option_1
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-200"
                  }`}
                  onClick={() => handleOptionClick(poll.option_1)}
                >
                  {poll.option_1}
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOption === poll.option_2
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-200"
                  }`}
                  onClick={() => handleOptionClick(poll.option_2)}
                >
                  {poll.option_2}
                </button>
              </li>{" "}
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOption === poll.option_3
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-200"
                  }`}
                  onClick={() => handleOptionClick(poll.option_3)}
                >
                  {poll.option_3}
                </button>
              </li>{" "}
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOption === poll.option_4
                      ? "bg-indigo-600 text-white "
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-200"
                  }`}
                  onClick={() => handleOptionClick(poll.option_4)}
                >
                  {poll.option_4}
                </button>
              </li>
            </ul>
          </div>
        )}
        <div className="flex justify-between gap-5">
          <button
            className="bg-indigo-600 text-white text-lg px-6 py-2 rounded-xl mt-7"
            onClick={handleSubmitVote}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Vote"}
          </button>
          <button
            className="bg-indigo-600 text-white text-lg px-6 py-2 rounded-xl mt-7"
            onClick={() => handleNavigateToResult(pollId)}
          >
            See Result
          </button>
        </div>
      </div>
    </>
  );
}
