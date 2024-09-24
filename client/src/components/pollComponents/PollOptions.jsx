import React, { useState } from "react";

const PollOptions = () => {
  const [visibility, setVisibility] = useState("public");
  const [resultVisibility, setResultVisibility] = useState("live");
  const [showDetails, setShowDetails] = useState("yes");

  const visibilityDetails = {
    public: "Public: Everyone can see and participate in the poll.",
    private: "Private: Only selected people can participate in the poll.",
  };

  const resultVisibilityDetails = {
    live: "Live Results: Results are shown immediately as votes are cast.",
    endTime: "End Time Results: Results are shown after the poll ends.",
  };

  const showDetailsDescriptions = {
    yes: "Yes: Voter details (name, etc.) will be visible to others.",
    no: "No: Voter details will remain anonymous.",
  };

  return (
    <>
      <div className="mb-4 flex items-center">
        <label className="block font-semibold mr-4 w-1/10 text-indigo-600">
          Poll Visibility:
        </label>
        <select
          className="border p-2 w-1/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-indigo-50 text-indigo-600"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <div className="ml-4 w-9/10 text-indigo-600">
          {visibilityDetails[visibility]}
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <label className="block font-semibold mr-4 w-1/10 text-indigo-600">
          Result Visibility:
        </label>
        <select
          className="border p-2 w-1/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-indigo-50 text-indigo-600"
          value={resultVisibility}
          onChange={(e) => setResultVisibility(e.target.value)}
        >
          <option value="live">Live Results</option>
          <option value="endTime">End Time Results</option>
        </select>
        <div className="ml-4 w-9/10 text-indigo-600">
          {resultVisibilityDetails[resultVisibility]}
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <label className="block font-semibold mr-4 w-1/10 text-indigo-600">
          Show Voter Details:
        </label>
        <select
          className="border p-2 w-1/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-indigo-50 text-indigo-600"
          value={showDetails}
          onChange={(e) => setShowDetails(e.target.value)}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div className="ml-4 w-9/10 text-indigo-600">
          {showDetailsDescriptions[showDetails]}
        </div>
      </div>
    </>
  );
};

export default PollOptions;
