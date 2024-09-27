import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import PollPage from "./pages/pollPage/PollPage";
import Root from "./pages/Root";
import SignUp from "./pages/SignUp";

import MyPollPage from "./pages/pollPage/MyPollPage";
import SinglePoll from "./components/pollComponents/myPolls/SinglePoll";
import SinglePollResult from "./components/pollComponents/myPolls/SinglePollResult";
import SinglePollVotersDetail from "./components/pollComponents/myPolls/SinglePollVotersDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/poll",
        element: <PollPage />,
      },
      {
        path: "/my-polls",
        element: <MyPollPage />,
      },

      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/single-poll",
        element: <SinglePoll />,
      },
      {
        path: "/single-poll-result",
        element: <SinglePollResult />,
      },
      {
        path: "/single-poll-voter-details",
        element: <SinglePollVotersDetail />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
