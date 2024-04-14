const mongoose = require("mongoose");
const Cities = mongoose.model("state_districts", {});

const getCities = async (req, res) => {
  try {
    const data = await Cities.find({});

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
module.exports = { getCities };
