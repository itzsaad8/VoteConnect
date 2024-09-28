import React, { useState } from "react";

export default function YesNoPoll() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Add additional logic if needed
  };
  const poll = {
    question: "Do you like this feature?",
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="w-1/3 mx-auto bg-white p-6 rounded-lg shadow-md border border-indigo-200">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            {poll.question}
          </h2>
          <div className="flex justify-around">
            <button
              className={`w-1/3 py-2 px-4 text-center rounded-lg cursor-pointer ${
                selectedOption === "Yes"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-200"
              }`}
              onClick={() => handleOptionClick("Yes")}
            >
              Yes
            </button>
            <button
              className={`w-1/3 py-2 px-4 text-center rounded-lg cursor-pointer ${
                selectedOption === "No"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-200"
              }`}
              onClick={() => handleOptionClick("No")}
            >
              No
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <button className="bg-indigo-600 text-white  px-6 py-2 rounded-xl mt-7">
            Share
          </button>
          <button className="bg-indigo-600 text-white  px-6 py-2 rounded-xl mt-7">
            Submit Vote
          </button>
          <button
            className="bg-indigo-600 text-white  px-6 py-2 rounded-xl mt-7"
            // onClick={() => handleNavigateToResult(pollUrlId)}
          >
            See Result
          </button>
        </div>
      </div>
    </>
  );
}
