// routes/webhooks.js
const express = require('express');
const router = express.Router();

// Webhook route to handle incoming events
router.post('/webhooks/item_created', async (req, res) => {
  const { event } = req.body;

  try {
    // Simulate inserting event data into a database
    console.log(`Processing event for boardId: ${event.boardId}, itemId: ${event.itemId}`);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to handle event' });
  }
});

module.exports = router;
