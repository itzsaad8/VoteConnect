import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function SinglePollVotersDetail() {
  const [pollDetails, setPollDetails] = useState([]);
  const location = useLocation();
  const { pollId } = location.state;

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/poll/voter-details/${pollId}`
        );
        setPollDetails(response.data.body);
        // console.log("Poll details", response.data.body);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, [pollId]);

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="w-1/2 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            Voter Details
          </h2>
          <div className="flex justify-between items-center text-indigo-600">
            <span>Voter Name</span>
            <span>Selected Candidate</span>
          </div>
          {pollDetails.length > 0 ? (
            <ul className="space-y-4">
              {pollDetails.map((voter, index) => (
                <li
                  key={index}
                  className="border p-2 rounded-md flex items-center justify-between"
                >
                  <span className="text-gray-700">{voter.voterName}</span>
                  <span className="text-gray-700">
                    {voter.selectedCandidate}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No voter details available.</p>
          )}
        </div>
      </div>
    </>
  );
}
