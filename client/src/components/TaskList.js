import React, { useEffect, useState } from 'react';
import api from '../api/api';

const TaskList = ({ projectId, onUpdateTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`/tasks/${projectId}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [projectId]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h3>
      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-4 border rounded-lg shadow-sm flex justify-between items-center ${
                task.status === 'Completed'
                  ? 'bg-green-50 border-green-400'
                  : 'bg-yellow-50 border-yellow-400'
              }`}
            >
              <div>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">{task.name}</span>
                </p>
                <p
                  className={`font-medium ${
                    task.status === 'Completed'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {task.status}
                </p>
              </div>
              <button
                onClick={() => onUpdateTask(task.id)} // Call the update function
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
