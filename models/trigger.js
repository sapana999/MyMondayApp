const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database connection
const express = require('express');

// Define the Trigger model
const Trigger = sequelize.define('Trigger', {
  webhook_url: {
      type: Sequelize.STRING,
      allowNull: false
  },
  subscription_id: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  board_id: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  integration_id: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  priority_level: {
      type: Sequelize.STRING, // Assuming priority_level is a string based on your payload
      allowNull: false
  }
}, {
  tableName: 'triggers'
});
class Trigger1{
    constructor(data) {
      this.data = data;
    }
  
    static findAll() {
      return [
        { id: 1, name: 'Trigger 1' },
        { id: 2, name: 'Trigger 2' }
      ];
    }
  }
  

module.exports = Trigger; // Ensure you export the model