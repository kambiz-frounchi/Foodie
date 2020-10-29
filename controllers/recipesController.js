const db = require("../models");
const mongoose = require("mongoose");

// Defining methods for the recipesController
module.exports = {
  find: function (req, res) {
    console.log(req.body);
    const ingredients = req.body.ingredients.map((ingredient) => mongoose.Types.ObjectId(ingredient._id));
    console.log(ingredients);
    // This query is not quite working yet
    const query = {
      ingredients: {$in: [ingredients]}
    }
    console.log(query);
    db.Recipe.find({
      query
    })
      .sort({ createdDate: -1 })
      .then((dbModels) => res.json(dbModels))
      .catch((err) => res.status(422).json(err));
  },
  findAll: function (req, res) {
    console.log(req.body);
    db.Recipe.find({})
      .sort({ createdDate: -1 })
      .then((dbModels) => res.json(dbModels))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    addIngredients(req.body.ingredients).then((ingredients) => {
      addTags(req.body.tags).then((tags) => {
        addCuisine(req.body.cuisine).then((cuisine) => {
          db.Recipe.create({
            userId: req.body.userId,
            createdDate: req.body.createdDate,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            time: req.body.time,
            difficulty: req.body.difficulty,
            cuisine: cuisine,
            ingredients: ingredients,
            tags: tags,
          })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
        });
      });
    });
  },
};

const addTags = (tags) => {
  return Promise.all(
    tags.map((tag) => {
      // See if the tag already exists
      return db.Tag.findOne(tag)
        .exec()
        .then((doc) => {
          if (doc) {
            return doc;
          }
          // If no tag exists, create one
          return db.Tag(tag).save(); // Returns a promise
        });
    })
  );
};

const addIngredients = (ingredients) => {
  return Promise.all(
    ingredients.map((ingredient) => {
      // See if the ingredient already exists
      return db.Ingredient.findOne(ingredient)
        .exec()
        .then((doc) => {
          if (doc) {
            return doc;
          }
          // If no ingredient exists, create one
          return db.Ingredient(ingredient).save(); // Returns a promise
        });
    })
  );
};

const addCuisine = (cuisine) => {
  // See if the cuisine already exists
  return db.Cuisine.findOne(cuisine)
    .exec()
    .then((doc) => {
      if (doc) {
        return doc;
      }
      // If no cuisine exists, create one
      return db.Cuisine(cuisine).save(); // Returns a promise
    });
};
