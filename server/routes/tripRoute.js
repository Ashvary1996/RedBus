const express = require("express");
const {
  newTrip,
  get50Trip,
  getTripbyDate,
  getTripbyQuery,
  updateTrip,
} = require("../controller/tripController");
const route = express.Router();

route.post("/newTrip", newTrip);
// route.post("/updateTrip", updateTrip);
route.get("/last50Trip", get50Trip);
route.get("/byDate", getTripbyDate);

route.get(`/getTripbyQuery?`, getTripbyQuery);

module.exports = route;
