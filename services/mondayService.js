// services/mondayService.js
const mondaySDK = require('monday-sdk-js');
const mondayAPI = mondaySDK();

async function createMondayItem(boardId, itemId, status) {
  try {
    const response = await mondayAPI.items.createItem({
      boardId,
      itemName: `New Item for ${itemId}`,
      columnValues: JSON.stringify({ status: { label: status } }),
    });
    return response;
  } catch (error) {
    throw new Error('Error creating monday.com item: ' + error.message);
  }
}

module.exports = { createMondayItem };
