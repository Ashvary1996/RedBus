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
    enum: ["male", "female", "other"],
    required: true,
  },
  seatNumber: [
    {
      type: String,
      required: true,
    },
  ],
  email: {
    type: String,
  },
  number: {
    type: String,
    require: true,
  },
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
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
