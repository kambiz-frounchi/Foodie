import axios from "axios";

export default {
  // Gets a user's info (nickname, email, status, recipes)
  getUser: function(userid) {
    return axios.get(`/api/user/${userid}`);
  },
  setUserStatus: function(userid, statusString) {
    return axios.post(`/api/user/status/${userid}`, statusString);
  },
  // Gets all recipes
  getAllRecipes: function() {
    return axios.get("/api/recipes");
  },
  // Gets all ingredients
  getAllIngredients: function() {
    return axios.get("/api/ingredients");
  },
  // Gets all cuisines
  getAllCuisines: function() {
    return axios.get("/api/cuisines");
  },
  // Gets all tags
  getAllTags: function() {
    return axios.get("/api/tags");
  },
  // Get a user's recipes
  getUserRecipes: function(userid) {
    return axios.get(`/api/recipes/user/${userid}`);
  },
  // Posts a new recipe
  postRecipe: function(recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  // Get a specific recipe
  getRecipe: function(id) {
    return axios.get(`/api/recipes/${id}`);
  },
  // Update a recipe
  updateRecipe: function(id, recipeData) {
    return axios.put(`/api/recipes/${id}`, recipeData);
  },
  // Deletes a specific recipe
  deleteRecipe: function(id) {
    return axios.delete(`/api/recipes/${id}`);
  },
  // Finds a recipe based on search data (ingredients)
  findRecipes: function(searchData) {
    return axios.post(`/api/recipes/find`, searchData);
  },
  // Likes a specific recipe
  likeRecipe: function(id, likeData) {
    return axios.post(`/api/recipes/like/${id}`, likeData);
  },
  // Comments on a specific recipe
  commentRecipe: function(id, commentData) {
    return axios.post(`/api/recipes/comment/${id}`, commentData);
  },
  // Signup
  signup: function(userData) {
    // TO DO
    return null;
  },
  // Login
  login: function(userData) {
    // TO DO
    return null;
  }
};
