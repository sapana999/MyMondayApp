// controllers/integrationController.js
const Trigger =require('../models/trigger');
const { mapTriggerToAction } = require('../services/mappingService');

// Action block to create a monday.com item
async function createItemAction(req, res) {
  const triggerData = req.body; // Assume the trigger data is sent in the request body
  try {
    const mappedFields = mapTriggerToAction(triggerData);
    const { board_id, item_id, status } = mappedFields;

    const response = await createMondayItem(board_id, item_id, status);
    res.status(200).json({ success: true, message: 'Item created successfully', data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create item', error: error.message });
  }
}

// Create item on monday.com using API
async function createMondayItem(boardId, itemId, status) {
  const mondayAPI = require('monday-sdk-js')();
  const response = await mondayAPI.items.createItem({
    boardId,
    itemName: `New Item for ${itemId}`,
    columnValues: JSON.stringify({ status: { label: status } }),
  });
  return response;
}
const dynamicMappingField = {
    name: "External Data Mapping",
    description: "Dynamically map fields between Monday.com and a third-party software.",
    key: "external_data_mapping",
    type: "dynamicMapping",
    fieldDefinitionsUrl: "https://f572-111-220-27-155.ngrok-free.app/api/mapping-definitions",  // Your backend URL to fetch field definitions
    settings: {
      multiple: true,  // Allows mapping multiple fields
      required: true
    }
  };
  
  module.exports = { dynamicMappingField };
  
module.exports = { createItemAction };
