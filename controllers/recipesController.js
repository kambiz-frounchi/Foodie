const db = require("../models");
const { Tag } = require("../models/tag");

// Defining methods for the recipesController
module.exports = {
  findAll: function (req, res) {
    db.Recipe.find(req.query)
      .sort({ createdDate: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    addIngredients(req.body.ingredients)
      .then(addTags(req.body.tags))
      .then((ingredients, tags) => {
        db.Recipe.create({
          userId: req.body.userId,
          createdDate: req.body.createdDate,
          name: req.body.name,
          image: req.body.image,
          time: req.body.time,
          difficulty: req.body.difficulty,
          // cuisine: cuisine,
          ingredients: ingredients,
          tags: tags
        })
          .then((dbModel) => res.json(dbModel))
          .catch((err) => res.status(422).json(err));
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
          return db
            .Tag(tag)
            .save(); // Returns a promise
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
          return db
            .Ingredient(ingredient)
            .save(); // Returns a promise
        });
    })
  );
};
