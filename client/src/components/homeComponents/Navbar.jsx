import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const links = [
  //   { name: "Home", href: "#home" },
  //   { name: "Poll", href: "/poll" },
  //   { name: "Blogs", href: "#blogs" },
  //   { name: "About", href: "#about" },
  //   { name: "Contact", href: "#contact" },
  //   { name: "Login/SignUp", href: "#login" },
  // ];
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
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
        // console.log("user", responce);
      } catch (error) {
        console.log(error);
      }
    };
    user();
  }, []);

  return (
    <nav className="bg-blue-950 shadow-md py-2">
      <div className=" mx-auto px-12 sm:px-16 lg:px-24">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-white">VoteConnect</div>

          <div className="hidden md:flex items-center space-x-8">
            <Link className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold">
              Home
            </Link>
            <Link
              to="/election"
              className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
            >
              Election
            </Link>
            <Link
              to="/public-polls"
              className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
            >
              Public Polls
            </Link>
            <Link
              to="/poll"
              className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
            >
              Create Poll
            </Link>
            <Link
              to="/my-polls"
              className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
            >
              My Polls
            </Link>

            {token ? (
              <div
                onClick={handleLogout}
                className="text-white cursor-pointer  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
              >
                LogOut
              </div>
            ) : (
              <Link
                to="/sign-up"
                className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
              >
                SignUp
              </Link>
            )}
            {user && (
              <Link
                to="/profile"
                className="text-white   transition duration-200  py-2 rounded-md font-bold flex items-center gap-3"
              >
                <span className="hover:text-yellow-300">{user.name}</span>
                <img
                  className="h-12 w-12 rounded-full "
                  src={`http://localhost:5000/${user?.profile_pic}`}
                  alt=""
                />

                <p></p>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-white hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* {isOpen && (
        <div className="md:hidden bg-white rounded-md shadow-md mt-2">
          <div className="flex flex-col p-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-yellow-500 transition duration-200 px-2 py-1 rounded-md text-sm font-medium"
                onClick={toggleMenu} // Close menu on click
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
