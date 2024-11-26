import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <Link
        to="/project/1"
        className="inline-block bg-indigo-600 text-white font-medium py-2 px-4 rounded shadow hover:bg-indigo-700 transition-all"
      >
        View Project Details
      </Link>
    </div>
  );
};

export default Dashboard;
