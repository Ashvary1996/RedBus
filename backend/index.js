const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectToDB = require("./dbConnector");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/demo", (req, res) => res.send("App is Working"));
app.use("/trip", require("./routes/tripRoute"));
app.use("/ticket", require("./routes/ticketRoute"));

app.listen(port, () => {
  console.log(`App is Running on PORT : ${port}`);
});
connectToDB();

module.exports = app;
