const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Recipes collection and inserts the recipes below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/foodie"
);

const recipeSeed = [
  {
    name:  "bestRecipe1",
    description: "best recipe ever",
    image: "image1"
  },
  {
    name:  "bestRecipe2",
    description: "second best recipe ever",
    image: "image2"
  },
  {
    name:  "bestRecipe3",
    description: "third best recipe ever",
    image: "image3"
  }
];

db.Recipe
  .remove({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });