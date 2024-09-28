import React, { useState } from "react";
import axios from "axios";
// import PollOptions from "./PollOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YesNoForm = () => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setError("");
    // setSuccess(false);

    // API request payload matches the object structure you provided
    const payload = {
      title: formData.title,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/poll/post",
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
      console.log(err);
    } finally {
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-6 rounded-lg shadow-lg bg-indigo-50"
    >
      <label className="block mb-2 font-semibold text-indigo-600">
        Poll Question:
        <input
          value={formData.title}
          onChange={handleChange}
          name="title"
          type="text"
          className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
          placeholder="Enter your question"
        />
      </label>
      {/* <PollOptions /> */}
      <button
        type="submit"
        className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Create Yes/No Poll
      </button>
      <ToastContainer />
    </form>
  );
};

export default YesNoForm;

{
  /* <label className="block mb-2 font-semibold text-indigo-600">
Poll Description:
<textarea
  className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
  placeholder="Enter a brief description of the poll"
/>
</label> */
}
