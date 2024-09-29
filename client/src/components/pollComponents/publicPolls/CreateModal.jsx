import React, { useState } from "react";
import axios from "axios";

export default function CreateModal() {
  const [close, setClose] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    showUserDetails: "Yes", // default to Yes
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const token = localStorage.getItem("token");

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/poll/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClose(false);
      console.log(response.data);
      // Close the modal or give success feedback here
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  return (
    <>
      {close && (
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Create New Poll</h3>
            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              {/* Title Input */}
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="title"
                >
                  Poll Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="Enter poll title"
                />
              </div>

              {/* Category Input */}
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="category"
                >
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="Enter category"
                />
              </div>

              {/* Show User Details Toggle */}
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="showUserDetails"
                >
                  Show User Details:
                </label>
                <select
                  id="showUserDetails"
                  name="showUserDetails"
                  value={formData.showUserDetails}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="modal-action">
                <button
                  type="submit"
                  className="p-2 bg-blue-950 hover:bg-blue-100 hover:text-blue-950 text-white rounded-lg"
                >
                  Submit Poll
                </button>
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}
