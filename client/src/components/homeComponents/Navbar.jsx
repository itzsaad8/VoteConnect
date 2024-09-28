import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { name: "Home", href: "#home" },
    { name: "Poll", href: "/poll" },
    { name: "Blogs", href: "#blogs" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Login/SignUp", href: "#login" },
  ];
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-blue-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Website Logo/Name */}
          <div className="text-2xl font-bold text-white">VoteConnect</div>

          {/* Navbar Links for Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold">
              Home
            </Link>
            <Link
              to="/poll"
              className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
            >
              Poll
            </Link>
            <Link
              to="/my-polls"
              className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
            >
              My Polls
            </Link>
            <Link className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold">
              About
            </Link>{" "}
            <Link className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold">
              Contact
            </Link>{" "}
            {token ? (
              <Link
                to=""
                className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
              >
                LogOut
              </Link>
            ) : (
              <Link
                to="/sign-up"
                className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
              >
                SignUp
              </Link>
            )}
            <Link
              to="/profile"
              className="text-white  hover:text-yellow-300 transition duration-200 px-3 py-2 rounded-md font-bold"
            >
              Profile
            </Link>
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
      {isOpen && (
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
      )}
    </nav>
  );
};

export default Navbar;
