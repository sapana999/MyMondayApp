const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define the Item model
const Item = sequelize.define("Item", {
  boardId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  itemId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  columnId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
Item.sync({ alter: true }) // Use `{ force: true }` to reset DB (DANGER: Deletes data!)
  .then(() => console.log("✅ Item table created or updated"))
  .catch((error) => console.error("❌ Error syncing Item table:", error));

module.exports = Item;
