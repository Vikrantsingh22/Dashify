const insights = require("../models/insights");

const pushData = async (req, res) => {
  try {
    const insightData = require("../jsondata.json");
    // this is done only for development Environment as for evelopement environment we do not
    // have more liberty to tweak data so I have not altered the existing data

    // for testing this we will have to run this again and again it should not create duplicate document
    // if we would have _id that indexed document insertion which means if we would have extra unique identifier while
    // inserting we would have use that to confirm the uniqueness
    // but for now we are reflushing the data while inserting
    await insights.deleteMany({});
    console.log("DataDeleted");
    const insertedData = await insights.insertMany(insightData);
    console.log(insertedData.length);

    console.log("inserted Bulk Data in mongoDB data");
  } catch (err) {
    console.log(err);
  }
};

module.exports = pushData;
