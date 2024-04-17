const mongoose = require("mongoose");
const Buses = mongoose.model("bus_owners", {});

const getBuses = async (req, res) => {
  try {
    const data = await Buses.find({});

    res.status(200).json({
      success: true,
      length: data.length,
      data: data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Error",
      detail: error.message,
    });
  }
};
module.exports = { getBuses };
