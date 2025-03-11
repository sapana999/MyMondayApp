const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());   // Important! This allows parsing JSON bodies

// Import the routes
const triggersRoute = require('./routes/triggers');
const actionsRoute = require('./routes/actions');
const webhooksRoute = require('./routes/webhooks');

// Set up the root route
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to my Monday.com integration server.');
});

// Use the imported routes
app.use('/triggers', triggersRoute);   // Trigger route
app.use('/actions', actionsRoute);     // Actions route
app.use('/webhooks', webhooksRoute);   // Webhooks route

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
