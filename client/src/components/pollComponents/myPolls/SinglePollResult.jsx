import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export default function SinglePollResult() {
  const [details, setDetails] = useState();
  const location = useLocation();
  const { pollId } = location.state;
  const navigate = useNavigate();
  const handleNavigateToPollDetails = (pollId) => {
    navigate(`/single-poll-voter-details`, { state: { pollId } });
  };

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/poll/get-all-mcqs-details/${pollId}`
        );
        setDetails(response.data.body);
        // console.log("details", response.data.body);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);
  const calculatePercentage = (optionVotes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return ((optionVotes / totalVotes) * 100).toFixed(2);
  };

  return (
    <>
      <div className="flex  flex-col gap-4 justify-center items-center h-[100vh]">
        {details && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200 w-1/3">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">
              {details.mcqsDetails[0].pollId.desc}
            </h2>

            <ul>
              {/* Option 1 */}
              <li className="mb-4">
                <div className="flex justify-between items-center">
                  <span>{details.mcqsDetails[0].pollId.option_1}</span>
                  <span>{details.voteCounts.option1}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        details.voteCounts.option1,
                        details.totalVotes
                      )}%`,
                    }}
                  ></div>
                </div>
              </li>
              {/* Option 2 */}
              <li className="mb-4">
                <div className="flex justify-between items-center">
                  <span>{details.mcqsDetails[0].pollId.option_2}</span>
                  <span>{details.voteCounts.option2}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        details.voteCounts.option2,
                        details.totalVotes
                      )}%`,
                    }}
                  ></div>
                </div>
              </li>
              {/* Option 3 */}
              <li className="mb-4">
                <div className="flex justify-between items-center">
                  <span>{details.mcqsDetails[0].pollId.option_3}</span>
                  <span>{details.voteCounts.option3}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        details.voteCounts.option3,
                        details.totalVotes
                      )}%`,
                    }}
                  ></div>
                </div>
              </li>
              {/* Option 4 */}
              <li className="mb-4">
                <div className="flex justify-between items-center">
                  <span>{details.mcqsDetails[0].pollId.option_4}</span>
                  <span>{details.voteCounts.option4}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        details.voteCounts.option4,
                        details.totalVotes
                      )}%`,
                    }}
                  ></div>
                </div>
              </li>
            </ul>

            <p className="text-sm text-gray-600 mt-4">
              Total Votes: {details.totalVotes}
            </p>
          </div>
        )}
        <div>
          <div
            className="bg-indigo-600 mt-6 text-white text-lg rounded-xl px-6 py-2 cursor-pointer"
            onClick={() => handleNavigateToPollDetails(pollId)}
          >
            See Voters Detail
          </div>
        </div>
      </div>
    </>
  );
}
