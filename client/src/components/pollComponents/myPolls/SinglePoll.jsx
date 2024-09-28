import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SinglePoll() {
  const [loading, setLoading] = useState(false);
  const [urlPollId, setUrlPollId] = useState(null);

  const navigate = useNavigate();
  const handleNavigateToResult = (pollId) => {
    navigate(`/single-poll-result`, { state: { pollId } });
  };

  const [poll, setPoll] = useState();
  const { id } = useParams();

  const location = useLocation();
  const pollUrlId = location?.state?.pollId || id || null;

  //   console.log("pollidp", pollId);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/poll/get/${pollUrlId}`
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
      pollId: pollUrlId,
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
      toast.success("Vote Casted!");

      setLoading(false);
      console.log(response.data.body);
    } catch (err) {
      console.log(err);
    }
  };

  const sharePoll = () => {
    const shareUrl = `${window.location.origin}/single-poll/${pollUrlId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Url Copied");
    });
  };
  const token = localStorage.getItem("token");
  if (!token) {
    return navigate("/sign-up");
  }

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
            onClick={sharePoll}
          >
            Share
          </button>
          <button
            className="bg-indigo-600 text-white text-lg px-6 py-2 rounded-xl mt-7"
            onClick={handleSubmitVote}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Vote"}
          </button>
          <button
            className="bg-indigo-600 text-white text-lg px-6 py-2 rounded-xl mt-7"
            onClick={() => handleNavigateToResult(pollUrlId)}
          >
            See Result
          </button>
        </div>
        <ToastContainer />;
      </div>
    </>
  );
}
