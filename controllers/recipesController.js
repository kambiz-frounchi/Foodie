const db = require("../models");
const mongoose = require("mongoose");
const path = require("path");

// Defining methods for the recipesController
module.exports = {
  find: function (req, res) {
    const query = {};

    console.log("Request body:\n", req.body);

    if (req.body.ingredients && req.body.ingredients.length > 0) {
      const ingredients = req.body.ingredients.map((ingredient) =>
        mongoose.Types.ObjectId(ingredient._id)
      );
      query.ingredients = { $in: ingredients };
    }
    if (req.body.cuisines && req.body.cuisines.length > 0) {
      const cuisines = req.body.cuisines.map((cuisine) =>
        mongoose.Types.ObjectId(cuisine._id)
      );
      query.cuisine = { $in: cuisines };
    }
    if (req.body.tags && req.body.tags.length > 0) {
      const tags = req.body.tags.map((tag) => mongoose.Types.ObjectId(tag._id));
      query.tags = { $in: tags };
    }

    console.log("Query:\n", query);

    db.Recipe.find(query)
      .populate("user")
      .sort({ createdDate: -1 })
      .then((dbModels) => {
        console.log(dbModels);
        res.json(dbModels);
      })
      .catch((err) => res.status(422).json(err));
  },
  findAll: function (req, res) {
    console.log(req.body);
    db.Recipe.find({})
      .sort({ createdDate: -1 })
      .then((dbModels) => res.json(dbModels))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    addIngredients(req.body.ingredients).then((ingredients) => {
      addTags(req.body.tags).then((tags) => {
        addCuisine(req.body.cuisine).then((cuisine) => {
          console.log(req.files);
          console.log(req.body);

          let imageName = null;
          if (req.files && Object.keys(req.files).length) {
            console.log(req.files);
            const recipeImageFile = req.files.image;
            imageName = req.files.image.name;
            const recipeImageSavePath = path.join(
              __dirname,
              "../images/",
              recipeImageFile.name
            );

            console.log(__dirname);
            console.log(recipeImageSavePath);
            recipeImageFile.mv(recipeImageSavePath, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }

          db.Recipe.create({
            //user: req.body.userId,
            //createdDate: req.body.createdDate,
            name: req.body.name,
            //description: req.body.description,
            image: imageName ? imageName : "none",
            time: req.body.time,
            difficulty: req.body.difficulty,
            //cuisine: cuisine,
            //ingredients: ingredients,
            //tags: tags,
          })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
        });
      });
    });
  },
  getImage: function (req, res) {
    const imageName = req.params.id;
    res.sendFile(path.join(__dirname, "../images", imageName));
  },
};

const addTags = (tags) => {
  if (!tags) return Promise.resolve();
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
  if (!ingredients) return Promise.resolve();
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
  if (!cuisine) return Promise.resolve();
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
