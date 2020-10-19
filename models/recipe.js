const { Schema, model } = require("mongoose");
const { ingredientSchema } = require("./ingredient");
const { commentSchema } = require("./comment");
const { tagSchema } = require("./tag");
const { cuisineSchema } = require("./cuisine");

const recipeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId
  },
  createdDate: { 
    type: Date,
  },
  name: {
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
    enum: ["piece of cake", "some technique required", "master chef level"]
  },
  likes: {
    type: Number
  },
  cuisine: cuisineSchema,
  ingredients: [ingredientSchema],
  tags: [tagSchema],
  comments: [commentSchema]
});

const Recipe = model("Recipe", recipeSchema);

module.exports = {recipeSchema, Recipe};