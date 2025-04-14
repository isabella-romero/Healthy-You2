// src/components/Login.jsx
import React, { useState } from 'react';
import { loginUser } from '../api'; // Import loginUser from api
import { Link } from 'react-router-dom'; 
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the real loginUser function
            const response = await loginUser({ username, password });
            
            if (response.token) {
                setSuccessMessage('Login successful!');
                setErrorMessage('');
                // Store the token in localStorage or handle it as needed
                localStorage.setItem('token', response.token);
                console.log("Logged in successfully");
                navigate('/Homepage');
            } else {
                setErrorMessage(response.message || 'Login failed!');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Login failed!');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2 className="Login">Welcome</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" className="login-button">Log In</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
