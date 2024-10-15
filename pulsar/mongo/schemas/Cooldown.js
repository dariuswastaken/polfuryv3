import mongoose from 'npm:mongoose';

const cooldownSchema = new mongoose.Schema(
  {
    tip_: String,
    IDDiscord: String,
    expiration: Date,
  },
  { collection: "cooldowns" }
);

const Cooldown = new mongoose.model("Cooldown", cooldownSchema);

module.exports = {
  schema: Cooldown,
};
