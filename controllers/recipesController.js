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
      query.cuisines = { $in: cuisines };
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
  textSearch: function (req, res) {
    console.log(req.body);
    db.Recipe.find({
      $or: [
        { name: { $regex: req.body.search, $options: "i" } },
        { description: { $regex: req.body.search, $options: "i" } },
      ],
    })
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
      .populate("user")
      .sort({ createdDate: -1 })
      .then((dbModels) => res.json(dbModels))
      .catch((err) => res.status(422).json(err));
  },
  findByUser: function (req, res) {
    console.log("findByUser", req.params.id);
    db.Recipe.find({ user: req.params.id })
    .populate("user")
    .populate("ingredients")
    .populate("cuisines")
    .populate("tags")
      .then((dbModels) => res.json(dbModels))
      .catch((err) => res.status(422).json(err));
  },
  getRecipe: function (req, res) {
    db.Recipe.findOne({ _id: req.params.id })
      .populate("user")
      .populate("ingredients")
      .populate("cuisines")
      .populate("tags")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log(req.body);
    addIngredients(req.body.ingredients).then((ingredients) => {
      addTags(req.body.tags).then((tags) => {
        addCuisine(req.body.cuisines).then((cuisines) => {
          console.log(req.files);
          console.log(req.body);
          console.log("ingredients", ingredients);
          console.log("tags", tags);
          console.log("cuisines", cuisines);

          // let imageName = null;
          // if (req.files && Object.keys(req.files).length) {
          //   console.log(req.files);
          //   const recipeImageFile = req.files.image;
          //   imageName = req.files.image.name;
          //   const recipeImageSavePath = path.join(
          //     __dirname,
          //     "../images/",
          //     recipeImageFile.name
          //   );

          //   console.log(__dirname);
          //   console.log(recipeImageSavePath);
          //   recipeImageFile.mv(recipeImageSavePath, (err) => {
          //     if (err) {
          //       console.log(err);
          //     }
          //   });
          // }

          db.Recipe.create({
            user: req.body.userId,
            createdDate: req.body.createdDate,
            name: req.body.name,
            description: req.body.description,
            image: req.body.imageUrl,//imageName ? imageName : "none",
            time: req.body.time,
            difficulty: req.body.difficulty,
            cuisines: cuisines,
            ingredients: ingredients,
            tags: tags,
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
  updateLikeCount: function (req, res) {
    console.log(req.body);

    db.UserRecipeState.findOneAndUpdate(
      { userId: req.body.userId, recipeId: req.body.recipeId },
      { $set: { likeStatus: req.body.likeStatus } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).then((result) => console.log("db.UserRecipeState", result));

    if (req.body.likeStatus) {
      db.Recipe.update({ _id: req.body.recipeId }, { $inc: { likes: 1 } })
        .then((dbModels) => res.json(dbModels))
        .catch((err) => res.status(422).json(err));
    } else {
      db.Recipe.update({ _id: req.body.recipeId }, { $inc: { likes: -1 } })
        .then((dbModels) => res.json(dbModels))
        .catch((err) => res.status(422).json(err));
    }
  },
};

const addTags = (tags) => {
  if (!tags) return Promise.resolve();
  const tagsArray = tags.split(",");
  console.log(tagsArray);
  return Promise.all(
    tagsArray.map((tag) => {
      // See if the tag already exists
      return db.Tag.findOne({ name: tag })
        .exec()
        .then((doc) => {
          if (doc) {
            return doc;
          }
          // If no tag exists, create one
          return db.Tag({ name: tag }).save(); // Returns a promise
        });
    })
  );
};

const addIngredients = (ingredients) => {
  if (!ingredients) return Promise.resolve();
  const ingredientsArray = ingredients.split(",");
  console.log(ingredientsArray);
  return Promise.all(
    ingredientsArray.map((ingredient) => {
      // See if the ingredient already exists
      return db.Ingredient.findOne({ name: ingredient })
        .exec()
        .then((doc) => {
          if (doc) {
            return doc;
          }
          // If no ingredient exists, create one
          return db.Ingredient({ name: ingredient }).save(); // Returns a promise
        });
    })
  );
};

const addCuisine = (cuisines) => {
  if (!cuisines) return Promise.resolve();
  const cuisinesArray = cuisines.split(",");
  console.log(cuisinesArray);
  return Promise.all(
    cuisinesArray.map((cuisine) => {
      // See if the cuisine already exists
      return db.Cuisine.findOne({ name: cuisine })
        .exec()
        .then((doc) => {
          if (doc) {
            return doc;
          }
          // If no cuisine exists, create one
          return db.Cuisine({ name: cuisine }).save(); // Returns a promise
        });
    })
  );
};
