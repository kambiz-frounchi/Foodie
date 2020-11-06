const { Schema, model } = require("mongoose");
const { ingredientSchema } = require("./ingredient");
const { commentSchema } = require("./comment");
const { tagSchema } = require("./tag");
const { cuisineSchema } = require("./cuisine");

const userRecipeStateSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  },
  likeStatus: {
    type: Boolean
  }  
});

const UserRecipeState = model("UserRecipeState", userRecipeStateSchema);

module.exports = {userRecipeStateSchema, UserRecipeState};
