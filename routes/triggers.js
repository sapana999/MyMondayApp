// routes/triggers.js
const express = require('express');
const router = express.Router();

// Example trigger to subscribe to item created event
router.post('/triggers/item_created/subscribe', async (req, res) => {
  const { webhookId, inputFields } = req.body;
  const { boardId } = inputFields;

  try {
    // Simulate database interaction or other actions
    console.log(`Subscribed to webhookId: ${webhookId} for boardId: ${boardId}`);
    res.json({ webhookId });
  } catch (error) {
    res.status(500).json({ error: 'Error subscribing to trigger' });
  }
});

module.exports = router;
