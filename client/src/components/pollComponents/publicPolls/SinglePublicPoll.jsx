import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";

export default function SinglePublicPoll({ poll }) {
  console.log("poll", poll);
  const [single, setSingle] = useState(null);
  const [singleM, setSingleM] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [rating, setRating] = useState(0);
  const [likeStates, setLikeStates] = useState({});

  const handleRatingClick = (index) => {
    setRating(index);
  };

  const handleLike = (reviewId) => {
    setLikeStates((prevState) => ({
      ...prevState,
      [reviewId]: {
        liked: !prevState[reviewId]?.liked,
        disliked: prevState[reviewId]?.disliked
          ? false
          : prevState[reviewId]?.disliked,
      },
    }));
  };

  const handleDisLike = (reviewId) => {
    setLikeStates((prevState) => ({
      ...prevState,
      [reviewId]: {
        disliked: !prevState[reviewId]?.disliked,
        liked: prevState[reviewId]?.liked ? false : prevState[reviewId]?.liked,
      },
    }));
  };

  const token = localStorage.getItem("token");

  const id = poll ? poll._id : null;

  useEffect(() => {
    const fetchPollDetails = async () => {
      if (!id) return;

      try {
        const responce = await axios.get(
          `http://localhost:5000/poll/product/get-details-by-id/${id}`
        );
        console.log("all details", responce);
        setSingle(responce.data.body);
        setSingleM(responce.data.body.polls);
      } catch (error) {
        console.error("Error fetching poll details", error);
      }
    };
    fetchPollDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review: rating,
      comment: textValue,
      pollId: id,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/poll/product/vote",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <h1 className="text-3xl font-bold text-blue-950 mb-6">Details</h1>
      {!poll ? (
        <h1 className="text-2xl font-bold text-gray-500">No poll selected</h1>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 min-h-[90vh]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img
                  src={`http://localhost:5000/${poll.admin.profile_pic}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-bold text-blue-950">
                {poll?.admin?.name || "Unknown"}
              </h2>
            </div>
            <p className="text-gray-700">Category: {poll.category}</p>
          </div>
          <div className="flex flex-col gap-3 my-2">
            <h1 className="mt-2 text-3xl font-semibold">
              <span className="text-blue-950">Title: </span>
              <span className="text-blue-400">{poll.title}</span>
            </h1>
            <p className="mt-2 text-gray-600">
              <span className="font-bold">Description: </span>
              {poll.description || "No description"}
            </p>
          </div>

          <div className="my-4 flex flex-col gap-3 px-3 py-6 border border-gray-200 rounded-lg shadow-xl">
            <input
              className="w-full p-2 bg-slate-300 rounded-lg outline-none"
              type="text"
              value={textValue}
              required
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Add review"
            />
            {/* Star Rating */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  required
                  key={star}
                  filled={star <= rating}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>

            <button
              className="py-2 rounded-lg bg-blue-950 text-white hover:bg-blue-200 hover:text-blue-950"
              onClick={handleSubmit}
            >
              Submit Your Review
            </button>
          </div>

          {single && (
            <div className="mt-2 ">
              <span className="font-semibold"> Total reviews:</span>{" "}
              <span>{single?.totalReviews}</span>
            </div>
          )}
          {singleM &&
            singleM.map((review) => (
              <div
                key={review._id}
                className="py-2 flex justify-between items-start"
              >
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={`http://localhost:5000/${review.userId.profile_pic}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-1 ">
                    <p className="text-sm">
                      {review.userId.name}{" "}
                      <span className="text-[10px] opacity-80">
                        12 minutes ago
                      </span>
                    </p>
                    <p className="font-semibold ">{review.comment}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 opacity-70">
                        {likeStates[review._id]?.liked ? (
                          <AiFillLike onClick={() => handleLike(review._id)} />
                        ) : (
                          <AiOutlineLike
                            onClick={() => handleLike(review._id)}
                          />
                        )}
                        {likeStates[review._id]?.disliked ? (
                          <BiSolidDislike
                            onClick={() => handleDisLike(review._id)}
                          />
                        ) : (
                          <BiDislike
                            onClick={() => handleDisLike(review._id)}
                          />
                        )}
                      </div>

                      <p className="text-[12px] font-semibold">Reply</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[2px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {star <= review.review ? (
                        <FaStar className="text-yellow-400 text-[10px]" />
                      ) : (
                        <FaRegStar className="text-yellow-400 text-[10px]" />
                      )}
                    </span>
                  ))}
                  <span className="text-[10px] opacity-80">
                    ({review.review})
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

const Star = ({ filled, onClick }) => (
  <>
    {filled ? (
      <FaStar className="text-yellow-400 text-xl" onClick={onClick} />
    ) : (
      <FaRegStar className="text-yellow-400 text-xl" onClick={onClick} />
    )}
  </>
);
