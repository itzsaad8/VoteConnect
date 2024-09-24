import React from "react";
import PollOptions from "./PollOptions";

const RankedChoiceForm = () => {
  return (
    <form className="border p-6 rounded-lg shadow-lg bg-indigo-50">
      <label className="block mb-2 font-semibold text-indigo-600">
        Poll Description:
        <textarea
          className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
          placeholder="Enter a brief description of the poll"
        />
      </label>

      <label className="block mb-2 font-semibold text-indigo-600">
        Poll Question:
        <input
          type="text"
          className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
          placeholder="Enter your question"
        />
      </label>

      {/* Rank options */}
      <label className="block mb-2 font-semibold text-indigo-600">
        Rank the following options:
        <input
          type="text"
          className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
          placeholder="Enter option"
        />
      </label>

      <PollOptions />

      <button
        type="submit"
        className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Create Ranked Choice Poll
      </button>
    </form>
  );
};

export default RankedChoiceForm;
