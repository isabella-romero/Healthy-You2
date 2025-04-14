import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './Home.jsx';
import Login from './components/LogIn.jsx';
import Register from './components/Register.jsx';
import Exercises from './components/Exercises.jsx';
// import { fetchMessage } from './api'; // Assuming you have an API function to fetch the message

// Separated component to handle button navigation
function HomePage({ message }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login/Register</h1>
      <div className="card">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/login')}>Register</button> {/* You can change this to `/register` if needed */}
      </div>
      <h2>{message}</h2>
    </div>
  );
}

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching message:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage message={message} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exercises" element={<Exercises />} />
        {/* Add this line later if you have a register page */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
