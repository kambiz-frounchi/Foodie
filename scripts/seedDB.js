const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Recipes collection and inserts the recipes below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/foodie"
);

const recipeSeed = [
    {
        name:  "bestRecipe"
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