import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SingleYonResult() {
  const [result, setResult] = useState();
  const location = useLocation();
  const { pollId } = location.state;
  console.log(pollId);

  useEffect(() => {
    const data = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/poll/get-all-yon-details/${pollId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResult(response.data.body);
        console.log(response);
      } catch (error) {
        console.log("Error fetching poll details:", error);
      }
    };
    data();
  }, [pollId]);
  const calculatePercentage = (optionVotes, total) => {
    if (total === 0) return 0;
    return ((optionVotes / total) * 100).toFixed(2);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-14">
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200 w-1/3">
            <h2 className="text-xl font-bold text-blue-950 mb-4">
              {result.title}
            </h2>

            <ul>
              {/* Option 1 */}
              <li className="mb-4">
                <div className="flex justify-between items-center">
                  <span>Yes</span>
                  <span>{result.choosenYes}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-blue-950 h-2.5 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        result.choosenYes,
                        result.choosenYes + result.choosenNo
                      )}%`,
                    }}
                  ></div>
                </div>
              </li>
              {/* Option 2 */}
              <li className="mb-4">
                <div className="flex justify-between items-center">
                  <span>No</span>
                  <span>{result.choosenNo}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-blue-950 h-2.5 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        result.choosenNo,
                        result.choosenYes + result.choosenNo
                      )}%`,
                    }}
                  ></div>
                </div>
              </li>
            </ul>

            <p className="text-sm text-gray-600 mt-4">
              Total Votes: {result.choosenNo + result.choosenYes}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
