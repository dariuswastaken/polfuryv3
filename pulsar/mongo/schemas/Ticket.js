import mongoose from 'npm:mongoose';

const ticketSchema = new mongoose.Schema(
  {
    IDDiscord: String,
    uniqueID: String,
    active: Boolean,
    channel: {
      id: String,
    },
  },
  { collection: "tickets" }
);

const Ticket = new mongoose.model("Ticket", ticketSchema);

export default Ticket;