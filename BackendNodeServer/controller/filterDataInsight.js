const mongoose = require("mongoose");
const insights = require("../models/insights");

const filterEndDate = async (req, res) => {
  const { end_year, topic, sector, region, pestle, source, country } = req.body;

  // Construct filter object based on request parameters
  const filter = {};

  if (end_year && end_year.length > 0) {
    filter.end_year = end_year;
  }
  if (topic && topic.length > 0) {
    filter.topic = topic;
  }
  if (sector && sector.length > 0) {
    filter.sector = sector;
  }
  if (region && region.length > 0) {
    filter.region = region;
  }
  if (pestle && pestle.length > 0) {
    filter.pestle = pestle;
  }
  if (source && source.length > 0) {
    filter.source = source;
  }
  if (country && country.length > 0) {
    filter.country = country;
  }

  // Aggregate pipeline to get the count of each unique value for different fields
  const pipeline = [{ $group: { _id: "$country", count: { $sum: 1 } } }];

  try {
    // Execute the aggregation pipeline
    const DataInsight = await insights.find(filter);
    // console.log(DataInsight);
    const DistinctTopic = await insights.distinct("end_year");
    // res.json(DataInsight);

    // IT GIVES THE DOCUMENTS GROUPED BY COUNTRY

    // const pipeline = [
    //   { $group: { _id: "$country", documents: { $push: "$$ROOT" } } },
    // ];
    // const distinctCountryCounts = await insights.aggregate(pipeline);
    // res.json(distinctCountryCounts);

    // -- OVERS --

    // It groups the documents by country from the filtered documents

    // const distinctCountryDocuments = DataInsight.reduce(
    //   (accumulator, current) => {
    //     const country = current.country;
    //     if (!accumulator[country]) {
    //       accumulator[country] = [];
    //     }
    //     accumulator[country].push(current);
    //     return accumulator;
    //   },
    //   {}
    // );
    //-- OVERS --

    // res.json(distinctCountryDocuments);

    // getting the array of relevance likelihood and intensity
    const insightsarray = [];
    const intensities = [];
    const relevances = [];
    const likelihoods = [];

    DataInsight.forEach((entry) => {
      insightsarray.push(entry.insight);
      intensities.push(entry.intensity !== "" ? parseInt(entry.intensity) : 0);
      relevances.push(entry.relevance !== "" ? parseInt(entry.relevance) : 0);
      likelihoods.push(
        entry.likelihood !== "" ? parseInt(entry.likelihood) : 0
      );
    });

    // console.log("Insights:", insightsarray);
    // console.log("Intensities:", intensities);
    // console.log("Relevances:", relevances);
    // console.log("Likelihoods:", likelihoods);

    // -- OVERS --

    // Group the documents according to the country, sector, topic, and region
    const distinctData = DataInsight.reduce(
      (accumulator, current) => {
        const { country, sector, topic, region, start_year } = current;

        // Group by country
        if (!accumulator.byCountry[country]) {
          accumulator.byCountry[country] = [];
        }
        accumulator.byCountry[country].push(current);

        // Group by sector
        if (!accumulator.bySector[sector]) {
          accumulator.bySector[sector] = [];
        }
        accumulator.bySector[sector].push(current);

        // Group by topic
        if (!accumulator.byTopic[topic]) {
          accumulator.byTopic[topic] = [];
        }
        accumulator.byTopic[topic].push(current);

        if (!accumulator.byRegion[region]) {
          accumulator.byRegion[region] = [];
        }
        accumulator.byRegion[region].push(current);

        if (!accumulator.byStartYear[start_year]) {
          accumulator.byStartYear[start_year] = [];
        }
        accumulator.byStartYear[start_year].push(current);

        return accumulator;
      },
      {
        byCountry: {},
        bySector: {},
        byTopic: {},
        byRegion: {},
        byStartYear: {},
      }
    );
    // res.json(distinctData.byTopic);

    // -- OVERS --

    // Gives the count of the total countries and the documents for each country

    const countryNames = [];
    const CountrydocumentCounts = [];

    for (const country in distinctData.byCountry) {
      countryNames.push(country);
      CountrydocumentCounts.push(distinctData.byCountry[country].length);
    }

    // console.log(countryNames); // ["United States of America", "Libya", "Iraq", ...]
    // console.log(CountrydocumentCounts);
    // -- OVERS --

    // This code gives the total region counts
    const RegionNames = [];
    const RegiondocumentCounts = [];

    for (const region in distinctData.byRegion) {
      RegionNames.push(region);
      RegiondocumentCounts.push(distinctData.byRegion[region].length);
    }

    // console.log(RegionNames); // ["United States of America", "Libya", "Iraq", ...]
    // console.log(RegiondocumentCounts);

    // -- OVERS --

    // count the start year
    const startYears = [];
    const sYeardocumentCounts = [];

    for (const start in distinctData.byStartYear) {
      startYears.push(start);
      sYeardocumentCounts.push(distinctData.byStartYear[start].length);
    }

    // console.log(startYears); // ["United States of America", "Libya", "Iraq", ...]
    // console.log(sYeardocumentCounts);

    // -- OVERS --

    // This gives the total count of the documents for each sector
    const sectorNames = [];
    const sectordocumentCounts = [];
    for (const sector in distinctData.bySector) {
      sectorNames.push(sector);
      sectordocumentCounts.push(distinctData.bySector[sector].length);
    }

    // -- OVERS --

    // This code gives the topics and intensity array
    const TopicArray = Object.keys(distinctData.byTopic);

    // Extracting intensityArray, filtering out NaN values
    const intensityArray = TopicArray.map((topic) =>
      distinctData.byTopic[topic]
        .filter((doc) => doc.intensity !== "") // Filter out documents with empty intensity
        .map((doc) => parseInt(doc.intensity))
    );

    // console.log(TopicArray); // ["production", "car"]
    // console.log(intensityArray); // [[4, 6], [9, 12]]

    const combinedResponse = {
      AllResponse: DataInsight,
      regionResponse: {
        labels: RegionNames,
        data: RegiondocumentCounts,
      },
      startyearResponse: {
        labels: startYears,
        data: sYeardocumentCounts,
      },
      countryResponse: {
        labels: countryNames,
        data: CountrydocumentCounts,
      },
      topicResponse: {
        labels: TopicArray,
        data: intensityArray,
      },
      sectorResponse: {
        labels: sectorNames,
        data: sectordocumentCounts,
      },
      insightsResponse: {
        insights: insightsarray,
        intensities: intensities,
        relevances: relevances,
        likelihoods: likelihoods,
      },
    };
    res.json(combinedResponse);
    // console.log(distinctData.byTopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { filterEndDate };
