const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  userName: {
    type: String,
    required: [true, "Please Enter Your Location / from"],
  },
  from: {
    type: String,
    required: [true, "Please Enter Your Location / from"],
  },

  to: {
    type: String,
    required: [true, "Please Enter Your destination / to"],
  },
  busOwnerId: {
    type: Number,
    required: [true, "Please Enter Bus Owner Id"],
  },
  startTime: {
    type: Number,
    required: [true, "Please Enter Start Time"],
  },
  endTime: {
    type: Number,
    required: [true, "Please Enter End Time"],
  },
  category: {
    type: Number,
    required: [true, "Please Enter Category"],
  },
  SeatBooked: {
    type: [Number],
    validate: {
      validator: (seats) => {
        return seats.length > 0;
      },
      message: "Please Book at Least One Seat",
    },
    required: [true, "Please Book at Least One Seat"],
  },
  bus_no: {
    type: Number,
    require: [true, "Please include Bus Number"],
  },

  busFare: { type: Number, required: [true, "Please write Bus Fare"] },
  busName: { type: String, required: [true, "Please mention Bus-Name"] },
});

const Trip = mongoose.model("trips", tripSchema);
module.exports = Trip;
