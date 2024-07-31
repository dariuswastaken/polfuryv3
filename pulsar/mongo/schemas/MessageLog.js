const mongoose = require("mongoose");

const messageLogSchema = new mongoose.Schema({
  status: String,
  messageID: String,
  channelID: String,
  authorID: String,
  content: String,
  newContent: Array,
  oldContent: Array,
  createdTimestamp: Date || null,
  editedTimestamp: Date || null,
  deletedTimestamp: Date || null,
  attachments: Array || null,
});

const MessageLog = mongoose.model("MessageLog", messageLogSchema);

module.exports = {
  schema: MessageLog,
};
