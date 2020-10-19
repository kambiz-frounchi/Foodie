const { Schema, model } = require("mongoose");

const cuisineSchema = new Schema({
  name: {
    type: String
  }
});

const Cuisine = model("Cuisine", cuisineSchema);

module.exports = {cuisineSchema, Cuisine};