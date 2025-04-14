// src/api.js
export const loginUser = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const data = await response.json();
      return data; // Possibly contains token or user info
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  export const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }
  
      const data = await response.json();
      return data; // contains success message or user info
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  