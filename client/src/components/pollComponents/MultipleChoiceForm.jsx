import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MultipleChoiceForm = () => {
  const navigate = useNavigate();
  // store form data
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
    visibility: "private",
    liveResult: "Yes",
    showUserDetails: "Yes",
    admin: {},
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // API request payload matches the object structure you provided
    const payload = {
      title: formData.title,
      desc: formData.desc,
      option_1: formData.option_1,
      option_2: formData.option_2,
      option_3: formData.option_3,
      option_4: formData.option_4,
      visibility: formData.visibility,
      liveResult: formData.liveResult,
      showUserDetails: formData.showUserDetails,
      admin: formData.admin,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/poll/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Poll Created successfully");
      console.log(response);
    } catch (err) {
      setError("Failed to create poll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded-lg shadow-lg bg-blue-100"
      >
        <label className="block mb-2 font-semibold text-blue-950">
          Poll Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
            placeholder="Enter your poll title"
            required
          />
        </label>

        <label className="block mb-2 font-semibold text-blue-950">
          Poll Description:
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
            placeholder="Enter a brief description of the poll"
            required
          />
        </label>

        <label className="block mb-2 font-semibold text-blue-950">
          Option 1:
          <input
            type="text"
            name="option_1"
            value={formData.option_1}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
            placeholder="Enter option 1"
            required
          />
        </label>

        <label className="block mb-2 font-semibold text-blue-950">
          Option 2:
          <input
            type="text"
            name="option_2"
            value={formData.option_2}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
            placeholder="Enter option 2"
            required
          />
        </label>

        <label className="block mb-2 font-semibold text-blue-950">
          Option 3:
          <input
            type="text"
            name="option_3"
            value={formData.option_3}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
            placeholder="Enter option 3"
          />
        </label>

        <label className="block mb-2 font-semibold text-blue-950">
          Option 4:
          <input
            type="text"
            name="option_4"
            value={formData.option_4}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
            placeholder="Enter option 4"
          />
        </label>

        <label className="block mb-2 font-semibold text-blue-950">
          Visibility:
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </label>

        <label className="block mb-2 font-semibold text-blue-950">
          Live Results:
          <select
            name="liveResult"
            value={formData.liveResult}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label className="block mb-2 font-semibold text-blue-950">
          Show User Details:
          <select
            name="showUserDetails"
            value={formData.showUserDetails}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <div className="flex items-center gap-6">
          <button
            type="submit"
            className="mt-6 bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-blue-200 hover:text-blue-950   transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating Poll..." : "Create Poll"}
          </button>
        </div>

        {success && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            Poll created successfully!
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default MultipleChoiceForm;
