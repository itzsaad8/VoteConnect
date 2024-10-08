import React, { useState } from "react";
import CandidatePost from "./CandidatePost";

export default function CandidateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the login credentials
    if (email === "admin@gmail.com" && password === "admin123") {
      setError(""); // Clear error if login is successful
      document.getElementById("my_modal_2").close(); // Close the login modal
      document.getElementById("my_modal_4").showModal(); // Open the next modal
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      {/* First Modal for Candidate Login */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-full max-w-lg">
          <h3 className="font-bold text-xl text-center mb-6">
            Candidate Login
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-200 hover:text-blue-950 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <CandidatePost />
    </>
  );
}
