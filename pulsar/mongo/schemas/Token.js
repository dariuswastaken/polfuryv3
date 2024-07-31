const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    IDDiscord: String,
    id: String,
    type: String,
    createdAt: Date,
    expiresAt: Date,
    author: String,
  },
  { collection: "tokens" }
);

const Token = new mongoose.model("Token", tokenSchema);

module.exports = {
  schema: Token,
};
