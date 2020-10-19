const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  name: {
    type: String
  }
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = {ingredientSchema, Ingredient};