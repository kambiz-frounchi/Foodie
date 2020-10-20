import axios from "axios";

/*
/api/user/status/:userid: to change the status of a given user
/api/recipes: GET recipes posted by all users/ POST a new recipe
/api/recipes/user/:userid: GET recipes posted by a given user
/api/recipes/:id : for GET/PUT/DELETE
/api/recipes/find: POST: finds recipe based on given ingredients
/api/recipes/like/:recipeid: POST: adds a like/unlike to a given recipe
/api/recipes/comment/:recipeid: POST/PUT/DELETE: add/modifies a comment to a given recipe [nice to have]
/api/signup
/api/login
*/

export default {
  // Gets a user's info (nickname, email, status, recipes)
  getUser: function(userid) {
    return axios.get(`/api/user/${userid}`);
  },
  setUserStatus: function(userid, statusString) {
    return axios.post(`/api/user/status/${userid}`, statusString;
  },
  // Gets all recipes
  getAllRecipes: function() {
    return axios.get("/api/recipes");
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
  getRecipe: function(id, recipeData) {
    return axios.put(`/api/recipes/${id}`);
  },
  // Deletes a specific recipe
  deleteBook: function(id) {
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
