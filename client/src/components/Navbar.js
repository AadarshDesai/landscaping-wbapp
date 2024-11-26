import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the token exists

  return (
    <nav className="bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          LAMS
        </Link>
        <ul className="flex space-x-4">
          {/* If the user is authenticated, show Dashboard */}
          {isAuthenticated ? (
            <li>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </li>
          ) : (
            // If not authenticated, show Login and Register links
            <>
              <li>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
