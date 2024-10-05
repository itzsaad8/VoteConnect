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
import Profile from "./components/Profile/Profile";
import YesNoPoll from "./components/pollComponents/YesNoPolls/YesNoPoll";
import SingleYonResult from "./components/pollComponents/YesNoPolls/SingleYonResult";
import PublicPollsPage from "./pages/publicPollpage/PublicPollsPage";
import Login from "./pages/LogIn";

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
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
        path: "/single-poll",
        element: <SinglePoll />,
      },
      {
        path: "/single-poll/:id",
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

      // yes no components
      {
        path: "/single-yon-poll",
        element: <YesNoPoll />,
      },
      {
        path: "/single-yon-poll/:id",
        element: <YesNoPoll />,
      },
      {
        path: "/single-yon-result",
        element: <SingleYonResult />,
      },
      // public
      {
        path: "/public-polls",
        element: <PublicPollsPage />,
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
