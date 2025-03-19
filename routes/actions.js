const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Item = require("../models/Item"); // Import Model
router.use(bodyParser.json());

const PORT = 3000;

// Webhook route for Monday.com
router.post("/webhook", async (req, res) => {
  try {
    const { payload } = req.body;
    const { boardId, itemId, columnId } = payload.inputFields;

    console.log(`✅ Processing Action - Board: ${boardId}, Item: ${itemId}, Column: ${columnId}`);

    // Save data to MySQL using Sequelize
    const newItem = await Item.create({
      boardId,
      itemId,
      columnId,
    });

    console.log("✅ Data saved to MySQL:", newItem.toJSON());

    res.status(200).json({ message: "Data saved successfully", data: newItem });
  } catch (error) {
    console.error("❌ Error handling webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// // Start the server
// app.listen(PORT, async () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);

//   // Start ngrok
//   const url = await ngrok.connect(PORT);
//   console.log(`🌍 Ngrok public URL: ${url}`);
// });
module.exports = router;
