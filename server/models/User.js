const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Adjust path if necessary

// Define the User model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
