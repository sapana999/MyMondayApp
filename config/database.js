const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('monday_recipes', 'root', '', {  // Empty string for password
  host: 'localhost',  // Use 'localhost' if needed
  dialect: 'mysql',
  port: 3306,  // Ensure this matches your MySQL port
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully!'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

module.exports = sequelize;
