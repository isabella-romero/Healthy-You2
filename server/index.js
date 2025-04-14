const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow the frontend to access the backend
  methods: ['GET', 'POST'],        // Specify the allowed methods
  credentials: true,               // Allow cookies to be sent with requests
};

// Apply the CORS configuration globally to all routes
app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// Example API route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Register API route
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // You can add user registration logic here (e.g., saving to a database)
  console.log('User registered:', { name, email });

  // Respond with success message
  return res.status(201).json({ message: 'User registered successfully!' });
});

// Serve static files from the React app (after it's built)
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Catch-all route to serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
