import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState();
  // const user = {
  //   name: "John Doe",
  //   profilePicture: "https://via.placeholder.com/150", // Replace with actual DP URL
  // };

  const myPolls = [
    {
      id: 1,
      desc: "What is your favorite color?",
      option_1: "Red",
      option_2: "Blue",
      option_3: "Green",
      option_4: "Yellow",
    },
    {
      id: 2,
      desc: "What is your favorite season?",
      option_1: "Spring",
      option_2: "Summer",
      option_3: "Fall",
      option_4: "Winter",
    },
    {
      id: 3,
      desc: "What is your favorite season?",
      option_1: "Spring",
      option_2: "Summer",
      option_3: "Fall",
      option_4: "Winter",
    },
    {
      id: 4,
      desc: "What is your favorite season?",
      option_1: "Spring",
      option_2: "Summer",
      option_3: "Fall",
      option_4: "Winter",
    },
  ];

  const contributedPolls = [
    {
      id: 3,
      desc: "What is your favorite animal?",
      option_1: "Dog",
      option_2: "Cat",
      option_3: "Bird",
      option_4: "Fish",
    },
    {
      id: 4,
      desc: "What is your preferred mode of transport?",
      option_1: "Car",
      option_2: "Bike",
      option_3: "Bus",
      option_4: "Train",
    },
    {
      id: 5,
      desc: "What is your preferred mode of transport?",
      option_1: "Car",
      option_2: "Bike",
      option_3: "Bus",
      option_4: "Train",
    },
    {
      id: 6,
      desc: "What is your preferred mode of transport?",
      option_1: "Car",
      option_2: "Bike",
      option_3: "Bus",
      option_4: "Train",
    },
  ];

  const [showMyPolls, setShowMyPolls] = useState(true); // By default, show "My Polls"
  const [selectedOptions, setSelectedOptions] = useState({});

  // Function to toggle between "My Polls" and "Contributed Polls"
  const handleToggle = (showMyPolls) => {
    setShowMyPolls(showMyPolls);
  };

  // Handle option click
  const handleOptionClick = (pollId, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [pollId]: option,
    }));
  };

  const displayedPolls = showMyPolls ? myPolls : contributedPolls;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const user = async () => {
      try {
        const responce = await axios.get(
          "http://localhost:5000/user/by/token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(responce.data.body);
        console.log("profile", responce);
      } catch (error) {
        console.log(error);
      }
    };
    user();
  }, []);

  return (
    <div className="px-12 sm:px-24  bg-white  rounded-lg p-6">
      {/* Profile Section */}
      <div className="flex justify-between items-center">
        <div className="flex  gap-3 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={`http://localhost:5000/${user?.profile_pic}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-center text-2xl font-semibold text-gray-700">
            {user.name}
          </h2>
        </div>
        <Link
          to="/poll"
          className="bg-blue-950 text-white hover:bg-blue-200 hover:text-blue-950 px-4 py-2 rounded-lg font-semibold "
        >
          Create New Poll
        </Link>
      </div>

      {/* Buttons to toggle between "My Polls" and "Contributed Polls" */}
      <div className="mt-6 flex justify-center space-x-0 ">
        <div className="rounded-full bg-indigo-100 p-1">
          <button
            onClick={() => handleToggle(true)}
            className={`px-4 py-2  font-semibold rounded-full ${
              showMyPolls ? "bg-blue-950 text-white" : " text-blue-950"
            }`}
          >
            My Polls
          </button>
          <button
            onClick={() => handleToggle(false)}
            className={`px-4 py-2  font-semibold rounded-full ${
              !showMyPolls ? "bg-blue-950 text-white" : " text-blue-950"
            }`}
          >
            Contributed Polls
          </button>
        </div>
      </div>

      {/* Polls Section */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedPolls.map((poll) => (
          <div
            key={poll.id}
            className=" mx-auto bg-white p-6 rounded-lg shadow-md border border-indigo-200"
          >
            <h2 className="text-xl font-bold text-blue-950 mb-4">
              {poll.desc}
            </h2>

            <ul>
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOptions[poll.id] === poll.option_1
                      ? "bg-blue-950 text-white"
                      : "bg-indigo-50 text-blue-950 hover:bg-blue-200"
                  }`}
                  onClick={() => handleOptionClick(poll.id, poll.option_1)}
                >
                  {poll.option_1}
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOptions[poll.id] === poll.option_2
                      ? "bg-blue-950 text-white"
                      : "bg-indigo-50 text-blue-950 hover:bg-blue-200"
                  }`}
                  onClick={() => handleOptionClick(poll.id, poll.option_2)}
                >
                  {poll.option_2}
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOptions[poll.id] === poll.option_3
                      ? "bg-blue-950 text-white"
                      : "bg-indigo-50 text-blue-950 hover:bg-blue-200"
                  }`}
                  onClick={() => handleOptionClick(poll.id, poll.option_3)}
                >
                  {poll.option_3}
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                    selectedOptions[poll.id] === poll.option_4
                      ? "bg-blue-950 text-white"
                      : "bg-indigo-50 text-blue-950 hover:bg-blue-200"
                  }`}
                  onClick={() => handleOptionClick(poll.id, poll.option_4)}
                >
                  {poll.option_4}
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
