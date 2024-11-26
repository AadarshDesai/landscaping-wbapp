import React, { useEffect, useState } from 'react';
import api from '../api/api';

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h3>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 border rounded-lg shadow-sm ${
                notification.read ? 'bg-gray-100' : 'bg-indigo-50'
              }`}
            >
              <p className="text-gray-700">
                {notification.message}{' '}
                <span
                  className={`font-medium ${
                    notification.read ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {notification.read ? '(Read)' : '(Unread)'}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationList;
