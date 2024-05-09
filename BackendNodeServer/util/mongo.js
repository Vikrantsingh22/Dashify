const mongoose = require("mongoose");

const mongooseConnect = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "dataAnalysis",
    });
    console.log("DB connected");
  } catch (err) {
    console.log(err);
    console.log(
      "Check you .env and  refer to the README.md for more information"
    );
  }
};

module.exports = mongooseConnect;
