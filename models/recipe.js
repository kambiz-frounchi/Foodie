const { Schema, model } = require("mongoose");
const { ingredientSchema } = require("./ingredient");
const { commentSchema } = require("./comment");
const { tagSchema } = require("./tag");
const { cuisineSchema } = require("./cuisine");

const recipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdDate: { 
    type: Date,
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  time: {
    type: String,
    enum: ["10-20", "20-30", "30-40", "40-50", "50-60", "60+"]
  },
  difficulty: {
    type: String,
    enum: ["Piece of Cake", "Some Technique Required", "Master Chef Level"]
  },
  likes: {
    type: Number
  },
  cuisine: {
    type: Schema.Types.ObjectId,
    ref: "Cuisine"
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient"
    }
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Recipe = model("Recipe", recipeSchema);

module.exports = {recipeSchema, Recipe};