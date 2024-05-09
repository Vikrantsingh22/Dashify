const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
const cors = require("cors");
const mongooseConnect = require("./util/mongo");
dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

mongooseConnect();

const TempData = require("./jsondata.json");
const pushData = require("./controller/pushData");
const { filterEndDate } = require("./controller/filterDataInsight");

pushData();

app.post("/endDate", filterEndDate);

app.listen(5000, () => {
  console.log("listening at 5000");
  // console.log(TempData.length);
});
// pushCountry();
