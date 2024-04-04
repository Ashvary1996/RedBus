const Trip = require("../model/tripSchemal");

/////////////

const newTrip = async (req, res) => {
  try {
    // const newTrip = new Trip(req.body);
    // await newTrip.save();

    const newTrip = await Trip.create(req.body);

    // for (let i = 0; i < 100; i++) {
    //   await Trip.create(req.body);
    // }

    res.status(200).json({
      success: true,
      tripDetail: newTrip,
    });
  } catch (error) {
    res.json({
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
  try {
    const trip = await Trip.find(req.query);

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

/////////////

module.exports = { newTrip, get50Trip, getTripbyDate, getTripbyQuery };
