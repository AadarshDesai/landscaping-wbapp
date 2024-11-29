import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api'; // Adjust the import

const UpdateTaskPage = () => {
  const { id } = useParams(); // Get task ID from the route
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    status: '',
  });

  const fetchTaskDetails = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTaskData(response.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  // Get Bearer token from localStorage
  const getAuthToken = () => {
    const token = localStorage.getItem('token'); // Or use sessionStorage or cookies if you're using those
    return token ? `Bearer ${token}` : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken(); // Get the token
      // Add the Bearer token to the headers
      await api.put(`/tasks/${id}`, taskData, {
        headers: {
          Authorization: token, // Add Authorization header with Bearer token
        },
      });
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Update Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Task Name</label>
          <input
            type="text"
            value={taskData.name}
            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
            className="block w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
            className="block w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={taskData.status}
            onChange={(e) =>
              setTaskData({ ...taskData, status: e.target.value })
            }
            className="block w-full px-4 py-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskPage;
