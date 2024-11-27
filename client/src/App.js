import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import AddProject from './pages/AddProject';
import TaskCreationPage from './pages/CreateTask';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/create-task" element={<TaskCreationPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
