import React, { useState } from 'react';
import api from '../api/api';

const FileUpload = ({ projectId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('url', file.name); // Assume a direct link for simplicity
    formData.append('projectId', projectId);

    try {
      await api.post('/files', formData);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-sm mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload File</h3>
      <div className="flex flex-col space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
        />
        <button
          onClick={handleUpload}
          className="bg-indigo-600 text-white font-medium py-2 px-4 rounded shadow hover:bg-indigo-700 transition-all"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
