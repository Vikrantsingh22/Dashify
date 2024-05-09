const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    end_year: {
      type: String,
      default: "",
    },
    intensity: {
      type: String,

      default: "",
    },
    sector: {
      type: String,

      default: "",
    },
    topic: {
      type: String,

      default: "",
    },
    insight: {
      type: String,

      default: "",
    },
    url: {
      type: String,

      default: "",
    },
    region: {
      type: String,

      default: "",
    },
    start_year: {
      type: String,

      default: "",
    },
    impact: {
      type: String,

      default: "",
    },
    region: {
      type: String,

      default: "",
    },
    added: {
      type: String,

      default: "",
    },

    published: {
      type: String,

      default: "",
    },
    country: {
      type: String,

      default: "",
    },
    relevance: {
      type: String,

      default: "",
    },
    pestle: {
      type: String,

      default: "",
    },
    source: {
      type: String,

      default: "",
    },
    title: {
      type: String,

      default: "",
    },
    likelihood: {
      type: String,

      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("insights", insightSchema);
