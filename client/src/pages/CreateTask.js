import React, { useState } from 'react';
import api from '../api/api'; // Adjust the import for your API

const TaskCreationPage = () => {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    projectId: '',
    dueDate: '',
    status: 'pending', // Default status
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/tasks', taskData); // Adjust URL based on your backend API
      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        setTaskData({
          name: '',
          description: '',
          projectId: '',
          dueDate: '',
          status: 'pending',
        });
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Create a New Task</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">Task created successfully!</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Task Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={taskData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">Project ID</label>
          <input
            type="number"
            id="projectId"
            name="projectId"
            value={taskData.projectId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreationPage;
