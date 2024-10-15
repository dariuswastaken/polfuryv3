import mongoose from 'npm:mongoose';

const blacklistSchema = new mongoose.Schema({
  IDDiscord: String,
  reason: String,
  date: Date,
});

const Blacklist = mongoose.model("Blacklist", blacklistSchema);

module.exports = {
  schema: Blacklist,
};
