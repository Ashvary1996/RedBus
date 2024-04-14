const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to Database Successfully");
      console.log(mongoose.modelNames());
    })
    .catch((err) => console.log(err));
};

module.exports = connectToDB;
