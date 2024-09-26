import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import PollPage from "./pages/pollPage/PollPage";
import Root from "./pages/Root";
// import MultipleChoicePoll from "./components/pollComponents/createdPolls/MultipleChoicePoll";
import SignUp from "./pages/SignUp";
// import Poll from "./components/pollComponents/createdPolls/Poll";
// import MultipleChoicePoll from "./components/pollComponents/createdPolls/MultipleChoicePoll";
import MyPollPage from "./pages/pollPage/MyPollPage";

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
