// routes/actions.js
const express = require('express');
const router = express.Router();

// Define an example action route
router.post('/send_notification', async (req, res) => {
 
    try {
        const { payload } = req.body;
        const { inputFields } = payload;
        const { boardId, itemId, columnId } = inputFields;

        console.log(`✅ Processing Action - Board: ${boardId}, Item: ${itemId}, Column: ${columnId}`);

        // Do your logic here (e.g., update a column value or whatever your handler does)

           // Example response
           res.status(200).send({ message: "Item updated successfully!" });
        } catch (error) {
            console.error("❌ Error processing request:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    });
    
    module.exports = router;