const { Sequelize } = require('sequelize');
require('dotenv').config(); // Make sure to load environment variables

// Initialize Sequelize with connection string from .env
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
  logging: false,  // Optional: Disable logging of SQL queries
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
