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

  const [mcqPpoll, setMcqsPoll] = useState();
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
        setMcqsPoll(response.data.body);
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
  // console.log(selectedOption);

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
        {mcqPpoll && (
          <div className="w-1/3 mx-auto  bg-white p-6 rounded-lg shadow-md border border-blue-200 ">
            <h2 className="text-xl font-bold text-blue-950 mb-4">
              {mcqPpoll.desc}
            </h2>

            <ul>
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOption === mcqPpoll.option_1
                      ? "bg-blue-950 text-white"
                      : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                  }`}
                  onClick={() => handleOptionClick(mcqPpoll.option_1)}
                >
                  {mcqPpoll.option_1}
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOption === mcqPpoll.option_2
                      ? "bg-blue-950 text-white"
                      : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                  }`}
                  onClick={() => handleOptionClick(mcqPpoll.option_2)}
                >
                  {mcqPpoll.option_2}
                </button>
              </li>{" "}
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOption === mcqPpoll.option_3
                      ? "bg-blue-950 text-white"
                      : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                  }`}
                  onClick={() => handleOptionClick(mcqPpoll.option_3)}
                >
                  {mcqPpoll.option_3}
                </button>
              </li>{" "}
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOption === mcqPpoll.option_4
                      ? "bg-blue-950 text-white "
                      : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                  }`}
                  onClick={() => handleOptionClick(mcqPpoll.option_4)}
                >
                  {mcqPpoll.option_4}
                </button>
              </li>
            </ul>
          </div>
        )}
        <div className="flex justify-between gap-5">
          <button
            className="bg-blue-950 text-white text-lg px-6 py-2 rounded-xl mt-7"
            onClick={sharePoll}
          >
            Share
          </button>
          <button
            className="bg-blue-950 text-white text-lg px-6 py-2 rounded-xl mt-7"
            onClick={handleSubmitVote}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Vote"}
          </button>
          <button
            className="bg-blue-950 text-white text-lg px-6 py-2 rounded-xl mt-7"
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
