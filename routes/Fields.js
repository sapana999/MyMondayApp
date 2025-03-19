const express = require("express");
const router = express.Router();
const { PRIORITY_LEVELS } = require("../models/trigger");
const { Trigger, Action } = require('../models/trigger'); // Assuming Trigger and Action models exist

// In your routes/Fields.js or appropriate file
router.post("/createPriorityField", function (req, res) {
    const { payload } = req.body;
    const { pageRequestData } = payload;
    const { page = 1 } = pageRequestData;
    // console.log("TEST1", payload);
    return res.status(200).send({
        options: [
            { title: "High", value: "High" },
            { title: "Medium", value: "Medium" },
            { title: "Low", value: "Low" },
        ],
       
        isLastPage: true, // or true if there are no more pages

    });
})
// Endpoint for retrieving Dynamic Mapping Fields

// Simulate retrieving dynamic mapping fields (you would replace this with actual logic)
async function getDynamicMappingFields() {
    return [
      { field_id: 1, field_name: 'Board ID', type: 'text', required: true },
      { field_id: 2, field_name: 'Item ID', type: 'text', required: true },
      { field_id: 3, field_name: 'Status', type: 'dropdown', options: ['Open', 'In Progress', 'Closed'], required: false },
    ];
  }
  
  // Endpoint to get dynamic mapping fields
  router.post('/dynamic-mapping', async (req, res) => {
    try {
      const fields = await getDynamicMappingFields();
      res.status(200).json({
        success: true,
        fields,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching dynamic mapping fields' });
    }
  });
  const dynamicMappingField = {
    name: "Third Party Data Mapper",
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
module.exports = router;