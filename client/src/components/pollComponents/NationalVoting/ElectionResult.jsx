import React from "react";
import { useLocation } from "react-router-dom";

export default function ElectionResult() {
  const location = useLocation();
  const NAresults = location?.state.naResult;
  const PRresults = location?.state.prResult;
  console.log("nas", NAresults);
  console.log("prs", PRresults);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="font-bold text-3xl text-blue-950 py-4">
          GENERAL ELECTION 2024 RESULTS
        </h2>
        <div className="w-full max-w-4xl flex items-center justify-between gap-4">
          {/* National Assembly Poll */}
          <div className="w-full min-h-[50vh] flex flex-col justify-center border bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              National Assembly Result
            </h2>
            {NAresults && (
              <div className="space-y-4">
                <div className="flex items-center justify-between font-bold">
                  <span>Candidate</span>
                  <span>Votes</span>
                </div>
                {NAresults.map((candidate, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center gap-3 `}
                  >
                    <span className="text-lg font-medium">
                      {candidate.candidate.full_name}
                    </span>
                    <span>{candidate.totalVotes}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Provincial Assembly Poll */}
          <div className="w-full min-h-[50vh] flex flex-col justify-center border bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Provincial Assembly Result
            </h2>
            {PRresults && (
              <div className="space-y-4">
                <div className="flex items-center justify-between font-bold ">
                  <span>Candidate</span>
                  <span>Votes</span>
                </div>
                {PRresults.map((candidate, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center gap-3  `}
                  >
                    <span className="text-lg font-medium">
                      {candidate.candidate.full_name}
                    </span>
                    <span>{candidate.totalVotes}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
