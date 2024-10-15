import mongoose from 'npm:mongoose';

const componentSchema = new mongoose.Schema({
  tip_: String,
  componentDiscordID: String,
  componentID: String,
  disabled: Boolean,
});

const Component = mongoose.model("Component", componentSchema);

module.exports = {
  schema: Component,
};
