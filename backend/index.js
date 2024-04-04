const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectToDB = require("./dbConnector");

/////////////////////////////////
const app = express();
const port = process.env.PORT || 8000;
/////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/////////////////////////////////
// Routes
app.use("/demo", (req, res) => res.send("App is Working"));
/////////////////////////////////
app.listen(port, () => {
  console.log(`App is Running on PORT : ${port}`);
});
connectToDB();

module.exports = app;
