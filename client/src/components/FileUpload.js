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
    <div>
      <h3>Upload File</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
