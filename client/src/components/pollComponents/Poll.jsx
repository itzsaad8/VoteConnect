import React, { useState } from "react";
import MultipleChoiceForm from "./MultipleChoiceForm";
import YesNoForm from "./YesNoForm";
import OpenEndedForm from "./OpenEndedForm";
import OpinionPollForm from "./OpinionPollForm";
import RankedChoiceForm from "./RankedChoiceForm";

const Poll = () => {
  const [pollType, setPollType] = useState("multipleChoice");
  const [pollData, setPollData] = useState(null);

  const handleCreatePoll = (newPollData) => {
    setPollData(newPollData);
  };

  const handlePollTypeChange = (type) => {
    setPollType(type);
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-blue-100 p-4 border-r border-indigo-200">
        <h2 className="text-lg font-bold mb-4 text-blue-950">
          Select Poll Type
        </h2>
        <ul>
          <li className="mb-2">
            <button
              className={`w-full py-2 px-4 text-left ${
                pollType === "multipleChoice"
                  ? "bg-blue-950 text-white"
                  : "bg-indigo-50 text-blue-950 hover:bg-blue-200"
              } rounded-lg transition duration-300`}
              onClick={() => handlePollTypeChange("multipleChoice")}
            >
              Multiple Choice Poll
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`w-full py-2 px-4 text-left ${
                pollType === "yesNo"
                  ? "bg-blue-950 text-white"
                  : "bg-indigo-50 text-blue-950 hover:bg-blue-200"
              } rounded-lg transition duration-300`}
              onClick={() => handlePollTypeChange("yesNo")}
            >
              Yes/No Poll
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`w-full py-2 px-4 text-left ${
                pollType === "openEnded"
                  ? "bg-blue-950 text-white"
                  : "bg-indigo-50 text-blue-950 hover:bg-blue-200"
              } rounded-lg transition duration-300`}
              onClick={() => handlePollTypeChange("openEnded")}
            >
              Open-Ended Poll
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`w-full py-2 px-4 text-left ${
                pollType === "opinionPoll"
                  ? "bg-blue-950 text-white"
                  : "bg-indigo-50 text-blue-950 hover:bg-blue-200"
              } rounded-lg transition duration-300`}
              onClick={() => handlePollTypeChange("opinionPoll")}
            >
              Opinion Poll
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 px-4 text-left ${
                pollType === "rankedChoice"
                  ? "bg-blue-950 text-white"
                  : "bg-indigo-50 text-blue-950 hover:bg-blue-200"
              } rounded-lg transition duration-300`}
              onClick={() => handlePollTypeChange("rankedChoice")}
            >
              Ranked Choice Poll
            </button>
          </li>
        </ul>
      </div>

      {/* Right Form Section */}
      <div className="w-3/4 p-8 bg-white">
        <h2 className="text-2xl text-center font-bold mb-6 text-blue-950">
          Create Your Poll
        </h2>
        {pollType === "multipleChoice" && <MultipleChoiceForm />}
        {pollType === "yesNo" && <YesNoForm />}
        {pollType === "openEnded" && <OpenEndedForm />}
        {pollType === "opinionPoll" && <OpinionPollForm />}
        {pollType === "rankedChoice" && <RankedChoiceForm />}
      </div>
    </div>
  );
};

export default Poll;
