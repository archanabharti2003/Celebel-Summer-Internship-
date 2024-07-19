const axios = require("axios");
const mongoose = require("mongoose");
const Crawler = require("crawler");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product must have a name"],
    unique: true,
  },
  details: {
    type: Array,
  },
  asin: String,
  link: String,
  categories: {},
  image: {
    type: String,
  },
  rating: {
    type: String,
    required: true,
  },
  price: {
    type: Object,
    required: true,
  },
});



productSchema.index({ title: "text" });

const product = mongoose.model("product", productSchema);
module.exports = product;
