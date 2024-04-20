const { query } = require("express");
const Trip = require("../model/tripSchema");

/////////////

const newTrip = async (req, res) => {
  try {
    const { from, to, busName, tripDate, seatBooked } = req.body;

    const existingTrip = await Trip.findOne({
      from: from,
      to: to,
      busName: busName,
      tripDate: tripDate,
    });

    if (existingTrip) {
      existingTrip.seatBooked = [...existingTrip.seatBooked, ...seatBooked];
      const updatedTrip = await existingTrip.save();

      return res.status(200).json({
        success: true,
        msg: "Existing Trip Updated",
        existingTrip: updatedTrip, // Corrected to use updatedTrip
      });
    } else {
      // If trip not found, create a new one
      const newTrip = await Trip.create(req.body);

      res.status(200).json({
        success: true,
        msg: "New Trip Created",
        tripDetail: newTrip,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
      detail: error.message,
    });
  }
};

const get50Trip = async (req, res) => {
  try {
    const trip = await Trip.find({}).limit(50).sort({ $natural: -1 });
    res.status(200).json({
      status: true,
      total: trip.length,
      allTrips: trip,
    });
  } catch (error) {
    console.error("Error in fetching trips: ", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};
const getTripbyDate = async (req, res) => {
  try {
    const findByDate = req.body.findByDate;

    const trip = await Trip.find({ date: findByDate });

    if (!trip) {
      res.json({ status: false, msg: "trip by Date not found in database" });
    }

    res.status(200).json({
      status: true,
      total: trip.length,
      trip_Detail: trip,
    });
  } catch (error) {
    console.error("Error in fetching trips: ", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};
const getTripbyQuery = async (req, res) => {
  let query = req.query;
  try {
    let date;
    if (query.date) {
      date = new Date(query.date);
    }
    const trip = await Trip.find(query);

    res.status(200).json({
      status: true,
      total: trip.length,
      trip_Detail: trip,
      date: query.date,
    });
  } catch (error) {
    console.error("Error in fetching trips: ", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      detail: error.message,
      to: query.to,
    });
  }
};

/////////////

module.exports = {
  newTrip,
  get50Trip,
  getTripbyDate,
  getTripbyQuery,
};
