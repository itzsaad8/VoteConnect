import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SinglePublicPoll({ poll }) {
  if (!poll) {
    return (
      <div className="max-w-7xl mx-auto mt-6">
        <h1 className="text-2xl font-bold text-gray-500">No poll selected</h1>
      </div>
    );
  }
  const id = poll.pollId._id;
  console.log("the res", poll);
  // console.log(id);

  useEffect(() => {
    const data = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/poll/product/get-details-by-id/${id}`
        );
        console.log("all details", responce);
      } catch (error) {}
    };
    data();
  }, []);

  // post review
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review: numberValue,
      comment: textValue,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/poll/product/vote",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto mt-6 ">
        <h1 className="text-3xl font-bold text-blue-950 mb-6">Poll Details</h1>

        {/* Display poll details */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200 h-[90vh]">
            <h2 className="text-lg font-bold text-blue-950">
              Created by: {poll.creatorName || "Unknown"}
            </h2>
            <p className="mt-4 text-gray-700">Category: {poll.category}</p>
            <p className="mt-2 text-blue-950 font-semibold">
              Title: {poll.title}
            </p>
            <p className="mt-2 text-gray-600">{poll.description}</p>

            <div className="flex flex-col gap-1">
              <input
                className="w-full p-2 bg-slate-300"
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Enter text"
              />
              <input
                className="w-full p-2 bg-slate-300"
                type="number"
                value={numberValue}
                onChange={(e) => setNumberValue(e.target.value)}
                placeholder="Enter number"
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
