import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [mcqsPolls, setMcqsPolls] = useState();
  const [yonPolls, setYonPolls] = useState();
  const [selectedOption, setSelectedOption] = useState(null);

  const [user, setUser] = useState();

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

  const [showMyPolls, setShowMyPolls] = useState(true);
  const [showPolls, setShowPolls] = useState("mcqs");
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleToggle = (showMyPolls) => {
    setShowMyPolls(showMyPolls);
  };
  const handleToggle1 = (pollType) => {
    setShowPolls(pollType);
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
  // all polls api
  useEffect(() => {
    const data = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/poll/get-my-all-polls`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("all-polls", responce);
        setMcqsPolls(responce.data.body.mcqs);
        setYonPolls(responce.data.body.yon);
      } catch (error) {}
    };
    data();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  // contributed polls
  useEffect(() => {
    const data = async () => {
      const responce = await axios.get(`http://localhost:5000/user/get/polls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("cont", responce);
      // setContributedPolls(responce)
    };
    data();
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
            {user?.name}
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
        <div className="rounded-full bg-blue-100 p-1">
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
      {showMyPolls && (
        <>
          {/* my polls types buttons */}
          <div className="mt-6 flex justify-start space-x-0 ">
            <div className="rounded-full bg-blue-100 p-1">
              <button
                onClick={() => handleToggle1("mcqs")}
                className={`px-4 py-2 font-semibold rounded-full text-sm ${
                  showPolls === "mcqs"
                    ? "bg-blue-950 text-white"
                    : "text-blue-950"
                }`}
              >
                Mcq's Polls
              </button>

              <button
                onClick={() => handleToggle1("yn")}
                className={`px-4 py-2 font-semibold rounded-full text-sm  ${
                  showPolls === "yn"
                    ? "bg-blue-950 text-white"
                    : "text-blue-950"
                }`}
              >
                Y/N Polls
              </button>

              <button
                onClick={() => handleToggle1("starRating")}
                className={`px-4 py-2 font-semibold rounded-full text-sm  ${
                  showPolls === "starRating"
                    ? "bg-blue-950 text-white"
                    : "text-blue-950"
                }`}
              >
                Star Rating Polls
              </button>
            </div>
          </div>
          {/*  */}

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {showPolls === "mcqs" &&
              mcqsPolls?.map((poll) => (
                <>
                  <div
                    key={poll._id}
                    className="w-full mx-auto bg-white p-6 rounded-lg shadow-md border border-indigo-200"
                  >
                    <h2 className="text-xl font-bold text-blue-950 mb-4">
                      {poll.title}
                    </h2>

                    <ul>
                      <li className="mb-2">
                        <button
                          className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                            selectedOptions[poll.id] === poll.option_1
                              ? "bg-blue-950 text-white"
                              : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                          }`}
                          onClick={() =>
                            handleOptionClick(poll.id, poll.option_1)
                          }
                        >
                          {poll.option_1}
                        </button>
                      </li>
                      <li className="mb-2">
                        <button
                          className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                            selectedOptions[poll.id] === poll.option_2
                              ? "bg-blue-950 text-white"
                              : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                          }`}
                          onClick={() =>
                            handleOptionClick(poll.id, poll.option_2)
                          }
                        >
                          {poll.option_2}
                        </button>
                      </li>
                      <li className="mb-2">
                        <button
                          className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                            selectedOptions[poll.id] === poll.option_3
                              ? "bg-blue-950 text-white"
                              : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                          }`}
                          onClick={() =>
                            handleOptionClick(poll.id, poll.option_3)
                          }
                        >
                          {poll.option_3}
                        </button>
                      </li>
                      <li className="mb-2">
                        <button
                          className={`w-full text-left py-2 px-4 rounded-lg cursor-pointer ${
                            selectedOptions[poll.id] === poll.option_4
                              ? "bg-blue-950 text-white"
                              : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                          }`}
                          onClick={() =>
                            handleOptionClick(poll.id, poll.option_4)
                          }
                        >
                          {poll.option_4}
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ))}
            {showPolls === "yn" &&
              yonPolls.map((poll) => (
                <>
                  <div className="w-full flex flex-col items-center justify-center mx-auto bg-white p-6 rounded-lg shadow-md border border-blue-200">
                    <h2 className="text-xl font-bold text-blue-950 mb-4">
                      {poll.title}
                    </h2>
                    <div className="w-full  flex justify-center gap-2">
                      <button
                        className={`w-1/3 py-2 px-4 text-center rounded-lg cursor-pointer ${
                          selectedOption === "Yes"
                            ? "bg-blue-950 text-white"
                            : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                        }`}
                        onClick={() => handleOptionClick("Yes")}
                      >
                        Yes
                      </button>
                      <button
                        className={`w-1/3 py-2 px-4 text-center rounded-lg cursor-pointer ${
                          selectedOption === "No"
                            ? "bg-blue-950 text-white"
                            : "bg-blue-100 text-blue-950 hover:bg-blue-200"
                        }`}
                        onClick={() => handleOptionClick("No")}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
