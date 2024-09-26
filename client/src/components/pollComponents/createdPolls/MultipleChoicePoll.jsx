import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

export default function MultipleChoicePoll() {
  const [votes, setVotes] = useState([]); // Initialize votes as an empty array
  const [selectedOption, setSelectedOption] = useState(null); // Track the user's selected option
  const [voterDetails, setVoterDetails] = useState(null); // Track voter details
  const [poll, setPoll] = useState([]); // Poll data state
  const [candidate, setCandidate] = useState([]);
  const [allData, setAllData] = useState(null);

  // Dummy user details
  const userDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const location = useLocation();
  const { id } = location.state;

  // Calculate total votes dynamically based on the votes array
  const totalVotes = votes.reduce((acc, curr) => acc + curr, 0);

  // Function to handle voting (select one option at a time)
  const handleVote = async (index, option) => {
    if (selectedOption !== index) {
      const newVotes = [...votes];

      // If the user had previously selected an option, remove that vote
      if (selectedOption !== null) {
        newVotes[selectedOption] -= 1; // Decrease vote from previous option
      }

      // Add the vote to the new selected option
      newVotes[index] += 1;
      setVotes(newVotes);
      setSelectedOption(index); // Update the selected option
      setCandidate(option);
      setVoterDetails(userDetails); // Set voter details when voting
      const data = {
        userId: localStorage.getItem("vote_id"),
        pollId: id,
        selectedCandidate: option,
      };
      try {
        const response = await axios.post(
          `http://localhost:5000/poll/addmcqs`,
          data
        );
        console.log(response);
        setPoll(response.data);

        // Assume poll data contains an initial votes array, if available
        setVotes(response.data.body?.votes || [0, 0, 0, 0]); // Defaulting to 0 votes if not available
      } catch (error) {
        console.error("Error fetching poll data:", error); // Log any error to the console
      }
    }

    const fetchPollData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/poll/get/${id}`
        );
        setPoll(response.data);
        // console.log("bb", poll);
        // Assume poll data contains an initial votes array, if available
        setVotes(response.data.body?.votes || [0, 0, 0, 0]); // Defaulting to 0 votes if not available
      } catch (error) {
        console.error("Error fetching poll data:", error); // Log any error to the console
      }
    };

    fetchPollData();
  };

  // Calculate vote percentages
  const calculatePercentage = (voteCount) => {
    return totalVotes === 0 ? 0 : ((voteCount / totalVotes) * 100).toFixed(1);
  };

  // Fetch poll data when the component mounts
  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/poll/get/${id}`
        );
        setPoll(response.data);
        // console.log("bb", poll);
        // Assume poll data contains an initial votes array, if available
        setVotes(response.data.body?.votes || [0, 0, 0, 0]); // Defaulting to 0 votes if not available
      } catch (error) {
        console.error("Error fetching poll data:", error); // Log any error to the console
      }
    };

    fetchPollData();
  }, [id]);
  // Fetch poll data when the component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/poll/get-all-mcqs-details/${id}`
        );
        setAllData(response.data);
        console.log("nn", allData?.body);

        console.log(response);

        // Assume poll data contains an initial votes array, if available
        // setVotes(response.data.body?.votes || [0, 0, 0, 0]); // Defaulting to 0 votes if not available
      } catch (error) {
        console.error("Error fetching poll data:", error); // Log any error to the console
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      <div className="flex justify-center items-start px-8 mt-10 space-x-8">
        {/* Poll Card */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md border border-indigo-200">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            {poll?.body && poll?.body.title}
          </h2>
          <ul>
            {[
              poll?.body?.option_1,
              poll?.body?.option_2,
              poll?.body?.option_3,
              poll?.body?.option_4,
            ]?.map((option, index) => (
              <li key={index} className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 ${
                    selectedOption === index
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-200"
                  } rounded-lg transition duration-300`}
                  onClick={() => handleVote(index, option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Result Card */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md border border-indigo-200">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">Results</h2>
          <ul>
            {[
              poll.body?.option_1,
              poll.body?.option_2,
              poll.body?.option_3,
              poll.body?.option_4,
            ].map((option, index) => (
              <li key={index} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span>{option}</span>
                  <span>{calculatePercentage(votes[index])}%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className="bg-indigo-600 h-3 rounded-full"
                    style={{ width: `${calculatePercentage(votes[index])}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-indigo-600 mt-4">Total Votes: {totalVotes}</p>
        </div>

        {/* Voter Details Card */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md border border-indigo-200">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            Voter Details
          </h2>
          {voterDetails ? (
            <div className="flex justify-between items-center">
              Voter:{" "}
              {allData?.body?.mcqsDetails &&
                allData.body.mcqsDetails.length > 0 &&
                allData.body.mcqsDetails[0]?.userId?.name}
              {console.log("nbn", allData?.body?.mcqsDetails[0])}
              Voted:{" "}
              {allData?.body &&
                allData?.body?.mcqsDetails[0]?.selectedCandidate}
            </div>
          ) : (
            <p className="text-gray-500">No voter details available.</p>
          )}
        </div>
      </div>
    </>
  );
}
