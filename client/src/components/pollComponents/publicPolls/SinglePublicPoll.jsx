import React from "react";

export default function SinglePublicPoll({ poll }) {
  if (!poll) {
    return (
      <div className="max-w-7xl mx-auto mt-6">
        <h1 className="text-2xl font-bold text-gray-500">No poll selected</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 ">
      <h1 className="text-3xl font-bold text-blue-950 mb-6">Poll Details</h1>

      {/* Display poll details */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200 h-[90vh]">
        <h2 className="text-lg font-bold text-blue-950">
          Created by: {poll.creatorName || "Unknown"}
        </h2>
        <p className="mt-4 text-gray-700">Category: {poll.category}</p>
        <p className="mt-2 text-blue-950 font-semibold">Title: {poll.title}</p>
        <p className="mt-2 text-gray-600">{poll.description}</p>
      </div>
    </div>
  );
}
