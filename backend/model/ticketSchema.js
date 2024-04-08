const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  passengerName: {
    type: String,
    required: true,
  },
  passengerAge: {
    type: Number,
    required: true,
  },
  passengerGender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  seatNumber: [
    {
      type: Number,
      required: true,
    },
  ],
  ticketType: {
    type: String,
    enum: ["Standard", "Premium", "VIP"],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("tickets", ticketSchema);
module.exports = Ticket;

// tripId: {
// type:
// Schema.Types.ObjectId ,
//   ref: "Trip",
//   required: true,
// },
