import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">VoteConnect</h2>
            <p className="text-gray-400">Create, manage, and participate in polls</p>
          </div>
          {/* Links */}
          <div className="flex space-x-6">
            <Link to='/public-polls' className="hover:text-yellow-500">
              Create Polls
            </Link>
            <Link to='/public-polls' href="#public-polls" className="hover:text-yellow-500">
              Public Polls
            </Link>
            <Link to='/election' className="hover:text-yellow-500">
              Election
            </Link>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} VoteConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
