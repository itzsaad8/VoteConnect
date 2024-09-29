import React, { useState } from "react";
import AllPublicPolls from "./AllPublicPolls";
import CreateModal from "./CreateModal";
import SinglePublicPoll from "./SinglePublicPoll";

export default function PublicPolls() {
  const [selectedPoll, setSelectedPoll] = useState(null); // State for selected poll

  // Function to handle selecting a poll
  const handleSelectPoll = (poll) => {
    setSelectedPoll(poll); // Set the selected poll data
  };

  return (
    <>
      <div className="px-16 md:px-20 lg:px-24 mt-6">
        <div className="flex justify-between">
          <div className="w-3/4">
            <input
              placeholder="Search poll here ..."
              className="rounded-full text-base py-3 outline-none px-5  w-full bg-blue-100"
              type="search"
            />
          </div>
          <button
            onClick={() => document.getElementById("my_modal_4").showModal()}
            className="bg-blue-100 hover:bg-blue-950 hover:text-white text-blue-950 rounded-full px-4"
          >
            Create Poll
          </button>
        </div>
        <div className="flex gap-3 mt-4">
          {/* Pass handleSelectPoll to AllPublicPolls */}
          <div className="w-1/2">
            <AllPublicPolls onSelectPoll={handleSelectPoll} />
          </div>
          {/* Pass selectedPoll to SinglePublicPoll */}
          <div className="w-1/2">
            <SinglePublicPoll poll={selectedPoll} />
          </div>
        </div>
      </div>
      <CreateModal />
    </>
  );
}
