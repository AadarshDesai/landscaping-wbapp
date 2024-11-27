import React, { useState } from 'react';
import api from '../api/api';

const AddProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const projectData = {
        name,
        description,
        status,
        customerId: parseInt(customerId), // Assuming customerId is provided as a number
      };

      const response = await api.post('/projects', projectData);
      // Handle successful response (e.g., redirect or show success message)
      alert('Project created successfully!');
      setName('');
      setDescription('');
      setStatus('pending');
      setCustomerId('');
    } catch (error) {
      setError('Error creating project. Please try again.');
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Project</h3>

      {/* Project Form */}
      <form onSubmit={handleSubmit}>
        {/* Project Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Customer ID */}
        <div className="mb-4">
          <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
            Customer ID
          </label>
          <input
            type="number"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg"
          disabled={loading}
        >
          {loading ? 'Creating Project...' : 'Create Project'}
        </button>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default AddProject;
