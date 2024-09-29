import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function YesNoPoll() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [yonPoll, setYonPoll] = useState();

  const navigate = useNavigate();
  const handleNavigateToResult = (pollId) => {
    navigate(`/single-yon-result`, { state: { pollId } });
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const poll = {
    question: "Do you like this feature?",
  };

  const { id } = useParams();
  const location = useLocation();
  const pollId = location?.state?.pollId || id || null;

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/poll/get-single-poll/${pollId}`
        );
        setYonPoll(response.data.body);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);

  // vote cast
  const handleSubmitVote = async () => {
    const payload = {
      pollId: pollId,
      selectedOption: selectedOption,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/poll/select-option",
        payload,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // share poll
  const sharePoll = () => {
    const shareUrl = `${window.location.origin}/single-yon-poll/${pollId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Url Copied");
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16">
        {yonPoll && (
          <div className="w-1/3 mx-auto bg-white p-6 rounded-lg shadow-md border border-blue-200">
            <h2 className="text-xl font-bold text-blue-950 mb-4">
              {yonPoll.title}
            </h2>
            <div className="flex justify-around">
              <button
                className={`w-1/3 py-2 px-4 text-center rounded-lg cursor-pointer ${
                  selectedOption === "Yes"
                    ? "bg-blue-950 text-white"
                    : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                }`}
                onClick={() => handleOptionClick("Yes")}
              >
                Yes
              </button>
              <button
                className={`w-1/3 py-2 px-4 text-center rounded-lg cursor-pointer ${
                  selectedOption === "No"
                    ? "bg-blue-950 text-white"
                    : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                }`}
                onClick={() => handleOptionClick("No")}
              >
                No
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between gap-3">
          <button
            onClick={sharePoll}
            className="bg-blue-950 text-white  px-6 py-2 rounded-xl mt-7"
          >
            Share
          </button>
          <button
            className="bg-blue-950 text-white  px-6 py-2 rounded-xl mt-7"
            onClick={handleSubmitVote}
          >
            Submit Vote
          </button>
          <button
            className="bg-blue-950 text-white  px-6 py-2 rounded-xl mt-7"
            onClick={() => handleNavigateToResult(pollId)}
          >
            See Result
          </button>
        </div>
      </div>
    </>
  );
}
