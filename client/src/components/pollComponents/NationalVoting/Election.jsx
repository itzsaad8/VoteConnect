import React, { useEffect, useState } from "react";
import CandidateLogin from "./CandidateLogin";
import axios from "axios";

const Election = () => {
  const [cnic, setCnic] = useState("");
  const [showPolls, setShowPolls] = useState(false);
  const [nationalAssemblyVote, setNationalAssemblyVote] = useState(null);
  const [provincialAssemblyVote, setProvincialAssemblyVote] = useState(null);
  const [nationalVoteSubmitted, setNationalVoteSubmitted] = useState(false);
  const [provincialVoteSubmitted, setProvincialVoteSubmitted] = useState(false);
  const [na, setNa] = useState();
  const [pr, setPr] = useState();

  //   const nationalCandidates = [
  //     { name: "Candidate 1", party: "Party A" },
  //     { name: "Candidate 2", party: "Party B" },
  //     { name: "Candidate 3", party: "Party C" },
  //   ];

  //   const provincialCandidates = [
  //     { name: "Candidate X", party: "Party X" },
  //     { name: "Candidate Y", party: "Party Y" },
  //     { name: "Candidate Z", party: "Party Z" },
  //   ];

  const handleCnicSubmit = (e) => {
    e.preventDefault();
    if (cnic.length === 13) {
      setShowPolls(true);
    } else {
      alert("Please enter a valid 13-digit CNIC.");
    }
  };

  const handleNationalAssemblyVote = (candidate) => {
    setNationalAssemblyVote(candidate);
    console.log("id", nationalAssemblyVote);
  };

  const handleProvincialAssemblyVote = (candidate) => {
    setProvincialAssemblyVote(candidate);
    console.log(provincialAssemblyVote);
  };

  const submitNationalAssemblyVote = async () => {
    if (!nationalAssemblyVote) {
      alert("Please select a candidate for the National Assembly.");
      return;
    }
    setNationalVoteSubmitted(true);

    const payload = {
      candidate: nationalAssemblyVote._id,
      cnic: cnic,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/election/add/vote`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("post cand", response);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
    alert(
      `You voted for ${nationalAssemblyVote.full_name} (${nationalAssemblyVote.party}) in the National Assembly.`
    );
  };

  const submitProvincialAssemblyVote = async () => {
    if (!provincialAssemblyVote) {
      alert("Please select a candidate for the Provincial Assembly.");
      return;
    }
    setProvincialVoteSubmitted(true);
    const payload = {
      candidate: provincialAssemblyVote._id,
      cnic: cnic,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/election/add/vote`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("post cand", response);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
    alert(
      `You voted for ${provincialAssemblyVote.full_name} (${provincialAssemblyVote.party}) in the Provincial Assembly.`
    );
  };
  const handleSubmit = () => {
    const data = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/election/get/candidate/${cnic}`
        );
        console.log(response.data.body.NA);
        const National = response.data.body.NA;
        const Provisional = response.data.body.PR;
        setNa(National);
        setPr(Provisional);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  };

  return (
    <>
      <div className="flex justify-end mr-4 mt-4">
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="p-4 font-semibold py-1 text-white bg-blue-950 hover:bg-blue-200 hover:text-blue-950 rounded-lg"
        >
          Login
        </button>
      </div>
      <div className="min-h-screen flex flex-col items-center   p-4">
        <h1 className="text-3xl font-bold text-blue-950 mb-6">Election Page</h1>

        {/* CNIC Input Form */}
        {!showPolls && (
          <form
            onSubmit={handleCnicSubmit}
            className="w-full flex justify-center"
          >
            <div className="flex items-center w-1/2">
              <input
                type="text"
                id="cnic"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                maxLength="13"
                required
                className="p-3 pr-20 w-full border border-gray-300 rounded-l-full focus:outline-none "
                placeholder="Enter 13-digit CNIC"
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="p-3 bg-blue-950 text-white rounded-r-full border border-blue-950 hover:border hover:border-blue-200 font-semibold hover:text-blue-950 hover:bg-blue-200 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {/* Polls Section */}
        {showPolls && (
          <div className="w-full max-w-4xl flex items-center justify-between gap-4">
            {/* National Assembly Poll */}
            <div className="w-full min-h-[50vh] flex flex-col justify-center border bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                National Assembly Poll
              </h2>
              {na && (
                <div className="space-y-4">
                  {na.map((candidate, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center gap-3 ${
                        nationalAssemblyVote?.full_name === candidate.full_name
                          ? "bg-blue-100 border-blue-400"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleNationalAssemblyVote(candidate)}
                      disabled={nationalVoteSubmitted}
                    >
                      <span className="text-lg font-medium">
                        {candidate.full_name}
                      </span>
                      <span>{candidate.associate_party}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={submitNationalAssemblyVote}
                className={`mt-4 w-full p-3 ${
                  nationalVoteSubmitted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-900 hover:bg-blue-950"
                } text-white rounded-lg font-semibold transition duration-300`}
                disabled={nationalVoteSubmitted}
              >
                {nationalVoteSubmitted ? "Vote Submitted" : "Submit NA Vote"}
              </button>
            </div>

            {/* Provincial Assembly Poll */}
            <div className="w-full min-h-[50vh] flex flex-col justify-center border bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Provincial Assembly Poll
              </h2>
              {pr && (
                <div className="space-y-4">
                  {pr.map((candidate, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center gap-3  ${
                        provincialAssemblyVote?.full_name ===
                        candidate.full_name
                          ? "bg-blue-100 border-blue-400"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleProvincialAssemblyVote(candidate)}
                      disabled={provincialVoteSubmitted}
                    >
                      <span className="text-lg font-medium">
                        {candidate.full_name}
                      </span>
                      <span>{candidate.associate_party}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={submitProvincialAssemblyVote}
                className={`mt-4 w-full p-3 ${
                  provincialVoteSubmitted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-900 hover:bg-blue-950"
                } text-white rounded-lg font-semibold transition duration-300`}
                disabled={provincialVoteSubmitted}
              >
                {provincialVoteSubmitted ? "Vote Submitted" : "Submit PK Vote"}
              </button>
            </div>
          </div>
        )}
      </div>
      <CandidateLogin />{" "}
    </>
  );
};

export default Election;
