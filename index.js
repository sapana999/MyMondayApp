const express = require('express');
const bodyParser = require('body-parser');
const triggersRoute = require('./routes/triggers');
const actionsRoute = require('./routes/actions');
const webhooksRoute = require('./routes/webhooks');
const fieldsRoute = require('./routes/Fields');
const sequelize = require('./config/database'); // Ensure correct DB connection
const integrationController = require('./controllers/integrationController');
const app = express();
const port = 3000;
// Middleware to parse JSON
app.use(express.json());
// Middleware to parse JSON request bodies
app.use(bodyParser.json());   // Important! This allows parsing JSON bodies
// app.use('/triggers', triggersRoute);  // Add a base path '/api' for routes like /api/subscribe and /api/unsubscribe
// Set up the root route
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to my Monday.com integration server.');
}); 
app.use('/triggers', triggersRoute);   // Trigger route
app.use('/actions', actionsRoute);     // Actions route
app.use('/webhooks', webhooksRoute);   // Webhooks route
app.use('/fields', fieldsRoute);    // Fields Route


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
