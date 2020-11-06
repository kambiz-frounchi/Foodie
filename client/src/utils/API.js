import axios from "axios";

export default {
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
  textSearchRecipes: function(searchData) {
    return axios.post(`/api/recipes/search`, searchData);
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
    return axios.post(`/api/users/signup`, userData);
  },
  // Login
  login: function(userData) {
    return axios.post(`/api/users/login`, userData);
  },
  // Logout
  logout: function(userData) {
    return axios.post(`/api/users/logout`, userData);
  },
  // getUser
  getUser: function() {
    return axios.get(`/api/users`);
  },
  // getImage
  getImage: function(name) {
    return axios.get(`/api/recipes/image/${name}`);
  },
  // upload an image
  uploadImage: function(image) {
    const formData = new FormData();
    console.log("uploadImage");
    console.log(image);
    console.log(image.name);
    formData.append("myimage", image);
    //formData.append("myimage", image, image.name);
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    console.log("uploading ...");
    return axios.post(`/api/recipes/upload`, formData, config);
  },
  //get user recipe state
  getUserRecipeState: function (userId) {
    return axios.get(`/api/userrecipestates/${userId}`);
  }
};
