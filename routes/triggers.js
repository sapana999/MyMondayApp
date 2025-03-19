const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database connection
const Trigger  = require('../models/trigger'); // Import the Trigger model for DB operations


// Subscribe: Store webhook details
// router.post('/subscribe', async (req, res) => {
//   try {
//       const payload = req.body.payload;

//       if (!payload) {
//           return res.status(400).json({ error: 'Invalid payload format' });
//       }
//          // Log the payload to verify its structure
//          console.log('Received Payload:', payload);

//     //   // Extract required fields
//     //   const { webhookUrl, subscriptionId, recipeId, integrationId } = payload;
//     //   const { boardId, userId } = payload.inputFields;
      
//     //   // Log extracted fields to check if they are correct
//     //     priority_level: priorityLevel
//     //     console.log('Extracted Fields:', { webhookUrl, subscriptionId, recipeId, integrationId, boardId, userId, priorityLevel});
//       // Extract required fields from the payload
//     const { webhookUrl, subscriptionId, recipeId, integrationId, inputFields } = req.body;

//     // Extract the priority level correctly from inputFields
//     const priorityLevel = inputFields?.priority_level;
//     const boardId = inputFields?.boardId;
//     const userId = inputFields?.userId;
//     // Log extracted fields to check if they are correct
//     console.log('Extracted Fields:', { webhookUrl, subscriptionId, recipeId, integrationId, boardId, userId, priorityLevel });
    
//        // Insert data using Sequelize
//        await Trigger.create({
//         webhook_url: webhookUrl,       // Ensure the key matches the model's field name
//         subscription_id: subscriptionId,
//         board_id: boardId,
//         user_id: userId,
//         recipe_id: recipeId,
//         integration_id: integrationId,
//         priority_level: priorityLevel
//     });

//       return res.status(200).json({ message: 'Subscription stored successfully' });

//   } catch (error) {
//       console.error('Error subscribing:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//   }
// });
// router.post('/subscribe', async (req, res) => {
//   try {
//       console.log("Received Payload:", req.body);

//       // Ensure payload exists
//       if (!req.body.payload) {
//           return res.status(400).json({ error: "Missing payload data" });
//       }

//       // Extract required fields from the payload
//       const payload = req.body.payload;
//       const triggerData = {
//           webhook_url: payload.webhookUrl,  
//           subscription_id: payload.subscriptionId,  
//           recipe_id: payload.recipeId,  
//           integration_id: payload.integrationId,  
//           board_id: payload.inputFields?.boardId || payload.inboundFieldValues?.boardId,  
//           user_id: payload.inputFields?.userId || payload.inboundFieldValues?.userId,  
//           priority_level: payload.inputFields?.priority_level?.value || payload.inboundFieldValues?.priority_level?.value  
//       };

//       console.log("Extracted Fields:", triggerData);

//       // Check if any required field is missing
//       if (!triggerData.webhook_url || !triggerData.subscription_id || !triggerData.recipe_id || 
//           !triggerData.integration_id || !triggerData.board_id || !triggerData.user_id) {
//           console.error("Missing required fields:", triggerData);
//           return res.status(400).json({ error: "One or more required fields are missing." });
//       }

//       // Save to the database
//       const newTrigger = await Trigger.create(triggerData);
//       res.status(201).json(newTrigger);

//   } catch (error) {
//       console.error("Error subscribing:", error);
//       res.status(500).json({ error: "Internal server error" });
//   }
// });
// POST route to subscribe
router.post('/subscribe', async (req, res) => {
  try {
      const payload = req.body.payload;

      // Extract fields from the payload
      const webhookUrl = payload.webhookUrl;
      const subscriptionId = payload.subscriptionId;
      const recipeId = payload.recipeId;
      const integrationId = payload.integrationId;

      // Extract values from inboundFieldValues or inputFields
      const boardId = payload.inboundFieldValues.boardId || payload.inputFields.boardId;
      const userId = payload.inboundFieldValues.userId || payload.inputFields.userId;
      const priorityLevel = payload.inboundFieldValues.priority_level.value || payload.inputFields.priority_level.value;

      // Ensure required fields are present
      if (!webhookUrl || !subscriptionId || !recipeId || !integrationId || !boardId || !userId || !priorityLevel) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      // Log the extracted fields (for debugging)
      console.log("Extracted Fields:", {
          webhook_url: webhookUrl,
          subscription_id: subscriptionId,
          recipe_id: recipeId,
          integration_id: integrationId,
          board_id: boardId,
          user_id: userId,
          priority_level: priorityLevel
      });

      // Save the subscription data to the database
      const newTrigger = await Trigger.create({
          webhook_url: webhookUrl,
          subscription_id: subscriptionId,
          board_id: boardId,
          user_id: userId,
          recipe_id: recipeId,
          integration_id: integrationId,
          priority_level: priorityLevel
      });

      res.status(201).json({ message: "Subscription successful", data: newTrigger });
  } catch (error) {
      console.error("Error subscribing:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// Unsubscribe: Remove a subscription
router.post('/unsubscribe', async (req, res) => {
  try {
    const payload = req.body.payload;
      // Log the headers and body for debugging purposes
      console.log('Incoming Request Headers:', req.headers);
      console.log('Incoming Request Body:', req.body);

      // Check if 'payload' and 'webhookId' are present in the request body
      if (!req.body.payload || !req.body.payload.webhookId) {
          console.log('Missing webhookId in payload');
          return res.status(400).json({ error: 'Missing webhookId in the payload' });
      }

      const { webhookId } = payload;

      // Log the extracted webhookId
      console.log('Extracted Webhook ID:', webhookId);

      // Find the Trigger with the given webhookId
      const trigger = await Trigger.findOne({           
          where: {subscription_id : webhookId }
      });

      if (!trigger) {
          console.log('Trigger not found in the database');
          return res.status(404).json({ error: 'Automation not found in the database' });
      }

      // Delete the record from the database
      await trigger.destroy();

      // Log success
      console.log('Successfully unsubscribed and removed from database');

      return res.status(200).json({ message: 'Successfully unsubscribed and removed from the database' });

  } catch (error) {
      console.error('Error unsubscribing:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;