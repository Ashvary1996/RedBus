const express = require("express");
const { getCities } = require("../controller/citiesController");
const { getBuses } = require("../controller/busController");
const route = express.Router();

route.get(`/getCities`, getCities);
route.get(`/getBuses`, getBuses);

module.exports = route;
