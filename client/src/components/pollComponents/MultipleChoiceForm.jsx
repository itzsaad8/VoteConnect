import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const MultipleChoiceForm = () => {
  const navigate = useNavigate();
  // State to store form data
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
    visibility: "private", // Default visibility
    liveResult: "Yes", // Default to show live results
    showUserDetails: "Yes", // Default to show user details
    admin: {}, // This would be filled with relevant data from your app's state or API
  });

  const [success, setSuccess] = useState(false); // State to track success status
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(""); // State to track error message

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
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

    try {
      // Send POST request to the API
      const response = await axios.post(
        "http://localhost:5000/poll/add",
        payload
      );
      // console.log(response);

      if (response.data.success) {
        navigate("/created-poll", { state: { id: response.data.body._id } });
        setSuccess(true); // Show success popup
        setFormData({
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
        }); // Reset form data
      }
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
        className="border p-6 rounded-lg shadow-lg bg-indigo-50"
      >
        {/* Poll Title */}
        <label className="block mb-2 font-semibold text-indigo-600">
          Poll Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
            placeholder="Enter your poll title"
            required
          />
        </label>

        {/* Poll Description */}
        <label className="block mb-2 font-semibold text-indigo-600">
          Poll Description:
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
            placeholder="Enter a brief description of the poll"
            required
          />
        </label>

        {/* Option 1 */}
        <label className="block mb-2 font-semibold text-indigo-600">
          Option 1:
          <input
            type="text"
            name="option_1"
            value={formData.option_1}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
            placeholder="Enter option 1"
            required
          />
        </label>

        {/* Option 2 */}
        <label className="block mb-2 font-semibold text-indigo-600">
          Option 2:
          <input
            type="text"
            name="option_2"
            value={formData.option_2}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
            placeholder="Enter option 2"
            required
          />
        </label>

        {/* Option 3 */}
        <label className="block mb-2 font-semibold text-indigo-600">
          Option 3:
          <input
            type="text"
            name="option_3"
            value={formData.option_3}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
            placeholder="Enter option 3"
          />
        </label>

        {/* Option 4 */}
        <label className="block mb-2 font-semibold text-indigo-600">
          Option 4:
          <input
            type="text"
            name="option_4"
            value={formData.option_4}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
            placeholder="Enter option 4"
          />
        </label>

        {/* Poll Visibility */}
        <label className="block mb-2 font-semibold text-indigo-600">
          Visibility:
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </label>

        {/* Live Result */}
        <label className="block mb-2 font-semibold text-indigo-600">
          Live Results:
          <select
            name="liveResult"
            value={formData.liveResult}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* Show User Details */}
        <label className="block mb-2 font-semibold text-indigo-600">
          Show User Details:
          <select
            name="showUserDetails"
            value={formData.showUserDetails}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* Submit Button */}
        <div className="flex items-center gap-6">
          <button
            type="submit"
            className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating Poll..." : "Create Poll"}
          </button>

          <Link to="/created-poll" className="text-indigo-600 hover:underline">
            See Poll
          </Link>
        </div>

        {/* Success Popup */}
        {success && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            Poll created successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default MultipleChoiceForm;
