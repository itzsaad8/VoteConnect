import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserAllPolls() {
  const navigate = useNavigate();
  const [userPolls, setUserPolls] = useState();

  const handleNavigateToPoll = (pollId) => {
    navigate(`/single-poll`, { state: { pollId } });
  };

  const token = localStorage.getItem("token");

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
        setUserPolls(response.data.body);
        console.log(response.data.body);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {userPolls && userPolls.length > 0 ? (
          userPolls.map((poll) => (
            <div
              key={poll._id}
              className="w-1/3 bg-white p-6 rounded-lg shadow-md border border-indigo-200 cursor-pointer"
              onClick={() => handleNavigateToPoll(poll._id)}
            >
              <h2 className="text-xl font-bold text-indigo-600 mb-4">
                {poll.desc}
              </h2>

              <ul>
                <li className="mb-2">
                  <button
                    className="w-full text-left py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg"
                    disabled
                  >
                    {poll.option_2}
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    className="w-full text-left py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg"
                    disabled
                  >
                    {poll.option_3}
                  </button>
                </li>{" "}
                <li className="mb-2">
                  <button
                    className="w-full text-left py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg"
                    disabled
                  >
                    {poll.option_1}
                  </button>
                </li>{" "}
                <li className="mb-2">
                  <button
                    className="w-full text-left py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg"
                    disabled
                  >
                    {poll.option_4}
                  </button>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p>No polls available</p>
        )}
      </div>
    </>
  );
}
