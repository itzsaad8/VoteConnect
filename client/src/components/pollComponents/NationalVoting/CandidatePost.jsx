import axios from "axios";
import React, { useState } from "react";

export default function CandidatePost() {
  //   const [cnic, setCnic] = useState("");
  //   const [candidateName, setCandidateName] = useState("");
  //   const [associatedParty, setAssociatedParty] = useState("");
  //   const [candidateType, setCandidateType] = useState(""); // State for candidate type

  const [formData, setFormData] = useState({
    cnic: "",
    full_name: "",
    associate_party: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/election/add/candidate`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("dand data", response);

      setFormData({
        cnic: "",
        full_name: "",
        associate_party: "",
        type: "",
      });
      document.getElementById("my_modal_4").close();
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Open Modal
      </button>

      {/* Modal for Candidate Post */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">Candidate Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cnic" className="block text-sm font-medium mb-2">
                CNIC
              </label>
              <input
                type="text"
                id="cnic"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                required
                maxLength={13}
                className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Enter your CNIC (13 digits)"
              />
            </div>
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium mb-2"
              >
                Candidate Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Enter candidate name"
              />
            </div>
            <div>
              <label
                htmlFor="associate_party"
                className="block text-sm font-medium mb-2"
              >
                Associated Party
              </label>
              <input
                type="text"
                id="associate_party"
                name="associate_party"
                value={formData.associate_party}
                onChange={handleChange}
                required
                className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Enter associated party"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-2">
                Candidate Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
              >
                <option value="" disabled>
                  Select candidate type
                </option>
                <option value="National">National </option>
                <option value="Provisional">Provisional</option>
              </select>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-200 hover:text-blue-950 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
