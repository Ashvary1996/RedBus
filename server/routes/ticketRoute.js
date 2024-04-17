const express = require("express");
const { newTicket, getTicket } = require("../controller/ticketController");
const route = express.Router();

route.post("/newTicket", newTicket);
route.get("/getTicket", getTicket);

module.exports = route;
