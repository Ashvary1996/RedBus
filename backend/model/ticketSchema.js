const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  passengerName: {
    type: String,
    required: [true, "Passenger name is required."],
  },
  passengerAge: {
    type: Number,
    required: [true, "Passenger age is required."],
  },
  passengerGender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Passenger gender is required and must be 'male', 'female', or 'other'."],
   },
  seatNumber: [
    {
      type: String,
      required: [true, "Seat number is required."],
 },
  ],
  email: {
    type: String,
  },
  number: {
    type: String,
    required: [true, "Number is required."],
  },
  from: {
    type: String,
    required: [true, "From destination is required."],
  },
  to: {
    type: String,
    required: [true, "To destination is required."], 
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("tickets", ticketSchema);
module.exports = Ticket;
